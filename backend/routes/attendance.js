const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get student attendance data
router.get('/student/:registerNo', async (req, res) => {
  const { registerNo } = req.params;
  
  try {
    const [attendance] = await db.query(`
      SELECT a.semester, 
             AVG((a.present_days / a.total_days) * 100) as percentage 
      FROM attendance a
      JOIN students s ON a.student_id = s.id
      WHERE s.register_no = ?
      GROUP BY a.semester
      ORDER BY a.semester
    `, [registerNo]);
    
    // Fill missing semesters with 0
    const result = [];
    for (let i = 1; i <= 6; i++) {
      const semData = attendance.find(item => item.semester == i);
      result.push({
        semester: i,
        percentage: semData ? Math.round(semData.percentage) : 0
      });
    }
    
    res.json(result);
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;