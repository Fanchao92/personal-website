var mongoose = require('mongoose');

var startDateValidator = (date) => {
	if(/\d\d\/\d\d\d\d/.test(date)) {
		var dateDetails = date.split('/');
		var month = parseInt(dateDetails[ 0 ]);

		return month>=1 && month<=12;
	} else {
		return false;
	}
};

var endDateValidator = (date) => {
	return /present/i.test(date) || startDateValidator(date);
};

var MyProfProject = mongoose.model('MyProfProject', {
	title: {
		type: String,
		require: true
	},
	depiction: [{
		type: String,
		unique: true
	}],
	photoLink: {
		type: String,
		require: true
	},
	githubLink: {
		type: String,
		require: true
	},
	startDate: {
		type: String,
		validate: {
			validator: startDateValidator,
			message: '[VALUE] is not a valid start date.'
		}
	},
	endDate: {
		type: String,
		validate: {
			validator: endDateValidator,
			message: '[VALUE] is not a valid start date.'
		}
	}
});

module.exports = {
	MyProfProject
};