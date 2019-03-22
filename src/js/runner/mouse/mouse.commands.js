/**
 * Click to element
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.click = function (data, success, error) {
    let target_object;

    waitPhaseFinish('ready', function () {
        mouseClick(target_object);
    });
    waitPhaseFinish('click', success, true);
    waitPhaseFinish('error', error, true);

    if (state.progress === 'reload') {
        state.progress = 'click';
    } else if (!data) {
        state.error = 2202;
        state.progress = 'error';
    } else {
        target_object = getElementObject(data);
        
        if (target_object === null) {
            state.error = 4002;
            state.progress = 'error';
        } else if (target_object === false) {
            state.error = 4003;
            state.progress = 'error';
        } else {
            changeMousePosition(data);
        }
    }
};

/**
 * Double click to element
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.dblclick = function (data, success, error) {
    let target_object;

    waitPhaseFinish('ready', function () {
        mouseDoubleClick(target_object);
    });
    waitPhaseFinish('dblclick', success, true);
    waitPhaseFinish('error', error, true);

    if (state.progress === 'reload') {
        state.progress = 'dblclick';
    } else if (!data) {
        state.error = 2202;
        state.progress = 'error';
    } else {
        target_object = getElementObject(data);
        
        if (target_object === null) {
            state.error = 4002;
            state.progress = 'error';
        } else if (target_object === false) {
            state.error = 4003;
            state.progress = 'error';
        } else {
            changeMousePosition(data);
        }
    }
};

/**
 * Mouse left button press to element
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.down = function (data, success, error) {
    let target_object;

    waitPhaseFinish('ready', function () {
        mouseDown(target_object);
    });
    waitPhaseFinish('down', success, true);
    waitPhaseFinish('error', error, true);

    if (state.progress === 'reload') {
        state.progress = 'down';
    } else if (!data) {
        state.error = 2202;
        state.progress = 'error';
    } else {
        target_object = getElementObject(data);
        
        if (target_object === null) {
            state.error = 4002;
            state.progress = 'error';
        } else if (target_object === false) {
            state.error = 4003;
            state.progress = 'error';
        } else {
            changeMousePosition(data);
        }
    }
};

/**
 * Command: release pressed mouse
 * Mouse left button release pressed on element
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.up = function (data, success, error) {
    let target_object;

    waitPhaseFinish('ready', function () {
        mouseUp(target_object);
    });
    waitPhaseFinish('up', success, true);
    waitPhaseFinish('error', error, true);

    if (state.progress === 'reload') {
        state.progress = 'up';
    } else if (!data) {
        state.error = 2202;
        state.progress = 'error';
    } else {
        target_object = getElementObject(data);
        
        if (target_object === null) {
            state.error = 4002;
            state.progress = 'error';
        } else if (target_object === false) {
            state.error = 4003;
            state.progress = 'error';
        } else {
            changeMousePosition(data);
        }
    }
};

/**
 * Focus on element
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.focus = function (data, success, error) {
    let target_object;

    waitPhaseFinish('ready', function () {
        mouseFocus(target_object);
    });
    waitPhaseFinish('focus', success, true);
    waitPhaseFinish('error', error, true);

    if (state.progress === 'reload') {
        state.progress = 'focus';
    } else if (!data) {
        state.error = 2202;
        state.progress = 'error';
    } else {
        target_object = getElementObject(data);
        
        if (target_object === null) {
            state.error = 4002;
            state.progress = 'error';
        } else if (target_object === false) {
            state.error = 4003;
            state.progress = 'error';
        } else {
            changeMousePosition(data);
        }
    }
};

/**
 * Move cursor over element or on coordinates
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.move = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);

    if (!data) {
        state.error = 2202;
        state.progress = 'error';
    } else if (data.hasOwnProperty('id') || data.hasOwnProperty('tag')
        || data.hasOwnProperty('class') || data.hasOwnProperty('name')) {
        changeMousePosition(data);
    } else if (data.hasOwnProperty('x') && data.hasOwnProperty('y')) {
        moveToCoordinates(data.x, data.y);
    } else {
        state.error = 2201;
        state.progress = 'error';
    }
};

/**
 * Page scrolling by scrollBy
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.scrollby = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);

    if (!data) {
        state.error = 2222;
        state.progress = 'error';
    } else if (!data.hasOwnProperty('x') || !data.hasOwnProperty('y')) {
        state.error = 2221;
        state.progress = 'error';
    } else {
        scrollPageInCountAsync(data.x, data.y);
    }
};

/**
 * Page scrolling by scrollTo
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.scrollto = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);

    if (!data) {
        state.error = 2222;
        state.progress = 'error';
    } else if (!data.hasOwnProperty('x') || !data.hasOwnProperty('y')) {
        state.error = 2221;
        state.progress = 'error';
    } else {
        scrollPageToPositionAsync(data.x, data.y);
    }
};

/**
 * Page scrolling by scrollTo
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.attach = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
};

/**
 * Put selected file name in file attaching input
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.attach = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
};

/**
 * Emulation input vcursor over the element without ascent
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.come = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
};

/**
 * Emulation leaving the vcursor the element without ascent
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.leave = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
};

/**
 * Emulation input vcursor over the element with ascent
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.over = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
};

/**
 * Emulation leaving the vcursor the element with ascent
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.out = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
};

/**
 * Emulation drag and drop element on page
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.pull = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
};

/**
 * Emulation drag and drop element on page
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.mark = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
};

/**
 * Emulation working with selector elements (range, select)
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
MOUSE.prototype.select = function (data, success, error) {
    let target_object;

    waitPhaseFinish('ready', function () {
        mouseSelect(target_object);
    });
    waitPhaseFinish('select', success, true);
    waitPhaseFinish('error', error, true);

    if (!data) {
        state.error = 2202;
        state.progress = 'error';
    } else if (!data.hasOwnProperty('x') || !data.hasOwnProperty('y')) {
        state.error = 2221;
        state.progress = 'error';
    } else {
        target_object = getElementObject(data);
        
        if (target_object === null) {
            state.error = 4002;
            state.progress = 'error';
        } else if (target_object === false) {
            state.error = 4003;
            state.progress = 'error';
        } else {
            changeMousePosition(data);
        }
    }
};