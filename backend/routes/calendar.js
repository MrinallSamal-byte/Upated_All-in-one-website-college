const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');

router.get('/', calendarController.getCalendarEvents);

module.exports = router;