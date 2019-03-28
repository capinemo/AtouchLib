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