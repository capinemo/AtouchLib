module.exports = function () {
    const assert = require('chai').assert;
    const functions = require('../atouch/global.functions');
    global.filterVariable = functions.filterVariable;
    const inject = require('../atouch/inject');
    const INJECT = inject.INJECT;

    describe("Inject:", function() {
        const Inject = new INJECT();

        describe("instanceof", function() {
            it("returns: typeof -> object (1)", function() {
                assert.equal(typeof Inject, 'object');
            });

            it("returns : instanceof -> INJECT (2)", function() {
                assert.equal(Inject instanceof INJECT, true);
            });
        });

        describe(".isService()", function() {
           it("exeption: Error [empty name given] (3)", function() {
                assert.throws(
                    () => Inject.isService()
                    , /Inject.isService: empty name given/
                );
            });
        });

        Inject.registerService('testService', INJECT);

        describe(".registerService('newService', 'INJECT')", function() {
            it("exeption: Error [not function given as constructor] (4)", function() {
                assert.throws(
                    () => Inject.registerService('newService', 'INJECT')
                    , /Inject.registerService: not function given as constructor/
                );
            });
        });

        describe(".registerService(INJECT, INJECT)", function() {
            it("exeption: Error [invalid name given] (5)", function() {
                assert.throws(
                    () => Inject.registerService(INJECT, INJECT)
                    , /Inject.registerService: invalid name given/
                );
            });
        });

        describe(".registerService('', INJECT)", function() {
            it("exeption: Error [empty name given] (6)", function() {
                assert.throws(
                    () => Inject.registerService('', INJECT)
                    , /Inject.registerService: empty name given/
                );
            });
        });

        describe(".isService('testService')", function() {
            it("returns: true (7)", function() {
                assert.equal(Inject.isService('testService'), true);
            });
        });

        describe(".Service('testService')", function() {
            it("returns: INJECT (8)", function() {
                assert.equal(Inject.Service('testService') instanceof INJECT, true);
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
                    , /Inject.createObject: given parameter not a function/
                );
            });
        });

        describe(".createObject(INJECT)", function() {
            it("returns: INJECT (14)", function() {
                assert.equal(Inject.createObject(INJECT) instanceof INJECT, true);
            });
        });

        describe(".Service()", function() {
           it("exeption: Error [empty name given] (15)", function() {
                assert.throws(
                    () => Inject.Service()
                    , /Inject.Service: empty name given/
                );
            });
        });

        describe(".Service('MissingService')", function() {
           it("exeption: Error [service not exists] (16)", function() {
                assert.throws(
                    () => Inject.Service('MissingService')
                    , /Inject.Service: service not exists/
                );
            });
        });

        describe(".listService()", function() {
            it("returns: ['testService', 'newService1'] (17)", function() {
                assert.deepEqual(Inject.listService(), ['testService', 'newService1']);
            });
        });

        describe(".isProcedure()", function() {
           it("exeption: Error [empty name given] (18)", function() {
                assert.throws(
                    () => Inject.isProcedure()
                    , /Inject.isProcedure: empty name given/
                );
            });
        });

        Inject.registerProcedure('newTrueFunction', () => {return true;});

        describe(".registerProcedure('newFalseFunction', false)", function() {
            it("exeption: Error [not function given as subroutines] (19)", function() {
                assert.throws(
                    () => Inject.registerProcedure('newFalseFunction', false)
                    , /Inject.registerProcedure: not function given as subroutines/
                );
            });
        });

        describe(".registerProcedure(INJECT, () => {return false;})", function() {
            it("exeption: Error [invalid name given] (20)", function() {
                assert.throws(
                    () => Inject.registerProcedure(INJECT, () => {return false;})
                    , /Inject.registerProcedure: invalid name given/
                );
            });
        });

        describe(".registerProcedure('', () => {return false;})", function() {
            it("exeption: Error [empty name given] (21)", function() {
                assert.throws(
                    () => Inject.registerProcedure('', () => {return false;})
                    , /Inject.registerProcedure: empty name given/
                );
            });
        });

        describe(".isProcedure('newTrueFunction')", function() {
            it("returns: true (22)", function() {
                assert.equal(Inject.isProcedure('newTrueFunction'), true);
            });
        });

        describe(".newTrueFunction('')", function() {
            it("returns: Function (23)", function() {
                assert.equal(Inject.newTrueFunction instanceof Function, true);
            });
        });

        describe(".registerProcedure('newFalseFunction', () => {return false;})", function() {
            it("returns: undefined (24)", function() {
                assert.equal(Inject.registerProcedure('newFalseFunction', () => {return false;}), undefined);
            });
        });

        describe(".isProcedure('newTrue#$Function!')", function() {
            it("returns: false (25)", function() {
                assert.equal(Inject.isProcedure('newTrue#$Function!'), false);
            });
        });

        describe(".isProcedure('newTrueFunction')", function() {
            it("returns: true (26)", function() {
                assert.equal(Inject.isProcedure('newTrueFunction'), true);
            });
        });

        describe(".registerProcedure('newTrue#$Function!', () => {return 2;)", function() {
           it("exeption: Error [name of subroutine is used] (27)", function() {
                assert.throws(
                    () => Inject.registerProcedure('newTrue#$Function!', () => {return 2;})
                    , /Inject.registerProcedure: name of subroutine is used/
                );
            });
        });

        describe(".MissingService('')", function() {
           it("exeption: Error [is not a function] (28)", function() {
                assert.throws(
                    () => Inject.MissingService('')
                    , /Inject.MissingService is not a function/
                );
            });
        });

        describe(".listProcedure()", function() {
            it("returns: ['testService', 'newService1'] (29)", function() {
                assert.deepEqual(Inject.listProcedure(), ['newTrueFunction', 'newFalseFunction']);
            });
        });

        describe(".newTrueFunction()", function() {
            it("returns: true (30)", function() {
                assert.equal(Inject.newTrueFunction(), true);
            });
        });

        describe(".newFalseFunction()", function() {
            it("returns: false (31)", function() {
                assert.equal(Inject.newFalseFunction(), false);
            });
        });

        describe(".registerProcedure('isProcedure', () => {return 2;)", function() {
           it("exeption: Error [name of subroutine is used] (32)", function() {
                assert.throws(
                    () => Inject.registerProcedure('isProcedure', () => {return 2;})
                    , /Inject.registerProcedure: name of subroutine is used/
                );
            });
        });

        describe(".filterVariable('asd123#-$123', '[^a-zA-Z0-9_-]')", function() {
            it("returns: 'asd123-123' (33)", function() {
                assert.equal(Inject.filterVariable('asd123#-$123', '[^a-zA-Z0-9_-]'), 'asd123-123');
            });
        });

        describe(".filterVariable('AaSsDd123#-$123', '[^a-z]')", function() {
            it("returns: 'asd' (34)", function() {
                assert.equal(Inject.filterVariable('AaSsDd123#-$123', '[^a-z]'), 'asd');
            });
        });

        describe(".filterVariable(false, '[^a-z]')", function() {
            it("returns: false (35)", function() {
                assert.equal(filterVariable(false, '[^a-z]'), false);
            });
        });

        describe(".filterVariable(false, '[^0-9]')", function() {
            it("returns: false (36)", function() {
                assert.equal(Inject.filterVariable(false, '[^0-9]'), false);
            });
        });

        describe(".filterVariable(123.66, '[^0-9]')", function() {
            it("returns: 12366 (37)", function() {
                assert.notEqual(Inject.filterVariable(123.66, '[^0-9]'), 123.66);
            });
        });

        describe(".filterVariable(123.66, '[^0-9\.\,\-]')", function() {
            it("returns: 123.66 (38)", function() {
                assert.equal(Inject.filterVariable(123.66, '[^0-9\.\,\-]'), 123.66);
            });
        });

        describe(".filterVariable(null, '[^0-9\.\,\-]')", function() {
            it("returns: null (7)", function() {
                assert.equal(Inject.filterVariable(null, '[^0-9\.\,\-]'), null);
            });
        });

        describe(".filterVariable(undefined, '[^0-9\.\,\-]')", function() {
            it("returns: undefined (8)", function() {
                assert.equal(Inject.filterVariable(undefined, '[^0-9\.\,\-]'), undefined);
            });
        });

        describe(".filterVariable('123@#$', '')", function() {
            it("returns: '' (26)", function() {
                assert.equal(Inject.filterVariable('123@#$', ''), '');
            });
        });

        describe(".filterVariable([], '')", function() {
            it("returns: [] (27)", function() {
                assert.deepEqual(Inject.filterVariable([], ''), []);
            });
        });
    });
};