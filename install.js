// install
var Q = require('q');
var tingodb = require('tingodb');
var tungus = require('tungus');
var mongoose = require('mongoose');

var User = require('./models/users');
var Project = require('./models/projects');
var Frame = require('./models/frames');

console.log('install: started');

Q.longStackSupport = true;

var db = {
    url: 'trololo',
    connect: function(conn) {
        var deferred = Q.defer();
        mongoose.connect(conn, function (err) {
            if (err) {deferred.reject(err);}
            else {deferred.resolve(true);}
        });
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
        user.save(function(err) {
            if(err) deferred.reject(err);
                deferred.resolve(true);
        });
        return deferred.promise;
    }
};
db.projects = {

}

db.connect('tingodb://'+__dirname+'/data')
    .then(db.users.count)
    .then(function(number) {
        console.log('install: %d users will be deleted', number);
    })
    .then(db.users.create('admin', true))
    .then(db.users.create('gaspard', false))
    .then(function() {
        console.log('install: admin (isadmin) and gaspard are created');
    });
