const assert = require('chai').assert;
const functions = require('./list/functions.test');
const inject = require('./list/inject.test');
const test = require('./list/test.test');
const storage = require('./list/storage.test');
const atouch = require('./list/atouch.test');


//functions();
//inject();
//test();
storage();

//atouch();