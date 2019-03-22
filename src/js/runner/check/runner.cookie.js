/**
 * Load saved state of Atouch from cookie
 *
 * @private
 *
 * @param {string} name         Cookie name
 * @returns {string|null}       Data with saved state from cookie
 */
function getCookieContent (name) {
    let matches;

    if (typeof name !== 'string') {
        return null;
    }

    matches = document.cookie.match(new RegExp('(?:^|; )'
        + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')
        + '=([^;]*)'
    ));

    if (matches.length === 1 || matches[1] === '') {
        return null;
    }

    return matches ? decodeURIComponent(matches[1]) : undefined;
}

/**
 * Remove cookie with saved state of Atouch
 *
 * @private
 *
 * @param {string} name         Cookie name
 * @returns {none}              No return
 */
function clearCookieContent (name) {
    document.cookie = name + '=;path=/;expires=-1';
}