const inject = require('./list/inject.test');
const test = require('./list/test.test');
const storage = require('./list/storage.test');
const lang = require('./list/lang.test');
const server = require('./list/server.test');
const unit = require('./list/unit.test');
const atouch = require('./list/atouch.test');

inject();
storage();
//lang();
//server();
//unit();
test();
atouch();