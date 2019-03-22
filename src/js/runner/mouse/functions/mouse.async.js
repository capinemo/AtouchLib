/**
 * Async animation function for mouse actions
 *
 * @private
 *
 * @param {Function} animation      Asynchronous function is executed each iteration
 * @param {number} duration         Iterations number
 * @param {Function} callback       Function is executed after last iterationtion
 * @returns {none}                  No return
 */
function animateMouse (animation, duration, callback) {
    requestAnimationFrame(function animateMouse (time) {
        animation();
        duration--;
        if (duration > 0) {
            requestAnimationFrame(animateMouse);
        } else {
            callback();
        }
    });
}