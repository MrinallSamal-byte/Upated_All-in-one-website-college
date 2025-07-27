const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'profile.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the student name update in profile page
content = content.replace(
  'document.getElementById(\'studentName\').textContent = userName;',
  'document.getElementById(\'studentName\').textContent = userName;\n      // Update all student name references\n      const studentNameElements = document.querySelectorAll(\'#studentName, #profileName, .student-name\');\n      studentNameElements.forEach(element => {\n        if (element) element.textContent = userName;\n      });'
);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed profile page student name display');