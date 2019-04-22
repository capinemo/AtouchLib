/**
 * @class RUNNER
 * @description Atouch tests creating and editing class
 * @version 0.0.2
 */
let EDITOR = (function () {
    let is_redactor = false,
        is_recording = false,
        Recorder,
        SL = null,
        gl_scp = null;

    // = record/record.js

    /**
     * setIsRedactor
     *
     * Activate redactor functions when we edit tests
     *
     * @param {Function} sendHandle     Function for sending messages to Editor scope from iframe
     * @returns {none}                  No return
     */
    EDITOR.prototype.setIsRedactor = function (sendHandle) {
        is_redactor = true;

        if (gl_scp.document) {
            gl_scp.document.onclick = Recorder.activateRecord(sendHandle);
        }
    };

    /**
     * startRecord
     *
     * //todo
     *
     * @returns {none}                  No return
     */
    EDITOR.prototype.startRecord = function () {
        is_recording = true;

        Recorder.startRecord();
    };

    /**
     * startRecord
     *
     * //todo
     *
     * @returns {none}                  No return
     */
    EDITOR.prototype.stopRecord = function () {
        is_recording = false;

        Recorder.stopRecord();
    };

    /**
     * @constructor

     * @returns {EDITOR}        EDITOR object
     */
    function EDITOR () {
        if (EDITOR.prototype.Inject) {
            SL = EDITOR.prototype.Inject;
        }

        if (typeof window !== 'undefined' && (typeof window.localStorage !== 'undefined'
                || typeof window.document !== 'undefined')) {
            gl_scp = window;
        }

        //Recorder = new RECORD;
        return this;
    }

    return EDITOR;
})();

/**
 * Sends messages from Atouch to Editor page
 *
 * @private
 *
 * @param {string} str      Sending message to Editor page
 * @returns {none}                  No return
 */
function messageToEditor (str) {
    window.parent.postMessage(str, domain);
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {EDITOR};
}