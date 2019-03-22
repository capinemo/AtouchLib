/**
 * @class LOG
 * @description Atouch class for logging test execution
 * @version 0.0.1
 */
let LOG = (function () {
    let LocalInject = null;
    
    /**
     * @constructor
     * 
     * @param {INJECT} inject       Global INJECT object
     * @returns {LOG}               LOG object
     */
    function LOG (inject = null) {
        if (inject) {
            LocalInject = inject;
        }
        
        return this;
    }

    return LOG;
})();