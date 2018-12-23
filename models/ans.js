var mongoose=require("mongoose"),
	passportlocalmongoose=require("passport-local-mongoose");
mongoose.set('useCreateIndex', true);


var ansSchema=new mongoose.Schema({
	text:  				String,
	choice:  			String,
	ide: 				String,
	tb:  				String,
	idop: 				String
});

ansSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("ans",ansSchema); 