const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const accessControl = require('../middleware/accessControl');

// Configure storage for timetable uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/timetables';
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get timetable by department and semester
router.get('/', async (req, res) => {
  const { department, semester } = req.query;
  const [rows] = await db.query('SELECT day, period1, period2, period3, period4, period5, file_path FROM timetable WHERE department = ? AND semester = ?', [department, semester]);
  res.json(rows);
});

// Upload timetable file (admin only)
router.post('/upload', accessControl({ role: 'admin' }), upload.single('timetableFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const { department, semester } = req.body;
  
  try {
    // Save file path to database
    const filePath = `/uploads/timetables/${path.basename(req.file.path)}`;
    
    // Check if timetable already exists for this department and semester
    const [existing] = await db.query(
      'SELECT id FROM timetable WHERE department = ? AND semester = ? LIMIT 1',
      [department, semester]
    );
    
    if (existing.length > 0) {
      // Update existing timetable with file path
      await db.query(
        'UPDATE timetable SET file_path = ? WHERE department = ? AND semester = ?',
        [filePath, department, semester]
      );
    } else {
      // Insert default timetable structure with file path
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      for (const day of days) {
        await db.query(
          'INSERT INTO timetable (department, semester, day, period1, period2, period3, period4, period5, file_path) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
          [department, semester, day, 'TBD', 'TBD', 'TBD', 'TBD', 'TBD', filePath]
        );
      }
    }
    
    res.json({ message: 'Timetable uploaded successfully' });
  } catch (err) {
    console.error('Timetable upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;