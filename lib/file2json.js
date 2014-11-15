// file2json.js
var fs = require('fs');
var Q = require('q');

var read = function(file) {
	var deferred = Q.defer();
	fs.readFile(file, "utf-8", function (error, text) {
		if (error) {
			deferred.reject(error);
		} else {
			deferred.resolve(text);
		}
	});
	return deferred.promise;
};


var f2j = function(file, cb) {
	read(file).then(function(text) {
		var json = null,
			err= null;
		try{
			json = JSON.parse(text);
		}
		catch(err) {
			cb(err, json);
		}
		cb(err, json);
	});
};


module.exports = f2j;