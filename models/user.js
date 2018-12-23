var mongoose=require("mongoose"),
	passportlocalmongoose=require("passport-local-mongoose");
mongoose.set('useCreateIndex', true);

var userSchema=new mongoose.Schema({
	email:  		String,
	first: 			String,
	last: 			String,
	birthday_day:   Number,
	birthday_month: Number,
	birthday_year:  Number, 
	sex:       		String
});

userSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("user",userSchema); 