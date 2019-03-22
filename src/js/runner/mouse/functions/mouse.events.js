
/**
 * Generate and activate mouse event
 *
 * @private
 *
 * @param {HTMLElement} object      Object for mouse event generating
 * @param {string} event            Type of mouse event
 * @returns {none}                  No return
 */
function emulateMouseEvents (object, event) {
    let events_arr = [
            'click', 'dblclick'
            , 'mouseover', 'mouseout', 'mouseup', 'mousedown'
            , 'focus', 'mousemove', 'mouseenter', 'mouseleave'
            , 'focusin', 'focusout'
        ],
        evt;

    // ! TODO: need to add polyfill for MouseEvent
    if (!~events_arr.indexOf(event)) {
        return;
    }

    evt = new MouseEvent(event, {
        'view': window,
        'bubbles': true,
        'cancelable': true,
        'button': 0,
        'clientX': mouse.current_x,
        'clientY': mouse.current_y,
        'composed': -1,
        'isTrusted': -1,
        'layerX': -1,
        'layerY': -1,
        'movementX': -1,
        'movementY': -1,
        'mozInputSource': -1,
        'offsetX': -1,
        'offsetY': -1,
        'screenX': -1,
        'screenY': -1,
        'which': 1
    });

    if (typeof object.dispatchEvent === 'function') {
        object.dispatchEvent(evt);

        if (event === 'focus' && typeof object.focus === 'function') {
            object.focus();
        }
    }
}

/**
 * Loads event listeners of the Mouse object
 *
 * @private
 *
 * @param {MOUSE} Mouse             MOUSE object 
 * @returns {none}                  No return
 */
function loadEventListeners (Mouse) {
    window.addEventListener('resize', function () {
        Mouse.getPageParameters();
    }, true);    
}