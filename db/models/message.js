var db = require('../config');

var MessageSchema = new db.Schema({
  key: { type: String, index: { unique: true, dropDups: true } },
  user: String,
  text: String,
  channel: String,
  timestamp: String
});
var Message = db.model('Message', MessageSchema);

module.exports = Message;