var mongoose=require("mongoose"),
	passportlocalmongoose=require("passport-local-mongoose");
mongoose.set('useCreateIndex', true);
var ansSchema = ("./models/ans");

var miscSchema=new mongoose.Schema({
	timestamp:  		String,
	question: 			String,
	answers: 			[ansSchema],
	correct:   			String,
	no: 				Number,
	divans: 			String,
	idtd: 				String,
	hid: 				String
});

miscSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("misc",miscSchema); 