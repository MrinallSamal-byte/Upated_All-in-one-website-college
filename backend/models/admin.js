const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = {
  async findByUsername(username) {
    const [rows] = await db.query('SELECT * FROM admin WHERE username = ?', [username]);
    return rows[0];
  },
  
  async findById(id) {
    const [rows] = await db.query('SELECT * FROM admin WHERE id = ?', [id]);
    return rows[0];
  },
  
  async findByToken(token) {
    try {
      const secret = process.env.JWT_SECRET || 'temporary_secret_replace_in_production';
      const decoded = jwt.verify(token, secret);
      
      if (decoded.role !== 'admin') {
        return null;
      }
      
      return await this.findById(decoded.id);
    } catch (err) {
      return null;
    }
  },

  async validatePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  }
};

module.exports = Admin;