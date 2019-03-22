/**
 * Instantly scrolls the page to coordinates
 *
 * @private
 *
 * @param {number} x        Abscissa scroll target value
 * @param {number} y        Ordinate scroll target value
 * @returns {none}          No return
 */
function scrollPageToCurrent (x, y) {
    mouse.page_scroll_x = x;
    mouse.page_scroll_y = y;

    window.scrollTo(mouse.page_scroll_x, mouse.page_scroll_y);
}

/**
 * Animate scrolls the page to coordinates
 *
 * @private
 *
 * @param {number} x        Abscissa scroll target value
 * @param {number} y        Ordinate scroll target value
 * @returns {none}          No return
 */
function scrollPageToPositionAsync (x, y) {
    let start_x = mouse.page_scroll_x,
        start_y = mouse.page_scroll_y,
        iter_x,
        iter_y;

    x = (typeof x !== 'number') ? 0 : x;
    y = (typeof y !== 'number') ? 0 : y;

    x = controlScrollLimitsOnX(x);
    y = controlScrollLimitsOnY(y);

    iter_x = (x - mouse.page_scroll_x) / scroll_speed;
    iter_y = (y - mouse.page_scroll_y) / scroll_speed;

    animateMouse(
        function () {
            mouse.page_scroll_x = Math.ceil(mouse.page_scroll_x + iter_x);
            mouse.page_scroll_y = Math.ceil(mouse.page_scroll_y + iter_y);
            window.scrollTo(mouse.page_scroll_x, mouse.page_scroll_y);
            // mouse.state = 'scroll';
        }
        , scroll_speed
        , function () {
            mouse.page_scroll_x = start_x + iter_x * scroll_speed;
            mouse.page_scroll_y = start_y + iter_y * scroll_speed;
            window.scrollTo(mouse.page_scroll_x, mouse.page_scroll_y);
            // mouse.state = 'stop';
            state.progress = 'ready';
        }
    );
}


/**
 * Animate scrolls the page relative to the current coordinates
 *
 * @private
 *
 * @param {number} x        Abscissa scroll target value
 * @param {number} y        Ordinate scroll target value
 * @returns {none}          No return
 */
function scrollPageInCountAsync (x, y) {
    let start_x = mouse.page_scroll_x,
        start_y = mouse.page_scroll_y,
        iter_x,
        iter_y;

    x = (typeof x !== 'number') ? 0 : x;
    y = (typeof y !== 'number') ? 0 : y;

    x = controlScrollLimitsOnX(mouse.page_scroll_x + x) - mouse.page_scroll_x;
    y = controlScrollLimitsOnY(mouse.page_scroll_y + y) - mouse.page_scroll_y;

    iter_x = x / scroll_speed;
    iter_y = y / scroll_speed;

    animateMouse(
        function () {
            mouse.page_scroll_x = Math.ceil(mouse.page_scroll_x + iter_x);
            mouse.page_scroll_y = Math.ceil(mouse.page_scroll_y + iter_y);
            window.scrollTo(mouse.page_scroll_x, mouse.page_scroll_y);
            // mouse.state = 'scroll';
        }
        , scroll_speed
        , function () {
            mouse.page_scroll_x = start_x + iter_x * scroll_speed;
            mouse.page_scroll_y = start_y + iter_y * scroll_speed;
            window.scrollTo(mouse.page_scroll_x, mouse.page_scroll_y);
            // mouse.state = 'stop';
            state.progress = 'ready';
        }
    );
}