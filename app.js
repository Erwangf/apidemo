
/* ==================================================================================================================*/
// PACKAGES
/* ==================================================================================================================*/

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Promise = require('bluebird');

/* ==================================================================================================================*/
// FILES
/* ==================================================================================================================*/
var config = require("./config/config.json");
var routes = require('./routes/index');
var workmen = require('./routes/workmen');


/* ==================================================================================================================*/
// APP CONFIGURATION
/* ==================================================================================================================*/


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* ==================================================================================================================*/
// DATABASE : MongoDB
/* ==================================================================================================================*/

mongoose.Promise = Promise; //bluebird promises
var options = { promiseLibrary: require('bluebird') };
var _m = config.databases.mongodb_mlab;
var URI = 'mongodb://'+_m.user+':'+_m.password+'@'+_m.url+':'+_m.port+'/'+_m.db;
mongoose.connect(URI,options);

/* ==================================================================================================================*/
// ROUTES
/* ==================================================================================================================*/

app.use('/', routes);
app.use('/workmen',workmen);



/* ==================================================================================================================*/
// HANDLERS
/* ==================================================================================================================*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message
  });
});

/* ==================================================================================================================*/
// EXPORT
/* ==================================================================================================================*/
module.exports = app;
