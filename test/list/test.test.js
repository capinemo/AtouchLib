module.exports = function (Parent) {
    const assert = require('chai').assert;
    const inject = require("../atouch/inject.js");
    const atouch = require("../atouch/atouch.js");
    const test = require('../atouch/test.js');

    global.INJECT = inject.INJECT;
    global.ATOUCH = atouch.ATOUCH;
    global.TEST = test.TEST;

    let Test,
        Atouch;

    if (Parent && Parent instanceof ATOUCH) {
        Test = Parent.Test;
        Atouch = Parent;
    } else {
        global.SL = new INJECT ();
        require('../atouch/inject.extends.js');
        Test = SL.createObject(TEST);
        Atouch = new ATOUCH();
    }

    describe("Test:", function() {
        describe(".id('FirstTestId')", function() {
            it("return: TEST (1)", function() {
                assert.equal(Test.id('FirstTestId') instanceof Test.constructor, true);
            });
        });

        describe(".name('FirstTest')", function() {
            it("return: TEST (2)", function() {
                assert.equal(Test.name('FirstTest') instanceof Test.constructor, true);
            });
        });

        describe(".desc('FirstTestDescription')", function() {
            it("return: TEST (3)", function() {
                assert.equal(Test.desc('FirstTestDescription') instanceof Test.constructor, true);
            });
        });

        describe(".chain(Atouch.go(''))", function() {
            it("return: TEST (4)", function() {
                assert.equal(Test.chain(Atouch.go('')) instanceof Test.constructor, true);
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
            it("return: [{action: 'go', params: ''}] (8)", function() {
                assert.deepEqual(Test.getChain(), [{action: 'go', params: ''}]);
            });
        });

        describe(".reset()", function() {
            it("return: TEST (9)", function() {
                assert.equal(Test.reset() instanceof Test.constructor, true);
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
                assert.equal(Test.id('First_$Test123&-Id@') instanceof Test.constructor, true);
            });
        });

        describe(".getId()", function() {
             it("return: 'First_Test123-Id' (16)", function() {
                assert.equal(Test.getId(), 'First_Test123-Id');
            });
        });

        describe(".id('')", function() {
            it("return: TEST (16)", function() {
                assert.equal(Test.id('') instanceof Test.constructor, true);
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
                assert.equal(Test.name('First_$Test123&-Name@') instanceof Test.constructor, true);
            });
        });

        describe(".getName()", function() {
             it("return: 'First_Test123-Name' (22)", function() {
                assert.equal(Test.getName(), 'First_Test123-Name');
            });
        });

        describe(".desc(123)", function() {
            it("exeption: Error [not string given in parameter] (23)", function() {
                assert.throws(
                    () => Test.desc(123)
                    , /Test.description: not string given in parameter/
                );
            });
        });

        describe(".desc('First_$Test123&-Описание-Ёё.@')", function() {
            it("return: TEST (27)", function() {
                assert.equal(Test.desc('First_$Test123&-Описание-Ёё.@') instanceof Test.constructor, true);
            });
        });

        describe(".getDesc()", function() {
             it("return: 'First_Test123-Описание-Ёё.' (28)", function() {
                assert.equal(Test.getDesc(), 'First_Test123-Описание-Ёё.');
            });
        });

        describe(".chain(123)", function() {
            it("exeption: Error [not Atouch object given in parameter] (29)", function() {
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

        /*describe("new TEST()", function() {
            it("exeption: Error [to constructor given invalid service locator] (27)", function() {
                assert.throws(
                    () => new TEST()
                    , /TEST: to constructor given invalid service locator/
                );
            });
        });

        describe("new TEST(new Date())", function() {
            it("exeption: Error [to constructor given invalid service locator] (28)", function() {
                assert.throws(
                    () => new TEST(new Date())
                    , /TEST: to constructor given invalid service locator/
                );
            });
        });*/
    });
};