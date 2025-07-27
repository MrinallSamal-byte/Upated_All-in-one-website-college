const express = require('express');
const router = express.Router();
const db = require('../config/db');
const accessControl = require('../middleware/accessControl');
const multer = require('multer');
const path = require('path');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/notes/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Get teacher's subjects
router.get('/teacher/subjects/:registerNo', accessControl({ role: 'teacher' }), async (req, res) => {
  try {
    const { registerNo } = req.params;
    
    // Get teacher ID
    const [teacher] = await db.query('SELECT id FROM teachers WHERE register_no = ?', [registerNo]);
    if (!teacher.length) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
    
    // Get teacher's subjects
    const [subjects] = await db.query(
      'SELECT subject, semester, department FROM subject_teachers WHERE teacher_id = ?',
      [teacher[0].id]
    );
    
    res.json(subjects);
  } catch (err) {
    console.error('Error fetching teacher subjects:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get students for a subject
router.get('/students', accessControl({ role: 'teacher' }), async (req, res) => {
  try {
    const { subject, semester, department } = req.query;
    
    if (!subject || !semester || !department) {
      return res.status(400).json({ error: 'Subject, semester, and department are required' });
    }
    
    // Get students in the department and semester
    const [students] = await db.query(
      'SELECT s.id, s.register_no, s.name, m.mid_term, m.internal ' +
      'FROM students s ' +
      'LEFT JOIN marks m ON s.id = m.student_id AND m.subject = ? ' +
      'WHERE s.department = ? AND s.semester = ?',
      [subject, department, semester]
    );
    
    res.json(students);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update marks for a student
router.post('/marks/update', accessControl({ role: 'teacher' }), async (req, res) => {
  try {
    const { studentId, registerNo, subject, semester, midTerm, internal } = req.body;
    
    if (!studentId || !subject || !semester) {
      return res.status(400).json({ error: 'Student ID, subject, and semester are required' });
    }
    
    // Update or insert marks
    await db.query(
      'INSERT INTO marks (student_id, subject, mid_term, internal, semester) ' +
      'VALUES (?, ?, ?, ?, ?) ' +
      'ON DUPLICATE KEY UPDATE mid_term = ?, internal = ?',
      [studentId, subject, midTerm, internal, semester, midTerm, internal]
    );
    
    // Notify student about marks update
    const io = req.app.get('io');
    if (io) {
      io.emit('marksUpdated', { studentId: registerNo });
    }
    
    res.json({ success: true, message: 'Marks updated successfully' });
  } catch (err) {
    console.error('Error updating marks:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Bulk update marks
router.post('/marks/bulk-update', accessControl({ role: 'teacher' }), async (req, res) => {
  try {
    const { marks } = req.body;
    
    if (!marks || !Array.isArray(marks) || marks.length === 0) {
      return res.status(400).json({ error: 'Invalid marks data' });
    }
    
    // Start a transaction
    await db.query('START TRANSACTION');
    
    for (const mark of marks) {
      const { studentId, subject, semester, midTerm, internal } = mark;
      
      // Update or insert marks
      await db.query(
        'INSERT INTO marks (student_id, subject, mid_term, internal, semester) ' +
        'VALUES (?, ?, ?, ?, ?) ' +
        'ON DUPLICATE KEY UPDATE mid_term = ?, internal = ?',
        [studentId, subject, midTerm, internal, semester, midTerm, internal]
      );
    }
    
    // Commit the transaction
    await db.query('COMMIT');
    
    // Notify students about marks update
    const io = req.app.get('io');
    if (io) {
      io.emit('bulkMarksUpdated', { subject: marks[0].subject });
    }
    
    res.json({ success: true, message: `Marks updated for ${marks.length} students` });
  } catch (err) {
    // Rollback on error
    await db.query('ROLLBACK');
    console.error('Error bulk updating marks:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get attendance for a subject
router.get('/attendance', accessControl({ role: 'teacher' }), async (req, res) => {
  try {
    const { subject, semester, department } = req.query;
    
    if (!subject || !semester || !department) {
      return res.status(400).json({ error: 'Subject, semester, and department are required' });
    }
    
    // Get students with attendance data
    const [students] = await db.query(
      'SELECT s.id, s.register_no, s.name, a.present_days, a.total_days ' +
      'FROM students s ' +
      'LEFT JOIN attendance a ON s.id = a.student_id AND a.subject = ? ' +
      'WHERE s.department = ? AND s.semester = ?',
      [subject, department, semester]
    );
    
    res.json(students);
  } catch (err) {
    console.error('Error fetching attendance:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update attendance for a student
router.post('/attendance/update', accessControl({ role: 'teacher' }), async (req, res) => {
  try {
    const { studentId, subject, presentDays, totalDays } = req.body;
    
    if (!studentId || !subject || presentDays === undefined || totalDays === undefined) {
      return res.status(400).json({ error: 'Student ID, subject, present days, and total days are required' });
    }
    
    // Update or insert attendance
    await db.query(
      'INSERT INTO attendance (student_id, subject, present_days, total_days) ' +
      'VALUES (?, ?, ?, ?) ' +
      'ON DUPLICATE KEY UPDATE present_days = ?, total_days = ?',
      [studentId, subject, presentDays, totalDays, presentDays, totalDays]
    );
    
    res.json({ success: true, message: 'Attendance updated successfully' });
  } catch (err) {
    console.error('Error updating attendance:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload notes
router.post('/notes/upload', accessControl({ role: 'teacher' }), upload.single('pdf'), async (req, res) => {
  try {
    const { subject, title, semester } = req.body;
    
    if (!req.file || !subject || !title || !semester) {
      return res.status(400).json({ error: 'File, subject, title, and semester are required' });
    }
    
    // Save note information to database
    await db.query(
      'INSERT INTO notes (subject, title, file_path, semester, uploaded_by) VALUES (?, ?, ?, ?, ?)',
      [subject, title, `/uploads/notes/${path.basename(req.file.path)}`, semester, req.teacher.id]
    );
    
    res.json({ success: true, message: 'Note uploaded successfully' });
  } catch (err) {
    console.error('Error uploading note:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;