const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get student marks data
router.get('/student/:registerNo', async (req, res) => {
  const { registerNo } = req.params;
  
  try {
    const [marks] = await db.query(`
      SELECT m.semester, 
             AVG((m.mid_term + m.internal) / 2) as average 
      FROM marks m
      JOIN students s ON m.student_id = s.id
      WHERE s.register_no = ?
      GROUP BY m.semester
      ORDER BY m.semester
    `, [registerNo]);
    
    // Fill missing semesters with 0
    const result = [];
    for (let i = 1; i <= 6; i++) {
      const semData = marks.find(item => item.semester == i);
      result.push({
        semester: i,
        average: semData ? Math.round(semData.average) : 0
      });
    }
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching marks:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;