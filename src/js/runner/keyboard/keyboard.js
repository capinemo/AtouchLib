/**
 * @class KEYBOARD
 * @description Atouch class for imitation keyboard events and actions
 * @version 0.0.9
 */
let KEYBOARD = (function () {
    let SL = null,
        gl_scp = null,
        events_arr = ['keydown', 'keypress', 'keyup'],
        spec_key = {},          // List of special keyboard keys and its codes
        keyboard = {
            altKey: false,
            ctrlKey: false,
            shiftKey: false,
            metaKey: false,
            repeat: false
        };

    //= ../runner.special.js

    //= functions/keyboard.print.js

    //= functions/keyboard.debug.js

    //= functions/keyboard.events.js

    //= functions/keyboard.analyze.js

    //= keyboard.commands.js

    /**
     * @constructor
     *
     * @returns {KEYBOARD}          KEYBOARD object
     */
    function KEYBOARD () {
        if (KEYBOARD.prototype.Inject) {
            SL = KEYBOARD.prototype.Inject;
        }

        if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
            gl_scp = window;
        } else {
            return this;
        }

        // activateKeyboardEventsListener();

        return this;
    }

    return KEYBOARD;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {KEYBOARD};
}