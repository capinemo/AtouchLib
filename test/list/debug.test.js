module.exports = function () {
    const assert = require('chai').assert;

    const debug = require('../atouch/debug');
    const DEBUG = debug.DEBUG;
    const Debug = new DEBUG();

    describe("Debug:", function() {
        describe("instanceof", function() {
            it("return: DEBUG (1)", function() {
                assert.equal(Debug instanceof DEBUG, true);
            });
        });


    });
};