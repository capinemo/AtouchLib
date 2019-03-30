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
 * ~ wait_timeout = integer [default:10] (Waiting step execution finish before
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
            config[key] = filterVariable(params[key], 'a-z0-9\.\,');
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

    name = filterVariable(name.toString(), 'a-z_');

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
 * <pre>atouch.prepare(
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
 * <pre>atouch.collect('NewCollectionName',
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

    name = filterVariable(name.toString(), '-a-zA-Z0-9\.\,_ ');

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
 * <pre>atouch.sync(
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
 * <pre>atouch.async(
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

ATOUCH.prototype.go = function (param) {

    coms_buffer.push({action: 'go', params: param});
    return this;
};

ATOUCH.prototype.reload = function (param) {

    coms_buffer.push({action: 'reload', params: param});
    return this;
};

ATOUCH.prototype.back = function (param) {

    coms_buffer.push({action: 'back', params: param});
    return this;
};

ATOUCH.prototype.forward = function (param) {

    coms_buffer.push({action: 'forward', params: param});
    return this;
};

ATOUCH.prototype.exists = function (param) {

    coms_buffer.push({action: 'exists', params: param});
    return this;
};

ATOUCH.prototype.check = function (param) {

    coms_buffer.push({action: 'check', params: param});
    return this;
};

ATOUCH.prototype.csscheck = function (param) {

    coms_buffer.push({action: 'csscheck', params: param});
    return this;
};

ATOUCH.prototype.jscheck = function (param) {

    coms_buffer.push({action: 'jscheck', params: param});
    return this;
};

ATOUCH.prototype.cookcheck = function (param) {

    coms_buffer.push({action: 'cookcheck', params: param});
    return this;
};

ATOUCH.prototype.cookdel = function (param) {

    coms_buffer.push({action: 'cookdel', params: param});
    return this;
};

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
    for (let key in config) {
        if (config.hasOwnProperty(key)) {
            config[key] = false;
        }
    }

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
 * Returns and cleand commands buffer
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

