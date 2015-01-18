// projects

var projects = {};

projects.display = function () {
	console.log('display projects');
	service.project.list(function (projects) {
		$.each(projects, function (i) {
			var $a = $('<a>').data({'id':projects[i]._id})
				.attr("href", "#/project/"+projects[i]._id+"/"+projects[i].title)
				.text(projects[i].title)
				.on('click', function () {
					$(".projects").hide();
					window.projects.select($(this).data('id'));
				});
			var $li = $('<li>').append($a);
			$('.projects ul').append($li);
		});
	});
};
projects.select = function (id) {
	if(isNaN(parseInt(id)))
		throw new Error('id is not a number');
	lighttable.context.project = id;

	var numbers = [];
	service.project.list(id, function(frames) {
		var fl = frames.length;
		console.log('%d frames to import', fl);
		for (var i = 0; i < fl; i++) {

			// todo here should be a dedup like this
			/*
			if($.inArray(frames[i].number, numbers)) { // fixme
				console.log('frame ' + frames[i]._id + ': number ' + frames[i].number + ' is already in the project');
			}
			*/

			console.log('paths from frame %d, number %d', i, frames[i].number, frames[i].paths);
			numbers.push(frames[i].number);
			paperscript.import(frames[i].paths);
			// debug temporarly disabling next to see why the path is so strange
			//paperscript.next();

		};
	});
};