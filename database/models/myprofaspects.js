var mongoose = require('mongoose');

var MyProfAspect = mongoose.model('MyProfAspect', {
	name: {
		type: String,
		require: true
	},
	imgLink: {
		type: String,
		require: true,
	},
	depiction: {
		type: String,
		require: true,
		minLength: 50
	}
});

module.exports = {
	MyProfAspect
};