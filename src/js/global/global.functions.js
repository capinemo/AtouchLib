/**
 * Makes first letter to uppercase, other letters to lowercase
 *
 * @private
 *
 * @param {string} str          Given string
 * @returns {string}            Converted string
 */
function capitalizeFirstLetter (str) {
    if (typeof str !== 'string') {
        throw new Error('capitalizeFirstLetter: not string given');
    }

    str = str.toLowerCase();
    return str.charAt(0).toUpperCase() + str.slice(1);
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
function getRandomInt (min, max) {
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
}

/**
 * Filtering given variable with sanitizing via RegExp
 *
 * @private
 *
 * @param {any} str             Given variable
 * @param {string} regex        Template string for RexExp constructor
 * @returns {any}               Clean variable
 */
function filterVariable (str, regex) {
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
}

/**
 * Generates new uuid with Crypto API
 *
 * @private
 *
 * @returns {string}            UUID
 */
function genUUID () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
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
function setRunOrder (mode = false) {
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
}

function validateCommandsBuffer () {
    let regex = {
        url: '[^-a-zA-Z0-9\.\,_\:\%\/\@]',
    }

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
    }

}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {filterVariable, genUUID, getRandomInt, capitalizeFirstLetter, setRunOrder};
}