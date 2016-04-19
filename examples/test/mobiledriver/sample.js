
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

      // find and click on Add button
      r = driver.clickEl('Add');

      // find memo summary text field and type value
      // driver.typeEl('memo test summary', '//UIATextField[@name="itemTitle"]', 'xpath');
      driver.typeEl('memo test summary 1', 'itemTitle');

      // find memo detail text field and type value
      driver.typeEl('memo test details 1', 'itemNotes');

      // find and click on Done button
      r = driver.clickEl('Done');

      // add another memo
      r = driver.clickEl('Add');
      driver.typeEl('memo test summary 2', 'itemTitle');
      driver.typeEl('memo test details 2', 'itemNotes');
      r = driver.clickEl('Done');

      // delete first memo
      driver.sleep(5000);
      r = driver.clickEl('//UIATableCell[@name = "memo test summary 1"]', 'xpath');
      r = driver.clickEl('Delete');

      driver.sleep(5000);

      done();
    });
  });

});
