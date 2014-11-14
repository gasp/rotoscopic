var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var usersSchema = new Schema({
    name: { type: String, index: { unique: true }},
    email: { type: String, index: { unique: true }},
    password: String,
    bio: String,
    url: String,
    isadmin: Boolean
});

module.exports = mongoose.model('users', usersSchema);