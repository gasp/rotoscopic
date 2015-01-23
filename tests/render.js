var render = require("../render.js");
var fs = require('fs');

// http://stackoverflow.com/questions/27865732/implemeting-a-paper-js-spiral-raster-example-on-server-side


var json = '["Layer",{"applyMatrix":true,"children":[["Path",{"applyMatrix":true,"segments":[[274.5,71],[265.5,72],[251.5,79],[236.5,88],[214.5,105],[192.5,123],[181.5,135],[174.5,146],[173.5,152],[173.5,159],[177.5,171],[188.5,179],[204.5,188],[221.5,194],[240.5,198],[257.5,200],[269.5,200],[278.5,200],[282.5,196],[285.5,190],[285.5,180],[278.5,171],[264.5,161],[250.5,158],[238.5,157],[231.5,157],[225.5,157],[222.5,157],[221.5,158],[221.5,159],[221.5,161],[221.5,162],[222.5,163],[223.5,164],[225.5,165],[226.5,165],[228.5,165],[229.5,165],[229.5,165],[229.5,165]],"strokeColor":[0,0,0]}]]}]';

describe("rendering files", function() {
	var filepng = __dirname+'/../data/png/sample.png';
	if(fs.existsSync(filepng)) {
		console.log("remove png");
		fs.unlinkSync(filepng);
	}
	var filesvg = __dirname+'/../data/svg/sample.svg';
	if(fs.existsSync(filesvg)) {
		fs.unlinkSync(filesvg);
	}

	it("loads the file", function() {
		render.load(json);
	});

	it("creates a png file", function(done) {
		render.png('sample', function() {
			expect(fs.existsSync(filepng)).toBe(true);
			done();
		})
	});
	it("creates a svg file", function(done) {
		render.svg('sample', function() {
			expect(fs.existsSync(filesvg)).toBe(true);
			done();
		})
	});
});
