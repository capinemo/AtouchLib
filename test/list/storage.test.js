module.exports = function () {
    const assert = require('chai').assert;

    const storage = require('../atouch/storage');
    const STORAGE = storage.STORAGE;
    const Storage = new STORAGE();

    describe("Storage:", function() {
        describe("instanceof", function() {
            it("return: STORAGE (1)", function() {
                assert.equal(Storage instanceof STORAGE, true);
            });
        });


    });
};