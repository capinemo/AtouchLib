/**
 * @class RUNNER
 * @description Atouch tests running and handling class
 * @version 0.0.7
 */
let RUNNER = (function () {
    const control = {},           // List of contoller objects (Mouse, Keyboard, Browser)
        state = {               // Actual state of Runner
            execute: null,      // Executed test ID
            run: null,          // Running task ID
            status: null,       // Running task state (done - task finished, wait - task running)
            progress: null,     // Command of running taks state
            result: null,       // Result of finished task (error|success),
            log: [],            // List of task results (0 if success or error key number)
            error: 0            // Error key number of last finished task
        };


    let SL = null,          // Global Facade Object
        Debug = null,
        Log = null,                    // Log object for logging events and statuses
        gl_scp = null,
        listeners = [],         // Array with listeners of phases state changing
        task_list = [];         // Tasks list of the running test

    //= runner.listen.js

    //= runner.check.js

    //= log/log.js

    //= browser/browser.js

    //= mouse/mouse.js

    //= keyboard/keyboard.js

    /**
     * Generates tasks list of test from given Array
     *
     * @private
     *
     * @param {Array} tasks             List of tasks
     * @returns {boolean}               Test building result
     */
    function buildTasksList (tasks) {
        let controllers = {
            Browser : ['go', 'reload', 'check', 'csscheck', 'jscheck', 'cookcheck', 'cookdel', 'back', 'forward'],
            Mouse   : [
                'click', 'dblclick', 'down', 'up', 'move', 'scrollby', 'scrollto'
                , 'attach', 'come', 'leave', 'over', 'out', 'pull', 'mark'
                , 'select', 'focus'
            ],
            Keyboard: ['print', 'fill', 'clear']
        };

        task_list = [];

        tasks.forEach(function (item, i, arr) {
            let select_controller = null;
            for (let contr in controllers) {
                if (~controllers[contr].indexOf(item.action)) {
                    select_controller = contr;
                    break;
                }
            }

            if (!select_controller) {
                // ! Необходимо журналировать и дебажить
                return false;
            }

            task_list.push({
                controller  : select_controller,
                action      : item.action,
                params      : item.params
            });
        });

        return true;
    }

    /**
     * Runs prepared tasks list
     *
     * @private
     *
     * @returns {none}              No return
     */
    function execActiveTest () {
        if (state.run === null) {
            state.run = 0;
        }

        if (!task_list[state.run]) {
            return;
        }

        SL.cleanTotalState();

        runTask();

        timer = setTimeout(function tick () {
            if (state.status === 'done') {
                if (state.result === 'success') {
                    // _addSuccessTest();
                } else {
                    // _addErrorTest();
                }

                if (task_list[state.run + 1]) {
                    state.run += 1;
                    state.status = 'wait';
                    state.progress = null;
                    state.result = null;

                    runTask();
                } else {
                    clearTimeout(timer);

                    console.log(state.log);
                    console.log(compareVariables(state.log, test_list[state.execute].result));

                    if (gl_scp.document) {
                        gl_scp.document.dispatchEvent(new Event('FinishTest', {
                            cancelable: true,
                            bubbles: false
                        }));
                    }
                    state.status = null;
                    state.result = null;
                    state.execute = null;
                    state.run = null;
                    state.progress = null;
                    state.log = [];

                    return;
                }
            }

            timer = setTimeout(tick, 10);
        });
    }

    /**
     * Runs one task of test
     *
     * @private
     *
     * @returns {none}              No return
     */
    function runTask () {
        let task = task_list[state.run],
            ctrl = control[task.controller],
            handler = task.action;

        if (!task || !ctrl || !handler) {
            return;
        }

        ctrl[handler](task.params
            , function () {
                state.status = 'done';
                state.result = 'success';
                state.log.push(0);
            }
            , function () {
                state.status = 'done';
                state.result = 'error';
                state.log.push(state.error);
                state.error = 0;
            });
    }

    /**
     * Brings the state of the instance to the loaded object
     *
     * @private
     *
     * @returns {none}              No return
     */
    function applyLoadedState () {

    }

    /**
     * Preparing and running selected test
     *
     * @public
     *
     * @param {string} test_id          Selected test id
     * @returns {boolean}               True if success
     */
    RUNNER.prototype.runTest = function (test_id = null) {
        let test_list = [];

        if (SL) {
            test_list = SL.getAvailableTests();
        }

        if (test_id === null && state.execute) {
            test_id = state.execute;
        } else if (!test_list[test_id]) {
            return false;
        }

        state.execute = test_id;

        if (buildTasksList(test_list[test_id].tasks)) {
            if (gl_scp.document) {
                gl_scp.document.dispatchEvent(new Event('StartTest', {
                    cancelable: true,
                    bubbles: false
                }));
            }

            execActiveTest();
        }

        return true;
    };

    /**
     * @constructor
     *
     * @returns {RUNNER}            RUNNER object
     */
    function RUNNER () {
        if (RUNNER.prototype.Inject && RUNNER.prototype.Inject.cleanTotalState
                && RUNNER.prototype.Inject.getAvailableTests) {
            SL = RUNNER.prototype.Inject;
            Log = SL.createObject(LOG);
            if (DEBUG_MODE) console.info('MODULE: LOG loaded to RUNNER');
        } else {
            Log = new Log();
        }

        if (SL && SL.isService('Debug')) {
            Debug = SL.Service('Debug');
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

        if (typeof BROWSER !== 'undefined') {
            control.Browser = SL.createObject(BROWSER);
            if (DEBUG_MODE) console.info('MODULE: BROWSER loaded to RUNNER');
        }

        if (typeof MOUSE !== 'undefined') {
            control.Mouse = SL.createObject(MOUSE);
            if (DEBUG_MODE) console.info('MODULE: MOUSE loaded to RUNNER');
        }

        if (typeof KEYBOARD !== 'undefined') {
            control.Keyboard = SL.createObject(KEYBOARD);
            if (DEBUG_MODE) console.info('MODULE: KEYBOARD loaded to RUNNER');
        }

        if (typeof window !== 'undefined' && typeof window.document !== 'undefined') {
            gl_scp = window;
        }

        return this;
    }

    return RUNNER;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {RUNNER};
}