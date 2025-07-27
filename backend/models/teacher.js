const db = require('../config/db');
const bcrypt = require('bcryptjs');

async function getTeacherByRegisterNo(registerNo) {
  const [rows] = await db.query('SELECT * FROM teachers WHERE register_no = ?', [registerNo]);
  return rows[0];
}

async function validateTeacherPassword(teacher, password) {
  return await bcrypt.compare(password, teacher.password);
}

module.exports = {
  getTeacherByRegisterNo,
  validateTeacherPassword
};