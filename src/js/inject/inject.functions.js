/**
 * Register function in Service Locator scope
 *
 * @public
 *
 * @param {string} name             Service name
 * @param {Function} subroutine     Function registered as subroutine
 * @returns {none}                  No return
 */
INJECT.prototype.registerProcedure = function (name, subroutine) {
    if (typeof name === 'object' || typeof name === 'function') {
        throw new Error('Inject.registerProcedure: invalid name given');
    }

    if (name === '') {
        throw new Error('Inject.registerProcedure: empty name given');
    }

    if (typeof subroutine !== 'function') {
        throw new Error('Inject.registerProcedure: not function given as subroutines');
    }

    name = this.filterVariable(name.toString(), '[^a-zA-Z0-9_-]');

    if (functions[name] || INJECT.prototype.hasOwnProperty(name)) {
        throw new Error('Inject.registerProcedure: name of subroutine is used');
    }

    functions[name] = subroutine;

    INJECT.prototype[name] = subroutine;
};

/**
 * Checks that subroutine with certan name is registered
 *
 * @public
 *
 * @param {string} name             Subroutine name
 * @returns {Boolean}               Result of subroutine searching
 */
INJECT.prototype.isProcedure = function (name) {
    if (!name) {
        throw new Error('Inject.isProcedure: empty name given');
    }

    if (functions[name]) {
        return true;
    }

    return false;
};

/**
 * Return array with available subroutines names
 *
 * @public
 *
 * @returns {Array}                 List of available subroutines names
 */
INJECT.prototype.listProcedure = function () {
    let list = [];

    for (key in functions) {
        list.push(key);
    }

    return list;
};