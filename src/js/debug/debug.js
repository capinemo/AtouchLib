/**
 * @class DEBUG
 * @description Atouch debugging functions class
 * @version 0.0.1
 */
let DEBUG = (function () {
    let SL = null;

    /**
     * @constructor
     *
     * @returns {DEBUG}             DEBUG object
     */
    function DEBUG () {
        if (DEBUG.prototype.Inject) {
            SL = DEBUG.prototype.Inject;
        }

        return this;
    }

    return DEBUG;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {DEBUG};
}