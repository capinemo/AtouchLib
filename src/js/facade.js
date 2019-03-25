/**
 * @class ATOUCH
 * @description Atouch public methods
 * @version 0.0.1
 */

/**
 * Initialize parameters of library <br />
 * <br />
 * Using example: atouch.config({no_gui: true, no_report: true}) <br />
 * <br />
 * Values: <br />
 * ~ no_gui = false|true [default:false] (Hide browser gui panel)<br />
 * ~ no_report = false|true [default:false] (No send test report to server)<br />
 * ~ stop_error = false|true [default:false] (Stop test if error)<br />
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
        console.warn('Atouch.config: not object given');
        return this;
    }

    for (let key in params) {
        if (params.hasOwnProperty(key) && Config.hasOwnProperty(key)) {
            Config[key] = filterVariable(params[key], '[^a-zA-Z0-9\.\,]');
        } else {
            console.warn('Atouch.config: given parameter ' + key + ' not exists')
        }
    }

    return this;
};

ATOUCH.prototype.prepare = function (str) {

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
 * @param {array} params            Array with command objects
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.collect = function (name, collection) {
    if (typeof name !== 'string') {
        console.warn('Atouch.collect: not string given in collection name');
        return this;
    }

    if (!(collection instanceof Array)) {
        console.warn('Atouch.collect: not array given in collection');
        return this;
    }

    
    return this;
};

ATOUCH.prototype.append = function (str) {

    return this;
};

ATOUCH.prototype.run = function (str) {

    return this;
};

ATOUCH.prototype.sync = function (str) {

    return {};
};

ATOUCH.prototype.async = function (str) {

    return {};
};

ATOUCH.prototype.use = function (str) {

    return this;
};

ATOUCH.prototype.test = function (str) {

    return {};
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

ATOUCH.prototype.page = function (str) {

    return this;
};

ATOUCH.prototype.go = function (str) {

    return this;
};

ATOUCH.prototype.reload = function (str) {

    return this;
};

ATOUCH.prototype.back = function (str) {

    return this;
};

ATOUCH.prototype.forward = function (str) {

    return this;
};

ATOUCH.prototype.exists = function (str) {

    return this;
};

ATOUCH.prototype.check = function (str) {

    return this;
};

ATOUCH.prototype.csscheck = function (str) {

    return this;
};

ATOUCH.prototype.jscheck = function (str) {

    return this;
};

ATOUCH.prototype.cookcheck = function (str) {

    return this;
};

ATOUCH.prototype.cookdel = function (str) {

    return this;
};

ATOUCH.prototype.print = function (str) {

    return this;
};

ATOUCH.prototype.fill = function (str) {

    return this;
};

ATOUCH.prototype.clear = function (str) {

    return this;
};

ATOUCH.prototype.click = function (str) {

    return this;
};

ATOUCH.prototype.dblclick = function (str) {

    return this;
};

ATOUCH.prototype.down = function (str) {

    return this;
};

ATOUCH.prototype.up = function (str) {

    return this;
};

ATOUCH.prototype.focus = function (str) {

    return this;
};

ATOUCH.prototype.move = function (str) {

    return this;
};

ATOUCH.prototype.scrollby = function (str) {

    return this;
};

ATOUCH.prototype.scrollto = function (str) {

    return this;
};

ATOUCH.prototype.attach = function (str) {

    return this;
};

ATOUCH.prototype.come = function (str) {

    return this;
};

ATOUCH.prototype.leave = function (str) {

    return this;
};

ATOUCH.prototype.over = function (str) {

    return this;
};

ATOUCH.prototype.out = function (str) {

    return this;
};

ATOUCH.prototype.pull = function (str) {

    return this;
};

ATOUCH.prototype.mark = function (str) {

    return this;
};

ATOUCH.prototype.select = function (str) {

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

