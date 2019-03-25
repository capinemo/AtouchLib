const ru = {
    atouch_name: 'Atouch',

    // 1. Interface
    iface_title: 'Atouch',

    // 1.1. Tabs
    // 1.1.1.  Test tab
    iface_tab_test_title: 'Тестирование',
    iface_tab_test_button_start: 'Запустить',
    iface_tab_test_select_test: 'Выберите тест для запуска',

    // 1.1.2.  Auth tab
    iface_tab_auth_title: 'Личный кабинет',

    // 1.1.3. Lang tab
    iface_tab_option_title: 'Настройки',
    iface_tab_option_select_lang: 'Выберите язык',
    iface_tab_option_change_lang: 'Выбрать',

    // 1.1.4.  Report tab
    iface_tab_report_title: 'Отчет',

    // 1.2. Interface
    // 1.2.1. Head
    iface_button_hide_panel: 'Скрыть панель',
    iface_button_show_panel: 'Показать панель',

    // 1.2.2. Content
    iface_range_opacity_level: 'Урочень прозрачности панели',



    // 2. Atouch
    // 2.1. Errors
    atouch_errors: {
        // 2.1.1. BROWSER [1]
        // BROWSER.prototype.go [10]
        1100: 'Неизвестная ошибка Метода (go) Объекта (BROWSER)',
        // BROWSER.prototype.reload [11]
        // 1110: 'Неизвестная ошибка Метода (reload) Объекта (BROWSER)',
        // BROWSER.prototype.check [12]
        1120: 'Неизвестная ошибка Метода (check) Объекта (BROWSER)',
        // BROWSER.prototype.jscheck [13]
        1130: 'Неизвестная ошибка Метода (jscheck) Объекта (BROWSER)',
        // BROWSER.prototype.csscheck [14]
        1140: 'Неизвестная ошибка Метода (csscheck) Объекта (BROWSER)',
        // BROWSER.prototype.cookcheck [15]
        1150: 'Неизвестная ошибка Метода (cookcheck) Объекта (BROWSER)',
        // BROWSER.prototype.pause [16]
        1160: 'Неизвестная ошибка Метода (pause) Объекта (BROWSER)',
        // BROWSER.prototype.cookdel [17]
        1170: 'Неизвестная ошибка Метода (cookdel) Объекта (BROWSER)',
        // BROWSER.prototype.back [18]
        // 1180: 'Неизвестная ошибка Метода (back) Объекта (BROWSER)',
        // BROWSER.prototype.forward [19]
        // 1190: 'Неизвестная ошибка Метода (forward) Объекта (BROWSER)',

        // 2.1.2. MOUSE [2]
        // MOUSE.prototype.click [10]
        2100: 'Неизвестная ошибка Метода (click) Объекта (MOUSE)',
        2101: '',
        // MOUSE.prototype.dblclick [11]
        2110: 'Неизвестная ошибка Метода (dblclick) Объекта (MOUSE)',
        // MOUSE.prototype.select [12]
        2120: 'Неизвестная ошибка Метода (select) Объекта (MOUSE)',
        // MOUSE.prototype.down [13]
        2130: 'Неизвестная ошибка Метода (down) Объекта (MOUSE)',
        // MOUSE.prototype.up [14]
        2140: 'Неизвестная ошибка Метода (up) Объекта (MOUSE)',
        // MOUSE.prototype.focus [15]
        2150: 'Неизвестная ошибка Метода (focus) Объекта (MOUSE)',
        // MOUSE.prototype.come [16]
        2160: 'Неизвестная ошибка Метода (come) Объекта (MOUSE)',
        // MOUSE.prototype.leave [17]
        2170: 'Неизвестная ошибка Метода (leave) Объекта (MOUSE)',
        // MOUSE.prototype.over [18]
        2180: 'Неизвестная ошибка Метода (over) Объекта (MOUSE)',
        // MOUSE.prototype.out [19]
        2190: 'Неизвестная ошибка Метода (out) Объекта (MOUSE)',
        // MOUSE.prototype.move [20]
        2200: 'Неизвестная ошибка Метода (move) Объекта (MOUSE)',
        2201: 'Передан некорректный параметр params. Необходимо передать объект вида {x: 0, y: 400}, либо директива должна содержать директивы id, class, name, tag и index',
        2202: 'Отсутствует параметр params',
        2203: '',
        // MOUSE.prototype.scrollby [21]
        2210: 'Неизвестная ошибка Метода (scrollby) Объекта (MOUSE)',
        // MOUSE.prototype.scrollto [22]
        2220: 'Неизвестная ошибка Метода (scrollto) Объекта (MOUSE)',
        2221: 'Передан некорректный параметр params. Необходимо передать объект вида {x: 0, y: 400}',
        2222: 'Отсутствует параметр params. Необходимо передать объект вида {x: 0, y: 400}',
        // MOUSE.prototype.pull [23]
        2230: 'Неизвестная ошибка Метода (pull) Объекта (MOUSE)',
        // MOUSE.prototype.attach [24]
        2240: 'Неизвестная ошибка Метода (attach) Объекта (MOUSE)',
        // MOUSE.prototype.mark [25]
        2250: 'Неизвестная ошибка Метода (mark) Объекта (MOUSE)',

        // 2.1.3. KEYBOARD [3]
        // KEYBOARD.prototype.print [10]
        3100: 'Неизвестная ошибка Метода (print) Объекта (KEYBOARD)',
        3101: 'Отсутствует параметр input. Необходимо передать строку для печати',
        // KEYBOARD.prototype.fill [11]
        3110: 'Неизвестная ошибка Метода (fill) Объекта (KEYBOARD)',
        // KEYBOARD.prototype.clear [12]
        3120: 'Неизвестная ошибка Метода (clear) Объекта (KEYBOARD)',
        // KEYBOARD.prototype.stream [13]
        3130: 'Неизвестная ошибка Метода (stream) Объекта (KEYBOARD)',

        // 2.1.4. Checks [4]
        // all [00]
        4000: 'Условие не выполняется',
        4001: 'Указаны некорректные ссылки на HTML-элементы: используйте директивы id, class, name, tag и index',
        4002: 'Указанные HTML-элементы на странице не найдены',
        4003: 'Передана пустая ссылка или ссылка на HTML-коллекцию, хотя ожидается ссылка на один HTML-элемент',

        // html [10]
        4102: 'Не указан тип сравнения: используйте директивы has, equal, anyhas, allhas, anyequal, allequal для указания строки поиска',
        4103: 'Строкой поиска может быть только сточное значение или число',
        4104: 'Указана директива поиска в одном HTML-элементе, а для анализа передана коллекция HTML-элементов: используйте директивы anyhas, allhas, anyequal, allequal',

        // js [20]
        4200: 'Отсутствует ссылка на имя переменной: используйте директиву vars',
        4201: 'Указанная переменная JS не объявлена или не присвоена',
        4202: 'Директива key должна содержать строку с идентификаторами вложенных переменных, разделенных точками',
        4203: 'Директива key содержит ссылку на несуществующую переменную',
        4204: 'Не указан тип сравнения: используйте директивы has, equal, type для указания строки поиска',

        // css [30]
        4300: 'Директива style должна содержать объект со сравниваемыми свойствами CSS',

        // cookie [40]
        4400: 'Отсутствует ссылка на имя переменной: используйте директиву vars',
        4401: 'Не указан тип сравнения: используйте директивы has, equal для указания строки поиска',
        4402: 'Cookie с указанным именем отсутствует',
        4403: 'Для очистки cookie необходимо передать строку с ее именем',
    },
    library_errors: {
        sl_unload: 'Локатор служб не загружен, дальнейшая работа невозможна'
    }
};