const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

app.set('view engine', 'hbs');
app.engine('html', hbs.__express);
app.use(express.static(`${__dirname}/public`));
hbs.registerPartials(`${__dirname}/views/partials`);

//Render the main page
app.get('/', (req, res) => {
	var data = {
		title: 'Welcome to Fanchao\'s Page!',
		navZoomIn: '150%',
		pZoomIn: '120%',
		signature: 'images/nav-header-brand.png',
		zhuhaiImg: 'images/zhuhai.png',
		rootURL: `${req.protocol}://${req.get('Host')}`,
		whiteColor: '#ffffff',
		blueColor: '#16e0cf',
		maroonColor: '#800000',
		fontStyle: 'italic'
	};

	res.render('home.html', data);
});

////////////   All the APIs available in my app   ////////////////
app.get('/about', (req, res) => {
	//return a JSON object containing a brief introduction and a personal image
	var aboutObj = {};

	aboutObj.myImg = "images/my-picture.jpg"
	aboutObj.selfIntro = fs.readFileSync(`public/text/self-intro.txt`, {encoding: 'utf8'});

	res.send(aboutObj);
});

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
//////////////////// End of the API part ////////////////////////

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});