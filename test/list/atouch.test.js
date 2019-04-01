module.exports = function () {
    const assert = require('chai').assert;
    const atouch = require("../atouch/atouch.js");
    global.ATOUCH = atouch.ATOUCH;

    describe("Atouch:", function() {
        const Atouch1 = new ATOUCH();

        describe("typeof", function() {
            it("returns: object (1)", function() {
                assert.equal(typeof Atouch1, 'object');
            });

            it("returns : ATOUCH (2)", function() {
                assert.equal(Atouch1.constructor.name, 'ATOUCH');
            });
        });

        describe(".config({no_gui: true})", function() {
            it("returns: ATOUCH (3)", function() {
                assert.equal(Atouch1.config({no_gui: true}) instanceof ATOUCH, true);
            });
        });

        describe(".checkConfigParam('no_gui')", function() {
            it("returns: true (4)", function() {
                assert.equal(Atouch1.checkConfigParam('no_gui'), true);
            });
        });

        describe(".checkConfigParam('no_report')", function() {
            it("returns: false (5)", function() {
                assert.equal(Atouch1.checkConfigParam('no_report'), false);
            });
        });

        describe(".checkConfigParam('no_rep')", function() {
            it("returns: false (6)", function() {
                assert.equal(Atouch1.checkConfigParam('no_rep'), false);
            });
        });

        describe(".config('no_gui')", function() {
            it("exeption: Error [not object given] (7)", function() {
                assert.throws(
                    () => Atouch1.config('no_gui')
                    , /Atouch.config: not object given/
                );
            });
        });

        describe(".config({no_gui: 'zeroNUM-0.12'})", function() {
            it("returns: ATOUCH (8)", function() {
                assert.equal(Atouch1.config({no_gui: 'zeroNUM-0.12'}) instanceof ATOUCH, true);
            });
        });

        describe(".checkConfigParam('no_gui')", function() {
            it("returns: 'zero0.12' (9)", function() {
                assert.equal(Atouch1.checkConfigParam('no_gui'), 'zero0.12');
            });
        });

        describe(".checkConfigParam('no_gui!012')", function() {
            it("returns: 'zero0.12' (10)", function() {
                assert.equal(Atouch1.checkConfigParam('no_gui!012'), 'zero0.12');
            });
        });

        describe(".checkConfigParam()", function() {
            it("exeption: Error [empty parameter name] (11)", function() {
                assert.throws(
                    () => Atouch1.checkConfigParam()
                    , /Atouch.checkConfigParam: empty parameter name/
                );
            });
        });

        describe(".prepare(Atouch)", function() {
            it("exeption: Error [not Test object given in parameter] (12)", function() {
                Atouch1.go('').check({});

                assert.throws(
                    () => Atouch1.prepare(Atouch1)
                    , /Atouch.prepare: not Test object given in parameter/
                );
            });
        });

        describe(".prepare(Atouch.Test)", function() {
            it("exeption: Error [Given empty test] (13)", function() {
                assert.throws(
                    () => Atouch1.prepare(Atouch1.Test)
                    , /Atouch.prepare: Given empty test/
                );
            });
        });

        describe(".prepare(Atouch.Test.name('selection'))", function() {
            it("returns: ATOUCH (14)", function() {
                assert.equal(Atouch1.prepare(Atouch1.Test.name('selection')) instanceof ATOUCH, true);
            });
        });

        describe(".prepare(Atouch.Test.name('selection'))", function() {
            it("returns: ATOUCH (15)", function() {
                assert.equal(Atouch1.prepare(Atouch1.Test.name('selection')) instanceof ATOUCH, true);
            });
        });

        describe(".prepare(Atouch.Test.name('selection'))", function() {
            it("returns: ATOUCH (16)", function() {
                assert.equal(Atouch1.prepare(Atouch1.Test.name('selection')) instanceof ATOUCH, true);
            });
        });

        describe("Atouch.Test.getName()", function() {
            it("return: '' (17)", function() {
                assert.equal(Atouch1.Test.getName(), '');
            });
        });

        const Atouch2 = new ATOUCH();

        describe(".collect('collection', Atouch)", function() {
            it("exeption: Error [list of commands is empty] (18)", function() {
                Atouch2.reset();

                assert.throws(
                    () => Atouch2.collect('collection', Atouch2)
                    , /Atouch.collect: list of commands is empty/
                );
            });
        });

        describe(".collect('collection', Atouch.Test)", function() {
            it("exeption: Error [not Atouch object given in parameter] (19)", function() {
                assert.throws(
                    () => Atouch2.collect('collection', Atouch2.Test)
                    , /Atouch.collect: not Atouch object given in parameter/
                );
            });
        });

        describe(".collect([], Atouch.Test)", function() {
            it("exeption: Error [not string given in collection name] (20)", function() {
                assert.throws(
                    () => Atouch2.collect([], Atouch2.Test)
                    , /Atouch.collect: not string given in collection name/
                );
            });
        });

        const Atouch3 = new ATOUCH();

        describe(".collect('exa-mple.01', Atouch)", function() {
            it("returns: ATOUCH (21)", function() {
                Atouch3.go('').check({});
                assert.equal(Atouch3.collect('exa-mple.01', Atouch3) instanceof ATOUCH, true);
            });
        });

        describe(".collect('exa-m!#$ple.01', Atouch)", function() {
            it("returns: ATOUCH (22)", function() {
                Atouch3.go('').check({});
                assert.equal(Atouch3.collect('exa-m!#$ple.01', Atouch3) instanceof ATOUCH, true);
            });
        });

        describe(".sync(Atouch3.go('').check({}))", function() {
            it("returns: ATOUCH (23)", function() {
                assert.equal(Atouch3.sync(Atouch3.go('').check({})) instanceof ATOUCH, true);
            });
        });

        describe(".async(Atouch3.go('').check({}))", function() {
            it("returns: ATOUCH (24)", function() {
                assert.equal(Atouch3.async(Atouch3.go('').check({})) instanceof ATOUCH, true);
            });
        });

        describe(".sync(Atouch3.Test)", function() {
            it("exeption: Error [not Atouch object given in parameter] (25)", function() {
                assert.throws(
                    () => Atouch3.sync(Atouch3.Test)
                    , /Atouch.sync: not Atouch object given in parameter/
                );
            });
        });

        describe(".async(Atouch3.Test)", function() {
            it("exeption: Error [not Atouch object given in parameter] (26)", function() {
                assert.throws(
                    () => Atouch3.async(Atouch3.Test)
                    , /Atouch.async: not Atouch object given in parameter/
                );
            });
        });

        describe("Atouch.async(Atouch3.reset())", function() {
            it("returns: ATOUCH (27)", function() {
                assert.equal(Atouch3.async(Atouch3.reset()) instanceof ATOUCH, true);
            });
        });

        const Atouch4 = new ATOUCH();

        describe(".getCollectedTasks()", function() {
            it("returns: [] (28)", function() {
                ;
                assert.deepEqual(Atouch4.getCollectedTasks(), []);
            });
        });

        describe(".go('').check({}).getCollectedTasks()", function() {
            it("returns: [{action: 'go', params: ''}, {action: 'check', params: {}}] (29)", function() {
                Atouch4.go('').check({});
                assert.deepEqual(Atouch4.getCollectedTasks(), [{action: 'go', params: ''}, {action: 'check', params: {}}]);
            });
        });
    });
};
