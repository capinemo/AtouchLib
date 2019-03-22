/**
 * Checks that content of element (value or innerHTML) include given string
 * 
 * @private
 * 
 * @param {HTMLElement} elem        Checking HTML element
 * @param {string|number} string    String for comparing
 * @returns {boolean}               Checking result
 */
function checkElementContentSimilar (elem, string) {
    let content_container,
        content_read = specialSymbolsTranslateToStr(string);

    if (!(elem instanceof HTMLElement)
            && typeof content_read !== 'string'
            && typeof content_read !== 'number') {
        return false;
    }

    content_container = ('value' in elem) ? elem.value : elem.innerHTML;

    return !!~content_container.indexOf(content_read);
}

/**
 * Checks that content of element (value or innerHTML) equal to given string
 * 
 * @private
 * 
 * @param {HTMLElement} elem        Checking HTML element
 * @param {string|number} string    String for comparing
 * @returns {boolean}               Checking result
 */
function checkElementContentEqual (elem, string) {
    let content_container,
        content_read = specialSymbolsTranslateToStr(string);

    if (!(elem instanceof HTMLElement)
            && typeof content_read !== 'string'
            && typeof content_read !== 'number') {
        return false;
    }

    content_container = ('value' in elem) ? elem.value : elem.innerHTML;

    return content_container.toString() === content_read.toString();
}

/**
 * Checks that content of any element in collection (value or innerHTML) <br />
 * include given string
 * 
 * @private
 * 
 * @param {HTMLCollection} collection   Checking HTML elements collection
 * @param {string|number} string        String for comparing
 * @returns {boolean}                   Checking result
 */
function checkAnyCollectionContentSimilar (collection, string) {
    let arr = [],
        content_read = specialSymbolsTranslateToStr(string);

    if (!(collection instanceof HTMLCollection
            || collection instanceof HTMLElement)
            && typeof content !== 'string'
            && typeof content !== 'number') {
        return false;
    }

    if (collection instanceof HTMLCollection) {
        arr = collection;
    } else {
        arr.push(collection);
    }

    for (let i = arr.length; i--;) {
        if (checkElementContentSimilar(arr[i], content_read)) {
            return true;
        }
    }

    return false;
}

/**
 * Checks that content of any element in collection (value or innerHTML) <br />
 * equal to given string
 * 
 * @private
 * 
 * @param {HTMLCollection} collection   Checking HTML elements collection
 * @param {string|number} string        String for comparing
 * @returns {boolean}                   Checking result
 */
function checkAnyCollectionContentEqual (collection, string) {
    let arr = [],
        content_read = specialSymbolsTranslateToStr(string);

    if (!(collection instanceof HTMLCollection
            || collection instanceof HTMLElement)
            && typeof content !== 'string'
            && typeof content !== 'number') {
        return false;
    }

    if (collection instanceof HTMLCollection) {
        arr = collection;
    } else {
        arr.push(collection);
    }

    for (let i = arr.length; i--;) {
        if (checkElementContentEqual(arr[i], content_read)) {
            return true;
        }
    }

    return false;
}

/**
 * Checks that content of all elements in collection (value or innerHTML) <br />
 * include given string
 * 
 * @private
 * 
 * @param {HTMLCollection} collection   Checking HTML elements collection
 * @param {string|number} string        String for comparing
 * @returns {boolean}                   Checking result
 */
function checkAllCollectionContentSimilar (collection, string) {
    let arr = [],
        content_read = specialSymbolsTranslateToStr(string);

    if (!(collection instanceof HTMLCollection
            || collection instanceof HTMLElement)
            && typeof content !== 'string'
            && typeof content !== 'number') {
        return false;
    }

    if (collection instanceof HTMLCollection) {
        arr = collection;
    } else {
        arr.push(collection);
    }

    for (let i = arr.length; i--;) {
        if (!checkElementContentSimilar(arr[i], content_read)) {
            return false;
        }
    }

    return true;
}

/**
 * Checks that content of all elements in collection (value or innerHTML) <br />
 * equal to given string
 * 
 * @private
 * 
 * @param {HTMLCollection} collection   Checking HTML elements collection
 * @param {string|number} string        String for comparing
 * @returns {boolean}                   Checking result
 */
function checkAllCollectionContentEqual (collection, string) {
    let arr = [],
        content_read = specialSymbolsTranslateToStr(string);

    if (!(collection instanceof HTMLCollection
            || collection instanceof HTMLElement)
            && typeof content !== 'string'
            && typeof content !== 'number') {
        return false;
    }

    if (collection instanceof HTMLCollection) {
        arr = collection;
    } else {
        arr.push(collection);
    }

    for (let i = arr.length; i--;) {
        if (!checkElementContentEqual(arr[i], content_read)) {
            return false;
        }
    }

    return true;
}