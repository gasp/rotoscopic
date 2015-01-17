// dom helper
var createLabel = function(obj, on) {
	var $a = $('<a>').attr('href', '#/' + obj.type + '/' + obj.id);
	$a.addClass('label');
	$a.text(obj.label);
	if(typeof(on) === 'function')
		$a.on('click', on);
	return $a;
};

var createThumbnail = function (obj, on) {
	var $a = $('<a>').attr('href', '#/' + obj.type + '/' + obj.id);
	$a.addClass('thumbnail');
	var $im = $('<img>').attr('src', obj.src);
	$a.append($im);
	if(typeof(on) === 'function')
		$a.on('click', on);
	return $a;
};

var unselect = function () {
	$('*.active', $('#users, #projects, #frames')).removeClass('active');
};

var users = {
	create: function () {},
	read: function () {
		var that = this;
		$.getJSON("/api/u", function(res) {
			for (var i = res.length - 1; i >= 0; i--) {
				var obj = {
					type: 'user',
					id: res[i]._id,
					label: res[i].name
				};
				$('#users').append(createLabel(obj, function (ev) {
					that.select($(this));
				}));
			}
		});
	},
	update: function () {},
	delete: function () {},
	select: function ($el) {
		unselect();
		$el.addClass('active');
	}
};

var projects = {
	create: function () {},
	read: function () {
		var that = this;
		$.getJSON("/api/p", function(res) {
			for (var i = res.length - 1; i >= 0; i--) {
				var obj = {
					type: 'project',
					id: res[i]._id,
					label: res[i].title
				};
				$('#projects').append(createLabel(obj, function (ev) {
					that.select($(this));
				}));
			}
		});
	},
	update: function () {},
	delete: function () {},
	select: function ($el) {
		unselect();
		$el.addClass('active');
	}
};

var frames = {
	create: function () {},
	read: function () {
		var that = this;
		$.getJSON("/api/f", function(res) {
			for (var i = res.length - 1; i >= 0; i--) {
				var obj = {
					type: 'frame',
					id: res[i]._id,
					src: "https://d3esbfg30x759i.cloudfront.net/pap/zlCfzShimDEPUpWJIF"
				};
				$('#frames').append(createThumbnail(obj, function (ev) {
					that.select($(this));
				}));
			}
		});
	},
	update: function () {},
	delete: function () {},
	select: function ($el) {
		unselect();
		$el.addClass('active');
	}
};

$(function () {
	users.read();
	projects.read();
	frames.read();
});
