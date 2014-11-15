var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var frameSchema = new Schema({
    number: Number,
    user: Number,
    project: Number,
    date: { type: Date, default: Date.now },
    segments: Array
});

module.exports = mongoose.model('frame', frameSchema);