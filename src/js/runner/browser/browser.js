/**
 * @class BROWSER
 * @description Atouch class for imitation browser events, functions and actions
 * @version 0.0.9
 */
let BROWSER = (function () {
    let LocalInject = null;
    
    //= browser.commands.js
    
    /**
     * @constructor
     * 
     * @param {INJECT} inject       Global INJECT object
     * @returns {BROWSER}           BROWSER object
     */
    function BROWSER (inject = null) {
        if (inject) {
            LocalInject = inject;
        }
        
        return this;
    }

    return BROWSER;
})();