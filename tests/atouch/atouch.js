/**
 * Atouch - javascript library for testing site in browser with imitation user action
 * http://atouch.picum.ru/
 *
 * Author: Rustem Sadykov
 * Contacts: rmsadykov@picum.ru
 *
 * Copyright: Picum.ru
 *
 * Date: 2018-06-10
 * Version: 0.9.0
 */

let atouch;

(function (global) {
    /**
     * @class ATOUCH
     * @description Global class for Atouch - in browser testing site library
     * @version 0.0.3
     */
    let ATOUCH = (function () {
        let domain  = '*',
            lang_list = [],   // ! Список доступных языков
            test_list = [],   // ! Список доступных тестов
            task_list = [],   // ! Список задач выбранного теста
            DI = null,
            Facade = null,
            Runner = null,
            Iface = null,
            Editor = null,
            Server = null,
            Unit = null,
            storekey = 'atouchState',  // ! Имя переменной с состоянием Atouch в хранилище
            storedie = 1000 * 60 * 30, // ! Срок хранения состояния (30 минут)
            state = {
                panel: {
                    opacity: null,  // ! Прозрачность панели
                    langtag: null   // ! Тег выбранного языка !! НЕ ИСПОЛЬЗУЕТСЯ!
                },
                atouch: {
                    execute: null,   // ! ID запущенного теста
                    run: null,       // ! Номер запущенной задачи
                    status: null,    // ! Состояние выполнения задачи (done - завершено, переходим к следующей, wait - ждем завершения)
                    progress: null,  // ! Состояние выполнения команды (актуально для составных команд)
                    result: null,    // ! Результат выполнения задачи (error|success),
                    log: [],         // ! Номера ошибок если выполнено с ошибкой, или 0, если удачно
                    error: 0         // ! Номер последней ошибки задачи
                },
                editor: {
                }
            };

        test_list = {
            'mouse' : {
                name: 'Mouse test',
                tasks: [
                    {'action':'scrollto','params':{x:0, y:400}} // S
                    /** {'action':'click','params':{class: 'text_link', index: 0}} // S */
                ],
                result: [0]
            },
            'browser' : {
                name: 'Browser test',
                tasks: [
                    {'action':'go','params':'index.html'}, // S
                    {'action':'go','params':''}, // S
                    {'action':'go','params':'index.html?test=3'}, // S
                    {'action':'go','params':'index.html'}, // S
                    {'action':'reload','params':''}, // S
                    {'action':'go','params':'index.html?test=4'}, // S
                    {'action':'go','params':'index.html?test=3'}, // S
                    {'action':'back','params':''}, // S
                    {'action':'forward','params':''}, // S
                    {'action':'check','params':{class: 'menu_button', index: 0, has: 'Mouse'}}, // S
                    {'action':'go','params':123}, // E 1100
        
                    {'action':'check','params':{class: 'menu_button', anyequal: 'Mouse controller'}}, // S
                    {'action':'check','params':{class: 'menu_button', anyhas: 'o'}}, // S
                    {'action':'check','params':{class: 'menu_button', index: 0, anyequal: 'Mouse controller'}}, // S
                    {'action':'check','params':{tag: 'p', index: 0, has: 'page <b>created</b'}}, // S
                    {'action':'check','params':{name: 'user_phone', index: 0, has: 'one4'}}, // S
                    {'action':'check','params':{tag: 'h1', index: 0, equal: 'C.I.T.Y - Testing page'}}, // S
                    {'action':'check','params':{class: 'menu_button', index: 0, equal: 'Mouse controller'}}, // S
                    {'action':'check','params':{class: 'menu_button', index: 0, has: 'Mouse'}}, // S
                    {'action':'check','params':{id: 'key_first', has: 'test##ENTERit'}}, // S
                    {'action':'check','params':{class: 'menu_button', index: 0, has: 'mouse'}}, // E 4000
                    {'action':'check','params':{class: 'menu_button', index: 0, equal: 'mouse controller'}}, // E 4000
                    {'action':'check','params':{class: 'menu_button', allhas: 'o'}}, // E 4000
                    {'action':'check','params':{class: 'menu_button', allequal: 'Mouse controller'}}, // E 4000
                    {'action':'check','params':{allequal: 'Mouse controller'}}, // E 4001
                    {'action':'check','params':{class: 'menu_button', index: 0}}, // E 4102
                    {'action':'check','params':{class: 'menu_button1', index: 0, has: 'Mouse'}}, // E 4002
                    {'action':'check','params':{class: 'menu_button', index: 10, has: 'Mouse'}}, // E 4002
                    {'action':'check','params':{class: 'menu_button', index: 0, has: [2, 5]}}, // E 4103
                    {'action':'check','params':{class: 'menu_button', equal: 'Mouse controller'}}, // E 4104
        
                    {'action':'jscheck','params':{vars: 'store', equal: 'My test string'}}, // S
                    {'action':'jscheck','params':{vars: 'store1', equal: null}}, // S
                    {'action':'jscheck','params':{vars: 'myArr', equal: myArr}}, // S
                    {'action':'jscheck','params':{vars: 'myArr', equal: ['30', 21, 31, 32, 40], convert: true}}, // S
                    {'action':'jscheck','params':{vars: 'userFunction', type: 'function'}}, // S
                    {'action':'jscheck','params':{vars: 'userFunction1', type: 'function'}}, // S
                    {'action':'jscheck','params':{vars: 'myArr', type: 'array'}}, // S
                    {'action':'jscheck','params':{vars: 'store', type: 'string'}}, // S
                    {'action':'jscheck','params':{vars: 'myObj', type: 'object'}}, // S
                    {'action':'jscheck','params':{vars: 'right', equal: {a: 1, b: 2}, convert: true}}, // S
                    {'action':'jscheck','params':{vars: 'right', equal: {b: 2, a: 1}, convert: true}}, // S
                    {'action':'jscheck','params':{vars: 'right', equal: right}}, // S
                    {'action':'jscheck','params':{vars: 'myObj', key: 'key', type: 'function'}}, // S
                    {'action':'jscheck','params':{vars: 'myObj', key: 'option.2', type: 'number'}}, // S
                    {'action':'jscheck','params':{vars: 'myObj', key: 'option.4', equal: 999}}, // S
                    {'action':'jscheck','params':{vars: 'myObj', key: 'option.4', equal: '999', convert: true}}, // S
                    {'action':'jscheck','params':{vars: 'myArr', key: 'length', equal: 5}}, // S
                    {'action':'jscheck','params':{vars: 'store', key: 'length', equal: 14}}, // S
                    {'action':'jscheck','params':{vars: 'myObj', key: 'option', type: 'object'}}, // S
                    {'action':'jscheck','params':{vars: 'store', has: 'test'}}, // S
                    {'action':'jscheck','params':{vars: 'myArr', has: 32}}, // S
                    {'action':'jscheck','params':{vars: 'myArr', has: 30, convert: true}}, // S
                    {'action':'jscheck','params':{vars: 'myObj', key: 'option.4', has: '9', convert: true}}, // S
                    {'action':'jscheck','params':{vars: 'right', equal: {a: 1, b: 2}}}, // E 4000
                    {'action':'jscheck','params':{vars: 'right', equal: {b: 2, a: 1}}}, // E 4000
                    {'action':'jscheck','params':{vars: 'myArr', equal: ['30', 21, 31, 32, 40]}}, // E 4000
                    {'action':'jscheck','params':{vars: 'myObj', equal: 'My test string'}}, // E 4000
                    {'action':'jscheck','params':{vars: 'store', equal: null}}, // E 4000
                    {'action':'jscheck','params':{vars: 'userFunction', type: 'boolean'}}, // E 4000
                    {'action':'jscheck','params':{vars: 'userFunction1', type: 'number'}}, // E 4000
                    {'action':'jscheck','params':{vars: 'myArr', type: 'null'}}, // E 4000
                    {'action':'jscheck','params':{vars: 'store', type: 'undefined'}}, // E 4000
                    {'action':'jscheck','params':{vars: 'myObj', key: 'option.4', equal: '999'}}, // E 4000
                    {'action':'jscheck','params':{vars: 'store1', key: 'length', equal: 2}}, // E 4000
                    {'action':'jscheck','params':{vars: 'myArr', has: 30}}, // E 4000
                    {'action':'jscheck','params':{vars: 'store', has: 'Test'}}, // E 4000
                    {'action':'jscheck','params':{vars: 'store', has: 'Test'}}, // E 4000
                    {'action':'jscheck','params':{vars: 'myObj', key: 'option.4', has: '7', convert: true}}, // E 4000
                    {'action':'jscheck','params':{equal: {a: 1, b: 2}}}, // E 4200
                    {'action':'jscheck','params':{vars: 'store3', equal: 'My test string'}}, // E 4201
                    {'action':'jscheck','params':{vars: 'myObj', key: 45, has: '7', convert: true}}, // E 4202
                    {'action':'jscheck','params':{vars: 'myObj', key: 'length', equal: 2}}, // E 4203
                    {'action':'jscheck','params':{vars: 'right'}}, // E 4204
        
                    {'action':'csscheck','params':{class: 'menu_button', index: 0, style: {'margin-bottom': '10px', 'text-decoration': 'none'}}}, // S
                    {'action':'csscheck','params':{tag: 'h1', index: 0, style: {'color': '#006666', 'font-size': '30px'}}}, // S
                    {'action':'csscheck','params':{tag: 'h1', index: 0, style: {'color': '#066'}}}, // S
                    {'action':'csscheck','params':{class: 'menu_button', index: 0, style: {'padding-right': '10px'}}}, // S
                    {'action':'csscheck','params':{tag: 'h1', index: 0, style: {'color': '#066', 'padding': '7px'}}}, // E 4000
                    {'action':'csscheck','params':{tag: 'h1', index: 0, style: {'color': '#Ab9', 'padding': '7px'}}}, // E 4000
                    {'action':'csscheck','params':{tag: 'h1', index: 0, style: {'color': '#AS9', 'padding': '7px'}}}, // E 4000
                    {'action':'csscheck','params':{tag: 'h1', index: 0, style: {'color': '#ABC9', 'padding': '7px'}}}, // E 4000
                    {'action':'csscheck','params':{tag: 'h1', index: 0, style: {'color': '#006666', 'padding': '7px', 'background': '#e0e0ff'}}}, // E 4000
                    {'action':'csscheck','params':{tag: 'h1', index: 0, style: {'color': '#006666', '-webkit-border-radius': '7px'}}}, // E 4000
                    {'action':'csscheck','params':{tag: 'h1', style: {'color': '#006666', 'padding': '7px'}}}, // E 4001
                    {'action':'csscheck','params':{tag: 'h1', index: 2, style: {'color': '#006666', 'padding': '7px'}}}, // E 4002
                    {'action':'csscheck','params':{tag: 'h1'}}, // E 4300
        
                    {'action':'cookcheck','params':{cook: 'test_cook', has: 'controller'}}, // S
                    {'action':'cookcheck','params':{cook: 'test_cook_add', has: 'controller'}}, // S
                    {'action':'cookcheck','params':{cook: 'test_cook', equal: 'Mouse controller'}}, // S
                    {'action':'cookcheck','params':{cook: 'test_cook_add', equal: 'mouse controller'}}, // E 4000
                    {'action':'cookdel','params':'test_cook_add'}, // S
                    {'action':'cookdel','params':'test_cook_add'}, // E 4402
                    {'action':'cookdel','params':123}, // E 4403
                    {'action':'cookcheck','params':{cook: 'test_cook_add', has: 'controller'}}, // E 4400
                    {'action':'cookcheck','params':{cook: 'test_cook_add', equal: 'mouse controller'}}, // E 4400
                    {'action':'cookcheck','params':{equal: 'mouse controller'}}, // E 4400
                    {'action':'cookcheck','params':{cook: 'test_cook_add'}} // E 4401
                ],
                result: [0,0,0,0,0,0,0,0,0,0,1100,0,0,0,0,0,0,0,0,0,4000,4000,4000,4000,4001,4102,4002,4002,4103,4104,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4000,4200,4201,4202,4203,4204,0,0,0,0,4000,4000,4000,4000,4000,4000,4001,4002,4300,0,0,0,4000,0,4402,4403,4400,4400,4400,4401]
            }
        };

        /**
         * Calculates page size with scrolls
         *
         * @private
         * 
         * @returns {Object}              Object {x:0, y:0} with scroll sizes
         */
        function getPageScroll () {
            return {
                x: window.pageXOffset || document.documentElement.scrollLeft,
                y: window.pageYOffset || document.documentElement.scrollTop
            };
        }
        
        /**
         * Async animation function
         * 
         * @private
         * 
         * @param {Function} animation Asynchronous function is executed each iteration
         * @param {number} duration Iterations number
         * @param {Function} callback Function is executed after last iterationtion
         *
         * @returns {none}          No return
         */
        function _animate (animation, duration, callback) {
            requestAnimationFrame(function _animate (time) {
                animation();
                duration--;
                
                if (duration > 0) {
                    requestAnimationFrame(_animate);
                } else {
                    callback();
                }
            });
        }

        /**
         * @class FACADE
         * @description Atouch debugging functions class
         * @version 0.0.2
         */
        let FACADE = (function () {
            /**
             * @constructor
             *
             * @returns {FACADE}             FACADE object
             */
            function FACADE () {
                return this;
            }
        
            return FACADE;
        })();
        
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = {
                FACADE
            };
        }

        /**
         * @class INJECT
         * @description Dependency injection class
         * @version 0.9.3
         */
        let INJECT = (function () {
            let services = {};
            
            /**
             * Register service in Dinject scope and inject Dinject scope to service
             * 
             * @public
             * 
             * @param {string} name             Service name
             * @param {Object} classObject      Object registered as service
             * @returns {none}                  No return
             */
            INJECT.prototype.registerService = function (name, classObject) {
                services[name] = new classObject;
            };
            
            /**
             * Checks that service with certan name is registered
             * 
             * @public
             * 
             * @param {string} name             Service name
             * @returns {Boolean}               Result of service searching
             */
            INJECT.prototype.isService = function (name) {
                if (services[name]) {
                    return true;
                }
                
                return false;
            };
            
            /**
             * Return service by name
             * 
             * @public
             * 
             * @param {string} name             Service name
             * @returns {Object}                Registered Object of class
             */
            INJECT.prototype.getService = function (name) {
                return services[name];
            };
            
            /**
             * @constructor
             * 
             * @returns {INJECT}              INJECT object
             */
            function INJECT () {
                return this;
            }
        
            return INJECT;
        })();

        /**
         * @class LANG
         * @description Atouch class for supporing different laungages
         * @version 0.1.3
         */
        let LANG = (function () {
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
                    // MOUSE.prototype.scrollby [21]
                    2210: 'Неизвестная ошибка Метода (scrollby) Объекта (MOUSE)',
                    // MOUSE.prototype.scrollto [22]
                    2220: 'Неизвестная ошибка Метода (scrollto) Объекта (MOUSE)',
                    // MOUSE.prototype.pull [23]
                    2230: 'Неизвестная ошибка Метода (pull) Объекта (MOUSE)',
                    // MOUSE.prototype.attach [24]
                    2240: 'Неизвестная ошибка Метода (attach) Объекта (MOUSE)',
                    // MOUSE.prototype.mark [25]
                    2250: 'Неизвестная ошибка Метода (mark) Объекта (MOUSE)',
                    
                    // 2.1.3. KEYBOARD [3]
                    // KEYBOARD.prototype.print [10]
                    3100: 'Неизвестная ошибка Метода (print) Объекта (KEYBOARD)',
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
                }
            };
            
            const en = {
                atouch_name: 'Atouch',
                
                // 1. Interface
                iface_title: 'Atouch',
                
                // 1.1. Tabs
                // 1.1.1.  Test tab
                iface_tab_test_title: 'Testing',
                iface_tab_test_button_start: 'Run',
                iface_tab_test_select_test: 'Select test',
                
                // 1.1.2.  Auth tab
                iface_tab_auth_title: 'Workplace',
                
                // 1.1.3. Lang tab
                iface_tab_option_title: 'Options',
                iface_tab_option_select_lang: 'Select language',
                iface_tab_option_change_lang: 'Change',
                
                // 1.1.4.  Report tab
                iface_tab_report_title: 'Report',
                
                // 1.2. Interface
                // 1.2.1. Head
                iface_button_hide_panel: 'Hide panel',
                iface_button_show_panel: 'Show panel',
                
                // 1.2.2. Content
                iface_range_opacity_level: 'Panel transparency level'
            };
            
            LANG.prototype.text = {};
            LANG.prototype.selectedLang = '';
            LANG.prototype.lang_list = [
                {name: 'RU: Русский', link: 'ru', data: ru}/* ,
                {name: 'EN: English', link: 'en', data: en}*/
            ];
        
            /**
             * Set language as selected in Atouch and save language tag in cookie
             * 
             * @public
             * 
             * @param {string} lang_link    Selected language tag for changing
             * @returns {boolean}           True if success
             */
            LANG.prototype.setLanguage = function (lang_link) {
                let lang_set = null,
                    new_date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);
        
                for (let i = this.lang_list.length; i--;) {
                    if (lang_link === this.lang_list[i].link) {
                        lang_set = this.lang_list[i].data;
                    }
                }
        
                if (!lang_set) {
                    return false;
                }
        
                document.cookie = 'atouchLang=' + lang_link + ';path=/;expires=' + new_date.toUTCString();
        
                this.text = lang_set;
                this.selectedLang = lang_link;
        
                return true;
            };
        
            /**
             * Finds earlier selected language in cookies
             * 
             * @public
             * 
             * @returns {LANG}              Selected language tag
             */
            LANG.prototype.getLanguage = function () {
                let matches = document.cookie.match(/atouchLang=[\s\S]{2,3}?[;]*/ig),
                    language = matches 
                        ? matches[0].replace('atouchLang=', '').replace('; ', '').replace(';', '')
                        : null;
        
                return language ? decodeURIComponent(language) : null;
            };
            
            /**
             * @constructor
             * 
             * @param {string} selectLang   Аutomatically selected language
             * @returns {LANG}              LANG object
             */
            function LANG (selectLang = null) {
                let saved_lang = this.getLanguage();
                
                if (saved_lang) {
                    curr_lang = saved_lang;
                } else if (selectLang) {
                    curr_lang = selectLang;
                } else {
                    curr_lang = 'ru';
                }
        
                this.setLanguage(curr_lang);
        
                return this;
            }
        
            return LANG;
        })();

        /**
         * @class DEBUG
         * @description Atouch debugging functions class
         * @version 0.0.2
         */
        let DEBUG = (function () {
            /**
             * @constructor
             * 
             * @returns {DEBUG}             DEBUG object
             */
            function DEBUG () {
                return this;
            }
        
            return DEBUG;
        })();

        /**
         * @class RUNNER
         * @description Atouch tests running and handling class
         * @version 0.4.3
         */
        let RUNNER = (function () {
            let Storage,
                Log,
                Browser,
                Mouse,
                Keyboard,
                control = {},
                listeners = [],     // ! Массив с слушателями изменения состояния этапа
                spec_key = {},      // ! Список специальных клавиш и их кодов
                _;
        
            spec_key['ENTER'] = ['\n', 13];
            spec_key['TAB'] = ['\t', 9];
            spec_key['BACKSPACE'] = [null, 8];
            spec_key['CTRL'] = [null, 17];
            spec_key['SHIFT'] = [null, 16];
            spec_key['ALT'] = [null, 18];
            spec_key['ESCAPE'] = [null, 27];
            spec_key['DELETE'] = [null, 46];
            spec_key['HOME'] = [null, 36];
            spec_key['END'] = [null, 35];
            spec_key['PAGEUP'] = [null, 33];
            spec_key['PAGEDOWN'] = [null, 34];
            spec_key['INSERT'] = [null, 45];
            spec_key['SPACE'] = [' ', 32];
            spec_key['LEFT'] = [null, 37];
            spec_key['UP'] = [null, 38];
            spec_key['RIGHT'] = [null, 39];
            spec_key['DOWN'] = [null, 40];
        
            /**
             * Async listener for last action in chain. Marks action as last in test, clear <br />
             * all listeners in collection and runs callback function. Usually callback <br />
             * functions is success or error from _executeTest function. In parallel can <br />
             * work more than one _listenFinishEvent functions. <br />
             * 
             * @private
             *
             * @param {string} content      Value which must match the target variable
             * @param {Function} callback   Function is executed if value identical to target variable
             * @param {boolean} last        This is last phase
             * @returns {none}              No return
             */
            function waitPhaseFinish (content, callback, last = false) {
                let timer = setInterval(function () {
                    if (state.atouch.progress === content) {
                        callback();
                        
                        if (last) {
                            for (let i = listeners.length; i--;) {
                                clearInterval(listeners[i]);
                                listeners.splice(i, 1);
                            }
                        } else {
                            let i = listeners.indexOf(timer);
                            clearInterval(listeners[i]);
                            listeners.splice(i, 1);
                        }
                    }
                }, 10);
            
                listeners.push(timer);
                
                return true;
            }
        
            /**
             * Finds elements by id, class, tag or name <br />
             * Example: <br />
             * {id: 'element_id'} - returns one element or null <br />
             * {tag: 'collection_tag'} - returns collection or null <br />
             * {tag: 'collection_tag', index: 2} - returns one element or null <br />
             * {name: 'collection_name'} - returns collection or null <br />
             * {name: 'collection_name', index: 1} - returns one element or null <br />
             * {class: 'collection_class'} - returns collection or null <br />
             * {class: 'collection_class', index: 0} - returns one element or null <br />
             * 
             * @private
             * 
             * @param {Object} data         Object with datas for finding  <br />
             *                              HTMLElement|HTMLCollection
             * @returns {HTMLElement|HTMLCollection|null}   Finded HTMLElement|HTMLCollection <br />
             *                                                      or null
             */
            function getHtmlTarget (data) {
                let elem = null,
                    elems = [];
            
                if (data.id) {
                    elem = document.getElementById(data.id);
                } else if (data.tag) {
                    if (typeof data.index === 'number' && data.index >= 0) {
                        elem = document.getElementsByTagName(data.tag)[data.index];
                    } else {
                        elems = document.getElementsByTagName(data.tag);
                    }
                } else if (data.name) {
                    if (typeof data.index === 'number' && data.index >= 0) {
                        elem = document.getElementsByName(data.name)[data.index];
                    } else {
                        elems = document.getElementsByName(data.name);
                    }
                } else if (data.class) {
                    if (typeof data.index === 'number' && data.index >= 0) {
                        elem = document.getElementsByClassName(data.class)[data.index];
                    } else {
                        elems = document.getElementsByClassName(data.class);
                    }
                } else {
                    state.atouch.progress = 'error';
                    state.atouch.error = 4001;
                    return null;
                }
            
                if (elem) {
                    return elem;
                } else if (elems.length > 0) {
                    return elems;
                } else {
                    state.atouch.progress = 'error';
                    state.atouch.error = 4002;
                    return null;
                }
            }
            
            /**
             * Finds JavaScript variables in global scope <br />
             * Example: <br />
             * {vars: 'some_variable'} - returns global variable link to some_variable <br />
             * {vars: 'some_object', key: 'lists.file.0'} - returns global variable link  <br />
             * to some_object.lists.file.0
             * 
             * @private
             * 
             * @param {Object} data         Object with datas for finding JS variable
             * @returns {Any|undefined}     Finded global JS variable
             */
            function getJsTarget (data) {
                let target,
                    path,
                    full_path;
            
                if (data.hasOwnProperty('vars')) {
                    target = data.vars;
                } else {
                    state.atouch.progress = 'error';
                    state.atouch.error = 4200;
                    return undefined;
                }
                
                if (global[target] && data.hasOwnProperty('key') && global[target] !== 'undefined') {
                    if (typeof data.key !== 'string') {
                        state.atouch.progress = 'error';
                        state.atouch.error = 4202;
                        return undefined;
                    }
            
                    path = data.key.split('.');
                    full_path = global[target];
            
                    for (let i = 0, c = path.length; i < c; i++) {
                        full_path = full_path[path[i]];
            
                        if (typeof full_path === 'undefined') {
                            state.atouch.progress = 'error';
                            state.atouch.error = 4203;
                            return undefined;
                        }
                    }
            
                    return full_path;
                } else if (typeof global[target] !== 'undefined') {
                    return global[target];
                } else {
                    state.atouch.progress = 'error';
                    state.atouch.error = 4201;
                    return undefined;
                }
            }
            
            /**
             * Find special symbol markers in string and replace it to control character <br />
             * if given not string or number, function returns given parameter without converting <br />
             * For example: 'test_##TAB_test converts to 'test_\t_test' <br />
             * See list of special string blocks in spec_key.
             * 
             * @private
             * 
             * @param {Any} string      Given parameter
             * @returns {Any}           Given parameter or converted string
             */
            function specialSymbolsTranslateToStr (string) {
                let result = string;
                
                if (typeof result !== 'string' && typeof result !== 'number') {
                    return string;
                }
                
                for (let key in spec_key) {
                    if (spec_key.hasOwnProperty(key) && spec_key[key][0] !== null) {
                        result = result.replace(new RegExp('##' + key, 'g'), spec_key[key][0]);
                    }
                }
            
                return result;
            }
            
            /**
             * Load saved state of Atouch from cookie
             * 
             * @private
             * 
             * @param {string} name         Cookie name
             * @returns {string|null}       Data with saved state from cookie
             */
            function getCookieContent (name) {
                let matches;
            
                if (typeof name !== 'string') {
                    return null;
                }
            
                matches = document.cookie.match(new RegExp('(?:^|; )'
                    + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')
                    + '=([^;]*)'
                ));
            
                if (matches.length === 1 || matches[1] === '') {
                    return null;
                }
            
                return matches ? decodeURIComponent(matches[1]) : undefined;
            }
            
            /**
             * Remove cookie with saved state of Atouch 
             * 
             * @private
             * 
             * @param {string} name         Cookie name
             * @returns {none}              No return
             */
            function clearCookieContent (name) {
                document.cookie = name + '=;path=/;expires=-1';
            }
            
            /**
             * Finds DOM element by information in data
             *
             * @private
             * 
             * @param {Object} data         Object with parameters
             * @returns {HTMLElement}       The detected element or false
             */
            function getElementObject (data) {
                let find;
            
                if (data.id) {
                    find = document.getElementById(data.id);
                } else if (data.tag && data.index >= 0) {
                    find = document.getElementsByTagName(data.tag)[data.index];
                } else if (data.name && data.index >= 0) {
                    find = document.getElementsByName(data.name)[data.index];
                } else if (data.class && data.index >= 0) {
                    find = document.getElementsByClassName(data.class)[data.index];
                } else {
                    // _message.err('Parameters not for HTMLElement', 503);
                    // _mouse.state = 'error';
                    return false;
                }
            
                return find;
            }
            
            
            /**
             * Finds DOM elements collection by information in data
             *
             * @private
             * 
             * @param {Object} data                 Object with parameters
             * @return {HTMLElementsCollection}     The detected elements array or false
             */
            function getElementsCollection (data) {
                let find;
            
                if (data.tag && !data.index) {
                    find = document.getElementsByTagName(data.tag);
                } else if (data.name && !data.index) {
                    find = document.getElementsByName(data.name);
                } else if (data.class && !data.index) {
                    find = document.getElementsByClassName(data.class);
                } else {
                    // _message.err('Parameters not for HTMLElementsCollection', 504);
                    // _mouse.state = 'error';
                    return false;
                }
            
                return find;
            }
            
            /**
             * Checks that content of element (value or innerHTML) include given string
             * 
             * @private
             * 
             * @param {HTMLElement} elem        Checking HTML element
             * @param {string|number} string    String for comparing
             * @returns {boolean}               Checking result
             */
            function checkElementContentSimilar (elem, string) {
                let content_container,
                    content_read = specialSymbolsTranslateToStr(string);
            
                if (!(elem instanceof HTMLElement)
                        && typeof content_read !== 'string'
                        && typeof content_read !== 'number') {
                    return false;
                }
            
                if ('value' in elem) {
                    content_container = elem.value;
                } else {
                    content_container = elem.innerHTML;
                }
            
                return !!~content_container.indexOf(content_read);
            }
            
            /**
             * Checks that content of element (value or innerHTML) equal to given string
             * 
             * @private
             * 
             * @param {HTMLElement} elem        Checking HTML element
             * @param {string|number} string    String for comparing
             * @returns {boolean}               Checking result
             */
            function checkElementContentEqual (elem, string) {
                let content_container,
                    content_read = specialSymbolsTranslateToStr(string);
            
                if (!(elem instanceof HTMLElement)
                        && typeof content_read !== 'string'
                        && typeof content_read !== 'number') {
                    return false;
                }
            
                if (elem.hasOwnProperty('value')) {
                    content_container = elem.value;
                } else {
                    content_container = elem.innerHTML;
                }
            
                return content_container.toString() === content_read.toString();
            }
            
            /**
             * Checks that content of any element in collection (value or innerHTML) <br />
             * include given string
             * 
             * @private
             * 
             * @param {HTMLCollection} collection   Checking HTML elements collection
             * @param {string|number} string        String for comparing
             * @returns {boolean}                   Checking result
             */
            function checkAnyCollectionContentSimilar (collection, string) {
                let arr = [],
                    content_read = specialSymbolsTranslateToStr(string);
            
                if (!(collection instanceof HTMLCollection
                        || collection instanceof HTMLElement)
                        && typeof content !== 'string'
                        && typeof content !== 'number') {
                    return false;
                }
            
                if (collection instanceof HTMLCollection) {
                    arr = collection;
                } else {
                    arr.push(collection);
                }
            
                for (let i = arr.length; i--;) {
                    if (checkElementContentSimilar(arr[i], content_read)) {
                        return true;
                    }
                }
            
                return false;
            }
            
            /**
             * Checks that content of any element in collection (value or innerHTML) <br />
             * equal to given string
             * 
             * @private
             * 
             * @param {HTMLCollection} collection   Checking HTML elements collection
             * @param {string|number} string        String for comparing
             * @returns {boolean}                   Checking result
             */
            function checkAnyCollectionContentEqual (collection, string) {
                let arr = [],
                    content_read = specialSymbolsTranslateToStr(string);
            
                if (!(collection instanceof HTMLCollection
                        || collection instanceof HTMLElement)
                        && typeof content !== 'string'
                        && typeof content !== 'number') {
                    return false;
                }
            
                if (collection instanceof HTMLCollection) {
                    arr = collection;
                } else {
                    arr.push(collection);
                }
            
                for (let i = arr.length; i--;) {
                    if (checkElementContentEqual(arr[i], content_read)) {
                        return true;
                    }
                }
            
                return false;
            }
            
            /**
             * Checks that content of all elements in collection (value or innerHTML) <br />
             * include given string
             * 
             * @private
             * 
             * @param {HTMLCollection} collection   Checking HTML elements collection
             * @param {string|number} string        String for comparing
             * @returns {boolean}                   Checking result
             */
            function checkAllCollectionContentSimilar (collection, string) {
                let arr = [],
                    content_read = specialSymbolsTranslateToStr(string);
            
                if (!(collection instanceof HTMLCollection
                        || collection instanceof HTMLElement)
                        && typeof content !== 'string'
                        && typeof content !== 'number') {
                    return false;
                }
            
                if (collection instanceof HTMLCollection) {
                    arr = collection;
                } else {
                    arr.push(collection);
                }
            
                for (let i = arr.length; i--;) {
                    if (!checkElementContentSimilar(arr[i], content_read)) {
                        return false;
                    }
                }
            
                return true;
            }
            
            /**
             * Checks that content of all elements in collection (value or innerHTML) <br />
             * equal to given string
             * 
             * @private
             * 
             * @param {HTMLCollection} collection   Checking HTML elements collection
             * @param {string|number} string        String for comparing
             * @returns {boolean}                   Checking result
             */
            function checkAllCollectionContentEqual (collection, string) {
                let arr = [],
                    content_read = specialSymbolsTranslateToStr(string);
            
                if (!(collection instanceof HTMLCollection
                        || collection instanceof HTMLElement)
                        && typeof content !== 'string'
                        && typeof content !== 'number') {
                    return false;
                }
            
                if (collection instanceof HTMLCollection) {
                    arr = collection;
                } else {
                    arr.push(collection);
                }
            
                for (let i = arr.length; i--;) {
                    if (!checkElementContentEqual(arr[i], content_read)) {
                        return false;
                    }
                }
            
                return true;
            }
            
            /**
             * Checks that variable content the same with condition
             * 
             * @private
             * 
             * @param {Any} variable        Checking variable
             * @param {Any} content         Comparing sample
             * @param {boolean} strong      Strong comparing with data types (default - false)
             * @returns {boolean}           Checking result
             */
            function compareVariables (variable, content, strong = false) {
                let json_variable,
                    json_content;
            
                if (variable === null && content === null) {
                    return true;
                }
            
                if (strong) {
                    return variable === content;
                }
            
                if (typeof variable === 'number' || typeof variable === 'string'
                        || typeof variable === 'symbol' || typeof variable === 'boolean'
                        || typeof variable === 'function') {
                    return variable == content;
                } else if (variable instanceof Object && content instanceof Object) {
                    return compareObjects (variable, content);
                } else {
                    json_variable = JSON.stringify(variable);
                    json_content = JSON.stringify(content);
            
                    return json_variable === json_content;
                }
            }
            
            /**
             * Compares two objects with checking that both have the same elements <br />
             * regardless of sequence
             * 
             * @private
             * 
             * @param {Object} object1      First object
             * @param {Object} object2      Second object
             * @returns {boolean}           Comparing result
             */
            function compareObjects (object1, object2) {
                let keys = [];
            
                for (let key in object1) {
                    keys.push(key);
                }
            
                for (let key in object2) {
                    if (object2[key] instanceof Object && object1[key] instanceof Object) {
                        if (!compareVariables(object2[key], object1[key])) {
                            return false;
                        }
                    } else if (object2[key] !== object1[key]) {
                        return false;
                    } else {
                        keys.splice(keys.indexOf(key), 1);
                    }
                }
            
                if (keys.length !== 0) {
                    return false;
                }
            
                return true;
            }
            
            /**
             * Checks that variable content is equal to condition
             * 
             * @private
             * 
             * @param {Any} variable        Checking variable
             * @param {Any} content         String for comparing
             * @returns {boolean}           Checking result
             */
            function checkVariableEqual (variable, content) {
                return compareVariables(variable, content, true);
            }
            
            /**
             * Checks that variable content is similar to condition (types not compare)
             * 
             * @private
             * 
             * @param {Any} variable        Checking variable
             * @param {Any} content         String for comparing
             * @returns {boolean}           Checking result
             */
            function checkVariableSimilar (variable, content) {
                return compareVariables(variable, content);
            }
            
            /**
             * Checks that variable content has matches with condition
             * 
             * @private
             * 
             * @param {string|number|Array} variable    Variable content for checking
             * @param {string|number} content           String for searching
             * @param {boolean} strong                  Strong comparing with data types (default - false)
             * @returns {boolean}                       Checking result
             */
            function checkVariableContent (variable, content, strong = false) {
                let str_variable = variable,
                    str_content = content;
            
                if (strong) {
                    return !!~variable.indexOf(content);
                }
            
                if (typeof str_variable === 'string') {
                    str_content += '';
                } else if (typeof str_variable === 'number') {
                    str_variable += '';
                    str_content += '';
                } else if (str_variable instanceof Array) {
                    if (!~str_variable.indexOf(str_content) && typeof str_content === 'string') {
                        str_content = +str_content;
                    } else {
                        str_content += '';
                    }
                } else {
                    return false;
                }
            
                return !!~str_variable.indexOf(str_content);
            }
            
            /**
             * Checks that variable content has matches with condition considering data types
             *
             * @private
             * 
             * @param {string|number|Array} variable    Checking variable
             * @param {string|number} content           String for comparing
             * @returns {boolean}                       Checking result
             */
            function checkVariableContentEqual (variable, content) {
                return checkVariableContent(variable, content, true);
            }
            
            /**
             * Checks that variable content has matches with condition without data types
             *
             * @private
             * 
             * @param {string|number|Array} variable    Checking variable
             * @param {string|number} content           String for comparing
             * @returns {boolean}                       Checking result
             */
            function checkVariableContentSimilar (variable, content) {
                return checkVariableContent(variable, content);
            }
            
            /**
             * Checks that JS variable has specified type
             *
             * @private
             * 
             * @param {Any} variable        JavaScript variable
             * @param {string} type         Type name string (in lowercase with converting to <br />
             *                              string including null)
             * @returns {boolean}           Checking result
             */
            function checkVariableType (variable, type) {
                return type === variable.constructor.name.toLowerCase();
            }
            
            /**
             * Checks that the HTML element has the styles contained in the compared object
             *
             * @private
             * 
             * @param {HTMLElement} element Object for styles checking
             * @param {Object} css_obj      Object with styles for comparing
             * @returns {boolean}           Checking result
             */
            function checkStyleMatches (element, css_obj) {
                let css_name = '',
                    styles = css_obj;
            
                if (!(element instanceof HTMLElement)) {
                    return false;
                }
            
                for (let key in styles) {
                    if (styles.hasOwnProperty(key)) {
                        css_name = convertStyleName(key);
            
                        if (styles[key].charAt(0) === '#') {
                            styles[key] = convertStyleColor(styles[key]);
                            
                            if (!styles[key]) {
                                return false;
                            }
                        }
            
                        if (getComputedStyle(element)[css_name] !== styles[key]) {
                            return false;
                        }
                    }
                }
            
                return true;
            }
            
            /**
             * Converts style name from CSS or JavsScript format to JavaScript format
             *
             * @private
             * 
             * @param {string} css_name     Style name in CSS or JavaSctipt format
             * @returns {string}            Style name in JavaSctipt format
             */
            function convertStyleName (css_name) {
                let name = '',
                    arr = [];
            
                if (css_name === 'float') {
                    name = 'cssFloat';
                } else {
                    arr = css_name.split('-');
                    for (let i = 0, c = arr.length; i < c; i++) {
                        if (i === 0) {
                            name += arr[i].toLowerCase();
                        } else {
                            name += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
                        }
                    }
                }
            
                return name;
            }
            
            /**
             * Converts color from sharp format to rgb format
             *
             * @private
             * 
             * @param {string} sharp_string     Color in sharp format, f.e. #FF0000, #D55
             * @returns {string}                Color in rgb format, f.e. rgb(255, 0, 0)
             */
            function convertStyleColor (sharp_string) {
                let tmp_str = '',
                    clean_color,
                    matches;
            
                clean_color = sharp_string.replace('#', '');
            
                if (clean_color.length === 3) {
                    for (let i = 0, c = clean_color.length; i < c; i++) {
                        tmp_str += clean_color.charAt(i) + clean_color.charAt(i);
                    }
            
                    clean_color = tmp_str;
                } else if (clean_color.length !== 6) {
                    return null;
                }
            
                matches = clean_color.match(/[0-9A-Fa-f]{2}/g, clean_color);
            
                if (matches.length !== 3) {
                    return null;
                }
            
                matches.forEach(function (item, i, arr) {
                    arr[i] = parseInt(item, 16);
                });
            
                return 'rgb(' + matches[0] + ', ' + matches[1] + ', ' + matches[2] + ')';
            }
        
            /**
             * @class STORAGE
             * @description Atouch class for saving and loading global state then page reloaded
             * @version 0.9.3
             */
            let STORAGE = (function () {   
                /**
                 * Saves state of Atouch to storage (firstly to localStorage, then to <br />
                 * cookie, if not available)
                 * 
                 * @public
                 * 
                 * @returns {none}              No return
                 */
                STORAGE.prototype.saveState = function () {
                    let save_data = JSON.stringify({
                        data : state,
                        time : Date.now() + storedie
                    });
                    
                    let new_date = new Date(Date.now() + storedie),
                        utc_date = new_date.toUTCString();
            
                    try {
                        localStorage.setItem(storekey, save_data);
                    } catch (e) {
                        state = encodeURIComponent(state);
                        document.cookie = storekey + '=' + save_data + ';path=/;expires=' + utc_date;
                    }
                };
                
                /**
                 * Load state of Atouch from storage (firstly from localStorage, then from <br />
                 * cookie, if not available) and clean storage
                 * 
                 * @public
                 * 
                 * @returns {boolean}       True if success
                 */
                STORAGE.prototype.loadState = function () {
                    let load_data,
                        loaded_data;
            
                    try {
                        load_data = localStorage.getItem(storekey);
                    } catch (e) {
                        load_data = getCookieContent(storekey);
                    }
            
                    if (!load_data) {
                        return false;
                    }
                    
                    loaded_data = JSON.parse(load_data);
            
                    if (loaded_data.time < Date.now()) {
                        this.cleanState();
                        return false;
                    }
                    
                    state = loaded_data.data;
                    this.cleanState();
            
                    return true;
                };
                
                /**
                 * Remove state of Atouch from storage (firstly from localStorage, then from <br />
                 * cookie, if not available)
                 * 
                 * @public
                 * 
                 * @returns {none}              No return
                 */
                STORAGE.prototype.cleanState = function () {
                    try {
                        localStorage.removeItem(storekey);
                    } catch (e) {
                        clearCookieContent(storekey);
                    }
                };
                
                /**
                 * @constructor
            
                 * @returns {STORAGE}        STORAGE object
                 */
                function STORAGE () {
                    return this;
                }
            
                return STORAGE;
            })();
        
            /**
             * @class LOG
             * @description Atouch class for logging test execution
             * @version 0.0.3
             */
            let LOG = (function () {
                /**
                 * @constructor
                 * 
                 * @returns {LOG}        LOG object
                 */
                function LOG () {
                    return this;
                }
            
                return LOG;
            })();
        
            /**
             * @class BROWSER
             * @description Atouch class for imitation browser events, functions and actions
             * @version 0.9.3
             */
            let BROWSER = (function () {
                /**
                 * Load given url
                 * 
                 * @public
                 * 
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                BROWSER.prototype.go = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                    
                    if (typeof data !== 'string') {
                        state.atouch.progress = 'error';
                        state.atouch.error = 1100;
                    } else if (state.atouch.progress === 'relocate')  {
                        state.atouch.progress = 'ready';
                    } else {
                        state.atouch.progress = 'relocate';
                        Storage.saveState();
                        window.location = data;
                    }
                };
                
                /**
                 * Reload openes page
                 * 
                 * @public
                 * 
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                BROWSER.prototype.reload = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                    
                    if (state.atouch.progress === 'reload')  {
                        state.atouch.progress = 'ready';
                    } else {
                        state.atouch.progress = 'reload';
                        Storage.saveState();
                        document.location.reload(true);
                    }
                };
                
                /**
                 * Return to previous visited page
                 * 
                 * @public
                 * 
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                BROWSER.prototype.back = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                    
                    if (state.atouch.progress === 'goback')  {
                        state.atouch.progress = 'ready';
                    } else {
                        state.atouch.progress = 'goback';
                        Storage.saveState();
                        window.history.back();
                    }
                };
                
                /**
                 * Return to next visited page
                 * 
                 * @public
                 * 
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                BROWSER.prototype.forward = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                    
                    if (state.atouch.progress === 'goback')  {
                        state.atouch.progress = 'ready';
                    } else {
                        state.atouch.progress = 'goback';
                        Storage.saveState();
                        window.history.forward();
                    }
                };
                
                /**
                 * Checking HTML element or HTML Collection content for equality or similarity <br />
                 * to given string
                 * 
                 * @public
                 * 
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                BROWSER.prototype.check = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                    
                    let element = getHtmlTarget(data),
                        check_function = null,
                        check_string = null,
                        check_element = '';
                
                    if (data.hasOwnProperty('has')) {
                        check_function = checkElementContentSimilar;
                        check_string = data.has;
                        check_element = 'Element';
                    } else if (data.hasOwnProperty('equal')) {
                        check_function = checkElementContentEqual;
                        check_string = data.equal;
                        check_element = 'Element';
                    } else if (data.hasOwnProperty('anyhas')) {
                        check_function = checkAnyCollectionContentSimilar;
                        check_string = data.anyhas;
                        check_element = 'Collection';
                    } else if (data.hasOwnProperty('allhas')) {
                        check_function = checkAllCollectionContentSimilar;
                        check_string = data.allhas;
                        check_element = 'Collection';
                    } else if (data.hasOwnProperty('anyequal')) {
                        check_function = checkAnyCollectionContentEqual;
                        check_string = data.anyequal;
                        check_element = 'Collection';
                    } else if (data.hasOwnProperty('allequal')) {
                        check_function = checkAllCollectionContentEqual;
                        check_string = data.allequal;
                        check_element = 'Collection';
                    } else {
                        state.atouch.progress = 'error';
                        state.atouch.error = 4102;
                    }
                
                    if (check_function && check_string && element) {
                        if (typeof check_string !== 'string' && typeof check_string !== 'number') {
                            state.atouch.progress = 'error';
                            state.atouch.error = 4103;
                        } else if (element instanceof HTMLCollection && check_element === 'Element') {
                            state.atouch.progress = 'error';
                            state.atouch.error = 4104;
                        } else if (check_function(element, check_string)) {
                            state.atouch.progress = 'ready';
                        } else {
                            state.atouch.progress = 'error';
                            state.atouch.error = 4000;
                        }
                    }
                };
                
                /**
                 * Checking JS variables content or type for equality or similarity <br />
                 * to given string <br />
                 * If given directive "convert" and it is true, atouch compare variables <br />
                 * independently from type
                 * 
                 * @public
                 * 
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                BROWSER.prototype.jscheck = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                    
                    let check_target = getJsTarget(data),
                        check_function = null,
                        check_string = null;
                
                    if (!data.hasOwnProperty('vars')) {
                        state.atouch.progress = 'error';
                        state.atouch.error = 4200;
                        return;
                    }
                
                    if (data.hasOwnProperty('has')) {
                        check_function = data.convert 
                            ? checkVariableContentSimilar 
                            : checkVariableContentEqual;
                        check_string = data.has;
                    } else if (data.hasOwnProperty('equal')) {
                        check_function = data.convert 
                            ? checkVariableSimilar
                            : checkVariableEqual;
                        check_string = data.equal;
                    } else if (data.hasOwnProperty('type')) {
                        check_function = checkVariableType;
                        check_string = data.type;
                    } else {
                        state.atouch.progress = 'error';
                        state.atouch.error = 4204;
                    }
                
                    if (check_function && typeof check_string !== 'undefined'
                            && typeof check_target !== 'undefined') {
                        if (check_function(check_target, check_string)) {
                            state.atouch.progress = 'ready';
                        } else {
                            state.atouch.progress = 'error';
                            state.atouch.error = 4000;
                        }
                    }
                };
                
                /**
                 * Checks CSS properties
                 * 
                 * @public
                 * 
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                BROWSER.prototype.csscheck = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                    
                    let element = getHtmlTarget(data);
                
                    if (element) {
                        if (data.style && data.style instanceof Object) {
                            if (!(element instanceof HTMLElement)) {
                                state.atouch.progress = 'error';
                                state.atouch.error = 4001;
                            } else if (checkStyleMatches(element, data.style)) {
                                state.atouch.progress = 'ready';
                            } else {
                                state.atouch.progress = 'error';
                                state.atouch.error = 4000;
                            }
                        } else {
                            state.atouch.progress = 'error';
                            state.atouch.error = 4300;
                        }
                    } else {
                        state.atouch.progress = 'error';
                        state.atouch.error = 4002;
                    }
                };
                
                /**
                 * Checks cookies content
                 * 
                 * @public
                 * 
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                BROWSER.prototype.cookcheck = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                    
                    let cookie = getCookieContent(data.cook),
                        check_function = null,
                        check_string = null;
                
                    if (data.hasOwnProperty('has')) {
                        check_function = checkVariableContent;
                        check_string = data.has;
                    } else if (data.hasOwnProperty('equal')) {
                        check_function = checkVariableContentEqual;
                        check_string = data.equal;
                    } else {
                        state.atouch.progress = 'error';
                        state.atouch.error = 4401;
                        return;
                    }
                
                    if (cookie) {
                        if (check_function && typeof check_string !== 'undefined') {
                            if (check_function(cookie, check_string)) {
                                state.atouch.progress = 'ready';
                            } else {
                                state.atouch.progress = 'error';
                                state.atouch.error = 4000;
                            }
                        }
                    } else {
                        state.atouch.progress = 'error';
                        state.atouch.error = 4400;
                    }
                };
                
                /**
                 * Delete certain cookie
                 * 
                 * @public
                 *
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                BROWSER.prototype.cookdel = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                    
                    if (typeof data !== 'string') {
                        state.atouch.progress = 'error';
                        state.atouch.error = 4403;
                        return;
                    }
                
                    if (getCookieContent(data)) {
                        clearCookieContent(data);
                        state.atouch.progress = 'ready';
                    } else {
                        state.atouch.progress = 'error';
                        state.atouch.error = 4402;
                    }
                };
                
                /**
                 * @constructor
                 * 
                 * @returns {BROWSER}        BROWSER object
                 */
                function BROWSER () {
                    return this;
                }
            
                return BROWSER;
            })();
        
            /**
             * @class MOUSE
             * @description Atouch class for imitation mouse events and actions
             * @version 0.0.3
             */
            let MOUSE = (function () {
                let mouse = {
                        page_scroll_x:  null,       // Скролл страницы по горизонтали
                        page_scroll_y:  null,       // Скролл страницы по вертикали
                        current_x:      null,       // Текущее положение мыши по горизонтали
                        current_y:      null,       // Текущее положение мыши по вертикали
                        cursor:         null,       // Ссылка на элемент курсора
                        current_object: null,       // Элемент, над которым сейчас мышь
                        name:           null,       // Название текущего курсора в CSS
            
                    },                              // global virtual cursor object
                    constructor = {},             // vcursor construct object
                    cursor_speed = 30,          // cursor moving iteration frequency
                    scroll_speed = 20,          // scrolling iteration frequency
                    maxHeightWithScroll,        // page height with scrolling
                    maxWidthWithScroll,         // page width with scrolling
                    maxHeightVisible,           // height of page visible path
                    maxWidthVisible,            // width of page visible path
                    // buffer = null,              // temporary datas
                    // message,                    // temporary error message collection
                    // listeners = [],             // listeners collection
                    _;
            
                constructor.cursor = {
                    img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAWCAYAAABKbiVHAAAABmJLR0QA/wD/AP+gvae'
                        + 'TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7UlEQVRIS8WV2w6EMAgFzzH+/y+zDxaltRcoJjtJs2uldApRiT5SflnNjhHEY'
                        + 'hXa614CEbnukwT6MS1ReaU6xGFupCgHsKcO85kMkBf6VAbICXlkpAw3u0JLGRGxyd1iO0JLGUtHbEpUKCRj8W7kjQMumVD'
                        + '5Ld6NvHEncAeDZLVA59v/XspL0yKYvBirNnk3nMV1BNiMIQcAdhJsoZ8Pzedtj6KVSQsFvmNDXk/TrAULrMhWdaxMpjqRh'
                        + 'WIG7XWbRCKVcbTmzueIfbUpU500ZzvxMeTz7lqechSwbJen7FHaNv2V0cnmZXkYrd/iBwCdd/+0Aey2AAAAAElFTkSuQmCC',
                    default: {x0: 17, y0: 0, x1: 28, y1: 19, xc: 17, yc: 0},
                    pointer: {x0: 0, y0: 0, x1: 17, y1: 22, xc: 5, yc: 0},
                    text: {x0: 28, y0: 0, x1: 35, y1: 16, xc: 31, yc: 8}
                };
            
                /**
                 * Checks that X coordinate don't go beyond page
                 *
                 * @private
                 * 
                 * @param {number} x        Abscissa of point
                 * @returns {number}        New X coordinate
                 */
                function controlPageLimitsOnX (x) {
                    if (typeof x !== 'number' || x <= 0) {
                        x = 0;
                    }
                
                    if (x > maxWidthWithScroll) {
                        // -1 to see part of the cursor, if it is gone from the page
                        x = maxWidthWithScroll - 1;
                    }
                
                    return x;
                }
                
                /**
                 * Checks that Y coordinate don't go beyond page
                 *
                 * @private
                 * 
                 * @param {number} y        Ordinate of point
                 * @returns {number}        New Y coordinate
                 */
                function controlPageLimitsOnY (y) {
                    if (typeof y !== 'number' || y <= 0) {
                        y = 0;
                    }
                
                    if (y > maxHeightWithScroll) {
                        // -1 to see part of the cursor, if it is gone from the page
                        y = maxHeightWithScroll - 1;
                    }
                
                    return y;
                }
                
                /**
                 * Checks that scrolling on X don't go beyond limits
                 * 
                 * @private
                 * 
                 * @param {number} x        Target scroll on X
                 * @returns {number}        New corrected target scroll
                 */
                function controlScrollLimitsOnX (x) {
                    if (typeof x !== 'number' || x <= 0) {
                        x = 0;
                    }
                
                    if (x > maxWidthWithScroll - maxWidthVisible) {
                        x = maxWidthWithScroll - maxWidthVisible;
                    }
                
                    return x;
                }
                
                /**
                 * Checks that scrolling on Y don't go beyond limits
                 * 
                 * @private
                 * 
                 * @param {number} y        Target scroll on Y
                 * @returns {number}        New corrected target scroll
                 */
                function controlScrollLimitsOnY (y) {
                    if (typeof y !== 'number' || y <= 0) {
                        y = 0;
                    }
                
                    if (y > maxHeightWithScroll - maxHeightVisible) {
                        y = maxHeightWithScroll - maxHeightVisible;
                    }
                
                    return y;
                }
                
                /**
                 * Check the scrolling need for getting element on page visible path
                 * 
                 * @private
                 * 
                 * @param {number} x        Target X coordinate of point
                 * @returns {boolean}       Result of checking that scrolling is need
                 */
                function checkScrollByXIsNeed (x) {
                    if (typeof x !== 'number') {
                        x = 0;
                    }
                
                    if (x >= mouse.page_scroll_x + maxWidthVisible || x < mouse.page_scroll_x) {
                        return true;
                    }
                    
                    return false;
                }
                
                /**
                 * Check the scrolling need for getting element on page visible path
                 *
                 * @param {number} y        Target Y coordinate of point
                 * @return {boolean}        Result of checking that scrolling is need
                 *
                 * @private
                 */
                function checkScrollByYIsNeed (y) {
                    if (typeof y !== 'number') {
                        y = 0;
                    }
                
                    if (y >= mouse.page_scroll_y + maxHeightVisible || y < mouse.page_scroll_y) {
                        return true;
                    }
                    
                    return false;
                }
                
                /**
                 * Returns the type of cursor depending on the object
                 * 
                 * @private
                 * 
                 * @param {HTMLElement} object      Target element for moving
                 * @returns {string}                Cursor style for target element
                 */
                function getCursorStyle (object) {
                    let tag = object.tagName,
                        style = object.style.cursor,
                        classes = getComputedStyle(object).cursor,
                        name = 'default';
                
                    if (typeof object !== 'object') {
                        return;
                    }
                
                    name = classes;
                    
                    if (name === 'auto') {
                        name = 'default';
                    }
                
                    return name;
                }
            
                /**
                 * Async animation function
                 *
                 * @private
                 *
                 * @param {Function} animation      Asynchronous function is executed each iteration
                 * @param {number} duration         Iterations number
                 * @param {Function} callback       Function is executed after last iterationtion
                 * @returns {none}                  No return
                 */
                function _animate (animation, duration, callback) {
                    requestAnimationFrame(function _animate (time) {
                        animation();
                        duration--;
                        if (duration > 0) {
                            requestAnimationFrame(_animate);
                        } else {
                            callback();
                        }
                    });
                }
            
                /**
                 * Finds the element on given coordinates
                 *
                 * @private
                 * 
                 * @param {integer} x       Given X coordinate
                 * @param {integer} y       Given Y coordinate 
                 * @return {HTMLElement}    Element on specified point coordinate
                 */
                function getElementByCoordinates (x, y) {
                    let x_on_visible,
                        y_on_visible,
                        x_scroll_target,
                        y_scroll_target,
                        return_object;
                
                    x = controlPageLimitsOnX(x);
                    y = controlPageLimitsOnY(y);
                
                    if (checkScrollByXIsNeed(x)) {
                        x_scroll_target = centerVisibleOnX(x);
                    } else {
                        x_scroll_target = mouse.page_scroll_x;
                    }
                
                    if (checkScrollByYIsNeed(y)) {
                        y_scroll_target = centerVisibleOnY(y);
                    } else {
                        y_scroll_target = mouse.page_scroll_y;
                    }
                    
                    scrollPageToCurrent(x_scroll_target, y_scroll_target);
                
                    x_on_visible = Math.floor(mouse.current_x - mouse.page_scroll_x);
                    y_on_visible = Math.floor(mouse.current_y - mouse.page_scroll_y);
                
                    return_object = document.elementFromPoint(x_on_visible, y_on_visible);
                    
                    /* if (!mouse.current_object || return_object === mouse.current_object) {
                        mouse.cursor.style.display = 'none';
                        return_object = document.elementFromPoint(x_on_visible, y_on_visible);
                        mouse.cursor.style.display = 'block';
                    } */
                
                    return return_object;
                }
                
                /**
                 * Returns the new value of the scroll to center on the necessary coordinates
                 *
                 * @private
                 * 
                 * @param {number} x        Point X coordinate
                 * @returns {number}        New scroll number
                 */
                function centerVisibleOnX (x) {
                    let scroll;
                
                    if (typeof x !== 'number') {
                        x = 0;
                    }
                
                    if (x <= maxWidthVisible / 2) {
                        scroll = 0;
                    } else if (x > (maxWidthWithScroll - maxWidthVisible)) {
                        scroll = maxWidthWithScroll - maxWidthVisible;
                    } else {
                        scroll = x - maxWidthVisible / 2;
                    }
                
                    return scroll;
                }
                
                /**
                 * Returns the new value of the scroll to center on the necessary coordinates
                 *
                 * @private
                 * 
                 * @param {number} y        Point Y coordinate
                 * @return {number}         New scroll number
                 */
                function centerVisibleOnY (y) {
                    let scroll;
                
                    if (typeof y !== 'number') {
                        y = 0;
                    }
                
                    if (y <= maxHeightVisible / 2) {
                        scroll = 0;
                    } else if (y > (maxHeightWithScroll + maxHeightVisible / 2)) {
                        scroll = maxHeightWithScroll - maxHeightVisible;
                    } else {
                        scroll = y - maxHeightVisible / 2;
                    }
                
                    return scroll;
                }
                
                /**
                 * Calculate and set the coordinates with shift of vcursor center
                 *
                 * @private
                 * 
                 * @returns {none}          No return
                 */
                function setRealCenter () {
                    let name = getCursorStyle(mouse.current_object);
                
                    mouse.current_x = Math.floor(mouse.current_x - (constructor.cursor[name].xc - constructor.cursor[name].x0)),
                    mouse.current_y = Math.floor(mouse.current_y - (constructor.cursor[name].yc - constructor.cursor[name].y0));
                
                    name = null;
                }
            
                /**
                 * Create virtual cursor in browser
                 *
                 * @private
                 *
                 * @returns {none}                  No return
                 */
                function createVirtualCursor () {
                    let cursor = document.createElement('div'),
                        scroll = getPageScroll();
                
                    // Initializing virtual cursor
                    mouse.page_scroll_x = scroll.x;
                    mouse.page_scroll_y = scroll.y;
                    mouse.current_x = maxWidthVisible / 2;
                    mouse.current_y = maxHeightVisible / 2;
                    mouse.current_object = getElementByCoordinates(mouse.current_x, mouse.current_y);
                
                    setRealCenter();
                
                    cursor.style.position = 'absolute';
                    cursor.style.backgroundImage = 'url(' + constructor.cursor.img + ')';
                    cursor.style.backgroundRepeat = 'no-repeat';
                    cursor.style.zIndex = '100';
                    cursor.dataset.owner = 'atouch';
                    cursor.id = 'atouch_virtual_cursor';
                
                    document.body.appendChild(cursor);
                
                    mouse.cursor = cursor;
                    changeVirtualCursor(mouse.current_object);
                
                    cursor = null;
                }
                
                /**
                 * Change virtual cursor depending on the object
                 *
                 * @private
                 *
                 * @param {HTMLElement} object      Element under cursor
                 * @returns {none}                  No return
                 */
                function changeVirtualCursor (object) {
                    let height, width, top, left;
                
                    if (typeof object !== 'object') {
                        // _createDump();
                        return;
                    }
                
                    mouse.name = getCursorStyle(object);
                
                    width = constructor.cursor[mouse.name].x1 - constructor.cursor[mouse.name].x0;
                    height = constructor.cursor[mouse.name].y1 - constructor.cursor[mouse.name].y0;
                    left = Math.floor(mouse.current_x - (constructor.cursor[mouse.name].xc
                            - constructor.cursor[mouse.name].x0));
                    top = Math.floor(mouse.current_y - (constructor.cursor[mouse.name].yc
                            - constructor.cursor[mouse.name].y0));
                
                    mouse.cursor.style.left = left + 'px';
                    mouse.cursor.style.top = top + 'px';
                    mouse.cursor.style.height = height + 'px';
                    mouse.cursor.style.width = width + 'px';
                    mouse.cursor.style.backgroundPosition = -constructor.cursor[mouse.name].x0 + 'px '
                            + -constructor.cursor[mouse.name].y0 + 'px';
                }
                
                /**
                 * Generate and activate mouse event
                 *
                 * @private
                 *
                 * @param {HTMLElement} object      Object for mouse event generating
                 * @param {string} event            Type of mouse event
                 * @returns {none}                  No return
                 */
                function emulateMouseEvents (object, event) {
                    let events_arr = ['click' , 'mouseover', 'mouseout', 'mouseup', 'mousedown'
                            , 'focus', 'mousemove', 'dblclick', 'mouseenter', 'mouseleave'
                            , 'focusin', 'focusout'],
                        evt;
                
                    // !!!TODO need to add polyfill for MouseEvent
                
                    if (events_arr.indexOf(event) !== -1) {
                        evt = new MouseEvent (event, {
                            'view': window,
                            'bubbles': true,
                            'cancelable': true,
                            'button': 0,
                            'clientX': _mouse.current_x,
                            'clientY': _mouse.current_y,
                            'composed': -1,
                            'isTrusted': -1,
                            'layerX': -1,
                            'layerY': -1,
                            'movementX': -1,
                            'movementY': -1,
                            'mozInputSource': -1,
                            'offsetX': -1,
                            'offsetY': -1,
                            'screenX': -1,
                            'screenY': -1,
                            'which': 1
                        });
                
                        if (typeof object.dispatchEvent === 'function') {
                            object.dispatchEvent(evt);
                
                            if (event === 'focus' && typeof object.focus === 'function') {
                                object.focus();
                            }
                        }
                    }
                }
            
                // = mouse.move.js
            
                /**
                 * Instantly scrolls the page to coordinates
                 *
                 * @private
                 *
                 * @param {number} x        Abscissa scroll target value
                 * @param {number} y        Ordinate scroll target value
                 * @returns {none}          No return
                 */
                function scrollPageToCurrent (x, y) {
                    mouse.page_scroll_x = x;
                    mouse.page_scroll_y = y;
                
                    window.scrollTo(mouse.page_scroll_x, mouse.page_scroll_y);
                }
                
                /**
                 * Animate scrolls the page to coordinates
                 *
                 * @private
                 *
                 * @param {number} x        Abscissa scroll target value
                 * @param {number} y        Ordinate scroll target value
                 * @returns {none}          No return
                 */
                function scrollPageToPositionAsync (x, y) {
                    let start_x = mouse.page_scroll_x,
                        start_y = mouse.page_scroll_y,
                        iter_x,
                        iter_y;
                
                    x = (typeof x !== 'number') ? 0 : x;
                    y = (typeof y !== 'number') ? 0 : y;
                
                    x = controlScrollLimitsOnX(x);
                    y = controlScrollLimitsOnY(y);
                
                    iter_x = (x - mouse.page_scroll_x) / scroll_speed;
                    iter_y = (y - mouse.page_scroll_y) / scroll_speed;
                
                    _animate(
                        function () {
                            mouse.page_scroll_x = Math.ceil(mouse.page_scroll_x + iter_x);
                            mouse.page_scroll_y = Math.ceil(mouse.page_scroll_y + iter_y);
                            window.scrollTo(mouse.page_scroll_x, mouse.page_scroll_y);
                            mouse.state = 'scroll';
                        }.bind(mouse)
                        , scroll_speed
                        , function () {
                            mouse.page_scroll_x = start_x + iter_x * scroll_speed;
                            mouse.page_scroll_y = start_y + iter_y * scroll_speed;
                            window.scrollTo(mouse.page_scroll_x, mouse.page_scroll_y);
                            mouse.state = 'stop';
                            state.atouch.progress = 'ready';
                        }.bind(mouse)
                    );
                }
                
                
                /**
                 * Animate scrolls the page relative to the current coordinates
                 *
                 * @private
                 *
                 * @param {number} x        Abscissa scroll target value
                 * @param {number} y        Ordinate scroll target value
                 * @returns {none}          No return
                 */
                function scrollPageInCountAsync (x, y) {
                    let iter_x,
                        iter_y,
                        start_x,
                        start_y;
                
                    if (typeof x !== 'number') {
                        x = 0;
                    }
                
                    if (typeof y !== 'number') {
                        y = 0;
                    }
                
                    start_x = mouse.scroll_x;
                    start_y = mouse.scroll_y;
                
                    x = controlScrollLimitsOnX(mouse.scroll_x + x) - mouse.scroll_x;
                    y = controlScrollLimitsOnY(mouse.scroll_y + y) - mouse.scroll_y;
                
                    iter_x = x / scroll_speed;
                    iter_y = y / scroll_speed;
                
                    _animate(function () {
                        mouse.scroll_x = Math.ceil(mouse.scroll_x + iter_x);
                        mouse.scroll_y = Math.ceil(mouse.scroll_y + iter_y);
                        window.scrollTo(mouse.scroll_x, mouse.scroll_y);
                
                        mouse.state = 'scroll';
                    }.bind(mouse), scroll_speed, function () {
                        mouse.scroll_x = start_x + iter_x * scroll_speed;
                        mouse.scroll_y = start_y + iter_y * scroll_speed;
                        window.scrollTo(mouse.scroll_x, mouse.scroll_y);
                
                        mouse.state = 'stop';
                    }.bind(mouse));
                }
            
                // = mouse.button.js
            
                /**
                 * Click to element
                 *
                 * @public
                 *
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                MOUSE.prototype.click = function (data, success, error) {
                    let target_object = getElementObject(data);
                
                    if (target_object) {
                        changeMousePosition(data);
                    }
                
                    waitPhaseFinish('moved', success, function () {
                        // mouseClick(target_object);
                    });
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                };
                
                
                
                /**
                 * Move cursor over element or on coordinates
                 *
                 * @public
                 *
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                MOUSE.prototype.move = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                
                    if (data.hasOwnProperty('id') || data.hasOwnProperty('tag')
                        || data.hasOwnProperty('class') || data.hasOwnProperty('name')) {
                        // _changeMousePosition(data);
                    } else if (data.hasOwnProperty('x') && data.hasOwnProperty('y')) {
                        // _moveToCoordinates(data.x, data.y);
                    }
                };
                
                
                /**
                 * Page scrolling by scrollBy
                 *
                 * @public
                 *
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                MOUSE.prototype.scrollby = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                
                    scrollPageInCountAsync(data.x, data.y);
                };
                
                
                /**
                 * Page scrolling by scrollTo
                 *
                 * @public
                 *
                 * @param {string} data             Command parameters
                 * @param {Function} success        Success callback
                 * @param {Function} error          Error callback
                 * @returns {none}                  No return
                 */
                MOUSE.prototype.scrollto = function (data, success, error) {
                    waitPhaseFinish('ready', success, true);
                    waitPhaseFinish('error', error, true);
                
                    scrollPageToPositionAsync(data.x, data.y);
                };
            
                /**
                 * @constructor
                 *
                 * @returns {MOUSE}        MOUSE object
                 */
                function MOUSE () {
                    maxHeightWithScroll = Math.max(
                        document.body.scrollHeight, document.documentElement.scrollHeight,
                        document.body.offsetHeight, document.documentElement.offsetHeight,
                        document.body.clientHeight, document.documentElement.clientHeight
                    );
                    maxWidthWithScroll = Math.max(
                        document.body.scrollWidth, document.documentElement.scrollWidth,
                        document.body.offsetWidth, document.documentElement.offsetWidth,
                        document.body.clientWidth, document.documentElement.clientWidth
                    );
                    maxHeightVisible = document.documentElement.clientHeight;
                    maxWidthVisible = document.documentElement.clientWidth;
            
                    createVirtualCursor();
            
                    return this;
                }
            
                return MOUSE;
            })();
        
            /**
             * @class KEYBOARD
             * @description Atouch class for imitation keyboard events and actions
             * @version 0.0.3
             */
            let KEYBOARD = (function () {
                /**
                 * @constructor
                 * 
                 * @returns {KEYBOARD}        KEYBOARD object
                 */
                function KEYBOARD () {
                    return this;
                }
            
                return KEYBOARD;
            })();
        
            /**
             * Generates tasks list of test from given Array
             *
             * @private
             *
             * @param {Array} tasks             List of tasks
             * @returns {boolean}               Test building result
             */
            function buildTasksList (tasks) {
                let controllers = {
                    Browser : ['go', 'reload', 'check', 'csscheck', 'jscheck', 'cookcheck', 'cookdel', 'back', 'forward'],
                    Mouse   : ['click', 'dbclick', 'down', 'up', 'move', 'scrollby', 'scrollto', 'attach'], // ! Пока добавлены только задачи мыши с высоким приоритетом
                    Keyboard: ['print', 'fill', 'clear', 'stream']
                };
        
                tasks.forEach(function (item, i, arr) {
                    let select_controller = null;
                    for (let contr in controllers) {
                        if (~controllers[contr].indexOf(item.action)) {
                            select_controller = contr;
                            break;
                        }
                    }
        
                    if (!select_controller) {
                        // ! Необходимо журналировать и дебажить
                        return false;
                    }
        
                    task_list.push({
                        controller  : select_controller,
                        action      : item.action,
                        params      : item.params
                    });
                });
        
                return true;
            }
        
            /**
             * Runs prepared tasks list
             *
             * @private
             *
             * @returns {none}              No return
             */
            function execActiveTest () {
                if (state.atouch.run === null) {
                    state.atouch.run = 0;
                }
        
                if (!task_list[state.atouch.run]) {
                    return;
                }
        
                runTask();
        
                timer = setTimeout(function tick () {
                    if (state.atouch.status === 'done') {
                        if (state.atouch.result === 'success') {
                            // _addSuccessTest();
                        } else {
                            // _addErrorTest();
                        }
        
                        if (task_list[state.atouch.run + 1]) {
                            state.atouch.run += 1;
                            state.atouch.status = 'wait';
                            state.atouch.progress = null;
                            state.atouch.result = null;
        
                            runTask();
                        } else {
                            clearInterval(timer);
        
                            console.log(compareVariables(state.atouch.log, test_list[state.atouch.execute].result));
        
                            state.atouch.status = null;
                            state.atouch.result = null;
                            state.atouch.execute = null;
                            state.atouch.run = null;
                            state.atouch.proress = null;
                            state.atouch.log = [];
        
                            return;
                        }
                    }
        
                    timer = setTimeout(tick, 10);
                });
            }
        
            /**
             * Runs one task of test
             *
             * @private
             *
             * @returns {none}              No return
             */
            function runTask () {
                let task = task_list[state.atouch.run],
                    ctrl = control[task.controller],
                    handler = task.action;
        
                if (!task || !ctrl || !handler) {
                    return;
                }
        
                ctrl[handler](task.params
                    , function () {
                        state.atouch.status = 'done';
                        state.atouch.result = 'success';
                        state.atouch.log.push(0);
                    }
                    , function () {
                        state.atouch.status = 'done';
                        state.atouch.result = 'error';
                        state.atouch.log.push(state.atouch.error);
                        state.atouch.error = 0;
                    });
            }
        
            /**
             * Preparing and running selected test
             *
             * @public
             *
             * @param {string} test_id          Selected test id
             * @returns {boolean}               True if success
             */
            RUNNER.prototype.runTest = function (test_id) {
                if (!test_list[test_id]) {
                    return false;
                }
        
                state.atouch.execute = test_id;
        
                if (buildTasksList(test_list[test_id].tasks)) {
                    execActiveTest();
                }
        
                return true;
            };
        
            /**
             * @constructor
             *
             * @returns {RUNNER}             RUNNER object
             */
            function RUNNER () {
                Storage = new STORAGE;
                Log = new LOG;
                control.Browser = new BROWSER;
                control.Mouse = new MOUSE;
                control.Keyboard = new KEYBOARD;
        
                if (Storage) {
                    Storage.loadState();
                }
                return this;
            }
        
            return RUNNER;
        })();

        /**
         * @class IFACE
         * @description Atouch interface generation class
         * @version 0.1.3
         */
        
        let IFACE = (function () {
            let dom = {},
                action = {},
                lang = null,
                Facade = null,
                panel_vars = {
                    main_color  : '#066',
                    dark_color  : '#333',
                    light_color : '#FFF',
                    owner       : 'atouch'
                },
                group_css = {
                    list_but : {
                        border: '0px',
                        width: '26px',
                        height: '26px',
                        background: panel_vars.dark_color,
                        color: panel_vars.light_color,
                        borderRadius:  '0px',
                        padding: '0px',
                        margin: '2px 2px 0px',
                        font: '20px/26px Arial',
                        cursor: 'pointer',
                        textAlign: 'center'
                    },
                    result_ico : {
                        display: 'inline',
                        height: '13px',
                        background: panel_vars.dark_color,
                        color: '#888',
                        borderRadius: '0px',
                        padding: '0px',
                        margin: '4px 5px',
                        font: '13px/13px Arial',
                        float: 'left',
                        cursor: 'default'
                    },
                    state_ico : {
                        width: '13px',
                        height: '13px',
                        background: panel_vars.dark_color,
                        color: '#888',
                        borderRadius: '0px',
                        padding: '0px',
                        margin: '4px 5px',
                        font: '13px/13px Arial',
                        float: 'right',
                        cursor: 'default'
                    },
                    select : {
                        width: '98%',
                        height: '23px',
                        padding: '0px',
                        margin: '2px 0px',
                        background: '#FFF'
                    },
                    range : {
                        width: '98%',
                        height: '23px',
                        padding: '0px',
                        margin: '2px 0px',
                        border: 'none',
                        background: 'none'
                    },
                    button: {
                        width: '70%',
                        height: '27px',
                        borderRadius: '0px',
                        font: '15px/18px Arial',
                        cursor: 'pointer',
                        position: 'absolute',
                        bottom: '2px',
                        left: '15%'
                    },
                    input: {
                        width: '98%',
                        height: '23px',
                        border: '1px solid #066',
                        margin: '2px 0px',
                        background: '#FFF',
                        padding: '0px 4px',
                        boxSizing: 'border-box'
                    },
                    link: {
                        padding: '0px',
                        margin: '6px',
                        color: '#066',
                        textDecoration: 'none',
                        borderBottom: '1px solid #066'
                    }
                },
                iface_frame = [{
                    id    : 'atouch_iface-panel',
                    tag   : 'div',
                    style : {
                        width: '300px',
                        position: 'fixed',
                        background: panel_vars.dark_color,
                        bottom: '5px',
                        right: '0px',
                        font: '15px/18px Arial',
                        zIndex: '50',
                        borderRadius: '10px 0px 0px 10px',
                        // opacity: '.5',
                        transition: 'opacity 0.3s ease-out 0s, right 0.3s ease-out 0s'
                    },
                    child : [{
                        id    : 'atouch_iface-panel-head',
                        tag   : 'div',
                        style : {
                            height: '31px',
                            background: panel_vars.main_color,
                            color: panel_vars.light_color,
                            textAlign: 'center',
                            lineHeight: '30px',
                            borderRadius: '10px 0px 0px'
                        },
                        child : []
                    }, {
                        id    : 'atouch_iface-panel-collapse',
                        tag   : 'div',
                        inner : '&#9654;',
                        var   : 'lang.iface_button_hide_panel',
                        target: 'title',
                        action: 'click',
                        task  : 'changePanelVisible',
                        style : {
                            width: '23px',
                            height: '27px',
                            position: 'absolute',
                            color: '#FFF',
                            top: '2px',
                            right: '2px',
                            lineHeight: '27px',
                            background: '#0cb1b3',
                            textAlign: 'center',
                            paddingLeft: '4px',
                            cursor: 'pointer',
                            userSelect: 'none'
                        },
                        child : []
                    }, {
                        id    : 'atouch_iface-panel-control',
                        tag   : 'div',
                        style : {
                            height: '180px',
                            width: '31px',
                            background: panel_vars.dark_color,
                            float: 'left',
                            border: 'none',
                            boxSizing: 'border-box',
                            paddingTop: '5px'
                        },
                        child : [{
                            id    : 'atouch_iface-head-button-list',
                            tag   : 'div',
                            var   : 'lang.iface_tab_test_title',
                            target: 'title',
                            style : group_css.list_but,
                            inner : '&#9776;',
                            action: 'click',
                            task  : 'tabList',
                            child : []
                        }, {
                            id    : 'atouch_iface-head-button-auth',
                            tag   : 'div',
                            var   : 'lang.iface_tab_auth_title',
                            target: 'title',
                            style : group_css.list_but,
                            inner : '&#9735;',
                            action: 'click',
                            task  : 'tabAuth',
                            child : []
                        }, {
                            id    : 'atouch_iface-head-button-options',
                            tag   : 'div',
                            var   : 'lang.iface_tab_option_title',
                            target: 'title',
                            style : group_css.list_but,
                            inner : '&#9881;',
                            action: 'click',
                            task  : 'tabOptions',
                            child : []
                        }, {
                            id    : 'atouch_iface-head-button-report',
                            tag   : 'div',
                            var   : 'lang.iface_tab_report_title',
                            target: 'title',
                            style : group_css.list_but,
                            inner : '&#9027;',
                            action: 'click',
                            task  : 'tabReport',
                            child : []
                        }]
                    }, {
                        id    : 'atouch_iface-panel-content',
                        tag   : 'div',
                        style : {
                            height: '180px',
                            width: '269px',
                            background: panel_vars.light_color,
                            color: panel_vars.dark_color,
                            textAlign: 'center',
                            float: 'left',
                            borderRadius: '0px 0px 0px 10px',
                            position: 'relative'
                        },
                        child : [{
                            id    : 'atouch_iface-panel-content-title',
                            tag   : 'h5',
                            var   : 'lang.iface_tab_test_title',
                            target: 'innerHTML',
                            style : {
                                height: '15px',
                                width: '100%',
                                fontSize: '13px',
                                lineHeight: '15px',
                                color: panel_vars.main_color,
                                margin: '5px 0px',
                                textTransform: 'uppercase'
                            },
                            child : []
                        }, {
                            id    : 'atouch_iface-panel-content-test-select',
                            tag   : 'select',
                            var   : 'lang.iface_tab_test_select_test',
                            target: 'title',
                            clas  : 'panel_elem list_elem',
                            style : group_css.select,
                            child : []
                        }, {
                            id    : 'atouch_iface-panel-content-test-start',
                            tag   : 'input',
                            type  : 'button',
                            var   : 'lang.iface_tab_test_button_start',
                            target: 'value',
                            clas  : 'panel_elem list_elem',
                            style : group_css.button,
                            appstl: {
                                background: panel_vars.main_color,
                                color: panel_vars.light_color
                            },
                            child : []
                        }, {
                            id    : 'atouch_iface-panel-content-lang-select',
                            tag   : 'select',
                            var   : 'lang.iface_tab_option_select_lang',
                            target: 'title',
                            clas  : 'panel_elem option_elem',
                            style : group_css.select,
                            appstl: {
                                display: 'none'
                            },
                            child : []
                        }, {
                            id    : 'atouch_iface-panel-content-opacity-label',
                            tag   : 'span',
                            var   : 'lang.iface_range_opacity_level',
                            target: 'innerHTML',
                            clas  : 'panel_elem option_elem',
                            style: {
                                textAlign: 'left',
                                width: '100%',
                                margin: '5px 5px 2px',
                                display: 'none'
                            },
                            child : []
                        }, {
                            id    : 'atouch_iface-panel-content-opacity-select',
                            tag   : 'input',
                            type  : 'range',
                            clas  : 'panel_elem option_elem',
                            style : group_css.range,
                            appstl: {
                                display: 'none'
                            },
                            child : []
                        }, {
                            id    : 'atouch_iface-panel-content-options-change',
                            tag   : 'input',
                            type  : 'button',
                            var   : 'lang.iface_tab_option_change_lang',
                            target: 'value',
                            clas  : 'panel_elem option_elem',
                            style : group_css.button,
                            appstl: {
                                display: 'none'
                            },
                            child : []
                        }]
                    }, {
                        id    : 'atouch_iface-panel-state',
                        tag   : 'div',
                        style : {
                            height: '20px',
                            width: '295px',
                            background: panel_vars.dark_color,
                            color: panel_vars.light_color,
                            float: 'left',
                            borderRadius: '0px 0px 0px 10px',
                            paddingLeft: '5px'
                        },
                        child : [{
                            id    : 'atouch_iface-state-error',
                            tag   : 'div',
                            style : group_css.result_ico,
                            appstl: {
                                marginLeft: '7px'
                            },
                            child : [{
                                id    : 'atouch_iface-state-error-icon',
                                tag   : 'span',
                                inner : '&#9888;',
                                style : {
                                    color: '#888',
                                    font: '13px/13px Arial',
                                    cursor: 'default'
                                },
                                child : []
                            }, {
                                id    : 'atouch_iface-state-error-flag',
                                tag   : 'span',
                                style : {
                                    background: '#ff3b3b',
                                    display: 'none',
                                    width: '5px',
                                    height: '5px',
                                    position: 'absolute',
                                    top: '0px',
                                    left: '-5px',
                                    borderRadius: '10px'
                                },
                                child : []
                            }, {
                                id    : 'atouch_iface-state-error-num',
                                tag   : 'span',
                                inner : '',
                                style : {
                                    color: '#ff3b3b',
                                    marginLeft: '5px'
                                },
                                child : []
                            }]
                        }, {
                            id    : 'atouch_iface-state-success',
                            tag   : 'div',
                            style : group_css.result_ico,
                            appstl: {
                                marginLeft: '19px'
                            },
                            child : [{
                                id    : 'atouch_iface-state-success-icon',
                                tag   : 'span',
                                inner : '&#8927;',
                                style : {
                                    color: '#888',
                                    font: '13px/13px Arial',
                                    cursor: 'default'
                                },
                                child : []
                            }, {
                                id    : 'atouch_iface-state-success-num',
                                tag   : 'span',
                                inner : '',
                                style : {
                                    color: '#00ff36',
                                    marginLeft: '5px'
                                },
                                child : []
                            }]
                        }, {
                            id    : 'atouch_iface-state-connect',
                            tag   : 'div',
                            inner : '&#9223;',
                            style : group_css.state_ico,
                            child : []
                        }, {
                            id    : 'atouch_iface-state-login',
                            tag   : 'div',
                            inner : '&#9000;',
                            style : group_css.state_ico,
                            child : []
                        }, {
                            id    : 'atouch_iface-state-crash',
                            tag   : 'div',
                            inner : '&#10033;',
                            style : group_css.state_ico,
                            child : []
                        }]
                    }]
                }];
        
            /**
             * Generating Atouch panel from object
             *
             * @private
             *
             * @param {Array} frame             New interface elemets array
             * @param {HTMLElement} parent      Parent element for appending childs
             * @returns {boolean}               True if success
             */
            function buildInterface (frame, parent = null) {
                let parentNode = parent || document.body;
        
                if (frame instanceof Array) {
                    frame.forEach(function (item) {
                        let elem = document.createElement(item.tag);
                        elem.id = item.id;
                        elem.dataset.owner = panel_vars.owner;
        
                        for (let css in item.style) {
                            elem.style[css] = item.style[css];
                        }
        
                        if (item.appstl) {
                            for (let css in item.appstl) {
                                elem.style[css] = item.appstl[css];
                            }
                        }
        
                        if (item.type) {
                            elem.type = item.type;
                        }
        
                        if (item.inner) {
                            elem.innerHTML = item.inner;
                        }
        
                        if (item.clas) {
                            elem.className = item.clas;
                        }
        
                        if (item.value) {
                            elem.value = item.value;
                        }
        
                        if (item.var && item.target) {
                            dom[item.id] = [elem, item.target, item.var];
                        }
        
                        if (item.action && item.task) {
                            action[item.id] = [elem, item.action, item.task];
                        }
        
                        buildInterface(item.child, elem);
        
                        parentNode.appendChild(elem);
                    });
        
                    return true;
                }
        
                return false;
            }
        
            /**
             * Loads  strings of text in selected translation and input it to elements
             *
             * @private
             *
             * @returns {none}                  No return
             */
            function loadAttributes () {
                for (let key in dom) {
                    dom[key][0][dom[key][1]] = eval(dom[key][2]);
                }
        
                for (let key in action) {
                    action[key][0].addEventListener(action[key][1], eval(action[key][2]));
                }
            }
        
            /**
             * Changing Atoucj active language
             *
             * @private
             *
             * @param {string} tag              Selected language tag
             * @returns {none}                  No return
             */
            function changeLang (tag) {
                if (DI && DI.isService('Lang')) {
                    DI.getService('Lang').setLanguage(tag);
                    lang = DI.getService('Lang').text;
                }
        
                document.body.removeChild(document.getElementById('atouch_iface-panel'));
                buildInterface(iface_frame);
                loadAttributes();
                tabOptions();
            }
        
            /**
             * Sends selected test id to Runner for execution
             *
             * @private
             *
             * @param {string} test_id          Selected test id
             * @returns {none}                  No return
             */
            function sendTestToRunner (test_id) {
        
            }
        
            /**
             * Selecting test execution list tab
             * - Generating tests list
             * - Hidding all content elements and showing test selecting elements
             * - Load list of accessed tests
             * - Set test running buton listener
             *
             * @private
             *
             * @returns {none}              No return
             */
            function tabList () {
                let panel = document.getElementById('atouch_iface-panel'),
                    panel_elem = document.getElementsByClassName('panel_elem'),
                    target_elem = document.getElementsByClassName('list_elem'),
                    head_elem = document.getElementById('atouch_iface-panel-content-title'),
                    test_select = document.getElementById('atouch_iface-panel-content-test-select'),
                    test_run = document.getElementById('atouch_iface-panel-content-test-start');
            
                for (let i = panel_elem.length; i--;) {
                    panel_elem[i].style.display = 'none';
                }
            
                for (let i = target_elem.length; i--;) {
                    target_elem[i].style.display = 'inline';
                }
            
                head_elem.innerHTML = lang.iface_tab_test_title;
            
                test_select.innerHTML = '';
            
                // Generating tests list from Server
                for (let item in test_list) {
                    let elem = document.createElement('option');
                    elem.innerHTML = test_list[item].name;
                    elem.value = item;
                    test_select.appendChild(elem);
                }
            
                test_run.onclick = function () {
                    changePanelVisible(true);
                    sendTestToRunner(test_select.value);
            
                    // console.log(test_list[test_select.value].test);
                    // TODO: show panel after test ending or with error in test
                };
            
                panel.onmouseout = changePanelTransparencyToLast;
                panel.onmouseover = changePanelTransparencyToMax;
            }
            
            /**
             * Selecting options list tab
             * - Generating language list
             * - Hidding all content elements and showing options elements
             * - Load list of languages
             * - Set click listener for saving options changes
             * - Preparing state of transparency range input
             *
             * @private
             *
             * @returns {none}              No return
             */
            function tabOptions () {
                let panel = document.getElementById('atouch_iface-panel'),
                    panel_elem = document.getElementsByClassName('panel_elem'),
                    target_elem = document.getElementsByClassName('option_elem'),
                    head_elem = document.getElementById('atouch_iface-panel-content-title'),
                    lang_select = document.getElementById('atouch_iface-panel-content-lang-select'),
                    options_change = document.getElementById('atouch_iface-panel-content-options-change'),
                    opacity = document.getElementById('atouch_iface-panel-content-opacity-select');
            
                for (let i = panel_elem.length; i--;) {
                    panel_elem[i].style.display = 'none';
                }
            
                for (let i = target_elem.length; i--;) {
                    target_elem[i].style.display = 'inline';
                }
            
                head_elem.innerHTML = lang.iface_tab_option_title;
            
                lang_select.innerHTML = '';
            
                for (let line in lang_list) {
                    let elem = document.createElement('option');
                    elem.innerHTML = lang_list[line].name;
                    elem.value = lang_list[line].link;
                    lang_select.appendChild(elem);
                }
            
                options_change.onclick = function () {
                    state.panel.opacity = opacity.value;
                    changeLang(lang_select.value);
                };
            
                opacity.min = 20;
                opacity.max = 100;
                opacity.step = 2;
                opacity.value = state.panel.opacity ? state.panel.opacity : 100;
                opacity.oninput = changePanelTransparency;
            
                panel.onmouseout = changePanelTransparencyToLast;
                panel.onmouseover = changePanelTransparencyToMax;
            }
            
            /**
             * Selecting authorization tab
             * - Hidding all content elements and showing auth elements
             *
             * @private
             *
             * @returns {none}              No return
             */
            function tabAuth () {
                let panel_elem = document.getElementsByClassName('panel_elem'),
                    target_elem = document.getElementsByClassName('auth_elem'),
                    head_elem = document.getElementById('atouch_iface-panel-content-title');
            
                for (let i = panel_elem.length; i--;) {
                    panel_elem[i].style.display = 'none';
                }
            
                for (let i = target_elem.length; i--;) {
                    target_elem[i].style.display = 'inline';
                }
            
                head_elem.innerHTML = lang.iface_tab_auth_title;
            }
            
            /**
             * Selecting reporting tab
             * - Hidding all content elements and showing report elements
             *
             * @private
             *
             * @returns {none}              No return
             */
            function tabReport () {
                let panel_elem = document.getElementsByClassName('panel_elem'),
                    target_elem = document.getElementsByClassName('report_elem'),
                    head_elem = document.getElementById('atouch_iface-panel-content-title');
            
                for (let i = panel_elem.length; i--;) {
                    panel_elem[i].style.display = 'none';
                }
            
                for (let i = target_elem.length; i--;) {
                    target_elem[i].style.display = 'inline';
                }
            
                head_elem.innerHTML = lang.iface_tab_report_title;
            }
            
            /**
             * Hide or show Atouch panel
             *
             * @private
             *
             * @param {boolean} show            Force hides panel (default: false)
             * @returns {none}                  No return
             */
            function changePanelVisible (show = false) {
                let panel = document.getElementById('atouch_iface-panel'),
                    collapse = document.getElementById('atouch_iface-panel-collapse');
            
                if (panel.style.right === '0px' || !show) {
                    // hide panel
                    panel.style.right = '-269px';
                    panel.style.opacity = '1';
                    panel.onmouseout = null;
                    panel.onmouseover = null;
            
                    collapse.style.right = '273px';
                    collapse.style.background = 'none';
                    collapse.innerHTML = '&#9664;';
                    collapse.title = lang.iface_button_show_panel;
                } else {
                    // show panel
                    panel.style.right = '0px';
                    panel.style.opacity = 1;
                    panel.onmouseout = changePanelTransparencyToLast;
                    panel.onmouseover = changePanelTransparencyToMax;
            
                    collapse.style.right = '2px';
                    collapse.style.background = '#0cb1b3';
                    collapse.innerHTML = '&#9654;';
                    collapse.title = lang.iface_button_hide_panel;
                }
            }
            
            /**
             * Change Atouch panel transparency
             *
             * @private
             *
             * @param {Object} event            Range changing event object
             * @returns {none}                  No return
             */
            function changePanelTransparency (event) {
                let panel = document.getElementById('atouch_iface-panel');
            
                panel.style.opacity = event.target.value / 100;
            }
            
            /**
             * Change Atouch panel transparency
             *
             * @private
             *
             * @returns {none}                  No return
             */
            function changePanelTransparencyToMax () {
                let panel = document.getElementById('atouch_iface-panel');
            
                panel.style.opacity = 1;
            }
            
            /**
             * Change Atouch panel transparency
             *
             * @private
             *
             * @returns {none}                  No return
             */
            function changePanelTransparencyToLast () {
                let panel = document.getElementById('atouch_iface-panel');
            
                if (state.panel.opacity) {
                    panel.style.opacity = state.panel.opacity / 100;
                }
            }
        
            /**
             * Generating user interface, upload listeners and start actions
             *
             * @public
             *
             * @returns {boolean}               True if success
             */
            IFACE.prototype.showPanel = function () {
                if (!lang) {
                    return false;
                }
        
                buildInterface(iface_frame);
                loadAttributes();
                tabList();
        
                return true;
            };
        
            /**
             * @constructor
             *
             * @param {FACADE} facade       Atouch FACADE class object
             * @returns {IFACE}             IFACE object
             */
            function IFACE (facade = null) {
                if (facade.constructor.name === 'FACADE') {
                    Facade = facade;
                }
        
                if (DI && DI.isService('Lang')) {
                    lang = DI.getService('Lang').text;
                    lang_list = DI.getService('Lang').lang_list;
                }
        
                this.showPanel();
                return this;
            }
        
            return IFACE;
        })();

        /**
         * @class RUNNER
         * @description Atouch tests creating and editing class
         * @version 0.0.2
         */
        let EDITOR = (function () {
            let is_redactor = false,
                is_recording = false,
                Recorder;
            
            /**
             * @class RECORD
             * @description Atouch class for recording tests in Editor
             * @version 0.0.3
             */
            let RECORD = (function () {
                let record = {},
                    sendFunction = null,
                    new_test_tasks = [];
                
                /* global record, sendFunction */
                record.menu = {
                    nodes : {
                        elems : [], 
                        link : null,
                        icon : '&#8801;',
                        handle : showNodesSubMenu
                    },
                    point : {
                        elems : [], 
                        link : null,
                        icon : '&#9675;',
                        handle : showPointSubMenu
                    },
                    mouse : {
                        elems : [], 
                        link : null,
                        icon : '&#9997;',
                        handle : showMouseSubMenu
                    }
                };
                
                record.link = null;
                record.size = 50;
                record.screenHeight = Math.max(
                    document.documentElement.scrollHeight,
                    document.documentElement.offsetHeight,
                    document.documentElement.clientHeight
                );
                record.screenWidth = Math.max(
                    document.documentElement.scrollWidth,
                    document.documentElement.offsetWidth,
                    document.documentElement.clientWidth
                );
                
                /**
                 * Shows record menu
                 * 
                 * @private
                 * 
                 * @param {Object} event        Mouse click event object
                 * @returns {boolean}           True if success
                 */
                function showRecordMenu (event) {
                    // Ignoring Atouch elements
                    if (event.target.dataset.owner === 'atouch') {
                        return false;
                    }
                
                    if (event.type === 'contextmenu' && event.button === 2) {
                        if (record.link) {
                            record.link.parentNode.removeChild(record.link);
                            record.link = null;
                        }
                
                        record.link = prepareRecordMenu(event);
                
                        if (record.link) {
                            document.body.appendChild(record.link);
                            putElementToScreen();
                        }
                    }
                
                    return true;
                }
                
                /**
                 * Preparing recording menu element before viewing
                 * 
                 * @private
                 * 
                 * @param {type} event          Mouse click event object
                 * @returns {Element}           Rerord menu element
                 */
                function prepareRecordMenu (event) {
                    let elem = document.createElement('div'),
                        scroll = getPageScroll ();
                
                    elem.style.background = '#FDD';
                    elem.style.position = 'absolute';
                    elem.style.left = (event.clientX + scroll.x - (Object.keys(record.menu).length * record.size) / 2) + 'px';
                    elem.style.top = (event.clientY + scroll.y + 25) + 'px';
                    elem.style.width = (Object.keys(record.menu).length * record.size) + 'px';
                    elem.style.height = record.size + 'px';
                    elem.dataset.owner = 'atouch';
                    elem.id = 'atouch_record-menu';
                
                    for (let key in record.menu) {
                        let button = document.createElement('button');
                        button.style.width = (record.size - 10) + 'px';
                        button.style.height = (record.size - 10) + 'px';
                        button.style.margin = (record.size / 10) + 'px';
                        button.style.cursor = 'pointer';
                        button.dataset.owner = 'atouch';
                        button.innerHTML = record.menu[key].icon;
                        button.id = 'atouch_record-menu-' + key;
                        button.addEventListener('click', record.menu[key].handle.bind(null, event.target));
                        record.menu[key].link = button;
                        elem.appendChild(button);
                    }
                
                    return elem;
                }
                
                /**
                 * Show nodes selecting button on recording panel
                 * 
                 * @private
                 * 
                 * @param {Element} elem        Selected DOM element
                 * @returns {boolean}           True if success
                 */
                function showNodesSubMenu (elem) {
                    let list = getParentsList(elem),
                        links = [],
                        tmp_back,
                        name = 'nodes';
                
                    switchSubMenu(name);
                
                    list.forEach(function (item, i, arr) {
                        let button = document.createElement('button');
                        button.style.height = (record.size - 10) + 'px';
                        button.style.margin = (record.size / 10) + 'px';
                        button.style.cursor = 'pointer';
                        button.className = 'toucher_record-submenu-button';
                        button.innerHTML = getHidByElement(item).toLowerCase();
                        button.dataset.owner = 'atouch';
                        
                        button.onmouseover = function () {
                            tmp_back = item.style.background;
                            item.style.background = 'pink';
                        };
                        
                        button.onmouseout = function () {
                            item.style.background = tmp_back;
                        };
                        
                        button.onclick = function () {
                            if (sendFunction) {
                                sendFunction(
                                    getElementHierarchyString(item)
                                );
                            }
                        };
                
                        links.push(button);
                    });
                    
                    if (!links.length) {
                        putElementToScreen();
                        return false;
                    }
                
                    links.forEach(function (item, i, arr) {
                        item.style.position = 'absolute';
                        item.style.top = ((i + 1) * record.size) + 'px';
                        item.style.left = (record.menu[name].link.offsetLeft - 5) + 'px';
                        record.link.style.height = (record.link.offsetHeight + record.size) + 'px';
                        record.link.appendChild(item);
                        if (item.offsetWidth + 10 > record.link.offsetWidth) {
                            record.link.style.width = (item.offsetWidth + 10) + 'px';
                        }
                    });
                
                    
                    record.menu[name].elems = links;
                    links = null;
                    
                    putElementToScreen();
                    return true;
                }
                
                /**
                 * Show mouse actions panel
                 * 
                 * @private
                 * 
                 * @returns {none}                  No return
                 */
                function showMouseSubMenu () {
                    let name = 'mouse';
                    switchSubMenu(name);
                    
                    putElementToScreen();
                }
                
                /**
                 * Show action selecting panel
                 * 
                 * @private
                 * 
                 * @returns {none}                  No return
                 */
                function showPointSubMenu () {
                    let name = 'point';
                    switchSubMenu(name);
                    
                    putElementToScreen();
                }
                
                /**
                 * Changing state of menu buttons - disabling selected menu button and activating other buttons
                 * 
                 * @private
                 * 
                 * @param {string} index        Selected menu button ident name
                 * @returns {boolean}           True if success
                 */
                function switchSubMenu (index) {
                    let trg_elems = record.link.getElementsByClassName('toucher_record-submenu-button');
                    
                    for (let key in record.menu) {
                        record.menu[key].link.disabled = false;
                    }
                    
                    record.menu[index].link.disabled = true;
                    deleteAllChildByClass(record.link, 'toucher__class__action-button');
                
                    if (trg_elems.length === 0) {
                        return false;
                    }
                    
                    // Remove prev submenu buttons
                    while (trg_elems[0]) {
                        record.link.removeChild(trg_elems[0]);
                    }
                   
                    record.link.style.width = (Object.keys(record.menu).length * record.size) + 'px';
                    record.link.style.height = record.size + 'px';
                
                    // [].forEach.call(trg_elems, function(el) {
                    // menu.removeChild(el);
                    // });
                    
                    return true;
                }
                
                // Ниже функции для переноса в общую област видимости
                
                /**
                 * Collects node parent elements to list
                 * 
                 * @private
                 * 
                 * @param {type} elem                   Selected DOM element
                 * @returns {Array}                     Parents list
                 */
                function getParentsList (elem) {
                    let list = [];
                    let parent = elem;
                    
                    list.push(parent);
                    while (parent.nodeName && parent.nodeName !== 'BODY' && parent.nodeName !== 'HTML') {
                        parent = parent.parentNode;
                        list.push(parent);
                    }
                
                    return list;
                }
                
                /**
                 * Generates element unique name via ID, className, tagName
                 * 
                 * @private
                 * 
                 * @param {HTMLElement} element         Selected DOM element
                 * @returns {string}                    Element unique name
                 */
                function getHidByElement (element) {
                    let finder = element.nodeName;
                    
                    if (element.id) {
                        finder += '#' + element.id;
                    } else if (element.className) {
                        let classes = element.className.split(' '),
                            first_class = classes[0],
                            class_childs = element.parentNode.getElementsByClassName(first_class);
                        
                        for (let i = 0, max = class_childs.length; i < max; i++) {
                            if (class_childs[i] === element) {
                                finder += '.' + first_class + '[' + i + ']';
                            }
                        }
                    } else {
                        if (element.name) {
                            finder += '[name="' + element.name + '"]';
                        }
                        
                        let tag_name = element.nodeName,
                            parent_childs = element.parentNode.getElementsByTagName(tag_name);
                        
                        for (let i = 0, max = parent_childs.length; i < max; i++) {
                            if (parent_childs[i] === element) {
                                finder += '[' + i + ']';
                            }
                        }
                    }
                
                    return finder;
                }
                
                /**
                 * Concatenates DOM element and it parents hids
                 * 
                 * @private
                 * 
                 * @param {HTMLElement} element         Target DOM element
                 * @returns {string}                    Concatenated hids string
                 */
                function getElementHierarchyString (element) {
                    let string = getHidByElement(element);
                    let parent = element;
                    
                    while (parent.parentNode && parent.parentNode.nodeName !== 'HTML') {
                        parent = parent.parentNode;
                        string += '~' + getHidByElement(parent);
                    }
                    
                    return string.split('~').reverse().join('~').toLowerCase();
                }
                
                /**
                 * Remove all elements childs by className
                 * 
                 * @private
                 * 
                 * @param {HTMLElement} cleaner         Parent DOM element
                 * @param {String} class_name           Deleting class name
                 * @returns {none}                      No return
                 */
                function deleteAllChildByClass (cleaner, class_name) {
                    
                }
                
                /**
                 * Positions an element to display it inside the screen
                 * 
                 * @private
                 * 
                 * @param {HTMLElement} element         Display element
                 * @returns {none}                      No return
                 */
                function putElementToScreen (element = null) {
                    let scroll = getPageScroll(),
                        el = element || record.link,
                        scroll_size = scrollbarWidth();
                
                    if (el.offsetLeft < 0) {
                        el.style.left = 5 + 'px';
                    }
                    
                    if (el.offsetTop < 0) {
                        el.style.top = 5 + 'px';
                    }
                    
                    if (el.offsetLeft + el.offsetWidth + 18 > scroll.x + record.screenWidth) {
                        el.style.left = (scroll.x + record.screenWidth - el.offsetWidth - scroll_size - 5) + 'px';
                    }
                    
                    if (el.offsetTop + el.offsetHeight > scroll.y + record.screenHeight) {
                        el.style.top = (scroll.y + record.screenHeight - el.offsetHeight - scroll_size - 5) + 'px';
                    }
                }
                
                /**
                 * Calculate scroll line width
                 * 
                 * @private
                 * 
                 * @returns {integer}                  Width scroll lines
                 */
                function scrollbarWidth () {
                    let documentWidth = parseInt(document.documentElement.clientWidth),
                        windowsWidth = parseInt(window.innerWidth),
                        scrollbarWidth = windowsWidth - documentWidth;
                    return scrollbarWidth;
                }
                
                /* // !
                TODO:
                1. При наличии нескольких подклассов у элемента, нужно будет давать пользователю возможность выбирать, по какому имени класса будет осуществляться проверка или действие
                2. 
                
                 */
                
                /**
                 * Create task of action in according event
                 * 
                 * @private
                 * 
                 * @param {Object} e            Event
                 * @returns {boolean}           True if success
                 */
                function addNewTaskFromEvent (e) {
                    let task = null;
                    switch (e.type) {
                        case 'click':
                            task = {
                                action  : 'click',
                                target  : getElementHierarchyString(e.target)
                            };
                            break;
                        case 'change':
                            task = {
                                action  : 'change',
                                value   : e.target.value,
                                target  : getElementHierarchyString(e.target)
                            };
                            break;
                        case 'keypress':
                            task = {
                                action  : 'keypress',
                                key     : e.key,
                                ccd     : e.charCode,
                                kcd     : e.keyCode,
                                target  : getElementHierarchyString(e.target)
                            };
                            break;
                        default:
                            return false;
                    }
                    
                    if (task) {
                        new_test_tasks.push(task);
                    }
                    
                    return true;
                }
                
                /**
                 * Starts record listeners, activate functions
                 * 
                 * @public
                 * 
                 * @param {Function} func       Function for sending messages to Editor scope from iframe
                 * @returns {none}              No return
                 */
                RECORD.prototype.activateRecord = function (func = null) {
                    sendFunction = func;
                    
                    // Used document instead window for IE8 compatibility
                    /* document.oncontextmenu = function () {
                        return false;
                    };
                    
                    // Not work in IE8
                    window.addEventListener('contextmenu', function (e) {
                        e.preventDefault();
                        showRecordMenu(e);
                    }, false); */
                };
                
                /**
                 * Starts action listeners
                 * 
                 * @public
                 * 
                 * @returns {none}                  No return
                 */
                RECORD.prototype.startRecord = function () {
                    window.addEventListener('click', addNewTaskFromEvent);
                    window.addEventListener('change', addNewTaskFromEvent);
                    // window.addEventListener('keypress', addNewTaskFromEvent);
                };
                
                /**
                 * Stops action listeners
                 * 
                 * @public
                 * 
                 * @returns {none}                  No return
                 */
                RECORD.prototype.stopRecord = function () {
                    window.removeEventListener('click', addNewTaskFromEvent);
                    window.removeEventListener('change', addNewTaskFromEvent);
                    // window.removeEventListener('keypress', addNewTaskFromEvent);
                    
                    sendFunction(JSON.stringify(new_test_tasks));
                    
                    // TODO: сделать потверждение о получении и только после этого очищать буфер
                    new_test_tasks = [];
                };
                
                /**
                 * @constructor
                 * 
                 * @returns {RECORD}        RECORD object
                 */
                function RECORD () {
                    return this;
                }
            
                return RECORD;
            })();
                
            /**
             * setIsRedactor
             * 
             * Activate redactor functions when we edit tests
             *        
             * @param {Function} sendHandle     Function for sending messages to Editor scope from iframe       
             * @returns {none}                  No return
             */
            EDITOR.prototype.setIsRedactor = function (sendHandle) {
                is_redactor = true;
                document.onclick = Recorder.activateRecord(sendHandle);
            };
            
            /**
             * startRecord
             * 
             * //todo
             *       
             * @returns {none}                  No return
             */
            EDITOR.prototype.startRecord = function () {
                is_recording = true;
                
                Recorder.startRecord();
            };
            
            /**
             * startRecord
             * 
             * //todo
             *       
             * @returns {none}                  No return
             */
            EDITOR.prototype.stopRecord = function () {
                is_recording = false;
                
                Recorder.stopRecord();
            };
        
            /**
             * @constructor
        
             * @returns {EDITOR}        EDITOR object
             */
            function EDITOR () {
                Recorder = new RECORD;
                return this;
            }
        
            return EDITOR;
        })();

        /**
         * @class SERVER
         * @description Atouch class for communicating with the server
         * @version 0.0.2
         */
        let SERVER = (function () {
            /**
             * @constructor
             * 
             * @returns {SERVER}             SERVER object
             */
            function SERVER () {
                return this;
            }
        
            return SERVER;
        })();

        /**
         * @class UNIT
         * @description Atouch unit-tests class
         * @version 0.0.2
         */
        let UNIT = (function () {
            /**
             * @constructor
             * 
             * @returns {UNIT}        UNIT object
             */
            function UNIT () {
                return this;
            }
        
            return UNIT;
        })();

        /**
         * Sends messages from Atouch to Editor page
         *
         * @private
         *
         * @param {string} str      Sending message to Editor page
         * @returns {none}                  No return
         */
        function messageToEditor (str) {
            window.parent.postMessage(str, domain);
        }

        /**
         * Method for sending messages from Editor page to Atouch
         *
         * @public
         *
         * @param {string} str      Received message from Editor page
         * @returns {boolean}       True if success
         */
        ATOUCH.prototype.messageFromEditor = function (str) {
            /* if (!DI.isService('Editor')) {
                return false;
            } */

            switch (str) {
                case 'atouch editor ready':
                    // DI.getService('Editor').setIsRedactor(messageToEditor);
                    break;
                case 'atouch start record':
                    // DI.getService('Editor').startRecord();
                    break;
                case 'atouch stop record':
                    // DI.getService('Editor').stopRecord();
                    break;
                case 'atouch run record':
                    break;
                default:
                    break;
            }

            return true;
        };

        /**
         * @constructor
         *
         * @returns {ATOUCH}        ATOUCH object
         */
        function ATOUCH () {
            document.addEventListener('DOMContentLoaded', function () {
                // For working window.history.back and window.history.forward
                // in Firefox (running JS after loading to returned page)
                window.onunload = function () {};

                DI = new INJECT;
                Facade = new FACADE;

                DI.registerService('Lang', LANG);
                DI.registerService('Debug', DEBUG);
                DI.registerService('Server', SERVER);

                Runner = new RUNNER(Facade);
                Iface = new IFACE(Facade);
                Editor = new EDITOR(Facade);
                Server = new SERVER(Facade);
                Unit = new UNIT(Facade);

                /* if (DI.isService('Editor')) {
                    window.parent.postMessage('atouch script ready', domain);
                }

                if (DI.isService('Runner') && state.atouch.execute) {
                    DI.getService('Runner').runTest(state.atouch.execute);
                } */
            });

            return this;
        }

        return ATOUCH;
    })();

    (function () {
        global.atouch = new ATOUCH;
    })();
})(typeof window !== 'undefined' ? window : this);