/**
 * @class INJECT
 * @description Service locator class
 * @version 0.1.0
 */

let INJECT = (function () {
    let services = {},
        functions = {};

    /**
     * Filtering given variable with sanitizing via RegExp
     *
     * @private
     *
     * @param {any} str             Given variable
     * @param {string} regex        Template string for RexExp constructor
     * @returns {any}               Clean variable
     */
    INJECT.prototype.filterVariable = function (str, regex) {
        if (!regex) {
            regex = '[^\s\S]';
        }

        let reg = new RegExp(regex.toString(), 'g');

        if (typeof str === 'boolean') {
            return !!str;
        } else if (typeof str === 'number') {
            return +(str.toString().replace(reg, ''));
        } else if (typeof str === 'string') {
            return str.toString().replace(reg, '');
        } else if (typeof str === 'undefined') {
            return;
        } else if (str === null) {
            return null;
        } else {
            return str;
        }
    };

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

    //= inject.services.js

    //= inject.functions.js

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