const Forum = require('../models/forum');

exports.getAllForums = async (req, res) => {
  try {
    const forums = await Forum.getAllForums();
    res.json(forums);
  } catch (err) {
    console.error('Error fetching forums:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTopicsByForumId = async (req, res) => {
  try {
    const topics = await Forum.getTopicsByForumId(req.params.forumId);
    res.json(topics);
  } catch (err) {
    console.error('Error fetching topics:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createTopic = async (req, res) => {
  try {
    const { forumId } = req.params;
    const { userId, userType, title } = req.body;
    const newTopicId = await Forum.createTopic(forumId, userId, userType, title);
    res.status(201).json({ message: 'Topic created successfully', topicId: newTopicId });
  } catch (err) {
    console.error('Error creating topic:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getPostsByTopicId = async (req, res) => {
  try {
    const posts = await Forum.getPostsByTopicId(req.params.topicId);
    res.json(posts);
  } catch (err) {
    console.error('Error fetching posts:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { topicId } = req.params;
    const { userId, userType, content } = req.body;
    const newPostId = await Forum.createPost(topicId, userId, userType, content);
    res.status(201).json({ message: 'Post created successfully', postId: newPostId });
  } catch (err) {
    console.error('Error creating post:', err);
    res.status(500).json({ error: 'Server error' });
  }
};