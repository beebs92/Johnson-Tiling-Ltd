var express     	= require("express"),
	bodyParser  	= require("body-parser"),
    app         	= express();
	
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));

//root route - home page
app.get("/", function(req, res) {
	res.render("index");
});

app.get("/contact-us", function(req, res) {
	res.render("contact");
});

app.listen(process.env.PORT || 3000, process.env.IP, function(){
   console.log("Server Has Started!");
});