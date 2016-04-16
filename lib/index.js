var Config = require('config');
var Bluecat = require('bluecat');
var CyanCat = require('./cyancat');

var api = Bluecat.Api('mobiledriver');

var blueCatService = new Bluecat.ServiceSync(api, Config.server.host, {
  followAllRedirects: true
});
blueCatService.setProxy(Config.proxy);

var cyanCat = new CyanCat(blueCatService);
exports = module.exports = cyanCat;

