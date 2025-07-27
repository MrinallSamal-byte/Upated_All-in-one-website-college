const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'admin.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Add comprehensive dark mode CSS for tables and forms
const darkModeCSS = `    body.dark-mode .modal-content {
      background-color: #1e1e1e !important;
      color: #e0e0e0 !important;
    }`;

const newDarkModeCSS = `    body.dark-mode .modal-content {
      background-color: #1e1e1e !important;
      color: #e0e0e0 !important;
    }
    body.dark-mode .table-striped > tbody > tr:nth-of-type(odd) > td {
      background-color: rgba(255, 255, 255, 0.05) !important;
    }
    body.dark-mode .table-hover > tbody > tr:hover > td {
      background-color: rgba(255, 255, 255, 0.1) !important;
    }
    body.dark-mode .btn-warning {
      color: #000 !important;
    }
    body.dark-mode .btn-danger {
      color: #fff !important;
    }
    body.dark-mode .input-group-text {
      background-color: #2d2d2d !important;
      border-color: #444 !important;
      color: #e0e0e0 !important;
    }
    body.dark-mode .alert-warning {
      background-color: #664d03 !important;
      border-color: #997404 !important;
      color: #ffecb5 !important;
    }
    body.dark-mode .alert-info {
      background-color: #055160 !important;
      border-color: #087990 !important;
      color: #b6effb !important;
    }`;

content = content.replace(darkModeCSS, newDarkModeCSS);

// Update the loadStudents function to be called on page load
const oldLoadStudents = `// Load students when students section is shown
    document.addEventListener('DOMContentLoaded', function() {
      // Auto-load students when page loads
      loadStudents();
    });`;

const newLoadStudents = `// Load students when page loads and when students section is shown
    document.addEventListener('DOMContentLoaded', function() {
      // Auto-load students when page loads
      loadStudents();
      
      // Also load when students section is shown
      const studentsBtn = document.querySelector('[onclick="showSection(\'students\')"]');
      if (studentsBtn) {
        studentsBtn.addEventListener('click', function() {
          setTimeout(loadStudents, 100);
        });
      }
    });
    
    // Add search on Enter key
    document.addEventListener('DOMContentLoaded', function() {
      const searchInput = document.getElementById('studentSearch');
      if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
          if (e.key === 'Enter') {
            searchStudents();
          }
        });
      }
    });`;

// Replace or add the student loading logic
if (content.includes('// Load students when students section is shown')) {
  content = content.replace(oldLoadStudents, newLoadStudents);
} else {
  // Add the loading logic before the existing loadStudents function
  content = content.replace('async function loadStudents() {', newLoadStudents + '\n\n    async function loadStudents() {');
}

fs.writeFileSync(filePath, content);
console.log('✅ Fixed admin students visibility and auto-loading');