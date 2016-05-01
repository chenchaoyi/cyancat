var Config = require('config');
var Cyancat = require('cyancat');

var cyanCat = new Cyancat(Config.server, {
  maxWaitTime: 35000,
  proxy: Config.proxy
});
exports.cyanCat = cyanCat;
