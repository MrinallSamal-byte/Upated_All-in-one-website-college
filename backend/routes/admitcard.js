const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const accessControl = require('../middleware/accessControl');

// Configure storage for admit card uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Create both backend and frontend upload directories
    const backendDir = path.join(__dirname, '..', 'uploads', 'admitcards');
    const frontendDir = path.join(__dirname, '..', '..', 'frontend', 'public', 'uploads', 'admitcards');
    
    // Ensure both directories exist
    if (!fs.existsSync(backendDir)) {
      fs.mkdirSync(backendDir, { recursive: true });
    }
    if (!fs.existsSync(frontendDir)) {
      fs.mkdirSync(frontendDir, { recursive: true });
    }
    
    cb(null, backendDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Get admit cards for a student
router.get('/student/:registerNo', async (req, res) => {
  const { registerNo } = req.params;
  const [student] = await db.query('SELECT id FROM students WHERE register_no = ?', [registerNo]);
  if (!student.length) return res.status(404).json([]);
  const [rows] = await db.query('SELECT exam_name, file_path FROM admit_cards WHERE student_id = ?', [student[0].id]);
  res.json(rows);
});

// Upload admit card (admin only)
router.post('/upload', accessControl({ role: 'admin' }), upload.single('admitCard'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const { registerNo, examName, examCode } = req.body;
  
  try {
    // Get student ID
    const [student] = await db.query('SELECT id FROM students WHERE register_no = ?', [registerNo]);
    if (!student.length) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Get the filename
    const filename = path.basename(req.file.path);
    
    // Copy the file to the frontend directory
    const frontendPath = path.join(__dirname, '..', '..', 'frontend', 'public', 'uploads', 'admitcards', filename);
    try {
      fs.copyFileSync(req.file.path, frontendPath);
      console.log(`File copied to frontend: ${frontendPath}`);
    } catch (copyErr) {
      console.error('Error copying file to frontend:', copyErr);
      // Continue even if copy fails - we'll serve from backend
    }
    
    // Save file path to database
    const filePath = `/uploads/admitcards/${filename}`;
    await db.query(
      'INSERT INTO admit_cards (student_id, exam_name, exam_code, file_path) VALUES (?, ?, ?, ?)',
      [student[0].id, examName, examCode, filePath]
    );
    
    res.json({ message: 'Admit card uploaded successfully' });
  } catch (err) {
    console.error('Admit card upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;