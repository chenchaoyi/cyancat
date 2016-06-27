# Cyancat

[![NPM version][npm-image]][npm-url]
[![Build Status](https://travis-ci.org/chenchaoyi/cyancat.svg?branch=master)](https://travis-ci.org/chenchaoyi/cyancat)
[![Dependency Status][david-image]][david-url]
[![Downloads][downloads-image]][downloads-url]


[Mobile JSON Wire](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) Javascript binding using [bluecat](https://github.com/chenchaoyi/bluecat) underlayer

*`Cyancat`* let you write Appium mobile automation test in a synchronized way in Javascript:
```javascript
  it('sample test for sign in', function(done) {
    driver.run(function() {
      driver.init({
        "platformName": "iOS",
        "platformVersion": "9.3",
        "deviceName": "iPhone 6",
        "app": "./app/example.app"
      });
      // add memo
      driver.clickEl('Add');
      driver.typeEl('memo test summary 1', 'itemTitle');
      driver.clickEl('Done');

      // delete memo
      driver.clickEl('//UIATableCell[@name = "memo test summary 1"]', 'xpath');
      driver.clickEl('Delete');

      done();
    });
```

## Table of contents

- [Installation](#installation)
- [API](#api)
- [Example](#example)
- [Command line tool](#command-line-tool)
- [License](#license)

---

## Installation ##
```bash
$ npm install cyancat
```
---

## API

stay tuned, more to come...

#### `setWaitTimeout(timeout)`
#### `init(capabilities)`
#### `findElements(locator, using)`
#### `findElement(locator, using)`
#### `clickElement(elementId)`
#### `clickEl(locator, using, timeout)`
#### `typeElement(value, elementId)`
#### `typeEl(value, locator, using, timeout)`
#### `quit()`
#### `waitForElement(locator, using, timeout)`
#### `sleep(ms)`

---

## Example
#### A full test framework example including the app is available in the [`examples`](https://github.com/chenchaoyi/cyancat/tree/master/examples) folder
---

## License
Licensed under the [MIT](http://opensource.org/licenses/MIT)

[npm-image]: https://img.shields.io/npm/v/cyancat.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/cyancat
[github-tag]: http://img.shields.io/github/tag/chenchaoyi/cyancat.svg?style=flat-square
[github-url]: https://github.com/chenchaoyi/cyancat/tags
[david-image]: http://img.shields.io/david/chenchaoyi/cyancat.svg?style=flat-square
[david-url]: https://david-dm.org/chenchaoyi/cyancat
[license-image]: http://img.shields.io/npm/l/cyancat.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[downloads-image]: http://img.shields.io/npm/dm/cyancat.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/cyancat
[gittip-image]: https://img.shields.io/gittip/chenchaoyi.svg?style=flat-square
[gittip-url]: https://www.gittip.com/chenchaoyi/
