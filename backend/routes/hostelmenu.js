const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
  try {
    const { block, date } = req.query;
    
    let query = 'SELECT menu_date, hostel_block, breakfast, lunch, snacks, dinner FROM hostel_menus';
    let params = [];
    let conditions = [];
    
    if (block) {
      conditions.push('hostel_block = ?');
      params.push(block);
    }
    
    if (date) {
      conditions.push('menu_date = ?');
      params.push(date);
    }
    
    if (conditions.length > 0) {
      query += ' WHERE ' + conditions.join(' AND ');
    }
    
    query += ' ORDER BY menu_date DESC LIMIT 10';
    
    const [rows] = await db.query(query, params);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching hostel menu:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;