const db = require('../config/db');
const bcrypt = require('bcryptjs');

const Faculty = {
  getAll: async () => {
    const [rows] = await db.query('SELECT name, department, email, phone FROM teachers');
    return rows;
  },

  findByRegisterNo: async (registerNo) => {
    const [rows] = await db.query('SELECT * FROM teachers WHERE register_no = ?', [registerNo]);
    return rows[0];
  },

  createFaculty: async ({ name, register_no, department, email, phone, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO teachers (name, register_no, department, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)',
      [name, register_no, department, email, phone, hashedPassword]
    );
    return { id: result.insertId, name, register_no, department, email, phone };
  },

  validatePassword: async (candidatePassword, hashedPassword) => {
    return bcrypt.compare(candidatePassword, hashedPassword);
  }
};

module.exports = Faculty;