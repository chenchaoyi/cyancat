
var Config = require('config');
var Bluecat = require('bluecat');

var api = Bluecat.Api('mobiledriver');

service = new Bluecat.ServiceSync(api, Config.server.host, {
  followAllRedirects: true
});
service.setProxy(Config.proxy);
exports.mobiledriver = service;
