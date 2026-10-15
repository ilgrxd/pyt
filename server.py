#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""PyAcademy - небольшой сервер на чистом Python (стандартная библиотека).

Что умеет:
  * регистрация и вход в аккаунт (пароли хранятся в виде хэша);
  * синхронизация прогресса между устройствами;
  * рейтинг учеников;
  * выдача и проверка сертификатов;
  * раздача самого сайта (index.html, css, js, data).

Запуск:  python server.py
Открыть: http://localhost:3000
"""

import hashlib
import json
import os
import re
import secrets
import threading
from datetime import datetime, timezone
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse

ROOT = os.path.dirname(os.path.abspath(__file__))
# Каталог с данными. Можно переопределить переменной окружения DATA_DIR
# (например, чтобы хранить данные на постоянном диске хостинга).
DATA_DIR = os.environ.get("DATA_DIR") or os.path.join(ROOT, "server-data")
USERS_FILE = os.path.join(DATA_DIR, "users.json")
SESSIONS_FILE = os.path.join(DATA_DIR, "sessions.json")

PORT = int(os.environ.get("PORT", "3000"))
HOST = os.environ.get("HOST", "0.0.0.0")

LOCK = threading.Lock()

MIME = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "application/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".ico": "image/x-icon",
    ".txt": "text/plain; charset=utf-8",
    ".woff2": "font/woff2",
}


def now_iso():
    return datetime.now(timezone.utc).isoformat()


def ensure_data():
    os.makedirs(DATA_DIR, exist_ok=True)
    for path in (USERS_FILE, SESSIONS_FILE):
        if not os.path.exists(path):
            with open(path, "w", encoding="utf-8") as f:
                f.write("{}")


def read_json(path):
    try:
        with open(path, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, dict) else {}
    except Exception:
        return {}


def write_json(path, obj):
    tmp = path + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(obj, f, ensure_ascii=False, indent=2)
    os.replace(tmp, path)


def hash_password(password, salt):
    return hashlib.pbkdf2_hmac(
        "sha256", password.encode("utf-8"), bytes.fromhex(salt), 100000
    ).hex()


def normalize_name(name):
    return re.sub(r"\s+", " ", str(name or "")).strip()[:30]


def key_of(name):
    return normalize_name(name).lower()


def count_progress(progress):
    tasks = lessons = time_total = 0
    for rec in (progress or {}).values():
        if not isinstance(rec, dict):
            continue
        hw = rec.get("homework") or {}
        done = sum(1 for v in hw.values() if v)
        tasks += done
        if rec.get("read") or done > 0:
            lessons += 1
        for value in (rec.get("time") or {}).values():
            if isinstance(value, (int, float)):
                time_total += value
    return {"tasks": tasks, "lessons": lessons, "time": time_total}


class Handler(BaseHTTPRequestHandler):
    server_version = "PyAcademy/1.0"
    protocol_version = "HTTP/1.0"

    def log_message(self, fmt, *args):
        pass

    # ---------- вспомогательные методы ----------
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")

    def _send_json(self, status, obj):
        body = json.dumps(obj, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Cache-Control", "no-store")
        self._cors()
        self.end_headers()
        self._safe_write(body)

    def _safe_write(self, body):
        try:
            self.wfile.write(body)
        except (BrokenPipeError, ConnectionResetError):
            pass

    def _read_body(self):
        try:
            length = int(self.headers.get("Content-Length") or 0)
        except ValueError:
            length = 0
        if length <= 0 or length > 5_000_000:
            return {}
        raw = self.rfile.read(length)
        try:
            data = json.loads(raw.decode("utf-8"))
            return data if isinstance(data, dict) else {}
        except Exception:
            return {}

    def _auth(self, users, sessions):
        header = self.headers.get("Authorization") or ""
        token = re.sub(r"^Bearer\s+", "", header, flags=re.I).strip()
        if not token:
            return None
        sess = sessions.get(token)
        if not sess:
            return None
        key = sess.get("user")
        user = users.get(key)
        if not user:
            return None
        return {"token": token, "key": key, "user": user}

    @staticmethod
    def _public_user(user):
        return {"name": user.get("name"), "createdAt": user.get("createdAt")}

    # ---------- HTTP ----------
    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.send_header("Content-Length", "0")
        self.end_headers()

    def do_GET(self):
        self._handle("GET")

    def do_POST(self):
        self._handle("POST")

    def _handle(self, method):
        pathname = unquote(urlparse(self.path).path)

        if pathname.startswith("/api/"):
            self._handle_api(method, pathname)
            return

        self._serve_static(pathname)

    # ---------- API ----------
    def _handle_api(self, method, pathname):
        with LOCK:
            users = read_json(USERS_FILE)
            sessions = read_json(SESSIONS_FILE)

            try:
                if pathname == "/api/register" and method == "POST":
                    body = self._read_body()
                    name = normalize_name(body.get("name"))
                    password = str(body.get("password") or "")
                    if len(name) < 2:
                        return self._send_json(400, {"error": "Имя должно быть не короче 2 символов"})
                    if len(password) < 4:
                        return self._send_json(400, {"error": "Пароль должен быть не короче 4 символов"})
                    key = key_of(name)
                    if key in users:
                        return self._send_json(409, {"error": "Такое имя уже занято"})
                    salt = secrets.token_hex(16)
                    users[key] = {
                        "name": name,
                        "salt": salt,
                        "hash": hash_password(password, salt),
                        "progress": {},
                        "certificate": None,
                        "createdAt": now_iso(),
                    }
                    token = secrets.token_hex(24)
                    sessions[token] = {"user": key, "created": now_iso()}
                    write_json(USERS_FILE, users)
                    write_json(SESSIONS_FILE, sessions)
                    return self._send_json(200, {"token": token, "user": self._public_user(users[key])})

                if pathname == "/api/login" and method == "POST":
                    body = self._read_body()
                    key = key_of(body.get("name"))
                    password = str(body.get("password") or "")
                    user = users.get(key)
                    if not user or hash_password(password, user.get("salt", "")) != user.get("hash"):
                        return self._send_json(401, {"error": "Неверное имя или пароль"})
                    token = secrets.token_hex(24)
                    sessions[token] = {"user": key, "created": now_iso()}
                    write_json(SESSIONS_FILE, sessions)
                    return self._send_json(200, {"token": token, "user": self._public_user(user)})

                if pathname == "/api/logout" and method == "POST":
                    auth = self._auth(users, sessions)
                    if auth:
                        sessions.pop(auth["token"], None)
                        write_json(SESSIONS_FILE, sessions)
                    return self._send_json(200, {"ok": True})

                if pathname == "/api/me" and method == "GET":
                    auth = self._auth(users, sessions)
                    if not auth:
                        return self._send_json(401, {"error": "Требуется вход"})
                    return self._send_json(200, {"user": self._public_user(auth["user"])})

                if pathname == "/api/progress" and method == "GET":
                    auth = self._auth(users, sessions)
                    if not auth:
                        return self._send_json(401, {"error": "Требуется вход"})
                    return self._send_json(200, {"progress": auth["user"].get("progress") or {}})

                if pathname == "/api/progress" and method == "POST":
                    auth = self._auth(users, sessions)
                    if not auth:
                        return self._send_json(401, {"error": "Требуется вход"})
                    body = self._read_body()
                    progress = body.get("progress")
                    if not isinstance(progress, dict):
                        progress = {}
                    users[auth["key"]]["progress"] = progress
                    write_json(USERS_FILE, users)
                    return self._send_json(200, {"ok": True})

                if pathname == "/api/leaderboard" and method == "GET":
                    leaders = []
                    for user in users.values():
                        stats = count_progress(user.get("progress"))
                        leaders.append({
                            "name": user.get("name"),
                            "tasks": stats["tasks"],
                            "lessons": stats["lessons"],
                            "time": stats["time"],
                            "certificate": bool(user.get("certificate")),
                        })
                    leaders.sort(key=lambda u: (-u["tasks"], u["time"]))
                    return self._send_json(200, {"leaders": leaders[:50]})

                if pathname == "/api/certificate" and method == "POST":
                    auth = self._auth(users, sessions)
                    if not auth:
                        return self._send_json(401, {"error": "Требуется вход"})
                    cert = auth["user"].get("certificate")
                    if not cert:
                        cert = {
                            "code": "PYA-{}-{}".format(
                                secrets.token_hex(2).upper(), secrets.token_hex(2).upper()
                            ),
                            "date": now_iso(),
                            "name": auth["user"].get("name"),
                        }
                        users[auth["key"]]["certificate"] = cert
                        write_json(USERS_FILE, users)
                    return self._send_json(200, {"certificate": cert})

                if pathname.startswith("/api/verify/") and method == "GET":
                    code = pathname[len("/api/verify/"):].strip().upper()
                    found = None
                    for user in users.values():
                        cert = user.get("certificate")
                        if cert and str(cert.get("code", "")).upper() == code:
                            found = {"name": cert.get("name"), "date": cert.get("date"), "code": cert.get("code")}
                            break
                    if not found:
                        return self._send_json(404, {"valid": False, "error": "Сертификат с таким кодом не найден"})
                    return self._send_json(200, {"valid": True, "certificate": found})

                return self._send_json(404, {"error": "Неизвестный запрос API"})

            except Exception as exc:  # noqa: BLE001
                return self._send_json(500, {"error": "Ошибка сервера: {}".format(exc)})

    # ---------- статические файлы ----------
    def _serve_static(self, pathname):
        rel = pathname if pathname != "/" else "/index.html"
        rel = rel.lstrip("/").replace("\\", "/")
        full = os.path.normpath(os.path.join(ROOT, rel))

        inside = full == ROOT or full.startswith(ROOT + os.sep)
        blocked = rel.startswith("server-data") or os.path.basename(full) in ("server.py", "start.cmd")

        if not inside or blocked:
            self._send_text(403, "Доступ запрещён")
            return

        if not os.path.isfile(full):
            self._send_text(404, "404 — страница не найдена")
            return

        ext = os.path.splitext(full)[1].lower()
        try:
            with open(full, "rb") as f:
                body = f.read()
        except OSError:
            self._send_text(404, "404 — страница не найдена")
            return

        self.send_response(200)
        self.send_header("Content-Type", MIME.get(ext, "application/octet-stream"))
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self._safe_write(body)

    def _send_text(self, status, text):
        body = ("<!DOCTYPE html><html lang=\"ru\"><head><meta charset=\"utf-8\">"
                "<title>{0}</title></head><body style=\"font-family:sans-serif;background:#0f1420;"
                "color:#e7ecf5;padding:40px\"><h1>{0}</h1></body></html>").format(text).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self._safe_write(body)


def main():
    ensure_data()
    httpd = ThreadingHTTPServer((HOST, PORT), Handler)
    print("=" * 52)
    print("  PyAcademy запущен!")
    print("  Локально:  http://localhost:{}".format(PORT))
    print("  Данные:    {}".format(DATA_DIR))
    print("  Остановить: Ctrl+C")
    print("=" * 52)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nСервер остановлен.")
    finally:
        httpd.server_close()


if __name__ == "__main__":
    main()