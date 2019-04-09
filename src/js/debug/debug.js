/**
 * @class DEBUG
 * @description Atouch debugging functions class
 * @version 0.0.1
 */
let DEBUG = (function () {
    /**
     * @constructor
     *
     * @returns {DEBUG}             DEBUG object
     */
    function DEBUG () {
        return this;
    }

    return DEBUG;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {DEBUG};
}