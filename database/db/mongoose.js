var mongoose = require('mongoose');

mongoose.Promise = global.Promise;   //Tell Mongoose to use the built-in Promise library
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/MyWeb", (err) => {
	if(err) {
		console.log('Connection to MongoDB failed!');
	} else {
		console.log('MongoDB Connected!');
	}
});

module.exports = {
	mongoose
};