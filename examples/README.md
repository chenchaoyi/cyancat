# Cyancat Appium usage example

This is an example project showing how to use Cyancat javascript client to drive Appium for iOS application automation test.


## Setup

* Install `Xcode 7.3.1` or newer
* Install [Node.js >= v4.2.3 and npm](http://nodejs.org/)
* Clone this repo and install npm package dependencies:
```
npm install
```

Note: For the first time running the tests:

* You may want to check your Appium setup by running:

```bash
# install appium-doctor
$ npm install appium-doctor -g
# check that all iOS dependencies are set up correctly
$ appium-doctor --ios
```

## Run tests

#### start Appium server (from this folder):

```bash
./node_modules/.bin/appium
```

#### run tests:
```bash
# Run all the tests:
./node_modules/.bin/mocha test/mobiledriver/sample.js

# Run all the tests with all Appium command traffic in Charles proxy:
NODE_CONFIG='{"proxy": "http://127.0.0.1:8888"}' ./node_modules/.bin/mocha test/mobiledriver/sample.js
```

