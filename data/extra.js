// Дополнительные домашние задания. Подключаются к урокам по их id.
const EXTRA_HOMEWORK = {
  m1l1: [
    {
      id: "m1l1e1",
      title: "Фраза о Python",
      task: `Выведите на экран ровно одну строку: <code>Я люблю Python</code>`,
      starter: `# ваш код\n`,
      check: { type: "output", expected: "Я люблю Python" },
      hints: ["Используйте функцию print().", "Текст в кавычках: print(\"Я люблю Python\")."],
      solution: `print("Я люблю Python")`
    },
    {
      id: "m1l1e2",
      title: "Год на экран",
      task: `Выведите на экран число <code>2024</code> (без кавычек).`,
      starter: ``,
      check: { type: "output", expected: "2024" },
      hints: ["Числа выводятся так же, но без кавычек.", "print(2024)"],
      solution: `print(2024)`
    }
  ],
  m1l2: [
    {
      id: "m1l2e1",
      title: "Город",
      task: `Создайте переменную <code>city</code> со строкой — названием любого города.`,
      starter: `city = \n`,
      check: { type: "tests", tests: `assert isinstance(city, str), "city должно быть строкой"\nassert len(city) > 0, "city не должно быть пустым"` },
      hints: ["Строка заключается в кавычки.", "Например: city = \"Москва\"."],
      solution: `city = "Москва"`
    },
    {
      id: "m1l2e2",
      title: "Сумма переменных",
      task: `Даны <code>x = 5</code> и <code>y = 10</code>. Создайте переменную <code>total</code>, равную их сумме.`,
      starter: `x = 5\ny = 10\ntotal = \n`,
      check: { type: "tests", tests: `assert total == 15, "total должно быть 15"` },
      hints: ["Сумма записывается знаком +.", "total = x + y."],
      solution: `x = 5\ny = 10\ntotal = x + y`
    }
  ],
  m2l1: [
    {
      id: "m2l1e1",
      title: "Среднее трёх чисел",
      task: `Вычислите и выведите среднее арифметическое чисел <code>4</code>, <code>7</code> и <code>10</code>.`,
      starter: `# среднее = сумма / количество\n`,
      check: { type: "output", expected: "7.0" },
      hints: ["Сумма 4+7+10 = 21, чисел — 3.", "print((4 + 7 + 10) / 3)."],
      solution: `print((4 + 7 + 10) / 3)`
    },
    {
      id: "m2l1e2",
      title: "Остаток от деления",
      task: `Выведите остаток от деления <code>17</code> на <code>5</code>.`,
      starter: ``,
      check: { type: "output", expected: "2" },
      hints: ["Остаток даёт оператор %.", "print(17 % 5)."],
      solution: `print(17 % 5)`
    },
    {
      id: "m2l1e3",
      title: "Степень двойки",
      task: `Выведите <code>2</code> в степени <code>10</code>.`,
      starter: ``,
      check: { type: "output", expected: "1024" },
      hints: ["Возведение в степень — оператор **.", "print(2 ** 10)."],
      solution: `print(2 ** 10)`
    }
  ],
  m2l2: [
    {
      id: "m2l2e1",
      title: "Сколько букв «а»",
      task: `Дана строка <code>word = "банан"</code>. Выведите, сколько раз в ней встречается буква «а».`,
      starter: `word = "банан"\n`,
      check: { type: "output", expected: "2" },
      hints: ["У строки есть метод count().", "print(word.count(\"а\"))."],
      solution: `word = "банан"\nprint(word.count("а"))`
    },
    {
      id: "m2l2e2",
      title: "Переверни строку",
      task: `Дана строка <code>s = "Python"</code>. Получите перевёрнутую строку в переменной <code>reversed_word</code> (используйте срез с шагом -1).`,
      starter: `s = "Python"\nreversed_word = \n`,
      check: { type: "tests", tests: `assert reversed_word == "nohtyP", "Должно получиться nohtyP"` },
      hints: ["Срез с отрицательным шагом переворачивает строку.", "reversed_word = s[::-1]."],
      solution: `s = "Python"\nreversed_word = s[::-1]`
    },
    {
      id: "m2l2e3",
      title: "Разбить по запятой",
      task: `Дана строка <code>data = "a,b,c"</code>. Разбейте её по запятой в список <code>parts</code>.`,
      starter: `data = "a,b,c"\nparts = \n`,
      check: { type: "tests", tests: `assert parts == ["a", "b", "c"], "Ожидается список из трёх элементов"` },
      hints: ["Метод split(\",\") разбивает по запятой.", "parts = data.split(\",\")."],
      solution: `data = "a,b,c"\nparts = data.split(",")`
    }
  ],
  m2l3: [
    {
      id: "m2l3e1",
      title: "Строка через f-строку",
      task: `Даны <code>name = "Иван"</code> и <code>age = 20</code>. Создайте переменную <code>result</code> со строкой <code>Иван, 20 лет</code>.`,
      starter: `name = "Иван"\nage = 20\nresult = \n`,
      check: { type: "tests", tests: `assert result == "Иван, 20 лет", "Проверьте формат: Иван, 20 лет"` },
      hints: ["f-строка начинается с буквы f перед кавычками.", "result = f\"{name}, {age} лет\"."],
      solution: `name = "Иван"\nage = 20\nresult = f"{name}, {age} лет"`
    },
    {
      id: "m2l3e2",
      title: "Строка в число",
      task: `Преобразуйте строку <code>"100"</code> в целое число, прибавьте 1 и выведите результат.`,
      starter: ``,
      check: { type: "output", expected: "101" },
      hints: ["Преобразование: int(\"100\").", "print(int(\"100\") + 1)."],
      solution: `print(int("100") + 1)`
    }
  ],
  m3l1: [
    {
      id: "m3l1e1",
      title: "Больше ли?",
      task: `Даны <code>a = 3</code> и <code>b = 7</code>. Присвойте переменной <code>result</code> результат сравнения: a больше b?`,
      starter: `a = 3\nb = 7\nresult = \n`,
      check: { type: "tests", tests: `assert result is False, "3 не больше 7, значит False"` },
      hints: ["Сравнение «больше» — оператор >.", "result = a > b."],
      solution: `a = 3\nb = 7\nresult = a > b`
    },
    {
      id: "m3l1e2",
      title: "В диапазоне",
      task: `Дано <code>x = 10</code>. Присвойте переменной <code>in_range</code> значение True, если x находится в диапазоне от 5 до 15 включительно.`,
      starter: `x = 10\nin_range = \n`,
      check: { type: "tests", tests: `assert in_range is True, "10 входит в диапазон 5..15"` },
      hints: ["В Python можно писать цепочку сравнений.", "in_range = 5 <= x <= 15."],
      solution: `x = 10\nin_range = 5 <= x <= 15`
    }
  ],
  m3l2: [
    {
      id: "m3l2e1",
      title: "Наибольшее из двух",
      task: `Даны <code>a = 8</code> и <code>b = 12</code>. Выведите наибольшее из них (используйте if/else).`,
      starter: `a = 8\nb = 12\n`,
      check: { type: "output", expected: "12" },
      hints: ["Сравните a и b через if a > b.", "Если a больше — выведите a, иначе b."],
      solution: `a = 8\nb = 12\nif a > b:\n    print(a)\nelse:\n    print(b)`
    },
    {
      id: "m3l2e2",
      title: "Знак числа",
      task: `Дано <code>n = -5</code>. Выведите <code>положительное</code>, <code>отрицательное</code> или <code>ноль</code> в зависимости от числа.`,
      starter: `n = -5\n`,
      check: { type: "output", expected: "отрицательное" },
      hints: ["Используйте if / elif / else.", "Сначала проверьте n > 0, потом n < 0, иначе — ноль."],
      solution: `n = -5\nif n > 0:\n    print("положительное")\nelif n < 0:\n    print("отрицательное")\nelse:\n    print("ноль")`
    }
  ],
  m4l1: [
    {
      id: "m4l1e1",
      title: "Факториал циклом while",
      task: `Посчитайте факториал числа 5 (5! = 1·2·3·4·5) с помощью цикла while и сохраните в переменную <code>fact</code>.`,
      starter: `fact = 1\ni = 1\n`,
      check: { type: "tests", tests: `assert fact == 120, "5! = 120"` },
      hints: ["Умножайте fact на i, пока i <= 5.", "Не забывайте увеличивать i на 1."],
      solution: `fact = 1\ni = 1\nwhile i <= 5:\n    fact *= i\n    i += 1`
    },
    {
      id: "m4l1e2",
      title: "Сумма цифр числа",
      task: `Дано <code>n = 12345</code>. С помощью цикла while посчитайте сумму его цифр в переменную <code>total</code>.`,
      starter: `n = 12345\ntotal = 0\n`,
      check: { type: "tests", tests: `assert total == 15, "Сумма цифр 1+2+3+4+5 = 15"` },
      hints: ["Последняя цифра числа — это n % 10.", "Убирайте последнюю цифру делением нацело: n //= 10."],
      solution: `n = 12345\ntotal = 0\nwhile n > 0:\n    total += n % 10\n    n //= 10`
    }
  ],
  m4l2: [
    {
      id: "m4l2e1",
      title: "Сумма чётных",
      task: `С помощью цикла for посчитайте сумму чётных чисел от 1 до 20 в переменную <code>total</code>.`,
      starter: `total = 0\n`,
      check: { type: "tests", tests: `assert total == 110, "Сумма 2+4+...+20 = 110"` },
      hints: ["Переберите range(1, 21) и проверьте чётность.", "Если i % 2 == 0, прибавьте i."],
      solution: `total = 0\nfor i in range(1, 21):\n    if i % 2 == 0:\n        total += i`
    },
    {
      id: "m4l2e2",
      title: "Квадраты чисел",
      task: `С помощью цикла for выведите квадраты чисел от 1 до 5 (каждый с новой строки): 1, 4, 9, 16, 25.`,
      starter: `for i in range(1, 6):\n    # выведите квадрат\n`,
      check: { type: "output", expected: "1\n4\n9\n16\n25" },
      hints: ["Квадрат — это i ** 2.", "print(i ** 2)."],
      solution: `for i in range(1, 6):\n    print(i ** 2)`
    }
  ],
  m4l3: [
    {
      id: "m4l3e1",
      title: "Первое чётное в списке",
      task: `Дан список <code>numbers = [3, 7, 8, 9]</code>. Найдите и выведите первое чётное число (используйте break).`,
      starter: `numbers = [3, 7, 8, 9]\nfor n in numbers:\n    # найдите первое чётное\n`,
      check: { type: "output", expected: "8" },
      hints: ["Проверяйте условие n % 2 == 0.", "Нашли — выведите число и вызовите break."],
      solution: `numbers = [3, 7, 8, 9]\nfor n in numbers:\n    if n % 2 == 0:\n        print(n)\n        break`
    },
    {
      id: "m4l3e2",
      title: "Пропустить кратные трём",
      task: `Выведите числа от 1 до 10, кроме кратных 3 (используйте continue).`,
      starter: `for i in range(1, 11):\n    # пропустите кратные 3\n`,
      check: { type: "output", expected: "1\n2\n4\n5\n7\n8\n10" },
      hints: ["Кратность 3 проверяется условием i % 3 == 0.", "В этом случае вызовите continue."],
      solution: `for i in range(1, 11):\n    if i % 3 == 0:\n        continue\n    print(i)`
    }
  ],
  m5l1: [
    {
      id: "m5l1e1",
      title: "Среднее списка",
      task: `Дан список <code>data = [10, 20, 30, 40]</code>. Сохраните в переменную <code>average</code> среднее арифметическое его элементов.`,
      starter: `data = [10, 20, 30, 40]\naverage = \n`,
      check: { type: "tests", tests: `assert average == 25.0, "Среднее = (10+20+30+40)/4 = 25.0"` },
      hints: ["Сумму даёт sum(data), количество — len(data).", "average = sum(data) / len(data)."],
      solution: `data = [10, 20, 30, 40]\naverage = sum(data) / len(data)`
    },
    {
      id: "m5l1e2",
      title: "Удалить и добавить",
      task: `Дан список <code>nums = [1, 2, 3, 2]</code>. Удалите первое вхождение числа 2, затем добавьте в конец число 5.`,
      starter: `nums = [1, 2, 3, 2]\n`,
      check: { type: "tests", tests: `assert nums == [1, 3, 2, 5], "Ожидается [1, 3, 2, 5]"` },
      hints: ["Удаление первого вхождения: nums.remove(2).", "Добавление в конец: nums.append(5)."],
      solution: `nums = [1, 2, 3, 2]\nnums.remove(2)\nnums.append(5)`
    }
  ],
  m5l2: [
    {
      id: "m5l2e1",
      title: "Минимум и максимум кортежа",
      task: `Дан кортеж <code>t = (5, 2, 9, 1)</code>. Сохраните в <code>smallest</code> наименьший элемент, а в <code>largest</code> — наибольший.`,
      starter: `t = (5, 2, 9, 1)\nsmallest = \nlargest = \n`,
      check: { type: "tests", tests: `assert smallest == 1, "smallest = 1"\nassert largest == 9, "largest = 9"` },
      hints: ["Работают функции min() и max().", "smallest = min(t)."],
      solution: `t = (5, 2, 9, 1)\nsmallest = min(t)\nlargest = max(t)`
    }
  ],
  m5l3: [
    {
      id: "m5l3e1",
      title: "Словарь из двух списков",
      task: `Даны <code>keys = ["a", "b"]</code> и <code>values = [1, 2]</code>. Создайте словарь <code>d</code>, где keys[i] соответствует values[i].`,
      starter: `keys = ["a", "b"]\nvalues = [1, 2]\nd = \n`,
      check: { type: "tests", tests: `assert d == {"a": 1, "b": 2}, "Ожидается словарь с ключами a и b"` },
      hints: ["Соедините списки функцией zip().", "d = dict(zip(keys, values))."],
      solution: `keys = ["a", "b"]\nvalues = [1, 2]\nd = dict(zip(keys, values))`
    },
    {
      id: "m5l3e2",
      title: "Подсчёт символов",
      task: `Дан текст <code>word = "hello"</code>. Составьте словарь <code>counts</code>, где ключ — символ, а значение — сколько раз он встречается.`,
      starter: `word = "hello"\ncounts = {}\nfor ch in word:\n    # увеличьте счётчик символа\n`,
      check: { type: "tests", tests: `assert counts == {"h": 1, "e": 1, "l": 2, "o": 1}, "Посчитайте все символы строки hello"` },
      hints: ["Используйте counts.get(ch, 0) + 1.", "counts[ch] = counts.get(ch, 0) + 1."],
      solution: `word = "hello"\ncounts = {}\nfor ch in word:\n    counts[ch] = counts.get(ch, 0) + 1`
    }
  ],
  m5l4: [
    {
      id: "m5l4e1",
      title: "Объединение множеств",
      task: `Даны множества <code>a = {1, 2}</code> и <code>b = {2, 3}</code>. Сохраните в <code>union</code> их объединение.`,
      starter: `a = {1, 2}\nb = {2, 3}\nunion = \n`,
      check: { type: "tests", tests: `assert union == {1, 2, 3}, "Объединение — {1, 2, 3}"` },
      hints: ["Объединение — оператор |.", "union = a | b."],
      solution: `a = {1, 2}\nb = {2, 3}\nunion = a | b`
    },
    {
      id: "m5l4e2",
      title: "Разность множеств",
      task: `Даны множества <code>a = {1, 2, 3}</code> и <code>b = {2}</code>. Сохраните в <code>diff</code> элементы, которые есть в a, но нет в b.`,
      starter: `a = {1, 2, 3}\nb = {2}\ndiff = \n`,
      check: { type: "tests", tests: `assert diff == {1, 3}, "Разность — {1, 3}"` },
      hints: ["Разность — оператор -.", "diff = a - b."],
      solution: `a = {1, 2, 3}\nb = {2}\ndiff = a - b`
    }
  ]
};
const EXTRA_HOMEWORK_2 = {
  m6l1: [
    {
      id: "m6l1e1",
      title: "Максимум из трёх",
      task: `Напишите функцию <code>max_of_three(a, b, c)</code>, возвращающую наибольшее из трёх чисел.`,
      starter: `def max_of_three(a, b, c):\n    # верните максимум\n`,
      check: { type: "tests", tests: `assert max_of_three(1, 2, 3) == 3, "Максимум из 1, 2, 3 — 3"\nassert max_of_three(9, 4, 5) == 9, "Максимум из 9, 4, 5 — 9"\nassert max_of_three(-1, -5, -3) == -1, "Максимум из -1, -5, -3 — -1"` },
      hints: ["Можно использовать встроенную функцию max().", "return max(a, b, c)."],
      solution: `def max_of_three(a, b, c):\n    return max(a, b, c)`
    },
    {
      id: "m6l1e2",
      title: "Площадь круга",
      task: `Напишите функцию <code>circle_area(r)</code>, возвращающую площадь круга радиуса r (π·r²). Возьмите π из модуля math.`,
      starter: `import math\n\ndef circle_area(r):\n    # верните площадь\n`,
      check: { type: "tests", tests: `assert abs(circle_area(1) - math.pi) < 0.0001, "Для r = 1 площадь равна π"\nassert abs(circle_area(2) - 4 * math.pi) < 0.0001, "Для r = 2 площадь равна 4π"` },
      hints: ["Число π — это math.pi.", "return math.pi * r ** 2."],
      solution: `import math\n\ndef circle_area(r):\n    return math.pi * r ** 2`
    }
  ],
  m6l2: [
    {
      id: "m6l2e1",
      title: "Степень с параметром",
      task: `Напишите функцию <code>power(base, exp=2)</code>, возвращающую base в степени exp. Если exp не передан, возводите в квадрат.`,
      starter: `def power(base, exp=2):\n    # верните степень\n`,
      check: { type: "tests", tests: `assert power(3) == 9, "power(3) = 3 ** 2 = 9"\nassert power(2, 3) == 8, "power(2, 3) = 8"\nassert power(5, 1) == 5, "power(5, 1) = 5"` },
      hints: ["Возведение в степень — оператор **.", "return base ** exp."],
      solution: `def power(base, exp=2):\n    return base ** exp`
    }
  ],
  m6l3: [
    {
      id: "m6l3e1",
      title: "Рекурсивная сумма",
      task: `Напишите рекурсивную функцию <code>recursive_sum(n)</code>, возвращающую сумму чисел от 1 до n. Для n ≤ 0 верните 0.`,
      starter: `def recursive_sum(n):\n    # базовый случай и рекурсивный вызов\n`,
      check: { type: "tests", tests: `assert recursive_sum(5) == 15, "1+2+3+4+5 = 15"\nassert recursive_sum(1) == 1, "recursive_sum(1) = 1"\nassert recursive_sum(0) == 0, "recursive_sum(0) = 0"` },
      hints: ["Базовый случай: если n <= 0, вернуть 0.", "Иначе: return n + recursive_sum(n - 1)."],
      solution: `def recursive_sum(n):\n    if n <= 0:\n        return 0\n    return n + recursive_sum(n - 1)`
    },
    {
      id: "m6l3e2",
      title: "Функция, возвращающая функцию",
      task: `Напишите функцию <code>make_adder(n)</code>, которая возвращает функцию, прибавляющую n к своему аргументу.`,
      starter: `def make_adder(n):\n    # верните функцию\n`,
      check: { type: "tests", tests: `assert make_adder(5)(3) == 8, "make_adder(5)(3) = 8"\nassert make_adder(10)(-4) == 6, "make_adder(10)(-4) = 6"` },
      hints: ["Верните lambda или вложенную функцию.", "return lambda x: x + n."],
      solution: `def make_adder(n):\n    return lambda x: x + n`
    }
  ],
  m7l1: [
    {
      id: "m7l1e1",
      title: "Заголовок",
      task: `Дана строка <code>phrase = "hello world"</code>. Сделайте каждое слово с большой буквы и сохраните в <code>titled</code>.`,
      starter: `phrase = "hello world"\ntitled = \n`,
      check: { type: "tests", tests: `assert titled == "Hello World", "Ожидается Hello World"` },
      hints: ["У строки есть метод title().", "titled = phrase.title()."],
      solution: `phrase = "hello world"\ntitled = phrase.title()`
    },
    {
      id: "m7l1e2",
      title: "Сколько гласных",
      task: `Напишите функцию <code>count_vowels(text)</code>, считающую количество гласных букв (а, е, ё, и, о, у, ы, э, ю, я).`,
      starter: `def count_vowels(text):\n    # посчитайте гласные\n`,
      check: { type: "tests", tests: `assert count_vowels("программирование") == 7, "В слове программирование 7 гласных"\nassert count_vowels("кот") == 1, "В слове кот 1 гласная"\nassert count_vowels("") == 0, "Пустая строка -> 0"` },
      hints: ["Задайте строку гласных: vowels = \"аеёиоуыэюя\".", "Считайте: sum(1 for ch in text.lower() if ch in vowels)."],
      solution: `def count_vowels(text):\n    vowels = "аеёиоуыэюя"\n    return sum(1 for ch in text.lower() if ch in vowels)`
    }
  ],
  m7l2: [
    {
      id: "m7l2e1",
      title: "Длины слов",
      task: `Дан список <code>words = ["a", "bb", "ccc"]</code>. С помощью спискового включения получите список длин слов в <code>lengths</code>.`,
      starter: `words = ["a", "bb", "ccc"]\nlengths = \n`,
      check: { type: "tests", tests: `assert lengths == [1, 2, 3], "Ожидается [1, 2, 3]"` },
      hints: ["Форма: [len(w) for w in words].", "lengths = [len(w) for w in words]."],
      solution: `words = ["a", "bb", "ccc"]\nlengths = [len(w) for w in words]`
    },
    {
      id: "m7l2e2",
      title: "Длинные слова",
      task: `Дан список <code>words = ["кот", "собака", "дом", "программирование"]</code>. Оставьте только слова длиннее 3 символов в <code>long_words</code>.`,
      starter: `words = ["кот", "собака", "дом", "программирование"]\nlong_words = \n`,
      check: { type: "tests", tests: `assert long_words == ["собака", "программирование"], "Оставьте слова длиной больше 3"` },
      hints: ["Добавьте условие if len(w) > 3.", "long_words = [w for w in words if len(w) > 3]."],
      solution: `words = ["кот", "собака", "дом", "программирование"]\nlong_words = [w for w in words if len(w) > 3]`
    }
  ],
  m8l1: [
    {
      id: "m8l1e1",
      title: "Безопасное получение значения",
      task: `Напишите функцию <code>get_value(d, key)</code>, которая возвращает значение из словаря по ключу, а если ключа нет — <code>None</code> (через try/except).`,
      starter: `def get_value(d, key):\n    # обработайте KeyError\n`,
      check: { type: "tests", tests: `assert get_value({"a": 1}, "a") == 1, "Значение по ключу a — 1"\nassert get_value({"a": 1}, "b") is None, "Ключа b нет -> None"` },
      hints: ["Поместите d[key] в блок try.", "В except KeyError верните None."],
      solution: `def get_value(d, key):\n    try:\n        return d[key]\n    except KeyError:\n        return None`
    }
  ],
  m8l2: [
    {
      id: "m8l2e1",
      title: "Сколько строк в файле",
      task: `Запишите в файл <code>lines.txt</code> три строки (любые), затем прочитайте файл и сохраните в переменную <code>lines</code> количество строк в нём.`,
      starter: `# запишите файл, затем посчитайте строки\n`,
      check: { type: "tests", tests: `assert lines == 3, "В файле должно быть 3 строки"` },
      hints: ["Запишите три строки, каждую с символом переноса \\n.", "Читайте через f.readlines() и берите len()."],
      solution: `with open("lines.txt", "w", encoding="utf-8") as f:\n    f.write("один\\nдва\\nтри\\n")\n\nwith open("lines.txt", "r", encoding="utf-8") as f:\n    lines = len(f.readlines())`
    }
  ],
  m8l3: [
    {
      id: "m8l3e1",
      title: "НОД двух чисел",
      task: `Импортируйте модуль <code>math</code> и сохраните в переменную <code>result</code> наибольший общий делитель чисел 24 и 36.`,
      starter: `result = \n`,
      check: { type: "tests", tests: `assert result == 12, "НОД(24, 36) = 12"` },
      hints: ["В модуле math есть функция gcd.", "result = math.gcd(24, 36)."],
      solution: `import math\nresult = math.gcd(24, 36)`
    },
    {
      id: "m8l3e2",
      title: "Импорт конкретной функции",
      task: `Импортируйте функцию <code>sqrt</code> из модуля <code>math</code> и сохраните в переменную <code>root</code> квадратный корень из 81.`,
      starter: `root = \n`,
      check: { type: "tests", tests: `assert root == 9.0, "Корень из 81 равен 9.0"` },
      hints: ["Используйте from math import sqrt.", "root = sqrt(81)."],
      solution: `from math import sqrt\nroot = sqrt(81)`
    }
  ],
  m9l1: [
    {
      id: "m9l1e1",
      title: "Класс-счётчик",
      task: `Создайте класс <code>Counter</code> с атрибутом <code>count</code> (начинается с 0) и методом <code>increment()</code>, который увеличивает счётчик на 1 и возвращает новое значение.`,
      starter: `class Counter:\n    def __init__(self):\n        # задайте count = 0\n\n    def increment(self):\n        # увеличьте и верните count\n`,
      check: { type: "tests", tests: `c = Counter()\nassert c.count == 0, "count начинается с 0"\nassert c.increment() == 1, "После первого вызова — 1"\nassert c.increment() == 2, "После второго вызова — 2"\nassert c.count == 2, "count хранит текущее значение"` },
      hints: ["В __init__ задайте self.count = 0.", "В increment: self.count += 1, затем return self.count."],
      solution: `class Counter:\n    def __init__(self):\n        self.count = 0\n\n    def increment(self):\n        self.count += 1\n        return self.count`
    },
    {
      id: "m9l1e2",
      title: "Класс Student",
      task: `Создайте класс <code>Student</code>: конструктор создаёт пустой список оценок <code>grades</code>, метод <code>add_grade(grade)</code> добавляет оценку, метод <code>average()</code> возвращает среднее.`,
      starter: `class Student:\n    def __init__(self, name):\n        pass\n\n    def add_grade(self, grade):\n        pass\n\n    def average(self):\n        pass\n`,
      check: { type: "tests", tests: `s = Student("Аня")\nassert s.name == "Аня", "Имя должно сохраняться"\nassert s.grades == [], "Список оценок изначально пуст"\ns.add_grade(5)\ns.add_grade(3)\nassert s.grades == [5, 3], "Оценки добавляются в список"\nassert s.average() == 4.0, "Среднее (5 + 3) / 2 = 4.0"` },
      hints: ["В __init__: self.name = name и self.grades = [].", "average возвращает sum(self.grades) / len(self.grades)."],
      solution: `class Student:\n    def __init__(self, name):\n        self.name = name\n        self.grades = []\n\n    def add_grade(self, grade):\n        self.grades.append(grade)\n\n    def average(self):\n        return sum(self.grades) / len(self.grades)`
    }
  ],
  m9l2: [
    {
      id: "m9l2e1",
      title: "Наследование с super()",
      task: `Создайте класс <code>Animal</code> (имя и метод speak, возвращающий "..."). Затем класс <code>Cat(Animal)</code>, который вызывает super() в конструкторе и переопределяет speak на "Мяу".`,
      starter: `class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "..."\n\nclass Cat(Animal):\n    def __init__(self, name):\n        # вызовите super()\n        pass\n\n    def speak(self):\n        pass\n`,
      check: { type: "tests", tests: `c = Cat("Барсик")\nassert c.name == "Барсик", "Имя должно сохраняться через super()"\nassert c.speak() == "Мяу", "Кошка говорит Мяу"\nassert isinstance(c, Animal), "Cat наследуется от Animal"` },
      hints: ["В конструкторе Cat вызовите super().__init__(name).", "Переопределите speak, вернув \"Мяу\"."],
      solution: `class Animal:\n    def __init__(self, name):\n        self.name = name\n\n    def speak(self):\n        return "..."\n\nclass Cat(Animal):\n    def __init__(self, name):\n        super().__init__(name)\n\n    def speak(self):\n        return "Мяу"`
    },
    {
      id: "m9l2e2",
      title: "Магический метод __len__",
      task: `Создайте класс <code>Playlist</code> с конструктором <code>__init__(self, songs)</code>, где songs — список песен, и методом <code>__len__</code>, возвращающим количество песен.`,
      starter: `class Playlist:\n    def __init__(self, songs):\n        pass\n\n    def __len__(self):\n        pass\n`,
      check: { type: "tests", tests: `p = Playlist(["a", "b", "c"])\nassert len(p) == 3, "len(Playlist) = 3"\nassert len(Playlist([])) == 0, "Пустой плейлист -> 0"` },
      hints: ["Сохраните список: self.songs = songs.", "__len__ возвращает len(self.songs)."],
      solution: `class Playlist:\n    def __init__(self, songs):\n        self.songs = songs\n\n    def __len__(self):\n        return len(self.songs)`
    }
  ],
  m10l1: [
    {
      id: "m10l1e1",
      title: "Декоратор-счётчик вызовов",
      task: `Напишите декоратор <code>count_calls</code>, который считает, сколько раз вызвали функцию. Число вызовов доступно как <code>func.calls</code>.`,
      starter: `def count_calls(func):\n    def wrapper(*args, **kwargs):\n        # увеличьте счётчик и вызовите func\n        pass\n    # задайте начальное значение счётчика\n    return wrapper\n`,
      check: { type: "tests", tests: `@count_calls\ndef add(a, b):\n    return a + b\n\nassert add.calls == 0, "До вызовов счётчик равен 0"\nadd(1, 2)\nadd(3, 4)\nassert add.calls == 2, "После двух вызовов счётчик равен 2"\nassert add(5, 6) == 11, "Функция продолжает работать"` },
      hints: ["Задайте wrapper.calls = 0 перед return.", "Внутри wrapper делайте wrapper.calls += 1."],
      solution: `def count_calls(func):\n    def wrapper(*args, **kwargs):\n        wrapper.calls += 1\n        return func(*args, **kwargs)\n    wrapper.calls = 0\n    return wrapper`
    }
  ],
  m10l2: [
    {
      id: "m10l2e1",
      title: "Генератор Фибоначчи",
      task: `Напишите генератор <code>fib(n)</code>, который выдаёт первые n чисел Фибоначчи (начиная с 0 и 1).`,
      starter: `def fib(n):\n    a, b = 0, 1\n    # используйте yield\n`,
      check: { type: "tests", tests: `assert list(fib(7)) == [0, 1, 1, 2, 3, 5, 8], "Первые 7 чисел: 0, 1, 1, 2, 3, 5, 8"\nassert list(fib(0)) == [], "fib(0) пуст"\nassert list(fib(2)) == [0, 1], "fib(2) = [0, 1]"` },
      hints: ["В цикле for _ in range(n) делайте yield a.", "Обновляйте: a, b = b, a + b."],
      solution: `def fib(n):\n    a, b = 0, 1\n    for _ in range(n):\n        yield a\n        a, b = b, a + b`
    }
  ],
  m10l3: [
    {
      id: "m10l3e1",
      title: "Анаграммы",
      task: `Напишите функцию <code>is_anagram(a, b)</code>, которая возвращает True, если слова состоят из одних и тех же букв (игнорируя регистр).`,
      starter: `def is_anagram(a, b):\n    # сравните отсортированные буквы\n`,
      check: { type: "tests", tests: `assert is_anagram("кот", "ток") is True, "кот и ток — анаграммы"\nassert is_anagram("кот", "кит") is False, "кот и кит — не анаграммы"\nassert is_anagram("Ток", "кот") is True, "Игнорируйте регистр"` },
      hints: ["Приведите обе строки к нижнему регистру.", "Сравните sorted(a.lower()) == sorted(b.lower())."],
      solution: `def is_anagram(a, b):\n    return sorted(a.lower()) == sorted(b.lower())`
    }
  ]
};

CURRICULUM.forEach(function (mod) {
  mod.lessons.forEach(function (lesson) {
    var extra = EXTRA_HOMEWORK[lesson.id] || EXTRA_HOMEWORK_2[lesson.id];
    if (extra) lesson.homework = (lesson.homework || []).concat(extra);
  });
});