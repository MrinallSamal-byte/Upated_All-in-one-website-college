const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', authController.login);
router.post('/admin-login', authController.adminLogin);
router.post('/signup', authController.signup);

module.exports = router;