/**
 * Animate moving virtual cursor to new coordinates
 *
 * @private
 *
 * @param {number} new_x            New cursor X coordinate
 * @param {number} new_y            New cursor Y coordinate
 * @returns {none}                  No return
 */
function moveToCoordinates (new_x, new_y) {
    let last_x = mouse.current_x,
        last_y = mouse.current_y,
        target_x,
        target_y,
        iter_x,
        iter_y,
        new_object,
        counter = 0;

    target_x = Math.floor(controlPageLimitsOnX(new_x));
    target_y = Math.floor(controlPageLimitsOnY(new_y));

    iter_x = (target_x - last_x) / cursor_speed;
    iter_y = (target_y - last_y) / cursor_speed;

    animateMouse(
        function () {
            if (counter === cursor_speed - 1) {
                mouse.current_x = target_x;
                mouse.current_y = target_y;
            } else {
                mouse.current_x = mouse.current_x + iter_x;
                mouse.current_y = mouse.current_y + iter_y;
            }

            new_object = getElementByCoordinates(mouse.current_x, mouse.current_y);

            if (new_object !== mouse.current_object) {
                mouse.last_object = mouse.current_object;
                mouse.current_object = new_object;

                emulateMouseEvents(mouse.last_object, 'mouseout');
                emulateMouseEvents(mouse.last_object, 'mouseleave');
                emulateMouseEvents(mouse.current_object, 'mouseover');
                emulateMouseEvents(mouse.current_object, 'mouseenter');
            } else if (typeof mouse.current_object.onmousemove === 'function') {
                emulateMouseEvents(mouse.current_object, 'mousemove');
            }

            changeVirtualCursor(mouse.current_object);

            counter += 1;
            // state.progress = 'move';
        }
        , cursor_speed
        , function () {
            state.progress = 'ready';
        }
    );
}

/**
 * Animate changing virtual cursor position by moving to new coordinates <br />
 * or element
 *
 * @private
 *
 * @param {Object} data             Object with information about target element
 * @returns {none}                  No return
 */
function changeMousePosition (data) {
    let target_object = getElementObject(data),
        target_coords = getElementCoordinates(target_object),
        target_center = getCoordinatesCenter(target_coords);

    if (!target_object || !target_coords || !target_center) {
        state.error = 4002;
        state.progress = 'error';
    } else if ((mouse.current_x >= target_coords.x0 && mouse.current_x <= target_coords.x1)
            && (mouse.current_y >= target_coords.y0 && mouse.current_y <= target_coords.y1)) {
        state.progress = 'ready';
    } else {
        moveToCoordinates(target_center.x, target_center.y);
    }
}