const assert = require('assert');
const functions = require('./list/functions');
const inject = require('./list/inject');
const atouch = require('./list/atouch');

functions();
inject();
atouch();