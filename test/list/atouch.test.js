module.exports = function () {
    const assert = require('chai').assert;
    const atouch = require("../atouch/atouch.js");
    const test = require('./test.test');
    global.ATOUCH = atouch.ATOUCH;

    const com1 = {js: 'myObj.option.5', value: 'test'},
        com2 = {js: 'myArr', value: 31},
        com3 = {id: 'mouse_test'},
        com4 = {class: 'menu_button', index: 1},
        com5 = {name: 'user_phone', index: 0, css: {'resize': 'none'}},
        com6 = {class: 'menu_button', index: 0},
        com7 = {name: 'user_login', index: 0, input: 'Master'},
        com8 = {name: 'user_login', index: 0, x: 40, y: 300},
        com9 = {name: 'user_type_sel', index: 0, num: 3},
        com10 = {tag: 'input', index: 0, file: 'd:\files\1.pdf'},
        com11 = {x: 200, y: 500};

    describe("Atouch:", function() {
        const Atouch = new ATOUCH();

        describe("typeof", function() {
            it("returns: object (1)", function() {
                assert.equal(typeof Atouch, 'object');
            });

            it("returns : ATOUCH (2)", function() {
                assert.equal(Atouch.constructor.name, 'ATOUCH');
            });
        });

        describe(".select( " + JSON.stringify(com9) + " )", function() {
            it("return: ATOUCH (3)", function() {
                assert.equal(Atouch.reset().select(com9) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'select', params: {name: 'user_type_sel', index: 0, num: 3}}] (4)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'select', params: com9}]);
            });
        });

        describe(".dragdrop( " + JSON.stringify(com8) + " )", function() {
            it("return: ATOUCH (5)", function() {
                assert.equal(Atouch.reset().dragdrop(com8) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'dragdrop', params: {name: 'user_login', index: 0, x: 40, y: 300}}] (6)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'dragdrop', params: com8}]);
            });
        });

        describe(".out( " + JSON.stringify(com3) + " )", function() {
            it("return: ATOUCH (7)", function() {
                assert.equal(Atouch.reset().out(com3) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'out', params: {id: 'mouse_test'}}] (8)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'out', params: com3}]);
            });
        });

        describe(".over( " + JSON.stringify(com3) + " )", function() {
            it("return: ATOUCH (9)", function() {
                assert.equal(Atouch.reset().over(com3) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'over', params: {id: 'mouse_test'}}] (10)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'over', params: com3}]);
            });
        });

        describe(".leave( " + JSON.stringify(com3) + " )", function() {
            it("return: ATOUCH (11)", function() {
                assert.equal(Atouch.reset().leave(com3) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'leave', params: {id: 'mouse_test'}}] (12)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'leave', params: com3}]);
            });
        });

        describe(".enter( " + JSON.stringify(com3) + " )", function() {
            it("return: ATOUCH (13)", function() {
                assert.equal(Atouch.reset().enter(com3) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'enter', params: {id: 'mouse_test'}}] (14)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'enter', params: com3}]);
            });
        });

        describe(".attach( " + JSON.stringify(com10) + " )", function() {
            it("return: ATOUCH (15)", function() {
                assert.equal(Atouch.reset().attach(com10) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'attach', params: {tag: 'input', index: 0, file: 'd:\files\1.pdf'}}] (16)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'attach', params: com10}]);
            });
        });

        describe(".scrollto( " + JSON.stringify(com11) + " )", function() {
            it("return: ATOUCH (17)", function() {
                assert.equal(Atouch.reset().scrollto(com11) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'scrollto', params: {x: 200, y: 500}}] (18)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'scrollto', params: com11}]);
            });
        });

        describe(".scrollby( " + JSON.stringify(com11) + " )", function() {
            it("return: ATOUCH (19)", function() {
                assert.equal(Atouch.reset().scrollby(com11) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'scrollby', params: {x: 200, y: 500}}] (20)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'scrollby', params: com11}]);
            });
        });

        describe(".move( " + JSON.stringify(com11) + " )", function() {
            it("return: ATOUCH (21)", function() {
                assert.equal(Atouch.reset().move(com11) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'move', params: {x: 200, y: 500}}] (22)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'move', params: com11}]);
            });
        });

        describe(".focus( " + JSON.stringify(com4) + " )", function() {
            it("return: ATOUCH (23)", function() {
                assert.equal(Atouch.reset().focus(com4) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'focus', params: {class: 'menu_button', index: 1}}] (24)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'focus', params: com4}]);
            });
        });

        describe(".up( " + JSON.stringify(com4) + " )", function() {
            it("return: ATOUCH (25)", function() {
                assert.equal(Atouch.reset().up(com4) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'up', params: {class: 'menu_button', index: 1}}] (26)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'up', params: com4}]);
            });
        });

        describe(".down( " + JSON.stringify(com4) + " )", function() {
            it("return: ATOUCH (27)", function() {
                assert.equal(Atouch.reset().down(com4) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'down', params: {class: 'menu_button', index: 1}}] (28)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'down', params: com4}]);
            });
        });

        describe(".dblclick( " + JSON.stringify(com4) + " )", function() {
            it("return: ATOUCH (29)", function() {
                assert.equal(Atouch.reset().dblclick(com4) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'dblclick', params: {class: 'menu_button', index: 1}}] (30)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'dblclick', params: com4}]);
            });
        });

        describe(".click( " + JSON.stringify(com4) + " )", function() {
            it("return: ATOUCH (31)", function() {
                assert.equal(Atouch.reset().click(com4) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'click', params: {class: 'menu_button', index: 1}}] (32)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'click', params: com4}]);
            });
        });

        describe(".clear( " + JSON.stringify(com6) + " )", function() {
            it("return: ATOUCH (33)", function() {
                assert.equal(Atouch.reset().clear(com6) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'clear', params: {class: 'menu_button', index: 0}}] (34)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'clear', params: com6}]);
            });
        });

        describe(".fill( " + JSON.stringify(com7) + " )", function() {
            it("return: ATOUCH (35)", function() {
                assert.equal(Atouch.reset().fill(com7) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'fill', params: {name: 'user_login', index: 0, input: 'Master'}}] (36)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'fill', params: com7}]);
            });
        });

        describe(".print( " + JSON.stringify(com7) + " )", function() {
            it("return: ATOUCH (37)", function() {
                assert.equal(Atouch.reset().print(com7) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'print', params: {name: 'user_login', index: 0, input: 'Master'}}] (38)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'print', params: com7}]);
            });
        });

        describe(".equal( " + JSON.stringify(com1) + " )", function() {
            it("return: ATOUCH (39)", function() {
                assert.equal(Atouch.reset().equal(com1) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'equal', params: {js: 'myObj.option.5', value: 'test'}}] (40)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'equal', params: com1}]);
            });
        });

        describe(".has( " + JSON.stringify(com1) + " )", function() {
            it("return: ATOUCH (41)", function() {
                assert.equal(Atouch.reset().has(com1) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'has', params: {js: 'myObj.option.5', value: 'test'}}] (42)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'has', params: com1}]);
            });
        });

        describe(".allhas( " + JSON.stringify(com2) + " )", function() {
            it("return: ATOUCH (43)", function() {
                assert.equal(Atouch.reset().allhas(com2) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'allhas', params: {js: 'myArr', value: 31}}] (44)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'allhas', params: com2}]);
            });
        });

        describe(".allequal( " + JSON.stringify(com2) + " )", function() {
            it("return: ATOUCH (45)", function() {
                assert.equal(Atouch.reset().allequal(com2) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'allequal', params: {js: 'myArr', value: 31}}] (46)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'allequal', params: com2}]);
            });
        });

        describe(".anyhas( " + JSON.stringify(com2) + " )", function() {
            it("return: ATOUCH (47)", function() {
                assert.equal(Atouch.reset().anyhas(com2) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'anyhas', params: {js: 'myArr', value: 31}}] (48)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'anyhas', params: com2}]);
            });
        });

        describe(".anyequal( " + JSON.stringify(com2) + " )", function() {
            it("return: ATOUCH (49)", function() {
                assert.equal(Atouch.reset().anyequal(com2) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'anyequal', params: {js: 'myArr', value: 31}}] (50)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'anyequal', params: com2}]);
            });
        });

        describe(".exists( " + JSON.stringify(com4) + " )", function() {
            it("return: ATOUCH (51)", function() {
                assert.equal(Atouch.reset().exists(com4) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'exists', params: {class: 'menu_button', index: 1}}] (52)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'exists', params: com4}]);
            });
        });

        describe(".forward()", function() {
            it("return: ATOUCH (53)", function() {
                assert.equal(Atouch.reset().forward() instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'forward'}] (54)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'forward'}]);
            });
        });

        describe(".back()", function() {
            it("return: ATOUCH (55)", function() {
                assert.equal(Atouch.reset().back() instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'back'}] (56)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'back'}]);
            });
        });

        describe(".reload()", function() {
            it("return: ATOUCH (57)", function() {
                assert.equal(Atouch.reset().reload() instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'reload'}] (58)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'reload'}]);
            });
        });

        describe(".reload()", function() {
            it("return: ATOUCH (59)", function() {
                assert.equal(Atouch.reset().reload() instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'reload'}] (60)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'reload'}]);
            });
        });

        describe(".go()", function() {
            it("return: ATOUCH (61)", function() {
                assert.equal(Atouch.reset().go() instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'go', params: ''}] (62)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'go', params: ''}]);
            });
        });

        describe(".tab()", function() {
            it("return: ATOUCH (63)", function() {
                assert.equal(Atouch.reset().tab() instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'tab', params: ''}] (64)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'tab', params: ''}]);
            });
        });

        describe(".sleep(10)", function() {
            it("return: ATOUCH (65)", function() {
                assert.equal(Atouch.reset().sleep(10) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'sleep', params: 10}] (66)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'sleep', params: 10}]);
            });
        });

        describe(".async()", function() {
            it("return: ATOUCH (67)", function() {
                assert.equal(Atouch.reset().async(Atouch.tab()) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'tab', params: '', mode: 'async'}] (68)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'tab', params: '', mode: 'async'}]);
            });
        });

        describe(".sync()", function() {
            it("return: ATOUCH (69)", function() {
                assert.equal(Atouch.reset().sync(Atouch.tab()) instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'tab', params: '', mode: 'sync'}] (70)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'tab', params: '', mode: 'sync'}]);
            });
        });

        describe(".use()", function() {
            it("return: ATOUCH (71)", function() {
                assert.equal(Atouch.reset().use() instanceof ATOUCH, true);
            });

            it.skip("getCollectedTasks: [{action: 'tab', params: '', mode: 'sync'}] (72)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'tab', params: '', mode: 'sync'}]);
            });
        });

        describe(".run()", function() {
            it("return: ATOUCH (73)", function() {
                assert.equal(Atouch.reset().run() instanceof ATOUCH, true);
            });

            it.skip("getCollectedTasks: [{action: 'tab', params: '', mode: 'sync'}] (74)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'tab', params: '', mode: 'sync'}]);
            });
        });

        describe(".append()", function() {
            it("return: ATOUCH (75)", function() {
                assert.equal(Atouch.reset().append() instanceof ATOUCH, true);
            });

            it.skip("getCollectedTasks: [{action: 'tab', params: '', mode: 'sync'}] (76)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'tab', params: '', mode: 'sync'}]);
            });
        });

        describe(".append()", function() {
            it("return: ATOUCH (77)", function() {
                assert.equal(Atouch.reset().append() instanceof ATOUCH, true);
            });

            it.skip("getCollectedTasks: [{action: 'tab', params: '', mode: 'sync'}] (78)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'tab', params: '', mode: 'sync'}]);
            });
        });

        const Atouch1 = new ATOUCH();

        describe(".config({no_gui: true})", function() {
            it("returns: ATOUCH (79)", function() {
                assert.equal(Atouch1.config({no_gui: true}) instanceof ATOUCH, true);
            });
        });


        describe(".config('no_gui')", function() {
            it("exeption: Error [not object given] (80)", function() {
                assert.throws(
                    () => Atouch1.config('no_gui')
                    , /Atouch.config: not object given/
                );
            });
        });

        describe(".config({no_gui: 'zeroNUM-0.12'})", function() {
            it("returns: ATOUCH (81)", function() {
                assert.equal(Atouch1.config({no_gui: 'zeroNUM-0.12'}) instanceof ATOUCH, true);
            });
        });

        describe(".checkConfigParam('no_gui')", function() {
            it("returns: 'zero0.12' (82)", function() {
                assert.equal(Atouch1.checkConfigParam('no_gui'), 'zero0.12');
            });
        });

        describe(".checkConfigParam('no_gui!012')", function() {
            it("returns: 'zero0.12' (83)", function() {
                assert.equal(Atouch1.checkConfigParam('no_gui!012'), 'zero0.12');
            });
        });

        describe(".checkConfigParam()", function() {
            it("exeption: Error [empty parameter name] (84)", function() {
                assert.throws(
                    () => Atouch1.checkConfigParam()
                    , /Atouch.checkConfigParam: empty parameter name/
                );
            });
        });

        describe(".checkConfigParam('no_report')", function() {
            it("returns: false (86)", function() {
                assert.equal(Atouch1.checkConfigParam('no_report'), false);
            });
        });

        describe(".checkConfigParam('no_rep')", function() {
            it("returns: false (87)", function() {
                assert.equal(Atouch1.checkConfigParam('no_rep'), false);
            });
        });

        describe("Test.getName()", function() {
            it("return: '' (88)", function() {
                assert.equal(Atouch1.Test.getName(), '');
            });
        });

        describe(".prepare(Atouch)", function() {
            it("exeption: Error [not Test object given in parameter] (89)", function() {
                Atouch1.go();

                assert.throws(
                    () => Atouch1.prepare(Atouch1)
                    , /Atouch.prepare: not Test object given in parameter/
                );
            });
        });

        describe(".prepare(Atouch.Test)", function() {
            it("exeption: Error [Given empty test] (90)", function() {
                assert.throws(
                    () => Atouch1.prepare(Atouch1.Test)
                    , /Atouch.prepare: Given empty test/
                );
            });
        });

        describe(".prepare(Atouch.Test.name('selection'))", function() {
            it("returns: ATOUCH (91)", function() {
                assert.equal(Atouch1.prepare(Atouch1.Test.name('selection')) instanceof ATOUCH, true);
            });
        });

        describe(".prepare(Atouch.Test.name('selection'))", function() {
            it("returns: ATOUCH (92)", function() {
                assert.equal(Atouch1.prepare(Atouch1.Test.name('selection')) instanceof ATOUCH, true);
            });
        });

        describe(".prepare(Atouch.Test.name('selection'))", function() {
            it("returns: ATOUCH (93)", function() {
                assert.equal(Atouch1.prepare(Atouch1.Test.name('selection')) instanceof ATOUCH, true);
            });
        });

        describe("Atouch.Test.getName()", function() {
            it("return: '' (94)", function() {
                assert.equal(Atouch1.Test.getName(), '');
            });
        });

        describe(".collect('collection', Atouch)", function() {
            it("exeption: Error [list of commands is empty] (95)", function() {
                Atouch1.reset();

                assert.throws(
                    () => Atouch1.collect('collection', Atouch1)
                    , /Atouch.collect: list of commands is empty/
                );
            });
        });

        describe(".collect('collection', Atouch.Test)", function() {
            it("exeption: Error [not Atouch object given in parameter] (96)", function() {
                assert.throws(
                    () => Atouch1.collect('collection', Atouch1.Test)
                    , /Atouch.collect: not Atouch object given in parameter/
                );
            });
        });

        describe(".collect([], Atouch.Test)", function() {
            it("exeption: Error [not string given in collection name] (97)", function() {
                assert.throws(
                    () => Atouch1.collect([], Atouch1.Test)
                    , /Atouch.collect: not string given in collection name/
                );
            });
        });

        describe(".collect('exa-mple.01', Atouch)", function() {
            it("returns: ATOUCH (98)", function() {
                Atouch1.reset().go();
                assert.equal(Atouch1.collect('exa-mple.01', Atouch1) instanceof ATOUCH, true);
            });
        });

        describe(".collect('exa-m!#$ple.01', Atouch)", function() {
            it("returns: ATOUCH (99)", function() {
                Atouch1.reset().go();
                assert.equal(Atouch1.collect('exa-m!#$ple.01', Atouch1) instanceof ATOUCH, true);
            });
        });

        describe(".sync(Atouch1.Test)", function() {
            it("exeption: Error [not Atouch object given in parameter] (100)", function() {
                assert.throws(
                    () => Atouch1.sync(Atouch1.Test)
                    , /Atouch.sync: not Atouch object given in parameter/
                );
            });
        });

        describe(".async(Atouch1.Test)", function() {
            it("exeption: Error [not Atouch object given in parameter] (101)", function() {
                assert.throws(
                    () => Atouch1.async(Atouch1.Test)
                    , /Atouch.async: not Atouch object given in parameter/
                );
            });
        });

        describe(".messageFromEditor()", function() {
            it("returns: false (102)", function() {
                assert.equal(Atouch.messageFromEditor(), false);
            });
        });

        describe(".messageFromEditor('Atouch editor ready')", function() {
            it("returns: true (103)", function() {
                assert.equal(Atouch.messageFromEditor('Atouch editor ready'), true);
            });
        });

        describe(".messageFromEditor('Atouch start record')", function() {
            it("returns: true (104)", function() {
                assert.equal(Atouch.messageFromEditor('Atouch start record'), true);
            });
        });

        describe(".messageFromEditor('Atouch stop record')", function() {
            it("returns: true (105)", function() {
                assert.equal(Atouch.messageFromEditor('Atouch stop record'), true);
            });
        });

        describe(".messageFromEditor('Atouch run record')", function() {
            it("returns: true (106)", function() {
                assert.equal(Atouch.messageFromEditor('Atouch run record'), true);
            });
        });

        describe(".messageFromEditor('Atouch stop')", function() {
            it("returns: false (107)", function() {
                assert.equal(Atouch.messageFromEditor('Atouch stop'), false);
            });
        });

        describe(".sleep()", function() {
            it("return: ATOUCH (108)", function() {
                assert.equal(Atouch.reset().sleep() instanceof ATOUCH, true);
            });

            it("getCollectedTasks: [{action: 'sleep', params: 1}] (109)", function() {
                assert.deepEqual(Atouch.getCollectedTasks()
                , [{action: 'sleep', params: 1}]);
            });
        });

        describe(".config({no_guis: 'zeroNUM-0.12'})", function() {
            it("returns: ATOUCH (110)", function() {
                assert.equal(Atouch1.config({no_guis: 'zeroNUM-0.12'}) instanceof ATOUCH, true);
            });
        });

    /*Atouch
        .config({no_gui: true})
        .collect('VideoCheck',
            Atouch.async(
                Atouch.equal(com1).equal(com2).exists(com3)
            )
        )
        .collect('MasterLogin20',
            Atouch.click(com4).has(com5)
        )
        .collect('ListenersLogin10',
            Atouch.click(com6).wait(10)
        )
        .prepare(
            Atouch.Test.name('test_htmlcheck').chain(
                    Atouch.sync(
                        Atouch.print(com7).wait(20).click(com6)
                    )
                )
        )
        .prepare(
            Atouch.Test.id('User1Login').name('test_htmlcheck1')
                .desc('Short html checking').chain(
                    Atouch.sync(
                        Atouch.print(com8)
                    )
                )
        )
        .run()
        .run(
            Atouch.async(
                Atouch
                    .tab()
                    .tab('file:///D:/work/project/Atouch/library/build/index.html' + '?p=0', 'MasterLogin20')
                    .tab('file:///D:/work/project/Atouch/library/build/index.html' + '?p=1', 'User1Login')
            )
        );*/

    });

    test(new ATOUCH());
};
