// Cyancat Library
// A WebDriver client with full Appium endpoints extension
// https://github.com/appium/appium-base-driver/blob/master/docs/mjsonwp/protocol-methods.md

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

/*
 POST /session/${sessionId}/elements
 response example:
 {
	 "status": 0,
	 "value": [{
		 "ELEMENT": "0"
	 }],
	 "sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
 }
*/
internals.CyanCat.prototype.elements = function (locator, using){
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

/*
 POST /session/${sessionId}/element
 response example:
 {
	"status": 0,
	"value": {
		"ELEMENT": "0"
	},
	"sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
 }
*/
internals.CyanCat.prototype.element = function (locator, using){
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

/*
  param: locator, using
    or
  options: {
    locator: string,
    using: string
  }
*/
internals.CyanCat.prototype.hasEl = function (locator, using){
  // accept object as parameter
  if (typeof arguments[0] === 'object') {
    var options = arguments[0];
    locator = options.locator;
    using = options.using || 'accessibility id';
  } else {
    using = using || 'accessibility id';
  }

  var r = this.service.session['${sessionId}'].element.POST({
    params: {
      sessionId: this.sessionId
    },
    body: {
      using: using,
      value: locator
    }
  });
  if (r.data.statusCode === 200 && r.data.body.value.ELEMENT !== undefined) {
    return true;
  } else {
    return false;
  }
};

/*
 POST /session/${sessionId}/element/${elementId}/click
 response example:
 {
	"status": 0,
	"value": "",
	"sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
 }
*/
internals.CyanCat.prototype.elementClick = function (elementId){
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
internals.CyanCat.prototype.clickEl = function (locator, using, timeout){
  // accept object as parameter
  if (typeof arguments[0] === 'object') {
    var options = arguments[0];
    locator = options.locator;
    using = options.using || 'accessibility id';
    timeout = options.timeout || this.maxWaitTime;
  } else {
    using = using || 'accessibility id';
    timeout = timeout || this.maxWaitTime;
  }

  var elementId = this.waitForElement(locator, using, timeout);
  return this.elementClick(elementId);
};

/*
 POST /session/${sessionId}/element/${elementId}/value
 response example:
 {
	"status": 0,
	"value": "",
	"sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
 }
*/
internals.CyanCat.prototype.elementValue = function (elementId, value) {
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
internals.CyanCat.prototype.typeEl = function (locator, using, value, timeout) {
  // accept object as parameter
  if (typeof arguments[0] === 'object') {
    var options = arguments[0];
    value = arguments[1];
    locator = options.locator;
    using = options.using || 'accessibility id';
    timeout = options.timeout || this.maxWaitTime;
  } else {
    using = using || 'accessibility id';
    timeout = timeout || this.maxWaitTime;
  }

  var elementId = this.waitForElement(locator, using, timeout);
  return this.elementValue(elementId, value);
};

/*
 GET  /session/${sessionId}/element/${elementId}/attribute/${attributeName}
 response example:
 {
	 "status": 0,
   "value": "attribute value",
	 "sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
 }
*/
internals.CyanCat.prototype.elementAttribute = function (elementId, attributeName){
  var r = this.service.session['${sessionId}'].element['${elementId}'].attribute['${attributeName}'].GET({
    params: {
      sessionId: this.sessionId,
      elementId: elementId,
      attributeName: attributeName
    }
  });
  this.checkStatus(r, 200);
  return r.data.body.value;
};

// Wait for element to display then get specified attribute
internals.CyanCat.prototype.getElAttr = function (locator, using, attributeName, timeout) {
  // accept object as parameter
  if (typeof arguments[0] === 'object') {
    var options = arguments[0];
    attributeName = arguments[1];
    locator = options.locator;
    using = options.using || 'accessibility id';
    timeout = options.timeout || this.maxWaitTime;
  } else {
    using = using || 'accessibility id';
    timeout = timeout || this.maxWaitTime;
  }

  var elementId = this.waitForElement(locator, using, timeout);
  return this.elementAttribute(elementId, attributeName);
};

/*
 POST  /session/${sessionId}/keys
 response example:
 {
	 "status": 0,
	 "value": "<?xml version="1.0" encoding="UTF-8"?>\n<AppiumAUT\>",
	 "sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
 }
*/
internals.CyanCat.prototype.keys = function (value){
  var r = this.service.session['${sessionId}'].keys.POST({
    params: {
      sessionId: this.sessionId
    },
    body: {
      value: [value]
    }
  });
  this.checkStatus(r, 200);
  return r;
};

/*
 GET  /session/${sessionId}/source
 response example:
 {
	 "status": 0,
	 "value": "<?xml version="1.0" encoding="UTF-8"?>\n<AppiumAUT\>",
	 "sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
 }
*/
internals.CyanCat.prototype.source = function (){
  var r = this.service.session['${sessionId}'].source.GET({
    params: {
      sessionId: this.sessionId
    }
  });
  this.checkStatus(r, 200);
  return r.data.body.value;
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

internals.CyanCat.prototype.SPECIAL_KEYS = require('./special-keys');

exports = module.exports = internals.CyanCat;
