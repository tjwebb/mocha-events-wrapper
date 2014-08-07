mocha-events-wrapper
=======================

[![Build Status](https://travis-ci.org/tjwebb/mocha-events-wrapper.svg)](https://travis-ci.org/tjwebb/mocha-events-wrapper)

Extension of the [mocha programmatic api](https://www.npmjs.org/package/mocha)
that fires more consumable events. Wraps `mocha.run` with a simpler interface.

## Usage

```js
var Mocha = require('mocha-events-wrapper');
var mew = new Mocha({ require: './mocktest' });

mew.on('suite', function (event) {
  console.log(event.suite.title);
});
mew.on('fail', function (event) {
  console.error(event.test.title);
});
```

## API

### Events
- suite
  - suite
  - level
- suite end
  - suite
  - level
- pass
  - test
  - level
- fail
  - error
  - test
  - level

## Information
- npm: https://www.npmjs.org/package/mocha-events-wrapper
- github: https://github.com/tjwebb/mocha-events-wrapper
- License: MIT
