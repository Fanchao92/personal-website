const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');
app.engine('html', hbs.__express);
app.use(express.static(`${__dirname}/public`));

//Render the main page
app.get('/', (req, res) => {
	var data = {
		title: 'Welcome to Fanchao\'s Page!',
		maroonColor: '#800000',
		whiteColor: '#FFFFFF',
		zoomInSize: '120%',
		signature: 'images/nav-header-brand.png'
	};

	res.render('home.html', data);
});

////////////   All the APIs available in my app   ////////////////
app.get('/edu', (req, res) => {
	//return a JSON array containing my education
});

app.get('/professional/goal', (req, res) => {
	//return a JSON object containing descriptions of my career goal
});

app.get('/professional/skills', (req, res) => {
	//return a JSON array containing all my professional skills
});

app.get('/professional/projects', (req, res) => {
	//return a JSON array containing all the projects I've done
});

app.get('/professional', (req, res) => {
	//return all the information about my career in one JSON object
});
//////////////////// End of the API part ////////////////////////

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});