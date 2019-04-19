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
        if (UNIT.prototype.Inject) {
            SL = UNIT.prototype.Inject;
        }

        return this;
    }

    return UNIT;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {UNIT};
}