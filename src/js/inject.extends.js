/**
 * Calculates page size with scrolls
 *
 * @private
 *
 * @returns {Object}              Object {x:0, y:0} with scroll sizes
 */
if (!SL.isProcedure('getPageScroll')) {
    SL.registerProcedure('getPageScroll', function () {
        if (typeof global.document === 'undefined') {
            return {x: 0, y: 0};
        }

        return {
            x: window.pageXOffset || document.documentElement.scrollLeft,
            y: window.pageYOffset || document.documentElement.scrollTop
        };
    });
}

/**
 * Makes first letter to uppercase, other letters to lowercase
 *
 * @private
 *
 * @param {string} str          Given string
 * @returns {string}            Converted string
 */
if (!SL.isProcedure('capitalizeFirstLetter')) {
    SL.registerProcedure('capitalizeFirstLetter', function (str) {
        if (typeof str !== 'string') {
            throw new Error('capitalizeFirstLetter: not string given');
        }

        str = str.toLowerCase();
        return str.charAt(0).toUpperCase() + str.slice(1);
    });
}

/**
 * Generate random integer between limits
 *
 * @private
 *
 * @param {integer} min         Minimal integer in range
 * @param {integer} max         Maximal integer in range
 * @returns {integer}           Generated number
 */
if (!SL.isProcedure('getRandomInt')) {
    SL.registerProcedure('getRandomInt', function (min, max) {
        if (typeof min === 'undefined' || typeof max === 'undefined') {
            throw new Error('getRandomInt: needed parameter not given');
        }

        if (typeof min !== 'number' || typeof max !== 'number') {
            throw new Error('getRandomInt: parameters must have a integer type');
        }

        if (min > max) {
            throw new Error('getRandomInt: second number must be more than first');
        }

        return Math.floor(Math.random() * (+max + 1 - +min)) + +min;
    });
}

/**
 * Generates new uuid with Crypto API
 *
 * @private
 *
 * @returns {string}            UUID
 */
if (!SL.isProcedure('genUUID')) {
    SL.registerProcedure('genUUID', function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    });
}

/**
 * Sets execution mode to all commands in buffer
 *
 * @private
 *
 * @param {boolean} mode        true = async/false == sync (default: sync)
 * @returns {none}              No return
 */
if (!SL.isProcedure('setRunOrder')) {
    SL.registerProcedure('setRunOrder', function (mode = false) {
        if (typeof coms_buffer === 'undefined') {
            return;
        }

        if (!(coms_buffer instanceof Array)) {
            throw new Error('setRunOrder: need a array');
        }

        coms_buffer.forEach(function (item, key, arr) {
            if (typeof arr[key] === 'object') {
                arr[key].mode = mode ? 'async' : 'sync';
            }
        });
    });
}

/**
 * Load saved state of Atouch from cookie
 *
 * @private
 *
 * @param {string} name         Cookie name
 * @returns {string|null}       Data with saved state from cookie
 */
if (!SL.isProcedure('getCookieContent')) {
    SL.registerProcedure('getCookieContent', function (name) {
        let matches;

        if (typeof name !== 'string') {
            return null;
        }

        if (typeof global.document === 'undefined') {
            return null;
        }

        matches = global.document.cookie.match(new RegExp('(?:^|; )'
            + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')
            + '=([^;]*)'
        ));

        if (matches.length === 1 || matches[1] === '') {
            return null;
        }

        return matches ? decodeURIComponent(matches[1]) : undefined;
    });
}

/**
 * Remove cookie with saved state of Atouch
 *
 * @private
 *
 * @param {string} name         Cookie name
 * @returns {none}              No return
 */
if (!SL.isProcedure('clearCookieContent')) {
    SL.registerProcedure('clearCookieContent', function (name) {
        if (typeof global.document === 'undefined') {
            return {x: 0, y: 0};
        }

        global.document.cookie = name + '=;path=/;expires=-1';
    });
}

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
if (!SL.isProcedure('setModuleStateCallback')) {
    SL.registerProcedure('setModuleStateCallback', function (instance, getter, setter) {
        callbacks[instance.constructor.name] = {get: getter, set: setter, module: instance};
    });
}

/**
 * Load state changes from modules and save total state
 *
 * @public
 *
 * @param {boolean} reload          Change state.progress to 'reload' before <br />
 *                                  reloading during test execution
 * @returns {none}                  No return
 */
if (!SL.isProcedure('saveTotalState')) {
    SL.registerProcedure('saveTotalState', function (reload = false) {
        if (!this.isService('Storage')) return;

        let global_state = {};

        for (let key in callbacks) {
            global_state[key] = callbacks[key]['get']();
        }

        if (reload && global_state.RUNNER) {
            global_state.RUNNER.progress = 'reload';
        }

        this.Service('Storage').saveState(global_state);
    });
}

/**
 * Restore total state and send to modules
 *
 * @public
 *
 * @returns {none}                  No return
 */
if (!SL.isProcedure('loadTotalState')) {
    SL.registerProcedure('loadTotalState', function () {
        if (!this.isService('Storage')) return;

        let global_state = this.Service('Storage').loadState();

        for (let key in global_state) {
            if (callbacks[key]) {
                callbacks[key]['set'](global_state[key]);
            }
        }
    });
}

/**
 * Remove total state from storage
 *
 * @public
 *
 * @returns {none}                  No return
 */
if (!SL.isProcedure('cleanTotalState')) {
    SL.registerProcedure('cleanTotalState', function () {
        if (!this.isService('Storage')) return;

        this.Service('Storage').cleanState();
    });
}

/**
 * Running test selected in interface
 *
 * @public
 *
 * @param {string} test_id          Selected test id
 * @returns {none}                  No return
 */
if (!SL.isProcedure('runSelectedTest')) {
    SL.registerProcedure('runSelectedTest', function (test_id) {
        Runner.runTest(test_id);
    });
}

/**
 * Load list of available tests
 *
 * @public
 *
 * @returns {array}         Available tests
 */
if (!SL.isProcedure('getAvailableTests')) {
    SL.registerProcedure('getAvailableTests', function () {
        return []; // ! TODO
    });
}

/**
 * Validation and checking actions list from coms_buffer
 *
 * @private
 *
 * @returns {boolean}           True if success
 */
if (!SL.isProcedure('validateCommandsBuffer')) {
    SL.registerProcedure('validateCommandsBuffer', function () {
        let regex = {
            url: '[^-a-zA-Z0-9\.\,_\:\%\/\@]',
        };

        let total = {
            go: {
                type: 'string',
                regex: regex.url
            },
            reload: {
                type: null
            },
            back: {
                type: null
            },
            forward: {
                type: null
            },
            exists: {
                type: 'object',
                target: 'one'
            },
            check: {
                type: 'object',
                target: 'any'
            },
            csscheck : {
                type: 'object'
            },
            jscheck : {
                type: 'object'
            },
            cookcheck : {
                type: 'object'
            },
            cookdel : {
                type: 'string'
            },
            print : {
                type: 'object'
            },
            fill : {
                type: 'object'
            },
            clear : {
                type: 'object'
            },
            click : {
                type: 'object'
            },
            dblclick : {
                type: 'object'
            },
            down : {
                type: 'object'
            },
            up : {
                type: 'object'
            },
            focus : {
                type: 'object'
            },
            move : {
                type: 'object'
            },
            scrollby : {
                type: 'object'
            },
            scrollto : {
                type: 'object'
            },
            attach : {
                type: 'object'
            },
            come : {
                type: 'object'
            },
            leave : {
                type: 'object'
            },
            over : {
                type: 'object'
            },
            out : {
                type: 'object'
            },
            pull : {
                type: 'object'
            },
            mark : {
                type: 'object'
            },
            select : {
                type: 'object'
            }
        };
    });
}