require('dotenv').config();

const express = require("express"),
    bodyParser = require("body-parser"),
    exphbs = require("express-handlebars"),
    nodemailer = require("nodemailer"),
    app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));


//root route - home page
app.get("/", function(req, res) {
    res.render("index");
});

//contact route
app.get("/contact", function(req, res) {
    res.render("contact");
});

//contact POST route
app.post("/contact", function(req, res) {
    const output = `
	<p> You have a new Contact request</p>
	<h3>Contact Details</h3>
		<ul>
			<li>Name: ${req.body.name}</li>
			<li>Email: ${req.body.email}</li>
			<li>Subject: ${req.body.subject}</li>
			<li>Phone: ${req.body.phone}</li>
		</ul>
	<h3>Message</h3>
	<p>${req.body.message}</p>
`;


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        host: "smtp.mailgun.org",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.MAILGUN_USER, // generated ethereal user
            pass: process.env.MAILGUN_PW // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Website Contact Form" postmaster@sandbox3531cb9415854cb7b8901cef83521739.mailgun.org', // sender address
        to: 'apbeban@gmail.com', // list of receivers
        subject: 'Johnson Tiling Contact Request', // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('contact', {
            msg: 'Email has been sent'
        });
    });
});


app.listen(process.env.PORT || 3000, process.env.IP, function() {
    console.log("Server started...");
});