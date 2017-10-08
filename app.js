const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const bodyParser = require('body-parser');
const mongoose = require('./database/db/mongoose.js').mongoose;
const MyEdu = require('./database/models/myedu.js').MyEdu;
const MyProfAspect = require('./database/models/myprofaspects.js').MyProfAspect;
const MyProfSkill = require('./database/models/myprofskill.js').MyProfSkill;
const MyProfProject = require('./database/models/myprofproject.js').MyProfProject;
const port = process.env.PORT || 3000;

var app = express();
if(process.env.NODE_ENV != 'production') {
	var config = JSON.parse(fs.readFileSync(`${__dirname}/mailgun/api.json`, 'utf8'));
	process.env.MAILGUN_DOMAIN = config.MAILGUN_DOMAIN;
	process.env.MAILGUN_API_KEY = config.MAILGUN_API_KEY;
	process.env.to = config.to;
}

var mailgun = require('mailgun-js')({
	domain: process.env.MAILGUN_DOMAIN, 
	apiKey: process.env.MAILGUN_API_KEY
});

app.set('view engine', 'hbs');
app.engine('html', hbs.__express);
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
hbs.registerPartials(`${__dirname}/views/partials`);

//Render the main page
app.get('/', (req, res) => {
	var data = {
		title: 'Welcome to Fanchao\'s Page!',
		navZoomIn: '150%',
		pZoomIn: '120%',
		hZoomIn: '250%',
		signature: 'images/nav-header-brand.png',
		zhuhaiImg: 'images/zhuhai.png',
		whiteColor: '#ffffff',
		blueColor: '#9bf1ff',
		maroonColor: '#400000',
		fontStyle: 'italic',
		aboutMe: 'About Me',
		myEdu: 'My Education',
		myProf: 'My Profession',
		contactMe: "Contact Me"
	};

	res.render('home.html', data);
});

////////////   All the APIs available in my app   ////////////////
app.get('/about', (req, res) => {
	//return a JSON object containing a brief introduction and a personal image
	var aboutObj = {};

	aboutObj.myImg = "images/my-picture.jpg";
	aboutObj.selfIntro = fs.readFileSync('public/text/self-intro.txt', {encoding: 'utf8'});

	res.send(aboutObj);
});

app.get('/edu', (req, res) => {
	//return a JSON array containing my education
	MyEdu.find().then((myEdus) => {
		res.send(myEdus);
	}).catch((err) => {
		res.status(400).send(err);
	});
});

app.get('/profession/aspects', (req, res) => {
	//return a JSON object containing descriptions of all the aspects of my profession
	MyProfAspect.find().then((aspects) => {
		res.send(aspects);
	}).catch((err) => {
		res.status(400).send(err);
	});
});

app.get('/profession/skills', (req, res) => {
	//return a JSON array containing all my professional skills
	MyProfSkill.find().then((skills) => {
		res.send(skills);
	}).catch((err) => {
		res.status(400).send(err);
	});
});

function findSkills(skillName) {
	return MyProfSkill.findOne({"title": skillName});
}

app.get('/profession/skills/pl', (req, res) => {
	//return a JSON array containing all the programming languages I've learned
	findSkills("Programming Languages").then((docs) => {
		res.send(docs.entries);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.get('/profession/skills/tools', (req, res) => {
	//return a JSON array containing all the tools and frameworks I've used
	findSkills("Tools and Frameworks").then((docs) => {
		res.send(docs.entries);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.get('/profession/skills/knowledge', (req, res) => {
	//return a JSON array containing all the software-related knowledge I have
	findSkills("Knowledge").then((docs) => {
		res.send(docs.entries);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.get('/profession/projects', (req, res) => {
	//return a JSON array containing all the projects I've done
	MyProfProject.find().then((docs) => {
		res.send(docs);
	}).catch((e) => {
		res.status(400).send(e);
	});
});

app.post('/contactme', (req, res) => {
	var data = {
	  	from: req.body.email,
	  	to: process.env.to,
	  	subject: `Message by ${req.body.fName} ${req.body.lName} from my personal website`,
	  	text: req.body.msg
	};
	 
	mailgun.messages().send(data, function (error, body) {
	  	if(error) {
	  		res.status(404)
	  		   .send({});
	  	} else {
	  		console.log(body);
	  		res.send({});
	  	}
	});
});
//////////////////// End of the API part ////////////////////////

app.listen(port, () => {
	console.log(`current local directory: ${__dirname}`);
	console.log(`Server is running on port ${port}`);
});