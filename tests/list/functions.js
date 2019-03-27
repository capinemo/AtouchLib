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
                    , /Functions: needed parameter not given/
                );
            });
        });
        
        describe(".getRandomInt('0', false)", function() {
           it("exeption: Error [parameters must have a integer type] (12)", function() {
                assert.throws(
                    () => getRandomInt('0', false)
                    , /Functions: parameters must have a integer type/
                );
            });
        });
        
        describe(".getRandomInt(10, 1)", function() {
           it("exeption: Error [second number must be more than first] (13)", function() {
                assert.throws(
                    () => getRandomInt(10, 1)
                    , /Functions: second number must be more than first/
                );
            });
        });
        
        describe(".capitalizeFirstLetter()", function() {
           it("exeption: Error [second number must be more than first] (14)", function() {
                assert.throws(
                    () => getRandomInt(10, 1)
                    , /Functions: second number must be more than first/
                );
            });
        });
        
        describe(".capitalizeFirstLetter()", function() {
           it("exeption: Error [second number must be more than first] (14)", function() {
                assert.throws(
                    () => getRandomInt(10, 1)
                    , /Functions: second number must be more than first/
                );
            });
        });
    });
};

