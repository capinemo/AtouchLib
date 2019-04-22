/**
 * Selecting test execution list tab
 * - Generating tests list
 * - Hidding all content elements and showing test selecting elements
 * - Load list of accessed tests
 * - Set test running buton listener
 *
 * @private
 *
 * @returns {none}              No return
 */
func.tabList = function () {
    let panel_elem = gl_scp.document.getElementsByClassName('panel_elem'),
        target_elem = gl_scp.document.getElementsByClassName('list_elem'),
        head_elem = gl_scp.document.getElementById('atouch_iface-panel-content-title'),
        test_select = gl_scp.document.getElementById('atouch_iface-panel-content-test-select'),
        tests = [];

    for (let i = panel_elem.length; i--;) {
        panel_elem[i].style.display = 'none';
    }

    for (let i = target_elem.length; i--;) {
        target_elem[i].style.display = 'inline';
    }

    state.tab = 'iface_tab_test_title';
    head_elem.innerHTML = Lang ? Lang.text[state.tab] : '';
    test_select.innerHTML = '';

    if (SL) {
        tests = SL.getAvailableTests();
    }

    // Generating tests list from Server
    for (let item in tests) {
        let elem = gl_scp.document.createElement('option');
        elem.innerHTML = tests[item].name;
        elem.value = item;
        test_select.appendChild(elem);
    }
};

/**
 * Selecting options list tab
 * - Generating language list
 * - Hidding all content elements and showing options elements
 * - Load list of languages
 * - Set click listener for saving options changes
 * - Preparing state of transparency range input
 *
 * @private
 *
 * @returns {none}              No return
 */
func.tabOptions = function () {
    let panel_elem = gl_scp.document.getElementsByClassName('panel_elem'),
        target_elem = gl_scp.document.getElementsByClassName('option_elem'),
        head_elem = gl_scp.document.getElementById('atouch_iface-panel-content-title'),
        lang_select = gl_scp.document.getElementById('atouch_iface-panel-content-lang-select'),
        opacity = gl_scp.document.getElementById('atouch_iface-panel-content-opacity-select');

    for (let i = panel_elem.length; i--;) {
        panel_elem[i].style.display = 'none';
    }

    for (let i = target_elem.length; i--;) {
        target_elem[i].style.display = 'inline';
    }

    state.tab = 'iface_tab_option_title';
    head_elem.innerHTML = Lang ? Lang.text[state.tab] : '';
    lang_select.innerHTML = '';

    if (Lang && Lang.lang_list) {
        for (let line in Lang.lang_list) {
            let elem = gl_scp.document.createElement('option');
            elem.innerHTML = Lang.lang_list[line].name;
            elem.value = Lang.lang_list[line].link;
            lang_select.appendChild(elem);
        }
    }
    opacity.min = 20;
    opacity.max = 100;
    opacity.step = 2;
    opacity.value = state.opacity ? state.opacity : 100;
};

/**
 * Selecting authorization tab
 * - Hidding all content elements and showing auth elements
 *
 * @private
 *
 * @returns {none}              No return
 */
func.tabAuth = function () {
    let panel_elem = gl_scp.document.getElementsByClassName('panel_elem'),
        target_elem = gl_scp.document.getElementsByClassName('auth_elem'),
        head_elem = gl_scp.document.getElementById('atouch_iface-panel-content-title');

    for (let i = panel_elem.length; i--;) {
        panel_elem[i].style.display = 'none';
    }

    for (let i = target_elem.length; i--;) {
        console.log(target_elem[i]);
        target_elem[i].style.display = 'inline';
    }

    state.tab = 'iface_tab_auth_title';
    head_elem.innerHTML = Lang ? Lang.text[state.tab] : '';
};

/**
 * Selecting reporting tab
 * - Hidding all content elements and showing report elements
 *
 * @private
 *
 * @returns {none}              No return
 */
func.tabReport = function () {
    let panel_elem = gl_scp.document.getElementsByClassName('panel_elem'),
        target_elem = gl_scp.document.getElementsByClassName('report_elem'),
        head_elem = gl_scp.document.getElementById('atouch_iface-panel-content-title');

    for (let i = panel_elem.length; i--;) {
        panel_elem[i].style.display = 'none';
    }

    for (let i = target_elem.length; i--;) {
        target_elem[i].style.display = 'inline';
    }

    state.tab = 'iface_tab_report_title';
    head_elem.innerHTML = Lang ? Lang.text[state.tab] : '';
};

/**
 * Hide or show Atouch panel
 *
 * @private
 *
 * @param {boolean} show            Force hides panel (default: false)
 * @returns {none}                  No return
 */
func.changePanelVisible = function (show = false) {
    let panel = gl_scp.document.getElementById('atouch_iface-panel'),
        collapse = gl_scp.document.getElementById('atouch_iface-panel-collapse');

    if (panel.style.right !== '0px' || show === true) {
        // show panel
        panel.style.right = '0px';
        panel.style.opacity = +state.opacity ? +state.opacity / 100 : 1;
        panel.onmouseout = changePanelTransparencyToLast;
        panel.onmouseover = changePanelTransparencyToMax;

        collapse.style.right = '2px';
        collapse.style.background = '#0cb1b3';
        collapse.innerHTML = '&#9654;';
        collapse.title = Lang ? Lang.text['iface_button_hide_panel'] : '';
    } else {
        // hide panel
        panel.style.right = '-269px';
        panel.style.opacity = '1';
        panel.onmouseout = null;
        panel.onmouseover = null;
        panel.style.opacity = 1;

        collapse.style.right = '273px';
        collapse.style.background = 'none';
        collapse.innerHTML = '&#9664;';
        collapse.title = Lang ? Lang.text['iface_button_show_panel'] : '';
    }
};

/**
 * Change Atouch panel transparency
 *
 * @private
 *
 * @param {Object} event            Range changing event object
 * @returns {none}                  No return
 */
function changePanelTransparency (event) {
    let panel = gl_scp.document.getElementById('atouch_iface-panel');

    panel.style.opacity = event.target.value / 100;
}

/**
 * Change Atouch panel transparency
 *
 * @private
 *
 * @returns {none}                  No return
 */
function changePanelTransparencyToMax () {
    let panel = gl_scp.document.getElementById('atouch_iface-panel');

    panel.style.opacity = 1;
}

/**
 * Change Atouch panel transparency
 *
 * @private
 *
 * @returns {none}                  No return
 */
function changePanelTransparencyToLast () {
    let panel = gl_scp.document.getElementById('atouch_iface-panel');

    if (state.opacity) {
        panel.style.opacity = +state.opacity / 100;
    }
}

/**
 * Loads event listeners of the panel elements
 *
 * @private
 *
 * @returns {none}                  No return
 */
function loadEventListeners () {
    let panel = gl_scp.document.getElementById('atouch_iface-panel'),
        options_change = gl_scp.document.getElementById('atouch_iface-panel-content-options-change'),
        test_run = gl_scp.document.getElementById('atouch_iface-panel-content-test-start'),
        test_select = gl_scp.document.getElementById('atouch_iface-panel-content-test-select'),
        lang_select = gl_scp.document.getElementById('atouch_iface-panel-content-lang-select'),
        opacity = gl_scp.document.getElementById('atouch_iface-panel-content-opacity-select');

    panel.onmouseout = changePanelTransparencyToLast;
    panel.onmouseover = changePanelTransparencyToMax;
    opacity.oninput = changePanelTransparency;

    options_change.onclick = function () {
        changeLang(lang_select.value);
        state.opacity = +opacity.value;

        if (SL) {
            SL.saveTotalState();
        }
    };

    test_run.onclick = function () {
        sendTestToRunner(test_select.value);
    };

    gl_scp.document.addEventListener('FinishTest', function (e) {
        changePanelVisible(true);
    });

    gl_scp.document.addEventListener('StartTest', function (e) {
        changePanelVisible();
    });
}