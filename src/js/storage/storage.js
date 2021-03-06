/**
 * @class STORAGE
 * @description Atouch class for saving and loading global state then page reloaded
 * @version 0.0.8
 */
let STORAGE = (function () {
    let storekey = 'atouchState',  // State variable name in storage
        storedie = 1000 * 60 * 60 * 24, // State is kept for 24 hours
        SL = null,
        gl_scp = null;

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

        if (!gl_scp) {
            throw new Error('Storage.saveState: do not know how to save state');
        }

        if (gl_scp.localStorage) {
            gl_scp.localStorage.setItem(storekey, save_data);
        } else if (gl_scp.document && SL) {
            save_data = encodeURIComponent(save_data);
            gl_scp.document.cookie = storekey + '=' + save_data + ';path=/;expires=' + utc_date;
        } else {
            // TODO saving state via nodejs in file
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

        if (!gl_scp) {
            throw new Error('Storage.loadState: do not know how to load state');
        }

        if (gl_scp.localStorage) {
            load_data = gl_scp.localStorage.getItem(storekey);
        } else if (gl_scp.document && SL) {
            load_data = SL.getCookieContent(storekey);
        } else {
            // TODO loading state via nodejs from file
        }

        if (!load_data) {
            return {};
        }

        loaded_data = JSON.parse(load_data);

        this.cleanState();

        if (loaded_data.time < Date.now()) {
            return {};
        }

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
        if (!gl_scp) {
            throw new Error('Storage.cleanState: do not know how to clean state');
        }

        if (gl_scp.localStorage) {
            gl_scp.localStorage.removeItem(storekey);
        } else if (gl_scp.document && SL) {
            SL.clearCookieContent(storekey);
        } else {
            // TODO cleaning state via nodejs in file
        }
    };

    /**
     * @constructor

     * @returns {STORAGE}        STORAGE object
     */
    function STORAGE () {
        if (STORAGE.prototype.Inject && STORAGE.prototype.Inject.clearCookieContent
                && STORAGE.prototype.Inject.getCookieContent) {
            SL = STORAGE.prototype.Inject;
        }

        if (typeof window !== 'undefined' && (typeof window.localStorage !== 'undefined'
                || typeof window.document !== 'undefined')) {
            gl_scp = window;
        }

        return this;
    }

    return STORAGE;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {STORAGE};
}