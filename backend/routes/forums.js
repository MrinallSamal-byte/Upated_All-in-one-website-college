const express = require('express');
const router = express.Router();
const forumController = require('../controllers/forumController');

router.get('/', forumController.getAllForums);
router.get('/forum/:forumId/topics', forumController.getTopicsByForumId);
router.post('/forum/:forumId/topics', forumController.createTopic);
router.get('/forum/topics/:topicId/posts', forumController.getPostsByTopicId);
router.post('/forum/topics/:topicId/posts', forumController.createPost);

module.exports = router;