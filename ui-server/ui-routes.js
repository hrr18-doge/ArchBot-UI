var Message = require('../db/models/message');
var path = require('path');
var q = require('q');

// Promisified database interactions
var findMessage = q.nbind(Message.findOne, Message);
var createMessage = q.nbind(Message.create, Message);
var findAllMessages = q.nbind(Message.find, Message);

module.exports = function(app) {
  app.get('/api/messages/:username', function(req, res){
    findAllMessages({ user: req.params.username })
      .then(function(messages) {
        res.status(200).json(messages);
      })
      .fail(function(err) {
        res.status(500).send(err);
      });
  });

  app.get('/api/messages/', function(req, res) {
    console.log('Retrieving all messages from database.');
    findAllMessages({})
      .then(function(messages) {
        res.status(200).json(messages);
      })
      .fail(function(err) {
        res.status(500).send(err);
      });
  });

  app.post('/api/messages/', function(req, res) {
    // Using separatate variable for timestamp as slack delivers a non-standard timestamp we need to convert.
    var timeStamp;
    var newMessage;
    for (var i = 0; i < req.body.length; i++) {
      timeStamp = req.body[i].ts.split('.');
      newMessage = new Message({
        key: req.body[i].ts,
        user: req.body[i].username || 'anonymous',
        text: req.body[i].text || '',
        channel: req.body[i].channel || '',
        timestamp: new Date(timeStamp[0] * 1000)
      });
      newMessage.save(function(err, data) {
        if(err) {
          console.error(err);
        } else {
          console.log(data);
        }
      });
    }
    res.end();
  });

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../public/views/index.html'));
  });
};
