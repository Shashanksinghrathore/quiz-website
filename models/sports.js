var mongoose=require("mongoose"),
	passportlocalmongoose=require("passport-local-mongoose");
mongoose.set('useCreateIndex', true);
var ansSchema = ("./models/ans");

var sportsSchema=new mongoose.Schema({
	timestamp:  		String,
	question: 			String,
	answers: 			[ansSchema],
	correct:   			String,
	no: 				Number,
	divans: 			String,
	idtd: 				String,
	hid: 				String
});

sportsSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("sports",sportsSchema); 