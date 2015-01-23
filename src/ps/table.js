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

console.log(project.activeLayer);


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

paper.install(window.paperscript);