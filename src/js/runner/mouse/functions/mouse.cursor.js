/**
 * Create virtual cursor in browser
 *
 * @private
 *
 * @returns {none}                  No return
 */
function createVirtualCursor () {
    let cursor = gl_scp.document.createElement('div'),
        scroll = SL ? SL.getPageScroll() : {x: 0, y: 0};

    mouse.page_scroll_x = scroll.x;
    mouse.page_scroll_y = scroll.y;
    mouse.current_x = maxWidthVisible / 2;
    mouse.current_y = maxHeightVisible / 2;

    cursor.style.position = 'absolute';
    cursor.style.backgroundImage = 'url(' + constructor.cursor.img + ')';
    cursor.style.backgroundRepeat = 'no-repeat';
    cursor.style.zIndex = '100';
    cursor.dataset.owner = 'atouch';
    cursor.id = 'atouch_virtual_cursor';

    gl_scp.document.body.appendChild(cursor);

    mouse.cursor = cursor;
    mouse.current_object = getElementByCoordinates(mouse.current_x, mouse.current_y);
    changeVirtualCursor(mouse.current_object);

    cursor = null;
}

/**
 * Change virtual cursor depending on the object
 *
 * @private
 *
 * @param {HTMLElement} object      Element under cursor
 * @returns {none}                  No return
 */
function changeVirtualCursor (object) {
    let height, width, top, left;
    if (typeof object !== 'object') {
        // _createDump();
        return;
    }

    mouse.name = getCursorStyle(object);

    width = constructor.cursor[mouse.name].x1 - constructor.cursor[mouse.name].x0;
    height = constructor.cursor[mouse.name].y1 - constructor.cursor[mouse.name].y0;
    left = Math.floor(mouse.current_x - (constructor.cursor[mouse.name].xc
            - constructor.cursor[mouse.name].x0));
    top = Math.floor(mouse.current_y - (constructor.cursor[mouse.name].yc
            - constructor.cursor[mouse.name].y0));

    mouse.cursor.style.left = left + 'px';
    mouse.cursor.style.top = top + 'px';
    mouse.cursor.style.height = height + 'px';
    mouse.cursor.style.width = width + 'px';
    mouse.cursor.style.backgroundPosition = -constructor.cursor[mouse.name].x0 + 'px '
            + -constructor.cursor[mouse.name].y0 + 'px';
}