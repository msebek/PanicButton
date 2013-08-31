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
 
var logSchema = new Schema({
		timestamp: Number,
		key : String,
		message : String
	});

module.exports = mongoose.model('Log', logSchema);