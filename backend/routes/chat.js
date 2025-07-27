const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

router.get('/chat/chats/:userId/:userType', chatController.getUserChats);
router.get('/chat/messages/:chatId', chatController.getChatMessages);
router.post('/chats', chatController.createChat);
router.post('/messages', chatController.sendMessage);

module.exports = router;