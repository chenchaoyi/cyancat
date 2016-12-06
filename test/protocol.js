var Http = require('http');
var Config = require('config');
var Cyancat = require('../index');
var expect = require('chai').expect;

var t;

// Create local HTTP mock server to mimic a Selenium/Appium Server
var s = Http.createServer(function(req, res) {
  var responseBody = '';
  var requestBody;
  if (req.method == 'POST') {
    req.on('data', function(chunk) {
      requestBody = chunk.toString();
    });
  }
  req.on('end', function() {
    res.statusCode = 200;
    res.setHeader('X-PATH', req.url);
    responseBody = {
      status: 'OK',
      url: req.url,
      sessionId: 'test-session-id',
      requestBody: JSON.parse(requestBody)
    };
    res.end(JSON.stringify(responseBody));
  });
});


describe('Cyancat unit tests', function() {

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
        platformName: 'iOS',
        platformVersion: '9.2',
        deviceName: 'iPhone 6',
        app: '/path/to/app/example.app'
      });

      // verify response
      expect(r.err).to.equal(null);
      expect(r.data.statusCode).to.equal(200);
      expect(r.data.body).to.have.ownProperty('sessionId');
      expect(t.sessionId).to.eql(r.data.body.sessionId);
      expect(r.data.body.url).to.eql('/session');
      done();
    });
  });

  it('findElements', function(done) {
    t.run(function() {
      var r = t.findElements('test locator');

      // verify response
      expect(r.err).to.equal(null);
      expect(r.data.statusCode).to.equal(200);
      expect(r.data.body).to.have.ownProperty('sessionId');
      expect(t.sessionId).to.eql(r.data.body.sessionId);
      expect(r.data.body.url).to.eql('/session/' + t.sessionId + '/elements');
      expect(r.data.body.requestBody.using).to.eql('accessibility id');
      expect(r.data.body.requestBody.value).to.eql('test locator');
      done();
    });
  });

});
