var Config = require('config');
var Bluecat = require('bluecat');
//var CyanCat = require('../lib/cyancat');
var cyanCat = require('cyancat');

/*
var api = Bluecat.Api('mobiledriver');

var blueCatService = new Bluecat.ServiceSync(api, Config.server.host, {
  followAllRedirects: true
});
blueCatService.setProxy(Config.proxy);
*/

//var cyanCat = new CyanCat(blueCatService);
exports.cyanCat = cyanCat;
