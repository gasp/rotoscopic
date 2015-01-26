// 
//  configure.js
//  rotoscopic
//  returns config.json and extend with locale.json
//  

var extend = require('util')._extend;
var fs = require('fs');

var loadif = function(f) {
	var filename = __dirname + '/../' + f + '.json';
	if(fs.existsSync(filename))
		return require(filename);
	else return {};
};

var defaults = loadif('config');
var locale = loadif('locale');
var config = extend(defaults, locale);

module.exports = config;
