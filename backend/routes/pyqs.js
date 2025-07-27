const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const accessControl = require('../middleware/accessControl');

// Configure storage for PYQ uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/pyqs';
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

// Get all PYQs
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM pyqs ORDER BY year DESC, subject');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching PYQs:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload PYQ (admin only)
router.post('/upload', accessControl({ role: 'admin' }), upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const { subject, year, exam_type } = req.body;
  
  try {
    // Save file path to database
    const filePath = `/uploads/pyqs/${path.basename(req.file.path)}`;
    await db.query(
      'INSERT INTO pyqs (subject, year, exam_type, file_path) VALUES (?, ?, ?, ?)',
      [subject, year, exam_type, filePath]
    );
    
    res.json({ message: 'Previous year question paper uploaded successfully' });
  } catch (err) {
    console.error('PYQ upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete PYQ (admin only)
router.delete('/:id', accessControl({ role: 'admin' }), async (req, res) => {
  try {
    // Get file path before deleting
    const [rows] = await db.query('SELECT file_path FROM pyqs WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'PYQ not found' });
    }
    
    // Delete from database
    await db.query('DELETE FROM pyqs WHERE id = ?', [req.params.id]);
    
    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', '..', rows[0].file_path.substring(1));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    res.json({ message: 'PYQ deleted successfully' });
  } catch (err) {
    console.error('Error deleting PYQ:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;