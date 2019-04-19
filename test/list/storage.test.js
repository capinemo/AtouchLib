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

        describe(".saveState([1, 2, 3])", function() {
            it("exeption: Error [do not know how to save state] (2)", function() {
                assert.throws(
                    () => Storage.saveState([1, 2, 3])
                    , /Storage.saveState: do not know how to save state/
                );
            });
        });

        describe(".loadState()", function() {
            it("exeption: Error [do not know how to load state] (3)", function() {
                assert.throws(
                    () => Storage.loadState()
                    , /Storage.loadState: do not know how to load state/
                );
            });
        });

        describe(".cleanState()", function() {
            it("exeption: Error [do not know how to clean state] (4)", function() {
                assert.throws(
                    () => Storage.cleanState()
                    , /Storage.cleanState: do not know how to clean state/
                );
            });
        });
    });
};