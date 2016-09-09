// Currently not used

var db = require('../config');
var Message = require('../models/message');
var Messages = new db.Collection();

Message.model = Message;
module.exports = Messages;
