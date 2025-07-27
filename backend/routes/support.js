const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.post('/', async (req, res) => {
  try {
  const { registerNo, message } = req.body;
  const [student] = await db.query('SELECT id FROM students WHERE register_no = ?', [registerNo]);
  if (!student.length) return res.status(404).json({ error: 'Student not found' });
  await db.query('INSERT INTO support_requests (student_id, message) VALUES (?, ?)', [student[0].id, message]);
  res.json({ message: 'Support request submitted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;