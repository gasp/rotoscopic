var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var _ = require('lodash'); // fixme do i need this here ?

var tingodb = require('tingodb');
var tungus = require('tungus');
var mongoose = require('mongoose');


var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api', api);
app.use('/src/js/server.js', function(req, res, next) {
    var fs = require('fs');
    var c = fs.readFileSync(__dirname + '/src/js/server.js', {encoding: 'utf8'});
    res.send(c);
});
app.use('/src/lib/jquery/dist/jquery.js', function(req, res, next) {
    var fs = require('fs');
    var c = fs.readFileSync(__dirname + '/src/lib/jquery/dist/jquery.js', {encoding: 'utf8'});
    res.send(c);
});


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {

    console.log('+ loading application in development mode');
    console.log('+ verbose error messages');
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
    console.log('+ pretty source');
    app.locals.pretty = true; // jade html
    app.set('json spaces', 2); // json

    app.set('db_path', 'tingodb://'+__dirname+'/data');
    console.log('+ %s', app.get('db_path'));
    mongoose.connect(app.get('db_path'), function (err) {
        // if we failed to connect, abort
        if (err) throw err;
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


module.exports = app;
