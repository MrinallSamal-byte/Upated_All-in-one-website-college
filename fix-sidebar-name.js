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
    
    // Replace static "Student" text with dynamic name
    content = content.replace(
      '<div class="fs-5 fw-bold text-white">Student</div>',
      '<div class="fs-5 fw-bold text-white" id="sidebarStudentName">Student</div>'
    );
    
    // Add JavaScript to update sidebar name
    const nameUpdateJS = `      // Update sidebar student name
      const sidebarStudentName = document.getElementById('sidebarStudentName');
      if (sidebarStudentName) {
        sidebarStudentName.textContent = userName;
      }`;
    
    // Insert after the existing userName update
    content = content.replace(
      'document.getElementById(\'studentName\').textContent = userName;',
      'document.getElementById(\'studentName\').textContent = userName;\n' + nameUpdateJS
    );
    
    // For pages without studentName element, add after userName declaration
    if (!content.includes('document.getElementById(\'studentName\')')) {
      content = content.replace(
        'const userName = localStorage.getItem(\'userName\') || \'Student\';',
        'const userName = localStorage.getItem(\'userName\') || \'Student\';\n' + nameUpdateJS
      );
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${page}`);
  }
});

console.log('Student name updated in sidebar for all pages!');