var express=require("express"),
	mongoose=require("mongoose"),
	passport=require("passport"),
	localstrategy=require("passport-local"),
	passportlocalmongoose=require("passport-local-mongoose"),
	bodyparser=require("body-parser"),
	flash=require("connect-flash"),
	ans =  require("./models/ans"),
	user = require("./models/user"),
	sports= require("./models/sports"),
	science= require("./models/science"),
	space= require("./models/space"),
	misc= require("./models/misc"),
	app =express();

app.set("view engine","ejs");
mongoose.connect("mongodb://localhost/quiz",{useNewUrlParser: true});
mongoose.set('useCreateIndex', true);

var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));
app.use(flash());


app.use(require("express-session")({
	secret: "msd",
	resave: false,
	saveUninitialized: false
}));

app.use(bodyparser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});


app.get("/",function(req,res){
	res.render("front",{currentUser:req.user});
});

app.get("/space",function(req,res){
	space.find({},function(err,space){
		if(err){
			console.log("error");
		}
		else
			{res.render("space",{space : space});}
	});	
})

app.get("/sports",function(req,res){
	sports.find({},function(err,sports){
		if(err){
			console.log("error");
		}
		else
			{res.render("sports",{sports : sports});}
	});	
})

app.get("/misc",function(req,res){
	misc.find({},function(err,misc){
		if(err){
			console.log("error");
		}
		else
			{res.render("misc",{misc : misc});}
	});	
})

app.get("/science",function(req,res){
	science.find({},function(err,science){
		if(err){
			console.log("error");
		}
		else
			{res.render("science",{science : science});}
	});	
})

app.get("/register",function(req,res){
	res.render("register");
});

app.post("/register",function(req,res){
	user.register( new user({username:req.body.username,first:req.body.first,last:req.body.last,birthday_day:req.body.birthday_day,birthday_month:req.body.birthday_month,birthday_year
		:req.body.birthday_year,sex:req.body.sex}),req.body.password,function(err,user){
		if(err) {
			req.flash("error",err.message);
			res.render("register");
		}
		passport.authenticate("local")(req,res,function(){
			req.flash("success","Welcome "+user.first);
			res.redirect("/login");
		});
	});
});

app.get("/login",function(req,res){
	res.render("login");
});

app.post("/login", passport.authenticate("local" ,{

	successRedirect: "/",
	failureRedirect: "login",
}), function(req,res){
});

app.get("/logout",function(req,res){
	req.logout();
	req.flash("error","You have been logged out");
	res.redirect("/");
});

function isloggedin(req,res,next){
	if(req.isAuthenticated()){
		return next();
	}
	req.flash("error","Login First");
	res.redirect("/login");
}

app.listen(process.env.PORT | 3000,process.env.IP,function(){
	console.log("1 2 3 ...");
});