
// The Request model 
var mongoose = require('mongoose'), 
	Schema = mongoose.Schema;
  
var feedbackSchema = new Schema({
		timestamp: Number,
		key : String,
		score : Number,
		message : String
	});

module.exports = mongoose.model('Feedback', feedbackSchema);