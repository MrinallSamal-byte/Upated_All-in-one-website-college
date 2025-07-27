const bcrypt = require('bcryptjs');

async function hashPassword() {
  const hash = await bcrypt.hash('Teacher1234', 10);
  console.log('Hashed password:', hash);
  
  // Insert into database
  const db = require('./backend/config/db');
  try {
    await db.query(
      'INSERT INTO teachers (register_no, name, department, email, password) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE password = ?',
      ['TECH001', 'Teacher', 'CSE', 'teacher@iter.edu', hash, hash]
    );
    console.log('Teacher added successfully');
  } catch (err) {
    console.error('Error:', err);
  }
  process.exit(0);
}

hashPassword();