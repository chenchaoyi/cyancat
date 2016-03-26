// Purplecat Library, Mobile JSON Wire binding

var expect = require('chai').expect;
var Config = require('config');
var Util = require('util');

var internals = {};

internals.PurpleCat = function (bluecatService) {
  this.service = bluecatService;
  this.sessionId = null;
};

// Verify response statusCode and return more informative information when failed
internals.PurpleCat.prototype.checkStatus = function(res, expectedStatus) {
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

// POST /session
internals.PurpleCat.prototype.init = function (capabilities){
  var r = this.service.session.POST({
    body: {
      desiredCapabilities: capabilities
    }
  });
  this.checkStatus(r, 200);
  expect(r.data.body.sessionId).to.be.a('string');
  this.sessionId = r.data.body.sessionId
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
internals.PurpleCat.prototype.findElements = function (value, using){
  using = using || 'accessibility id';
  var r = service.session['${sessionId}'].elements.POST({
    params: {
      sessionId: this.sessionId
    },
    body: {
      using: using,
      value: value
    }
  })
  this.checkStatus(r, 200);
  return r;
};

// POST /session/${sessionId}/elements/${elementId}/click
// response example:
// {
//	"status": 0,
//	"value": [{
//		"ELEMENT": "0"
//	}],
//	"sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
// }
internals.PurpleCat.prototype.clickElement = function (elementId){
  var r = this.service.session['${sessionId}'].element['${elementId}'].click.POST({
    params: {
      sessionId: this.sessionId,
      elementId: elementId
    }
  })
  this.checkStatus(r, 200);
  return r;
};

// POST /session/${sessionId}/elements/${elementId}/value
// response example:
// {
//	"status": 0,
//	"value": [{
//		"ELEMENT": "0"
//	}],
//	"sessionId": "124d29e3-2a8c-4953-a3b0-4662873ec25e"
// }
internals.PurpleCat.prototype.typeElement = function (elementId, value) {
  var r = this.service.session['${sessionId}'].element['${elementId}'].value.POST({
    params: {
      sessionId: this.sessionId,
      elementId: elementId
    },
    body: {
      value: [value]
    }
  })
  this.checkStatus(r, 200);
  return r;
};

// quit session
internals.PurpleCat.prototype.quit = function () {
  var r = this.service.session['${sessionId}'].DELETE({
    params: {
      sessionId: this.sessionId
    }
  })
  this.checkStatus(r, 200);
  return r;
};

// sleep in ms
internals.PurpleCat.prototype.sleep = function(period) {
  this.service.sleep(period);
}

exports = module.exports = internals.PurpleCat;
