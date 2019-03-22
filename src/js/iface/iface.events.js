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
function tabList () {
    let panel_elem = document.getElementsByClassName('panel_elem'),
        target_elem = document.getElementsByClassName('list_elem'),
        head_elem = document.getElementById('atouch_iface-panel-content-title'),
        test_select = document.getElementById('atouch_iface-panel-content-test-select'),
        tests = [];

    for (let i = panel_elem.length; i--;) {
        panel_elem[i].style.display = 'none';
    }

    for (let i = target_elem.length; i--;) {
        target_elem[i].style.display = 'inline';
    }

    state.tab = 'iface_tab_test_title';
    head_elem.innerHTML = lang[state.tab];
    test_select.innerHTML = '';

    if (Inject) {
        tests = Inject.getAvailableTests();
    }

    // Generating tests list from Server
    for (let item in tests) {
        let elem = document.createElement('option');
        elem.innerHTML = tests[item].name;
        elem.value = item;
        test_select.appendChild(elem);
    }
}

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
function tabOptions () {
    let panel_elem = document.getElementsByClassName('panel_elem'),
        target_elem = document.getElementsByClassName('option_elem'),
        head_elem = document.getElementById('atouch_iface-panel-content-title'),
        lang_select = document.getElementById('atouch_iface-panel-content-lang-select'),
        opacity = document.getElementById('atouch_iface-panel-content-opacity-select');

    for (let i = panel_elem.length; i--;) {
        panel_elem[i].style.display = 'none';
    }

    for (let i = target_elem.length; i--;) {
        target_elem[i].style.display = 'inline';
    }

    state.tab = 'iface_tab_option_title';
    head_elem.innerHTML = lang[state.tab];
    lang_select.innerHTML = '';

    for (let line in lang_list) {
        let elem = document.createElement('option');
        elem.innerHTML = lang_list[line].name;
        elem.value = lang_list[line].link;
        lang_select.appendChild(elem);
    }

    opacity.min = 20;
    opacity.max = 100;
    opacity.step = 2;
    opacity.value = state.opacity ? state.opacity : 100;
}

/**
 * Selecting authorization tab
 * - Hidding all content elements and showing auth elements
 *
 * @private
 *
 * @returns {none}              No return
 */
function tabAuth () {
    let panel_elem = document.getElementsByClassName('panel_elem'),
        target_elem = document.getElementsByClassName('auth_elem'),
        head_elem = document.getElementById('atouch_iface-panel-content-title');

    for (let i = panel_elem.length; i--;) {
        panel_elem[i].style.display = 'none';
    }

    for (let i = target_elem.length; i--;) {
        target_elem[i].style.display = 'inline';
    }

    state.tab = 'iface_tab_auth_title';
    head_elem.innerHTML = lang[state.tab];
}

/**
 * Selecting reporting tab
 * - Hidding all content elements and showing report elements
 *
 * @private
 *
 * @returns {none}              No return
 */
function tabReport () {
    let panel_elem = document.getElementsByClassName('panel_elem'),
        target_elem = document.getElementsByClassName('report_elem'),
        head_elem = document.getElementById('atouch_iface-panel-content-title');

    for (let i = panel_elem.length; i--;) {
        panel_elem[i].style.display = 'none';
    }

    for (let i = target_elem.length; i--;) {
        target_elem[i].style.display = 'inline';
    }

    state.tab = 'iface_tab_report_title';
    head_elem.innerHTML = lang[state.tab];
}

/**
 * Hide or show Atouch panel
 *
 * @private
 *
 * @param {boolean} show            Force hides panel (default: false)
 * @returns {none}                  No return
 */
function changePanelVisible (show = false) {
    let panel = document.getElementById('atouch_iface-panel'),
        collapse = document.getElementById('atouch_iface-panel-collapse');

    if (panel.style.right !== '0px' || show === true) {
        // show panel
        panel.style.right = '0px';
        panel.style.opacity = +state.opacity ? +state.opacity / 100 : 1;
        panel.onmouseout = changePanelTransparencyToLast;
        panel.onmouseover = changePanelTransparencyToMax;

        collapse.style.right = '2px';
        collapse.style.background = '#0cb1b3';
        collapse.innerHTML = '&#9654;';
        collapse.title = lang.iface_button_hide_panel;
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
        collapse.title = lang.iface_button_show_panel;
    }
}

/**
 * Change Atouch panel transparency
 *
 * @private
 *
 * @param {Object} event            Range changing event object
 * @returns {none}                  No return
 */
function changePanelTransparency (event) {
    let panel = document.getElementById('atouch_iface-panel');

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
    let panel = document.getElementById('atouch_iface-panel');

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
    let panel = document.getElementById('atouch_iface-panel');

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
    let panel = document.getElementById('atouch_iface-panel'),
        options_change = document.getElementById('atouch_iface-panel-content-options-change'),
        test_run = document.getElementById('atouch_iface-panel-content-test-start'),
        test_select = document.getElementById('atouch_iface-panel-content-test-select'),
        lang_select = document.getElementById('atouch_iface-panel-content-lang-select'),
        opacity = document.getElementById('atouch_iface-panel-content-opacity-select');

    panel.onmouseout = changePanelTransparencyToLast;
    panel.onmouseover = changePanelTransparencyToMax;
    opacity.oninput = changePanelTransparency;
    
    options_change.onclick = function () {
        changeLang(lang_select.value);
        state.opacity = +opacity.value;

        if (Inject) {
            Inject.saveTotalState();
        }
    };

    test_run.onclick = function () {
        sendTestToRunner(test_select.value);
    };

    document.addEventListener('FinishTest', function (e) {
        changePanelVisible(true);
    });
    
    document.addEventListener('StartTest', function (e) {
        changePanelVisible();
    });
}