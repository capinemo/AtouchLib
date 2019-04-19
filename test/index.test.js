const inject = require('./list/inject.test');
const test = require('./list/test.test');
const storage = require('./list/storage.test');
const server = require('./list/server.test');
const unit = require('./list/unit.test');
const debug = require('./list/debug.test');
const editor = require('./list/editor.test');
const atouch = require('./list/atouch.test');

inject();
storage();
server();
unit();
test();
debug();
editor();
atouch();