module.exports = function () {
    const assert = require('assert');
    const atouch = require("../atouch/atouch.js");
    const ATOUCH = atouch.ATOUCH;
    const Atouch = new ATOUCH();

    describe('Atouch:', function() {
      describe('#checkWorks()', function() {
        let result = 'Yes. I am work!';
        it('should return string: ' + result, function() {
          assert.equal(Atouch.checkWorks(), result);
        });
      });
    });
};

//assert.throws(iThrowError(), Error, "Error thrown");