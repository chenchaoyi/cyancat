var Http = require('http');
var Config = require('config');
var Cyancat = require('../index');
var expect = require('chai').expect;

var t;

// Create local HTTP server to mimic a Selenium/Appium Server
var s = Http.createServer(function(req, res) {
  if (req.url === '/session') {
    res.end('{"status": "ok", "sessionId": "test123"}');
  } else {
    res.statusCode = 200;
    res.setHeader('X-PATH', req.url);
    res.end('{"status": "ok", "url": "' + req.url + '"}');
  }
});


describe('sample tests', function() {

  before(function(done) {
    // create cyancat object
    t = new Cyancat('http://localhost:6767', {
      maxWaitTime: 35000,
      proxy: Config.proxy
    });

    // start mock server
    s.listen(6767, function() {
      done();
    });
  });

  after(function(done) {
    s.close(function() {
      done();
    });
  });

  it('init', function(done) {
    t.run(function() {
      var r = t.init({
        "platformName": "iOS",
        "platformVersion": "9.2",
        "deviceName": "iPhone 6",
        "app": "/path/to/app/example.app"
      });

      // verify response
      expect(r.err).to.equal(null);
      expect(r.data.statusCode).to.equal(200);
      expect(r.data.body).to.have.ownProperty('sessionId');
      expect(t.sessionId).to.eql(r.data.body.sessionId);
      done();
    });
  });

});
