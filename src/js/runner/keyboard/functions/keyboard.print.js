/**
 * Async animation function for keyboard printing
 *
 * @private
 *
 * @param {string} text             String for printing by keyboard
 * @param {Object} target           HTML element for inner text
 * @returns {none}                  No return
 */
function pressKeysAsync (text, target = null) {
    let sym_list = analyzeBeforePrint(text),
        element = target || gl_scp.document,
        iter = 0,
        timer;

    timer = setTimeout(function tick () {
        if (iter >= sym_list.length) {
            clearTimeout(timer);
            state.progress = 'ready';
            return;
        }

        printSymbol(sym_list[iter], element);

        timer = setTimeout(tick, 100);
        iter++;
    });
}

/**
 * Sync function for keyboard printing
 *
 * @private
 *
 * @param {string} text             String for printing by keyboard
 * @param {Object} target           HTML element for inner text
 * @returns {none}                  No return
 */
function pressKeysSync (text, target = null) {
    let sym_list = analyzeBeforePrint(text),
        element = target || gl_scp.document,
        iter = 0;

    while (iter < sym_list.length) {
        printSymbol(sym_list[iter], element);

        iter++;
    }

    state.progress = 'ready';
}

/**
 * Deletes all content in the target element
 *
 * @private
 *
 * @param {Object} target           HTML element for inner text
 * @returns {none}                  No return
 */
function cleanElementContent (target) {
    if ('value' in target) {
        target.value = '';
    } else {
        target.innerHTML = '';
    }

    state.progress = 'ready';
}

/**
 * Prints symbol in the target element
 *
 * @private
 *
 * @param {string} sym              String for printing by keyboard
 * @param {Object} target           HTML element for inner text
 * @returns {none}                  No return
 */
function printSymbol (sym, target) {
    if (/[#]{1}(.*)[#]{1}/.test(sym)) {
        let command = sym.replace(/#/g, '');

        if (pressCommandKey(target, command) && spec_key[command]['str']) {
            if ('value' in target) {
                target.value += spec_key[command]['str'];
            } else {
                target.innerHTML += spec_key[command]['str'];
            }
        }
    } else if (/[%]{1}(.*)[%]{1}/.test(sym)) {
        unpressCommandKey(target, sym.replace(/%/g, ''));
    } else {
        emulateKeyboardEvents(target, 'keydown', sym);
        emulateKeyboardEvents(target, 'keypress', sym);
        emulateKeyboardEvents(target, 'keyup', sym);

        if (!keyboard.ctrlKey && !keyboard.altKey && !keyboard.metaKey) {
            if ('value' in target) {
                target.value += sym;
            } else {
                target.innerHTML += sym;
            }
        }
    }
}

/**
 * Emulates pressing of command button
 *
 * @private
 *
 * @param {HTMLElement} element     Object for mouse event generating
 * @param {string} button           Name of activated control button
 * @returns {boolean}               Success if done
 */
function pressCommandKey (element, button) {
    if (!spec_key[button]) {
        // TODO: обработка неизвестной команды!
        console.error('undefined command');
        state.error = '99991';
        state.progress = 'error';
        return false;
    }

    switch (button) {
        case 'SHIFT':
            keyboard.shiftKey = true;
            break;
        case 'ALT':
            keyboard.altKey = true;
            break;
        case 'CTRL':
            keyboard.ctrlKey = true;
            break;
        case 'META':
            keyboard.metaKey = true;
            break;
        default:
    }

    if (spec_key[button][3]) {
        emulateKeyboardCommandEvents(element, 'keydown', spec_key[button]);
        emulateKeyboardCommandEvents(element, 'keypress', spec_key[button]);
    } else {
        emulateKeyboardCommandEvents(element, 'keydown', spec_key[button]);
    }

    return true;
}

/**
 * Emulates releasing of command button
 *
 * @private
 *
 * @param {HTMLElement} element     Object for mouse event generating
 * @param {string} button           Name of releasing control button
 * @returns {none}                  No return
 */
function unpressCommandKey (element, button) {
    if (!spec_key[button]) {
        // TODO: обработка неизвестной команды!
        console.error('undefined command');
        state.error = '99992';
        state.progress = 'error';
        return;
    }

    switch (button) {
        case 'SHIFT':
            keyboard.shiftKey = false;
            break;
        case 'ALT':
            keyboard.altKey = false;
            break;
        case 'CTRL':
            keyboard.ctrlKey = false;
            break;
        case 'META':
            keyboard.metaKey = false;
            break;
        default:
    }

    emulateKeyboardCommandEvents(element, 'keyup', spec_key[button]);
}