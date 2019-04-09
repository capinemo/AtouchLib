const assert = require('chai').assert;
const functions = require('./list/functions.test');
const inject = require('./list/inject.test');
const test = require('./list/test.test');
const storage = require('./list/storage.test');
const lang = require('./list/lang.test');
const server = require('./list/server.test');
const unit = require('./list/unit.test');
const atouch = require('./list/atouch.test');


functions();
inject();
test();
storage();
lang();
server();
unit();

atouch();