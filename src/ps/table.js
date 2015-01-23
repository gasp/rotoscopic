// freepen tool
var freepen = new Tool();
console.log(freepen);
freepen.minDistance = 2;

freepen.name = 'freepen';
freepen.options = {
	drawingColor: 'red',
	finalColor: 'black'
};

freepen.onMouseDown = function(ev) {
	path = new Path();
	path.strokeColor = this.options.drawingColor;
};

freepen.onMouseDrag = function(ev) {
	path.add(ev.point);
};
freepen.onMouseUp = function(ev) {
	path.add(ev.point);
	path.strokeColor = this.options.finalColor;
};

// paper.tools
console.log(tools);
//console.log(activeTool);
//console.log(project.activeLayer);

var that = this;
this.import = function (paths) {
	console.warn('table/import %d paths', paths.length);
	for (var i = 0; i < paths.length; i++) {

		//perhaps here we could import directly all the path at once
		// directly in the new Path(paths[i])

		var importedpath = new Path({
			// should be paths[i].strokeColor but color have to be translated
			strokeColor: '#ff9922',
			// str2int translates segments coordinates from string to int, see utils
			segments: paths[i][1].segments.str2int(),
			//selected: true,
			applyMatrix: true
		});
	};
	//importedpath.smooth();

	view.draw();
};

this.next = function() {
	console.log(project.layers);

	var newLayer = new Layer({
		position: view.center
	});
	newLayer.activate();

	var nblayers = project.layers.length;
	for (var i = 0; i < nblayers; i++) {
		//project.layers[i].blendMode = 'lighten';
		console.log('layer %d opacity %d :', i, (nblayers-i), 1/(nblayers-i));
		project.layers[i].opacity = 1/ (nblayers-i);
	};
	console.log(view);
};

this.export = function() {
	return project.activeLayer.exportJSON({
		options: {
			asString: false,
			precision: 10
		}
	})
};

paper.install(window.paperscript);