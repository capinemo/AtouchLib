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

        //= global/global.functions.js

        //= inject/inject.js

        // = lang/lang.js

        // = storage/storage.js

        // = runner/runner.js

        // = iface/iface.js

        // = editor/editor.js

        // = server/server.js
        
        //= test/test.js

        // = unit/unit.js

        //= facade.js

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

                document.addEventListener('StartTest', function (e) {
                    window.onunload = function () {
                        SL.saveTotalState(true);
                        if (DEBUG_MODE) console.info('EVENT: StartTest');
                    };
                });

                document.addEventListener('FinishTest', function (e) {
                    window.onunload = function () {};
                    if (DEBUG_MODE) console.info('EVENT: FinishTest');
                });

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
                    window.parent.postMessage('atouch script ready', domain);
                }

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
})(typeof window !== 'undefined' ? window : this, true);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {ATOUCH};
}