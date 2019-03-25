/**
 * @class LANG
 * @description Atouch class for supporing different laungages
 * @version 0.0.5
 */
let LANG = (function () {
    //= lang.ru.js

    //= lang.en.js

    LANG.prototype.text = {};
    LANG.prototype.selectedLang = '';
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
            return false;
        }

        document.cookie = 'atouchLang=' + lang_link + ';path=/;expires=' + new_date.toUTCString();

        this.text = lang_set;
        this.selectedLang = lang_link;

        return true;
    };

    /**
     * Finds earlier selected language in cookies
     *
     * @public
     *
     * @returns {LANG}              Selected language tag
     */
    LANG.prototype.getLanguage = function () {
        let matches = document.cookie.match(/atouchLang=[\s\S]{2,3}?[;]*/ig),
            language = matches
                ? matches[0].replace('atouchLang=', '').replace('; ', '').replace(';', '')
                : null;

        return language ? decodeURIComponent(language) : null;
    };

    /**
     * @constructor
     *
     * @param {string} selectLang   Аutomatically selected language
     * @returns {LANG}              LANG object
     */
    function LANG (selectLang = null) {
        let saved_lang = this.getLanguage();

        if (saved_lang) {
            curr_lang = saved_lang;
        } else if (selectLang) {
            curr_lang = selectLang;
        } else {
            curr_lang = 'ru';
        }

        this.setLanguage(curr_lang);

        return this;
    }

    return LANG;
})();