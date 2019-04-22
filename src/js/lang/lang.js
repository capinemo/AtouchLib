/**
 * @class LANG
 * @description Atouch class for supporing different laungages
 * @version 0.0.5
 */
let LANG = (function () {
    let default_language = 'ru',
        SL = null,
        Debug = null;

    //= lang.ru.js

    //= lang.en.js

    LANG.prototype.text = {};
    LANG.prototype.selected_lang = '';
    LANG.prototype.lang_list = [
        {name: 'RU: Русский', link: 'ru', data: ru}/* ,
        {name: 'EN: English', link: 'en', data: en}*/
    ];

    /**
     * Set language as selected in Atouch and save language tag in cookie
     *
     * @public
     *
     * @param {string} lang_link    Selected language tag for changing
     * @returns {boolean}           True if success
     */
    LANG.prototype.setLanguage = function (lang_link) {
        let lang_set = null,
            new_date = new Date(Date.now() + 1000 * 60 * 60 * 24 * 365);

        for (let i = this.lang_list.length; i--;) {
            if (lang_link === this.lang_list[i].link) {
                lang_set = this.lang_list[i].data;
            }
        }

        if (!lang_set) {
            if (Debug) Debug.write('log', {m: 'Selected language not exists: ' + lang_link});
            return;
        }

        this.text = lang_set;
        this.selected_lang = lang_link;

        if (typeof window !== 'undefined' && typeof window.document !== 'undefined'
                && typeof window.document.cookie !== 'undefined') {
            window.document.cookie = 'atouchLang=' + lang_link
                + ';path=/;expires=' + new_date.toUTCString();

            if (Debug) Debug.write('log', {m: 'Selected language: ' + lang_link});
        } else {
            if (Debug) Debug.write('error', {m: 'Coockie not support. Cannot set language: ' + lang_link});
        }
    };

    /**
     * Finds earlier selected language in cookies
     *
     * @public
     *
     * @returns {string|null}       Selected language tag
     */
    LANG.prototype.getLanguage = function () {
        if (typeof window === 'undefined' || typeof window.document === 'undefined'
                || typeof window.document.cookie === 'undefined') {
            if (Debug) Debug.write('error', {m: 'Coockie not support. Cannot load language'});
            return null;
        }

        let matches = window.document.cookie.match(/atouchLang=[\s\S]{2,3}?[;]*/ig),
            language = matches
                ? matches[0].replace('atouchLang=', '').replace('; ', '').replace(';', '')
                : null;

        return language ? decodeURIComponent(language) : null;
    };

    /**
     * @constructor
     *
     * @param {DEBUG} debug         DEBUG object
     * @returns {LANG}              LANG object
     */
    function LANG (debug) {
        let saved_lang = this.getLanguage();

        if (LANG.prototype.Inject) {
            SL = LANG.prototype.Inject;
        }

        if (SL && SL.isService('Debug')) {
            Debug = SL.Service('Debug');
        }

        if (saved_lang) {
            curr_lang = saved_lang;
        } else {
            curr_lang = default_language;
        }

        this.setLanguage(curr_lang);

        return this;
    }

    return LANG;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {LANG};
}