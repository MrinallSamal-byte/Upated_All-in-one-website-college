const Chat = require('../models/chat');

exports.getUserChats = async (req, res) => {
  try {
    const { userId, userType } = req.params;
    const chats = await Chat.getUserChats(userId, userType);
    res.json(chats);
  } catch (err) {
    console.error('Error fetching user chats:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getChatMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Chat.getChatMessages(chatId);
    res.json(messages);
  } catch (err) {
    console.error('Error fetching chat messages:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createChat = async (req, res) => {
  try {
    const { name, isGroup, participants } = req.body;
    const chatId = await Chat.createChat(name, isGroup, participants);
    res.status(201).json({ message: 'Chat created successfully', chatId });
  } catch (err) {
    console.error('Error creating chat:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { chatId, senderId, senderType, content } = req.body;
    const messageId = await Chat.sendMessage(chatId, senderId, senderType, content);
    // Emit message via Socket.IO
    req.app.get('io').to(chatId).emit('newMessage', { chatId, senderId, senderType, content, messageId, created_at: new Date() });
    res.status(201).json({ message: 'Message sent successfully', messageId });
  } catch (err) {
    console.error('Error sending message:', err);
    res.status(500).json({ error: 'Server error' });
  }
};