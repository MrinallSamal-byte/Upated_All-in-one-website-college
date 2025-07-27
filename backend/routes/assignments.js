const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const accessControl = require('../middleware/accessControl');

// Configure storage for assignment uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/assignments';
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

// Get all assignments
router.get('/', async (req, res) => {
  const [rows] = await db.query('SELECT subject, title, deadline, file_path FROM assignments');
  res.json(rows);
});

// Upload assignment (admin only)
router.post('/upload', accessControl({ role: 'admin' }), upload.single('assignmentFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const { subject, title, deadline } = req.body;
  
  try {
    // Save file path to database
    const filePath = `/uploads/assignments/${path.basename(req.file.path)}`;
    await db.query(
      'INSERT INTO assignments (subject, title, deadline, file_path) VALUES (?, ?, ?, ?)',
      [subject, title, deadline, filePath]
    );
    
    res.json({ message: 'Assignment uploaded successfully' });
  } catch (err) {
    console.error('Assignment upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;