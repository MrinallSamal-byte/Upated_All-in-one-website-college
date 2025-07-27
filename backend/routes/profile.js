const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get student profile data
router.get('/student/:registerNo', async (req, res) => {
  const { registerNo } = req.params;
  
  try {
    const [student] = await db.query('SELECT * FROM students WHERE register_no = ?', [registerNo]);
    
    if (student.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(student[0]);
  } catch (err) {
    console.error('Error fetching student profile:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;