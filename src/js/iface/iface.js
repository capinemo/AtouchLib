/**
 * @class IFACE
 * @description Atouch interface generation class
 * @version 0.0.4
 */

let IFACE = (function () {
    let SL = null,
        Debug = null,
        Lang = null,
        gl_scp = null,
        dom = {},               // List of HTML elements with text (for translating)
        action = {},            // List of HTML elements with actions (for events)
        func = {},
        state = {               // Actual state of interface
            opacity: 100,       // Transparency of interface panel
            tab: null           // Last opened interface tab
        },
        panel_vars = {          // Panel global style variables list
            main_color  : '#066',
            dark_color  : '#333',
            light_color : '#FFF',
            owner       : 'atouch'
        },
        group_css = {
            list_but : {        // Panel global styles list
                border: '0px',
                width: '26px',
                height: '26px',
                background: panel_vars.dark_color,
                color: panel_vars.light_color,
                borderRadius:  '0px',
                padding: '0px',
                margin: '2px 2px 0px',
                font: '20px/26px Arial',
                cursor: 'pointer',
                textAlign: 'center'
            },
            result_ico : {
                display: 'inline',
                height: '13px',
                background: panel_vars.dark_color,
                color: '#888',
                borderRadius: '0px',
                padding: '0px',
                margin: '4px 5px',
                font: '13px/13px Arial',
                float: 'left',
                cursor: 'default'
            },
            state_ico : {
                width: '13px',
                height: '13px',
                background: panel_vars.dark_color,
                color: '#888',
                borderRadius: '0px',
                padding: '0px',
                margin: '4px 5px',
                font: '13px/13px Arial',
                float: 'right',
                cursor: 'default'
            },
            select : {
                width: '98%',
                height: '23px',
                padding: '0px',
                margin: '2px 0px',
                background: '#FFF'
            },
            range : {
                width: '98%',
                height: '23px',
                padding: '0px',
                margin: '2px 0px',
                border: 'none',
                background: 'none'
            },
            button: {
                width: '70%',
                height: '27px',
                borderRadius: '0px',
                font: '15px/18px Arial',
                cursor: 'pointer',
                position: 'absolute',
                bottom: '2px',
                left: '15%'
            },
            input: {
                width: '98%',
                height: '23px',
                border: '1px solid #066',
                margin: '2px 0px',
                background: '#FFF',
                padding: '0px 4px',
                boxSizing: 'border-box'
            },
            link: {
                padding: '0px',
                margin: '6px',
                color: '#066',
                textDecoration: 'none',
                borderBottom: '1px solid #066'
            }
        },
        iface_frame = [{        // Panel DOM structure object
            id    : 'atouch_iface-panel',
            tag   : 'div',
            style : {
                width: '300px',
                position: 'fixed',
                background: panel_vars.dark_color,
                bottom: '5px',
                right: '0px',
                font: '15px/18px Arial',
                zIndex: '50',
                borderRadius: '10px 0px 0px 10px',
                // opacity: '.5',
                transition: 'opacity 0.3s ease-out 0s, right 0.3s ease-out 0s'
            },
            child : [{
                id    : 'atouch_iface-panel-head',
                tag   : 'div',
                style : {
                    height: '31px',
                    background: panel_vars.main_color,
                    color: panel_vars.light_color,
                    textAlign: 'center',
                    lineHeight: '30px',
                    borderRadius: '10px 0px 0px'
                },
                child : []
            }, {
                id    : 'atouch_iface-panel-collapse',
                tag   : 'div',
                inner : '&#9654;',
                var   : 'iface_button_hide_panel',
                target: 'title',
                action: 'click',
                task  : 'changePanelVisible',
                style : {
                    width: '23px',
                    height: '27px',
                    position: 'absolute',
                    color: '#FFF',
                    top: '2px',
                    right: '2px',
                    lineHeight: '27px',
                    background: '#0cb1b3',
                    textAlign: 'center',
                    paddingLeft: '4px',
                    cursor: 'pointer',
                    userSelect: 'none'
                },
                child : []
            }, {
                id    : 'atouch_iface-panel-control',
                tag   : 'div',
                style : {
                    height: '180px',
                    width: '31px',
                    background: panel_vars.dark_color,
                    float: 'left',
                    border: 'none',
                    boxSizing: 'border-box',
                    paddingTop: '5px'
                },
                child : [{
                    id    : 'atouch_iface-head-button-list',
                    tag   : 'div',
                    var   : 'iface_tab_test_title',
                    target: 'title',
                    style : group_css.list_but,
                    inner : '&#9776;',
                    action: 'click',
                    task  : 'tabList',
                    child : []
                }, {
                    id    : 'atouch_iface-head-button-auth',
                    tag   : 'div',
                    var   : 'iface_tab_auth_title',
                    target: 'title',
                    style : group_css.list_but,
                    inner : '&#9735;',
                    action: 'click',
                    task  : 'tabAuth',
                    child : []
                }, {
                    id    : 'atouch_iface-head-button-options',
                    tag   : 'div',
                    var   : 'iface_tab_option_title',
                    target: 'title',
                    style : group_css.list_but,
                    inner : '&#9881;',
                    action: 'click',
                    task  : 'tabOptions',
                    child : []
                }, {
                    id    : 'atouch_iface-head-button-report',
                    tag   : 'div',
                    var   : 'iface_tab_report_title',
                    target: 'title',
                    style : group_css.list_but,
                    inner : '&#9027;',
                    action: 'click',
                    task  : 'tabReport',
                    child : []
                }]
            }, {
                id    : 'atouch_iface-panel-content',
                tag   : 'div',
                style : {
                    height: '180px',
                    width: '269px',
                    background: panel_vars.light_color,
                    color: panel_vars.dark_color,
                    textAlign: 'center',
                    float: 'left',
                    borderRadius: '0px 0px 0px 10px',
                    position: 'relative'
                },
                child : [{
                    id    : 'atouch_iface-panel-content-title',
                    tag   : 'h5',
                    var   : 'iface_tab_test_title',
                    target: 'innerHTML',
                    style : {
                        height: '15px',
                        width: '100%',
                        fontSize: '13px',
                        lineHeight: '15px',
                        color: panel_vars.main_color,
                        margin: '5px 0px',
                        textTransform: 'uppercase'
                    },
                    child : []
                }, {
                    id    : 'atouch_iface-panel-content-test-select',
                    tag   : 'select',
                    var   : 'iface_tab_test_select_test',
                    target: 'title',
                    clas  : 'panel_elem list_elem',
                    style : group_css.select,
                    child : []
                }, {
                    id    : 'atouch_iface-panel-content-test-start',
                    tag   : 'input',
                    type  : 'button',
                    var   : 'iface_tab_test_button_start',
                    target: 'value',
                    clas  : 'panel_elem list_elem',
                    style : group_css.button,
                    appstl: {
                        background: panel_vars.main_color,
                        color: panel_vars.light_color
                    },
                    child : []
                }, {
                    id    : 'atouch_iface-panel-content-lang-select',
                    tag   : 'select',
                    var   : 'iface_tab_option_select_lang',
                    target: 'title',
                    clas  : 'panel_elem option_elem',
                    style : group_css.select,
                    appstl: {
                        display: 'none'
                    },
                    child : []
                }, {
                    id    : 'atouch_iface-panel-content-opacity-label',
                    tag   : 'span',
                    var   : 'iface_range_opacity_level',
                    target: 'innerHTML',
                    clas  : 'panel_elem option_elem',
                    style: {
                        textAlign: 'left',
                        width: '100%',
                        margin: '5px 5px 2px',
                        display: 'none'
                    },
                    child : []
                }, {
                    id    : 'atouch_iface-panel-content-opacity-select',
                    tag   : 'input',
                    type  : 'range',
                    clas  : 'panel_elem option_elem',
                    style : group_css.range,
                    appstl: {
                        display: 'none'
                    },
                    child : []
                }, {
                    id    : 'atouch_iface-panel-content-options-change',
                    tag   : 'input',
                    type  : 'button',
                    var   : 'iface_tab_option_change_lang',
                    target: 'value',
                    clas  : 'panel_elem option_elem',
                    style : group_css.button,
                    appstl: {
                        display: 'none'
                    },
                    child : []
                }]
            }, {
                id    : 'atouch_iface-panel-state',
                tag   : 'div',
                style : {
                    height: '20px',
                    width: '295px',
                    background: panel_vars.dark_color,
                    color: panel_vars.light_color,
                    float: 'left',
                    borderRadius: '0px 0px 0px 10px',
                    paddingLeft: '5px'
                },
                child : [{
                    id    : 'atouch_iface-state-error',
                    tag   : 'div',
                    style : group_css.result_ico,
                    appstl: {
                        marginLeft: '7px'
                    },
                    child : [{
                        id    : 'atouch_iface-state-error-icon',
                        tag   : 'span',
                        inner : '&#9888;',
                        style : {
                            color: '#888',
                            font: '13px/13px Arial',
                            cursor: 'default'
                        },
                        child : []
                    }, {
                        id    : 'atouch_iface-state-error-flag',
                        tag   : 'span',
                        style : {
                            background: '#ff3b3b',
                            display: 'none',
                            width: '5px',
                            height: '5px',
                            position: 'absolute',
                            top: '0px',
                            left: '-5px',
                            borderRadius: '10px'
                        },
                        child : []
                    }, {
                        id    : 'atouch_iface-state-error-num',
                        tag   : 'span',
                        inner : '',
                        style : {
                            color: '#ff3b3b',
                            marginLeft: '5px'
                        },
                        child : []
                    }]
                }, {
                    id    : 'atouch_iface-state-success',
                    tag   : 'div',
                    style : group_css.result_ico,
                    appstl: {
                        marginLeft: '19px'
                    },
                    child : [{
                        id    : 'atouch_iface-state-success-icon',
                        tag   : 'span',
                        inner : '&#8927;',
                        style : {
                            color: '#888',
                            font: '13px/13px Arial',
                            cursor: 'default'
                        },
                        child : []
                    }, {
                        id    : 'atouch_iface-state-success-num',
                        tag   : 'span',
                        inner : '',
                        style : {
                            color: '#00ff36',
                            marginLeft: '5px'
                        },
                        child : []
                    }]
                }, {
                    id    : 'atouch_iface-state-connect',
                    tag   : 'div',
                    inner : '&#9223;',
                    style : group_css.state_ico,
                    child : []
                }, {
                    id    : 'atouch_iface-state-login',
                    tag   : 'div',
                    inner : '&#9000;',
                    style : group_css.state_ico,
                    child : []
                }, {
                    id    : 'atouch_iface-state-crash',
                    tag   : 'div',
                    inner : '&#10033;',
                    style : group_css.state_ico,
                    child : []
                }]
            }]
        }];

    /**
     * Generating Atouch panel from object
     *
     * @private
     *
     * @param {Array} frame             New interface elemets array
     * @param {HTMLElement} parent      Parent element for appending childs
     * @returns {boolean}               True if success
     */
    function buildInterface (frame, parent = null) {
        let parentNode = parent || gl_scp.document.body;

        if (frame instanceof Array) {
            frame.forEach(function (item) {
                let elem = gl_scp.document.createElement(item.tag);
                elem.id = item.id;
                elem.dataset.owner = panel_vars.owner;

                for (let css in item.style) {
                    elem.style[css] = item.style[css];
                }

                if (item.appstl) {
                    for (let css in item.appstl) {
                        elem.style[css] = item.appstl[css];
                    }
                }

                if (item.type) {
                    elem.type = item.type;
                }

                if (item.inner) {
                    elem.innerHTML = item.inner;
                }

                if (item.clas) {
                    elem.className = item.clas;
                }

                if (item.value) {
                    elem.value = item.value;
                }

                if (item.var && item.target) {
                    dom[item.id] = [elem, item.target, item.var];
                }

                if (item.action && item.task) {
                    action[item.id] = [elem, item.action, item.task];
                }

                buildInterface(item.child, elem);

                parentNode.appendChild(elem);
            });

            return true;
        }

        return false;
    }

    /**
     * Loads strings of text in selected translation and input it to elements
     *
     * @private
     *
     * @returns {none}                  No return
     */
    function loadAttributes () {
        for (let key in dom) {
            try {
                dom[key][0][dom[key][1]] = Lang.text[dom[key][2]];
            } catch (e) {
                console.warn(e.message);
            }
        }

        for (let key in action) {
            try {
                action[key][0].addEventListener(action[key][1], func[action[key][2]]);
            } catch (e) {
                console.warn(e.message);
            }
        }
    }

    /**
     * Changing Atoucj active language
     *
     * @private
     *
     * @param {string} tag              Selected language tag
     * @returns {none}                  No return
     */
    function changeLang (tag) {
        let head_elem = gl_scp.document.getElementById('atouch_iface-panel-content-title');

        if (Lang) {
            Lang.setLanguage(tag);
            lang = Lang.text;
        } else {
            return;
        }

        for (let key in dom) {
            dom[key][0][dom[key][1]] = eval(dom[key][2]);
        }

        head_elem.innerHTML = lang[state.tab];
    }

    /**
     * Sends selected test id to Runner for execution
     *
     * @private
     *
     * @param {string} test_id          Selected test id
     * @returns {boolean}               True if success
     */
    function sendTestToRunner (test_id) {
        if (SL) {
            SL.runSelectedTest(test_id);
            return true;
        } else {
            return false;
        }
    }

    /**
     * Brings the state of the instance to the loaded object
     *
     * @private
     *
     * @returns {none}              No return
     */
    function applyLoadedState () {
        let panel = gl_scp.document.getElementById('atouch_iface-panel');
        panel.style.opacity = +state.opacity ? +state.opacity / 100 : 1;
    }

    //= iface.events.js

    /**
     * Generating user interface, upload listeners and start actions
     *
     * @public
     *
     * @returns {boolean}               True if success
     */
    IFACE.prototype.showPanel = function () {
        if (!gl_scp) {
            return false;
        }

        buildInterface(iface_frame);
        loadAttributes();
        func.tabList();
        loadEventListeners();

        return true;
    };

    /**
     * @constructor
     *
     * @returns {IFACE}             IFACE object
     */
    function IFACE () {
        if (IFACE.prototype.Inject && IFACE.prototype.Inject.runSelectedTest
                && IFACE.prototype.Inject.getAvailableTests
                && IFACE.prototype.Inject.saveTotalState) {
            SL = LANG.prototype.Inject;
        }

        if (SL && SL.isService('Debug')) {
            Debug = SL.Service('Debug');
        }

        if (SL && SL.isService('Lang') && SL.Service('Lang').setLanguage) {
            Lang = SL.Service('Lang');
        }

        if (SL && SL.setModuleStateCallback) {
            SL.setModuleStateCallback(this
                , function () {
                    return state;
                }
                , function (restored_state) {
                    state = restored_state;
                    applyLoadedState();
                }
            );
        }

        if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
            gl_scp = window;
        }

        this.showPanel();

        return this;
    }

    return IFACE;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {IFACE};
}