module.exports = function () {
    const assert = require('chai').assert;

    const editor = require('../atouch/editor');
    const EDITOR = editor.EDITOR;
    const Editor = new EDITOR();

    describe("Editor:", function() {
        describe("instanceof", function() {
            it("return: EDITOR (1)", function() {
                assert.equal(Editor instanceof EDITOR, true);
            });
        });


    });
};