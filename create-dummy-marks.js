const mysql = require('mysql2/promise');

async function createDummyMarks() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Mrinall@1123',
    database: 'eduscanplus'
  });

  try {
    // Get all students
    const [students] = await connection.execute('SELECT id, register_no FROM students');
    
    // Subjects for each semester
    const subjects = [
      'Mathematics', 'Physics', 'Chemistry', 'Programming', 'English',
      'Data Structures', 'Database Systems', 'Computer Networks', 'Operating Systems'
    ];

    // Insert dummy marks for each student
    for (const student of students) {
      for (let semester = 1; semester <= 6; semester++) {
        for (let i = 0; i < 3; i++) { // 3 subjects per semester
          const subject = subjects[Math.floor(Math.random() * subjects.length)];
          const midTerm = Math.floor(Math.random() * 40) + 60; // 60-100
          const internal = Math.floor(Math.random() * 40) + 60; // 60-100
          
          await connection.execute(`
            INSERT INTO marks (student_id, subject, semester, mid_term, internal, created_at)
            VALUES (?, ?, ?, ?, ?, NOW())
            ON DUPLICATE KEY UPDATE mid_term = VALUES(mid_term), internal = VALUES(internal)
          `, [student.id, subject, semester, midTerm, internal]);
        }
      }
      console.log(`✅ Created marks for student ${student.register_no}`);
    }

    console.log('✅ All dummy marks created successfully!');
  } catch (error) {
    console.error('Error creating dummy marks:', error);
  } finally {
    await connection.end();
  }
}

createDummyMarks();