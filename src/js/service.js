var service = {};
service.server = 'http://localhost:3000';
service.api = 'api';
service.url = service.server + '/' + service.api;

// load frame
service.load = function (id, cb) {
	$.ajax({
		url: service.url + '/f/' + id,
		crossDomain: true,
		type: 'get',
	}).done(function(data) {
		if(cb) cb(data);
		else console.log(data);
	});
};

service.save = function(data) {
	$.ajax({
		url: service.url + '/f/',
		crossDomain: true,
		type: 'put',
		data:data
	}).done(function(data) {
		console.log(data.paths);
	});
};

// list project frames
service.list = function (id, cb) {
	$.ajax({
		url: service.url + '/p/f/' + id,
		crossDomain: true,
		type: 'get',
	}).done(function (data) {
		if(cb) cb(data);
		else console.log(data);
	});
};


// list projects
service.projects = function (cb) {
	$.ajax({
		url: service.url + '/p/',
		crossDomain: true,
		type: 'get',
	}).done(function (data) {
		cb(data);
	});
};