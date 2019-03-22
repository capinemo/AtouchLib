/**
 * Async listener for last action in chain. Marks action as last in test, clear <br />
 * all listeners in collection and runs callback function. Usually callback <br />
 * functions is success or error from _executeTest function. In parallel can <br />
 * work more than one _listenFinishEvent functions. <br />
 *
 * @private
 *
 * @param {string} content      Value which must match the target variable
 * @param {Function} callback   Function is executed if value identical to target variable
 * @param {boolean} last        This is last phase
 * @returns {none}              No return
 */
function waitPhaseFinish (content, callback, last = false) {
    let timer = setInterval(function () {
        if (state.progress === content) {
            callback();

            if (last) {
                for (let i = listeners.length; i--;) {
                    clearInterval(listeners[i]);
                    listeners.splice(i, 1);
                }
            } else {
                let i = listeners.indexOf(timer);
                clearInterval(listeners[i]);
                listeners.splice(i, 1);
            }
        }
    }, 10);

    listeners.push(timer);

    return true;
}
