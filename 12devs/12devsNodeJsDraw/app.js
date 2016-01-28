'use strict';
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var users = require('./routes/users');
var vcapServices = require('vcap_services'),
    extend       = require('util')._extend,
    watson       = require('watson-developer-cloud');
var app = express();
require('./config/express')(app);
var config = extend({
  version: 'v1',
  url: 'https://stream.watsonplatform.net/speech-to-text/api',
  username: 'e4feb019-2d4c-4a48-95ca-8523b3003400',
  password: 'o50GaMeqPZ8J'
}, vcapServices.getCredentials('speech_to_text'));
var authService = watson.authorization(config);

// Get token using your credentials
app.post('/api/token', function(req, res, next) {
  authService.getToken({url: config.url}, function(err, token) {
    if (err)
	{
		console.log("errrr");
      next(err);
    }
	else
	{
		console.log("fine");
      res.send(token);
	console.log("all fine");
  }
  });
});

// error-handler settings
require('./config/error-handler')(app);
//var fork = require('child_process').fork;
/*
var exec=require('child_process').exec,
	child;
child=exec('node E:/altius_2k15/speech-to-text-nodejs-master/app.js',
			function(error,stdout,stderr){
			console.log('stdout: '+stdout);
			console.log('stderr: '+stderr);
			
			});
*/
//var child = fork('./../../speech-to-text-nodejs-master/app.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.engine('jade', require('jade').__express);
app.get("/", function(req, res){
    res.render("index");
});
 // app.set('port', process.env.PORT);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


var server = app.listen(4000);
var io = require('socket.io').listen(server, function() {
        console.log("Express server listening on port ");
});
// A user connects to the server (opens a socket)
io.sockets.on('connection', function (socket) {
	io.sockets.emit('message', { message: 'welcome to the chat' });
    socket.on('send', function (data) {
        io.sockets.emit('message', data);
    });
    // (2): The server recieves a ping event
    // from the browser on this socket
    socket.on('ping', function ( data ) {
  
    console.log('socket: server recieves ping (2)');

    // (3): Emit a pong event all listening browsers
// with the data from the ping event
io.sockets.emit( 'pong', data );   

console.log('socket: server sends pong to all (3)');

    });
	socket.on( 'drawCircle', function( data, session ) {
	 socket.broadcast.emit( 'drawCircle', data );
    console.log( "session " + session + " drew:");
    console.log( data );
});
});
module.exports = app;