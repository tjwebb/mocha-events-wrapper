var Mocha = require('mocha');
var fs = require('fs');
var path = require('path');
var util = require('util');
var events = require('events');

/**
 * @param options.require
 *
 * @public
 * @constructor
 */
var api = module.exports = function (options) {
  options || (options = { });
  options.ui = 'bdd';

  this.mocha = new Mocha(options);
  this.mocha.addFile(path.resolve(path.dirname(module.parent.filename), options.require));
};

util.inherits(api, events.EventEmitter);

/**
 * @fires suite
 * @fires suite end
 * @fires pass
 * @fires fail
 */
api.prototype.run = function (file) {

  var self = this;
  var level = 0;
  var runner = this.mocha.run(function (failures) {
    self.emit('done', failures);
  });

  runner.on('suite', function (suite) {
    self.emit('suite', { suite: suite, level: level });
    level++;
  });
  runner.on('suite end', function (suite) {
    level--;
    self.emit('suite end', { suite: suite, level: level });
  });
  runner.on('pass', function (test) {
    self.emit('pass', { test: test, level: level });
  });
  runner.on('fail', function (test) {
    self.emit('fail', { test: test, level: level });
  });
};
