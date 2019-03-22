/**
 * @class RECORD
 * @description Atouch class for recording tests in Editor
 * @version 0.0.2
 */
let RECORD = (function () {
    let record = {},
        sendFunction = null,
        new_test_tasks = [];
    
    //= record.interface.js
    
    /**
     * Create task of action in according event
     * 
     * @private
     * 
     * @param {Object} e            Event
     * @returns {boolean}           True if success
     */
    function addNewTaskFromEvent (e) {
        let task = null;
        switch (e.type) {
            case 'click':
                task = {
                    action  : 'click',
                    target  : getElementHierarchyString(e.target)
                };
                break;
            case 'change':
                task = {
                    action  : 'change',
                    value   : e.target.value,
                    target  : getElementHierarchyString(e.target)
                };
                break;
            case 'keypress':
                task = {
                    action  : 'keypress',
                    key     : e.key,
                    ccd     : e.charCode,
                    kcd     : e.keyCode,
                    target  : getElementHierarchyString(e.target)
                };
                break;
            default:
                return false;
        }
        
        if (task) {
            new_test_tasks.push(task);
        }
        
        return true;
    }
    
    /**
     * Starts record listeners, activate functions
     * 
     * @public
     * 
     * @param {Function} func       Function for sending messages to Editor scope from iframe
     * @returns {none}              No return
     */
    RECORD.prototype.activateRecord = function (func = null) {
        sendFunction = func;
        
        // Used document instead window for IE8 compatibility
        /* document.oncontextmenu = function () {
            return false;
        };
        
        // Not work in IE8
        window.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            showRecordMenu(e);
        }, false); */
    };
    
    /**
     * Starts action listeners
     * 
     * @public
     * 
     * @returns {none}                  No return
     */
    RECORD.prototype.startRecord = function () {
        window.addEventListener('click', addNewTaskFromEvent);
        window.addEventListener('change', addNewTaskFromEvent);
        // window.addEventListener('keypress', addNewTaskFromEvent);
    };
    
    /**
     * Stops action listeners
     * 
     * @public
     * 
     * @returns {none}                  No return
     */
    RECORD.prototype.stopRecord = function () {
        window.removeEventListener('click', addNewTaskFromEvent);
        window.removeEventListener('change', addNewTaskFromEvent);
        // window.removeEventListener('keypress', addNewTaskFromEvent);
        
        sendFunction(JSON.stringify(new_test_tasks));
        
        // TODO: сделать потверждение о получении и только после этого очищать буфер
        new_test_tasks = [];
    };
    
    /**
     * @constructor
     * 
     * @returns {RECORD}        RECORD object
     */
    function RECORD () {
        return this;
    }

    return RECORD;
})();