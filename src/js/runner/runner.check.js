/**
 * Finds elements by id, class, tag or name <br />
 * Example: <br />
 * {id: 'element_id'} - returns one element or null <br />
 * {tag: 'collection_tag'} - returns collection or null <br />
 * {tag: 'collection_tag', index: 2} - returns one element or null <br />
 * {name: 'collection_name'} - returns collection or null <br />
 * {name: 'collection_name', index: 1} - returns one element or null <br />
 * {class: 'collection_class'} - returns collection or null <br />
 * {class: 'collection_class', index: 0} - returns one element or null <br />
 *
 * @private
 *
 * @param {Object} data         Object with datas for finding  <br />
 *                              HTMLElement|HTMLCollection
 * @returns {HTMLElement|HTMLCollection|null}   Finded HTMLElement|HTMLCollection <br />
 *                                                      or null
 */
function getHtmlTarget (data) {
    let elem = null,
        elems = [];

    if (data.id) {
        elem = document.getElementById(data.id);
    } else if (data.tag) {
        if (typeof data.index === 'number' && data.index >= 0) {
            elem = document.getElementsByTagName(data.tag)[data.index];
        } else {
            elems = document.getElementsByTagName(data.tag);
        }
    } else if (data.name) {
        if (typeof data.index === 'number' && data.index >= 0) {
            elem = document.getElementsByName(data.name)[data.index];
        } else {
            elems = document.getElementsByName(data.name);
        }
    } else if (data.class) {
        if (typeof data.index === 'number' && data.index >= 0) {
            elem = document.getElementsByClassName(data.class)[data.index];
        } else {
            elems = document.getElementsByClassName(data.class);
        }
    } else {
        state.error = 4001;
        state.progress = 'error';
        return null;
    }

    if (elem) {
        return elem;
    } else if (elems.length > 0) {
        return elems;
    } else {
        state.error = 4002;
        state.progress = 'error';
        return null;
    }
}

/**
 * Finds JavaScript variables in global scope <br />
 * Example: <br />
 * {vars: 'some_variable'} - returns global variable link to some_variable <br />
 * {vars: 'some_object', key: 'lists.file.0'} - returns global variable link  <br />
 * to some_object.lists.file.0
 *
 * @private
 *
 * @param {Object} data         Object with datas for finding JS variable
 * @returns {Any|undefined}     Finded global JS variable
 */
function getJsTarget (data) {
    let target,
        path,
        full_path;

    if (data.hasOwnProperty('vars')) {
        target = data.vars;
    } else {
        state.error = 4200;
        state.progress = 'error';
        return undefined;
    }

    if (global[target] && data.hasOwnProperty('key') && global[target] !== 'undefined') {
        if (typeof data.key !== 'string') {
            state.error = 4202;
            state.progress = 'error';
            return undefined;
        }

        path = data.key.split('.');
        full_path = global[target];

        for (let i = 0, c = path.length; i < c; i++) {
            full_path = full_path[path[i]];

            if (typeof full_path === 'undefined') {
                state.error = 4203;
                state.progress = 'error';
                return undefined;
            }
        }

        return full_path;
    } else if (typeof global[target] !== 'undefined') {
        return global[target];
    } else {
        state.error = 4201;
        state.progress = 'error';
        return undefined;
    }
}

/**
 * Find special symbol markers in string and replace it to control character <br />
 * if given not string or number, function returns given parameter without converting <br />
 * For example: 'test_##TAB_test converts to 'test_\t_test' <br />
 * See list of special string blocks in spec_key.
 *
 * @private
 *
 * @param {Any} string      Given parameter
 * @returns {Any}           Given parameter or converted string
 * 
 * @deprecated NOT VALID STRING FORMAT
 * TODO: change search string fromat
 */
function specialSymbolsTranslateToStr (string) {
    let result = string;

    if (typeof result !== 'string' && typeof result !== 'number') {
        return string;
    }

    for (let key in spec_key) {
        if (spec_key.hasOwnProperty(key) && spec_key[key]['str'] !== null) {
            result = result.replace(new RegExp('#' + key + '#', 'g'), spec_key[key]['str']);
        }
    }

    return result;
}

/**
 * Finds DOM element by information in data
 *
 * @private
 *
 * @param {Object} data         Object with parameters
 * @returns {HTMLElement}       The detected element or false
 */
function getElementObject (data) {
    let find;

    if (data.id) {
        find = document.getElementById(data.id);
    } else if (data.tag && data.index >= 0) {
        find = document.getElementsByTagName(data.tag)[data.index];
        
        if (typeof find === 'undefined') {
            find = null;
        }
    } else if (data.name && data.index >= 0) {
        find = document.getElementsByName(data.name)[data.index];
        
        if (typeof find === 'undefined') {
            find = null;
        }
    } else if (data.class && data.index >= 0) {
        find = document.getElementsByClassName(data.class)[data.index];
        
        if (typeof find === 'undefined') {
            find = null;
        }
    } else {
        return false;
    }
    
    return find;
}


/**
 * Finds DOM elements collection by information in data
 *
 * @private
 *
 * @param {Object} data                 Object with parameters
 * @return {HTMLElementsCollection}     The detected elements array or false
 */
function getElementsCollection (data) {
    let find;

    if (data.tag && !data.index) {
        find = document.getElementsByTagName(data.tag);
    } else if (data.name && !data.index) {
        find = document.getElementsByName(data.name);
    } else if (data.class && !data.index) {
        find = document.getElementsByClassName(data.class);
    } else {
        // _message.err('Parameters not for HTMLElementsCollection', 504);
        // _mouse.state = 'error';
        return false;
    }

    return find;
}

//= check/runner.cookie.js

//= check/runner.check.html.js

//= check/runner.check.js.js

//= check/runner.check.css.js