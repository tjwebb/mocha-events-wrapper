var assert = require('assert');
var Runner = require('../');

var runner = new Runner({ require: './mocktest' });
var phases = 0, tasks = 0;

runner.once('start', function (event) {
  assert(event.total === 5);
});

runner.once('done', function (failures) {
  assert(failures === 0);
});

runner.on('suite', function (event) {
  assert(event.suite.title);
  phases++;
});
runner.on('pass', function (event) {
  assert(event.test.title);
  tasks++;
});
runner.on('fail', function (event) {
  console.error(event.error);
  process.exit(1);
});

runner.on('done', function (event) {
  assert(tasks === 5);
  assert(phases === 3);
});

runner.run();
