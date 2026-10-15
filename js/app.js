(function () {
  "use strict";

  var view = document.getElementById("view");
  var moduleTree = document.getElementById("moduleTree");
  var sidebar = document.getElementById("sidebar");
  var overlay = document.getElementById("overlay");
  var toastEl = document.getElementById("toast");
  var profileInput = document.getElementById("profileName");
  var accountBtn = document.getElementById("accountBtn");

  var currentLessonId = null;
  var collapsed = {};

  var FLAT = [];
  CURRICULUM.forEach(function (mod) {
    mod.lessons.forEach(function (lesson) {
      FLAT.push({ module: mod, lesson: lesson });
    });
  });

  var Drafts = {
    key: function () { return "pyacademy_drafts_" + Store.getCurrent(); },
    all: function () {
      try { return JSON.parse(localStorage.getItem(this.key()) || "{}"); } catch (e) { return {}; }
    },
    get: function (id) { return this.all()[id] || ""; },
    set: function (id, code) {
      try {
        var d = this.all();
        d[id] = code;
        localStorage.setItem(this.key(), JSON.stringify(d));
      } catch (e) { /* ignore */ }
    }
  };

  function findEntry(lessonId) {
    for (var i = 0; i < FLAT.length; i++) if (FLAT[i].lesson.id === lessonId) return FLAT[i];
    return null;
  }
  function indexOfLesson(lessonId) {
    for (var i = 0; i < FLAT.length; i++) if (FLAT[i].lesson.id === lessonId) return i;
    return -1;
  }
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function escAttr(s) { return esc(s).replace(/"/g, "&quot;"); }
  function normOut(s) {
    return String(s || "").replace(/\r\n/g, "\n").split("\n")
      .map(function (l) { return l.replace(/\s+$/, ""); }).join("\n").trim();
  }
  function toast(msg, kind) {
    toastEl.textContent = msg;
    toastEl.className = "toast show" + (kind ? " " + kind : "");
    clearTimeout(toast._t);
    toast._t = setTimeout(function () { toastEl.className = "toast"; }, 2800);
  }
  function formatTime(sec) {
    sec = Math.max(0, Math.round(sec || 0));
    var h = Math.floor(sec / 3600);
    var m = Math.floor((sec % 3600) / 60);
    var s = sec % 60;
    var mm = (m < 10 ? "0" : "") + m;
    var ss = (s < 10 ? "0" : "") + s;
    return h > 0 ? h + ":" + mm + ":" + ss : mm + ":" + ss;
  }
  function formatDate(iso) {
    try {
      return new Date(iso).toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
    } catch (e) { return ""; }
  }

  function moduleStats(mod) {
    var total = mod.lessons.length, done = 0;
    mod.lessons.forEach(function (l) { if (Store.lessonStats(l).complete) done++; });
    return { total: total, done: done, percent: total ? Math.round(done / total * 100) : 0 };
  }

  function overallStats() {
    var lessons = 0, doneLessons = 0, hw = 0, hwDone = 0;
    FLAT.forEach(function (entry) {
      lessons++;
      var st = Store.lessonStats(entry.lesson);
      if (st.complete) doneLessons++;
      hw += st.total;
      hwDone += st.done;
    });
    return {
      lessons: lessons, doneLessons: doneLessons, hw: hw, hwDone: hwDone,
      percent: lessons ? Math.round(doneLessons / lessons * 100) : 0
    };
  }

  function updateGlobalProgress() {
    var s = overallStats();
    document.getElementById("globalProgressBar").style.width = s.percent + "%";
    document.getElementById("globalProgressText").textContent = s.percent + "%";
  }

  function nextLessonId() {
    for (var i = 0; i < FLAT.length; i++) {
      if (!Store.lessonStats(FLAT[i].lesson).complete) return FLAT[i].lesson.id;
    }
    return FLAT.length ? FLAT[0].lesson.id : null;
  }

  function updateTopnav(page) {
    document.querySelectorAll(".topnav a").forEach(function (a) {
      a.classList.toggle("active", a.getAttribute("data-nav") === page);
    });
  }

  function updateAccountBtn() {
    if (!accountBtn) return;
    if (Store.isLoggedIn()) {
      accountBtn.textContent = "👤 " + Store.user().name;
      accountBtn.className = "btn btn-outline btn-small";
    } else {
      accountBtn.textContent = "Войти";
      accountBtn.className = "btn btn-small";
    }
  }

  function syncUp() {
    if (!Store.isLoggedIn()) return;
    Store.pushProgress().catch(function () { /* синхронизация не критична */ });
  }

  function openSidebar() { sidebar.classList.add("open"); overlay.classList.add("show"); }
  function closeSidebar() { sidebar.classList.remove("open"); overlay.classList.remove("show"); }

  function renderTree(activeId) {
    var html = "";
    CURRICULUM.forEach(function (mod) {
      var isCollapsed = !!collapsed[mod.id];
      html += '<div class="tree-module' + (isCollapsed ? " collapsed" : "") + '">';
      html += '<div class="tree-module-head" data-toggle="' + mod.id + '">';
      html += '<span class="mod-icon">' + mod.icon + '</span>';
      html += '<span class="mod-title">' + esc(mod.title) + '</span>';
      html += '<span class="chev">▾</span></div>';
      html += '<div class="tree-lessons">';
      mod.lessons.forEach(function (lesson) {
        var st = Store.lessonStats(lesson);
        html += '<div class="tree-lesson' + (st.complete ? " done" : "") + (lesson.id === activeId ? " active" : "") + '" data-lesson="' + lesson.id + '">';
        html += '<span class="dot">' + (st.complete ? "✓" : "") + '</span>';
        html += '<span class="l-title">' + esc(lesson.title) + '</span></div>';
      });
      html += '</div></div>';
    });
    moduleTree.innerHTML = html;
    moduleTree.querySelectorAll("[data-toggle]").forEach(function (el) {
      el.addEventListener("click", function () {
        var id = el.getAttribute("data-toggle");
        collapsed[id] = !collapsed[id];
        renderTree(activeId);
      });
    });
    moduleTree.querySelectorAll("[data-lesson]").forEach(function (el) {
      el.addEventListener("click", function () {
        location.hash = "#/lesson/" + el.getAttribute("data-lesson");
        closeSidebar();
      });
    });
  }

  function refreshProgressUI() {
    renderTree(currentLessonId);
    updateGlobalProgress();
    updateAccountBtn();
  }

  /* ---------------- Запуск Python ---------------- */
  function buildRunner(opts) {
    var wrap = document.createElement("div");

    var editorWrap = document.createElement("div");
    editorWrap.className = "editor-wrap";
    var bar = document.createElement("div");
    bar.className = "editor-bar";
    bar.innerHTML = '<span class="dots"><i></i><i></i><i></i></span>' +
      '<span class="file-name">' + esc(opts.fileName || "main.py") + '</span>' +
      '<span class="spacer"></span>';
    var runBtn = document.createElement("button");
    runBtn.className = "btn btn-run btn-small";
    runBtn.textContent = opts.runText || "▶ Запустить";
    bar.appendChild(runBtn);

    var ta = document.createElement("textarea");
    ta.className = "editor";
    ta.spellcheck = false;
    ta.value = opts.code || "";
    ta.rows = Math.max(3, (opts.code || "").split("\n").length + 1);

    editorWrap.appendChild(bar);
    editorWrap.appendChild(ta);

    var out = document.createElement("div");
    out.className = "output";

    wrap.appendChild(editorWrap);
    wrap.appendChild(out);

    ta.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        var start = ta.selectionStart, end = ta.selectionEnd;
        ta.value = ta.value.slice(0, start) + "    " + ta.value.slice(end);
        ta.selectionStart = ta.selectionEnd = start + 4;
      }
    });

    function setOut(html) { out.className = "output"; out.innerHTML = html; }

    function handle(res) {
      var html = "";
      if (res.error) {
        setOut('<span class="err">' + esc(res.error) + '</span>');
        if (opts.onResult) opts.onResult({ ok: false, error: res.error, stdout: res.stdout });
        return;
      }
      var stdout = res.stdout || "";
      if (opts.expected != null) {
        var ok = normOut(stdout) === normOut(opts.expected);
        if (stdout) html += esc(stdout) + "\n";
        html += ok
          ? '<span class="ok">✓ Верно! Вывод совпадает с ожидаемым.</span>'
          : '<span class="err">✗ Вывод не совпадает с ожидаемым.</span>\n<span class="dim">Ожидалось:</span>\n' + esc(opts.expected);
        setOut(html);
        if (opts.onResult) opts.onResult({ ok: ok, stdout: stdout, error: null });
      } else {
        if (stdout) html += esc(stdout) + "\n";
        html += '<span class="ok">✓ Все проверки пройдены!</span>';
        setOut(html);
        if (opts.onResult) opts.onResult({ ok: true, stdout: stdout, error: null });
      }
    }

    function doRun() {
      runBtn.disabled = true;
      setOut('<span class="dim">Подготовка...</span>');
      PyRunner.run(ta.value, opts.tests || null, function (status) {
        setOut('<span class="dim">' + esc(status) + '</span>');
      }).then(handle).catch(function (err) {
        setOut('<span class="err">' + esc(err.message || String(err)) + '</span>');
        if (opts.onResult) opts.onResult({ ok: false, error: err.message || String(err), stdout: "" });
      }).then(function () { runBtn.disabled = false; });
    }

    runBtn.addEventListener("click", doRun);

    return { el: wrap, textarea: ta, run: doRun, output: out };
  }

  /* ---------------- Карточка домашнего задания ---------------- */
  function homeworkCard(lesson, task, number, opts) {
    opts = opts || {};
    var solved = Store.isHwDone(lesson.id, task.id);
    var el = document.createElement("div");
    el.className = "hw" + (solved ? " done" : "");
    el.id = "hw-" + task.id;

    var hints = task.hints || [];
    var head = '<div class="hw-head"><span class="hw-num">Задание ' + number + '</span>' +
      '<span class="hw-title">' + esc(task.title || "") + '</span>' +
      '<span class="hw-badge"' + (solved ? "" : ' style="display:none"') + '>✓ Выполнено</span></div>';

    var taskHtml = '<div class="hw-task">' + task.task + '</div>';
    if (opts.showLessonLink) {
      taskHtml += '<div class="muted tiny" style="margin-bottom:10px">Урок: <a href="#/lesson/' + lesson.id + '">' + esc(lesson.title) + '</a></div>';
    }

    var timerHtml = '<div class="hw-timer">⏱ <span data-timer>' + formatTime(Store.getTime(lesson.id, task.id)) + '</span>' +
      '<span class="muted tiny" data-best></span></div>';

    var buttons = '<div class="btn-row">' +
      '<button class="btn btn-ghost btn-small" data-hint>Подсказка (' + hints.length + ')</button>' +
      (task.solution ? '<button class="btn btn-ghost btn-small" data-solution>Показать решение</button>' : '') +
      '</div>';

    el.innerHTML = head + taskHtml + timerHtml + '<div data-runner></div>' + buttons +
      '<div class="hints" data-hints></div>' +
      '<div data-solution-box></div>';

    var runner = buildRunner({
      code: Drafts.get(task.id) || task.starter || "",
      fileName: "задание_" + number + ".py",
      runText: "▶ Проверить",
      tests: task.check && task.check.type === "tests" ? task.check.tests : null,
      expected: task.check && task.check.type === "output" ? task.check.expected : null,
      onResult: function (res) {
        if (!res.ok) return;
        stopTimer();
        Store.recordTime(lesson.id, task.id, elapsed);
        var best = Store.getTime(lesson.id, task.id);
        if (best) bestEl.textContent = "Лучшее: " + formatTime(best);
        solved = true;
        Store.markHw(lesson.id, task.id, true);
        el.classList.add("done");
        var badge = el.querySelector(".hw-badge");
        if (badge) badge.style.display = "";
        toast("Задание выполнено! 🎉", "ok");
        refreshProgressUI();
        syncUp();
      }
    });
    el.querySelector("[data-runner]").appendChild(runner.el);
    runner.textarea.addEventListener("input", function () {
      Drafts.set(task.id, runner.textarea.value);
    });

    /* Таймер */
    var timerEl = el.querySelector("[data-timer]");
    var bestEl = el.querySelector("[data-best]");
    var startTs = null, elapsed = 0, tick = null;

    var initialBest = Store.getTime(lesson.id, task.id);
    if (initialBest) bestEl.textContent = "Лучшее: " + formatTime(initialBest);

    function paint() { timerEl.textContent = formatTime(elapsed); }
    function startTimer() {
      if (solved || tick) return;
      startTs = Date.now() - elapsed * 1000;
      tick = setInterval(function () {
        elapsed = (Date.now() - startTs) / 1000;
        paint();
      }, 500);
    }
    function stopTimer() {
      if (tick) { clearInterval(tick); tick = null; }
    }
    runner.textarea.addEventListener("focus", startTimer);
    runner.textarea.addEventListener("input", startTimer);
    paint();

    /* Подсказки */
    var hintIndex = 0;
    var hintsBox = el.querySelector("[data-hints]");
    var hintBtn = el.querySelector("[data-hint]");
    if (!hints.length) hintBtn.style.display = "none";
    hintBtn.addEventListener("click", function () {
      if (hintIndex >= hints.length) return;
      var div = document.createElement("div");
      div.className = "hint";
      div.innerHTML = "<strong>Подсказка " + (hintIndex + 1) + ":</strong> " + hints[hintIndex];
      hintsBox.appendChild(div);
      hintIndex++;
      if (hintIndex >= hints.length) {
        hintBtn.disabled = true;
        hintBtn.textContent = "Все подсказки показаны";
      } else {
        hintBtn.textContent = "Подсказка (" + (hintIndex + 1) + "/" + hints.length + ")";
      }
    });

    /* Решение */
    var solBtn = el.querySelector("[data-solution]");
    var solBox = el.querySelector("[data-solution-box]");
    if (solBtn) {
      solBtn.addEventListener("click", function () {
        if (solBox.innerHTML) {
          solBox.innerHTML = "";
          solBtn.textContent = "Показать решение";
        } else {
          solBox.innerHTML = '<div class="solution"><strong>Решение:</strong><pre><code>' + esc(task.solution) + '</code></pre></div>';
          solBtn.textContent = "Скрыть решение";
        }
      });
    }

    return el;
  }

  /* ---------------- Видео ---------------- */
  function videoSearchButtons(title, query) {
    var q = encodeURIComponent(query || title || "");
    function link(label, url) {
      return '<a class="btn btn-ghost btn-small" target="_blank" rel="noopener" href="' + url + '">' + label + '</a>';
    }
    return '<div class="btn-row">' +
      link("RuTube", "https://rutube.ru/search/?query=" + q) +
      link("VK Видео", "https://vk.com/video?q=" + q) +
      link("Яндекс.Видео", "https://yandex.ru/video/search?text=" + q) +
      link("YouTube (нужен VPN)", "https://www.youtube.com/results?search_query=" + q) +
      '</div>';
  }

  function videoCard(lesson) {
    var v = lesson.video;
    if (!v) return "";
    var inner;
    if (v.youtubeId) {
      inner = '<div class="video-frame"><iframe src="https://www.youtube.com/embed/' + escAttr(v.youtubeId) + '" title="' + escAttr(v.title) + '" allowfullscreen loading="lazy"></iframe></div>' +
        '<div class="muted tiny" style="margin:10px 0 6px">Видео не воспроизводится? В России YouTube работает только через VPN — откройте ролик на другой платформе:</div>' +
        videoSearchButtons(v.title, v.query);
    } else {
      inner = '<div class="video-fallback-box">' +
        '<div style="font-size:1.8rem">🎬</div>' +
        '<div><strong>' + esc(v.title) + '</strong></div>' +
        '<div class="muted tiny">Выберите платформу. YouTube в России работает только через VPN, поэтому используйте RuTube, VK Видео или Яндекс.Видео — они открываются без VPN.</div>' +
        videoSearchButtons(v.title, v.query) +
        '</div>';
    }
    return '<div class="card video-card"><h3>🎬 Видеоурок</h3>' + inner + '</div>';
  }

  /* ---------------- Обзор ---------------- */
  function stat(num, lbl) {
    return '<div class="stat"><div class="num">' + num + '</div><div class="lbl">' + lbl + '</div></div>';
  }

  function renderDashboard() {
    var s = overallStats();
    var html = '<div class="hero"><h1>' + esc(COURSE_META.title) + '</h1><p>' + esc(COURSE_META.subtitle) + '</p>';
    var nextId = nextLessonId();
    if (nextId) {
      var entry = findEntry(nextId);
      html += '<a class="btn" href="#/lesson/' + nextId + '">▶ ' + (s.doneLessons > 0 ? "Продолжить: " : "Начать: ") + esc(entry.lesson.title) + '</a>';
    }
    html += '</div>';

    html += '<div class="stats">' +
      stat(s.doneLessons + " / " + s.lessons, "уроков пройдено") +
      stat(s.hwDone + " / " + s.hw, "заданий выполнено") +
      stat(s.percent + "%", "курс завершён") +
      stat(formatTime(Store.totalTime()), "лучшее время за заданиями") +
      '</div>';

    if (Store.isLoggedIn()) {
      html += '<div class="card"><h3>👤 ' + esc(Store.user().name) + '</h3><p class="muted tiny">Прогресс синхронизируется с сервером. Открывайте сайт с любого устройства и входите под этим аккаунтом.</p>' +
        '<div class="btn-row"><a class="btn btn-small" href="#/account">Управление аккаунтом</a><a class="btn btn-ghost btn-small" href="#/certificate">Сертификат</a></div></div>';
    } else {
      html += '<div class="card"><h3>💾 Сохраните прогресс</h3><p class="muted tiny">Создайте аккаунт — и прогресс будет доступен на всех устройствах, а друзья смогут соревноваться в рейтинге.</p>' +
        '<div class="btn-row"><a class="btn btn-small" href="#/account">Войти или зарегистрироваться</a></div></div>';
    }

    html += '<h2 class="page-title" style="font-size:1.4rem">Модули</h2>';
    CURRICULUM.forEach(function (mod) {
      var st = moduleStats(mod);
      html += '<div class="module-card">' +
        '<div class="module-card-head"><span class="m-icon">' + mod.icon + '</span><h3>' + esc(mod.title) + '</h3>' +
        '<span class="bar-label">' + st.done + '/' + st.total + '</span></div>' +
        '<div class="module-desc">' + esc(mod.description) + '</div>' +
        '<div class="progress-line"><div class="bar"><span style="width:' + st.percent + '%"></span></div><span class="bar-label">' + st.percent + '%</span></div>' +
        '<div class="btn-row" style="margin-top:12px"><a class="btn btn-outline btn-small" href="#/lesson/' + mod.lessons[0].id + '">Открыть модуль</a></div>' +
        '</div>';
    });
    view.innerHTML = html;
  }

  function renderCourse() {
    var html = '<h1 class="page-title">Программа курса</h1><p class="page-sub">' + esc(COURSE_META.subtitle) + '</p>';
    CURRICULUM.forEach(function (mod) {
      var st = moduleStats(mod);
      html += '<div class="module-card">';
      html += '<div class="module-card-head"><span class="m-icon">' + mod.icon + '</span><h3>' + esc(mod.title) + '</h3>' +
        '<span class="bar-label">' + st.done + '/' + st.total + ' уроков</span></div>';
      html += '<div class="module-desc">' + esc(mod.description) + '</div>';
      html += '<div class="progress-line"><div class="bar"><span style="width:' + st.percent + '%"></span></div><span class="bar-label">' + st.percent + '%</span></div>';
      html += '<div class="lesson-list">';
      mod.lessons.forEach(function (lesson, i) {
        var s = Store.lessonStats(lesson);
        html += '<div class="lesson-row" data-goto="' + lesson.id + '">' +
          '<span class="num-badge">' + (i + 1) + '.</span>' +
          '<span class="lr-title">' + esc(lesson.title) + '</span>' +
          '<span class="lr-meta">' + (lesson.duration || 10) + ' мин</span>' +
          '<span class="status-pill' + (s.complete ? " done" : "") + '">' + (s.complete ? "Пройден" : "Не начат") + '</span>' +
          '</div>';
      });
      html += '</div></div>';
    });
    view.innerHTML = html;
    view.querySelectorAll("[data-goto]").forEach(function (el) {
      el.addEventListener("click", function () { location.hash = "#/lesson/" + el.getAttribute("data-goto"); });
    });
  }

  function renderLesson(lessonId) {
    var entry = findEntry(lessonId);
    if (!entry) { view.innerHTML = '<p class="page-sub">Урок не найден.</p>'; return; }
    var mod = entry.module, lesson = entry.lesson;
    var idx = indexOfLesson(lessonId);
    var prev = idx > 0 ? FLAT[idx - 1].lesson : null;
    var next = idx < FLAT.length - 1 ? FLAT[idx + 1].lesson : null;

    var html = '<div class="lesson-head">';
    html += '<div class="breadcrumb">' + mod.icon + ' ' + esc(mod.title) + '</div>';
    html += '<h1 class="page-title">' + esc(lesson.title) + '</h1>';
    html += '<div class="lesson-meta"><span>⏱ ' + (lesson.duration || 10) + ' мин</span><span>Урок ' + (idx + 1) + ' из ' + FLAT.length + '</span></div>';
    html += '</div>';

    html += videoCard(lesson);
    html += '<div class="card"><div class="theory">' + lesson.theory + '</div></div>';

    if (lesson.examples && lesson.examples.length) {
      html += '<h2 class="page-title" style="font-size:1.3rem;margin-top:26px">Примеры кода</h2>';
      lesson.examples.forEach(function (ex, i) {
        html += '<div class="card"><h3>' + esc(ex.title) + '</h3><div data-example="' + i + '"></div></div>';
      });
    }

    var hw = lesson.homework || [];
    html += '<h2 class="page-title" style="font-size:1.3rem;margin-top:26px">Домашнее задание</h2>';
    if (hw.length) {
      html += '<p class="page-sub" style="margin-bottom:14px">Решите задания и нажмите «Проверить». Таймер покажет, сколько времени вы потратили.</p>';
      hw.forEach(function (task) {
        html += '<div data-hw="' + task.id + '"></div>';
      });
    } else {
      html += '<p class="page-sub">Для этого урока нет заданий.</p>';
    }

    html += '<div class="btn-row" style="margin-top:20px"><button class="btn ' + (Store.isRead(lesson.id) ? "btn-run" : "btn-outline") + '" data-complete>' + (Store.isRead(lesson.id) ? "✓ Урок изучен" : "Отметить урок изученным") + '</button></div>';

    html += '<div class="btn-row" style="margin-top:22px;justify-content:space-between">' +
      (prev ? '<a class="btn btn-ghost" href="#/lesson/' + prev.id + '">← ' + esc(prev.title) + '</a>' : '<span></span>') +
      (next ? '<a class="btn" href="#/lesson/' + next.id + '">' + esc(next.title) + ' →</a>' : '<span></span>') +
      '</div>';

    view.innerHTML = html;

    if (lesson.examples) {
      view.querySelectorAll("[data-example]").forEach(function (ph) {
        var i = parseInt(ph.getAttribute("data-example"), 10);
        var ex = lesson.examples[i];
        var runner = buildRunner({ code: ex.code, fileName: "пример_" + (i + 1) + ".py", runText: "▶ Запустить" });
        ph.appendChild(runner.el);
      });
    }

    view.querySelectorAll("[data-hw]").forEach(function (ph) {
      var taskId = ph.getAttribute("data-hw");
      var task = null, number = 0;
      hw.forEach(function (t, i) { if (t.id === taskId) { task = t; number = i + 1; } });
      if (task) ph.appendChild(homeworkCard(lesson, task, number));
    });

    var completeBtn = view.querySelector("[data-complete]");
    if (completeBtn) {
      completeBtn.addEventListener("click", function () {
        var now = !Store.isRead(lesson.id);
        Store.markRead(lesson.id, now);
        completeBtn.textContent = now ? "✓ Урок изучен" : "Отметить урок изученным";
        completeBtn.className = "btn " + (now ? "btn-run" : "btn-outline");
        refreshProgressUI();
        syncUp();
        toast(now ? "Урок отмечен как изученный" : "Отметка снята");
      });
    }
  }

  function renderHomework() {
    var s = overallStats();
    var html = '<h1 class="page-title">Домашние задания</h1>';
    html += '<p class="page-sub">Выполнено ' + s.hwDone + ' из ' + s.hw + ' заданий. Решайте прямо здесь — проверка автоматическая.</p>';
    CURRICULUM.forEach(function (mod) {
      var hasAny = mod.lessons.some(function (l) { return l.homework && l.homework.length; });
      if (!hasAny) return;
      html += '<div class="module-card"><div class="module-card-head"><span class="m-icon">' + mod.icon + '</span><h3>' + esc(mod.title) + '</h3></div>';
      mod.lessons.forEach(function (lesson) {
        var hw = lesson.homework || [];
        if (!hw.length) return;
        html += '<div class="muted tiny" style="margin:12px 0 6px">' + esc(lesson.title) + '</div>';
        hw.forEach(function (task, i) {
          html += '<div data-hwcard="' + task.id + '" data-lesson="' + lesson.id + '" data-num="' + (i + 1) + '"></div>';
        });
      });
      html += '</div>';
    });
    view.innerHTML = html;
    view.querySelectorAll("[data-hwcard]").forEach(function (ph) {
      var taskId = ph.getAttribute("data-hwcard");
      var lessonId = ph.getAttribute("data-lesson");
      var number = parseInt(ph.getAttribute("data-num"), 10);
      var entry = findEntry(lessonId);
      var task = null;
      (entry.lesson.homework || []).forEach(function (t) { if (t.id === taskId) task = t; });
      if (task) ph.appendChild(homeworkCard(entry.lesson, task, number, { showLessonLink: true }));
    });
  }

  function renderPlayground() {
    view.innerHTML = '<h1 class="page-title">Песочница</h1>' +
      '<p class="page-sub">Экспериментируйте: пишите любой код и запускайте его прямо в браузере.</p>' +
      '<div class="btn-row" style="margin-bottom:14px">' +
      '<button class="btn btn-ghost btn-small" data-snippet="hello">Привет</button>' +
      '<button class="btn btn-ghost btn-small" data-snippet="loop">Цикл</button>' +
      '<button class="btn btn-ghost btn-small" data-snippet="func">Функция</button>' +
      '<button class="btn btn-ghost btn-small" data-snippet="cls">Класс</button>' +
      '</div><div id="pg"></div>';
    var runner = buildRunner({
      code: '# Пишите код здесь\nprint("Привет, мир!")\n',
      fileName: "playground.py",
      runText: "▶ Запустить"
    });
    document.getElementById("pg").appendChild(runner.el);

    var snippets = {
      hello: 'name = "друг"\nprint(f"Привет, {name}!")',
      loop: 'for i in range(1, 6):\n    print(i, "в квадрате =", i ** 2)',
      func: 'def greet(name):\n    return f"Привет, {name}!"\n\nprint(greet("Аня"))',
      cls: 'class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f"{self.name}: Гав!"\n\nprint(Dog("Рекс").bark())'
    };
    view.querySelectorAll("[data-snippet]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        runner.textarea.value = snippets[btn.getAttribute("data-snippet")];
        runner.textarea.focus();
      });
    });
  }

  function renderVideos() {
    var html = '<h1 class="page-title">Видеоуроки</h1><p class="page-sub">Подборки видеороликов по каждой теме курса.</p>' +
      '<div class="card" style="border-color:var(--accent)"><strong>Совет:</strong> в России YouTube доступен только через VPN. Если ролик не открывается, используйте кнопки <b>RuTube</b>, <b>VK Видео</b> или <b>Яндекс.Видео</b> — они работают без VPN.</div>';
    CURRICULUM.forEach(function (mod) {
      html += '<h2 class="page-title" style="font-size:1.25rem;margin-top:22px">' + mod.icon + ' ' + esc(mod.title) + '</h2>';
      mod.lessons.forEach(function (lesson) {
        var v = lesson.video;
        if (!v) return;
        html += '<div class="card"><h3>' + esc(lesson.title) + '</h3>';
        if (v.youtubeId) {
          html += '<div class="video-frame"><iframe src="https://www.youtube.com/embed/' + escAttr(v.youtubeId) + '" allowfullscreen loading="lazy"></iframe></div>' +
            '<div style="margin-top:10px">' + videoSearchButtons(v.title, v.query) + '</div>';
        } else {
          html += '<div class="muted tiny" style="margin-bottom:8px">Выберите платформу для просмотра:</div>' +
            videoSearchButtons(v.title, v.query);
        }
        html += '<div style="margin-top:10px"><a class="btn btn-ghost btn-small" href="#/lesson/' + lesson.id + '">Открыть урок</a></div>';
        html += '</div>';
      });
    });
    view.innerHTML = html;
  }

  /* ---------------- Аккаунт ---------------- */
  function authForms() {
    return '<div class="card"><h3>Вход или регистрация</h3>' +
      '<p class="muted">Создайте аккаунт, чтобы прогресс сохранялся на сервере и был доступен с любого устройства.</p>' +
      '<div class="form-row"><label>Имя</label><input id="authName" class="input" type="text" maxlength="20" placeholder="Ваше имя" /></div>' +
      '<div class="form-row"><label>Пароль</label><input id="authPass" class="input" type="password" placeholder="Минимум 4 символа" /></div>' +
      '<div class="btn-row"><button class="btn" data-login>Войти</button>' +
      '<button class="btn btn-outline" data-register>Зарегистрироваться</button></div>' +
      '<div class="muted tiny" data-auth-msg style="margin-top:10px"></div></div>';
  }

  function serverSettings() {
    var cur = Api.getServerUrl();
    var auto = location.protocol === "http:" || location.protocol === "https:";
    return '<div class="card"><h3>Сервер</h3>' +
      '<p class="muted tiny">' + (auto
        ? "Сайт открыт с сервера — адрес определяется автоматически."
        : "Сайт открыт как файл. Укажите адрес сервера, чтобы включить аккаунты и синхронизацию.") + '</p>' +
      '<div class="form-row"><label>Адрес сервера</label><input id="serverUrl" class="input" type="text" placeholder="http://localhost:3000" value="' + escAttr(cur) + '" /></div>' +
      '<div class="btn-row"><button class="btn btn-small" data-save-server>Сохранить адрес</button>' +
      '<button class="btn btn-ghost btn-small" data-clear-server>Сбросить</button></div></div>';
  }

  function leaderboardHtml(leaders) {
    if (!leaders || !leaders.length) return '<p class="muted">Пока нет данных.</p>';
    var html = '<div class="leaderboard"><div class="lb-row lb-head"><span>#</span><span>Ученик</span><span>Задания</span><span>Время</span></div>';
    leaders.forEach(function (u, i) {
      html += '<div class="lb-row"><span class="lb-rank">' + (i + 1) + '</span>' +
        '<span class="lb-name">' + esc(u.name) + (u.certificate ? ' <span class="lb-cert" title="Есть сертификат">🎓</span>' : '') + '</span>' +
        '<span>' + u.tasks + '</span><span>' + formatTime(u.time) + '</span></div>';
    });
    html += '</div>';
    return html;
  }

  function renderAccount() {
    var html = '<h1 class="page-title">Аккаунт и синхронизация</h1>';
    if (Store.isLoggedIn()) {
      var u = Store.user();
      html += '<div class="card"><h3>👤 ' + esc(u.name) + '</h3>' +
        '<p class="muted">Прогресс синхронизируется между устройствами, где вы входите под этим аккаунтом.</p>' +
        '<div class="btn-row"><button class="btn" data-sync>🔄 Синхронизировать</button>' +
        '<button class="btn btn-ghost" data-logout>Выйти</button></div>' +
        '<div class="muted tiny" data-sync-status style="margin-top:10px"></div></div>';
      html += '<div class="card"><h3>🏆 Рейтинг учеников</h3><div data-leaderboard><p class="muted">Загрузка...</p></div></div>';
    } else {
      html += authForms();
    }
    html += serverSettings();
    view.innerHTML = html;

    var msg = view.querySelector("[data-auth-msg]");

    function authAction(kind) {
      var nameEl = view.querySelector("#authName");
      var passEl = view.querySelector("#authPass");
      if (!nameEl || !passEl) return;
      var name = nameEl.value.trim();
      var pass = passEl.value;
      if (!name || !pass) { if (msg) msg.textContent = "Введите имя и пароль."; return; }
      if (msg) msg.textContent = "Подключение к серверу...";
      var action = kind === "register" ? Store.register(name, pass) : Store.login(name, pass);
      action.then(function () {
        return Store.pullProgress().catch(function () { return false; });
      }).then(function () {
        toast("Вы вошли как " + Store.user().name, "ok");
        updateAccountBtn();
        route();
      }).catch(function (err) {
        if (msg) msg.textContent = "Ошибка: " + err.message;
      });
    }

    var loginBtn = view.querySelector("[data-login]");
    var regBtn = view.querySelector("[data-register]");
    if (loginBtn) loginBtn.addEventListener("click", function () { authAction("login"); });
    if (regBtn) regBtn.addEventListener("click", function () { authAction("register"); });

    var syncBtn = view.querySelector("[data-sync]");
    if (syncBtn) {
      syncBtn.addEventListener("click", function () {
        var st = view.querySelector("[data-sync-status]");
        if (st) st.textContent = "Синхронизация...";
        Store.pullProgress().then(function () {
          if (st) st.textContent = "Готово! Прогресс синхронизирован.";
          toast("Прогресс синхронизирован", "ok");
          updateGlobalProgress();
        }).catch(function (err) {
          if (st) st.textContent = "Ошибка: " + err.message;
        });
      });
    }

    var logoutBtn = view.querySelector("[data-logout]");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", function () {
        Store.logout();
        updateAccountBtn();
        toast("Вы вышли из аккаунта");
        route();
      });
    }

    var saveServer = view.querySelector("[data-save-server]");
    if (saveServer) {
      saveServer.addEventListener("click", function () {
        var el = view.querySelector("#serverUrl");
        Api.setServerUrl(el.value.trim());
        toast("Адрес сервера сохранён", "ok");
      });
    }
    var clearServer = view.querySelector("[data-clear-server]");
    if (clearServer) {
      clearServer.addEventListener("click", function () {
        Api.setServerUrl("");
        var el = view.querySelector("#serverUrl");
        if (el) el.value = "";
        toast("Адрес сервера сброшен");
      });
    }

    var lb = view.querySelector("[data-leaderboard]");
    if (lb) {
      Api.leaderboard().then(function (r) {
        lb.innerHTML = leaderboardHtml(r.leaders);
      }).catch(function (err) {
        lb.innerHTML = '<p class="muted">Не удалось загрузить рейтинг: ' + esc(err.message) + '</p>';
      });
    }
  }

  /* ---------------- Сертификат ---------------- */
  function certificateHtml(cert) {
    var s = overallStats();
    var name = Store.isLoggedIn() ? Store.user().name : Store.getCurrent();
    return '<div class="certificate" id="certificate">' +
      '<div class="cert-inner">' +
      '<div class="cert-logo">🐍</div>' +
      '<div class="cert-title">Сертификат об окончании курса</div>' +
      '<div class="cert-sub">PyAcademy — «' + esc(COURSE_META.title) + '»</div>' +
      '<div class="cert-name">' + esc(name) + '</div>' +
      '<div class="cert-text">успешно завершил(а) интерактивный курс по языку Python, выполнив ' +
      s.lessons + ' уроков и ' + s.hw + ' практических заданий.</div>' +
      '<div class="cert-meta"><span>Дата: ' + formatDate(cert.date) + '</span><span>Код: ' + esc(cert.code) + '</span></div>' +
      '</div></div>';
  }

  function renderCertificate() {
    var s = overallStats();
    var complete = s.percent === 100;
    var html = '<h1 class="page-title">Сертификат</h1>';

    if (!complete) {
      html += '<div class="card"><h3>Сертификат пока недоступен</h3>' +
        '<p class="muted">Чтобы получить сертификат, нужно пройти весь курс: отметить изученными все уроки и выполнить все задания.</p>' +
        '<div class="progress-line"><div class="bar"><span style="width:' + s.percent + '%"></span></div><span class="bar-label">' + s.percent + '%</span></div>' +
        '<p class="muted tiny" style="margin-top:10px">Пройдено уроков: ' + s.doneLessons + ' из ' + s.lessons + '. Выполнено заданий: ' + s.hwDone + ' из ' + s.hw + '.</p>' +
        '<div class="btn-row"><a class="btn btn-small" href="#/dashboard">Вернуться к курсу</a></div></div>';
      view.innerHTML = html;
      return;
    }

    var cert = Store.ensureCertificate();
    html += '<div class="no-print btn-row" style="margin-bottom:16px">' +
      '<button class="btn" data-print>🖨 Печать / сохранить в PDF</button>' +
      '<a class="btn btn-ghost" href="#/verify/' + encodeURIComponent(cert.code) + '">Проверить сертификат</a></div>';
    html += certificateHtml(cert);

    if (Store.isLoggedIn()) {
      html += '<div class="no-print card" style="margin-top:16px"><h3>Проверяемый сертификат</h3>' +
        '<p class="muted tiny">Зарегистрируйте сертификат на сервере — тогда любой сможет проверить его подлинность по коду на странице «Проверка».</p>' +
        '<div class="btn-row"><button class="btn btn-small" data-issue>Зарегистрировать на сервере</button></div>' +
        '<div class="muted tiny" data-issue-status style="margin-top:8px"></div></div>';
    } else {
      html += '<div class="no-print card" style="margin-top:16px"><p class="muted tiny">Это локальный сертификат. Чтобы он стал проверяемым по коду, войдите в аккаунт и зарегистрируйте его на сервере.</p></div>';
    }

    view.innerHTML = html;

    var printBtn = view.querySelector("[data-print]");
    if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

    var issueBtn = view.querySelector("[data-issue]");
    if (issueBtn) {
      issueBtn.addEventListener("click", function () {
        var st = view.querySelector("[data-issue-status]");
        if (st) st.textContent = "Отправка на сервер...";
        Api.issueCertificate(Store.token()).then(function (r) {
          Store.setCertificate(r.certificate);
          if (st) st.textContent = "Готово! Код сертификата: " + r.certificate.code;
          toast("Сертификат зарегистрирован", "ok");
          renderCertificate();
        }).catch(function (err) {
          if (st) st.textContent = "Ошибка: " + err.message;
        });
      });
    }
  }

  function renderVerify(code) {
    var html = '<h1 class="page-title">Проверка сертификата</h1>' +
      '<div class="card"><p class="muted">Введите код сертификата, чтобы проверить его подлинность.</p>' +
      '<div class="form-row"><label>Код</label><input id="verifyCode" class="input" type="text" placeholder="PYA-XXXX-XXXX" value="' + escAttr(code || "") + '" /></div>' +
      '<div class="btn-row"><button class="btn" data-verify>Проверить</button></div>' +
      '<div data-verify-result style="margin-top:12px"></div></div>';
    view.innerHTML = html;

    function doVerify() {
      var el = view.querySelector("#verifyCode");
      var box = view.querySelector("[data-verify-result]");
      var value = (el.value || "").trim();
      if (!value) { box.innerHTML = '<p class="muted">Введите код.</p>'; return; }
      box.innerHTML = '<p class="muted">Проверка...</p>';
      Api.verify(value).then(function (r) {
        var c = r.certificate;
        box.innerHTML = '<div class="solution"><strong>✓ Сертификат подлинный</strong><br>Владелец: ' + esc(c.name) +
          '<br>Дата выдачи: ' + formatDate(c.date) + '<br>Код: ' + esc(c.code) + '</div>';
      }).catch(function (err) {
        box.innerHTML = '<div class="hint">✗ ' + esc(err.message) + '</div>';
      });
    }

    var btn = view.querySelector("[data-verify]");
    if (btn) btn.addEventListener("click", doVerify);
    if (code) doVerify();
  }

  /* ---------------- Маршрутизация ---------------- */
  function route() {
    closeSidebar();
    var hash = location.hash || "#/dashboard";
    var parts = hash.replace(/^#\//, "").split("/");
    var page = parts[0] || "dashboard";
    currentLessonId = null;

    if (page === "lesson" && parts[1]) {
      currentLessonId = parts[1];
      renderLesson(parts[1]);
    } else if (page === "course") {
      renderCourse();
    } else if (page === "homework") {
      renderHomework();
    } else if (page === "playground") {
      renderPlayground();
    } else if (page === "videos") {
      renderVideos();
    } else if (page === "account") {
      renderAccount();
    } else if (page === "certificate") {
      renderCertificate();
    } else if (page === "verify") {
      renderVerify(parts[1] ? decodeURIComponent(parts[1]) : "");
    } else {
      renderDashboard();
    }

    renderTree(currentLessonId);
    updateGlobalProgress();
    updateTopnav(page);
    updateAccountBtn();
    window.scrollTo(0, 0);
  }

  function init() {
    profileInput.value = Store.getCurrent();
    profileInput.disabled = Store.isLoggedIn();
    profileInput.addEventListener("change", function () {
      Store.setCurrent(profileInput.value);
      profileInput.value = Store.getCurrent();
      toast("Профиль: " + Store.getCurrent());
      route();
    });
    document.getElementById("resetProgress").addEventListener("click", function () {
      if (window.confirm("Сбросить весь прогресс профиля «" + Store.getCurrent() + "»?")) {
        Store.reset();
        toast("Прогресс сброшен");
        route();
      }
    });
    document.getElementById("menuBtn").addEventListener("click", openSidebar);
    overlay.addEventListener("click", closeSidebar);
    if (accountBtn) accountBtn.addEventListener("click", function () { location.hash = "#/account"; });
    window.addEventListener("hashchange", route);
    updateAccountBtn();
    route();

    if (Store.isLoggedIn()) {
      Store.pullProgress().then(function () { route(); }).catch(function () { /* оффлайн */ });
    }
  }

  init();
})();