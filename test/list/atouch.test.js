module.exports = function () {
    const assert = require('chai').assert;
    const atouch = require("../atouch/atouch.js");
    const ATOUCH = atouch.ATOUCH;
    const Atouch = new ATOUCH();

    describe('Atouch:', function() {
        describe(".checkWorks()", function() {
            it("returns: 'Yes. I am work!' (1)", function() {
                assert.equal(Atouch.checkWorks(), 'Yes. I am work!');
            });
        });
    });
};