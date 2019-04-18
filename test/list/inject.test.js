module.exports = function () {
    const assert = require('chai').assert;
    const inject = require('../atouch/inject');
    const INJECT = inject.INJECT;

    describe("Inject:", function() {
        const InjectS = new INJECT();

        describe("instanceof", function() {
            it("returns: typeof -> object (1)", function() {
                assert.equal(typeof InjectS, 'object');
            });

            it("returns : instanceof -> INJECT (2)", function() {
                assert.equal(InjectS instanceof INJECT, true);
            });
        });

        describe(".isService()", function() {
           it("exeption: Error [empty name given] (3)", function() {
                assert.throws(
                    () => InjectS.isService()
                    , /Inject.isService: empty name given/
                );
            });
        });

        InjectS.registerService('testService', INJECT);

        describe(".registerService('newService', 'INJECT')", function() {
            it("exeption: Error [not function given as constructor] (4)", function() {
                assert.throws(
                    () => InjectS.registerService('newService', 'INJECT')
                    , /Inject.registerService: not function given as constructor/
                );
            });
        });

        describe(".registerService(INJECT, INJECT)", function() {
            it("exeption: Error [invalid name given] (5)", function() {
                assert.throws(
                    () => InjectS.registerService(INJECT, INJECT)
                    , /Inject.registerService: invalid name given/
                );
            });
        });

        describe(".registerService('', INJECT)", function() {
            it("exeption: Error [empty name given] (6)", function() {
                assert.throws(
                    () => InjectS.registerService('', INJECT)
                    , /Inject.registerService: empty name given/
                );
            });
        });

        describe(".isService('testService')", function() {
            it("returns: true (7)", function() {
                assert.equal(InjectS.isService('testService'), true);
            });
        });

        describe("instanceof Service('testService')", function() {
            it("returns: INJECT (8)", function() {
                assert.equal(InjectS.Service('testService') instanceof INJECT, true);
            });
        });

        describe(".registerService('testService', INJECT)", function() {
            it("returns: undefined (9)", function() {
                assert.equal(InjectS.registerService('testService', INJECT), undefined);
            });
        });

        describe(".registerService('new#$Service1!', INJECT)", function() {
            it("returns: undefined (10)", function() {
                assert.equal(InjectS.registerService('new#$Service1!', INJECT), undefined);
            });
        });

        describe(".isService('new#$Service1!')", function() {
            it("returns: false (11)", function() {
                assert.equal(InjectS.isService('new#$Service1!'), false);
            });
        });

        describe(".isService('newService1')", function() {
            it("returns: true (12)", function() {
                assert.equal(InjectS.isService('newService1'), true);
            });
        });

        describe(".createObject('INJECT')", function() {
            it("exeption: Error [given parameter not a function] (13)", function() {
                assert.throws(
                    () => InjectS.createObject('INJECT')
                    , /Inject.createObject: given parameter not a function/
                );
            });
        });

        describe("instanceof createObject(INJECT)", function() {
            it("returns: INJECT (14)", function() {
                assert.equal(InjectS.createObject(INJECT) instanceof INJECT, true);
            });
        });

        describe(".Service()", function() {
           it("exeption: Error [empty name given] (15)", function() {
                assert.throws(
                    () => InjectS.Service()
                    , /Inject.Service: empty name given/
                );
            });
        });

        describe(".Service('MissingService')", function() {
           it("exeption: Error [service not exists] (16)", function() {
                assert.throws(
                    () => InjectS.Service('MissingService')
                    , /Inject.Service: service not exists/
                );
            });
        });

        describe(".listService()", function() {
            it("returns: ['testService', 'newService1'] (17)", function() {
                assert.deepEqual(InjectS.listService(), ['testService', 'newService1']);
            });
        });

        describe(".isProcedure()", function() {
           it("exeption: Error [empty name given] (18)", function() {
                assert.throws(
                    () => InjectS.isProcedure()
                    , /Inject.isProcedure: empty name given/
                );
            });
        });

        InjectS.registerProcedure('newTrueFunction', () => {return true;});

        describe(".registerProcedure('newFalseFunction', false)", function() {
            it("exeption: Error [not function given as subroutines] (19)", function() {
                assert.throws(
                    () => InjectS.registerProcedure('newFalseFunction', false)
                    , /Inject.registerProcedure: not function given as subroutines/
                );
            });
        });

        describe(".registerProcedure(INJECT, () => {return false;})", function() {
            it("exeption: Error [invalid name given] (20)", function() {
                assert.throws(
                    () => InjectS.registerProcedure(INJECT, () => {return false;})
                    , /Inject.registerProcedure: invalid name given/
                );
            });
        });

        describe(".registerProcedure('', () => {return false;})", function() {
            it("exeption: Error [empty name given] (21)", function() {
                assert.throws(
                    () => InjectS.registerProcedure('', () => {return false;})
                    , /Inject.registerProcedure: empty name given/
                );
            });
        });

        describe(".isProcedure('newTrueFunction')", function() {
            it("returns: true (22)", function() {
                assert.equal(InjectS.isProcedure('newTrueFunction'), true);
            });
        });

        describe("instanceof newTrueFunction", function() {
            it("returns: Function (23)", function() {
                assert.equal(InjectS.newTrueFunction instanceof Function, true);
            });
        });

        describe(".registerProcedure('newFalseFunction', () => {return false;})", function() {
            it("returns: undefined (24)", function() {
                assert.equal(InjectS.registerProcedure('newFalseFunction', () => {return false;}), undefined);
            });
        });

        describe(".isProcedure('newTrue#$Function!')", function() {
            it("returns: false (25)", function() {
                assert.equal(InjectS.isProcedure('newTrue#$Function!'), false);
            });
        });

        describe(".isProcedure('newTrueFunction')", function() {
            it("returns: true (26)", function() {
                assert.equal(InjectS.isProcedure('newTrueFunction'), true);
            });
        });

        describe(".registerProcedure('newTrue#$Function!', () => {return 2;)", function() {
           it("exeption: Error [name of subroutine is used] (27)", function() {
                assert.throws(
                    () => InjectS.registerProcedure('newTrue#$Function!', () => {return 2;})
                    , /Inject.registerProcedure: name of subroutine is used/
                );
            });
        });

        describe(".MissingService('')", function() {
           it("exeption: Error [is not a function] (28)", function() {
                assert.throws(
                    () => InjectS.MissingService('')
                    , /InjectS.MissingService is not a function/
                );
            });
        });

        describe(".listProcedure()", function() {
            it("returns: Array (29)", function() {
                assert.isArray(InjectS.listProcedure());
            });
        });

        describe(".newTrueFunction()", function() {
            it("returns: true (30)", function() {
                assert.equal(InjectS.newTrueFunction(), true);
            });
        });

        describe(".newFalseFunction()", function() {
            it("returns: false (31)", function() {
                assert.equal(InjectS.newFalseFunction(), false);
            });
        });

        describe(".registerProcedure('isProcedure', () => {return 2;)", function() {
           it("exeption: Error [name of subroutine is used] (32)", function() {
                assert.throws(
                    () => InjectS.registerProcedure('isProcedure', () => {return 2;})
                    , /Inject.registerProcedure: name of subroutine is used/
                );
            });
        });

        describe(".filterVariable('asd123#-$123', '[^a-zA-Z0-9_-]')", function() {
            it("returns: 'asd123-123' (33)", function() {
                assert.equal(InjectS.filterVariable('asd123#-$123', '[^a-zA-Z0-9_-]'), 'asd123-123');
            });
        });

        describe(".filterVariable('AaSsDd123#-$123', '[^a-z]')", function() {
            it("returns: 'asd' (34)", function() {
                assert.equal(InjectS.filterVariable('AaSsDd123#-$123', '[^a-z]'), 'asd');
            });
        });

        describe(".filterVariable(false, '[^a-z]')", function() {
            it("returns: false (35)", function() {
                assert.equal(InjectS.filterVariable(false, '[^a-z]'), false);
            });
        });

        describe(".filterVariable(false, '[^0-9]')", function() {
            it("returns: false (36)", function() {
                assert.equal(InjectS.filterVariable(false, '[^0-9]'), false);
            });
        });

        describe(".filterVariable(123.66, '[^0-9]')", function() {
            it("returns: 12366 (37)", function() {
                assert.notEqual(InjectS.filterVariable(123.66, '[^0-9]'), 123.66);
            });
        });

        describe(".filterVariable(123.66, '[^0-9\.\,\-]')", function() {
            it("returns: 123.66 (38)", function() {
                assert.equal(InjectS.filterVariable(123.66, '[^0-9\.\,\-]'), 123.66);
            });
        });

        describe(".filterVariable(null, '[^0-9\.\,\-]')", function() {
            it("returns: null (39)", function() {
                assert.equal(InjectS.filterVariable(null, '[^0-9\.\,\-]'), null);
            });
        });

        describe(".filterVariable(undefined, '[^0-9\.\,\-]')", function() {
            it("returns: undefined (40)", function() {
                assert.equal(InjectS.filterVariable(undefined, '[^0-9\.\,\-]'), undefined);
            });
        });

        describe(".filterVariable('123@#$', '')", function() {
            it("returns: '' (41)", function() {
                assert.equal(InjectS.filterVariable('123@#$', ''), '');
            });
        });

        describe(".filterVariable([], '')", function() {
            it("returns: [] (42)", function() {
                assert.deepEqual(InjectS.filterVariable([], ''), []);
            });
        });
    });
};