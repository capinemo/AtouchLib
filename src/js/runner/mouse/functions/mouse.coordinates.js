/**
 * Finds the element on given coordinates
 *
 * @private
 * 
 * @param {integer} x       Given X coordinate
 * @param {integer} y       Given Y coordinate 
 * @return {HTMLElement}    Element on specified point coordinate
 */
function getElementByCoordinates (x, y) {
    let x_on_visible,
        y_on_visible,
        x_scroll_target,
        y_scroll_target,
        return_object;

    x = controlPageLimitsOnX(x);
    y = controlPageLimitsOnY(y);

    x_scroll_target = checkScrollByXIsNeed(x) ? centerVisibleOnX(x) : mouse.page_scroll_x;
    y_scroll_target = checkScrollByYIsNeed(y) ? centerVisibleOnY(y) : mouse.page_scroll_y;

    scrollPageToCurrent(x_scroll_target, y_scroll_target);

    x_on_visible = Math.floor(mouse.current_x - mouse.page_scroll_x);
    y_on_visible = Math.floor(mouse.current_y - mouse.page_scroll_y);

    mouse.cursor.style.display = 'none';
    return_object = document.elementFromPoint(x_on_visible, y_on_visible);
    mouse.cursor.style.display = 'block';

    return return_object;
}

/**
 * Returns the new value of the scroll to center on the necessary coordinates
 *
 * @private
 * 
 * @param {number} x        Point X coordinate
 * @returns {number}        New scroll number
 */
function centerVisibleOnX (x) {
    let scroll;

    if (typeof x !== 'number') {
        x = 0;
    }

    if (x <= maxWidthVisible / 2) {
        scroll = 0;
    } else if (x > (maxWidthWithScroll - maxWidthVisible)) {
        scroll = maxWidthWithScroll - maxWidthVisible;
    } else {
        scroll = x - maxWidthVisible / 2;
    }

    return scroll;
}

/**
 * Returns the new value of the scroll to center on the necessary coordinates
 *
 * @private
 * 
 * @param {number} y        Point Y coordinate
 * @return {number}         New scroll number
 */
function centerVisibleOnY (y) {
    let scroll;

    if (typeof y !== 'number') {
        y = 0;
    }

    if (y <= maxHeightVisible / 2) {
        scroll = 0;
    } else if (y > (maxHeightWithScroll + maxHeightVisible / 2)) {
        scroll = maxHeightWithScroll - maxHeightVisible;
    } else {
        scroll = y - maxHeightVisible / 2;
    }

    return scroll;
}

/**
 * Calculate and set the coordinates with shift of vcursor center
 *
 * @private
 * 
 * @returns {none}          No return
 */
function setRealCenter () {
    let name = getCursorStyle(mouse.current_object);

    mouse.current_x = Math.floor(mouse.current_x - (constructor.cursor[name].xc - constructor.cursor[name].x0)),
    mouse.current_y = Math.floor(mouse.current_y - (constructor.cursor[name].yc - constructor.cursor[name].y0));

    name = null;
}

/**
 * Get coordinates for top-left and bottom-right element corners
 * 
 * @private
 * 
 * @param {HTMLElement} elem        Target HTML element
 * @return {Object}                 Object with coordinates of element corners, <br />
 *                                  {x0: [num], y0: [num], x1: [num], y1: [num]}
 */
function getElementCoordinates (elem) {
    let box,
        body,
        html,
        scroll_top,
        scroll_left,
        client_top,
        client_left,
        top = 0,
        left = 0;

    if (!elem || typeof elem !== 'object') {
        state.error = 22222;
        state.progress = 'error';
        return false;
    }

    if (elem.getBoundingClientRect) {
        box = elem.getBoundingClientRect();
        body = document.body;
        html = document.documentElement;

        scroll_top = window.pageYOffset || html.scrollTop || body.scrollTop;
        scroll_left = window.pageXOffset || html.scrollLeft || body.scrollLeft;

        client_top = html.clientTop || body.clientTop || 0;
        client_left = html.clientLeft || body.clientLeft || 0;

        top  = box.top + scroll_top - client_top;
        left = box.left + scroll_left - client_left;
    } else {
        while (elem) {
            top = top + parseFloat(elem.offsetTop);
            left = left + parseFloat(elem.offsetLeft);
            elem = elem.offsetParent;
        }
    }

    return {
        x0: Math.round(left),                       // left top corner
        y0: Math.round(top),                        // left top corner
        x1: elem.offsetWidth + Math.round(left),    // right bottom corner
        y1: elem.offsetHeight + Math.round(top)     // right bottom corner
    };
}

/**
 * Get element center coordinates
 * 
 * @private
 * 
 * @param {Object} object_coords        Object with coordinates of element corners <br />
 *                                      returned by getElementCoordinates
 * @return {Object|boolean}             Object with coordinates of center point, <br />
 *                                      {x: [num], y: [num]}
 */
function getCoordinatesCenter (object_coords) {
    if (typeof object_coords !== 'object'
            && !object_coords.hasOwnProperty('x1')
            && !object_coords.hasOwnProperty('x0')
            && !object_coords.hasOwnProperty('y1')
            && !object_coords.hasOwnProperty('y0')) {
        return false;
    }

    return {
        x: Math.round((object_coords.x1 - object_coords.x0) / 2) + object_coords.x0,
        y: Math.round((object_coords.y1 - object_coords.y0) / 2) + object_coords.y0
    };
}