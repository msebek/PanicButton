 // The Request model 
var mongoose = require('mongoose'), 
	Schema = mongoose.Schema;
 
/*var requestSchema = new Schema({
    requestingTeamName: String,
	requestingTeamID: Number,
	requestDate: {type: Date, default: Date.now}
	location: String,
	topic: String,
	description: String,
	blockingProblem: String,
    
});*/
 
var feedbackSchema = new Schema({
		timestamp: Number,
		key : String,
		score : Number,
		message : String
	});

module.exports = mongoose.model('Feedback', feedbackSchema);