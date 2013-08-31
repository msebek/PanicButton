/**
 * Module dependencies.
 */
var express = require('express'),
    routes = require('./routes'),
    api = require('./routes/api'),
    http = require('http'),
    path = require('path'),
    mongoose = require('mongoose');

var app = express();

// connect to Mongo when the app initializes
mongoose.connect('mongodb://localhost');

// Set up default settings.
app.set('port', process.env.PORT || 3000);
//app.set('views', __dirname + '/views');
//app.set('view engine', 'jade');

// set up middlewares.
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
//??
app.use(app.router);

// stuff for less.
//app.use(require('less-middleware')({ src: __dirname + '/public' }));
// main file serving. 
app.use(express.static(path.join(__dirname, 'client')));

// Simplest error handler. 
app.use(function(err, req, res, next) {
  console.log('Damn, hit an error. ['+err+']'+'['+req+']'
	      +'['+res+']')});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}


//   can pass multiple callbacks, treated like the middlewares. 
// used by app.router. 
// call next() to pass control to next thing in middleware stack.
app.get('/', routes.index);
app.post('/requests', api.postrequests);
app.get('/requests', api.getrequests);
app.get('/requests/:id', api.getrequestsid);
app.patch('/users', api.patchrequestsid);
app.post('/feedback', api.postfeedback);
app.post('/logging', api.postlogging);



// Now we set up the server with app, now that we've
//  gone through the process of setting up all the middleware.
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
