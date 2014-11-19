var express = require('express');
var router = express.Router();
var logger = require('morgan');
var debug = require('debug')('api');
var _ = require('lodash');


var User = require('../models/users');
var Project = require('../models/projects');
var Frame = require('../models/frames');

router.get('/', function (req, res) {
    User.find({}).select('_id name').exec(function(err, all) {
        res.send(all);
    });
});

// route middleware to validate :pid
router.param('id', function (req, res, next, id) {
//    id = _.trim(id);
    req.id = id;
    next(); 
});

router.get('/help', function (req, res) {
    User.find({isadmin: true}).select('name email').exec(function(err, admins) {
        res.render('api_help', { admins: admins });
    });
});

// get all frames
router.get('/f/', function (req, res) {
    Frame.find({}).select('_id project number date').exec(function(err, frames) {
        res.send(frames);
    });
});

// get a frame by frame id
router.get('/f/:id', function (req, res) {
    Frame.findById(req.id).exec(function(err, frames) {
        res.send(frames);
    });
});

// put a frame 
router.put('/f/', function (req, res) {
    req.body.project = req.body.project || 1; // default assign to project 1
    req.body.number = req.body.number || 0; // can be number 0 but not null
    var frame = new Frame(req.body);
    frame.save(function(err, frame) {
        if(err) throw err;
        res.send(frame);
        console.log("new frame #%d for project %d", frame.number, frame.project);
    });
});

// get all frames by project id
router.get('/p/f/:id', function (req, res) {
    Frame.find({"project": req.id}).exec(function(err, frames) {
        res.send(frames);
    });
});

// get latest frames by project id
router.get('/p/f/:id/latest', function (req, res) {
    Frame.find({"project": req.id}).sort('-number').limit(5).exec(function(err, frames) {
        res.send(frames);
    });
});

// get all projects
router.get('/p', function (req, res) {
    Project.find({}).select('_id title date').exec(function(err, projects) {
        res.send(projects);
    });
});

// get all users
router.get('/u', function (req, res) {
    User.find({}).select('_id name isadmin').exec(function(err, users) {
        res.send(users);
    });
});

module.exports = router;
