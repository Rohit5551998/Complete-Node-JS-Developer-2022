const express = require('express');

const messagesController = require('../controllers/messages.controllers');

const messageRouter = express.Router();

messageRouter.post('/', messagesController.postMessage);
messageRouter.get('/', messagesController.getMessages);

module.exports = messageRouter;
