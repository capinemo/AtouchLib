/**
 * @class DEBUG
 * @description Atouch debugging functions class
 * @version 0.0.1
 */
let DEBUG = (function () {
    let SL = null;

    /**
     *
     * @param {string} type         Type of writing
     * @param {Object} log          Object with log information
     * @returns {none}              No return
     */
    DEBUG.prototype.write = function (type, log) {
        if (!console[type]) {
            console.error(log);
        }
        console[type](log);
    };

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