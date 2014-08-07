var assert = require('assert');
var Installer = require('../');

var installer = new Installer({ require: './mocktest' });
var phases = 0, tasks = 0;

installer.once('done', function (failures) {
  assert(failures === 0);
});

installer.on('phase', function (event) {
  assert(event.phase.title);
  phases++;
});
installer.on('pass', function (event) {
  assert(event.test.title);
  tasks++;
});
installer.on('fail', function (event) {
  console.error(event.error);
  process.exit(1);
});

installer.on('done', function (event) {
  assert(tasks === 5);
  assert(phases === 3);
});

installer.run();
