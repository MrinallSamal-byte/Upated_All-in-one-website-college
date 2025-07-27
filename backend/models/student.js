const db = require('../config/db');
const bcrypt = require('bcryptjs');

const Student = {
  async findByRegisterNo(register_no) {
    const [rows] = await db.query('SELECT * FROM students WHERE register_no = ?', [register_no]);
    return rows[0];
  },

  async validatePassword(password, hash) {
    return await bcrypt.compare(password, hash);
  },

  createStudent: async ({ name, register_no, department, email, phone, password }) => {
    const hashedPassword = await bcrypt.hash(password, 10);
    const [result] = await db.query(
      'INSERT INTO students (name, register_no, department, email, phone, password) VALUES (?, ?, ?, ?, ?, ?)',
      [name, register_no, department, email, phone, hashedPassword]
    );
    return { id: result.insertId, name, register_no, department, email, phone };
  }
};

module.exports = Student;