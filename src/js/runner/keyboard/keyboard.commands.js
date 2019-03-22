/**
 * Emulate keyboard printing by people
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
KEYBOARD.prototype.print = function (data, success, error) {
    let target_object;

    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);

    target_object = getElementObject(data);
    
    if (target_object === null) {
        state.error = 4002;
        state.progress = 'error';
    } else if (target_object === false) {
        state.error = 4003;
        state.progress = 'error';
    } else if (!data.input) {
        state.error = 3101;
        state.progress = 'error';
    } else {
        pressKeysAsync(data.input, target_object);
    }
};

/**
 * Emulate keyboard printing instantly
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
KEYBOARD.prototype.fill = function (data, success, error) {
    let target_object;

    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);

    target_object = getElementObject(data);
    
    if (target_object === null) {
        state.error = 4002;
        state.progress = 'error';
    } else if (target_object === false) {
        state.error = 4003;
        state.progress = 'error';
    } else if (!data.input) {
        state.error = 3101;
        state.progress = 'error';
    } else {
        pressKeysSync(data.input, target_object);
    }
};

/**
 * Clear element content
 *
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
KEYBOARD.prototype.clear = function (data, success, error) {
    let target_object;

    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);

    target_object = getElementObject(data);

    if (target_object === null) {
        state.error = 4002;
        state.progress = 'error';
    } else if (target_object === false) {
        state.error = 4003;
        state.progress = 'error';
    } else {
        cleanElementContent(target_object);
    }
};