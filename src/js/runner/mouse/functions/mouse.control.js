/**
 * Checks that X coordinate don't go beyond page
 *
 * @private
 * 
 * @param {number} x        Abscissa of point
 * @returns {number}        New X coordinate
 */
function controlPageLimitsOnX (x) {
    if (typeof x !== 'number' || x <= 0) {
        x = 0;
    }

    if (x > maxWidthWithScroll) {
        // -1 to see part of the cursor, if it is gone from the page
        x = maxWidthWithScroll - 1;
    }

    return x;
}

/**
 * Checks that Y coordinate don't go beyond page
 *
 * @private
 * 
 * @param {number} y        Ordinate of point
 * @returns {number}        New Y coordinate
 */
function controlPageLimitsOnY (y) {
    if (typeof y !== 'number' || y <= 0) {
        y = 0;
    }

    if (y > maxHeightWithScroll) {
        // -1 to see part of the cursor, if it is gone from the page
        y = maxHeightWithScroll - 1;
    }

    return y;
}

/**
 * Checks that scrolling on X don't go beyond limits
 * 
 * @private
 * 
 * @param {number} x        Target scroll on X
 * @returns {number}        New corrected target scroll
 */
function controlScrollLimitsOnX (x) {
    if (typeof x !== 'number' || x <= 0) {
        x = 0;
    }

    if (x > maxWidthWithScroll - maxWidthVisible) {
        x = maxWidthWithScroll - maxWidthVisible;
    }

    return x;
}

/**
 * Checks that scrolling on Y don't go beyond limits
 * 
 * @private
 * 
 * @param {number} y        Target scroll on Y
 * @returns {number}        New corrected target scroll
 */
function controlScrollLimitsOnY (y) {
    if (typeof y !== 'number' || y <= 0) {
        y = 0;
    }

    if (y > maxHeightWithScroll - maxHeightVisible) {
        y = maxHeightWithScroll - maxHeightVisible;
    }

    return y;
}

/**
 * Check the scrolling need for getting element on page visible path
 * 
 * @private
 * 
 * @param {number} x        Target X coordinate of point
 * @returns {boolean}       Result of checking that scrolling is need
 */
function checkScrollByXIsNeed (x) {
    if (typeof x !== 'number') {
        x = 0;
    }

    if (x >= mouse.page_scroll_x + maxWidthVisible || x < mouse.page_scroll_x) {
        return true;
    }
    
    return false;
}

/**
 * Check the scrolling need for getting element on page visible path
 *
 * @param {number} y        Target Y coordinate of point
 * @return {boolean}        Result of checking that scrolling is need
 *
 * @private
 */
function checkScrollByYIsNeed (y) {
    if (typeof y !== 'number') {
        y = 0;
    }
    
    if (y >= mouse.page_scroll_y + maxHeightVisible || y < mouse.page_scroll_y) {
        return true;
    }
    
    return false;
}

/**
 * Returns the type of cursor depending on the object
 * 
 * @private
 * 
 * @param {HTMLElement} object      Target element for moving
 * @returns {string}                Cursor style for target element
 */
function getCursorStyle (object) {
    let tag = object.tagName,
        style = object.style.cursor,
        classes = getComputedStyle(object).cursor,
        name = 'default';

    if (typeof object !== 'object') {
        return;
    }

    name = classes;
    
    if (name === 'auto') {
        name = 'default';
    }

    return name;
}