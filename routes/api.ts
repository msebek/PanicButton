var Request = require("../models/request.js"),
    Hashids = require("hashids"),
    hashids = new Hashids("some");
/*
 * POST /requests
 */
exports.postrequests = function (req, res) {
    console.log("post request received!");
    // TODO: Verify the request.

    // User-supplied
    var myTeamName = req.body.requestingTeamName;
    var myLocation = req.body.location;
    var myTopic = req.body.topic;
    var myDescription = req.body.description;
    var myBlockingProblem = req.body.blockingProblem;
    if (myTeamName === undefined || myLocation === undefined || myTopic === undefined) {
        res.send(1024);
        return;
    }
    if (myDescription === undefined || myBlockingProblem === undefined) {
        res.send(1024);
        return;
    }

    // Server-supplied
    var mssinceepoch = new Date().getTime();
    var pendingApprovalstate = "pendingApproval";

    // Generate request
    var newRequest = new Request({
        requestingTeamName: myTeamName,
        location: myLocation,
        topic: myTopic,
        
        description: myDescription,
        blockingProblem: myBlockingProblem,

        timestamp: mssinceepoch,        
        status: pendingApprovalstate
    });


    // (add shortid to request)
    var shortid = hashids.encrypt(mssinceepoch);
    console.log("Post Id:[" + shortid + "]");
    newRequest.urlId = shortid;

    // Add it to database
    newRequest.save(function (err) {
        if (err) {
            console.log("Error on database save");
        }
    });

    // For Post, create and then 201
    res.setHeader('Location', '/requests/' + shortid);
    res.send(201);
    return;

};

/*
 * GET /requests
 */
exports.getrequests = function (req, res) {
    console.log("get requests!");
    Request.find(function (err, requests) {
        res.send(JSON.stringify(requests, null, 4));
    });
};

/*
 * GET /requests/:id
 */
exports.getrequestsid = function (req, res) {
    // Retrieve the original 
    var dbid = hashids.decrypt(req.params.id);
    Request.find({ "urlId": req.params.id }, function (err, requests) {
        console.log(requests);
        if (requests.length === 0) {
            res.send(404);
        }
        if (requests.length > 1) {
            console.log("WARNING: MULTIPLE WITH SAME ID");
        }
        res.send(JSON.stringify(requests[0], null, 4));
    });
};

/*
 * PATCH /requests/:id
 */
exports.patchrequestsid = function (req, res) {
    // Retrieve the original
    Request.find({ "urlId": req.params.id }, function (err, requests) {
        console.log(requests);
        //TODO: Actually check errors?
        if (requests.length === 0) {
            res.send(404);
            return;
        }
        else if (requests.length > 1) {
            console.log("THIS IS REALLY BAD: MULTIPLE WITH SAME ID");
        }
        var tempRequest = requests[0];

        // See what field need to be changed  
        // This seems stupid.  
        //var myTimeStamp = req.body.timestamp; Don't allow timeestamp to change
        //var myUrlId = req.body.urlId; Don't allow myu
        var myRequestingTeamName = req.body.requestingTeamName;
        var myLocation = req.body.location;
        var myTopic = req.body.topic;
        var myDescription = req.body.description;
        var myBlockingProblem = req.body.blockingProblem;
        var myStatus = req.body.status;

        if (req.body.requestingTeamName !== undefined) {
            res.send("Team name change unimplemented");
            return;
        }
        if (req.body.location !== undefined) {
            res.send("Location change unimplemented");
            return;
        }
        if (req.body.topic !== undefined) {
            res.send("Topic change unimplemented");
            return;
        }
        if (req.body.description !== undefined) {
            res.send("Description change unimplemented");
            return;
        }
        if (req.body.blockingProblem !== undefined) {
            res.send("Blocking problem change unimplemented");
            return;
        }

        if (req.body.status !== undefined) {
            tempRequest.status = req.body.status;
            debugger;
        }
        
        res.setHeader('Location', '/requests/' + tempRequest.urlId);
        res.send(204)

    });



};

/*
 * POST /logging
 */
exports.postlogging = function (req, res) {
    res.send("logging unimplemented");
};

/*
 * POST /feedback
 */
exports.postfeedback = function (req, res) {
    res.send("feedback unimplemented");
};




