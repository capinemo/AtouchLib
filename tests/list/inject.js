module.exports = function () {
    const assert = require('assert');
    const functions = require('../atouch/global.functions.js');
    global.filterVariable = functions.filterVariable;
    const inject = require('../atouch/inject');
    const INJECT = inject.INJECT;
    const Inject = new INJECT();

    describe('Inject:', function() {
        describe('instance', function() {
            it('must have typeof as: object (1)', function() {
                assert.equal(typeof Inject, 'object');
            });

            it('must have constructor with name : INJECT (2)', function() {
                assert.equal(Inject.constructor.name, 'INJECT');
            });
      });

        describe('.isService()', function() {
            it('must return boolean for empty Service Locator: false (3)', function() {
                assert.equal(Inject.isService(), false);
            });
        });

        Inject.registerService('testService', INJECT);

        describe('.registerService()', function() {
            it('must return if string instead function: Error [not function given as constructor] (4)', function() {
                assert.throws(
                    () => Inject.registerService('newService', 'INJECT')
                    , /Inject: not function given as constructor/
                );
            });
        });

        describe('.registerService()', function() {
            it('must return if object in service name: Error [invalid name given] (5)', function() {
                assert.throws(
                    () => Inject.registerService(INJECT, INJECT)
                    , /Inject: invalid name given/
                );
            });
        });

        describe('.registerService()', function() {
            it('must return if service name empty: Error [empty name given] (6)', function() {
                assert.throws(
                    () => Inject.registerService('', INJECT)
                    , /Inject: empty name given/
                );
            });
        });

        describe('.isService()', function() {
            it('must return boolean after service adding: true (7)', function() {
                assert.equal(Inject.isService('testService'), true);
            });
        });

        describe('.getService()', function() {
            it('must return boolean after service adding: true (8)', function() {
                assert.equal(Inject.isService('testService'), true);
            });
        });

        describe('.registerService()', function() {
            it('must return if creating doubled service: None (9)', function() {
                assert.equal(Inject.registerService('testService', INJECT), undefined);
            });
        });

        describe('.registerService()', function() {
            it('must no return after sanitizing service name (10)', function() {
                assert.equal(Inject.registerService('new#$Service1!', INJECT), undefined);
            });
        });

        describe('.getService()', function() {
            it('must return true if service newService1 exitsts (11)', function() {
                assert.equal(Inject.isService('newService1'), true);
            });
        });

    });
};