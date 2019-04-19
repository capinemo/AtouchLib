/**
 * @class SERVER
 * @description Atouch class for communicating with the server
 * @version 0.0.1
 */
let SERVER = (function () {
    let SL = null;

    /**
     * @constructor
     *
     * @returns {SERVER}             SERVER object
     */
    function SERVER () {
        if (STORAGE.prototype.Inject) {
            SL = STORAGE.prototype.Inject;
        }

        return this;
    }

    return SERVER;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {SERVER};
}