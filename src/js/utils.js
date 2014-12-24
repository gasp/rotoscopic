
if (!Array.isArray) {
	Array.isArray = function(arg) {
		return Object.prototype.toString.call(arg) === '[object Array]';
	};
}

if (!Array.prototype.str2int) {
	Array.prototype.str2int = function(arg) {
		'use strict';

		if (this === void 0 || this === null) {
		  throw new TypeError();
		}

		var res = [];
		var len = this.length;
		for (var i = 0; i < len; i++) {
			var val = this[i];
			if(Array.isArray(val)) {
				res.push(val.str2int());

			}
			else {
				if(isNaN(parseInt(val))) {
					console.log(val);
					throw new TypeError();
				}
				res.push(parseInt(val))
			}
		};

		return res;
	};
}