'use strict';

/**
 * Module dependencies.
 */
var Base = require('mocha/lib/reporters/base'),
  utils = require('mocha/lib/utils');
  
/**
 * Expose `Doc`.
 */
module.exports = EventDoc;

/**
 * Initialize a new `Doc` reporter.
 *
 * @param {Runner} runner
 * @api public
 */
function EventDoc(runner) {
  Base.call(this, runner);

  var self = this,
    stats = this.stats,
    total = runner.total,
    indents = 2;

  function indent() {
    return new Array(indents).join('  ');
  }

  runner.on('suite', function(suite){
    if (suite.root) return;

    ++indents;
    runner.emit('suite:section', '%s<section class="suite">' + indent());
    ++indents;
    runner.emit('suite:h1', '%s<h1>%s</h1>'+ indent() + utils.escape(suite.title));
    runner.emit('suite:dl', '%s<dl>'+ indent());
  });

  runner.on('suite end', function(suite){
    if (suite.root) return;

    runner.emit('suite end:dl', '%s</dl>'+ indent());
    --indents;
    runner.emit('suite end:section', '%s</section>'+ indent());
    --indents;
  });

  runner.on('pass', function(test){
    runner.emit('pass:dt', '%s  <dt>%s</dt>'+ indent() + utils.escape(test.title));
    var code = utils.escape(utils.clean(test.fn.toString()));
    runner.emit('pass:dd', '%s  <dd><pre><code>%s</code></pre></dd>'+ indent() + code);
  });

  runner.on('fail', function(test, err){
    runner.emit('fail:dt', '%s  <dt class="error">%s</dt>'+ indent() + utils.escape(test.title));
    var code = utils.escape(utils.clean(test.fn.toString()));
    runner.emit('fail:dd', '%s  <dd class="error"><pre><code>%s</code></pre></dd>'+ indent() + code);
    runner.emit('fail:dd', '%s  <dd class="error">%s</dd>'+ indent() + utils.escape(err));
  });
}
