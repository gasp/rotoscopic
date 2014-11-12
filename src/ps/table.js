var path = new Path();


// freepen tool
var freepen = new Tool();
console.log(freepen)

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
