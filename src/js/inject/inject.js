/**
 * @class INJECT
 * @description Service locator class
 * @version 0.1.0
 */

let INJECT = (function () {
    let services = {},
        states = {};

    //= inject.services.js

    //= inject.functions.js

    /**
     * Creates new instance of class and injects self
     *
     * @public
     *
     * @param {Object} classObject      Object registered as service
     * @returns {Object}                Creaded instance of class
     */
    INJECT.prototype.createObject = function (classObject) {
        if (typeof classObject !== 'function') {
            throw new Error('Inject.createObject: given parameter not a function');
        }

        classObject.prototype.Inject = this;
        return new classObject;
    };

    /**
     * @constructor
     *
     * @returns {INJECT}              INJECT object
     */
    function INJECT () {
        return this;
    }

    return INJECT;
})(global);

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {INJECT};
}