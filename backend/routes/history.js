const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/student/:registerNo', async (req, res) => {
  try {
  const { registerNo } = req.params;
  const [student] = await db.query('SELECT id FROM students WHERE register_no = ?', [registerNo]);
  if (!student.length) return res.status(404).json([]);
  const studentId = student[0].id;
  const [marks] = await db.query('SELECT semester, subject, mid_term, internal FROM marks WHERE student_id = ?', [studentId]);
  const [attendance] = await db.query('SELECT subject, present_days, total_days FROM attendance WHERE student_id = ?', [studentId]);
  // Merge marks and attendance by semester/subject
  const history = marks.map(m => {
    const att = attendance.find(a => a.subject === m.subject);
    const attendance_percent = att && att.total_days ? ((att.present_days / att.total_days) * 100).toFixed(2) : '0';
    return { ...m, attendance_percent };
  });
  res.json(history);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;