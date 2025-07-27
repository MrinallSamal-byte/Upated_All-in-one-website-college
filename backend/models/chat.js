const db = require('../config/db');

const Chat = {
  getUserChats: async (userId, userType) => {
    const [rows] = await db.query(
      `SELECT c.* FROM chats c
       JOIN chat_participants cp ON c.id = cp.chat_id
       WHERE cp.user_id = ? AND cp.user_type = ?`,
      [userId, userType]
    );
    return rows;
  },

  getChatMessages: async (chatId) => {
    const [rows] = await db.query(
      'SELECT * FROM messages WHERE chat_id = ? ORDER BY created_at ASC',
      [chatId]
    );
    return rows;
  },

  createChat: async (name, isGroup, participants) => {
    const [result] = await db.query('INSERT INTO chats (name, is_group) VALUES (?, ?)', [name, isGroup]);
    const chatId = result.insertId;

    for (const participant of participants) {
      await db.query('INSERT INTO chat_participants (chat_id, user_id, user_type) VALUES (?, ?, ?)', [
        chatId,
        participant.userId,
        participant.userType,
      ]);
    }
    return chatId;
  },

  sendMessage: async (chatId, senderId, senderType, content) => {
    const [result] = await db.query(
      'INSERT INTO messages (chat_id, sender_id, sender_type, content) VALUES (?, ?, ?, ?)',
      [chatId, senderId, senderType, content]
    );
    return result.insertId;
  },
};

module.exports = Chat;