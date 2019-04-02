/**
 * @class ATOUCH
 * @description Atouch public methods
 * @version 0.0.1
 */

/**
 * Creates new TEST object
 * @type TEST
 */
ATOUCH.prototype.Test = new TEST();

/**
 * Initialize parameters of current test <br />
 * <br />
 * Using example: atouch.config({no_gui: true, no_report: true}) <br />
 * <br />
 * Values: <br />
 * ~ no_gui = false|true [default:false] (Hide browser gui panel)<br />
 * ~ no_report = false|true [default:false] (No send test report to server)<br />
 * ~ stop_error = false|true [default:false] (Stop test if error)<br />
 * ~ wait_timeout = integer [default:3] (Waiting step execution finish before
 * alert failure in test)<br />
 * <br />
 * Value 'no_report' used if tests loaded from server. Tests from local <br />
 * script never sends report to server.
 *
 * @public
 *
 * @param {Object} params           Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.config = function (params) {
    if (typeof params !== 'object') {
        throw new Error('Atouch.config: not object given');
    }

    for (let key in params) {
        if (params.hasOwnProperty(key) && config.hasOwnProperty(key)) {
            config[key] = filterVariable(params[key], '[^a-z0-9\.\,]');
        } else {
            console.warn('Atouch.config: given parameter ' + key + ' not exists');
        }
    }

    return this;
};

/**
 * Returns value of parameter in current test
 *
 * @public
 *
 * @param {string} name             Name of test parameter
 * @returns {any}                   Saved parameter value
 */
ATOUCH.prototype.checkConfigParam = function (name = '') {
    if (name === '') {
        throw new Error('Atouch.checkConfigParam: empty parameter name');
    }

    name = filterVariable(name.toString(), '[^a-z_]');

    if (typeof config[name] === 'undefined') {
        console.warn('Atouch.checkConfigParam: given parameter ' + name + ' not exists.');
        return false;
    }

    return config[name];
};

/**
 * Saves test for further use <br />
 * <br />
 * Using example:
 * <pre>
 *  atouch.prepare(
 *      atouch.test
 *          .name('FirstTestInJavaScript')
 *          .chain(
 *              atouch
 *                  .jscheck({vars: 'myObj.option.first', equal: 'test'})
 *                  .jscheck({vars: 'myArr[2]', equal: 31})
 *                  .exists({id: 'HtmlElement'})
 *          )
 *      )
 * ) </pre>
 *
 * @public
 *
 * @param {ATEST} test              TEST object with created test
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.prepare = function (test) {
    if (!(test instanceof TEST)) {
        throw new Error('Atouch.prepare: not Test object given in parameter');
    }

    if (!test.getName()) {
        throw new Error('Atouch.prepare: Given empty test');
    }

    if (Collections[test.getName()]) {
        console.warn('Atouch.prepare: test with name ' + test.getName() + ' already exists. Rewrited');
    }

    Collections[test.getName()] = test;
    test.reset();

    return this;
};

/**
 * Saves to buffer commands collection for further use <br />
 * <br />
 * Using example:
 * <pre>
 *  atouch.collect('NewCollectionName',
 *      atouch
 *          .jscheck({vars: 'myObj.option.first', equal: 'test'})
 *          .jscheck({vars: 'myArr[2]', equal: 31})
 *          .exists({id: 'HtmlElement'})
 * ) </pre>
 *
 * @public
 *
 * @param {string} name             Collection name
 * @param {ATOUCH} self             ATOUCH object with list of command
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.collect = function (name, self) {
    if (typeof name !== 'string') {
        throw new Error('Atouch.collect: not string given in collection name');
    }

    name = filterVariable(name.toString(), '[^-a-zA-Z0-9\.\,_ ]');

    if (!(self instanceof ATOUCH)) {
        throw new Error('Atouch.collect: not Atouch object given in parameter');
    }

    if (coms_buffer.length === 0) {
        throw new Error('Atouch.collect: list of commands is empty');
    }

    if (Collections[name]) {
        console.warn('Atouch.collect: collection with name ' + name + ' already exists. Rewrited');
    }

    Collections[name] = self.getCollectedTasks();

    return this;
};

ATOUCH.prototype.append = function (str) {

    return this;
};

ATOUCH.prototype.run = function (str) {

    return this;
};

/**
 * Sets order of command execution in list. In this case <br />
 * commands will be running sequentially. Next command starts <br />
 * when previous finished. If sync/async not used, all commands, <br />
 * by default, runs in sync mode.
 *
 * <br />
 * Using example:
 * <pre>
 *  atouch.sync(
 *      atouch
 *          .jscheck({vars: 'myObj.option.first', equal: 'test'})
 *          .jscheck({vars: 'myArr[2]', equal: 31})
 *          .exists({id: 'HtmlElement'})
 * ) </pre>
 *
 * @public
 *
 * @param {ATOUCH} self             ATOUCH object with list of command
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.sync = function (self) {
    if (!(self instanceof ATOUCH)) {
        throw new Error('Atouch.sync: not Atouch object given in parameter');
    }

    setRunOrder(false);
    return this;
};

/**
 * Sets order of command execution in list. In this case <br />
 * commands will be running separately. Next command starts <br />
 * after previous starting. If sync/async not used, all commands, <br />
 * by default, runs in sync mode.
 *
 * <br />
 * Using example:
 * <pre>
 *  atouch.async(
 *      atouch
 *          .jscheck({vars: 'myObj.option.first', equal: 'test'})
 *          .jscheck({vars: 'myArr[2]', equal: 31})
 *          .exists({id: 'HtmlElement'})
 * ) </pre>
 *
 * @public
 *
 * @param {ATOUCH} self             ATOUCH object with list of command
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.async = function (self) {
    if (!(self instanceof ATOUCH)) {
        throw new Error('Atouch.async: not Atouch object given in parameter');
    }

    setRunOrder(true);
    return this;
};

ATOUCH.prototype.use = function (str) {

    return this;
};

ATOUCH.prototype.wait = function (str) {

    return this;
};

ATOUCH.prototype.while = function (str) {

    return this;
};

ATOUCH.prototype.until = function (str) {

    return this;
};

ATOUCH.prototype.page = function (param) {
    coms_buffer.push({action: 'page', params: param});
    return this;
};

/**
 * Open the given url. If parameter not specified saves empty string. <br />
 * At the test running time instead empty string using current page url
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .go('https://mysite.org')
 * </pre>
 * or
 * <pre>
 *  atouch
 *      .go()
 * </pre>
 *
 * @public
 *
 * @param {string} param            Targer url
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.go = function (param) {
    if (!param) {
        param = '';
    }

    coms_buffer.push({action: 'go', params: param});
    return this;
};

/**
 * Reload current page.
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .reload()
 * </pre>
 *
 * @public
 *
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.reload = function () {
    coms_buffer.push({action: 'reload'});
    return this;
};

/**
 * Loads previous in browser history page.
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .back()
 * </pre>
 *
 * @public
 *
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.back = function () {
    coms_buffer.push({action: 'back'});
    return this;
};

/**
 * Loads next in browser history page.
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .forward()
 * </pre>
 *
 * @public
 *
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.forward = function () {
    coms_buffer.push({action: 'forward'});
    return this;
};

/**
 * Checks that element exists on page. Element description must <br />
 * have specified format: <br />
 * ~ id - {id: 'elem_with_id'} <br />
 * ~ tag & index - {tag: 'input', index: 1} <br />
 * ~ class & index - {class: 'notice_block', index: 0} <br />
 * ~ name & index - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .exists({class: 'notice_block', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} params           Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.exists = function (param) {
    coms_buffer.push({action: 'exists', params: param});
    return this;
};

/**
 * Checks that element/elements content meets certain conditions. Elements <br />
 * description must have specified format: <br />
 * ~ id - {id: 'elem_with_id'} <br />
 * ~ tag [& index] - {tag: 'textarea'}, {tag: 'input', index: 1} <br />
 * ~ class [& index] - {class: 'bottom'}, {class: 'notice_block', index: 0} <br />
 * ~ name [& index] - {name: 'username'}, {name: 'name_field', index: 2} <br />
 * Condition description must have specified format:
 * ~ equal - content of element has full matches with given sample <br />
 * ~ has - content of element has partial matches with given sample <br />
 * ~ anyequal - content of any element in collection has full matches with <br />
 * given sample <br />
 * ~ anyhas - content of any element in collection has partial matches with <br />
 * given sample <br />
 * ~ allequal - content of all elements in collection has full matches with <br />
 * given sample <br />
 * ~ allhas - content of all elements in collection has partial matches with <br />
 * given sample <br />
 * If the element has a value, checking uses this field, otherwise it <br />
 * checks for innerHTML
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .check({tag: 'textarea', anyequal: 'Input your name'})
 * </pre>
 * or
 * <pre>
 *  atouch
 *      .check({class: 'head_notice', index: 0, has: 'name is empty'})
 * </pre>
 *
 * @public
 *
 * @param {Object} params           Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
/*ATOUCH.prototype.check = function (param) {
    coms_buffer.push({action: 'check', params: param});
    return this;
};*/

/**
 * Checks that element css style meets certain conditions. Elements <br />
 * description must have specified format: <br />
 * ~ id - {id: 'elem_with_id'} <br />
 * ~ tag & index - {tag: 'input', index: 1} <br />
 * ~ class & index - {class: 'notice_block', index: 0} <br />
 * ~ name & index - {name: 'name_field', index: 2} <br />
 * Condition description must have specified format:
 * ~ has - style of element has full matches with given object with properties <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .csscheck({tag: 'textarea', index: 0, has: {'resize': 'none'}})
 * </pre>
 * or
 * <pre>
 *  atouch
 *      .csscheck({id: 'top_menu', has: {'color': '#006666', '-webkit-border-radius': '7px'}})
 * </pre>
 *
 * @public
 *
 * @param {Object} params           Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
/*ATOUCH.prototype.csscheck = function (param) {
    coms_buffer.push({action: 'csscheck', params: param});
    return this;
};*/

/**
 * Checks that javascript variable meets certain conditions. <br />
 * Variable must have specified format:
 * ~ vars - {vars: 'js_variable'}, {vars: 'js_arrya[0]}, <br />
 * {vars: 'js_object.elem.subelem[3]'}
 * Condition description must have specified format:
 * ~ has - content of variable has partial matches with given sample<br />
 * ~ equal - content of variable has full matches with given sample<br />
 * ~ type - typeof of variable equal to given type<br />
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .jscheck({tag: 'textarea', index: 0, has: {'resize': 'none'}})
 * </pre>
 * or
 * <pre>
 *  atouch
 *      .jscheck({id: 'top_menu', has: {'color': '#006666', '-webkit-border-radius': '7px'}})
 * </pre>
 *
 * @public
 *
 * @param {Object} params           Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
/*ATOUCH.prototype.jscheck = function (param) {
    coms_buffer.push({action: 'jscheck', params: param});
    return this;
};*/

/*ATOUCH.prototype.cookcheck = function (param) {
    coms_buffer.push({action: 'cookcheck', params: param});
    return this;
};*/

/**
 * Checks that content of element|element style|js variable|cookie partially <br />
 * meets certain conditions. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (DOM Element) - {id: 'elem_with_id'} <br />
 * ~ tag & index (DOM Element) - {tag: 'input', index: 1} <br />
 * ~ class & index (DOM Element) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (DOM Element) - {name: 'name_field', index: 2} <br />
 * ~ js (javascript variable) - {js: 'var_name'} or {js: 'var_obj.sub_arr[2]'} <br />
 * ~ cookie (cookie variable) - {cookie: 'cook_name'} <br />
 * <br />
 * Condition description must have specified format:
 * ~ value - sample of expected partial of content. If given DOM Element <br />
 * checks it value field if exists, otherwise innerHTML. If given js <br />
 * variable or cookie, it compares with given sample. <br />
 * ~ css - object with list of css styles, expected on target DOM Element.
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .has({tag: 'textarea', index: 0, value: 'your name'})
 * </pre>
 * or
 * <pre>
 *  atouch
 *      .has({js: 'elemList.names', value: 'user name'})
 * </pre>
 * or
 * <pre>
 *  atouch
 *      .has({tag: 'textarea', index: 0, css: {'resize': 'none'}})
 * </pre>
 *
 * @public
 *
 * @param {Object} params           Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.has = function (param) {
    coms_buffer.push({action: 'has', params: param});
    return this;
};

/**the most stringent check
 * Checks that content of element|js variable|cookie fully <br />
 * meets certain conditions. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (DOM Element) - {id: 'elem_with_id'} <br />
 * ~ tag & index (DOM Element) - {tag: 'input', index: 1} <br />
 * ~ class & index (DOM Element) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (DOM Element) - {name: 'name_field', index: 2} <br />
 * ~ js (javascript variable) - {js: 'var_name'} or {js: 'var_obj.sub_arr[2]'} <br />
 * ~ cookie (cookie variable) - {cookie: 'cook_name'} <br />
 * <br />
 * Condition description must have specified format:
 * ~ value - sample of expected content. If given DOM Element has value field, <br />
 * sample compares with it, otherwise with innerHTML. If given js <br />
 * variable or cookie, it compares with given sample. <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .equal({tag: 'textarea', index: 0, value: 'your name'})
 * </pre>
 * or
 * <pre>
 *  atouch
 *      .equal({js: 'elemList.names', value: 'user name'})
 * </pre>
 *
 * @public
 *
 * @param {Object} params           Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.equal = function (param) {
    coms_buffer.push({action: 'equal', params: param});
    return this;
};

/**
 * Checks that content of all elements in html collection contain <br />
 * given condition. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (DOM Element) - {id: 'elem_with_id'} <br />
 * ~ tag [& index] (DOM Element|Collection) - {tag: 'input'} <br />
 * ~ class [& index] (DOM Element|Collection) - {class: 'notice_block'} <br />
 * ~ name [& index] (DOM Element|Collection) - {name: 'name_field'} <br />
 * <br />
 * Condition description must have specified format:
 * ~ value - sample of expected content. If given DOM Element has value field, <br />
 * sample compares with it, otherwise with innerHTML. <br />
 * If given one element in target description, this function work <br />
 * as ATOUCH.prototype.has. <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .allhas({tag: 'textarea', value: 'your name'})
 * </pre>
 *
 * @public
 *
 * @param {Object} params           Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.allhas = function (param) {
    coms_buffer.push({action: 'allhas', params: param});
    return this;
};

/**
 * Checks that content of all elements in html collection corresponds <br />
 * with given condition. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (DOM Element) - {id: 'elem_with_id'} <br />
 * ~ tag [& index] (DOM Element|Collection) - {tag: 'input'} <br />
 * ~ class [& index] (DOM Element|Collection) - {class: 'notice_block'} <br />
 * ~ name [& index] (DOM Element|Collection) - {name: 'name_field'} <br />
 * <br />
 * Condition description must have specified format:
 * ~ value - sample of expected content. If given DOM Element has value field, <br />
 * sample compares with it, otherwise with innerHTML. <br />
 * If given one element in target description, this function work <br />
 * as ATOUCH.prototype.equal. <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .allhas({tag: 'textarea', value: 'Input your name'})
 * </pre>
 *
 * @public
 *
 * @param {Object} params           Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.allequal = function (param) {
    coms_buffer.push({action: 'allequal', params: param});
    return this;
};

/**
 * Checks that content at least one element in html collection contain <br />
 * given condition. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ tag (DOM Collection) - {tag: 'input'} <br />
 * ~ class (DOM Collection) - {class: 'notice_block'} <br />
 * ~ name (DOM Collection) - {name: 'name_field'} <br />
 * <br />
 * Condition description must have specified format:
 * ~ value - sample of expected content. If given DOM Elements has value field, <br />
 * sample compares with it, otherwise with innerHTML. <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .anyhas({tag: 'textarea', value: 'your name'})
 * </pre>
 *
 * @public
 *
 * @param {Object} params           Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.anyhas = function (param) {
    coms_buffer.push({action: 'anyhas', params: param});
    return this;
};

/**
 * Checks that content at least one element in html collection corresponds <br />
 * with given condition. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ tag (DOM Collection) - {tag: 'input'} <br />
 * ~ class (DOM Collection) - {class: 'notice_block'} <br />
 * ~ name (DOM Collection) - {name: 'name_field'} <br />
 * <br />
 * Condition description must have specified format:
 * ~ value - sample of expected content. If given DOM Elements has value field, <br />
 * sample compares with it, otherwise with innerHTML. <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  atouch
 *      .anyequal({tag: 'textarea', value: 'Input your name'})
 * </pre>
 *
 * @public
 *
 * @param {Object} params           Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.anyequal = function (param) {
    coms_buffer.push({action: 'anyequal', params: param});
    return this;
};

/*
ATOUCH.prototype.cookdel = function (param) {
    coms_buffer.push({action: 'cookdel', params: param});
    return this;
};*/

ATOUCH.prototype.print = function (param) {

    coms_buffer.push({action: 'print', params: param});
    return this;
};

ATOUCH.prototype.fill = function (param) {

    coms_buffer.push({action: 'fill', params: param});
    return this;
};

ATOUCH.prototype.clear = function (param) {

    coms_buffer.push({action: 'clear', params: param});
    return this;
};

ATOUCH.prototype.click = function (param) {

    coms_buffer.push({action: 'click', params: param});
    return this;
};

ATOUCH.prototype.dblclick = function (param) {

    coms_buffer.push({action: 'dblclick', params: param});
    return this;
};

ATOUCH.prototype.down = function (param) {

    coms_buffer.push({action: 'down', params: param});
    return this;
};

ATOUCH.prototype.up = function (param) {

    coms_buffer.push({action: 'up', params: param});
    return this;
};

ATOUCH.prototype.focus = function (param) {

    coms_buffer.push({action: 'focus', params: param});
    return this;
};

ATOUCH.prototype.move = function (param) {

    coms_buffer.push({action: 'move', params: param});
    return this;
};

ATOUCH.prototype.scrollby = function (param) {

    coms_buffer.push({action: 'scrollby', params: param});
    return this;
};

ATOUCH.prototype.scrollto = function (param) {

    coms_buffer.push({action: 'scrollto', params: param});
    return this;
};

ATOUCH.prototype.attach = function (param) {

    coms_buffer.push({action: 'attach', params: param});
    return this;
};

ATOUCH.prototype.come = function (param) {

    coms_buffer.push({action: 'come', params: param});
    return this;
};

ATOUCH.prototype.leave = function (param) {

    coms_buffer.push({action: 'leave', params: param});
    return this;
};

ATOUCH.prototype.over = function (param) {

    coms_buffer.push({action: 'over', params: param});
    return this;
};

ATOUCH.prototype.out = function (param) {

    coms_buffer.push({action: 'out', params: param});
    return this;
};

ATOUCH.prototype.pull = function (param) {

    coms_buffer.push({action: 'pull', params: param});
    return this;
};

ATOUCH.prototype.mark = function (param) {

    coms_buffer.push({action: 'mark', params: param});
    return this;
};

ATOUCH.prototype.select = function (param) {

    coms_buffer.push({action: 'select', params: param});
    return this;
};

ATOUCH.prototype.reset = function () {
    config.no_gui = false;
    config.no_report = false;
    config.stop_error = false;
    config.wait_timeout = 3;

    coms_buffer = [];
    this.Test.reset();

    return this;
};

/**
 * Method for sending messages from Editor page to Atouch
 *
 * @public
 *
 * @param {string} str      Received message from Editor page
 * @returns {boolean}       True if success
 */
ATOUCH.prototype.messageFromEditor = function (str) {
    /* if (!SL.isService('Editor')) {
        return false;
    } */

    switch (str) {
        case 'atouch editor ready':
            // SL.getService('Editor').setIsRedactor(messageToEditor);
            break;
        case 'atouch start record':
            // SL.getService('Editor').startRecord();
            break;
        case 'atouch stop record':
            // SL.getService('Editor').stopRecord();
            break;
        case 'atouch run record':
            break;
        default:
            break;
    }

    return true;
};

/**
 * Returns and clean commands buffer. Used by Test class for getting collected <br />
 * test therefore must be a public.
 *
 * @public
 *
 * @returns {array}         Prepared tasks collection
 */
ATOUCH.prototype.getCollectedTasks = function () {
    let tmp = coms_buffer;

    coms_buffer = [];

    return tmp;
};

