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
    return Math.floor(Math.random() * (+max + 1 - +min)) + +min;
}