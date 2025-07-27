const express = require('express');
const router = express.Router();
const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Get all students
router.get('/students', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT id, register_no, name, department, email FROM students ORDER BY name');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching students:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search students by register number or name
router.get('/students/search', async (req, res) => {
  const { q } = req.query;
  
  try {
    const [rows] = await db.query(`
      SELECT id, register_no, name, department, email 
      FROM students 
      WHERE register_no LIKE ? OR name LIKE ? 
      ORDER BY name
    `, [`%${q}%`, `%${q}%`]);
    
    res.json(rows);
  } catch (err) {
    console.error('Error searching students:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single student
router.get('/students/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    const [rows] = await db.query('SELECT id, register_no, name, department, email FROM students WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(rows[0]);
  } catch (err) {
    console.error('Error fetching student:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Update student
router.put('/students/:id', async (req, res) => {
  const { id } = req.params;
  const { name, registerNo, department, email } = req.body;
  
  try {
    await db.query(`
      UPDATE students 
      SET name = ?, register_no = ?, department = ?, email = ? 
      WHERE id = ?
    `, [name, registerNo, department, email, id]);
    
    res.json({ message: 'Student updated successfully' });
  } catch (err) {
    console.error('Error updating student:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Registration number already exists' });
    } else {
      res.status(500).json({ error: 'Server error' });
    }
  }
});

// Delete student
router.delete('/students/:id', async (req, res) => {
  const { id } = req.params;
  
  try {
    await db.query('DELETE FROM students WHERE id = ?', [id]);
    res.json({ message: 'Student deleted successfully' });
  } catch (err) {
    console.error('Error deleting student:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;