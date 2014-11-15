var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var projectSchema = new Schema({
    number: Number,
    title: String,
    about: String,
    url: String,
    user: {
        type: Schema.ObjectId,
        ref: 'users'
    },
    status: Boolean,
    date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('projects', projectSchema);