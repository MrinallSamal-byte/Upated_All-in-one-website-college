const jwt = require('jsonwebtoken');
const db = require('../config/db');

function accessControl(options = {}) {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized - No token provided' });
      }
      
      const token = authHeader.split(' ')[1];
      
      let decoded;
      try {
        const secret = process.env.JWT_SECRET || 'temporary_secret_replace_in_production';
        decoded = jwt.verify(token, secret);
      } catch (err) {
        return res.status(401).json({ error: 'Unauthorized - Invalid token' });
      }
      
      let user;
      if (decoded.role === 'admin') {
        const [admins] = await db.query('SELECT * FROM admin WHERE id = ?', [decoded.id]);
        user = admins[0];
        if (!user) {
          return res.status(401).json({ error: 'Unauthorized - Admin not found' });
        }
      } else if (decoded.role === 'teacher') {
        const [teachers] = await db.query('SELECT * FROM teachers WHERE id = ?', [decoded.id]);
        user = teachers[0];
        if (!user) {
          return res.status(401).json({ error: 'Unauthorized - Teacher not found' });
        }
      } else {
        const [students] = await db.query('SELECT * FROM students WHERE id = ?', [decoded.id]);
        user = students[0];
        if (!user) {
          return res.status(401).json({ error: 'Unauthorized - Student not found' });
        }
      }
      
      if (options.role) {
        const roles = Array.isArray(options.role) ? options.role : [options.role];
        if (!roles.includes(decoded.role)) {
          return res.status(403).json({ error: 'Forbidden - Insufficient permissions' });
        }
      }
      
      req.user = {
        id: decoded.id,
        role: decoded.role,
        name: user.name || user.username,
        register_no: user.register_no || user.username
      };
      
      next();
    } catch (err) {
      console.error('Access control error:', err);
      res.status(500).json({ error: 'Server error' });
    }
  };
}

module.exports = accessControl;