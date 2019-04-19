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
        let domain  = '*',
            coms_buffer = [],
            SL = null,
            Runner = null,
            Editor = null,
            Server = null,
            Unit = null,
            Storage = null,
            Debug = null,
            config = {
                no_gui: false, // Hide browser gui panel (true|false)
                no_report: false, // (No send test report to server (true|false)
                stop_error: false, // Stop test if error (true|false)
                wait_timeout: 3, // Waiting step execution finish before (0-...)
                print_speed: 50, // Speed of text printing (0-100)
                mouse_speed: 30 // Speed of mouse moving (0-100)
            },
            callbacks = {},
            Tests = {},
            Collections = {},
            ScriptParser = {},
            DEBUG_MODE = debug || false,
            _;

        //= lang/lang.js

        //= iface/iface.js

        //= facade.js

        // = runner/runner.js

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
                Debug = SL.createObject(DEBUG);
                if (DEBUG_MODE) console.info('MODULE: INJECT injected to DEBUG');
            }

            if (typeof STORAGE !== 'undefined') {
                Storage = SL.createObject(STORAGE);
                if (DEBUG_MODE) console.info('MODULE: INJECT injected to STORAGE');
            }

            if (typeof TEST !== 'undefined') {
                ATOUCH.prototype.Test = SL.createObject(TEST);
                if (DEBUG_MODE) console.info('MODULE: INJECT injected to TEST');
            }

            if (typeof EDITOR !== 'undefined') {
                Editor = SL.createObject(EDITOR);
                if (DEBUG_MODE) console.info('MODULE: INJECT injected to EDITOR');
            }

            if (typeof SERVER !== 'undefined') {
                Server = SL.createObject(SERVER);
                if (DEBUG_MODE) console.info('MODULE: INJECT injected to SERVER');
            }

            if (typeof UNIT !== 'undefined') {
                Unit = SL.createObject(UNIT);
                if (DEBUG_MODE) console.info('MODULE: INJECT injected to UNIT');
            }

            if (typeof LANG !== 'undefined') {
                SL.registerService('Lang', new LANG(Debug));
                if (DEBUG_MODE) console.info('MODULE: LANG loaded to ATOUCH');
            }

            if (typeof RUNNER !== 'undefined') {
                SL.registerService('Runner', new RUNNER(Debug));
                if (DEBUG_MODE) console.info('MODULE: RUNNER loaded to ATOUCH');
            }

            if (typeof IFACE !== 'undefined') {
                SL.registerService('Iface', new IFACE(SL, Debug));
                if (DEBUG_MODE) console.info('MODULE: IFACE loaded to ATOUCH');
            }

            SL.loadTotalState();

            if (Editor && global.postMessage) {
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

            if (Runner) {
                Runner.runTest();
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

