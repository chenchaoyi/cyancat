
var Config = require('config');
var Bluecat = require('bluecat');
var PurpleCat = require('../lib/purplecat');

var api = Bluecat.Api('mobiledriver');

var service = new Bluecat.ServiceSync(api, Config.server.host, {
  followAllRedirects: true
});
service.setProxy(Config.proxy);

var purpleCat = new PurpleCat(service);
exports.mobiledriver = service;
exports.purpleCat = purpleCat;
