/**
 * Checks that the HTML element has the styles contained in the compared object
 *
 * @private
 *
 * @param {HTMLElement} element Object for styles checking
 * @param {Object} css_obj      Object with styles for comparing
 * @returns {boolean}           Checking result
 */
function checkStyleMatches (element, css_obj) {
    let css_name = '',
        styles = Object.assign({}, css_obj);

    if (!(element instanceof HTMLElement)) {
        return false;
    }

    for (let key in styles) {
        if (styles.hasOwnProperty(key)) {
            css_name = convertStyleName(key);

            if (styles[key].charAt(0) === '#') {
                styles[key] = convertStyleColor(styles[key]);

                if (!styles[key]) {
                    return false;
                }
            }

            if (getComputedStyle(element)[css_name] !== styles[key]) {
                return false;
            }
        }
    }

    return true;
}

/**
 * Converts style name from CSS or JavsScript format to JavaScript format
 *
 * @private
 *
 * @param {string} css_name     Style name in CSS or JavaSctipt format
 * @returns {string}            Style name in JavaSctipt format
 */
function convertStyleName (css_name) {
    let name = '',
        arr = [];

    if (css_name === 'float') {
        name = 'cssFloat';
    } else {
        arr = css_name.split('-');
        for (let i = 0, c = arr.length; i < c; i++) {
            if (i === 0) {
                name += arr[i].toLowerCase();
            } else {
                name += arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
            }
        }
    }

    return name;
}

/**
 * Converts color from sharp format to rgb format
 *
 * @private
 *
 * @param {string} sharp_string     Color in sharp format, f.e. #FF0000, #D55
 * @returns {string}                Color in rgb format, f.e. rgb(255, 0, 0)
 */
function convertStyleColor (sharp_string) {
    let tmp_str = '',
        clean_color,
        matches;

    clean_color = sharp_string.replace('#', '');

    if (clean_color.length === 3) {
        for (let i = 0, c = clean_color.length; i < c; i++) {
            tmp_str += clean_color.charAt(i) + clean_color.charAt(i);
        }

        clean_color = tmp_str;
    } else if (clean_color.length !== 6) {
        return null;
    }

    matches = clean_color.match(/[0-9A-Fa-f]{2}/g, clean_color);

    if (!matches || matches.length !== 3) {
        return null;
    }

    matches.forEach(function (item, i, arr) {
        arr[i] = parseInt(item, 16);
    });

    return 'rgb(' + matches[0] + ', ' + matches[1] + ', ' + matches[2] + ')';
}