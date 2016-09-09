var mongoose = require('mongoose');

var uristring = process.env.MONGODB_URI || 'mongodb://localhost/DogeBotLocal';
var db = mongoose.connect(uristring);

module.exports = db;