# Cyancat

[![NPM version][npm-image]][npm-url]
[![Dependency Status][david-image]][david-url]
[![Downloads][downloads-image]][downloads-url]


[Mobile JSON Wire](https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) Javascript binding using [bluecat](https://github.com/chenchaoyi/bluecat) underlayer

`Cyancat` let you write Appium mobile automation test in a synchronized way in Javascript.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Command line tool](#command-line-tool)
- [License](#license)

---

## Installation ##
```bash
$ npm install cyancat
```
---

## Usage
#### `setWaitTimeout(timeout)`
#### `init(capabilities)`
#### `findElements(locator, using)`
#### `findElement(locator, using)`
#### `clickElement(elementId)`
#### `clickEl(locator, using, timeout)`
#### `typeElement(value, elementId)`
#### `typeEl(value, locator, using, timeout)`
#### `quite()`
#### `waitForElement(locator, using, timeout)`
#### `sleep(ms)`


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
