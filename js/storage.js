const Store = (function () {
  const KEY = "pyacademy_v1";
  const SESSION_KEY = "pyacademy_session";
  let state = null;
  let session = null;

  function defaults() {
    return { current: "Ученик", profiles: { "Ученик": { progress: {} } } };
  }

  function load() {
    if (state) return state;
    try {
      const raw = localStorage.getItem(KEY);
      state = raw ? JSON.parse(raw) : defaults();
    } catch (e) {
      state = defaults();
    }
    if (!state || typeof state !== "object" || !state.profiles) state = defaults();
    if (!state.current) state.current = "Ученик";
    if (!state.profiles[state.current]) state.profiles[state.current] = { progress: {} };
    return state;
  }

  function save() {
    try {
      localStorage.setItem(KEY, JSON.stringify(load()));
    } catch (e) { /* хранилище недоступно — работаем в памяти */ }
  }

  function getCurrent() {
    return load().current;
  }

  function setCurrent(name) {
    name = (name || "").trim() || "Ученик";
    const s = load();
    s.current = name;
    if (!s.profiles[name]) s.profiles[name] = { progress: {} };
    save();
    return name;
  }

  function profile() {
    const s = load();
    return s.profiles[s.current];
  }

  function lessonRec(lessonId) {
    const p = profile();
    if (!p.progress[lessonId]) p.progress[lessonId] = { read: false, homework: {}, time: {} };
    const rec = p.progress[lessonId];
    if (!rec.homework) rec.homework = {};
    if (!rec.time) rec.time = {};
    return rec;
  }

  function isRead(lessonId) { return !!lessonRec(lessonId).read; }

  function markRead(lessonId, value) {
    lessonRec(lessonId).read = value !== false;
    save();
  }

  function isHwDone(lessonId, taskId) { return !!lessonRec(lessonId).homework[taskId]; }

  function markHw(lessonId, taskId, value) {
    lessonRec(lessonId).homework[taskId] = value !== false;
    save();
  }

  function getTime(lessonId, taskId) { return lessonRec(lessonId).time[taskId] || 0; }

  function recordTime(lessonId, taskId, seconds) {
    seconds = Math.round(seconds);
    if (!(seconds > 0)) return;
    const rec = lessonRec(lessonId);
    const cur = rec.time[taskId];
    if (!cur || seconds < cur) rec.time[taskId] = seconds;
    save();
  }

  function totalTime() {
    let total = 0;
    const prog = profile().progress || {};
    Object.keys(prog).forEach(function (lid) {
      const t = prog[lid].time || {};
      Object.keys(t).forEach(function (k) { total += t[k] || 0; });
    });
    return total;
  }

  function lessonStats(lesson) {
    const rec = lessonRec(lesson.id);
    const hw = lesson.homework || [];
    let done = 0;
    hw.forEach(function (task) { if (rec.homework[task.id]) done++; });
    const complete = hw.length > 0 ? done === hw.length : !!rec.read;
    return { total: hw.length, done: done, read: !!rec.read, complete: complete };
  }

  function reset() {
    const s = load();
    s.profiles[s.current] = { progress: {} };
    save();
  }

  /* ---------- Сертификат ---------- */
  function certificate() {
    const p = profile();
    return p.certificate || null;
  }

  function setCertificate(cert) {
    profile().certificate = cert;
    save();
    return cert;
  }

  function localCertificateCode() {
    let base = getCurrent() + "|" + new Date().toISOString().slice(0, 10);
    let hash = 0;
    for (let i = 0; i < base.length; i++) {
      hash = (hash * 31 + base.charCodeAt(i)) >>> 0;
    }
    const part = ("0000" + hash.toString(16).toUpperCase()).slice(-4);
    return "PYA-LOCAL-" + part;
  }

  function ensureCertificate() {
    let cert = certificate();
    if (!cert) {
      cert = { code: localCertificateCode(), date: new Date().toISOString(), local: true };
      setCertificate(cert);
    }
    return cert;
  }

  /* ---------- Аккаунт и синхронизация ---------- */
  function loadSession() {
    if (session) return session;
    try { session = JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch (e) { session = null; }
    return session;
  }

  function saveSession(s) {
    session = s;
    try {
      if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s));
      else localStorage.removeItem(SESSION_KEY);
    } catch (e) { /* ignore */ }
  }

  function isLoggedIn() {
    const s = loadSession();
    return !!(s && s.token);
  }

  function user() {
    const s = loadSession();
    return s ? s.user : null;
  }

  function token() {
    const s = loadSession();
    return s ? s.token : null;
  }

  function mergeProgress(local, remote) {
    const out = {};
    function ensure(id) {
      if (!out[id]) out[id] = { read: false, homework: {}, time: {} };
      if (!out[id].homework) out[id].homework = {};
      if (!out[id].time) out[id].time = {};
      return out[id];
    }
    [local || {}, remote || {}].forEach(function (src) {
      Object.keys(src).forEach(function (lid) {
        const s = src[lid] || {};
        const d = ensure(lid);
        d.read = d.read || !!s.read;
        Object.keys(s.homework || {}).forEach(function (tid) {
          if (s.homework[tid]) d.homework[tid] = true;
        });
        Object.keys(s.time || {}).forEach(function (tid) {
          const v = s.time[tid];
          if (v && (!d.time[tid] || v < d.time[tid])) d.time[tid] = v;
        });
      });
    });
    return out;
  }

  function applySession(resp) {
    saveSession({ token: resp.token, user: resp.user });
    setCurrent(resp.user.name);
  }

  function register(name, password) {
    return Api.register(name, password).then(function (r) {
      applySession(r);
      return r;
    });
  }

  function login(name, password) {
    return Api.login(name, password).then(function (r) {
      applySession(r);
      return r;
    });
  }

  function logout() {
    const t = token();
    saveSession(null);
    if (t) { Api.logout(t).catch(function () { /* не критично */ }); }
  }

  function pushProgress() {
    if (!isLoggedIn()) return Promise.resolve(false);
    return Api.saveProgress(token(), profile().progress).then(function () { return true; });
  }

  function pullProgress() {
    if (!isLoggedIn()) return Promise.resolve(false);
    return Api.getProgress(token()).then(function (r) {
      const merged = mergeProgress(profile().progress, r.progress || {});
      profile().progress = merged;
      save();
      return Api.saveProgress(token(), merged).then(function () { return true; });
    });
  }

  return {
    load: load,
    save: save,
    getCurrent: getCurrent,
    setCurrent: setCurrent,
    profile: profile,
    isRead: isRead,
    markRead: markRead,
    isHwDone: isHwDone,
    markHw: markHw,
    getTime: getTime,
    recordTime: recordTime,
    totalTime: totalTime,
    lessonStats: lessonStats,
    reset: reset,
    certificate: certificate,
    setCertificate: setCertificate,
    ensureCertificate: ensureCertificate,
    isLoggedIn: isLoggedIn,
    user: user,
    token: token,
    register: register,
    login: login,
    logout: logout,
    pushProgress: pushProgress,
    pullProgress: pullProgress,
    mergeProgress: mergeProgress
  };
})();