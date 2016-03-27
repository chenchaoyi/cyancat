
var expect = require('chai').expect;
var test = require('../../test/test.js');
var Config = require('config');

describe('Sign in test', function() {
  before(function() {
    driver = test.purpleCat;
  });

  it('sample test for sign in [C001]', function(done) {
    driver.run(function() {
      // start session
      var r = driver.init(Config.capabilities);

      // find popup
      //r = driver.findElements('Don’t Allow');
      r = driver.waitForElement('Don’t Allow1');
      var popUpId = r.data.body.value[0].ELEMENT

      // click on popup not allow
      r = driver.clickElement(popUpId);

      driver.sleep(1000);

      // find 2ed popup
      r = driver.findElements('Don’t Allow');
      popUpId = r.data.body.value[0].ELEMENT

      // click on 2ed popup not allow
      r = driver.clickElement(popUpId);

      // find login
      r = driver.findElements('Sign In');
      popUpId = r.data.body.value[0].ELEMENT

      // click on sign in
      r = driver.clickElement(popUpId);

      // find email text field
      r = driver.findElements('//UIATextField[@name="email_field"]', 'xpath');
      popUpId = r.data.body.value[0].ELEMENT

      // type email
      r = driver.typeElement(popUpId, 'wmt678+checkout1@gmail.com');

      // find password text field
      r = driver.findElements('password_field');
      popUpId = r.data.body.value[0].ELEMENT

      // type pwd
      r = driver.typeElement(popUpId, 'Welcome1');

      // find signin button
      r = driver.findElements('//UIAButton[@name="Sign In"]', 'xpath');
      popUpId = r.data.body.value[0].ELEMENT

      // click on sign in
      r = driver.clickElement(popUpId);

      // quit session
      r = driver.quit();

      driver.sleep(5000);

      done();
    });
  });

});
