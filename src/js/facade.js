/**
 * @class ATOUCH
 * @description Atouch public methods
 * @version 0.0.1
 */

/**
 * Initialize parameters of current test <br />
 * <br />
 * Using example: Atouch.config({no_gui: true, no_report: true}) <br />
 * <br />
 * Values: <br />
 * ~ no_gui = false => false|true (Hide browser gui panel)<br />
 * ~ no_report = false => false|true (No send test report to server)<br />
 * ~ stop_error = false => false|true (Stop test if error)<br />
 * ~ wait_timeout = 3 => integer (>0) (Waiting step execution finish before
 * ~ print_speed = 50 => float (1-100) (Speed of text printing)
 * ~ mouse_speed = 30 => float (1-100) (Speed of mouse moving)
 * alert failure in test)<br />
 * <br />
 * Value 'no_report' used if tests loaded from server. Tests from local <br />
 * script never sends report to server.
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.config = function (param) {
    if (typeof param !== 'object') {
        throw new Error('Atouch.config: not object given');
    }

    if (typeof filterVariable === 'undefined') {
        throw new Error('Atouch.config: need a function filterVariable');
    }

    for (let key in param) {
        if (param.hasOwnProperty(key) && config.hasOwnProperty(key)) {
            config[key] = filterVariable(param[key], '[^a-z0-9\.\,]');
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
 *  Atouch.prepare(
 *      Atouch.test
 *          .name('FirstTestInJavaScript')
 *          .chain(
 *              Atouch
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
 *  Atouch.collect('NewCollectionName',
 *      Atouch
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

/**
 * Append writed Test to Interface tests list.
 * <br />
 * Using example:
 * <pre>
 *  Atouch.append(
 *      Atouch.test
 *          .name('FirstTestInJavaScript')
 *          .chain(
 *              Atouch
 *                  .jscheck({vars: 'myObj.option.first', equal: 'test'})
 *                  .jscheck({vars: 'myArr[2]', equal: 31})
 *                  .exists({id: 'HtmlElement'})
 *          )
 *      )
 * ) </pre>
 *
 * @public
 *
 * @param {TEST} Test               TEST object for adding to interface
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.append = function (Test) {
    // TODO
    return this;
};

/**
 * To current actions list appends early saved with Atouch.prepare or <br />
 * Atouch.collect actions.
 *
 * <br />
 * Using example:
 * <pre>
 *  Atouch.run(
 *      Atouch
 *          .click({class: 'menu_button', index: 0})
 * ) </pre>
 * or
 * <pre>
 *  Atouch.run(
 *      'login_saved_actions'
 * ) </pre>
 *
 * @public
 *
 * @param {ATOUCH|TEST|string} go   Object with tests or name of hash <br />
 *                                  element with saved actions
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.run = function (go) {
    // TODO
    return this;
};

/**
 * To current actions list appends early saved with Atouch.prepare or <br />
 * Atouch.collect actions.
 *
 * <br />
 * Using example:
 * <pre>
 *  Atouch.run(
 *      Atouch
 *          .click({class: 'menu_button', index: 0})
 *          .use('LoginAlgo')
 * ) </pre>
 *
 * @public
 *
 * @param {string} name             Name of hash element with saved actions
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.use = function (name) {
    // TODO
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
 *  Atouch.sync(
 *      Atouch
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
 *  Atouch.async(
 *      Atouch
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

/**
 * Pauses test execution on specified count of seconds. If parameter <br />
 * not specified saves 1 second. <br />
 *
 * <br />
 * Using example:
 * <pre>
 *  Atouch.run(
 *      Atouch
 *          .click({class: 'menu_button', index: 0})
 *          .sleep(5.56)
 * ) </pre>
 *
 * @public
 *
 * @param {float} sec               Count of seconds for waiting
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.sleep = function (sec = 0) {
    if (!sec) {
        sec = 1;
    }

    coms_buffer.push({action: 'sleep', params: sec});
    return this;
};

/**
 * Open the given url in separate tab. If parameter not specified saves <br />
 * empty string. At the test running time instead empty string using <br />
 * current page url <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .tab('https://mysite.org')
 * </pre>
 * or
 * <pre>
 *  Atouch
 *      .tab()
 * </pre>
 *
 * @public
 *
 * @param {string} param            Targer url
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.tab = function (param = '') {
    if (!param) {
        param = '';
    }

    coms_buffer.push({action: 'tab', params: param});
    return this;
};

/**
 * Open the given url. If parameter not specified saves empty string. <br />
 * At the test running time instead empty string using current page url
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .go('https://mysite.org')
 * </pre>
 * or
 * <pre>
 *  Atouch
 *      .go()
 * </pre>
 *
 * @public
 *
 * @param {string} param            Targer url
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.go = function (param = '') {
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
 *  Atouch
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
 *  Atouch
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
 *  Atouch
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
 * Checks that HTMLElement exists on page. HTMLElement description must <br />
 * have specified format: <br />
 * ~ id - {id: 'elem_with_id'} <br />
 * ~ tag & index - {tag: 'input', index: 1} <br />
 * ~ class & index - {class: 'notice_block', index: 0} <br />
 * ~ name & index - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .exists({class: 'notice_block', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.exists = function (param) {
    coms_buffer.push({action: 'exists', params: param});
    return this;
};

/**
 * Checks that content of element|element style|js variable|cookie partially <br />
 * meets certain conditions. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * ~ js (javascript variable) - {js: 'var_name'} or {js: 'var_obj.sub_arr[2]'} <br />
 * ~ cookie (cookie variable) - {cookie: 'cook_name'} <br />
 * <br />
 * Condition description must have specified format: <br />
 * ~ value - sample of expected partial of content. If given HTMLElement <br />
 * checks it value field if exists, otherwise innerHTML. If given js <br />
 * variable or cookie, it compares with given sample. <br />
 * ~ css - object with list of css styles, expected on target HTMLElement.
 * If you want to check the matches without without regard to variable type <br />
 * use 'strong' option: <br />
 * ~ strong (false|true) - default true, for disabling type checking <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .has({tag: 'textarea', index: 0, value: 'your name'})
 * </pre>
 * or
 * <pre>
 *  Atouch
 *      .has({js: 'elemList.names', value: 'user name'})
 * </pre>
 * or
 * <pre>
 *  Atouch
 *      .has({tag: 'textarea', index: 0, css: {'resize': 'none'}})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.has = function (param) {
    coms_buffer.push({action: 'has', params: param});
    return this;
};

/**
 * Checks that content of element|js variable|cookie fully <br />
 * meets certain conditions. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * ~ js (javascript variable) - {js: 'var_name'} or {js: 'var_obj.sub_arr[2]'} <br />
 * ~ cookie (cookie variable) - {cookie: 'cook_name'} <br />
 * <br />
 * Condition description must have specified format: <br />
 * ~ value - sample of expected content. If given HTMLElement has value field, <br />
 * sample compares with it, otherwise with innerHTML. If given js <br />
 * variable or cookie, it compares with given sample. <br />
 * If you want to check the matches without without regard to variable type <br />
 * use 'strong' option: <br />
 * ~ strong (false|true) - default true, for disabling type checking <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .equal({tag: 'textarea', index: 0, value: 'your name', strong: false})
 * </pre>
 * or
 * <pre>
 *  Atouch
 *      .equal({js: 'elemList.names', value: 'user name'})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.equal = function (param) {
    coms_buffer.push({action: 'equal', params: param});
    return this;
};

/**
 * Checks that content of all elements in HTMLCollection contain <br />
 * given condition. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag [& index] (HTMLElement|HTMLCollection) - {tag: 'input'} <br />
 * ~ class [& index] (HTMLElement|HTMLCollection) - {class: 'notice_block'} <br />
 * ~ name [& index] (HTMLElement|HTMLCollection) - {name: 'name_field'} <br />
 * <br />
 * Condition description must have specified format: <br />
 * ~ value - sample of expected content. If given HTMLElement has value field, <br />
 * sample compares with it, otherwise with innerHTML. <br />
 * If given one element in target description, this function work <br />
 * as ATOUCH.prototype.has. <br />
 * If you want to check the matches without without regard to variable type <br />
 * use 'strong' option: <br />
 * ~ strong (false|true) - default true, for disabling type checking <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .allhas({tag: 'textarea', value: 'your name'})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.allhas = function (param) {
    coms_buffer.push({action: 'allhas', params: param});
    return this;
};

/**
 * Checks that content of all elements in HTMLCollection corresponds <br />
 * with given condition. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag [& index] (HTMLElement|HTMLCollection) - {tag: 'input'} <br />
 * ~ class [& index] (HTMLElement|HTMLCollection) - {class: 'notice_block'} <br />
 * ~ name [& index] (HTMLElement|HTMLCollection) - {name: 'name_field'} <br />
 * <br />
 * Condition description must have specified format: <br />
 * ~ value - sample of expected content. If given HTMLElement has value field, <br />
 * sample compares with it, otherwise with innerHTML. <br />
 * If given one element in target description, this function work <br />
 * as ATOUCH.prototype.equal. <br />
 * If you want to check the matches without without regard to variable type <br />
 * use 'strong' option: <br />
 * ~ strong (false|true) - default true, for disabling type checking <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .allhas({tag: 'textarea', value: 'Input your name'})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.allequal = function (param) {
    coms_buffer.push({action: 'allequal', params: param});
    return this;
};

/**
 * Checks that content at least one element in HTMLCollection contain <br />
 * given condition. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ tag (HTMLCollection) - {tag: 'input'} <br />
 * ~ class (HTMLCollection) - {class: 'notice_block'} <br />
 * ~ name (HTMLCollection) - {name: 'name_field'} <br />
 * <br />
 * Condition description must have specified format: <br />
 * ~ value - sample of expected content. If given HTMLElements has value field, <br />
 * sample compares with it, otherwise with innerHTML. <br />
 * If you want to check the matches without without regard to variable type <br />
 * use 'strong' option: <br />
 * ~ strong (false|true) - default true, for disabling type checking <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .anyhas({tag: 'textarea', value: 'your name'})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.anyhas = function (param) {
    coms_buffer.push({action: 'anyhas', params: param});
    return this;
};

/**
 * Checks that content at least one element in HTMLCollection corresponds <br />
 * with given condition. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ tag (HTMLCollection) - {tag: 'input'} <br />
 * ~ class (HTMLCollection) - {class: 'notice_block'} <br />
 * ~ name (HTMLCollection) - {name: 'name_field'} <br />
 * <br />
 * Condition description must have specified format: <br />
 * ~ value - sample of expected content. If given HTMLElements has value field, <br />
 * sample compares with it, otherwise with innerHTML. <br />
 * If you want to check the matches without without regard to variable type <br />
 * use 'strong' option: <br />
 * ~ strong (false|true) - default true, for disabling type checking <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .anyequal({tag: 'textarea', value: 'Input your name'})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.anyequal = function (param) {
    coms_buffer.push({action: 'anyequal', params: param});
    return this;
};

/**
 * Prints string in input Element with pauses for simulating user input <br />=
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Input description must have specified format: <br />
 * ~ input - string for printing in input element. <br />
 * <br />
 * For emulation of keyboard shortcuts used specified labels: <br />
 * ^SHIFT^ - emulates keydown, keypress and keyup events for SHIFT <br />
 * #SHIFT# - emulates keydown, upkeypress events for SHIFT <br />
 * %SHIFT% - emulates keyup event for SHIFT <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .print({tag: 'textarea', index: 0, print: 'Hello^ENTER^world!'})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.print = function (param) {
    coms_buffer.push({action: 'print', params: param});
    return this;
};

/**
 * Prints string in input Element without pauses <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Input description must have specified format: <br />
 * ~ input - string for printing in input element. <br />
 * <br />
 * For emulation of keyboard shortcuts used specified labels: <br />
 * ^SHIFT^ - emulates keydown, keypress and keyup events for SHIFT <br />
 * #SHIFT# - emulates keydown, upkeypress events for SHIFT <br />
 * %SHIFT% - emulates keyup event for SHIFT <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .fill({tag: 'textarea', index: 0, print: 'Hello #SHIFT#WORLD!%SHIFT%'})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.fill = function (param) {
    coms_buffer.push({action: 'fill', params: param});
    return this;
};

/**
 * Clean value of input Element <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .clear({tag: 'textarea', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.clear = function (param) {
    coms_buffer.push({action: 'clear', params: param});
    return this;
};

/**
 * Emulates a left-button click event on a DOM element <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .click({tag: 'textarea', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.click = function (param) {
    coms_buffer.push({action: 'click', params: param});
    return this;
};

/**
 * Emulates a left-button double click event on a DOM element <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .dblclick({tag: 'textarea', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.dblclick = function (param) {
    coms_buffer.push({action: 'dblclick', params: param});
    return this;
};

/**
 * Emulates a left-button mouse down event on a DOM element <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .down({tag: 'textarea', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.down = function (param) {
    coms_buffer.push({action: 'down', params: param});
    return this;
};

/**
 * Emulates a left-button mouse up event on a DOM element <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .up({tag: 'textarea', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.up = function (param) {
    coms_buffer.push({action: 'up', params: param});
    return this;
};

/**
 * Emulates a mouse focus on a DOM element <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .focus({tag: 'textarea', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.focus = function (param) {
    coms_buffer.push({action: 'focus', params: param});
    return this;
};

/**
 * Emulates a mouse moving. Supported moving by coordinates or on center of <br />
 * HTMLElement<br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * ~ x & y (integer) - absolute coordinates on the page <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .move({tag: 'textarea', index: 0})
 * </pre>
 * or
 * <pre>
 *  Atouch
 *      .move({x: 500, y: 1500})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.move = function (param) {
    coms_buffer.push({action: 'move', params: param});
    return this;
};

/**
 * Emulates a page scrolling by absolute page coordinates. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ x & y (integer) - absolute coordinates on the page <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .scrollby({x: 500, y: 1500})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.scrollby = function (param) {
    coms_buffer.push({action: 'scrollby', params: param});
    return this;
};

/**
 * Emulates the scrolling relative to the current coordinates. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ x & y (integer) - relative coordinates <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .scrollby({x: 0, y: -200})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.scrollto = function (param) {
    coms_buffer.push({action: 'scrollto', params: param});
    return this;
};

/**
 * Emulates a file attaching to input with file type. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * For selecting attached file use spicified format: <br />
 * ~ file (string|array of string) - full name of file(s) <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .move({tag: 'input', index: 0, file: ['d:\files\1.pdf', 'd:\files\2.pdf']})
 * </pre>
 * or
 * <pre>
 *  Atouch
 *      .move({tag: 'input', index: 0, file: 'd:\files\1.pdf'})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.attach = function (param) {
    coms_buffer.push({action: 'attach', params: param});
    return this;
};

/**
 * Emulates a mouse comes over the DOM element without ascent (mouseenter). <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .enter({tag: 'textarea', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.enter = function (param) {
    coms_buffer.push({action: 'enter', params: param});
    return this;
};

/**
 * Emulates a mouse moves from the DOM element without ascent (mouseleave). <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .leave({tag: 'textarea', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.leave = function (param) {
    coms_buffer.push({action: 'leave', params: param});
    return this;
};

/**
 * Emulates a mouse comes over the DOM element with ascent (mouseover). <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .over({tag: 'textarea', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.over = function (param) {
    coms_buffer.push({action: 'over', params: param});
    return this;
};

/**
 * Emulates a mouse moves from the DOM element with ascent (mouseout). <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .out({tag: 'textarea', index: 0})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.out = function (param) {
    coms_buffer.push({action: 'out', params: param});
    return this;
};

/**
 * Emulates a mouse dragging the DOM element, moveing it and dropping. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * News coordinates for dropping must have specified format: <br />
 * ~ x & y (integer) - new coordinates for dropping <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .dragdrop({tag: 'img', index: 0, x: 30, y, 100})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.dragdrop = function (param) {
    coms_buffer.push({action: 'dragdrop', params: param});
    return this;
};

/**
 * Emulates a option selecting in select HTMLElement. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLSelectElement) - {id: 'elem_with_id'} <br />
 * ~ class & index (HTMLSelectElement) - {class: 'notice_select', index: 0} <br />
 * ~ name & index (HTMLSelectElement) - {name: 'select_me', index: 2} <br />
 * <br />
 * Selected option must have specified format: <br />
 * ~ num (integer) - order number of selected option <br />
 * ~ value (string) - field value of selected option <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .select({id: 'town_select', value: 'Moscow'})
 * </pre>
 * or
 * <pre>
 *  Atouch
 *      .select({id: 'town_select', num: 3})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
ATOUCH.prototype.select = function (param) {
    coms_buffer.push({action: 'select', params: param});
    return this;
};

/**
 * Resets current state of Atouch test parameters, commands buffer and <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .reset()
 * </pre>
 *
 * @public
 *
 * @returns {ATOUCH}                ATOUCH object
 */
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

    if (!str) {
        return false;
    }

    switch (str) {
        case 'Atouch editor ready':
            // SL.Service('Editor').setIsRedactor(messageToEditor);
            break;
        case 'Atouch start record':
            // SL.Service('Editor').startRecord();
            break;
        case 'Atouch stop record':
            // SL.Service('Editor').stopRecord();
            break;
        case 'Atouch run record':
            break;
        default:
            return false;
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

/**
 * Emulates a text selection. <br />
 * <br />
 * Target description must have specified format: <br />
 * ~ id (HTMLElement) - {id: 'elem_with_id'} <br />
 * ~ tag & index (HTMLElement) - {tag: 'input', index: 1} <br />
 * ~ class & index (HTMLElement) - {class: 'notice_block', index: 0} <br />
 * ~ name & index (HTMLElement) - {name: 'name_field', index: 2} <br />
 * <br />
 * News coordinates for dropping must have specified format: <br />
 * ~ x & y (integer) - new coordinates for dropping <br />
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .dragdrop({tag: 'img', index: 0, x: 30, y, 100})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
 * @returns {ATOUCH}                ATOUCH object
 */
/*ATOUCH.prototype.mark = function (param) {
    coms_buffer.push({action: 'mark', params: param});
    return this;
};*/

/*
ATOUCH.prototype.cookdel = function (param) {
    coms_buffer.push({action: 'cookdel', params: param});
    return this;
};*/

/**
 * Checks that HTMLElement/HTMLCollection content meets certain conditions. <br />
 * Elements description must have specified format: <br />
 * ~ id - {id: 'elem_with_id'} <br />
 * ~ tag [& index] - {tag: 'textarea'}, {tag: 'input', index: 1} <br />
 * ~ class [& index] - {class: 'bottom'}, {class: 'notice_block', index: 0} <br />
 * ~ name [& index] - {name: 'username'}, {name: 'name_field', index: 2} <br />
 * Condition description must have specified format:
 * ~ equal - content of element has full matches with given sample <br />
 * ~ has - content of element has partial matches with given sample <br />
 * ~ anyequal - content of any element in HTMLCollection has full matches with <br />
 * given sample <br />
 * ~ anyhas - content of any element in HTMLCollection has partial matches with <br />
 * given sample <br />
 * ~ allequal - content of all elements in HTMLCollection has full matches with <br />
 * given sample <br />
 * ~ allhas - content of all elements in HTMLCollection has partial matches with <br />
 * given sample <br />
 * If the element has a value, checking uses this field, otherwise it <br />
 * checks for innerHTML
 * <br />
 * Using example:<br />
 * <pre>
 *  Atouch
 *      .check({tag: 'textarea', anyequal: 'Input your name'})
 * </pre>
 * or
 * <pre>
 *  Atouch
 *      .check({class: 'head_notice', index: 0, has: 'name is empty'})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
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
 *  Atouch
 *      .csscheck({tag: 'textarea', index: 0, has: {'resize': 'none'}})
 * </pre>
 * or
 * <pre>
 *  Atouch
 *      .csscheck({id: 'top_menu', has: {'color': '#006666', '-webkit-border-radius': '7px'}})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
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
 *  Atouch
 *      .jscheck({tag: 'textarea', index: 0, has: {'resize': 'none'}})
 * </pre>
 * or
 * <pre>
 *  Atouch
 *      .jscheck({id: 'top_menu', has: {'color': '#006666', '-webkit-border-radius': '7px'}})
 * </pre>
 *
 * @public
 *
 * @param {Object} param            Object with parameters
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

/*
ATOUCH.prototype.while = function (str) {

    return this;
};

ATOUCH.prototype.until = function (str) {

    return this;
};*/