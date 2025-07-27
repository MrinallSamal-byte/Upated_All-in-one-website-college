const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all clubs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM clubs ORDER BY name');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching clubs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;