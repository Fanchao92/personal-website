const mongoose = require('./db/mongoose.js').mongoose;
const MyEdu = require('./models/myedu.js').MyEdu;

var eduArr = [
	new MyEdu({
		schoolName: "Zhuhai No.1 High School",
		schoolLogoLink: "images/zh1Logo.jpg",
		schoolImgLink: "images/zh1Img.jpg",
		schoolWebLink: "http://www.zhedu.net/cms/",
		degreeEarned: "High School Degree"
	}),
	new MyEdu({
		schoolName: "Huazhong University of Science and Technology",
		schoolLogoLink: "images/hustLogo.png",
		schoolImgLink: "images/hustImg.jpg",
		schoolWebLink: "http://english.hust.edu.cn/",
		gpa: "89.15/100.00",
		major: "Telecommunications",
		degreeEarned: "Bachelor of Engineering"
	}),
	new MyEdu({
		schoolName: "Texas A&M University",
		schoolLogoLink: "images/tamuLogo.png",
		schoolImgLink: "images/tamuImg.png",
		schoolWebLink: "http://www.tamu.edu",
		gpa: "3.85/4.00",
		major: "Computer Engineering",
		degreeEarned: "Master of Engineering"
	})
];
eduArr.forEach((edu) => {
	edu.save()
	.then((edu) => {
		console.log(edu);
	})
	.catch((err) => {
		console.log(err);
	});
});

mongoose.disconnect();