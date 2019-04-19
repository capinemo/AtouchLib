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

    if (typeof classObject !== 'object') {
        throw new Error('Inject.registerService: not object given as service');
    }

    name = this.filterVariable(name.toString(), '[^a-zA-Z0-9_-]');

    if (services[name]) {
        console.warn('Inject.registerService: given name ' + name + ' already exists. Rewrite service');
    }

    services[name] = classObject;
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
 * Return array with available services names
 *
 * @public
 *
 * @returns {Array}                 List of available services names
 */
INJECT.prototype.listService = function () {
    let list = [];

    for (key in services) {
        list.push(key);
    }

    return list;
};

/**
 * Return service by name
 *
 * @public
 *
 * @param {string} name             Service name
 * @returns {Object}                Registered Object of class
 */
INJECT.prototype.Service = function (name) {
    if (!name) {
        throw new Error('Inject.Service: empty name given');
    }

    if (!services[name]) {
        throw new Error('Inject.Service: service not exists');
    }

    return services[name];
};