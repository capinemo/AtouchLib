/**
 * @class RUNNER
 * @description Atouch tests creating and editing class
 * @version 0.0.2
 */
let EDITOR = (function () {
    let is_redactor = false,
        is_recording = false,
        Recorder;

    //= record/record.js

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
        document.onclick = Recorder.activateRecord(sendHandle);
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
        Recorder = new RECORD;
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