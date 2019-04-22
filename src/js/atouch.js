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

    //= storage/storage.js

    //= debug/debug.js

    //= editor/editor.js

    //= server/server.js

    //= test/test.js

    //= unit/unit.js

    /**
     * @class ATOUCH
     * @description Global class for Atouch - in browser testing site library
     * @version 0.2.5
     */
    let ATOUCH = (function () {
        const BackCalls = {},
            Tests = {},
            Collections = {},
            ScriptParser = {},
            DEBUG_MODE = debug || false,
            config = {
                no_gui: false, // Hide browser gui panel (true|false)
                no_report: false, // (No send test report to server (true|false)
                stop_error: false, // Stop test if error (true|false)
                wait_timeout: 3, // Waiting step execution finish before (0-...)
                print_speed: 50, // Speed of text printing (0-100)
                mouse_speed: 30 // Speed of mouse moving (0-100)
            };


        let coms_buffer = [],
            domain  = '*',
            SL = null,
            _;

        //= lang/lang.js

        //= iface/iface.js

        //= facade.js

        //= runner/runner.js

        /**
         * @constructor
         *
         *
         * @returns {ATOUCH}        ATOUCH object
         */
        function ATOUCH () {
            SL = new INJECT;

            //= inject.extends.js

            if (DEBUG_MODE) console.info('MODULE: INJECT loaded');

            if (typeof DEBUG !== 'undefined') {
                SL.registerService('Debug', SL.createObject(DEBUG));
                if (DEBUG_MODE) console.info('MODULE: DEBUG loaded to ATOUCH');
            }

            if (typeof STORAGE !== 'undefined') {
                Storage = SL.createObject(STORAGE);
                if (DEBUG_MODE) console.info('MODULE: STORAGE loaded to ATOUCH');
            }

            if (typeof TEST !== 'undefined') {
                ATOUCH.prototype.Test = SL.createObject(TEST);
                if (DEBUG_MODE) console.info('MODULE: TEST loaded to ATOUCH');
            }

            if (typeof EDITOR !== 'undefined') {
                SL.registerService('Editor', SL.createObject(EDITOR));
                if (DEBUG_MODE) console.info('MODULE: EDITOR loaded to ATOUCH');
            }

            if (typeof SERVER !== 'undefined') {
                SL.registerService('Server', SL.createObject(SERVER));
                if (DEBUG_MODE) console.info('MODULE: SERVER loaded to ATOUCH');
            }

            if (typeof UNIT !== 'undefined') {
                SL.registerService('Unit', SL.createObject(UNIT));
                if (DEBUG_MODE) console.info('MODULE: UNIT loaded to ATOUCH');
            }

            if (typeof LANG !== 'undefined') {
                SL.registerService('Lang', SL.createObject(LANG));
                if (DEBUG_MODE) console.info('MODULE: LANG loaded to ATOUCH');
            }

            if (typeof RUNNER !== 'undefined') {
                SL.registerService('Runner', SL.createObject(RUNNER));
                if (DEBUG_MODE) console.info('MODULE: RUNNER loaded to ATOUCH');
            }

            if (typeof IFACE !== 'undefined') {
                SL.registerService('Iface', SL.createObject(IFACE));
                if (DEBUG_MODE) console.info('MODULE: IFACE loaded to ATOUCH');
            }

            SL.loadTotalState();

            if (SL.isService('Editor') && global.postMessage) {
                global.postMessage('atouch script ready', domain);
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

            if (SL.isService('Runner')) {
                SL.Service('Runner').runTest();
            }

            return this;
        }

        return ATOUCH;
    })();

    if (typeof module !== 'undefined' && module.exports) {
        module.exports = {ATOUCH};
    } else {
        try {
            (function () {
                global.Atouch = new ATOUCH;
            })();
        } catch (e) {
            console.warn(e);
        }
    }
})(typeof window !== 'undefined' ? window : this, true);

