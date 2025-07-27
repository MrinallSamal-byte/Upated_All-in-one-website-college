const db = require('../config/db');

const Forum = {
  getAllForums: async () => {
    const [rows] = await db.query('SELECT * FROM forums');
    return rows;
  },

  getTopicsByForumId: async (forumId) => {
    const [rows] = await db.query('SELECT * FROM topics WHERE forum_id = ? ORDER BY created_at DESC', [forumId]);
    return rows;
  },

  createTopic: async (forumId, userId, userType, title) => {
    const [result] = await db.query('INSERT INTO topics (forum_id, user_id, user_type, title) VALUES (?, ?, ?, ?)', [forumId, userId, userType, title]);
    return result.insertId;
  },

  getPostsByTopicId: async (topicId) => {
    const [rows] = await db.query('SELECT * FROM posts WHERE topic_id = ? ORDER BY created_at ASC', [topicId]);
    return rows;
  },

  createPost: async (topicId, userId, userType, content) => {
    const [result] = await db.query('INSERT INTO posts (topic_id, user_id, user_type, content) VALUES (?, ?, ?, ?)', [topicId, userId, userType, content]);
    return result.insertId;
  }
};

module.exports = Forum;