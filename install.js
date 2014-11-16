// install
"use strict";

var Q = require('q');
var tingodb = require('tingodb');
var tungus = require('tungus');
var mongoose = require('mongoose');
var f2j = require('./lib/file2json');

var User = require('./models/users');
var Project = require('./models/projects');
var Frame = require('./models/frames');

// global configuration
Q.longStackSupport = true;
var myFirstProject = 'My First Project'


// database objects
var db = {
    url: 'trololo',
    connect: function(conn) {
        var deferred = Q.defer();
        mongoose.connect(conn, function (err) {
            if (err) deferred.reject(err);
            else deferred.resolve(true);
        });
        return deferred.promise;
    },
    wait: function() {
        var deferred = Q.defer();
        setTimeout(function() {
            deferred.resolve(true);
        }, 100);
        return deferred.promise;
    }
};
db.users = {
    count: function() {
        var deferred = Q.defer();
        User.find({}).count(function(err, users) {
            if(err) deferred.reject(err);
                deferred.resolve(users);
        });
        return deferred.promise;
    },
    empty: function() {
        var deferred = Q.defer();
        User.remove({}, function(err) {
            if(err) deferred.reject(err);
                deferred.resolve(true);
        });
        return deferred.promise;
    },
    create: function(name, isadmin) {
        var isadmin = isadmin || false;
        var deferred = Q.defer();
        var user = new User({
            name: name,
            email: name+'@admin.com',
            password: name,
            bio: 'i am ' + name,
            url: '',
            isadmin: isadmin
        });
        user.save(function(err, user) {
            if(err) deferred.reject(err);
                deferred.resolve(user._id);
        });
        return deferred.promise;
    }
};
db.projects = {
    empty: function() {
        var deferred = Q.defer();
        User.remove({}, function(err) {
            if(err) deferred.reject(err);
                deferred.resolve(true);
        });
        return deferred.promise;
    },
    create: function(title) {
        var deferred = Q.defer();
        var project = new Project({
            title: title,
            about: "This is my first rotoscopic project, hope that you like it",
            url: "",
            user: 2,
            status: true,
            date: new Date()
        });
        project.save(function(err, project) {
            if(err) deferred.reject(err);
            deferred.resolve(project._id);
        });
        return deferred.promise;
    }
};
db.frames = {
    empty: function() {
        var deferred = Q.defer();
        Frame.remove({}, function(err) {
            if(err) deferred.reject(err);
                deferred.resolve(true);
        });
        return deferred.promise;
    },
    create: function(number, segments, pid) {
        var deferred = Q.defer();
        var frame = new Frame({
            number: number,
            user: 2,
            project: pid,
            segments: segments
        });
        frame.save(function(err, frame) {
            if(err) deferred.reject(err);
            deferred.resolve(frame._id);
        });
        return deferred.promise;
    }
}
// doing install
console.log('install: started');
db.connect('tingodb://'+__dirname+'/data')
    .then(function(){
        return db.users.count();
    })
    .then(function(number) {
        console.log('install: the database already contains %d users', number);
        if(number > 0) {
            var err = 'install: this is not a fresh install, \n'
                + 'please remove all database content before installing\n'
                + 'if using tingodb, clear db files in the data folder\n'
                + 'if using mongodb, clear the users, projects, frames collections'
            throw err;
        }
    })
    .then(function() {
        db.users.create('admin', true);
    })
    .then(function() {
        db.users.create('gaspard', false)
    })
    .then(function() {
        console.log('install: admin (isadmin) and gaspard are created');
    })
    .then(function() {
        db.projects.empty();
    })
    .then(function() {
        return db.wait();
    })
    .then(function() {
        console.log('install: projects collection is now empty');
    })
    .then(function() {
        return db.projects.create(myFirstProject);
    })
    .then(function(pid) {
        console.log('install: project "%s" created with id %s', myFirstProject, pid);
        f2j(__dirname + '/data/segments.json', function(err, json) {
            // add frames to project pid
            for (var i = 0; i < json.length; i++) {
                var seg = json[i][1].children[0][1].segments;
                console.log('install: frame %d has 1 path and %d segments', i, seg.length);
                db.frames.create(i, seg, pid);
            };
        })
    })
    .then(function() {
        return db.wait();
    })
    .fail(function(err) {
        console.log('install: error', err);
    });
