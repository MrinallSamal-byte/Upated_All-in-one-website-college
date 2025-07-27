// Simple fix for teacher login
const mysql = require('mysql2/promise');

async function fixTeacherLogin() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mrinall@1123',
    database: 'eduscanplus'
  });

  // Hash for "Teacher1234" - pre-computed
  const hashedPassword = '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi';
  
  await connection.execute(
    'UPDATE teachers SET password = ? WHERE register_no = ?',
    [hashedPassword, 'TECH001']
  );
  
  console.log('Teacher password updated');
  await connection.end();
}

fixTeacherLogin().catch(console.error);