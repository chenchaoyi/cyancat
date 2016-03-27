
var Config = require('config');
var Bluecat = require('bluecat');
var PurpleCat = require('../lib/purplecat');

var api = Bluecat.Api('mobiledriver');

var blueCatService = new Bluecat.ServiceSync(api, Config.server.host, {
  followAllRedirects: true
});
blueCatService.setProxy(Config.proxy);

var purpleCat = new PurpleCat(blueCatService);
exports.purpleCat = purpleCat;
