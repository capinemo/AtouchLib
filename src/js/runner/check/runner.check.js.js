/**
 * Checks that variable content the same with condition
 * 
 * @private
 * 
 * @param {Any} variable        Checking variable
 * @param {Any} content         Comparing sample
 * @param {boolean} strong      Strong comparing with data types (default - false)
 * @returns {boolean}           Checking result
 */
function compareVariables (variable, content, strong = false) {
    let json_variable,
        json_content;

    if (variable === null && content === null) {
        return true;
    }

    if (strong) {
        return variable === content;
    }

    if (typeof variable === 'number' || typeof variable === 'string'
            || typeof variable === 'symbol' || typeof variable === 'boolean'
            || typeof variable === 'function') {
        return variable == content;
    } else if (variable instanceof Object && content instanceof Object) {
        return compareObjects (variable, content);
    } else {
        json_variable = JSON.stringify(variable);
        json_content = JSON.stringify(content);

        return json_variable === json_content;
    }
}

/**
 * Compares two objects with checking that both have the same elements <br />
 * regardless of sequence
 * 
 * @private
 * 
 * @param {Object} object1      First object
 * @param {Object} object2      Second object
 * @returns {boolean}           Comparing result
 */
function compareObjects (object1, object2) {
    let keys = [];

    for (let key in object1) {
        keys.push(key);
    }

    for (let key in object2) {
        if (object2[key] instanceof Object && object1[key] instanceof Object) {
            if (!compareVariables(object2[key], object1[key])) {
                return false;
            }
        } else if (object2[key] !== object1[key]) {
            return false;
        } else {
            keys.splice(keys.indexOf(key), 1);
        }
    }

    if (keys.length !== 0) {
        return false;
    }

    return true;
}

/**
 * Checks that variable content is equal to condition
 * 
 * @private
 * 
 * @param {Any} variable        Checking variable
 * @param {Any} content         String for comparing
 * @returns {boolean}           Checking result
 */
function checkVariableEqual (variable, content) {
    return compareVariables(variable, content, true);
}

/**
 * Checks that variable content is similar to condition (types not compare)
 * 
 * @private
 * 
 * @param {Any} variable        Checking variable
 * @param {Any} content         String for comparing
 * @returns {boolean}           Checking result
 */
function checkVariableSimilar (variable, content) {
    return compareVariables(variable, content);
}

/**
 * Checks that variable content has matches with condition
 * 
 * @private
 * 
 * @param {string|number|Array} variable    Variable content for checking
 * @param {string|number} content           String for searching
 * @param {boolean} strong                  Strong comparing with data types (default - false)
 * @returns {boolean}                       Checking result
 */
function checkVariableContent (variable, content, strong = false) {
    let str_variable = variable,
        str_content = content;

    if (strong) {
        return !!~variable.indexOf(content);
    }

    if (typeof str_variable === 'string') {
        str_content += '';
    } else if (typeof str_variable === 'number') {
        str_variable += '';
        str_content += '';
    } else if (str_variable instanceof Array) {
        if (!~str_variable.indexOf(str_content) && typeof str_content === 'string') {
            str_content = +str_content;
        } else {
            str_content += '';
        }
    } else {
        return false;
    }

    return !!~str_variable.indexOf(str_content);
}

/**
 * Checks that variable content has matches with condition considering data types
 *
 * @private
 * 
 * @param {string|number|Array} variable    Checking variable
 * @param {string|number} content           String for comparing
 * @returns {boolean}                       Checking result
 */
function checkVariableContentEqual (variable, content) {
    return checkVariableContent(variable, content, true);
}

/**
 * Checks that variable content has matches with condition without data types
 *
 * @private
 * 
 * @param {string|number|Array} variable    Checking variable
 * @param {string|number} content           String for comparing
 * @returns {boolean}                       Checking result
 */
function checkVariableContentSimilar (variable, content) {
    return checkVariableContent(variable, content);
}

/**
 * Checks that JS variable has specified type
 *
 * @private
 * 
 * @param {Any} variable        JavaScript variable
 * @param {string} type         Type name string (in lowercase with converting to <br />
 *                              string including null)
 * @returns {boolean}           Checking result
 */
function checkVariableType (variable, type) {
    return type === variable.constructor.name.toLowerCase();
}