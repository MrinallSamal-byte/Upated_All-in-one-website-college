const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all events
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM events ORDER BY event_date DESC LIMIT 50'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;