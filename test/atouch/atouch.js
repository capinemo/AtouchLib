/**
 * @class ATOUCH
 * @description Atouch global class
 * @version 0.0.4
 *
 * For using on site add script in site header:
 * <script type="text/javascript" src="js/atouch.js" defer></script>
 *
 * Short information about public methods in facade.js. Detail information
 * see on https://atouch.picum.ru
 */

/**
 * Atouch - javascript library for testing site in browser
 * with imitation user action
 * 
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

var atouch;

(function (global, debug = false) {
    /**
     * @class ATOUCH
     * @description Global class for Atouch - in browser testing site library
     * @version 0.2.5
     */
    let ATOUCH = (function () {
        let domain  = '*',
            coms_buffer = [],
            SL = null,
            Runner = null,
            Iface = null,
            Editor = null,
            Server = null,
            Unit = null,
            Config = {
                no_gui: false,
                no_report: false,
                stop_error: false
            },
            Tests = {},
            Collections = {},
            ScriptParser = {},
            DEBUG_MODE = debug || false,
            _;

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
         * Makes first letter to uppercase, other letters to lowercase
         *
         * @private
         *
         * @param {string} str          Given string
         * @returns {string}            Converted string
         */
        function capitalizeFirstLetter (str) {
            if (typeof str !== 'string') {
                throw new Error('capitalizeFirstLetter: not string given');
            }
        
            str = str.toLowerCase();
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        
        /**
         * Generate random integer between limits
         *
         * @private
         *
         * @param {integer} min         Minimal integer in range
         * @param {integer} max         Maximal integer in range
         * @returns {integer}           Generated number
         */
        function getRandomInt (min, max) {
            if (typeof min === 'undefined' || typeof max === 'undefined') {
                throw new Error('getRandomInt: needed parameter not given');
            }
        
            if (typeof min !== 'number' || typeof max !== 'number') {
                throw new Error('getRandomInt: parameters must have a integer type');
            }
        
            if (min > max) {
                throw new Error('getRandomInt: second number must be more than first');
            }
        
            return Math.floor(Math.random() * (+max + 1 - +min)) + +min;
        }
        
        /**
         * Filtering given variable with sanitizing via RegExp
         *
         * @private
         *
         * @param {any} str             Given variable
         * @param {string} regex        Template string for RexExp constructor
         * @returns {any}               Clean variable
         */
        function filterVariable (str, regex) {
            if (!regex) {
                regex = '\s\S';
            }
        
            let reg = new RegExp('[^' + regex.toString() + ']', 'g');
        
            if (typeof str === 'boolean') {
                return !!str;
            } else if (typeof str === 'number') {
                return +(str.toString().replace(reg, ''));
            } else if (typeof str === 'string') {
                return str.toString().replace(reg, '');
            } else if (typeof str === 'undefined') {
                return;
            } else if (str === null) {
                return null;
            } else {
                return str;
            }
        }
        
        /**
         * Generates new uuid with Crypto API
         *
         * @private
         *
         * @returns {string}            UUID
         */
        function genUUID () {
            return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                let r = Math.random() * 16 | 0,
                    v = c === 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            });
        }
        
        /**
         * Sets execution mode to all commands in buffer
         *
         * @private
         *
         * @param {boolean} mode        true = async/false == sync (default: sync)
         * @returns {none}              No return
         */
        function setRunOrder (mode = false) {
            if (typeof coms_buffer === 'undefined') {
                return;
            }
        
            if (!(coms_buffer instanceof Array)) {
                throw new Error('getRandomInt: need a array');
            }
        
            coms_buffer.forEach(function (item, key, arr) {
                if (typeof arr[key] === 'object') {
                    arr[key].mode = mode ? 'async' : 'sync';
                }
            });
        }
        
        
            module.exports = {filterVariable, genUUID, getRandomInt, capitalizeFirstLetter, setRunOrder};

        /**
         * @class INJECT
         * @description Service locator class
         * @version 0.1.0
         */
        
        let INJECT = (function () {
            let services = {},
                states = {};
        
            /**
             * Register service in Service Locator scope and inject scope to service
             *
             * @public
             *
             * @param {string} name             Service name
             * @param {Object} classObject      Object registered as service
             * @returns {none}                  No return
             */
            INJECT.prototype.registerService = function (name, classObject) {
                if (typeof name === 'object' || typeof name === 'function') {
                    throw new Error('Inject.registerService: invalid name given');
                }
        
                if (name === '') {
                    throw new Error('Inject.registerService: empty name given');
                }
        
                if (typeof classObject !== 'function') {
                    throw new Error('Inject.registerService: not function given as constructor');
                }
        
                name = filterVariable(name.toString(), 'a-zA-Z0-9_-');
        
                if (services[name]) {
                    console.warn('Inject.registerService: given name ' + name + ' already exists. Rewrite service');
                }
        
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
                if (!name) {
                    throw new Error('Inject.isService: empty name given');
                }
        
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
                if (!name) {
                    throw new Error('Inject.getService: empty name given');
                }
                
                if (!services[name]) {
                    return false;
                }
        
                return services[name];
            };
        
            /**
             * Creates new instance of class and injects self
             *
             * @public
             *
             * @param {Object} classObject      Object registered as service
             * @returns {Object}                Creaded instance of class
             */
            INJECT.prototype.createObject = function (classObject) {
                if (typeof classObject !== 'function') {
                    throw new Error('Inject.createObject: given parameter not a function');
                }
        
                classObject.prototype.Inject = this;
                return new classObject;
            };
        
            /**
             * Load list of available tests
             *
             * @public
             *
             * @returns {array}         Available tests
             */
            INJECT.prototype.getAvailableTests = function () {
                return test_list;
            };
        
            /**
             * Running test selected in interface
             *
             * @public
             *
             * @param {string} test_id          Selected test id
             * @returns {none}                  No return
             */
            INJECT.prototype.runSelectedTest = function (test_id) {
                Runner.runTest(test_id);
            };
        
            /**
             * Restore total state and send to modules<br />
             * <br />
             * If module needs a restoring self state, it gives to Service Locator <br />
             * a self object, getter and setter. When Service Locator saves total <br />
             * state, it calls all getters in method saveTotalState and receives <br />
             * states of modules. When Service Locator load total state from <br />
             * Storage service, it calls all setters in method loadTotalState <br />
             * and sends to modules them last state. <br />
             * <br />
             * Used in restoring total state after page reloading or openning <br />
             * new pages with specific testing logic <br />
             *
             * @public
             *
             * @param {Object} instance         Module object
             * @param {Function} getter         State loading function
             * @param {Function} setter         State restoring function
             * @returns {none}                  No return
             */
            INJECT.prototype.setModuleStateCallback = function (instance, getter, setter) {
                states[instance.constructor.name] = {get: getter, set: setter, module: instance};
            };
        
            /**
             * Load state changes from modules and save total state
             *
             * @public
             *
             * @param {boolean} reload          Change state.progress to 'reload' before <br />
             *                                  reloading during test execution
             * @returns {none}                  No return
             */
            INJECT.prototype.saveTotalState = function (reload = false) {
                let global_state = {};
        
                for (let key in states) {
                    global_state[key] = states[key]['get']();
                }
        
                if (reload && global_state.RUNNER) {
                    global_state.RUNNER.progress = 'reload';
                }
        
                this.getService('Storage').saveState(global_state);
            };
        
            /**
             * Restore total state and send to modules
             *
             * @public
             *
             * @returns {none}                  No return
             */
            INJECT.prototype.loadTotalState = function () {
                if (!this.getService('Storage')) return;
        
                let global_state = this.getService('Storage').loadState();
        
                for (let key in global_state) {
                    if (states[key]) {
                        states[key]['set'](global_state[key]);
                    }
                }
            };
        
            /**
             * Remove total state from storage
             *
             * @public
             *
             * @returns {none}                  No return
             */
            INJECT.prototype.cleanTotalState = function () {
                this.getService('Storage').cleanState();
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
        
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = {INJECT};
        }

        // = lang/lang.js

        // = storage/storage.js

        // = runner/runner.js

        // = iface/iface.js

        // = editor/editor.js

        // = server/server.js

        /**
         * @class TEST
         * @description Class for saving data of the single test
         * @version 0.1.0
         */
        let TEST = (function () {
            let id = '',
                name = '',
                desc = '',
                chain = [];
        
            /**
             * Clear all data in the current test
             *
             * @public
             *
             * @returns {TEST}                  TEST object
             */
            TEST.prototype.reset = function () {
                id = '';
                name = '';
                desc = '';
                chain = [];
        
                return this;
            };
        
            /**
             * Sets id for new test
             *
             * @public
             *
             * @param {string} test_id          New test id
             * @returns {TEST}                  TEST object
             */
            TEST.prototype.id = function (test_id) {
                if (typeof test_id !== 'string') {
                    throw new Error('Test.id: not string given in parameter');
                }
        
                if (test_id === '') {
                    test_id = genUUID();
                }
        
                test_id = filterVariable(test_id, 'a-zA-Z0-9\-\_');
        
                id = test_id;
                return this;
            };
        
            /**
             * Sets name for new test
             *
             * @public
             *
             * @param {string} test_name        New test name
             * @returns {TEST}                  TEST object
             */
            TEST.prototype.name = function (test_name) {
                if (typeof test_name !== 'string') {
                    throw new Error('Test.name: not string given in parameter');
                }
        
                if (test_name === '') {
                    throw new Error('Test.name: empty string given');
                }
        
                test_name = filterVariable(test_name, 'a-zA-Z0-9\-\_');
        
                name = test_name;
        
                if (!id) {
                    id = genUUID();
                }
        
                return this;
            };
        
            /**
             * Sets description for new test
             *
             * @public
             *
             * @param {string} test_desc        New name description
             * @returns {TEST}                  TEST object
             */
            TEST.prototype.desc = function (test_desc) {
                if (typeof test_desc !== 'string') {
                    throw new Error('Test.description: not string given in parameter');
                }
        
                test_desc = filterVariable(test_desc, 'a-zA-Zа-яА-ЯёЁ0-9\-\_\.\, ');
        
                desc = test_desc;
                return this;
            };
        
            /**
             * Sets chain of commands for new test. Chain of commands receives from <br />
             * method Atouch.getCollectedTasks as Array.
             *
             * @public
             *
             * @param {ATOUCH} atouch           ATOUCH object
             * @returns {TEST}                  TEST object
             */
            TEST.prototype.chain = function (atouch) {
                if (!(atouch instanceof ATOUCH)) {
                    throw new Error('Test.chain: not Atouch object given in parameter');
                }
        
                if (typeof atouch.getCollectedTasks !== 'function') {
                    throw new Error('Test.chain: invalid interface of Atouch object. Need a getCollectedTasks function');
                }
        
                chain = atouch.getCollectedTasks();
                return this;
            };
        
            /**
             * Gets id of the current test
             *
             * @public
             *
             * @returns {string}                Current test id
             */
            TEST.prototype.getId = function () {
                return id;
            };
        
            /**
             * Gets name of the current test
             *
             * @public
             *
             * @returns {string}                Current test name
             */
            TEST.prototype.getName = function () {
                return name;
            };
        
            /**
             * Gets description of the current test
             *
             * @public
             *
             * @returns {string}                Current test description
             */
            TEST.prototype.getDesc = function () {
                return desc;
            };
        
            /**
             * Gets commands list of the current test
             *
             * @public
             *
             * @returns {Array}                 Current test chain
             */
            TEST.prototype.getChain = function () {
                return chain;
            };
        
            /**
             * @constructor
             *
             * @returns {TEST}             TEST object
             */
            function TEST () {
                return this;
            }
        
            return TEST;
        })();
        
        if (typeof module !== 'undefined' && module.exports) {
            module.exports = {TEST};
        }

        // = unit/unit.js

        /**
         * @class ATOUCH
         * @description Atouch public methods
         * @version 0.0.1
         */
        
        /**
         * Initialize parameters of library <br />
         * <br />
         * Using example: atouch.config({no_gui: true, no_report: true}) <br />
         * <br />
         * Values: <br />
         * ~ no_gui = false|true [default:false] (Hide browser gui panel)<br />
         * ~ no_report = false|true [default:false] (No send test report to server)<br />
         * ~ stop_error = false|true [default:false] (Stop test if error)<br />
         * <br />
         * Value 'no_report' used if tests loaded from server. Tests from local <br />
         * script never sends report to server.
         *
         * @public
         *
         * @param {Object} params           Object with parameters
         * @returns {ATOUCH}                ATOUCH object
         */
        ATOUCH.prototype.config = function (params) {
            if (typeof params !== 'object') {
                throw new Error('Atouch.config: not object given');
            }
        
            for (let key in params) {
                if (params.hasOwnProperty(key) && Config.hasOwnProperty(key)) {
                    Config[key] = filterVariable(params[key], 'a-zA-Z0-9\.\,');
                } else {
                    console.warn('Atouch.config: given parameter ' + key + ' not exists');
                }
            }
        
            return this;
        };
        
        /**
         * Saves test for further use <br />
         * <br />
         * Using example:
         * <pre>atouch.prepare(
         *      atouch.test
         *          .name('FirstTestInJavaScript')
         *          .chain(
         *              atouch
         *                  .jscheck({vars: 'myObj.option.first', equal: 'test'})
         *                  .jscheck({vars: 'myArr[2]', equal: 31})
         *                  .exists({id: 'HtmlElement'})
         *          )
         *      )
         * ) </pre>
         *
         * @public
         *
         * @param {ATEST} test              TEST object with created test
         * @returns {ATOUCH}                ATOUCH object
         */
        ATOUCH.prototype.prepare = function (test) {
            if (typeof test !== 'object' || !(test instanceof TEST)) {
                throw new Error('Atouch.prepare: not Test object given in collection');
            }
        
            if (!test.getName()) {
                throw new Error('Atouch.prepare: Given empty test');
                return;
            }
        
            if (Collections[test.getName()]) {
                console.warn('Atouch.prepare: test with name ' + test.getName() + ' already exists. Rewrited');
            }
        
            Collections[test.getName()] = test;
            test.reset();
        
            return this;
        };
        
        /**
         * Saves to buffer commands collection for further use <br />
         * <br />
         * Using example:
         * <pre>atouch.collect('NewCollectionName',
         *      atouch
         *          .jscheck({vars: 'myObj.option.first', equal: 'test'})
         *          .jscheck({vars: 'myArr[2]', equal: 31})
         *          .exists({id: 'HtmlElement'})
         * ) </pre>
         *
         * @public
         *
         * @param {string} name             Collection name
         * @param {ATOUCH} self             ATOUCH object with list of command
         * @returns {ATOUCH}                ATOUCH object
         */
        ATOUCH.prototype.collect = function (name, self) {
            if (typeof name !== 'string') {
                throw new Error('Atouch.collect: not string given in collection name');
            }
        
            if (!(self instanceof ATOUCH)) {
                throw new Error('Atouch.collect: not Atouch object given in collection');
            }
        
            if (coms_buffer.length === 0) {
                throw new Error('Atouch.collect: list of commands is empty');
            }
        
            if (Collections[name]) {
                console.warn('Atouch.collect: collection with name ' + name + ' already exists. Rewrited');
            }
        
            Collections[name] = self.getCollectedTasks();
        
            return this;
        };
        
        ATOUCH.prototype.append = function (str) {
        
            return this;
        };
        
        ATOUCH.prototype.run = function (str) {
        
            return this;
        };
        
        /**
         * Sets order of command execution in list. In this case <br />
         * commands will be running sequentially. Next command starts <br />
         * when previous finished. If sync/async not used, all commands, <br />
         * by default, runs in sync mode.
         *
         * <br />
         * Using example:
         * <pre>atouch.sync(
         *      atouch
         *          .jscheck({vars: 'myObj.option.first', equal: 'test'})
         *          .jscheck({vars: 'myArr[2]', equal: 31})
         *          .exists({id: 'HtmlElement'})
         * ) </pre>
         *
         * @public
         *
         * @param {ATOUCH} self             ATOUCH object with list of command
         * @returns {ATOUCH}                ATOUCH object
         */
        ATOUCH.prototype.sync = function (self) {
            setRunOrder(false);
            return this;
        };
        
        /**
         * Sets order of command execution in list. In this case <br />
         * commands will be running separately. Next command starts <br />
         * after previous starting. If sync/async not used, all commands, <br />
         * by default, runs in sync mode.
         *
         * <br />
         * Using example:
         * <pre>atouch.async(
         *      atouch
         *          .jscheck({vars: 'myObj.option.first', equal: 'test'})
         *          .jscheck({vars: 'myArr[2]', equal: 31})
         *          .exists({id: 'HtmlElement'})
         * ) </pre>
         *
         * @public
         *
         * @param {ATOUCH} self             ATOUCH object with list of command
         * @returns {ATOUCH}                ATOUCH object
         */
        ATOUCH.prototype.async = function (self) {
            setRunOrder(true);
            return this;
        };
        
        ATOUCH.prototype.use = function (str) {
        
            return this;
        };
        
        ATOUCH.prototype.wait = function (str) {
        
            return this;
        };
        
        ATOUCH.prototype.while = function (str) {
        
            return this;
        };
        
        ATOUCH.prototype.until = function (str) {
        
            return this;
        };
        
        ATOUCH.prototype.page = function (param) {
        
            coms_buffer.push({action: 'page', params: param});
            return this;
        };
        
        ATOUCH.prototype.go = function (param) {
        
            coms_buffer.push({action: 'go', params: param});
            return this;
        };
        
        ATOUCH.prototype.reload = function (param) {
        
            coms_buffer.push({action: 'reload', params: param});
            return this;
        };
        
        ATOUCH.prototype.back = function (param) {
        
            coms_buffer.push({action: 'back', params: param});
            return this;
        };
        
        ATOUCH.prototype.forward = function (param) {
        
            coms_buffer.push({action: 'forward', params: param});
            return this;
        };
        
        ATOUCH.prototype.exists = function (param) {
        
            coms_buffer.push({action: 'exists', params: param});
            return this;
        };
        
        ATOUCH.prototype.check = function (param) {
        
            coms_buffer.push({action: 'check', params: param});
            return this;
        };
        
        ATOUCH.prototype.csscheck = function (param) {
        
            coms_buffer.push({action: 'csscheck', params: param});
            return this;
        };
        
        ATOUCH.prototype.jscheck = function (param) {
        
            coms_buffer.push({action: 'jscheck', params: param});
            return this;
        };
        
        ATOUCH.prototype.cookcheck = function (param) {
        
            coms_buffer.push({action: 'cookcheck', params: param});
            return this;
        };
        
        ATOUCH.prototype.cookdel = function (param) {
        
            coms_buffer.push({action: 'cookdel', params: param});
            return this;
        };
        
        ATOUCH.prototype.print = function (param) {
        
            coms_buffer.push({action: 'print', params: param});
            return this;
        };
        
        ATOUCH.prototype.fill = function (param) {
        
            coms_buffer.push({action: 'fill', params: param});
            return this;
        };
        
        ATOUCH.prototype.clear = function (param) {
        
            coms_buffer.push({action: 'clear', params: param});
            return this;
        };
        
        ATOUCH.prototype.click = function (param) {
        
            coms_buffer.push({action: 'click', params: param});
            return this;
        };
        
        ATOUCH.prototype.dblclick = function (param) {
        
            coms_buffer.push({action: 'dblclick', params: param});
            return this;
        };
        
        ATOUCH.prototype.down = function (param) {
        
            coms_buffer.push({action: 'down', params: param});
            return this;
        };
        
        ATOUCH.prototype.up = function (param) {
        
            coms_buffer.push({action: 'up', params: param});
            return this;
        };
        
        ATOUCH.prototype.focus = function (param) {
        
            coms_buffer.push({action: 'focus', params: param});
            return this;
        };
        
        ATOUCH.prototype.move = function (param) {
        
            coms_buffer.push({action: 'move', params: param});
            return this;
        };
        
        ATOUCH.prototype.scrollby = function (param) {
        
            coms_buffer.push({action: 'scrollby', params: param});
            return this;
        };
        
        ATOUCH.prototype.scrollto = function (param) {
        
            coms_buffer.push({action: 'scrollto', params: param});
            return this;
        };
        
        ATOUCH.prototype.attach = function (param) {
        
            coms_buffer.push({action: 'attach', params: param});
            return this;
        };
        
        ATOUCH.prototype.come = function (param) {
        
            coms_buffer.push({action: 'come', params: param});
            return this;
        };
        
        ATOUCH.prototype.leave = function (param) {
        
            coms_buffer.push({action: 'leave', params: param});
            return this;
        };
        
        ATOUCH.prototype.over = function (param) {
        
            coms_buffer.push({action: 'over', params: param});
            return this;
        };
        
        ATOUCH.prototype.out = function (param) {
        
            coms_buffer.push({action: 'out', params: param});
            return this;
        };
        
        ATOUCH.prototype.pull = function (param) {
        
            coms_buffer.push({action: 'pull', params: param});
            return this;
        };
        
        ATOUCH.prototype.mark = function (param) {
        
            coms_buffer.push({action: 'mark', params: param});
            return this;
        };
        
        ATOUCH.prototype.select = function (param) {
        
            coms_buffer.push({action: 'select', params: param});
            return this;
        };
        
        /**
         * Method for sending messages from Editor page to Atouch
         *
         * @public
         *
         * @param {string} str      Received message from Editor page
         * @returns {boolean}       True if success
         */
        ATOUCH.prototype.messageFromEditor = function (str) {
            /* if (!SL.isService('Editor')) {
                return false;
            } */
        
            switch (str) {
                case 'atouch editor ready':
                    // SL.getService('Editor').setIsRedactor(messageToEditor);
                    break;
                case 'atouch start record':
                    // SL.getService('Editor').startRecord();
                    break;
                case 'atouch stop record':
                    // SL.getService('Editor').stopRecord();
                    break;
                case 'atouch run record':
                    break;
                default:
                    break;
            }
        
            return true;
        };
        
        /**
         * Returns and cleand commands buffer
         *
         * @public
         *
         * @returns {array}         Prepared tasks collection
         */
        ATOUCH.prototype.getCollectedTasks = function () {
            let tmp = coms_buffer;
        
            coms_buffer = [];
        
            return tmp;
        };
        
        /**
         * Creates new TEST object
         * @type TEST
         */
        ATOUCH.prototype.test = new TEST();
        
        ATOUCH.prototype.checkWorks = function () {
            return 'Yes. I am work!';
        };

        /**
         * @constructor
         *
         * @returns {ATOUCH}        ATOUCH object
         */
        function ATOUCH () {
            SL = new INJECT;
            if (DEBUG_MODE) console.info('MODULE: INJECT loaded');

            if (typeof LANG !== 'undefined') {
                SL.registerService('Lang', LANG);
                if (DEBUG_MODE) console.info('MODULE: LANG loaded to SL');
            }

            if (typeof DEBUG !== 'undefined') {
                SL.registerService('Debug', DEBUG);
                if (DEBUG_MODE) console.info('MODULE: DEBUG loaded to SL');
            }

            if (typeof STORAGE !== 'undefined') {
                SL.registerService('Storage', STORAGE);
                if (DEBUG_MODE) console.info('MODULE: STORAGE loaded to SL');
            }

            if (typeof RUNNER !== 'undefined') {
                Runner = SL.createObject(RUNNER);
                if (DEBUG_MODE) console.info('MODULE: RUNNER loaded to SL');
            }

            if (typeof IFACE !== 'undefined') {
                Iface = SL.createObject(IFACE);
                if (DEBUG_MODE) console.info('MODULE: IFACE loaded to SL');
            }

            if (typeof EDITOR !== 'undefined') {
                Editor = SL.createObject(EDITOR);
                if (DEBUG_MODE) console.info('MODULE: EDITOR loaded to SL');
            }

            if (typeof SERVER !== 'undefined') {
                Server = SL.createObject(SERVER);
                if (DEBUG_MODE) console.info('MODULE: SERVER loaded to SL');
            }

            if (typeof UNIT !== 'undefined') {
                Unit = SL.createObject(UNIT);
                if (DEBUG_MODE) console.info('MODULE: UNIT loaded to SL');
            }

            SL.loadTotalState();

            if (Editor) {
                global.parent.postMessage('atouch script ready', domain);
            }

            if (typeof global.document === 'undefined'
                    || typeof global.document.addEventListener === 'undefined'
            ) {
                return this;
            }

            global.document.addEventListener('DOMContentLoaded', function () {
                // For working window.history.back and window.history.forward
                // in Firefox (running JS after loading to returned page)
                window.onunload = function () {};

                global.document.addEventListener('StartTest', function (e) {
                    global.onunload = function () {
                        SL.saveTotalState(true);
                        if (DEBUG_MODE) console.info('EVENT: StartTest');
                    };
                });

                global.document.addEventListener('FinishTest', function (e) {
                    global.onunload = function () {};
                    if (DEBUG_MODE) console.info('EVENT: FinishTest');
                });

                //Runner.runTest();
            });

            return this;
        }

        return ATOUCH;
    })();

    try {
        (function () {
            global.atouch = new ATOUCH;
        })();
    } catch (e) {
        console.warn(e);
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {ATOUCH};
    }
})(typeof window !== 'undefined' ? window : this, true);