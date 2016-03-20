
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
          using: 'accessibility id',
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

      service.sleep(1000);
      // find 2ed popup
      r = service.session['${sessionId}'].elements.POST({
        params: {
          sessionId: sessionId
        },
        body: {
          using: 'accessibility id',
          value: 'Don’t Allow'
        }
      })
      expect(r.data.statusCode).to.equal(200);
      popUpId = r.data.body.value[0].ELEMENT

      // click on 2ed popup not allow
      r = service.session['${sessionId}'].element['${elementId}'].click.POST({
        params: {
          sessionId: sessionId,
          elementId: popUpId
        }
      })
      expect(r.data.statusCode).to.equal(200);

      // find login
      r = service.session['${sessionId}'].elements.POST({
        params: {
          sessionId: sessionId
        },
        body: {
          using: 'accessibility id',
          value: 'Sign In'
        }
      })
      expect(r.data.statusCode).to.equal(200);
      popUpId = r.data.body.value[0].ELEMENT

      // click on sign in
      r = service.session['${sessionId}'].element['${elementId}'].click.POST({
        params: {
          sessionId: sessionId,
          elementId: popUpId
        }
      })
      expect(r.data.statusCode).to.equal(200);

      // find email text field
      r = service.session['${sessionId}'].elements.POST({
        params: {
          sessionId: sessionId
        },
        body: {
          using: 'xpath',
          value: '//UIATextField[@name="email_field"]'
        }
      })
      console.log(r.data.body);
      expect(r.data.statusCode).to.equal(200);
      popUpId = r.data.body.value[0].ELEMENT

      // type email
      r = service.session['${sessionId}'].element['${elementId}'].value.POST({
        params: {
          sessionId: sessionId,
          elementId: popUpId
        },
        body: {
          value: ['wmt678+checkout1@gmail.com']
        }
      })
      expect(r.data.statusCode).to.equal(200);

      // find password text field
      r = service.session['${sessionId}'].elements.POST({
        params: {
          sessionId: sessionId
        },
        body: {
          using: 'accessibility id',
          //value: '//UIATextField[@name="password_field"]'
          value: 'password_field'
        }
      })
      console.log(r.data.body);
      expect(r.data.statusCode).to.equal(200);
      popUpId = r.data.body.value[0].ELEMENT

      // type pwd
      r = service.session['${sessionId}'].element['${elementId}'].value.POST({
        params: {
          sessionId: sessionId,
          elementId: popUpId
        },
        body: {
          value: ['Welcome1']
        }
      })
      expect(r.data.statusCode).to.equal(200);

      // find signin button
      r = service.session['${sessionId}'].elements.POST({
        params: {
          sessionId: sessionId
        },
        body: {
          using: 'xpath',
          value: '//UIAButton[@name="Sign In"]'
        }
      })
      expect(r.data.statusCode).to.equal(200);
      popUpId = r.data.body.value[0].ELEMENT

      // click on sign in
      r = service.session['${sessionId}'].element['${elementId}'].click.POST({
        params: {
          sessionId: sessionId,
          elementId: popUpId
        }
      })
      expect(r.data.statusCode).to.equal(200);

      r = service.session['${sessionId}'].DELETE({
        params: {
          sessionId: sessionId
        }
      })
      service.sleep(5000);

      done();
    });
  });

});
