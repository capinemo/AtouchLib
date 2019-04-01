/**
 * @class INJECT
 * @description Service locator class
 * @version 0.1.0
 */

let INJECT = (function () {
    let services = {},
        states = {};

    /**
     * Register service in Service Locator scope and inject scope to service
     *
     * @public
     *
     * @param {string} name             Service name
     * @param {Object} classObject      Object registered as service
     * @returns {none}                  No return
     */
    INJECT.prototype.registerService = function (name, classObject) {
        if (typeof name === 'object' || typeof name === 'function') {
            throw new Error('Inject.registerService: invalid name given');
        }

        if (name === '') {
            throw new Error('Inject.registerService: empty name given');
        }

        if (typeof classObject !== 'function') {
            throw new Error('Inject.registerService: not function given as constructor');
        }

        name = filterVariable(name.toString(), '[^a-zA-Z0-9_-]');

        if (services[name]) {
            console.warn('Inject.registerService: given name ' + name + ' already exists. Rewrite service');
        }

        services[name] = new classObject;
    };

    /**
     * Checks that service with certan name is registered
     *
     * @public
     *
     * @param {string} name             Service name
     * @returns {Boolean}               Result of service searching
     */
    INJECT.prototype.isService = function (name) {
        if (!name) {
            throw new Error('Inject.isService: empty name given');
        }

        if (services[name]) {
            return true;
        }

        return false;
    };

    /**
     * Return service by name
     *
     * @public
     *
     * @param {string} name             Service name
     * @returns {Object}                Registered Object of class
     */
    INJECT.prototype.getService = function (name) {
        if (!name) {
            throw new Error('Inject.getService: empty name given');
        }

        if (!services[name]) {
            return false;
        }

        return services[name];
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

    /**
     * Load list of available tests
     *
     * @public
     *
     * @returns {array}         Available tests
     */
    INJECT.prototype.getAvailableTests = function () {
        return test_list;
    };

    /**
     * Running test selected in interface
     *
     * @public
     *
     * @param {string} test_id          Selected test id
     * @returns {none}                  No return
     */
    INJECT.prototype.runSelectedTest = function (test_id) {
        Runner.runTest(test_id);
    };

    /**
     * Restore total state and send to modules<br />
     * <br />
     * If module needs a restoring self state, it gives to Service Locator <br />
     * a self object, getter and setter. When Service Locator saves total <br />
     * state, it calls all getters in method saveTotalState and receives <br />
     * states of modules. When Service Locator load total state from <br />
     * Storage service, it calls all setters in method loadTotalState <br />
     * and sends to modules them last state. <br />
     * <br />
     * Used in restoring total state after page reloading or openning <br />
     * new pages with specific testing logic <br />
     *
     * @public
     *
     * @param {Object} instance         Module object
     * @param {Function} getter         State loading function
     * @param {Function} setter         State restoring function
     * @returns {none}                  No return
     */
    INJECT.prototype.setModuleStateCallback = function (instance, getter, setter) {
        states[instance.constructor.name] = {get: getter, set: setter, module: instance};
    };

    /**
     * Load state changes from modules and save total state
     *
     * @public
     *
     * @param {boolean} reload          Change state.progress to 'reload' before <br />
     *                                  reloading during test execution
     * @returns {none}                  No return
     */
    INJECT.prototype.saveTotalState = function (reload = false) {
        let global_state = {};

        for (let key in states) {
            global_state[key] = states[key]['get']();
        }

        if (reload && global_state.RUNNER) {
            global_state.RUNNER.progress = 'reload';
        }

        this.getService('Storage').saveState(global_state);
    };

    /**
     * Restore total state and send to modules
     *
     * @public
     *
     * @returns {none}                  No return
     */
    INJECT.prototype.loadTotalState = function () {
        if (!this.getService('Storage')) return;

        let global_state = this.getService('Storage').loadState();

        for (let key in global_state) {
            if (states[key]) {
                states[key]['set'](global_state[key]);
            }
        }
    };

    /**
     * Remove total state from storage
     *
     * @public
     *
     * @returns {none}                  No return
     */
    INJECT.prototype.cleanTotalState = function () {
        this.getService('Storage').cleanState();
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
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {INJECT};
}