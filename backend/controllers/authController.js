const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');

const generateToken = (id, userType) => {
  const secret = process.env.JWT_SECRET || 'temporary_secret_replace_in_production';
  return jwt.sign({ id, role: userType }, secret, { expiresIn: '24h' });
};

exports.login = async (req, res) => {
  const { registerNo, password } = req.body;
  
  if (!registerNo || !password) {
    return res.status(400).json({ error: 'Please provide registration number and password' });
  }
  
  try {
    // Admin login
    if (registerNo === 'admin' && password === 'Admin1234') {
      const token = generateToken(1, 'admin');
      return res.json({
        message: 'Admin login successful',
        token,
        userType: 'admin',
        user: { id: 1, name: 'Admin', register_no: 'admin' }
      });
    }

    // Teacher login
    if (registerNo === 'TECH001' && password === 'Teacher1234') {
      const token = generateToken(1, 'teacher');
      return res.json({
        message: 'Teacher login successful',
        token,
        userType: 'teacher',
        user: { id: 1, name: 'Teacher', register_no: 'TECH001' }
      });
    }

    // Student login
    if (registerNo === '24E112R17' && password === 'Mrinall1235') {
      const token = generateToken(1, 'student');
      return res.json({
        message: 'Login successful',
        token,
        userType: 'student',
        student: { id: 1, name: 'Student', register_no: '24E112R17' }
      });
    }

    return res.status(401).json({ error: 'Invalid credentials' });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.adminLogin = async (req, res) => {
  const { username, password } = req.body;
  
  if (username === 'admin' && password === 'Admin1234') {
    const token = generateToken(1, 'admin');
    res.json({ 
      message: 'Admin login successful', 
      token,
      admin: { id: 1, username: 'admin', role: 'admin' }
    });
  } else {
    res.status(401).json({ error: 'Invalid admin credentials' });
  }
};

exports.signup = async (req, res) => {
  const { name, registerNo, email, password, department, userType } = req.body;
  
  if (!name || !registerNo || !email || !password || !department) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    if (userType === 'student' || !userType) {
      // Insert student
      await db.query(
        'INSERT INTO students (register_no, name, email, password, department) VALUES (?, ?, ?, ?, ?)',
        [registerNo, name, email, hashedPassword, department]
      );
      
      const token = generateToken(registerNo, 'student');
      res.status(201).json({
        message: 'Student registered successfully',
        token,
        userType: 'student',
        user: { register_no: registerNo, name, email, department }
      });
    } else if (userType === 'teacher') {
      // Insert teacher
      await db.query(
        'INSERT INTO teachers (register_no, name, email, password, department) VALUES (?, ?, ?, ?, ?)',
        [registerNo, name, email, hashedPassword, department]
      );
      
      const token = generateToken(registerNo, 'teacher');
      res.status(201).json({
        message: 'Teacher registered successfully',
        token,
        userType: 'teacher',
        user: { register_no: registerNo, name, email, department }
      });
    } else {
      res.status(400).json({ error: 'Invalid user type' });
    }
  } catch (err) {
    console.error('Signup error:', err);
    if (err.code === 'ER_DUP_ENTRY') {
      res.status(409).json({ error: 'Registration number already exists' });
    } else {
      res.status(500).json({ error: 'Server error during registration' });
    }
  }
};