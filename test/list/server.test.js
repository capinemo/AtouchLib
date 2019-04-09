module.exports = function () {
    const assert = require('chai').assert;

    const server = require('../atouch/server');
    const SERVER = server.SERVER;
    const Server = new SERVER();

    describe("Server:", function() {
        describe("instanceof", function() {
            it("return: SERVER (1)", function() {
                assert.equal(Server instanceof SERVER, true);
            });
        });


    });
};