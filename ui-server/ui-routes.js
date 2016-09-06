var Message = require('../db/models/message');
var path= require('path');
var q = require('q');

var React = require('react');
var ReactDOMServer = require('react-dom/server')
var indexComponent = require('./react/index');

var findMessage = q.nbind(Message.findOne, Message);
var createMessage = q.nbind(Message.create, Message);
var findAllMessages = q.nbind(Message.find, Message);

module.exports = function(app) {
  // other routes
  app.get('/api/messages/', function(req, res) {
    console.log('Retrieving all messages from database.');
    findAllMessages({})
      .then(function(messages) {
        res.json(messages);
      })
      .fail(function(err) {
        res.status(500).send(err);
      });
  });

  app.post('/api/messages/', function(req, res) {
    console.log('Posted message to database.');
    console.log('Request body: ', req.body);
    // double check what format this will be
    var message = req.body;
    // edit the below newMessage as soon as we know what the bot server sends.
    var newMessage = {
      user: message.user,
      text: message.text,
      channel: message.channel,
      timestamp: message.ts
    };
    createMessage(newMessage)
      .then(function(createdMessage) {
        if(createdMessage) {
          res.json(createdMessage);
        }
      })
      .fail(function(err) {
        res.status(500).send(err);
      });
  });

  app.get('*', function(req, res) {
    // converts react/index component to a react component
    var ReactComponent = React.createElement(indexComponent, Object.assign({}, this.props, { more: 'values' }));
    // renders the component to an html string
    staticMarkup = ReactDOMServer.renderToString(ReactComponent);
    // passes the html string into the view as indexComponentMarkup
    res.render(__dirname + '/views/index', { indexComponentMarkup: staticMarkup });
  });
};