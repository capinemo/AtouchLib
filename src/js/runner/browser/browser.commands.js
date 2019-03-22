/**
 * Load given url
 * 
 * @public
 * 
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
BROWSER.prototype.go = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
    
    if (typeof data !== 'string') {
        state.error = 1100;
        state.progress = 'error';
    } else if (state.progress === 'reload')  {
        state.progress = 'ready';
    } else {       
        window.location = data;
    }
};

/**
 * Reload openes page
 * 
 * @public
 * 
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
BROWSER.prototype.reload = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
    
    if (state.progress === 'reload')  {
        state.progress = 'ready';
    } else {
        state.progress = 'reload';
        document.location.reload(true);
    }
};

/**
 * Return to previous visited page
 * 
 * @public
 * 
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
BROWSER.prototype.back = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
    
    if (state.progress === 'reload')  {
        state.progress = 'ready';
    } else {
        window.history.back();
    }
};

/**
 * Return to next visited page
 * 
 * @public
 * 
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
BROWSER.prototype.forward = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
    
    if (state.progress === 'reload')  {
        state.progress = 'ready';
    } else {
        window.history.forward();
    }
};

/**
 * Checking HTML element or HTML Collection content for equality or similarity <br />
 * to given string
 * 
 * @public
 * 
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
BROWSER.prototype.check = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
    
    let element = getHtmlTarget(data),
        check_function = null,
        check_string = null,
        check_element = '';

    if (data.hasOwnProperty('has')) {
        check_function = checkElementContentSimilar;
        check_string = data.has;
        check_element = 'Element';
    } else if (data.hasOwnProperty('equal')) {
        check_function = checkElementContentEqual;
        check_string = data.equal;
        check_element = 'Element';
    } else if (data.hasOwnProperty('anyhas')) {
        check_function = checkAnyCollectionContentSimilar;
        check_string = data.anyhas;
        check_element = 'Collection';
    } else if (data.hasOwnProperty('allhas')) {
        check_function = checkAllCollectionContentSimilar;
        check_string = data.allhas;
        check_element = 'Collection';
    } else if (data.hasOwnProperty('anyequal')) {
        check_function = checkAnyCollectionContentEqual;
        check_string = data.anyequal;
        check_element = 'Collection';
    } else if (data.hasOwnProperty('allequal')) {
        check_function = checkAllCollectionContentEqual;
        check_string = data.allequal;
        check_element = 'Collection';
    } else {
        state.error = 4102;
        state.progress = 'error';
    }

    if (check_function && check_string && element) {
        if (typeof check_string !== 'string' && typeof check_string !== 'number') {
            state.error = 4103;
            state.progress = 'error';
        } else if (element instanceof HTMLCollection && check_element === 'Element') {
            state.error = 4104;
            state.progress = 'error';
        } else if (check_function(element, check_string)) {
            state.progress = 'ready';
        } else {
            state.error = 4000;
            state.progress = 'error';
        }
    }
};

/**
 * Checking JS variables content or type for equality or similarity <br />
 * to given string <br />
 * If given directive "convert" and it is true, atouch compare variables <br />
 * independently from type
 * 
 * @public
 * 
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
BROWSER.prototype.jscheck = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
    
    let check_target = getJsTarget(data),
        check_function = null,
        check_string = null;

    if (!data.hasOwnProperty('vars')) {
        state.error = 4200;
        state.progress = 'error';
        return;
    }

    if (data.hasOwnProperty('has')) {
        check_function = data.convert 
            ? checkVariableContentSimilar 
            : checkVariableContentEqual;
        check_string = data.has;
    } else if (data.hasOwnProperty('equal')) {
        check_function = data.convert 
            ? checkVariableSimilar
            : checkVariableEqual;
        check_string = data.equal;
    } else if (data.hasOwnProperty('type')) {
        check_function = checkVariableType;
        check_string = data.type;
    } else {
        state.error = 4204;
        state.progress = 'error';
    }

    if (check_function && typeof check_string !== 'undefined'
            && typeof check_target !== 'undefined') {
        if (check_function(check_target, check_string)) {
            state.progress = 'ready';
        } else {
            state.error = 4000;
            state.progress = 'error';
        }
    }
};

/**
 * Checks CSS properties
 * 
 * @public
 * 
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
BROWSER.prototype.csscheck = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
    
    let element = getHtmlTarget(data);

    if (element) {
        if (data.style && data.style instanceof Object) {
            if (!(element instanceof HTMLElement)) {
                state.error = 4001;
                state.progress = 'error';
            } else if (checkStyleMatches(element, data.style)) {
                state.progress = 'ready';
            } else {
                state.error = 4000;
                state.progress = 'error';
            }
        } else {
            state.error = 4300;
            state.progress = 'error';
        }
    } else {
        state.error = 4002;
        state.progress = 'error';
    }
};

/**
 * Checks cookies content
 * 
 * @public
 * 
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
BROWSER.prototype.cookcheck = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
    
    let cookie = getCookieContent(data.cook),
        check_function = null,
        check_string = null;

    if (data.hasOwnProperty('has')) {
        check_function = checkVariableContent;
        check_string = data.has;
    } else if (data.hasOwnProperty('equal')) {
        check_function = checkVariableContentEqual;
        check_string = data.equal;
    } else {
        state.error = 4401;
        state.progress = 'error';
        return;
    }

    if (cookie) {
        if (check_function && typeof check_string !== 'undefined') {
            if (check_function(cookie, check_string)) {
                state.progress = 'ready';
            } else {
                state.error = 4000;
                state.progress = 'error';
            }
        }
    } else {
        state.error = 4400;
        state.progress = 'error';
    }
};

/**
 * Delete certain cookie
 * 
 * @public
 *
 * @param {string} data             Command parameters
 * @param {Function} success        Success callback
 * @param {Function} error          Error callback
 * @returns {none}                  No return
 */
BROWSER.prototype.cookdel = function (data, success, error) {
    waitPhaseFinish('ready', success, true);
    waitPhaseFinish('error', error, true);
    
    if (typeof data !== 'string') {
        state.error = 4403;
        state.progress = 'error';
        return;
    }

    if (getCookieContent(data)) {
        clearCookieContent(data);
        state.progress = 'ready';
    } else {
        state.error = 4402;
        state.progress = 'error';
    }
};