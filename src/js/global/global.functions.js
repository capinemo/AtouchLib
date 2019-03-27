/**
 * Calculates page size with scrolls
 *
 * @private
 *
 * @returns {Object}              Object {x:0, y:0} with scroll sizes
 */
function getPageScroll () {
    return {
        x: window.pageXOffset || document.documentElement.scrollLeft,
        y: window.pageYOffset || document.documentElement.scrollTop
    };
}

/**
 * Makes first letter to uppercase, other letters to lowercase
 *
 * @private
 *
 * @param {string} str          Given string
 * @returns {string}            Converted string
 */
function capitalizeFirstLetter (str) {
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
        throw new Error('Functions: needed parameter not given');
    }
    
    if (typeof min !== 'number' || typeof max !== 'number') {
        throw new Error('Functions: parameters must have a integer type');
    }
    
    if (min > max) {
        throw new Error('Functions: second number must be more than first');
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
    let reg = new RegExp('[^' + regex + ']', 'g');

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
            v = c == 'x' ? r : (r & 0x3 | 0x8);
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
    coms_buffer.forEach(function (item, key, arr) {
        arr[key].mode = mode ? 'async' : 'sync';
    });
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {filterVariable, genUUID, getRandomInt, capitalizeFirstLetter, setRunOrder};
}