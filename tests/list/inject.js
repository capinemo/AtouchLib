module.exports = function () {
    const assert = require('chai').assert;
    const functions = require('../atouch/global.functions.js');
    global.filterVariable = functions.filterVariable;
    const inject = require('../atouch/inject');
    const INJECT = inject.INJECT;
    const Inject = new INJECT();

    describe("Inject:", function() {
        describe('typeof', function() {
            it("returns: object (1)", function() {
                assert.equal(typeof Inject, 'object');
            });

            it("returns : INJECT (2)", function() {
                assert.equal(Inject.constructor.name, 'INJECT');
            });
        });

        describe(".isService()", function() {
            it("returns: false (3)", function() {
                assert.equal(Inject.isService(), false);
            });
        });

        Inject.registerService('testService', INJECT);

        describe(".registerService('newService', 'INJECT')", function() {
            it("exeption: Error [not function given as constructor] (4)", function() {
                assert.throws(
                    () => Inject.registerService('newService', 'INJECT')
                    , /Inject: not function given as constructor/
                );
            });
        });

        describe(".registerService(INJECT, INJECT)", function() {
            it("exeption: Error [invalid name given] (5)", function() {
                assert.throws(
                    () => Inject.registerService(INJECT, INJECT)
                    , /Inject: invalid name given/
                );
            });
        });

        describe(".registerService('', INJECT)", function() {
            it("exeption: Error [empty name given] (6)", function() {
                assert.throws(
                    () => Inject.registerService('', INJECT)
                    , /Inject: empty name given/
                );
            });
        });

        describe(".isService('testService')", function() {
            it("returns: true (7)", function() {
                assert.equal(Inject.isService('testService'), true);
            });
        });

        describe(".getService('testService')", function() {
            it("returns: INJECT (8)", function() {
                assert.equal(Inject.getService('testService') instanceof INJECT, true);
            });
        });

        describe(".registerService('testService', INJECT)", function() {
            it("returns: undefined (9)", function() {
                assert.equal(Inject.registerService('testService', INJECT), undefined);
            });
        });

        describe(".registerService('new#$Service1!', INJECT)", function() {
            it("returns: undefined (10)", function() {
                assert.equal(Inject.registerService('new#$Service1!', INJECT), undefined);
            });
        });

        describe(".isService('new#$Service1!')", function() {
            it("returns: false (11)", function() {
                assert.equal(Inject.isService('new#$Service1!'), false);
            });
        });

        describe(".isService('newService1')", function() {
            it("returns: true (12)", function() {
                assert.equal(Inject.isService('newService1'), true);
            });
        });

        describe(".createObject('INJECT')", function() {
            it("exeption: Error [given parameter not a function] (13)", function() {
                assert.throws(
                    () => Inject.createObject('INJECT')
                    , /Inject: given parameter not a function/
                );
            });
        });

        describe(".createObject(INJECT)", function() {
            it("returns: INJECT (14)", function() {
                assert.equal(Inject.createObject(INJECT) instanceof INJECT, true);
            });
        });
    });
};