module.exports = function () {
    const assert = require('chai').assert;

    const lang = require('../atouch/lang');
    const LANG = lang.LANG;
    const Lang = new LANG();

    describe("Lang:", function() {
        describe("instanceof", function() {
            it("return: LANG (1)", function() {
                assert.equal(Lang instanceof LANG, true);
            });
        });


    });
};