var mongoose = require('mongoose');

var MyEdu = mongoose.model('MyEdu', {
	schoolName: {
		type: String,
		require: true,
	},
	schoolLogoLink: {
		type: String,
		require: true
	},
	schoolImgLink: {
		type: String,
		require: true
	},
	schoolWebLink: {
		type: String,
		require: true
	},
	gpa: {
		type: String,
		validate: {
			validator: (v) => {
				return /[0-9]+\.[0-9]+\/[0-9]+\.[0-9]+/.test(v)
			},
			message: '{VALUE} is invalid. It should be in the form of: {actual gpa}/{total gpa}'
		}
	},
	major: {
		type: String
	},
	degreeEarned: {
		type: String,
		require: true
	}
});

module.exports = {
	MyEdu
};