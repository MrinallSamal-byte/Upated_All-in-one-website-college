const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all notices
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM notices ORDER BY posted_at DESC LIMIT 50'
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching notices:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;