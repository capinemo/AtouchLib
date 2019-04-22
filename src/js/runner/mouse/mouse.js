/**
 * @class MOUSE
 * @description Atouch class for imitation mouse events and actions
 * @version 0.0.5
 */
let MOUSE = (function () {
    const mouse = {
            page_scroll_x:  null,       // Скролл страницы по горизонтали
            page_scroll_y:  null,       // Скролл страницы по вертикали
            current_x:      null,       // Текущее положение мыши по горизонтали
            current_y:      null,       // Текущее положение мыши по вертикали
            cursor:         null,       // Ссылка на элемент курсора
            current_object: null,       // Элемент, над которым сейчас мышь
            name:           null        // Название текущего курсора в CSS

        },                              // global virtual cursor object
        constructor = {                 // vcursor construct object
            cursor: {
                img: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAWCAYAAABKbiVHAAAABmJLR0QA/wD/AP+gvae'
                    + 'TAAAACXBIWXMAAAsTAAALEwEAmpwYAAAA7UlEQVRIS8WV2w6EMAgFzzH+/y+zDxaltRcoJjtJs2uldApRiT5SflnNjhHEY'
                    + 'hXa614CEbnukwT6MS1ReaU6xGFupCgHsKcO85kMkBf6VAbICXlkpAw3u0JLGRGxyd1iO0JLGUtHbEpUKCRj8W7kjQMumVD'
                    + '5Ld6NvHEncAeDZLVA59v/XspL0yKYvBirNnk3nMV1BNiMIQcAdhJsoZ8Pzedtj6KVSQsFvmNDXk/TrAULrMhWdaxMpjqRh'
                    + 'WIG7XWbRCKVcbTmzueIfbUpU500ZzvxMeTz7lqechSwbJen7FHaNv2V0cnmZXkYrd/iBwCdd/+0Aey2AAAAAElFTkSuQmCC',
                default: {x0: 17, y0: 0, x1: 28, y1: 19, xc: 17, yc: 0},
                pointer: {x0: 0, y0: 0, x1: 17, y1: 22, xc: 5, yc: 0},
                text: {x0: 28, y0: 0, x1: 35, y1: 16, xc: 31, yc: 8}
            }
        };

    let SL = null,
        gl_scp = null,
        cursor_speed = 30,          // cursor moving iteration frequency
        scroll_speed = 20,          // scrolling iteration frequency
        maxHeightWithScroll,        // page height with scrolling
        maxWidthWithScroll,         // page width with scrolling
        maxHeightVisible,           // height of page visible path
        maxWidthVisible;            // width of page visible path

    //= functions/mouse.control.js

    //= functions/mouse.async.js

    //= functions/mouse.debug.js

    //= functions/mouse.events.js

    //= functions/mouse.coordinates.js

    //= functions/mouse.cursor.js

    //= functions/mouse.move.js

    //= functions/mouse.scroll.js

    //= functions/mouse.button.js

    //= mouse.commands.js

    MOUSE.prototype.getPageParameters = function () {
        maxHeightWithScroll = Math.max(
            gl_scp.document.body.scrollHeight, gl_scp.document.documentElement.scrollHeight,
            gl_scp.document.body.offsetHeight, gl_scp.document.documentElement.offsetHeight,
            gl_scp.document.body.clientHeight, gl_scp.document.documentElement.clientHeight
        );
        maxWidthWithScroll = Math.max(
            gl_scp.document.body.scrollWidth, gl_scp.document.documentElement.scrollWidth,
            gl_scp.document.body.offsetWidth, gl_scp.document.documentElement.offsetWidth,
            gl_scp.document.body.clientWidth, gl_scp.document.documentElement.clientWidth
        );
        maxHeightVisible = gl_scp.document.documentElement.clientHeight;
        maxWidthVisible = gl_scp.document.documentElement.clientWidth;
    };

    /**
     * @constructor
     *
     * @returns {MOUSE}             MOUSE object
     */
    function MOUSE () {
        if (MOUSE.prototype.Inject) {
            SL = MOUSE.prototype.Inject;
        }

        if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
            gl_scp = window;
        } else {
            return this;
        }

        this.getPageParameters();
        loadEventListeners(this);
        createVirtualCursor();

        // showCalibrateGrid();
        // activateMouseEventsListener();

        return this;
    }

    return MOUSE;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {MOUSE};
}