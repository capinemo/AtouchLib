/**
 * Show virtual cursor calibrating grid
 *
 * @private
 *
 * @returns {none}                      No return
 */
function showCalibrateGrid () {
    let div;
    div = gl_scp.document.createElement('div');
    div.style.cssText = 'position:absolute;left:0;top:0;width:100%;height:50%;background:rgba(128,0,0,0.5);';
    gl_scp.document.body.appendChild(div);

    div = gl_scp.document.createElement('div');
    div.style.cssText = 'position:absolute;left:0;top:0;width:50%;height:100%;background:rgba(0,128,0,0.5);cursor:pointer';
    gl_scp.document.body.appendChild(div);
}

/**
 * Returns in console mouse events
 *
 * @private
 *
 * @returns {none}                      No return
 */
function activateMouseEventsListener () {
    gl_scp.document.body.addEventListener('click', function (e) {
        console.log(e);
    });
    gl_scp.document.body.addEventListener('mouseup', function (e) {
        console.log(e);
    });
    gl_scp.document.body.addEventListener('mousedown', function (e) {
        console.log(e);
    });
    gl_scp.document.body.addEventListener('focus', function (e) {
        console.log(e);
    });
    gl_scp.document.body.addEventListener('focusin', function (e) {
        console.log(e);
    });
    gl_scp.document.body.addEventListener('focusout', function (e) {
        console.log(e);
    });
    gl_scp.document.body.addEventListener('dblclick', function (e) {
        console.log(e);
    });
    /* gl_scp.document.body.addEventListener('mouseover', function (e) {
        console.log(e);
    });
    gl_scp.document.body.addEventListener('mousemove', function (e) {
        console.log(e);
    }); */
}