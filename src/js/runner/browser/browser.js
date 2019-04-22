/**
 * @class BROWSER
 * @description Atouch class for imitation browser events, functions and actions
 * @version 0.0.9
 */
let BROWSER = (function () {
    let SL = null;

    //= browser.commands.js

    /**
     * @constructor
     *
     * @returns {BROWSER}           BROWSER object
     */
    function BROWSER () {
        if (BROWSER.prototype.Inject) {
            SL = BROWSER.prototype.Inject;
        }

        return this;
    }

    return BROWSER;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {BROWSER};
}