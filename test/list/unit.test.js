module.exports = function () {
    const assert = require('chai').assert;

    const unit = require('../atouch/unit');
    const UNIT = unit.UNIT;
    const Unit = new UNIT();

    describe("Unit:", function() {
        describe("instanceof", function() {
            it("return: UNIT (1)", function() {
                assert.equal(Unit instanceof UNIT, true);
            });
        });


    });
};