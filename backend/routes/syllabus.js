const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const accessControl = require('../middleware/accessControl');

// Configure storage for syllabus uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/syllabus';
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

// Get all syllabus
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT * FROM syllabus');
  res.json(rows);
});

// Upload syllabus (admin only)
router.post('/upload', accessControl({ role: 'admin' }), upload.single('syllabusFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const { subject } = req.body;
  
  try {
    // Save file path to database
    const filePath = `/uploads/syllabus/${path.basename(req.file.path)}`;
    await db.query(
      'INSERT INTO syllabus (subject, file_path) VALUES (?, ?)',
      [subject, filePath]
    );
    
    res.json({ message: 'Syllabus uploaded successfully' });
  } catch (err) {
    console.error('Syllabus upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;