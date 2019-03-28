/**
 * @class TEST
 * @description Class for saving data of the single test
 * @version 0.1.0
 */
let TEST = (function () {
    let id = '',
        name = '',
        desc = '',
        chain = [];

    /**
     * Clear all data in the current test
     *
     * @public
     *
     * @param {string} name             Service name
     * @param {Object} classObject      Object registered as service
     * @returns {TEST}                  TEST object
     */
    TEST.prototype.reset = function () {
        id = '';
        name = '';
        desc = '';
        chain = [];

        return this;
    };

    /**
     * Sets id for new test
     *
     * @public
     *
     * @param {string} test_id          New test id
     * @returns {TEST}                  TEST object
     */
    TEST.prototype.id = function (test_id) {
        if (typeof test_id !== 'string') {
            throw new Error('Test.id: not string given in parameter');
        }

        if (test_id === '') {
            test_id = genUUID();
        }

        test_id = filterVariable(test_id, 'a-zA-Z0-9\-\_');

        id = test_id;
        return this;
    };

    /**
     * Sets name for new test
     *
     * @public
     *
     * @param {string} test_name        New test name
     * @returns {TEST}                  TEST object
     */
    TEST.prototype.name = function (test_name) {
        if (typeof test_name !== 'string') {
            throw new Error('Test.name: not string given in parameter');
        }

        if (test_name === '') {
            throw new Error('Test.name: empty string given');
        }

        test_name = filterVariable(test_name, 'a-zA-Z0-9\-\_');

        name = test_name;

        if (!id) {
            id = genUUID();
        }

        return this;
    };

    /**
     * Sets description for new test
     *
     * @public
     *
     * @param {string} test_desc        New name description
     * @returns {TEST}                  TEST object
     */
    TEST.prototype.desc = function (test_desc) {
        if (typeof test_desc !== 'string') {
            throw new Error('Test.description: not string given in parameter');
        }

        test_desc = filterVariable(test_desc, 'a-zA-Zа-яА-ЯёЁ0-9\-\_\.\, ');

        desc = test_desc;
        return this;
    };

    /**
     * Sets chain of commands for new test. Chain of commands receives from <br />
     * method Atouch.getCollectedTasks as Array.
     *
     * @public
     *
     * @param {ATOUCH} atouch           ATOUCH object
     * @returns {TEST}                  TEST object
     */
    TEST.prototype.chain = function (atouch) {
        if (!(atouch instanceof ATOUCH)) {
            throw new Error('Test.chain: not Atouch object given in parameter');
        }

        if (typeof atouch.getCollectedTasks !== 'function') {
            throw new Error('Test.chain: invalid interface of Atouch object. Need a getCollectedTasks function');
        }

        chain = atouch.getCollectedTasks();
        return this;
    };

    /**
     * Gets id of the current test
     *
     * @public
     *
     * @returns {string}                Current test id
     */
    TEST.prototype.getId = function () {
        return id;
    };

    /**
     * Gets name of the current test
     *
     * @public
     *
     * @returns {string}                Current test name
     */
    TEST.prototype.getName = function () {
        return name;
    };

    /**
     * Gets description of the current test
     *
     * @public
     *
     * @returns {string}                Current test description
     */
    TEST.prototype.getDesc = function () {
        return desc;
    };

    /**
     * Gets commands list of the current test
     *
     * @public
     *
     * @returns {Array}                 Current test chain
     */
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