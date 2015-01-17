var paper = require('paper');
var fs = require('fs');
var render = {};

// http://stackoverflow.com/questions/27865732/implemeting-a-paper-js-spiral-raster-example-on-server-side


var canvas = new paper.Canvas(640, 480);
paper.setup(canvas);

var layer = paper.project.activeLayer;

// Create a Paper.js Path to draw a line into it:
var path = new paper.Path();
// Give the stroke a color
path.strokeColor = 'black';
var start = new paper.Point(100, 100);
// Move to start and draw a line from there
path.moveTo(start);
// Note that the plus operator on Point objects does not work
// in JavaScript. Instead, we need to call the add() function:
path.lineTo(start.add([ 200, -50 ]));

// Draw the view now:
paper.view.draw();

render.png = function(filename, cb) {
	var fullpath = __dirname + '/data/png/' + filename +'.png';
	var out = fs.createWriteStream(fullpath);
	var stream = canvas.pngStream();
	stream.on('data', function(chunk) {
		out.write(chunk);
	});
	stream.on('end', function() {
		cb();
	});
};

render.svg = function(filename, cb) {
	var fullpath = __dirname + '/data/svg/' + filename + '.svg';
	var out = layer.exportSVG({
		asString: true,
		precision: 5,
		matchShapes: true
	});
	var svgheader = '<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="640" height="480">';

	fs.writeFile(fullpath, svgheader + out + '</svg>', function (err) {
		if (err) throw err;
		cb()
	});
};

// testing it

render.png('sample', function() {
	console.log("^.^");
});

render.svg('sample', function() {
	console.log("^.^");
});
// should be used as render.load([layer pathes])
// and render.write() that exports png and svg
// module.exports = render