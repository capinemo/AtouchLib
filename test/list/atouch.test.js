module.exports = function () {
    const assert = require('chai').assert;
    const atouch = require("../atouch/atouch.js");
    global.ATOUCH = atouch.ATOUCH;
    const Atouch = new ATOUCH();
    Atouch.reset().go('').check({});

    describe('Atouch:', function() {
        describe('typeof', function() {
            it("returns: object (1)", function() {
                assert.equal(typeof Atouch, 'object');
            });

            it("returns : ATOUCH (2)", function() {
                assert.equal(Atouch.constructor.name, 'ATOUCH');
            });
        });

        describe(".config({no_gui: true})", function() {
            it("returns: ATOUCH (3)", function() {
                assert.equal(Atouch.config({no_gui: true}) instanceof ATOUCH, true);
            });
        });


    });
};