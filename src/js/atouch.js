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

//= head.js

var Atouch;

(function (global, debug = false) {
    //= inject/inject.js

    // = storage/storage.js

    // = runner/runner.js

    // = editor/editor.js

    // = server/server.js

    // = test/test.js

    // = unit/unit.js

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
            config = {
                no_gui: false, // Hide browser gui panel (true|false)
                no_report: false, // (No send test report to server (true|false)
                stop_error: false, // Stop test if error (true|false)
                wait_timeout: 3, // Waiting step execution finish before (0-...)
                print_speed: 50, // Speed of text printing (0-100)
                mouse_speed: 30 // Speed of mouse moving (0-100)
            },
            Tests = {},
            Collections = {},
            ScriptParser = {},
            DEBUG_MODE = debug || false,
            _;

        //= iface/iface.js

        // = lang/lang.js

        // = inject.extends.js

        //= facade.js

        /**
         * Creates new TEST object
         * @type TEST
         */
        if (typeof TEST !== 'undefined') {
            ATOUCH.prototype.Test = new TEST();
        }

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

            if (typeof global.document !== 'undefined'
                    && typeof global.document.addEventListener !== 'undefined'
            ) {
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
                });
            }

            if (Runner) {
                Runner.runTest();
            }

            return this;
        }

        return ATOUCH;
    })();

    try {
        (function () {
            global.Atouch = new ATOUCH;
        })();
    } catch (e) {
        console.warn(e);
    }

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {ATOUCH};
    }
})(typeof window !== 'undefined' ? window : this, true);

