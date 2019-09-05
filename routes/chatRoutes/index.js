var express = require('express');
var app = express.Router();

var ChatController = require('../../controllers/chat/chatController');
var Auth = require('../../middlewares/Authentication');

// View messages to and from authenticated user
app.get('/', Auth.checkToken, ChatController.getConversations);

// Retrieve single conversation
app.get('/:conversationId', Auth.checkToken, ChatController.getConversation);

// Send reply in conversation
app.post('/:conversationId', Auth.checkToken, ChatController.sendReply);

// delete conversation
app.delete('/:conversationId', Auth.checkToken, ChatController.deleteConversation);

// Start new conversation
app.post('/new/:recipientId', Auth.checkToken, ChatController.newConversation);

module.exports = app;
