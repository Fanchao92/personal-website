const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');
app.engine('html', hbs.__express);

//Render the main page
app.get('/', (req, res) => {
	var data = {
		authorName: 'Fanchao Zhou'
	};

	res.render('home.html', data);
});

////////////   All the APIs available in my app   ////////////////
app.get('/edu', (req, res) => {
	//return a JSON array containing my education
});

app.get('/career/goal', () => {
	//return a JSON object containing descriptions of my career goal
});

app.get('/career/skills', () => {
	//return a JSON array containing all my professional skills
});

app.get('/career/projects', () => {
	//return a JSON array containing all the projects I've done
});
//////////////////// End of the API part ////////////////////////

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});