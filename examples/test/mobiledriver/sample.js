
var expect = require('chai').expect;
var test = require('../../test/test.js');
var Config = require('config');

describe('Sign in test', function() {
  before(function() {
    driver = test.cyanCat;
  });

  after(function(done) {
    driver.run(function() {
      // quit session
      driver.quit();
      done();
    });
  });

  it('sample test for sign in [C001]', function(done) {
    driver.run(function() {
      // start session
      var r = driver.init(Config.capabilities);

      // find Add button
      var elementId = driver.waitForElement('Add');
      // click on Add button
      r = driver.clickElement(elementId);

      // find summary title text field
      // r = driver.findElements('//UIATextField[@name="itemTitle"]', 'xpath');
      elementId = driver.waitForElement('itemTitle');
      // type memo summary
      driver.typeElement(elementId, 'memo test summary');

      // find memo detail
      elementId = driver.waitForElement('itemNotes');
      // type memo detail
      driver.typeElement(elementId, 'memo test details');

      // find Done button
      var elementId = driver.waitForElement('Done');
      // click on Done button
      r = driver.clickElement(elementId);
      
      driver.sleep(5000);

      done();
    });
  });

});
