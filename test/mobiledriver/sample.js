
var expect = require('chai').expect;
var test = require('../../test/test.js');
var Config = require('config');

describe('Sign in test', function() {
  before(function() {
    service = test.mobiledriver;
  });

  it('sample test for sign in [C001]', function(done) {
    service.run(function() {
      // start session
      var r = service.session.POST({
        body: {
          desiredCapabilities: Config.capabilities
        }
      });
      expect(r.data.statusCode).to.equal(200);
      var sessionId = r.data.body.sessionId;
      console.log(sessionId);

      // find popup
      r = service.session['${sessionId}'].elements.POST({
        params: {
          sessionId: sessionId
        },
        body: {
          using: 'name',
          value: 'Don’t Allow'
        }
      })
      expect(r.data.statusCode).to.equal(200);
      console.log(r.data.body);
      var popUpId = r.data.body.value[0].ELEMENT

      // click on popup not allow
      r = service.session['${sessionId}'].element['${elementId}'].click.POST({
        params: {
          sessionId: sessionId,
          elementId: popUpId
        }
      })
      expect(r.data.statusCode).to.equal(200);
      done();
    });
  });


});
