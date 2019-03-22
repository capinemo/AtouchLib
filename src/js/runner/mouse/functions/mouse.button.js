/**
 * Simulate focus on element and mouse click
 *
 * @private
 *
 * @param {HTMLElement} object      Target HTML element
 * @returns {none}                  No return
 */
function mouseClick (object) {
    emulateMouseEvents(object, 'mousedown');
    document.activeElement.blur();
    emulateMouseEvents(object, 'focus');
    emulateMouseEvents(object, 'mouseup');
    emulateMouseEvents(object, 'click');
    
    let timerId = setTimeout(function () { 
        clearTimeout(timerId);
        state.progress = 'click';
    }, 100);
}

/**
 * Simulate focus on element and mouse double click
 *
 * @private
 *
 * @param {HTMLElement} object      Target HTML element
 * @returns {none}                  No return
 */
function mouseDoubleClick (object) {
    emulateMouseEvents(object, 'mousedown');
    document.activeElement.blur();
    emulateMouseEvents(object, 'focus');
    emulateMouseEvents(object, 'mouseup');
    emulateMouseEvents(object, 'click');
    emulateMouseEvents(object, 'mousedown');
    emulateMouseEvents(object, 'mouseup');
    emulateMouseEvents(object, 'click');
    
    // TODO: handle text selection in double and triple click
    /* if (typeof object.select === 'function') {
        object.select();
    } */

    let timerId = setTimeout(function () { 
        clearTimeout(timerId);
        state.progress = 'dblclick';
    }, 100);
}

/**
 * Simulate mousedown on element
 *
 * @private
 *
 * @param {HTMLElement} object      Target HTML element
 * @returns {none}                  No return
 */
function mouseDown (object) {
    emulateMouseEvents(object, 'mousedown');
    document.activeElement.blur();
    emulateMouseEvents(object, 'focus');

    let timerId = setTimeout(function () { 
        clearTimeout(timerId);
        state.progress = 'down';
    }, 100);
}


/**
 * Simulate mouseup on element
 *
 * @private
 *
 * @param {HTMLElement} object      Target HTML element
 * @returns {none}                  No return
 */
function mouseUp (object) {
    emulateMouseEvents(object, 'mouseup');

    let timerId = setTimeout(function () { 
        clearTimeout(timerId);
        state.progress = 'up';
    }, 100);
}


/**
 * Simulate focus on element
 *
 * @private
 *
 * @param {HTMLElement} object      Target HTML element
 * @returns {none}                  No return
 */
function mouseFocus (object) {
    document.activeElement.blur();
    emulateMouseEvents(object, 'focus');
    
    let timerId = setTimeout(function () { 
        clearTimeout(timerId);
        state.progress = 'focus';
    }, 100);
}

function mouseSelect (object) {
    let selected = null;

    /* _emulateMouseEvents(object, 'mousedown');
    document.activeElement.blur();
    _emulateMouseEvents(object, 'focus');
    _emulateMouseEvents(object, 'mouseup');
    _emulateMouseEvents(object, 'click');

    if (!_buffer
            && (Object.prototype.toString.call(_buffer) === '[object Array]'
            || Object.prototype.toString.call(_buffer) === '[object String]')) {
        _message.err('Nothing select', 500);
        _mouse.state = 'error';
        _buffer = null;
        return;
    };

    for (let i = object.length; i--; ) {

        if (_buffer.indexOf(object[i].value) !== -1) {
            _emulateMouseEvents(object[i], 'mousedown');
            _emulateMouseEvents(object[i], 'mouseup');
            _emulateMouseEvents(object[i], 'click');
            object[i].selected = true;
            selected += 1;
        };
    };

    if (Object.prototype.toString.call(_buffer) === '[object String]' && selected) {
        _mouse.state = 'select';
    } else if (Object.prototype.toString.call(_buffer) === '[object Array]'
            && _buffer.length === selected) {
        _mouse.state = 'select';
    } else {
        _message.err('Nothing select', 501);
        _mouse.state = 'error';
    };

    _buffer = null; */
    
    state.progress = 'select';
}

