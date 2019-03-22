/**
 * Generate and activate keyboard event
 *
 * @private
 *
 * @param {HTMLElement} object      Object for mouse event generating
 * @param {string} event            Type of mouse event
 * @param {string} key              Keyboard key for event
 * @returns {none}                  No return
 */
function emulateKeyboardEvents (object, event, key) {
    let evt;

    if (!~events_arr.indexOf(event)) {
        return;
    }

    evt = new KeyboardEvent(event, {
        'key' : key,
        'location' : 0,
        'ctrlKey' : (keyboard.ctrlKey) ? true : false,
        'shiftKey' : (keyboard.shiftKey) ? true : false,
        'altKey' : (keyboard.altKey) ? true : false,
        'metaKey' : (keyboard.metaKey) ? true : false,
        'repeat' : '',
        'charCode' : (event === 'keypress' && key.length === 1) ? key.charCodeAt(0) : 0,
        'keyCode' : (event !== 'keypress' && key.length === 1) ? key.charCodeAt(0) : 0,
        'which' : (event !== 'keypress' && key.length === 1) ? key.charCodeAt(0) : 0,
        'type' : event,
        'explicitOriginalTarget' : object,
        'originalTarget' : object,
        'srcElement' : object,
        'target' : object,
        'bubbles': true,
        'cancelable': true,
        'isTrusted': false,
        'composed': true,
        'view': window,
        'layerX': 0,
        'layerY': 0
    });


    if (typeof object.dispatchEvent === 'function') {
        object.dispatchEvent(evt);
    }
}

/**
 * Generate and activate keyboard event for command keys
 *
 * @private
 *
 * @param {HTMLElement} object      Object for mouse event generating
 * @param {string} event            Type of mouse event
 * @param {Object} key              Object for generating events with command key
 * @returns {none}                  No return
 */
function emulateKeyboardCommandEvents (object, event, key) {
    let evt;

    if (!~events_arr.indexOf(event)) {
        return;
    }

    evt = new KeyboardEvent(event, {
        'key' : key['name'],
        'location' : 0,
        'ctrlKey' : (keyboard.ctrlKey) ? true : false,
        'shiftKey' : (keyboard.shiftKey) ? true : false,
        'altKey' : (keyboard.altKey) ? true : false,
        'metaKey' : (keyboard.metaKey) ? true : false,
        'repeat' : '',
        'charCode' : 0,
        'keyCode' : key['keyCode'],
        'which' : key['keyCode'],
        'type' : event,
        'explicitOriginalTarget' : object,
        'originalTarget' : object,
        'srcElement' : object,
        'target' : object,
        'bubbles': true,
        'cancelable': true,
        'isTrusted': false,
        'composed': true,
        'view': window,
        'layerX': 0,
        'layerY': 0
    });


    if (typeof object.dispatchEvent === 'function') {
        object.dispatchEvent(evt);
    }
}

// ! TODO: need to add polyfill for KeyboardEvent