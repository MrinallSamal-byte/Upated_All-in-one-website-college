const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const accessControl = require('../middleware/accessControl');

// Configure storage for document uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/documents';
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
const backendDir = path.join(__dirname, '..', 'uploads', 'documents');
const frontendDir = path.join(__dirname, '..', '..', 'frontend', 'public', 'uploads', 'documents');

// Get documents for a student
router.get('/student/:registerNo', async (req, res) => {
  const { registerNo } = req.params;
  const [student] = await db.query('SELECT id FROM students WHERE register_no = ?', [registerNo]);
  if (!student.length) return res.status(404).json([]);
  const [rows] = await db.query('SELECT doc_type, file_path FROM documents WHERE student_id = ?', [student[0].id]);
  res.json(rows);
});

// Upload document for a student (admin only)
router.post('/upload', accessControl({ role: 'admin' }), upload.single('documentFile'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const { registerNo, docType } = req.body;
  
  try {
    // Get student ID
    const [student] = await db.query('SELECT id FROM students WHERE register_no = ?', [registerNo]);
    if (!student.length) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Save file to backend directory
    const filePath = `/uploads/documents/${path.basename(req.file.path)}`;
    await db.query(
      'INSERT INTO documents (student_id, doc_type, file_path) VALUES (?, ?, ?)',
      [student[0].id, docType, filePath]
    );

    // Copy file to frontend directory
    fs.copyFileSync(req.file.path, path.join(frontendDir, path.basename(req.file.path)));
    res.json({ message: 'Document uploaded successfully' });
  } catch (err) {
    console.error('Document upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;