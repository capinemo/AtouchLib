const assert = require('assert');
const inject = require('./list/inject');
const atouch = require('./list/atouch');

describe('Atouch:', function () {
    inject();
    atouch();
});