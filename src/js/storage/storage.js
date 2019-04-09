/**
 * @class STORAGE
 * @description Atouch class for saving and loading global state then page reloaded
 * @version 0.0.8
 */
let STORAGE = (function () {
    let storekey = 'atouchState',  // ! Имя переменной с состоянием Atouch в хранилище
        storedie = 1000 * 60 * 60 * 24; // ! Срок хранения состояния (24 часа)

    /**
     * Saves state of Atouch to storage (firstly to localStorage, then to <br />
     * cookie, if not available)
     *
     * @public
     *
     * @param {Object} state        Saving object of last state
     * @returns {none}              No return
     */
    STORAGE.prototype.saveState = function (state) {
        let save_data = JSON.stringify({
            data : state,
            time : Date.now() + storedie
        });

        let new_date = new Date(Date.now() + storedie),
            utc_date = new_date.toUTCString();

        try {
            localStorage.setItem(storekey, save_data);
        } catch (e) {
            save_data = encodeURIComponent(save_data);
            document.cookie = storekey + '=' + save_data + ';path=/;expires=' + utc_date;
        }
    };

    /**
     * Load state of Atouch from storage (firstly from localStorage, then from <br />
     * cookie, if not available) and clean storage
     *
     * @public
     *
     * @returns {Object}       Restored object of last state
     */
    STORAGE.prototype.loadState = function () {
        let load_data,
            loaded_data;

        try {
            load_data = localStorage.getItem(storekey);
        } catch (e) {
            load_data = getCookieContent(storekey);
        }

        if (!load_data) {
            return {};
        }

        loaded_data = JSON.parse(load_data);

        if (loaded_data.time < Date.now()) {
            this.cleanState();
            return {};
        }

        this.cleanState();

        return loaded_data.data;
    };

    /**
     * Remove state of Atouch from storage (firstly from localStorage, then from <br />
     * cookie, if not available)
     *
     * @public
     *
     * @returns {none}              No return
     */
    STORAGE.prototype.cleanState = function () {
        try {
            localStorage.removeItem(storekey);
        } catch (e) {
            clearCookieContent(storekey);
        }
    };

    /**
     * @constructor

     * @returns {STORAGE}        STORAGE object
     */
    function STORAGE () {
        return this;
    }

    return STORAGE;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {STORAGE};
}