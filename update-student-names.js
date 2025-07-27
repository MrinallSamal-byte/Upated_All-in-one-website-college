const fs = require('fs');
const path = require('path');

const studentPages = [
  'dashboard.htm', 'attendance.htm', 'marks.htm', 'admitcard.htm', 
  'hostelmenu.htm', 'timetable.htm', 'notes.htm', 'events.htm', 
  'clubs.htm', 'profile.htm', 'assignments.htm', 'pyqs.htm', 
  'syllabus.htm', 'documents.htm', 'support.htm', 'notice.htm'
];

const pagesDir = path.join(__dirname, 'frontend', 'pages');

studentPages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace static "Student Name" with dynamic name
    content = content.replace(
      '<h5 id="studentName">Student Name</h5>',
      '<h5 id="studentName">Student Name</h5>'
    );
    
    // Replace welcome messages
    content = content.replace(
      'Welcome, <span id="studentName">Student</span>!',
      'Welcome, <span id="studentName">Student</span>!'
    );
    
    // Add JavaScript to update all student name references
    const nameUpdateJS = `      // Update all student name references
      const studentNameElements = document.querySelectorAll('#studentName, #profileName, .student-name');
      studentNameElements.forEach(element => {
        if (element) element.textContent = userName;
      });`;
    
    // Insert the update code after userName declaration
    if (content.includes('const userName = localStorage.getItem(\'userName\') || \'Student\';')) {
      content = content.replace(
        'const userName = localStorage.getItem(\'userName\') || \'Student\';',
        'const userName = localStorage.getItem(\'userName\') || \'Student\';\n' + nameUpdateJS
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${page}`);
  }
});

console.log('Student names updated across all pages!');