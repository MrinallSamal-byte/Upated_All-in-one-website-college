const express = require('express');
const router = express.Router();
const db = require('../config/db');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const accessControl = require('../middleware/accessControl');

// Configure storage for notes uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = 'uploads/notes';
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

// Get all notes
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, subject, title, description, file_path, semester FROM notes ORDER BY uploaded_at DESC');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching notes:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get notes by subject
router.get('/subject/:subject', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, subject, title, description, file_path, semester FROM notes WHERE subject = ? ORDER BY uploaded_at DESC', 
      [req.params.subject]);
    res.json(rows);
  } catch (err) {
    console.error('Error fetching notes by subject:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Upload notes (admin or teacher only)
router.post('/upload', accessControl({ role: ['admin', 'teacher'] }), upload.single('pdf'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const { subject, title, description, semester } = req.body;
  const uploadedBy = req.user.id; // Assuming user info is added by auth middleware
  
  try {
    // Save file path to database
    const filePath = `/uploads/notes/${path.basename(req.file.path)}`;
    await db.query(
      'INSERT INTO notes (subject, title, description, file_path, semester, uploaded_by) VALUES (?, ?, ?, ?, ?, ?)',
      [subject, title, description || null, filePath, semester || null, uploadedBy]
    );
    
    res.json({ message: 'Study material uploaded successfully' });
  } catch (err) {
    console.error('Notes upload error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete note (admin only)
router.delete('/:id', accessControl({ role: 'admin' }), async (req, res) => {
  try {
    // Get file path before deleting
    const [rows] = await db.query('SELECT file_path FROM notes WHERE id = ?', [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Note not found' });
    }
    
    // Delete from database
    await db.query('DELETE FROM notes WHERE id = ?', [req.params.id]);
    
    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', '..', rows[0].file_path.substring(1));
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    res.json({ message: 'Note deleted successfully' });
  } catch (err) {
    console.error('Error deleting note:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;