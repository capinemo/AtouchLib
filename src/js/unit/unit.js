/**
 * @class UNIT
 * @description Atouch unit-tests class
 * @version 0.0.1
 */
let UNIT = (function () {
    let SL = null;
    
    /**
     * @constructor
     *
     * @returns {UNIT}        UNIT object
     */
    function UNIT () {
        if (STORAGE.prototype.Inject) {
            SL = STORAGE.prototype.Inject;
        }

        return this;
    }

    return UNIT;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {UNIT};
}