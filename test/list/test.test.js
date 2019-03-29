module.exports = function () {
    const assert = require('chai').assert;

    const atouch = require("../atouch/atouch.js");
    global.ATOUCH = atouch.ATOUCH;
    const Atouch = new ATOUCH();
    Atouch.go('').check({});

    const functions = require('../atouch/global.functions.js');
    global.filterVariable = functions.filterVariable;
    global.genUUID = functions.genUUID;

    const test = require('../atouch/test.js');
    const TEST = test.TEST;
    const Test = new TEST();


    describe("Test:", function() {
        describe(".id('FirstTestId')", function() {
            it("return: TEST (1)", function() {
                assert.equal(Test.id('FirstTestId') instanceof TEST, true);
            });
        });

        describe(".name('FirstTest')", function() {
            it("return: TEST (2)", function() {
                assert.equal(Test.name('FirstTest') instanceof TEST, true);
            });
        });

        describe(".desc('FirstTestDescription')", function() {
            it("return: TEST (3)", function() {
                assert.equal(Test.desc('FirstTestDescription') instanceof TEST, true);
            });
        });

        describe(".chain(Atouch.go('').check({}))", function() {
            it("return: TEST (4)", function() {
                assert.equal(Test.chain(Atouch) instanceof TEST, true);
            });
        });

        describe(".getId()", function() {
            it("return: 'FirstTestId' (5)", function() {
                assert.equal(Test.getId(), 'FirstTestId');
            });
        });

        describe(".getName()", function() {
            it("return: 'FirstTest' (6)", function() {
                assert.equal(Test.getName(), 'FirstTest');
            });
        });

        describe(".getDesc()", function() {
            it("return: 'FirstTestDescription' (7)", function() {
                assert.equal(Test.getDesc(), 'FirstTestDescription');
            });
        });

        describe(".getChain()", function() {
            it("return: [{action: 'go', params: ''}, {action: 'check', params: {}}] (8)", function() {
                assert.deepEqual(Test.getChain(), [{action: 'go', params: ''}, {action: 'check', params: {}}]);
            });
        });

        describe(".reset()", function() {
            it("return: TEST (9)", function() {
                assert.equal(Test.reset() instanceof TEST, true);
            });
        });

        describe(".getId()", function() {
             it("return: '' (10)", function() {
                assert.equal(Test.getId(), '');
            });
        });

        describe(".getName()", function() {
            it("return: '' (11)", function() {
                assert.equal(Test.getName(), '');
            });
        });

        describe(".getDesc()", function() {
            it("return: '' (12)", function() {
                assert.equal(Test.getDesc(), '');
            });
        });

        describe(".getChain()", function() {
            it("return: [] (13)", function() {
                assert.deepEqual(Test.getChain(), []);
            });
        });

        describe(".id(123)", function() {
            it("exeption: Error [not string given in parameter] (14)", function() {
                assert.throws(
                    () => Test.id(123)
                    , /Test.id: not string given in parameter/
                );
            });
        });

        describe(".id('First_$Test123&-Id@')", function() {
            it("return: TEST (15)", function() {
                assert.equal(Test.id('First_$Test123&-Id@') instanceof TEST, true);
            });
        });

        describe(".getId()", function() {
             it("return: 'First_Test123-Id' (16)", function() {
                assert.equal(Test.getId(), 'First_Test123-Id');
            });
        });

        describe(".id('')", function() {
            it("return: TEST (16)", function() {
                assert.equal(Test.id('') instanceof TEST, true);
            });
        });

        describe(".getId()", function() {
           it("returns: UUID string (17)", function() {
               assert.match(Test.getId(), /^[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}$/);
           });
        });

        describe(".id(123)", function() {
            it("exeption: Error [not string given in parameter] (18)", function() {
                assert.throws(
                    () => Test.id(123)
                    , /Test.id: not string given in parameter/
                );
            });
        });

        describe(".name(123)", function() {
            it("exeption: Error [not string given in parameter] (19)", function() {
                assert.throws(
                    () => Test.name(123)
                    , /Test.name: not string given in parameter/
                );
            });
        });

        describe(".name('')", function() {
            it("exeption: Error [empty string given] (20)", function() {
                assert.throws(
                    () => Test.name('')
                    , /Test.name: empty string given/
                );
            });
        });

        describe(".name('First_$Test123&-Name@')", function() {
            it("return: TEST (21)", function() {
                assert.equal(Test.name('First_$Test123&-Name@') instanceof TEST, true);
            });
        });

        describe(".getName()", function() {
             it("return: 'First_Test123-Name' (22)", function() {
                assert.equal(Test.getName(), 'First_Test123-Name');
            });
        });

        describe(".desc(123)", function() {
            it("exeption: Error [not string given in parameter] (19)", function() {
                assert.throws(
                    () => Test.desc(123)
                    , /Test.description: not string given in parameter/
                );
            });
        });

        describe(".desc('First_$Test123&-Описание-Ёё.@')", function() {
            it("return: TEST (21)", function() {
                assert.equal(Test.desc('First_$Test123&-Описание-Ёё.@') instanceof TEST, true);
            });
        });

        describe(".getDesc()", function() {
             it("return: 'First_Test123-Описание-Ёё.' (22)", function() {
                assert.equal(Test.getDesc(), 'First_Test123-Описание-Ёё.');
            });
        });

        describe(".chain(123)", function() {
            it("exeption: Error [not Atouch object given in parameter] (23)", function() {
                assert.throws(
                    () => Test.chain(123)
                    , /Test.chain: not Atouch object given in parameter/
                );
            });
        });

        describe(".chain(Test)", function() {
            it("exeption: Error [not Atouch object given in parameter] (24)", function() {
                assert.throws(
                    () => Test.chain(Test)
                    , /Test.chain: not Atouch object given in parameter/
                );
            });
        });

        describe(".chain(Atouch)", function() {
            it("exeption: Error [invalid interface of Atouch object. Need a getCollectedTasks function] (25)", function() {
                Atouch.getCollectedTasks = '123';
                assert.throws(
                    () => Test.chain(Atouch)
                    , /Test.chain: invalid interface of Atouch object. Need a getCollectedTasks function/
                );
            });
        });

        describe(".getId()", function() {
           it("returns: UUID string (26)", function() {
               Test.reset();
               Test.name('123');
               assert.match(Test.getId(), /^[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}$/);
           });
        });
    });
};