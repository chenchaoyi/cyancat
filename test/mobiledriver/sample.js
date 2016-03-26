
var expect = require('chai').expect;
var test = require('../../test/test.js');
var Config = require('config');

describe('Sign in test', function() {
  before(function() {
    service = test.mobiledriver;
    purpleCat = test.purpleCat;
  });

  it('sample test for sign in [C001]', function(done) {
    service.run(function() {
      // start session
      var r = purpleCat.init(Config.capabilities);

      // find popup
      r = purpleCat.findElements('Don’t Allow');
      var popUpId = r.data.body.value[0].ELEMENT

      // click on popup not allow
      r = purpleCat.clickElement(popUpId);

      purpleCat.sleep(1000);

      // find 2ed popup
      r = purpleCat.findElements('Don’t Allow');
      popUpId = r.data.body.value[0].ELEMENT

      // click on 2ed popup not allow
      r = purpleCat.clickElement(popUpId);

      // find login
      r = purpleCat.findElements('Sign In');
      popUpId = r.data.body.value[0].ELEMENT

      // click on sign in
      r = purpleCat.clickElement(popUpId);

      // find email text field
      r = purpleCat.findElements('//UIATextField[@name="email_field"]', 'xpath');
      popUpId = r.data.body.value[0].ELEMENT

      // type email
      r = purpleCat.typeElement(popUpId, 'wmt678+checkout1@gmail.com');

      // find password text field
      r = purpleCat.findElements('password_field');
      popUpId = r.data.body.value[0].ELEMENT

      // type pwd
      r = purpleCat.typeElement(popUpId, 'Welcome1');

      // find signin button
      r = purpleCat.findElements('//UIAButton[@name="Sign In"]', 'xpath');
      popUpId = r.data.body.value[0].ELEMENT

      // click on sign in
      r = purpleCat.clickElement(popUpId);

      // quit session
      r = purpleCat.quit();

      purpleCat.sleep(5000);

      done();
    });
  });

});
