const COURSE_META = {
  title: "Python: от новичка до профи",
  subtitle: "Пошаговый интерактивный курс с домашними заданиями, подсказками и видео. Код выполняется прямо в браузере."
};

const CURRICULUM = [
  {
    id: "m1",
    title: "Введение в Python",
    icon: "🚀",
    description: "Что такое Python, зачем он нужен, и как написать первую программу.",
    lessons: [
      {
        id: "m1l1",
        title: "Что такое Python и первая программа",
        duration: 12,
        video: { title: "Знакомство с Python", query: "Python с нуля урок 1 первая программа print" },
        theory: `
          <p><strong>Python</strong> — один из самых популярных языков программирования в мире. На нём пишут сайты и веб-сервисы, анализируют данные, обучают нейросети, автоматизируют рутину и создают игры.</p>
          <p>Почему Python удобен для старта:</p>
          <ul>
            <li>простой и читаемый синтаксис — код похож на английский язык;</li>
            <li>огромное количество готовых библиотек на любой случай;</li>
            <li>большое сообщество: на любой вопрос легко найти ответ.</li>
          </ul>
          <p>Первая программа — классическое приветствие. Функция <code>print()</code> выводит текст на экран. Текст обязательно заключается в кавычки.</p>
          <div class="note">Запустите пример ниже прямо на странице: Python работает в вашем браузере, ничего устанавливать не нужно.</div>
        `,
        examples: [
          { title: "Привет, мир!", code: `print("Привет, мир!")` },
          { title: "Несколько строк и вычисления", code: `print("Меня зовут Аня")\nprint("Я учу Python")\nprint(2 + 2)` }
        ],
        homework: [
          {
            id: "m1l1h1",
            title: "Первое приветствие",
            task: `Напишите программу, которая выводит на экран одну строку: <code>Привет, мир!</code>`,
            starter: `# Напишите ваш код ниже\n`,
            check: { type: "output", expected: "Привет, мир!" },
            hints: [
              "Используйте функцию print().",
              "Текст нужно заключить в кавычки: print(\"...\")."
            ],
            solution: `print("Привет, мир!")`
          },
          {
            id: "m1l1h2",
            title: "Три строки",
            task: `Выведите три строки строго по порядку:<br>1) <code>Я изучаю Python</code><br>2) <code>Это мой первый код</code><br>3) <code>Ура!</code>`,
            starter: ``,
            check: { type: "output", expected: "Я изучаю Python\nЭто мой первый код\nУра!" },
            hints: [
              "Каждая строка — отдельный вызов print().",
              "Порядок вызовов print() определяет порядок строк на экране."
            ],
            solution: `print("Я изучаю Python")\nprint("Это мой первый код")\nprint("Ура!")`
          }
        ]
      },
      {
        id: "m1l2",
        title: "Переменные и типы данных",
        duration: 15,
        video: { title: "Переменные и типы данных", query: "Python переменные типы данных урок для начинающих" },
        theory: `
          <p><strong>Переменная</strong> — это имя, под которым хранится значение. Создаётся простым присваиванием через знак <code>=</code>.</p>
          <p>Основные типы данных:</p>
          <ul>
            <li><code>int</code> — целые числа: 1, 42, -7;</li>
            <li><code>float</code> — дробные числа: 3.14, -0.5;</li>
            <li><code>str</code> — строки (текст): "Python";</li>
            <li><code>bool</code> — логический тип: True или False.</li>
          </ul>
          <p>Узнать тип значения можно функцией <code>type()</code>. Python — язык с динамической типизацией: тип определяется автоматически по значению.</p>
          <div class="warn">Имя переменной не может начинаться с цифры и не должно совпадать с ключевыми словами (if, for, class и т.д.). Регистр важен: Age и age — разные переменные.</div>
        `,
        examples: [
          { title: "Переменные разных типов", code: `name = "Аня"\nage = 14\nheight = 1.62\nis_student = True\nprint(name, age, height, is_student)` },
          { title: "Узнаём тип", code: `x = 10\ny = 3.5\nz = "текст"\nprint(type(x))\nprint(type(y))\nprint(type(z))` }
        ],
        homework: [
          {
            id: "m1l2h1",
            title: "Анкета",
            task: `Создайте переменные: <code>name</code> (строка), <code>age</code> (целое число), <code>height</code> (дробное число). Затем выведите их значения с помощью одного <code>print()</code>.`,
            starter: `name = \nage = \nheight = \nprint(...)\n`,
            check: { type: "tests", tests: `assert isinstance(name, str), "name должно быть строкой"\nassert isinstance(age, int), "age должно быть целым числом (int)"\nassert isinstance(height, float), "height должно быть дробным числом (float)"` },
            hints: [
              "Строку пишут в кавычках: name = \"Аня\".",
              "Дробное число записывают с точкой: height = 1.75.",
              "print() принимает несколько значений через запятую: print(name, age)."
            ],
            solution: `name = "Аня"\nage = 14\nheight = 1.62\nprint(name, age, height)`
          },
          {
            id: "m1l2h2",
            title: "Поменяй местами",
            task: `Даны переменные <code>a = 1</code> и <code>b = 2</code>. Поменяйте их значения так, чтобы <code>a</code> стало равно 2, а <code>b</code> — 1.`,
            starter: `a = 1\nb = 2\n# поменяйте значения\n`,
            check: { type: "tests", tests: `assert a == 2 and b == 1, "a должно быть 2, а b — 1"` },
            hints: [
              "В Python можно поменять значения одной строкой: a, b = b, a.",
              "Либо используйте временную переменную: c = a; a = b; b = c."
            ],
            solution: `a = 1\nb = 2\na, b = b, a\nprint(a, b)`
          }
        ]
      }
    ]
  },
  {
    id: "m2",
    title: "Числа и строки",
    icon: "🔢",
    description: "Арифметика, работа с текстом, ввод данных и форматирование.",
    lessons: [
      {
        id: "m2l1",
        title: "Числа и арифметика",
        duration: 15,
        video: { title: "Арифметические операции", query: "Python арифметические операции // % ** урок" },
        theory: `
          <p>Python умеет работать как обычный калькулятор. Основные операторы:</p>
          <ul>
            <li><code>+</code> сложение, <code>-</code> вычитание, <code>*</code> умножение;</li>
            <li><code>/</code> деление — всегда даёт <code>float</code> (например, 7 / 2 = 3.5);</li>
            <li><code>//</code> целочисленное деление (7 // 2 = 3);</li>
            <li><code>%</code> остаток от деления (7 % 2 = 1);</li>
            <li><code>**</code> возведение в степень (2 ** 3 = 8).</li>
          </ul>
          <p>Порядок операций как в математике: сначала <code>**</code>, затем <code>*</code>, <code>/</code>, <code>//</code>, <code>%</code>, потом <code>+</code> и <code>-</code>. Скобки меняют порядок.</p>
          <p>Полезные функции: <code>round(x, n)</code> — округление, <code>abs(x)</code> — модуль числа, <code>min()</code>/<code>max()</code>.</p>
        `,
        examples: [
          { title: "Базовые операции", code: `a = 7\nb = 2\nprint(a + b)\nprint(a - b)\nprint(a * b)\nprint(a / b)\nprint(a // b)\nprint(a % b)\nprint(a ** b)` },
          { title: "Округление и порядок операций", code: `print(2 + 3 * 4)\nprint((2 + 3) * 4)\nprint(round(3.14159, 2))` }
        ],
        homework: [
          {
            id: "m2l1h1",
            title: "Площадь прямоугольника",
            task: `Прямоугольник имеет стороны <code>5</code> и <code>8</code>. Вычислите его площадь и выведите только число.`,
            starter: `# посчитайте площадь и выведите её\n`,
            check: { type: "output", expected: "40" },
            hints: [
              "Площадь прямоугольника = длина * ширина.",
              "Выведите результат: print(5 * 8)."
            ],
            solution: `print(5 * 8)`
          },
          {
            id: "m2l1h2",
            title: "Степени числа",
            task: `Дано число <code>n = 7</code>. Выведите в двух строках: сначала его квадрат, затем куб.`,
            starter: `n = 7\n`,
            check: { type: "output", expected: "49\n343" },
            hints: [
              "Квадрат — это n ** 2, куб — n ** 3.",
              "Сделайте два отдельных print()."
            ],
            solution: `n = 7\nprint(n ** 2)\nprint(n ** 3)`
          }
        ]
      },
      {
        id: "m2l2",
        title: "Строки: индексы, срезы, методы",
        duration: 18,
        video: { title: "Работа со строками", query: "Python строки срезы методы upper split урок" },
        theory: `
          <p>Строка — это последовательность символов. Длину строки даёт функция <code>len(s)</code>.</p>
          <p>К каждому символу можно обратиться по индексу (нумерация с нуля): <code>s[0]</code> — первый символ. Отрицательные индексы считают с конца: <code>s[-1]</code> — последний символ.</p>
          <p><strong>Срез</strong> <code>s[начало:конец]</code> берёт часть строки. Конец не включается: <code>s[0:3]</code> — первые три символа. Строки можно склеивать знаком <code>+</code> и повторять знаком <code>*</code>.</p>
          <p>Популярные методы строк:</p>
          <ul>
            <li><code>s.upper()</code> / <code>s.lower()</code> — верхний / нижний регистр;</li>
            <li><code>s.strip()</code> — убрать пробелы по краям;</li>
            <li><code>s.replace("а", "б")</code> — замена подстроки;</li>
            <li><code>s.split(",")</code> — разбить строку в список;</li>
            <li><code>s.startswith("x")</code> — проверка начала строки.</li>
          </ul>
          <div class="note">Строки неизменяемы: методы возвращают новую строку, а не меняют исходную.</div>
        `,
        examples: [
          { title: "Индексы и срезы", code: `s = "Python"\nprint(len(s))\nprint(s[0])\nprint(s[-1])\nprint(s[0:3])\nprint(s[2:])` },
          { title: "Методы строк", code: `s = "  Привет, Мир!  "\nprint(s.strip())\nprint(s.strip().upper())\nprint(s.replace("Мир", "Python"))` }
        ],
        homework: [
          {
            id: "m2l2h1",
            title: "Регистры",
            task: `Дана строка <code>s = "Python"</code>. Создайте переменную <code>upper</code> со строкой в верхнем регистре и <code>lower</code> — в нижнем.`,
            starter: `s = "Python"\nupper = \nlower = \n`,
            check: { type: "tests", tests: `assert upper == "PYTHON", "upper должно быть \\"PYTHON\\""\nassert lower == "python", "lower должно быть \\"python\\""` },
            hints: [
              "Метод s.upper() возвращает строку в верхнем регистре.",
              "Присвойте результат: upper = s.upper()."
            ],
            solution: `s = "Python"\nupper = s.upper()\nlower = s.lower()`
          },
          {
            id: "m2l2h2",
            title: "Первые и последние символы",
            task: `Дана строка <code>word = "программирование"</code>. Выведите её первый символ, последний символ и её длину (каждое с новой строки).`,
            starter: `word = "программирование"\n`,
            check: { type: "output", expected: "п\nе\n16" },
            hints: [
              "Первый символ — word[0], последний — word[-1].",
              "Длину даёт len(word)."
            ],
            solution: `word = "программирование"\nprint(word[0])\nprint(word[-1])\nprint(len(word))`
          }
        ]
      },
      {
        id: "m2l3",
        title: "Ввод данных и преобразование типов",
        duration: 16,
        video: { title: "Ввод и преобразование типов", query: "Python input int float преобразование типов f-строки урок" },
        theory: `
          <p>Функция <code>input()</code> читает строку, которую вводит пользователь. Важно: <code>input()</code> <strong>всегда</strong> возвращает строку.</p>
          <p>Чтобы получить число, строку преобразуют функциями <code>int()</code> (целое) или <code>float()</code> (дробное). Обратное преобразование — <code>str()</code>.</p>
          <p><strong>f-строки</strong> — удобный способ вставлять значения в текст. Перед кавычками ставят букву <code>f</code>, а переменные пишут в фигурных скобках:</p>
          <p><code>print(f"Мне {age} лет")</code></p>
          <div class="warn">Если ввести текст там, где ожидается число, <code>int("привет")</code> вызовет ошибку. Об этом позже — в теме про исключения.</div>
        `,
        examples: [
          { title: "Преобразование типов", code: `a = "3"\nb = "4"\nprint(a + b)\nprint(int(a) + int(b))\nprint(float(a) / 2)` },
          { title: "f-строки", code: `name = "Аня"\nage = 14\nprint(f"{name}, {age} лет")\nprint(f"Через 5 лет будет {age + 5}")` }
        ],
        homework: [
          {
            id: "m2l3h1",
            title: "Сумма строк-чисел",
            task: `Даны строки <code>a = "3"</code> и <code>b = "4"</code>. Преобразуйте их в целые числа и выведите их сумму.`,
            starter: `a = "3"\nb = "4"\n`,
            check: { type: "output", expected: "7" },
            hints: [
              "Строку в целое число превращает int().",
              "print(int(a) + int(b))."
            ],
            solution: `a = "3"\nb = "4"\nprint(int(a) + int(b))`
          },
          {
            id: "m2l3h2",
            title: "Форматирование",
            task: `Дано имя <code>name = "Аня"</code> и возраст <code>age = 14</code>. Создайте переменную <code>result</code> со строкой вида <code>Аня, 14 лет</code> (используйте f-строку).`,
            starter: `name = "Аня"\nage = 14\nresult = \n`,
            check: { type: "tests", tests: `assert result == "Аня, 14 лет", "result должно быть ровно \\"Аня, 14 лет\\""` },
            hints: [
              "f-строка начинается с буквы f перед кавычками.",
              "Значения подставляются в фигурных скобках: f\"{name}, {age} лет\"."
            ],
            solution: `name = "Аня"\nage = 14\nresult = f"{name}, {age} лет"`
          }
        ]
      }
    ]
  },
  {
    id: "m3",
    title: "Логика и условия",
    icon: "🔀",
    description: "Логические выражения и ветвление программы с помощью if/elif/else.",
    lessons: [
      {
        id: "m3l1",
        title: "Логические выражения",
        duration: 14,
        video: { title: "Логические операторы", query: "Python логические операторы and or not сравнение урок" },
        theory: `
          <p>Сравнения возвращают логическое значение <code>True</code> или <code>False</code>:</p>
          <ul>
            <li><code>==</code> равно, <code>!=</code> не равно;</li>
            <li><code>&gt;</code> больше, <code>&lt;</code> меньше;</li>
            <li><code>&gt;=</code> больше или равно, <code>&lt;=</code> меньше или равно.</li>
          </ul>
          <p>Сравнения объединяют логическими операторами:</p>
          <ul>
            <li><code>and</code> — истина, если истинны <em>оба</em> условия;</li>
            <li><code>or</code> — истина, если истинно <em>хотя бы одно</em>;</li>
            <li><code>not</code> — отрицание.</li>
          </ul>
          <div class="warn">Не путайте <code>=</code> (присваивание) и <code>==</code> (сравнение)!</div>
        `,
        examples: [
          { title: "Сравнения", code: `a = 5\nb = 10\nprint(a < b)\nprint(a == b)\nprint(a != b)\nprint(a > 3 and b < 20)` },
          { title: "Логические операторы", code: `age = 20\nhas_ticket = True\nprint(age >= 18 and has_ticket)\nprint(age < 18 or has_ticket)\nprint(not has_ticket)` }
        ],
        homework: [
          {
            id: "m3l1h1",
            title: "Проверка диапазона",
            task: `Даны <code>a = 5</code> и <code>b = 10</code>. Присвойте переменной <code>result</code> значение True, если <code>a</code> меньше <code>b</code> и одновременно <code>b</code> меньше 20.`,
            starter: `a = 5\nb = 10\nresult = \n`,
            check: { type: "tests", tests: `assert result is True, "result должно быть True"` },
            hints: [
              "Два условия объединяются оператором and.",
              "result = a < b and b < 20."
            ],
            solution: `a = 5\nb = 10\nresult = a < b and b < 20`
          },
          {
            id: "m3l1h2",
            title: "Чётность через остаток",
            task: `Дано число <code>n = 8</code>. Присвойте переменной <code>is_even</code> значение True, если число чётное, иначе False (используйте остаток от деления).`,
            starter: `n = 8\nis_even = \n`,
            check: { type: "tests", tests: `assert is_even is True, "8 — чётное число, is_even должно быть True"` },
            hints: [
              "Чётное число делится на 2 без остатка: n % 2 == 0.",
              "is_even = n % 2 == 0."
            ],
            solution: `n = 8\nis_even = n % 2 == 0`
          }
        ]
      },
      {
        id: "m3l2",
        title: "Ветвление: if, elif, else",
        duration: 18,
        video: { title: "Условный оператор if", query: "Python if elif else условный оператор урок" },
        theory: `
          <p>Условие позволяет выполнять код только при определённом условии:</p>
          <p><code>if</code> — выполнить, если условие истинно. <code>elif</code> («иначе если») проверяет следующее условие. <code>else</code> — выполняется, если ничего не подошло.</p>
          <p>Обратите внимание на двоеточие после условия и <strong>отступ</strong> (4 пробела) — так Python понимает, какой код относится к условию. Отступы в Python обязательны!</p>
          <p>Условия можно вкладывать друг в друга. Также есть короткая запись — тернарный оператор: <code>x = "да" if flag else "нет"</code>.</p>
          <div class="warn">Неверный отступ — самая частая ошибка новичков. Используйте ровно 4 пробела для одного уровня вложенности.</div>
        `,
        examples: [
          { title: "if / elif / else", code: `score = 85\nif score >= 90:\n    print("Отлично")\nelif score >= 70:\n    print("Хорошо")\nelif score >= 50:\n    print("Удовлетворительно")\nelse:\n    print("Нужно подтянуть")` },
          { title: "Тернарный оператор", code: `n = 4\nparity = "чётное" if n % 2 == 0 else "нечётное"\nprint(parity)` }
        ],
        homework: [
          {
            id: "m3l2h1",
            title: "Чётное или нечётное",
            task: `Дано число <code>n = 7</code>. Выведите <code>чётное</code>, если число чётное, иначе <code>нечётное</code>.`,
            starter: `n = 7\n`,
            check: { type: "output", expected: "нечётное" },
            hints: [
              "Используйте if n % 2 == 0: ... else: ...",
              "Не забудьте отступы после двоеточия."
            ],
            solution: `n = 7\nif n % 2 == 0:\n    print("чётное")\nelse:\n    print("нечётное")`
          },
          {
            id: "m3l2h2",
            title: "Оценка по баллам",
            task: `Дано <code>score = 85</code>. Выведите: <code>5</code> при score ≥ 90, <code>4</code> при score ≥ 70, <code>3</code> при score ≥ 50, иначе <code>2</code>.`,
            starter: `score = 85\n`,
            check: { type: "output", expected: "4" },
            hints: [
              "Проверяйте условия по убыванию с помощью if / elif / elif / else.",
              "При score = 85 подходит второе условие (score >= 70)."
            ],
            solution: `score = 85\nif score >= 90:\n    print("5")\nelif score >= 70:\n    print("4")\nelif score >= 50:\n    print("3")\nelse:\n    print("2")`
          }
        ]
      }
    ]
  },
  {
    id: "m4",
    title: "Циклы",
    icon: "🔁",
    description: "Повторяем действия: while, for, range, break и continue.",
    lessons: [
      {
        id: "m4l1",
        title: "Цикл while",
        duration: 15,
        video: { title: "Цикл while", query: "Python цикл while урок для начинающих" },
        theory: `
          <p>Цикл <code>while</code> повторяет блок кода, пока условие истинно:</p>
          <p><code>while условие:</code> — тело цикла выполняется снова и снова.</p>
          <p>Обязательно меняйте переменную внутри цикла, иначе он станет бесконечным. Обычно используют счётчик:</p>
          <ul>
            <li>инициализация счётчика до цикла;</li>
            <li>проверка условия;</li>
            <li>изменение счётчика внутри цикла.</li>
          </ul>
          <div class="warn">Бесконечный цикл — ошибка. Если программа «зависла», проверьте, изменяется ли условие цикла.</div>
        `,
        examples: [
          { title: "Счёт от 1 до 5", code: `i = 1\nwhile i <= 5:\n    print(i)\n    i += 1` },
          { title: "Сумма чисел", code: `n = 1\ntotal = 0\nwhile n <= 100:\n    total += n\n    n += 1\nprint(total)` }
        ],
        homework: [
          {
            id: "m4l1h1",
            title: "Обратный отсчёт",
            task: `С помощью цикла <code>while</code> выведите числа от 5 до 1 (каждое с новой строки).`,
            starter: `i = 5\n`,
            check: { type: "output", expected: "5\n4\n3\n2\n1" },
            hints: [
              "Условие цикла: while i >= 1.",
              "Внутри уменьшайте счётчик: i -= 1."
            ],
            solution: `i = 5\nwhile i >= 1:\n    print(i)\n    i -= 1`
          },
          {
            id: "m4l1h2",
            title: "Сумма до 100",
            task: `Посчитайте сумму всех чисел от 1 до 100 с помощью цикла <code>while</code> и сохраните результат в переменную <code>total</code>.`,
            starter: `total = 0\n`,
            check: { type: "tests", tests: `assert total == 5050, "Сумма чисел от 1 до 100 равна 5050"` },
            hints: [
              "Заведите счётчик i = 1.",
              "В цикле прибавляйте i к total и увеличивайте i на 1."
            ],
            solution: `total = 0\ni = 1\nwhile i <= 100:\n    total += i\n    i += 1`
          }
        ]
      },
      {
        id: "m4l2",
        title: "Цикл for и range",
        duration: 16,
        video: { title: "Цикл for и range", query: "Python цикл for range урок для начинающих" },
        theory: `
          <p>Цикл <code>for</code> перебирает элементы последовательности. Функция <code>range()</code> создаёт последовательность чисел:</p>
          <ul>
            <li><code>range(5)</code> — числа 0, 1, 2, 3, 4 (пять чисел, начиная с нуля);</li>
            <li><code>range(2, 6)</code> — 2, 3, 4, 5 (от 2 до 6, не включая 6);</li>
            <li><code>range(0, 10, 2)</code> — 0, 2, 4, 6, 8 (шаг 2).</li>
          </ul>
          <p>Если нужно только повторить действие N раз, пишут <code>for _ in range(N):</code>.</p>
          <div class="note">Цикл for удобнее while, когда известно количество повторений или есть готовая последовательность.</div>
        `,
        examples: [
          { title: "Числа от 0 до 4", code: `for i in range(5):\n    print(i)` },
          { title: "Диапазон с шагом", code: `for i in range(2, 11, 2):\n    print(i)` }
        ],
        homework: [
          {
            id: "m4l2h1",
            title: "Таблица умножения на 3",
            task: `С помощью цикла <code>for</code> выведите результаты умножения 3 на числа от 1 до 5 (каждый результат с новой строки): 3, 6, 9, 12, 15.`,
            starter: `for i in range(1, 6):\n    # выведите 3 * i\n`,
            check: { type: "output", expected: "3\n6\n9\n12\n15" },
            hints: [
              "Внутри цикла выводите 3 * i.",
              "range(1, 6) даёт числа 1, 2, 3, 4, 5."
            ],
            solution: `for i in range(1, 6):\n    print(3 * i)`
          },
          {
            id: "m4l2h2",
            title: "Сумма через for",
            task: `Посчитайте сумму чисел от 1 до 100 с помощью цикла <code>for</code> и сохраните её в переменную <code>total</code>.`,
            starter: `total = 0\n`,
            check: { type: "tests", tests: `assert total == 5050, "Сумма чисел от 1 до 100 равна 5050"` },
            hints: [
              "Переберите range(1, 101) — это числа от 1 до 100.",
              "Внутри цикла: total += i."
            ],
            solution: `total = 0\nfor i in range(1, 101):\n    total += i`
          }
        ]
      },
      {
        id: "m4l3",
        title: "break, continue и вложенные циклы",
        duration: 15,
        video: { title: "break и continue", query: "Python break continue вложенные циклы урок" },
        theory: `
          <p>Оператор <code>break</code> немедленно прерывает цикл, а <code>continue</code> пропускает остаток текущей итерации и переходит к следующей.</p>
          <p>Циклы можно вкладывать друг в друга. Внешний цикл выполняется полностью, и для каждой его итерации внутренний цикл проходит весь путь заново.</p>
          <p>У циклов есть блок <code>else</code>: он выполняется, если цикл завершился <em>без</em> вызова break. Это полезно для поиска.</p>
        `,
        examples: [
          { title: "break", code: `for i in range(1, 10):\n    if i == 5:\n        break\n    print(i)` },
          { title: "continue", code: `for i in range(1, 6):\n    if i % 2 == 0:\n        continue\n    print(i)` }
        ],
        homework: [
          {
            id: "m4l3h1",
            title: "Первое число, кратное 7",
            task: `Найдите первое число в диапазоне от 10 до 100, которое делится на 7 без остатка, и выведите его (используйте break).`,
            starter: `for i in range(10, 101):\n    # проверьте делимость на 7 и выйдите из цикла\n`,
            check: { type: "output", expected: "14" },
            hints: [
              "Делимость на 7 проверяется условием i % 7 == 0.",
              "Найдя число: print(i) и break."
            ],
            solution: `for i in range(10, 101):\n    if i % 7 == 0:\n        print(i)\n        break`
          },
          {
            id: "m4l3h2",
            title: "Только нечётные",
            task: `С помощью цикла и <code>continue</code> выведите нечётные числа от 1 до 9 (каждое с новой строки): 1, 3, 5, 7, 9.`,
            starter: `for i in range(1, 10):\n    # пропустите чётные\n`,
            check: { type: "output", expected: "1\n3\n5\n7\n9" },
            hints: [
              "Если i % 2 == 0, вызовите continue.",
              "Иначе выведите i."
            ],
            solution: `for i in range(1, 10):\n    if i % 2 == 0:\n        continue\n    print(i)`
          }
        ]
      }
    ]
  },
  {
    id: "m5",
    title: "Коллекции данных",
    icon: "📦",
    description: "Списки, кортежи, словари и множества — хранение наборов данных.",
    lessons: [
      {
        id: "m5l1",
        title: "Списки",
        duration: 18,
        video: { title: "Списки в Python", query: "Python списки list методы append sort урок" },
        theory: `
          <p><strong>Список</strong> — упорядоченная изменяемая коллекция. Создаётся квадратными скобками: <code>nums = [1, 2, 3]</code>.</p>
          <p>Доступ к элементам — по индексу: <code>nums[0]</code>. Списки можно менять, срезать, складывать и перебирать циклом.</p>
          <p>Популярные методы и функции:</p>
          <ul>
            <li><code>nums.append(x)</code> — добавить элемент в конец;</li>
            <li><code>nums.insert(i, x)</code> — вставить по индексу;</li>
            <li><code>nums.pop()</code> — удалить и вернуть последний элемент;</li>
            <li><code>nums.remove(x)</code> — удалить первое вхождение;</li>
            <li><code>nums.sort()</code> — отсортировать на месте;</li>
            <li><code>len(nums)</code>, <code>sum(nums)</code>, <code>max(nums)</code>, <code>min(nums)</code>.</li>
          </ul>
        `,
        examples: [
          { title: "Основы работы со списком", code: `nums = [3, 1, 2]\nnums.append(5)\nnums.sort()\nprint(nums)\nprint(len(nums))\nprint(sum(nums))` },
          { title: "Перебор элементов", code: `fruits = ["яблоко", "банан", "груша"]\nfor fruit in fruits:\n    print(fruit)` }
        ],
        homework: [
          {
            id: "m5l1h1",
            title: "Отсортируй и дополни",
            task: `Дан список <code>nums = [3, 1, 2]</code>. Отсортируйте его по возрастанию и добавьте число <code>5</code>.`,
            starter: `nums = [3, 1, 2]\n`,
            check: { type: "tests", tests: `assert nums == [1, 2, 3, 5], "Ожидается [1, 2, 3, 5]"` },
            hints: [
              "Сортировка на месте: nums.sort().",
              "Добавление в конец: nums.append(5)."
            ],
            solution: `nums = [3, 1, 2]\nnums.sort()\nnums.append(5)`
          },
          {
            id: "m5l1h2",
            title: "Максимум списка",
            task: `Дан список <code>data = [4, 8, 15, 16, 23, 42]</code>. Сохраните в переменную <code>maximum</code> наибольший элемент, а в <code>minimum</code> — наименьший.`,
            starter: `data = [4, 8, 15, 16, 23, 42]\nmaximum = \nminimum = \n`,
            check: { type: "tests", tests: `assert maximum == 42, "maximum должно быть 42"\nassert minimum == 4, "minimum должно быть 4"` },
            hints: [
              "Наибольший элемент — max(data).",
              "Наименьший — min(data)."
            ],
            solution: `data = [4, 8, 15, 16, 23, 42]\nmaximum = max(data)\nminimum = min(data)`
          }
        ]
      },
      {
        id: "m5l2",
        title: "Кортежи",
        duration: 12,
        video: { title: "Кортежи", query: "Python кортеж tuple распаковка урок" },
        theory: `
          <p><strong>Кортеж</strong> — упорядоченная, но <strong>неизменяемая</strong> коллекция. Создаётся круглыми скобками: <code>point = (4, 7)</code>.</p>
          <p>Кортеж нельзя изменить после создания — это его главное отличие от списка. Зато он быстрее и безопаснее там, где данные менять не нужно.</p>
          <p>Полезная возможность — <strong>распаковка</strong>: значения кортежа можно разом разложить по переменным: <code>x, y = point</code>.</p>
          <div class="note">Кортежи удобно использовать для фиксированных наборов значений: координаты, размеры, пары «ключ-значение».</div>
        `,
        examples: [
          { title: "Кортеж и распаковка", code: `point = (4, 7)\nx, y = point\nprint(x)\nprint(y)\nprint(len(point))` },
          { title: "Кортеж неизменяем", code: `t = (1, 2, 3)\nprint(t[0])\nprint(t[-1])\n# t[0] = 10  # это вызовет ошибку` }
        ],
        homework: [
          {
            id: "m5l2h1",
            title: "Распаковка координат",
            task: `Дан кортеж <code>point = (4, 7)</code>. Распакуйте его в переменные <code>x</code> и <code>y</code>.`,
            starter: `point = (4, 7)\nx = \ny = \n`,
            check: { type: "tests", tests: `assert x == 4 and y == 7, "x должно быть 4, y — 7"` },
            hints: [
              "Распаковка: x, y = point.",
              "Количество переменных должно совпадать с длиной кортежа."
            ],
            solution: `point = (4, 7)\nx, y = point`
          },
          {
            id: "m5l2h2",
            title: "Обмен через кортеж",
            task: `Даны <code>a = "первый"</code> и <code>b = "второй"</code>. Поменяйте их значения местами, используя распаковку кортежа.`,
            starter: `a = "первый"\nb = "второй"\n`,
            check: { type: "tests", tests: `assert a == "второй" and b == "первый", "Значения должны поменяться местами"` },
            hints: [
              "Python создаёт кортеж из правой части: a, b = b, a.",
              "Это работает благодаря упаковке и распаковке кортежа."
            ],
            solution: `a = "первый"\nb = "второй"\na, b = b, a`
          }
        ]
      },
      {
        id: "m5l3",
        title: "Словари",
        duration: 18,
        video: { title: "Словари dict", query: "Python словарь dict ключи значения урок" },
        theory: `
          <p><strong>Словарь</strong> хранит пары «ключ → значение». Создаётся фигурными скобками: <code>person = {"name": "Аня", "age": 14}</code>.</p>
          <p>Доступ к значению — по ключу: <code>person["name"]</code>. Добавление и изменение — через присваивание: <code>person["city"] = "Москва"</code>.</p>
          <ul>
            <li><code>person.keys()</code> — все ключи;</li>
            <li><code>person.values()</code> — все значения;</li>
            <li><code>person.items()</code> — пары ключ-значение;</li>
            <li><code>person.get("x", 0)</code> — значение или значение по умолчанию;</li>
            <li><code>"name" in person</code> — проверка наличия ключа.</li>
          </ul>
          <p>Перебор словаря удобно делать так: <code>for key, value in person.items(): ...</code></p>
        `,
        examples: [
          { title: "Создание и доступ", code: `person = {"name": "Аня", "age": 14}\nprint(person["name"])\nperson["city"] = "Москва"\nprint(person)` },
          { title: "Перебор словаря", code: `scores = {"математика": 5, "физика": 4}\nfor subject, mark in scores.items():\n    print(subject, mark)` }
        ],
        homework: [
          {
            id: "m5l3h1",
            title: "Карточка ученика",
            task: `Создайте словарь <code>student</code> с ключами <code>name</code> (строка) и <code>age</code> (число). Затем добавьте ключ <code>city</code>.`,
            starter: `student = \n`,
            check: { type: "tests", tests: `assert student.get("name") is not None, "В словаре должен быть ключ name"\nassert student.get("age") is not None, "В словаре должен быть ключ age"\nassert student.get("city") is not None, "Добавьте ключ city"` },
            hints: [
              "Словарь создаётся так: student = {\"name\": \"Аня\", \"age\": 14}.",
              "Новый ключ добавляется присваиванием: student[\"city\"] = \"Москва\"."
            ],
            solution: `student = {"name": "Аня", "age": 14}\nstudent["city"] = "Москва"`
          },
          {
            id: "m5l3h2",
            title: "Безопасное значение",
            task: `Дан словарь <code>data = {"a": 1, "b": 2}</code>. Присвойте переменной <code>value</code> значение по ключу <code>"c"</code>, а если ключа нет — число <code>0</code>.`,
            starter: `data = {"a": 1, "b": 2}\nvalue = \n`,
            check: { type: "tests", tests: `assert value == 0, "Ключа c нет, значит value должно быть 0"` },
            hints: [
              "Используйте метод get с значением по умолчанию.",
              "value = data.get(\"c\", 0)."
            ],
            solution: `data = {"a": 1, "b": 2}\nvalue = data.get("c", 0)`
          }
        ]
      },
      {
        id: "m5l4",
        title: "Множества",
        duration: 13,
        video: { title: "Множества set", query: "Python множество set операции урок" },
        theory: `
          <p><strong>Множество</strong> — неупорядоченная коллекция <strong>уникальных</strong> элементов. Создаётся через <code>set()</code> или фигурные скобки: <code>s = {1, 2, 3}</code>.</p>
          <p>Множества автоматически убирают дубликаты. Операции как в математике:</p>
          <ul>
            <li><code>a | b</code> — объединение;</li>
            <li><code>a &amp; b</code> — пересечение;</li>
            <li><code>a - b</code> — разность;</li>
            <li><code>x in s</code> — проверка принадлежности (очень быстро).</li>
          </ul>
          <div class="note">Множество часто используют, чтобы быстро убрать повторы из списка: set([1, 1, 2]) → {1, 2}.</div>
        `,
        examples: [
          { title: "Убираем дубликаты", code: `nums = [1, 2, 2, 3, 3, 3]\nunique = set(nums)\nprint(unique)\nprint(len(unique))` },
          { title: "Операции над множествами", code: `a = {1, 2, 3}\nb = {3, 4, 5}\nprint(a | b)\nprint(a & b)\nprint(a - b)` }
        ],
        homework: [
          {
            id: "m5l4h1",
            title: "Только уникальные",
            task: `Дан список с повторами <code>nums = [1, 2, 2, 3, 3, 3]</code>. Получите множество уникальных значений в переменной <code>unique</code>.`,
            starter: `nums = [1, 2, 2, 3, 3, 3]\nunique = \n`,
            check: { type: "tests", tests: `assert unique == {1, 2, 3}, "unique должно быть {1, 2, 3}"` },
            hints: [
              "Функция set() превращает список в множество.",
              "unique = set(nums)."
            ],
            solution: `nums = [1, 2, 2, 3, 3, 3]\nunique = set(nums)`
          },
          {
            id: "m5l4h2",
            title: "Общие элементы",
            task: `Даны множества <code>a = {1, 2, 3}</code> и <code>b = {3, 4, 5}</code>. Сохраните в переменную <code>common</code> их пересечение (общие элементы).`,
            starter: `a = {1, 2, 3}\nb = {3, 4, 5}\ncommon = \n`,
            check: { type: "tests", tests: `assert common == {3}, "Общий элемент только 3"` },
            hints: [
              "Пересечение — оператор &.",
              "common = a & b."
            ],
            solution: `a = {1, 2, 3}\nb = {3, 4, 5}\ncommon = a & b`
          }
        ]
      }
    ]
  }
];
const CURRICULUM2 = [
  {
    id: "m6",
    title: "Функции",
    icon: "⚙️",
    description: "Разбиваем программу на переиспользуемые блоки кода.",
    lessons: [
      {
        id: "m6l1",
        title: "Функции: основы",
        duration: 18,
        video: { title: "Функции в Python", query: "Python функции def return урок для начинающих" },
        theory: `
          <p><strong>Функция</strong> — именованный блок кода, который можно вызывать много раз. Объявляется словом <code>def</code>:</p>
          <p><code>def имя(параметры):</code> — далее идёт тело функции с отступом.</p>
          <p>Ключевое слово <code>return</code> возвращает результат. Если его нет, функция вернёт <code>None</code>. После <code>return</code> функция сразу завершается.</p>
          <p>Функции помогают не повторять код, делают программу понятнее и проще в отладке. Хорошее имя функции — глагол: <code>calculate_area</code>, <code>is_even</code>.</p>
          <div class="note">Параметры — это переменные в определении функции. Аргументы — конкретные значения, которые передаются при вызове.</div>
        `,
        examples: [
          { title: "Простая функция", code: `def greet(name):\n    return f"Привет, {name}!"\n\nmessage = greet("Аня")\nprint(message)\nprint(greet("Мир"))` },
          { title: "Функция без return", code: `def show_sum(a, b):\n    print(a + b)\n\nshow_sum(3, 4)` }
        ],
        homework: [
          {
            id: "m6l1h1",
            title: "Функция сложения",
            task: `Напишите функцию <code>add(a, b)</code>, которая возвращает сумму двух чисел.`,
            starter: `def add(a, b):\n    # верните сумму\n`,
            check: { type: "tests", tests: `assert add(2, 3) == 5, "add(2, 3) должно быть 5"\nassert add(-1, 1) == 0, "add(-1, 1) должно быть 0"\nassert add(10, 0) == 10, "add(10, 0) должно быть 10"` },
            hints: [
              "Внутри функции используйте return a + b.",
              "Не забудьте отступ в теле функции."
            ],
            solution: `def add(a, b):\n    return a + b`
          },
          {
            id: "m6l1h2",
            title: "Проверка чётности",
            task: `Напишите функцию <code>is_even(n)</code>, которая возвращает <code>True</code>, если число чётное, и <code>False</code> в противном случае.`,
            starter: `def is_even(n):\n    # верните True или False\n`,
            check: { type: "tests", tests: `assert is_even(4) is True, "4 — чётное"\nassert is_even(7) is False, "7 — нечётное"\nassert is_even(0) is True, "0 — чётное"` },
            hints: [
              "Число чётное, если остаток от деления на 2 равен нулю.",
              "return n % 2 == 0."
            ],
            solution: `def is_even(n):\n    return n % 2 == 0`
          }
        ]
      },
      {
        id: "m6l2",
        title: "Аргументы и области видимости",
        duration: 16,
        video: { title: "Аргументы функций", query: "Python аргументы функций по умолчанию именованные область видимости" },
        theory: `
          <p>Параметру можно задать <strong>значение по умолчанию</strong>: <code>def greet(name, greeting="Привет"):</code>. Тогда при вызове <code>greet("Аня")</code> параметр greeting примет значение "Привет".</p>
          <p>Аргументы можно передавать по имени (именованные аргументы): <code>greet(greeting="Здравствуй", name="Аня")</code> — порядок в этом случае не важен.</p>
          <p><strong>Область видимости</strong>: переменные, созданные внутри функции, существуют только внутри неё (локальные). Переменные снаружи — глобальные. Внутри функции их видно, но изменять глобальные переменные напрямую не рекомендуется.</p>
          <div class="warn">Не используйте изменяемые объекты (списки, словари) как значения по умолчанию — это частый источник ошибок.</div>
        `,
        examples: [
          { title: "Значение по умолчанию", code: `def greet(name, greeting="Привет"):\n    return f"{greeting}, {name}!"\n\nprint(greet("Аня"))\nprint(greet("Аня", "Здравствуй"))` },
          { title: "Области видимости", code: `x = 10\n\ndef show():\n    x = 5\n    print(x)\n\nshow()\nprint(x)` }
        ],
        homework: [
          {
            id: "m6l2h1",
            title: "Приветствие с параметром",
            task: `Напишите функцию <code>greet(name, greeting="Привет")</code>, которая возвращает строку вида <code>Привет, Аня!</code>. Если приветствие задано, используйте его.`,
            starter: `def greet(name, greeting="Привет"):\n    # верните строку\n`,
            check: { type: "tests", tests: `assert greet("Аня") == "Привет, Аня!", "Проверьте формат: Привет, Аня!"\nassert greet("Аня", "Здравствуй") == "Здравствуй, Аня!", "Должно использоваться переданное приветствие"` },
            hints: [
              "Верните f-строку: f\"{greeting}, {name}!\".",
              "Не забудьте восклицательный знак в конце."
            ],
            solution: `def greet(name, greeting="Привет"):\n    return f"{greeting}, {name}!"`
          },
          {
            id: "m6l2h2",
            title: "Прямоугольник",
            task: `Напишите функцию <code>area(width, height=1)</code>, которая возвращает площадь. Если высота не передана, считать её равной 1.`,
            starter: `def area(width, height=1):\n    # верните площадь\n`,
            check: { type: "tests", tests: `assert area(5, 2) == 10, "area(5, 2) должно быть 10"\nassert area(7) == 7, "area(7) должно быть 7 (высота по умолчанию 1)"` },
            hints: [
              "Площадь = width * height.",
              "return width * height."
            ],
            solution: `def area(width, height=1):\n    return width * height`
          }
        ]
      },
      {
        id: "m6l3",
        title: "lambda, *args и рекурсия",
        duration: 17,
        video: { title: "lambda и рекурсия", query: "Python lambda args kwargs рекурсия урок" },
        theory: `
          <p><code>*args</code> собирает любое число позиционных аргументов в кортеж, а <code>**kwargs</code> — именованные аргументы в словарь. Внутри функции <code>args</code> — это кортеж, а <code>kwargs</code> — словарь.</p>
          <p><strong>lambda</strong> — короткая безымянная функция в одну строку: <code>square = lambda x: x ** 2</code>. Удобна там, где функция нужна один раз.</p>
          <p><strong>Рекурсия</strong> — приём, когда функция вызывает саму себя. Обязательно нужно условие остановки (базовый случай), иначе будет бесконечная рекурсия.</p>
        `,
        examples: [
          { title: "lambda и *args", code: `square = lambda x: x ** 2\nprint(square(5))\n\ndef total(*nums):\n    return sum(nums)\n\nprint(total(1, 2, 3, 4))` },
          { title: "Рекурсия: факториал", code: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)\n\nprint(factorial(5))` }
        ],
        homework: [
          {
            id: "m6l3h1",
            title: "Рекурсивный факториал",
            task: `Напишите рекурсивную функцию <code>factorial(n)</code>, возвращающую факториал числа. Напомним: факториал 0 и 1 равен 1.`,
            starter: `def factorial(n):\n    # базовый случай и рекурсивный вызов\n`,
            check: { type: "tests", tests: `assert factorial(0) == 1, "factorial(0) = 1"\nassert factorial(1) == 1, "factorial(1) = 1"\nassert factorial(5) == 120, "factorial(5) = 120"\nassert factorial(6) == 720, "factorial(6) = 720"` },
            hints: [
              "Базовый случай: если n <= 1, вернуть 1.",
              "Иначе вернуть n * factorial(n - 1)."
            ],
            solution: `def factorial(n):\n    if n <= 1:\n        return 1\n    return n * factorial(n - 1)`
          },
          {
            id: "m6l3h2",
            title: "Сумма любого количества чисел",
            task: `Напишите функцию <code>total(*nums)</code>, которая возвращает сумму всех переданных чисел. При вызове без аргументов верните 0.`,
            starter: `def total(*nums):\n    # просуммируйте nums\n`,
            check: { type: "tests", tests: `assert total(1, 2, 3) == 6, "total(1, 2, 3) = 6"\nassert total() == 0, "Без аргументов должно быть 0"\nassert total(10) == 10, "total(10) = 10"` },
            hints: [
              "nums внутри функции — это кортеж.",
              "Функция sum(nums) складывает все элементы; sum(()) = 0."
            ],
            solution: `def total(*nums):\n    return sum(nums)`
          }
        ]
      }
    ]
  },
  {
    id: "m7",
    title: "Текст и данные",
    icon: "✂️",
    description: "Глубже работаем со строками и учимся писать компактный код.",
    lessons: [
      {
        id: "m7l1",
        title: "Методы строк и форматирование",
        duration: 16,
        video: { title: "Методы строк и форматирование", query: "Python методы строк join split format f-строки урок" },
        theory: `
          <p>Строки — самый частый тип данных в реальных задачах. Полезные приёмы:</p>
          <ul>
            <li><code>text.split()</code> — разбить строку по пробелам в список слов;</li>
            <li><code>text.split(",")</code> — разбить по запятой;</li>
            <li><code>", ".join(words)</code> — собрать список в строку;</li>
            <li><code>text.startswith("x")</code> / <code>text.endswith("x")</code>;</li>
            <li><code>text.strip()</code>, <code>text.title()</code>, <code>text.capitalize()</code>;</li>
            <li><code>text.count("а")</code> — сколько раз встречается подстрока.</li>
          </ul>
          <p>f-строки позволяют форматировать числа: <code>f"{pi:.2f}"</code> — два знака после запятой.</p>
        `,
        examples: [
          { title: "split и join", code: `text = "Python это здорово"\nwords = text.split()\nprint(words)\nprint("-".join(words))` },
          { title: "Форматирование чисел", code: `pi = 3.14159\nprint(f"{pi:.2f}")\nprint(f"{1234567:,}")` }
        ],
        homework: [
          {
            id: "m7l1h1",
            title: "Разбить на слова",
            task: `Дан текст <code>t = "Python это здорово"</code>. Разбейте его на список слов и сохраните в переменную <code>words</code>.`,
            starter: `t = "Python это здорово"\nwords = \n`,
            check: { type: "tests", tests: `assert words == ["Python", "это", "здорово"], "Ожидается список из трёх слов"` },
            hints: [
              "Метод split() без аргументов разбивает по пробелам.",
              "words = t.split()."
            ],
            solution: `t = "Python это здорово"\nwords = t.split()`
          },
          {
            id: "m7l1h2",
            title: "Собрать строку",
            task: `Дан список <code>words = ["я", "учу", "Python"]</code>. Соберите из него строку, разделённую пробелами, в переменную <code>sentence</code>.`,
            starter: `words = ["я", "учу", "Python"]\nsentence = \n`,
            check: { type: "tests", tests: `assert sentence == "я учу Python", "Должно получиться 'я учу Python'"` },
            hints: [
              "Метод join вызывается у строки-разделителя.",
              "sentence = \" \".join(words)."
            ],
            solution: `words = ["я", "учу", "Python"]\nsentence = " ".join(words)`
          }
        ]
      },
      {
        id: "m7l2",
        title: "Списковые включения (comprehensions)",
        duration: 15,
        video: { title: "Списковые включения", query: "Python list comprehension списковые включения урок" },
        theory: `
          <p><strong>Списковое включение</strong> — компактный способ создать список из другого набора данных одной строкой.</p>
          <p>Форма записи: <code>[выражение for элемент in последовательность]</code>.</p>
          <p>Можно добавить условие: <code>[выражение for элемент in последовательность if условие]</code>.</p>
          <p>Пример: <code>[x ** 2 for x in range(5)]</code> даёт <code>[0, 1, 4, 9, 16]</code>.</p>
          <div class="note">Включения читаются почти как английский: «квадраты x для каждого x из диапазона». Не увлекайтесь: если логика сложная, обычный цикл понятнее.</div>
        `,
        examples: [
          { title: "Квадраты чисел", code: `squares = [x ** 2 for x in range(1, 6)]\nprint(squares)` },
          { title: "С условием", code: `evens = [x for x in range(1, 11) if x % 2 == 0]\nprint(evens)` }
        ],
        homework: [
          {
            id: "m7l2h1",
            title: "Квадраты",
            task: `Используя списковое включение, создайте переменную <code>squares</code> — список квадратов чисел от 1 до 5: [1, 4, 9, 16, 25].`,
            starter: `squares = \n`,
            check: { type: "tests", tests: `assert squares == [1, 4, 9, 16, 25], "Ожидается [1, 4, 9, 16, 25]"` },
            hints: [
              "Форма: [x ** 2 for x in range(1, 6)].",
              "range(1, 6) даёт числа 1..5."
            ],
            solution: `squares = [x ** 2 for x in range(1, 6)]`
          },
          {
            id: "m7l2h2",
            title: "Только чётные",
            task: `Используя списковое включение с условием, создайте переменную <code>evens</code> — чётные числа от 1 до 20.`,
            starter: `evens = \n`,
            check: { type: "tests", tests: `assert evens == [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], "Ожидаются чётные числа от 1 до 20"` },
            hints: [
              "Добавьте условие if x % 2 == 0.",
              "evens = [x for x in range(1, 21) if x % 2 == 0]."
            ],
            solution: `evens = [x for x in range(1, 21) if x % 2 == 0]`
          }
        ]
      }
    ]
  },
  {
    id: "m8",
    title: "Файлы, ошибки, модули",
    icon: "🗂️",
    description: "Обрабатываем ошибки, читаем и пишем файлы, подключаем модули.",
    lessons: [
      {
        id: "m8l1",
        title: "Обработка исключений",
        duration: 16,
        video: { title: "Исключения try/except", query: "Python исключения try except finally урок" },
        theory: `
          <p><strong>Исключение</strong> — ошибка во время выполнения. Если её не обработать, программа аварийно завершится с сообщением об ошибке (traceback).</p>
          <p>Конструкция <code>try / except</code> позволяет «поймать» ошибку и продолжить работу:</p>
          <ul>
            <li><code>try:</code> — код, который может вызвать ошибку;</li>
            <li><code>except ТипОшибки:</code> — что делать при этой ошибке;</li>
            <li><code>else:</code> — выполняется, если ошибки не было;</li>
            <li><code>finally:</code> — выполняется всегда.</li>
          </ul>
          <p>Частые ошибки: <code>ZeroDivisionError</code>, <code>ValueError</code>, <code>KeyError</code>, <code>FileNotFoundError</code>. Свою ошибку можно вызвать словом <code>raise</code>.</p>
        `,
        examples: [
          { title: "try / except", code: `try:\n    result = 10 / 0\nexcept ZeroDivisionError:\n    print("На ноль делить нельзя!")\nprint("Программа продолжает работу")` },
          { title: "Ловим ValueError", code: `try:\n    number = int("привет")\nexcept ValueError:\n    print("Это не число")\nfinally:\n    print("Блок finally выполняется всегда")` }
        ],
        homework: [
          {
            id: "m8l1h1",
            title: "Безопасное деление",
            task: `Напишите функцию <code>safe_divide(a, b)</code>, которая возвращает результат деления a на b, а при делении на ноль возвращает <code>None</code>.`,
            starter: `def safe_divide(a, b):\n    # используйте try/except\n`,
            check: { type: "tests", tests: `assert safe_divide(10, 2) == 5, "10 / 2 = 5"\nassert safe_divide(1, 0) is None, "Деление на ноль должно давать None"\nassert safe_divide(-6, 3) == -2, "-6 / 3 = -2"` },
            hints: [
              "Поместите деление в блок try.",
              "В except ZeroDivisionError верните None."
            ],
            solution: `def safe_divide(a, b):\n    try:\n        return a / b\n    except ZeroDivisionError:\n        return None`
          },
          {
            id: "m8l1h2",
            title: "Преобразование с проверкой",
            task: `Напишите функцию <code>to_int(value)</code>, которая возвращает целое число из строки, а если это невозможно — <code>-1</code>.`,
            starter: `def to_int(value):\n    # используйте try/except\n`,
            check: { type: "tests", tests: `assert to_int("42") == 42, "to_int('42') = 42"\nassert to_int("abc") == -1, "Некорректная строка -> -1"\nassert to_int("7") == 7, "to_int('7') = 7"` },
            hints: [
              "int(value) может вызвать ValueError.",
              "Поймайте ValueError и верните -1."
            ],
            solution: `def to_int(value):\n    try:\n        return int(value)\n    except ValueError:\n        return -1`
          }
        ]
      },
      {
        id: "m8l2",
        title: "Работа с файлами",
        duration: 16,
        video: { title: "Работа с файлами", query: "Python файлы open with read write урок" },
        theory: `
          <p>Файлы открывают функцией <code>open(имя, режим, encoding)</code>. Режимы: <code>"r"</code> — чтение, <code>"w"</code> — запись (стирает старое), <code>"a"</code> — дозапись.</p>
          <p>Лучший способ — конструкция <code>with</code>: она сама закрывает файл, даже если возникнет ошибка:</p>
          <p><code>with open("file.txt", "w", encoding="utf-8") as f: f.write("текст")</code></p>
          <p>Методы: <code>f.write()</code>, <code>f.read()</code> (весь файл), <code>f.readline()</code>, <code>f.readlines()</code> (список строк).</p>
          <div class="warn">Всегда указывайте <code>encoding="utf-8"</code> при работе с русским текстом — иначе возможны ошибки кодировки.</div>
        `,
        examples: [
          { title: "Запись и чтение", code: `with open("demo.txt", "w", encoding="utf-8") as f:\n    f.write("Привет, файл!")\n\nwith open("demo.txt", "r", encoding="utf-8") as f:\n    content = f.read()\nprint(content)` }
        ],
        homework: [
          {
            id: "m8l2h1",
            title: "Записать и прочитать",
            task: `Запишите в файл <code>notes.txt</code> строку <code>Python</code>, затем прочитайте содержимое файла в переменную <code>content</code>.`,
            starter: `# запишите файл, потом прочитайте его в content\n`,
            check: { type: "tests", tests: `assert content.strip() == "Python", "content должно содержать 'Python'"` },
            hints: [
              "Запись: with open(\"notes.txt\", \"w\", encoding=\"utf-8\") as f: f.write(\"Python\").",
              "Чтение: with open(\"notes.txt\", \"r\", encoding=\"utf-8\") as f: content = f.read()."
            ],
            solution: `with open("notes.txt", "w", encoding="utf-8") as f:\n    f.write("Python")\n\nwith open("notes.txt", "r", encoding="utf-8") as f:\n    content = f.read()`
          }
        ]
      },
      {
        id: "m8l3",
        title: "Модули, пакеты и pip",
        duration: 15,
        video: { title: "Модули и pip", query: "Python модули import pip виртуальное окружение урок" },
        theory: `
          <p><strong>Модуль</strong> — файл с кодом, который можно подключить словом <code>import</code>. Стандартная библиотека Python огромна:</p>
          <ul>
            <li><code>import math</code> — математика: sqrt, factorial, pi;</li>
            <li><code>import random</code> — случайные числа: randint, choice, shuffle;</li>
            <li><code>import datetime</code> — дата и время;</li>
            <li><code>import json</code> — работа с форматом JSON.</li>
          </ul>
          <p>Можно импортировать отдельные имена: <code>from math import sqrt</code>. Или дать псевдоним: <code>import numpy as np</code>.</p>
          <p>Сторонние библиотеки устанавливают менеджером пакетов <code>pip</code>: <code>pip install requests</code>. Для проектов создают виртуальное окружение, чтобы пакеты не конфликтовали.</p>
          <div class="note">Свой модуль — это просто файл .py, например <code>my_module.py</code>, который подключают через <code>import my_module</code>.</div>
        `,
        examples: [
          { title: "math и random", code: `import math\nimport random\nprint(math.sqrt(16))\nprint(math.factorial(5))\nprint(random.randint(1, 6))` }
        ],
        homework: [
          {
            id: "m8l3h1",
            title: "Квадратный корень",
            task: `Импортируйте модуль <code>math</code> и сохраните в переменную <code>result</code> квадратный корень из 16.`,
            starter: `result = \n`,
            check: { type: "tests", tests: `assert result == 4.0, "Корень из 16 равен 4.0"` },
            hints: [
              "Сначала import math.",
              "result = math.sqrt(16)."
            ],
            solution: `import math\nresult = math.sqrt(16)`
          },
          {
            id: "m8l3h2",
            title: "Факториал из math",
            task: `Импортируйте модуль <code>math</code> и сохраните в переменную <code>fact</code> значение факториала числа 5.`,
            starter: `fact = \n`,
            check: { type: "tests", tests: `assert fact == 120, "5! = 120"` },
            hints: [
              "В модуле math есть функция factorial.",
              "fact = math.factorial(5)."
            ],
            solution: `import math\nfact = math.factorial(5)`
          }
        ]
      }
    ]
  }
];
const CURRICULUM3 = [
  {
    id: "m9",
    title: "Объектно-ориентированное программирование",
    icon: "🧩",
    description: "Классы, объекты, наследование и магические методы.",
    lessons: [
      {
        id: "m9l1",
        title: "Классы и объекты",
        duration: 18,
        video: { title: "Классы и объекты", query: "Python классы объекты ООП __init__ self урок" },
        theory: `
          <p><strong>Класс</strong> — это «чертёж» для создания объектов. Объект — конкретный экземпляр класса.</p>
          <p>Класс объявляется словом <code>class</code>. Метод <code>__init__</code> вызывается при создании объекта и задаёт его начальные данные. Первый параметр методов — <code>self</code>, он ссылается на сам объект.</p>
          <p>Пример:</p>
          <p><code>class Dog:</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;def __init__(self, name):</code><br><code>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;self.name = name</code></p>
          <p>Атрибуты — это данные объекта (<code>self.name</code>), методы — его действия. Создание объекта: <code>dog = Dog("Рекс")</code>.</p>
        `,
        examples: [
          { title: "Класс и объект", code: `class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f"{self.name}: Гав!"\n\ndog = Dog("Рекс")\nprint(dog.name)\nprint(dog.bark())` }
        ],
        homework: [
          {
            id: "m9l1h1",
            title: "Класс Dog",
            task: `Создайте класс <code>Dog</code> с конструктором <code>__init__(self, name)</code>, сохраняющим имя в атрибут <code>name</code>, и методом <code>bark()</code>, который возвращает строку <code>Имя: Гав!</code>.`,
            starter: `class Dog:\n    def __init__(self, name):\n        # сохраните имя\n\n    def bark(self):\n        # верните строку\n`,
            check: { type: "tests", tests: `d = Dog("Рекс")\nassert d.name == "Рекс", "Атрибут name должен хранить имя"\nassert d.bark() == "Рекс: Гав!", "bark() должен вернуть 'Рекс: Гав!'"` },
            hints: [
              "В __init__: self.name = name.",
              "В bark верните f\"{self.name}: Гав!\"."
            ],
            solution: `class Dog:\n    def __init__(self, name):\n        self.name = name\n\n    def bark(self):\n        return f"{self.name}: Гав!"`
          },
          {
            id: "m9l1h2",
            title: "Класс Rectangle",
            task: `Создайте класс <code>Rectangle</code> с конструктором <code>__init__(self, width, height)</code> и методом <code>area()</code>, возвращающим площадь.`,
            starter: `class Rectangle:\n    def __init__(self, width, height):\n        pass\n\n    def area(self):\n        pass\n`,
            check: { type: "tests", tests: `r = Rectangle(4, 5)\nassert r.area() == 20, "Площадь 4x5 = 20"\nassert Rectangle(2, 3).area() == 6, "Площадь 2x3 = 6"` },
            hints: [
              "Сохраните width и height в self.",
              "Метод area возвращает self.width * self.height."
            ],
            solution: `class Rectangle:\n    def __init__(self, width, height):\n        self.width = width\n        self.height = height\n\n    def area(self):\n        return self.width * self.height`
          }
        ]
      },
      {
        id: "m9l2",
        title: "Наследование и магические методы",
        duration: 18,
        video: { title: "Наследование и dunder-методы", query: "Python наследование super __str__ магические методы урок" },
        theory: `
          <p><strong>Наследование</strong> позволяет создать новый класс на основе существующего: <code>class Dog(Animal):</code>. Дочерний класс получает все методы родителя и может их переопределять.</p>
          <p>Функция <code>super()</code> обращается к родительскому классу — удобно вызывать его конструктор: <code>super().__init__(name)</code>.</p>
          <p><strong>Магические методы</strong> (dunder, от «double underscore») задают поведение объекта:</p>
          <ul>
            <li><code>__str__</code> — что вернёт <code>str(объект)</code> и <code>print()</code>;</li>
            <li><code>__len__</code> — длину для <code>len()</code>;</li>
            <li><code>__eq__</code> — сравнение объектов через <code>==</code>.</li>
          </ul>
        `,
        examples: [
          { title: "Наследование", code: `class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "Гав"\n\nprint(Animal("Зверь").speak())\nprint(Dog("Рекс").speak())` },
          { title: "Магический метод __str__", code: `class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"\n\nprint(Point(3, 4))` }
        ],
        homework: [
          {
            id: "m9l2h1",
            title: "Животные говорят",
            task: `Создайте класс <code>Animal</code> с конструктором <code>__init__(self, name)</code> и методом <code>speak()</code>, возвращающим <code>...</code>. Затем класс <code>Dog(Animal)</code>, переопределяющий <code>speak()</code> так, чтобы он возвращал <code>Гав</code>.`,
            starter: `class Animal:\n    def __init__(self, name):\n        pass\n\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    pass\n`,
            check: { type: "tests", tests: `assert Animal("X").speak() == "...", "Animal.speak() должен возвращать '...'"\nassert Dog("Рекс").speak() == "Гав", "Dog.speak() должен возвращать 'Гав'"\nassert isinstance(Dog("Рекс"), Animal), "Dog должен наследоваться от Animal"` },
            hints: [
              "Dog(Animal) наследует конструктор Animal.",
              "Переопределите метод speak в классе Dog, вернув \"Гав\"."
            ],
            solution: `class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "..."\n\nclass Dog(Animal):\n    def speak(self):\n        return "Гав"`
          },
          {
            id: "m9l2h2",
            title: "Красивый вывод точки",
            task: `Создайте класс <code>Point</code> с координатами <code>x</code>, <code>y</code> и методом <code>__str__</code>, который возвращает строку вида <code>(3, 4)</code>.`,
            starter: `class Point:\n    def __init__(self, x, y):\n        pass\n\n    def __str__(self):\n        pass\n`,
            check: { type: "tests", tests: `assert str(Point(3, 4)) == "(3, 4)", "str(Point(3, 4)) должно быть '(3, 4)'"\nassert str(Point(0, 0)) == "(0, 0)", "Проверьте формат для нулей"` },
            hints: [
              "Сохраните x и y в self.",
              "Верните f\"({self.x}, {self.y})\" — не забудьте запятую и пробел."
            ],
            solution: `class Point:\n    def __init__(self, x, y):\n        self.x = x\n        self.y = y\n\n    def __str__(self):\n        return f"({self.x}, {self.y})"`
          }
        ]
      }
    ]
  },
  {
    id: "m10",
    title: "Профессиональный уровень",
    icon: "🏆",
    description: "Декораторы, генераторы, тестирование, отладка и инструменты разработчика.",
    lessons: [
      {
        id: "m10l1",
        title: "Декораторы",
        duration: 18,
        video: { title: "Декораторы", query: "Python декораторы функции урок объяснение" },
        theory: `
          <p><strong>Декоратор</strong> — функция, которая принимает другую функцию и возвращает новую, добавляя поведение. Записывается со знаком <code>@</code> над функцией.</p>
          <p>Простейший декоратор принимает функцию, определяет внутри обёртку <code>wrapper</code>, которая вызывает исходную функцию, и возвращает обёртку.</p>
          <p>Декораторы используют для логирования, замера времени, проверки прав, кеширования. Часто применяют <code>functools.wraps</code>, чтобы сохранить имя и документацию функции.</p>
          <div class="note">Функции в Python — объекты «первого класса»: их можно передавать как аргументы и возвращать из других функций. На этом и основаны декораторы.</div>
        `,
        examples: [
          { title: "Простой декоратор", code: `def logger(func):\n    def wrapper(*args, **kwargs):\n        print(f"Вызов {func.__name__}")\n        return func(*args, **kwargs)\n    return wrapper\n\n@logger\ndef add(a, b):\n    return a + b\n\nprint(add(2, 3))` }
        ],
        homework: [
          {
            id: "m10l1h1",
            title: "Декоратор-удвоитель",
            task: `Напишите декоратор <code>double_result</code>, который удваивает возвращаемое значение функции.`,
            starter: `def double_result(func):\n    def wrapper(*args, **kwargs):\n        # вызовите func и удвойте результат\n        pass\n    return wrapper\n`,
            check: { type: "tests", tests: `@double_result\ndef add(a, b):\n    return a + b\n\n@double_result\ndef one():\n    return 1\n\nassert add(2, 3) == 10, "add(2, 3): 5 * 2 = 10"\nassert one() == 2, "one(): 1 * 2 = 2"` },
            hints: [
              "Внутри wrapper вызовите result = func(*args, **kwargs).",
              "Верните result * 2."
            ],
            solution: `def double_result(func):\n    def wrapper(*args, **kwargs):\n        return func(*args, **kwargs) * 2\n    return wrapper`
          }
        ]
      },
      {
        id: "m10l2",
        title: "Генераторы и итераторы",
        duration: 18,
        video: { title: "Генераторы и yield", query: "Python генераторы yield итераторы урок" },
        theory: `
          <p><strong>Генератор</strong> — функция, которая вместо <code>return</code> использует <code>yield</code>. Она возвращает значения по одному, «лениво», по мере необходимости.</p>
          <p>Преимущество — экономия памяти: генератор не хранит весь список в памяти, а вычисляет значения по одному. Это важно при работе с большими данными.</p>
          <p>Генератор можно перебрать циклом <code>for</code> или превратить в список функцией <code>list()</code>.</p>
          <p>Генераторные выражения похожи на списковые включения, но в круглых скобках: <code>(x ** 2 for x in range(5))</code>.</p>
        `,
        examples: [
          { title: "Генератор", code: `def countdown(n):\n    while n > 0:\n        yield n\n        n -= 1\n\nfor value in countdown(3):\n    print(value)` },
          { title: "Генератор в список", code: `def squares(n):\n    for i in range(n):\n        yield i ** 2\n\nprint(list(squares(5)))` }
        ],
        homework: [
          {
            id: "m10l2h1",
            title: "Генератор чётных чисел",
            task: `Напишите генератор <code>even_numbers(n)</code>, который по очереди возвращает чётные числа от 0 до n включительно.`,
            starter: `def even_numbers(n):\n    # используйте yield\n`,
            check: { type: "tests", tests: `assert list(even_numbers(10)) == [0, 2, 4, 6, 8, 10], "Ожидается [0, 2, 4, 6, 8, 10]"\nassert list(even_numbers(0)) == [0], "even_numbers(0) -> [0]"\nassert list(even_numbers(5)) == [0, 2, 4], "even_numbers(5) -> [0, 2, 4]"` },
            hints: [
              "Переберите range(0, n + 1).",
              "Если число чётное (i % 2 == 0), сделайте yield i."
            ],
            solution: `def even_numbers(n):\n    for i in range(0, n + 1):\n        if i % 2 == 0:\n            yield i`
          }
        ]
      },
      {
        id: "m10l3",
        title: "Тестирование, отладка и Git",
        duration: 20,
        video: { title: "Тестирование и Git", query: "Python pytest тестирование git отладка PEP8 урок" },
        theory: `
          <p>Профессиональный код отличается тем, что его легко проверять и поддерживать. Ключевые практики:</p>
          <h4>Тестирование</h4>
          <p>Тест проверяет, что функция ведёт себя правильно. Простейший инструмент — <code>assert</code>. Для серьёзных проектов используют библиотеку <code>pytest</code>: тесты пишут в функциях, начинающихся с <code>test_</code>.</p>
          <h4>Отладка</h4>
          <p>Читайте traceback снизу вверх: последняя строка — тип и описание ошибки. Расставляйте <code>print()</code> или используйте отладчик (breakpoints в VS Code).</p>
          <h4>Стиль кода (PEP 8)</h4>
          <p>Имена переменных — <code>snake_case</code>, классов — <code>CamelCase</code>. Отступ — 4 пробела. Соблюдение стандарта делает код понятным для других.</p>
          <h4>Git</h4>
          <p>Git хранит историю изменений. Базовые команды: <code>git init</code>, <code>git add .</code>, <code>git commit -m "..."</code>, <code>git push</code>. Для совместной работы используют GitHub.</p>
          <h4>Структура проекта</h4>
          <p>Типичный проект: папка с исходным кодом, файл <code>requirements.txt</code> со списком библиотек, <code>README.md</code> с описанием, папка <code>tests</code> с тестами.</p>
        `,
        examples: [
          { title: "Тесты через assert", code: `def is_palindrome(s):\n    s = s.lower().replace(" ", "")\n    return s == s[::-1]\n\nassert is_palindrome("шалаш") == True\nassert is_palindrome("привет") == False\nprint("Все тесты прошли!")` }
        ],
        homework: [
          {
            id: "m10l3h1",
            title: "Палиндром",
            task: `Напишите функцию <code>is_palindrome(s)</code>, которая возвращает <code>True</code>, если строка читается одинаково слева направо и справа налево. Игнорируйте регистр и пробелы.`,
            starter: `def is_palindrome(s):\n    # приведите строку к нижнему регистру, уберите пробелы и сравните с перевёрнутой\n`,
            check: { type: "tests", tests: `assert is_palindrome("шалаш") is True, "'шалаш' — палиндром"\nassert is_palindrome("привет") is False, "'привет' — не палиндром"\nassert is_palindrome("А роза упала на лапу Азора") is True, "Игнорируйте регистр и пробелы"\nassert is_palindrome("") is True, "Пустая строка — палиндром"` },
            hints: [
              "Приведите строку: s = s.lower().replace(\" \", \"\").",
              "Перевёрнутая строка — это s[::-1]. Сравните s == s[::-1]."
            ],
            solution: `def is_palindrome(s):\n    s = s.lower().replace(" ", "")\n    return s == s[::-1]`
          }
        ]
      }
    ]
  }
];

CURRICULUM.push(...CURRICULUM2, ...CURRICULUM3);