// Cyancat Library, Mobile JSON Wire (https://github.com/SeleniumHQ/mobile-spec/blob/master/spec-draft.md) binding

var expect = require('chai').expect;
var Config = require('config');
var Util = require('util');
var Path = require('path');
var Bluecat = require('bluecat');

var internals = {};

// Cyancat initializer
// - server: Web driver (Appium) server address
// - options: {
//     maxWaitTime: number // timeout value (in ms) for waiting specific element to display,
//     proxy: string  // proxy for all web driver HTTP traffic (usually useful better debug)
//   }

// internals.CyanCat = function (bluecatService, options) {
internals.CyanCat = function (server, options) {
  // initialize options default value
  options = options || {};
  options.maxWaitTime = options.maxWaitTime || 30000;

  // create bluecat service object to handle all Web Driver request/response
  var apiPath = Path.join(__dirname, '..', 'config', 'api.json');
  var api = Bluecat.Api('mobiledriver', apiPath);
  var bluecatService = new Bluecat.ServiceSync(api, server, {
    followAllRedirects: true
  });
  bluecatService.setProxy(options.proxy);

  this.service = bluecatService;
  this.sessionId = null;
  this.maxWaitTime = options.maxWaitTime;
};

// Set max wait timeout period, in milliseconds
// default value is 60 seconds
internals.CyanCat.prototype.setWaitTimeout = function(timeout) {
  this.maxWaitTime = timeout;
};

// Verify response statusCode and return more informative information when failed
internals.CyanCat.prototype.checkStatus = function(res, expectedStatus) {
  if (Object.prototype.toString.call(expectedStatus) === '[object Array]') {
    expect(expectedStatus).to.include(res.data.statusCode,
        'Expected status code ' + res.data.statusCode + ' to equal ' + expectedStatus.join('|') +
        '.\n' + res.request.method + ' ' + res.request.uri + ' returned:\n' +
        Util.inspect(res.data.body, { depth: 5 }));
  } else {
    expect(res.data.statusCode).to.equal(expectedStatus,
        'Expected status code ' + res.data.statusCode + ' to equal ' + expectedStatus +
        '.\n' + res.request.method + ' ' + res.request.uri + ' returned:\n' +
        Util.inspect(res.data.body, { depth: 5 }));
  }
};

// All Mobile JSON Wire protocol operations should be put sequentially as
// the callback parameter of this function, so they'll be executed in order
internals.CyanCat.prototype.run = function (fiberFuncs){
  return this.service.run(fiberFuncs);
};

// POST /session
internals.CyanCat.prototype.init = function (capabilities){
  var r = this.service.session.POST({
    body: {
      desiredCapabilities: capabilities
    }
  });
  this.checkStatus(r, 200);
  expect(r.data.body.sessionId).to.be.a('string');
  this.sessionId = r.data.body.sessionId;
  return r;
};

// POST /session/${sessionId}/elements
// response example:
// {
//	"status": 0,
//	"value": [{
//		"ELEMENT": "0"
//	}],
//	"sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
// }
internals.CyanCat.prototype.findElements = function (locator, using){
  using = using || 'accessibility id';
  var r = this.service.session['${sessionId}'].elements.POST({
    params: {
      sessionId: this.sessionId
    },
    body: {
      using: using,
      value: locator
    }
  });
  this.checkStatus(r, 200);
  return r;
};

// POST /session/${sessionId}/element
// response example:
// {
//	"status": 0,
//	"value": {
//		"ELEMENT": "0"
//	},
//	"sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
// }
internals.CyanCat.prototype.findElement = function (locator, using){
  using = using || 'accessibility id';
  var r = this.service.session['${sessionId}'].element.POST({
    params: {
      sessionId: this.sessionId
    },
    body: {
      using: using,
      value: locator
    }
  });
  this.checkStatus(r, 200);
  return r.data.body.value.ELEMENT;
};

// POST /session/${sessionId}/element/${elementId}/click
// response example:
// {
//	"status": 0,
//	"value": "",
//	"sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
// }
internals.CyanCat.prototype.clickElement = function (elementId){
  var r = this.service.session['${sessionId}'].element['${elementId}'].click.POST({
    params: {
      sessionId: this.sessionId,
      elementId: elementId
    }
  });
  this.checkStatus(r, 200);
  return r;
};

// Wait for element then click on it
internals.CyanCat.prototype.clickEl = function (value, using, timeout){
  var elementId = this.waitForElement(value, using, timeout);
  return this.clickElement(elementId);
};

// POST /session/${sessionId}/element/${elementId}/value
// response example:
// {
//	"status": 0,
//	"value": "",
//	"sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
// }
internals.CyanCat.prototype.typeElement = function (value, elementId) {
  var r = this.service.session['${sessionId}'].element['${elementId}'].value.POST({
    params: {
      sessionId: this.sessionId,
      elementId: elementId
    },
    body: {
      value: [value]
    }
  });
  this.checkStatus(r, 200);
  return r;
};

// Wait for element to display then type value in it
internals.CyanCat.prototype.typeEl = function (value, locator, using, timeout){
  var elementId = this.waitForElement(locator, using, timeout);
  return this.typeElement(value, elementId);
};

// quit session
internals.CyanCat.prototype.quit = function () {
  var r = this.service.session['${sessionId}'].DELETE({
    params: {
      sessionId: this.sessionId
    }
  });
  this.checkStatus(r, 200);
  return r;
};

// keep finding element until it is displayed or timed out
// return element ID if it is diplayed within timeout period
internals.CyanCat.prototype.waitForElement = function (locator, using, timeout){
  using = using || 'accessibility id';
  timeout = timeout || this.maxWaitTime;
  // var r = this.findElements(locator, using);
  var r;
  var waitTime = 0;
  while (waitTime <= timeout) {
    // r = this.findElement(locator, using);
    r = this.service.session['${sessionId}'].element.POST({
      params: {
        sessionId: this.sessionId
      },
      body: {
        using: using,
        value: locator
      }
    });
    if (r.data.statusCode === 200) {
      break;
    }
    this.sleep(200);
    waitTime = waitTime + 200;
  }

  if (waitTime > timeout) {
    throw(new Error(locator + ' is not found within ' + timeout + 'ms'));
  } else {
    return r.data.body.value.ELEMENT;
  }
};

// sleep in ms
internals.CyanCat.prototype.sleep = function(period) {
  this.service.sleep(period);
};

exports = module.exports = internals.CyanCat;
