/**
 * @class TEST
 * @description Atouch class generating test via script
 * @version 0.0.1
 */
let TEST = (function () {
    let id = '',
        name = '',
        desc = '',
        chain = [];


    TEST.prototype.reset = function () {
        id = '';
        name = '';
        desc = '';
        chain = [];

        return this;
    };

    /**
     * Running test selected in interface
     *
     * @public
     *
     * @param {string} test_id          Selected test id
     * @returns {none}                  No return
     */
    TEST.prototype.id = function (test_id) {
        // TODO sanitize and filter

        id = test_id;
        return this;
    };

    TEST.prototype.name = function (test_name) {
        // TODO sanitize and filter

        name = test_name;

        if (!id) {
            id = genUUID();
        }

        return this;
    };

    TEST.prototype.desc = function (test_desc) {
        // TODO sanitize and filter

        desc = test_desc;
        return this;
    };

    TEST.prototype.chain = function (atouch) {
        // TODO sanitize and filter

        //chain = atouch.getCollectedTasks();
        return this;
    };

    TEST.prototype.getId = function () {
        return id;
    };

    TEST.prototype.getName = function () {
        return name;
    };

    TEST.prototype.getDesc = function () {
        return desc;
    };

    TEST.prototype.getChain = function () {
        return chain;
    };

    /**
     * @constructor
     *
     * @returns {TEST}             TEST object
     */
    function TEST () {
        return this;
    }

    return TEST;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {TEST};
}