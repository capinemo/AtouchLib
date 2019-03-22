/**
 * @class KEYBOARD
 * @description Atouch class for imitation keyboard events and actions
 * @version 0.0.9
 */
let KEYBOARD = (function () {
    let LocalInject = null,
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
     * @param {INJECT} inject       Global INJECT object
     * @returns {KEYBOARD}          KEYBOARD object
     */
    function KEYBOARD (inject = null) {
        if (inject) {
            LocalInject = inject;
        }

        // activateKeyboardEventsListener();

        return this;
    }

    return KEYBOARD;
})();