var mongoose = require('mongoose');

var MyProfSkill = mongoose.model('MyProfSkill', {
	title: {
		type: String,
		require: true
	},
	entries: [{
		type: String,
		unique: true
	}]
});

module.exports = {
	MyProfSkill
};