/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var util  = require('util');

var fnRouter  = require('./routes/piRouter')
var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.engine('html', require('ejs').renderFile);
 // app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

var server = http.createServer(app).listen(app.get('port'), function(){
  console.log("Server listening on port " + app.get('port'));
});


var socket = require('./routes/socket');
var io = require('socket.io').listen(server,{ log: false });

app.get('/', routes.index);
app.get('/pinState', fnRouter.getPinstate);
app.get('/blink', fnRouter.blink);
app.post('/turnOn/', fnRouter.turnON);
app.post('/turnOff/', fnRouter.turnOff);
app.post('/read/', fnRouter.readState);
app.post('/blinkpattern/', fnRouter.blinkPattern);

socket.socket(io);