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
 
var requestSchema = new Schema({
		timestamp: Number,
		urlId: String,
		requestingTeamName: String,
		location: String,
		topic: String
	});

module.exports = mongoose.model('Request', requestSchema);