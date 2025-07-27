const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'teacher-dashboard.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Fix dark mode text visibility
const darkModeCSS = `body.dark-mode .theme-toggle:hover {
      background: #3d3d3d;
    }`;

const newDarkModeCSS = `body.dark-mode .theme-toggle:hover {
      background: #3d3d3d;
    }
    body.dark-mode h1, body.dark-mode h2, body.dark-mode h3, body.dark-mode h4, body.dark-mode h5, body.dark-mode h6 {
      color: #ffffff !important;
    }
    body.dark-mode p, body.dark-mode span, body.dark-mode div, body.dark-mode li {
      color: #e0e0e0 !important;
    }
    body.dark-mode .text-muted {
      color: #adb5bd !important;
    }
    body.dark-mode .form-control, body.dark-mode .form-select {
      background-color: #2d2d2d !important;
      border-color: #444 !important;
      color: #e0e0e0 !important;
    }
    body.dark-mode .table {
      color: #e0e0e0 !important;
      background-color: #1e1e1e !important;
    }
    body.dark-mode .table th, body.dark-mode .table td {
      color: #e0e0e0 !important;
      border-color: #333 !important;
    }`;

content = content.replace(darkModeCSS, newDarkModeCSS);

// Update semester options to include 1-8
const oldSemesterOptions = `<option value="6">6th Semester</option>
                  <option value="7">7th Semester</option>
                  <option value="8">8th Semester</option>`;

const newSemesterOptions = `<option value="1">1st Semester</option>
                  <option value="2">2nd Semester</option>
                  <option value="3">3rd Semester</option>
                  <option value="4">4th Semester</option>
                  <option value="5">5th Semester</option>
                  <option value="6">6th Semester</option>
                  <option value="7">7th Semester</option>
                  <option value="8">8th Semester</option>`;

// Replace all occurrences of semester options
content = content.replace(new RegExp(oldSemesterOptions.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), newSemesterOptions);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed dark mode visibility and updated semester options');