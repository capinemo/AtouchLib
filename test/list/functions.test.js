module.exports = function () {
    const assert = require('chai').assert;
    const functions = require('../atouch/global.functions.js');
    global.filterVariable = functions.filterVariable;
    global.genUUID = functions.genUUID;
    global.getRandomInt = functions.getRandomInt;
    global.capitalizeFirstLetter = functions.capitalizeFirstLetter;
    global.setRunOrder = functions.setRunOrder;

    describe("global.functions:", function() {
        describe(".filterVariable('asd123#-$123', 'a-zA-Z0-9_-')", function() {
            it("returns: 'asd123-123' (1)", function() {
                assert.equal(filterVariable('asd123#-$123', 'a-zA-Z0-9_-'), 'asd123-123');
            });
        });

        describe(".filterVariable('AaSsDd123#-$123', 'a-z')", function() {
            it("returns: 'asd' (2)", function() {
                assert.equal(filterVariable('AaSsDd123#-$123', 'a-z'), 'asd');
            });
        });

        describe(".filterVariable(false, 'a-z')", function() {
            it("returns: false (3)", function() {
                assert.equal(filterVariable(false, 'a-z'), false);
            });
        });

        describe(".filterVariable(false, '0-9')", function() {
            it("returns: false (4)", function() {
                assert.equal(filterVariable(false, '0-9'), false);
            });
        });

        describe(".filterVariable(123.66, '0-9')", function() {
            it("returns: 12366 (5)", function() {
                assert.notEqual(filterVariable(123.66, '0-9'), 123.66);
            });
        });

        describe(".filterVariable(123.66, '0-9\.\,\-')", function() {
            it("returns: 123.66 (6)", function() {
                assert.equal(filterVariable(123.66, '0-9\.\,\-'), 123.66);
            });
        });

        describe(".filterVariable(null, '0-9\.\,\-')", function() {
            it("returns: null (7)", function() {
                assert.equal(filterVariable(null, '0-9\.\,\-'), null);
            });
        });

        describe(".filterVariable(undefined, '0-9\.\,\-')", function() {
            it("returns: undefined (8)", function() {
                assert.equal(filterVariable(undefined, '0-9\.\,\-'), undefined);
            });
        });

        describe(".genUUID()", function() {
            it("returns: UUID string (9)", function() {
                assert.match(genUUID(), /^[a-f0-9]{8}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{4}\-[a-f0-9]{12}$/);
            });
        });

        describe(".getRandomInt(0, 50000)", function() {
            it("returns: [Integer] (10)", function() {
                assert.match(getRandomInt(0, 50000), /^[0-9]+$/);
            });
        });

        describe(".getRandomInt()", function() {
           it("exeption: Error [needed parameter not given] (11)", function() {
                assert.throws(
                    () => getRandomInt()
                    , /getRandomInt: needed parameter not given/
                );
            });
        });

        describe(".getRandomInt('0', false)", function() {
           it("exeption: Error [parameters must have a integer type] (12)", function() {
                assert.throws(
                    () => getRandomInt('0', false)
                    , /getRandomInt: parameters must have a integer type/
                );
            });
        });

        describe(".getRandomInt(10, 1)", function() {
           it("exeption: Error [second number must be more than first] (13)", function() {
                assert.throws(
                    () => getRandomInt(10, 1)
                    , /getRandomInt: second number must be more than first/
                );
            });
        });

        describe(".capitalizeFirstLetter(10)", function() {
           it("exeption: Error [not string given] (14)", function() {
                assert.throws(
                    () => capitalizeFirstLetter(10)
                    , /capitalizeFirstLetter: not string given/
                );
            });
        });

        describe(".capitalizeFirstLetter('')", function() {
            it("returns: '' (16)", function() {
                assert.equal(capitalizeFirstLetter(''), '');
            });
        });

        describe(".capitalizeFirstLetter('-12')", function() {
            it("returns: '-12' (16)", function() {
                assert.equal(capitalizeFirstLetter('-12'), '-12');
            });
        });

        describe(".capitalizeFirstLetter('test')", function() {
            it("returns: 'Test' (17)", function() {
                assert.equal(capitalizeFirstLetter('test'), 'Test');
            });
        });

        describe(".capitalizeFirstLetter('Test')", function() {
            it("returns: 'Test' (18)", function() {
                assert.equal(capitalizeFirstLetter('test'), 'Test');
            });
        });

        describe(".setRunOrder()", function() {
            it("returns: undefined (19)", function() {
                assert.equal(setRunOrder(), undefined);
            });
        });

        describe(".setRunOrder()", function() {
            it("exeption: Error [need a array] (20)", function() {
                global.coms_buffer = {};
                global.setRunOrder = functions.setRunOrder;
                assert.throws(
                    () => setRunOrder()
                    , /getRandomInt: need a array/
                );
            });
        });

        describe(".setRunOrder() in []", function() {
             it("changes to: [] (21)", function() {
                global.coms_buffer = [];
                global.setRunOrder = functions.setRunOrder;
                assert.equal(setRunOrder(), undefined);
            });
        });

        describe(".setRunOrder() in [1, 2, 3]", function() {
             it("changes to: [1, 2, 3]  (22)", function() {
                global.coms_buffer = [1, 2, 3];
                global.setRunOrder = functions.setRunOrder;
                setRunOrder();
                assert.deepEqual(coms_buffer, [1, 2, 3]);
            });
        });

        describe(".setRunOrder() in [{param: 0}, {param: 1}]", function() {
             it("changes to: [{param: 0, mode: 'sync'}, {param: 1, mode: 'sync'}] (23)", function() {
                global.coms_buffer = [{param: 0}, {param: 1}];
                global.setRunOrder = functions.setRunOrder;
                setRunOrder();
                assert.deepEqual(coms_buffer, [{param: 0, mode: 'sync'}, {param: 1, mode: 'sync'}]);
            });
        });

        describe(".setRunOrder(false) in [{param: 0}, {param: 1}]", function() {
             it("changes to: [{param: 0, mode: 'sync'}, {param: 1, mode: 'sync'}] (24)", function() {
                global.coms_buffer = [{param: 0}, {param: 1}];
                global.setRunOrder = functions.setRunOrder;
                setRunOrder(false);
                assert.deepEqual(coms_buffer, [{param: 0, mode: 'sync'}, {param: 1, mode: 'sync'}]);
            });
        });

        describe(".setRunOrder(true) in [{param: 0}, {param: 1}]", function() {
             it("changes to: [{param: 0, mode: 'async'}, {param: 1, mode: 'async'}] (25)", function() {
                global.coms_buffer = [{param: 0}, {param: 1}];
                global.setRunOrder = functions.setRunOrder;
                setRunOrder(true);
                assert.deepEqual(coms_buffer, [{param: 0, mode: 'async'}, {param: 1, mode: 'async'}]);
            });
        });

        describe(".filterVariable('123@#$', '')", function() {
            it("returns: '' (26)", function() {
                assert.equal(filterVariable('123@#$', ''), '');
            });
        });

        describe(".filterVariable([], '')", function() {
            it("returns: [] (27)", function() {
                assert.deepEqual(filterVariable([], ''), []);
            });
        });
    });
};

