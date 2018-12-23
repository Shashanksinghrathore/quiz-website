var mongoose=require("mongoose"),
	passportlocalmongoose=require("passport-local-mongoose");
mongoose.set('useCreateIndex', true);
var ansSchema = ("./models/ans");

var scienceSchema=new mongoose.Schema({
	timestamp:  		String,
	question: 			String,
	answers: 			[ansSchema],
	correct:   			String,
	no: 				Number,
	divans: 			String,
	idtd: 				String,
	hid: 				String
});

scienceSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("science",scienceSchema); 