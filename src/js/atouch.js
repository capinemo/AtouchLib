//= head.js

let atouch;

(function (global) {
    /**
     * @class ATOUCH
     * @description Global class for Atouch - in browser testing site library
     * @version 0.2.5
     */
    let ATOUCH = (function () {
        let domain  = '*',
            test_list = [],   // ! Список доступных тестов
            DI = null,
            Runner = null,
            Iface = null,
            Editor = null,
            Server = null,
            Unit = null,
            _;

        //= tests.js

        //= global/global.functions.js

        //= inject/inject.js

        //= lang/lang.js

        //= debug/debug.js

        //= storage/storage.js

        //= runner/runner.js

        //= iface/iface.js

        //= editor/editor.js

        //= server/server.js

        //= unit/unit.js

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
                
                document.addEventListener('StartTest', function (e) {
                    window.onunload = function () {
                        DI.saveTotalState(true);
                    };
                });
                
                document.addEventListener('FinishTest', function (e) {
                    window.onunload = function () {};
                });

                DI = new INJECT;

                DI.registerService('Lang', LANG);
                DI.registerService('Debug', DEBUG);
                DI.registerService('Storage', STORAGE);

                Runner = DI.createObject(RUNNER);
                Iface = DI.createObject(IFACE);
                Editor = DI.createObject(EDITOR);
                Server = DI.createObject(SERVER);
                Unit = DI.createObject(UNIT);

                DI.loadTotalState();

                if (Editor) {
                    window.parent.postMessage('atouch script ready', domain);
                }
                
                Runner.runTest();
            });

            return this;
        }

        return ATOUCH;
    })();

    (function () {
        global.atouch = new ATOUCH;
    })();
})(typeof window !== 'undefined' ? window : this);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {ATOUCH};
}