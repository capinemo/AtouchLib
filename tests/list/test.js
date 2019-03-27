module.exports = function () {
    const assert = require('assert');
    const test = require('../atouch/test.js');
    const TEST = test.TEST;
    const Test = new TEST();

    describe("Test:", function() {
        describe(".id('FirstTestId')", function() {
             it("return: TEST (1)", function() {
                assert.equal(Test.id('FirstTestId')instanceof TEST, true);
            });
        });
    });

    describe("Test:", function() {
        describe(".name('FirstTest')", function() {
             it("return: TEST (1)", function() {
                assert.equal(Test.name('FirstTest')instanceof TEST, true);
            });
        });
    });

    describe("Test:", function() {
        describe(".desc('FirstTestDescription')", function() {
             it("return: TEST (1)", function() {
                assert.equal(Test.desc('FirstTestDescription')instanceof TEST, true);
            });
        });
    });

    describe("Test:", function() {
        describe(".chain()", function() {
             it("return: TEST (1)", function() {
                assert.equal(Test.chain()instanceof TEST, true);
            });
        });
    });


    describe("Test:", function() {
        describe(".getId()", function() {
             it("return: 'FirstTestId' (2)", function() {
                assert.equal(Test.getId(), 'FirstTestId');
            });
        });
    });
};