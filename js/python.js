const PyRunner = (function () {
  const PYODIDE_URL = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/";
  let pyodide = null;
  let loadingPromise = null;

  const HARNESS = `
import sys, io, traceback, builtins

def _koda_input(prompt=''):
    try:
        from js import window
        res = window.prompt(str(prompt))
    except Exception:
        res = None
    if res is None:
        raise EOFError('Ввод отменён пользователем')
    return res

builtins.input = _koda_input

def _koda_run(code, tests=None):
    g = {'__name__': '__main__', 'input': _koda_input}
    buf = io.StringIO()
    old = sys.stdout
    sys.stdout = buf
    error = None
    try:
        exec(compile(code, '<ваш код>', 'exec'), g)
        if tests:
            exec(compile(tests, '<тесты>', 'exec'), g)
    except SystemExit:
        pass
    except BaseException:
        error = traceback.format_exc()
    finally:
        sys.stdout = old
    return [buf.getvalue(), error]
`;

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      const script = document.createElement("script");
      script.src = src;
      script.onload = function () { resolve(); };
      script.onerror = function () {
        reject(new Error("Не удалось загрузить Python (Pyodide). Проверьте подключение к интернету."));
      };
      document.head.appendChild(script);
    });
  }

  function load(onStatus) {
    if (pyodide) return Promise.resolve(pyodide);
    if (loadingPromise) return loadingPromise;

    loadingPromise = (async function () {
      if (onStatus) onStatus("Первый запуск: загружаю Python (может занять 10-20 секунд)...");
      if (!window.loadPyodide) {
        await loadScript(PYODIDE_URL + "pyodide.js");
      }
      const py = await window.loadPyodide({ indexURL: PYODIDE_URL });
      py.runPython(HARNESS);
      pyodide = py;
      return py;
    })();

    return loadingPromise;
  }

  async function run(code, tests, onStatus) {
    const py = await load(onStatus);
    if (onStatus) onStatus("Выполняю код...");
    py.globals.set("_KODA_CODE", code);
    py.globals.set("_KODA_TESTS", tests || "");
    const result = py.runPython("_koda_run(_KODA_CODE, _KODA_TESTS or None)");
    const stdout = result[0];
    const error = result[1];
    if (result.destroy) result.destroy();
    return {
      stdout: stdout == null ? "" : stdout,
      error: error == null ? null : error
    };
  }

  return {
    load: load,
    run: run,
    isLoaded: function () { return !!pyodide; }
  };
})();