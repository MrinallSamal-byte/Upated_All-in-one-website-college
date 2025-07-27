const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
  const [rows] = await db.query(
    'SELECT ce.title, ce.event_date, ce.description, c.name as club_name FROM club_events ce JOIN clubs c ON ce.club_id = c.id'
  );
  res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;