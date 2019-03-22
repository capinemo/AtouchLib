/**
 * Returns in console keyboard events
 * 
 * @private
 * 
 * @returns {none}                      No return
 */
function activateKeyboardEventsListener () {
    document.body.addEventListener('keydown', function (e) {
        console.log(e, e.key.charCodeAt(0));
    });
    document.body.addEventListener('keypress', function (e) {
        console.log(e, e.key.charCodeAt(0));
    });
    document.body.addEventListener('keyup', function (e) {
        console.log(e, e.key.charCodeAt(0));
    });
}