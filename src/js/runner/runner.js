/**
 * @class RUNNER
 * @description Atouch tests running and handling class
 * @version 0.0.7
 */
let RUNNER = (function () {
    let Inject = null,          // Global Facade Object
        Log,                    // Log object for logging events and statuses
        control = {},           // List of contoller objects (Mouse, Keyboard, Browser)
        state = {               // Actual state of Runner
            execute: null,      // Executed test ID
            run: null,          // Running task ID
            status: null,       // Running task state (done - task finished, wait - task running)
            progress: null,     // Command of running taks state
            result: null,       // Result of finished task (error|success),
            log: [],            // List of task results (0 if success or error key number)
            error: 0            // Error key number of last finished task
        },
        listeners = [],         // Array with listeners of phases state changing
        task_list = [],         // Tasks list of the running test
        _;

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
        
        Inject.cleanTotalState();

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

                    document.dispatchEvent(new Event('FinishTest', {
                        cancelable: true,
                        bubbles: false
                    }));

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

        if (Inject) {
            test_list = Inject.getAvailableTests();
        }

        if (test_id === null && state.execute) {
            test_id = state.execute;
        } else if (!test_list[test_id]) {
            return false;
        }

        state.execute = test_id;

        if (buildTasksList(test_list[test_id].tasks)) {
            document.dispatchEvent(new Event('StartTest', {
                cancelable: true,
                bubbles: false
            }));
            
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
        if (this.Inject) {
            Inject = this.Inject;
            Inject.setModuleStateCallback(this
                , function () {
                    return state;
                }
                , function (restored_state) {
                    state = restored_state;
                    applyLoadedState();
                }
            );
        }

        Log = new LOG(this.Inject);
        control.Browser = new BROWSER(this.Inject);
        control.Mouse = new MOUSE(this.Inject);
        control.Keyboard = new KEYBOARD(this.Inject);

        return this;
    }

    return RUNNER;
})();

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {RUNNER};
}