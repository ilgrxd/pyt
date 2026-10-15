const Api = (function () {
  const URL_KEY = "pyacademy_server_url";

  function getServerUrl() {
    try { return localStorage.getItem(URL_KEY) || ""; } catch (e) { return ""; }
  }

  function setServerUrl(url) {
    try {
      if (url) localStorage.setItem(URL_KEY, String(url).replace(/\/+$/, ""));
      else localStorage.removeItem(URL_KEY);
    } catch (e) { /* ignore */ }
  }

  function onHttp() {
    return location.protocol === "http:" || location.protocol === "https:";
  }

  function base() {
    return getServerUrl();
  }

  function hasServer() {
    return onHttp() || !!getServerUrl();
  }

  function request(method, path, body, token) {
    const headers = { "Content-Type": "application/json" };
    if (token) headers["Authorization"] = "Bearer " + token;
    return fetch(base() + path, {
      method: method,
      headers: headers,
      body: body ? JSON.stringify(body) : undefined
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) {
        if (!res.ok) throw new Error(data.error || ("Ошибка сервера: " + res.status));
        return data;
      });
    }, function () {
      throw new Error("Нет связи с сервером. Проверьте, что сервер запущен, и адрес в разделе «Аккаунт».");
    });
  }

  return {
    getServerUrl: getServerUrl,
    setServerUrl: setServerUrl,
    hasServer: hasServer,
    register: function (name, password) { return request("POST", "/api/register", { name: name, password: password }); },
    login: function (name, password) { return request("POST", "/api/login", { name: name, password: password }); },
    logout: function (token) { return request("POST", "/api/logout", {}, token); },
    me: function (token) { return request("GET", "/api/me", null, token); },
    getProgress: function (token) { return request("GET", "/api/progress", null, token); },
    saveProgress: function (token, progress) { return request("POST", "/api/progress", { progress: progress }, token); },
    leaderboard: function () { return request("GET", "/api/leaderboard"); },
    issueCertificate: function (token) { return request("POST", "/api/certificate", {}, token); },
    verify: function (code) { return request("GET", "/api/verify/" + encodeURIComponent(code)); }
  };
})();