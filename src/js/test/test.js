/**
 * @class TEST
 * @description Class for saving data of the single test
 * @version 0.1.0
 */
let TEST = (function () {
    let id_buf = '',
        name_buf = '',
        desc_buf = '',
        chain_buf = [],
        SL = null;

    /**
     * Clear all data in the current test
     *
     * @public
     *
     * @returns {TEST}              TEST object
     */
    TEST.prototype.reset = function () {
        id_buf = '';
        name_buf = '';
        desc_buf = '';
        chain_buf = [];

        return this;
    };

    /**
     * Sets id for new test
     *
     * @public
     *
     * @param {string} test_id      New test id
     * @returns {TEST}              TEST object
     */
    TEST.prototype.id = function (test_id) {
        if (typeof test_id !== 'string') {
            throw new Error('Test.id: not string given in parameter');
        }

        if (test_id === '' && SL) {
            test_id = SL.genUUID();
        }

        if (SL) {
            test_id = SL.filterVariable(test_id, '[^a-zA-Z0-9\-\_]');
        }

        id_buf = test_id;
        return this;
    };

    /**
     * Sets name for new test
     *
     * @public
     *
     * @param {string} test_name    New test name
     * @returns {TEST}              TEST object
     */
    TEST.prototype.name = function (test_name) {
        if (typeof test_name !== 'string') {
            throw new Error('Test.name: not string given in parameter');
        }

        if (test_name === '') {
            throw new Error('Test.name: empty string given');
        }

        if (SL) {
            test_name = SL.filterVariable(test_name, '[^a-zA-Z0-9\-\_]');
        }

        name_buf = test_name;

        if (!id_buf && SL) {
            id_buf = SL.genUUID();
        }

        return this;
    };

    /**
     * Sets description for new test
     *
     * @public
     *
     * @param {string} test_desc    New name description
     * @returns {TEST}              TEST object
     */
    TEST.prototype.desc = function (test_desc) {
        if (typeof test_desc !== 'string') {
            throw new Error('Test.description: not string given in parameter');
        }

        if (SL) {
            test_desc = SL.filterVariable(test_desc, '[^a-zA-Zа-яА-ЯёЁ0-9\-\_\.\, ]');
        }

        desc_buf = test_desc;
        return this;
    };

    /**
     * Sets chain of commands for new test. Chain of commands receives from <br />
     * method Atouch.getCollectedTasks as Array.
     *
     * @public
     *
     * @param {ATOUCH} Atouch       ATOUCH object
     * @returns {TEST}              TEST object
     */
    TEST.prototype.chain = function (Atouch) {
        if (!(Atouch instanceof ATOUCH)) {
            throw new Error('Test.chain: not Atouch object given in parameter');
        }

        if (typeof Atouch.getCollectedTasks !== 'function') {
            throw new Error('Test.chain: invalid interface of Atouch object. Need a getCollectedTasks function');
        }

        chain_buf = Atouch.getCollectedTasks();
        return this;
    };

    /**
     * Gets id of the current test
     *
     * @public
     *
     * @returns {string}            Current test id
     */
    TEST.prototype.getId = function () {
        return id_buf;
    };

    /**
     * Gets name of the current test
     *
     * @public
     *
     * @returns {string}            Current test name
     */
    TEST.prototype.getName = function () {
        return name_buf;
    };

    /**
     * Gets description of the current test
     *
     * @public
     *
     * @returns {string}            Current test description
     */
    TEST.prototype.getDesc = function () {
        return desc_buf;
    };

    /**
     * Gets commands list of the current test
     *
     * @public
     *
     * @returns {Array}             Current test chain
     */
    TEST.prototype.getChain = function () {
        return chain_buf;
    };

    /**
     * @constructor
     *
     * @returns {TEST}              TEST object
     */
    function TEST () {
        if (TEST.prototype.Inject && TEST.prototype.Inject.filterVariable
                && TEST.prototype.Inject.genUUID) {
            SL = TEST.prototype.Inject;
        }

        return this;
    }

    return TEST;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {TEST};
}