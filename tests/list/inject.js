module.exports = function () {
    const assert = require('assert');
    const inject = require('../atouch/inject');
    const INJECT = inject.INJECT;
    const Inject = new INJECT();

    describe('Inject', function() {
      describe('function .checkWorks()', function() {
        let result = false;
        it('should return boolean: ' + result, function() {
          assert.equal(Inject.isService(), result);
        });
      });
    });
};