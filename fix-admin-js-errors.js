const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'admin.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the broken script reference
content = content.replace('<script src="../public/js/admin-sidebar.js"></script>', '');

// Fix the syntax error in the onclick attribute
content = content.replace(
  'const studentsBtn = document.querySelector(\'[onclick="showSection(\'students\')"]\');',
  'const studentsBtn = document.querySelector(\'[onclick="showSection(\\\'students\\\')"]\');'
);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed JavaScript errors in admin dashboard');