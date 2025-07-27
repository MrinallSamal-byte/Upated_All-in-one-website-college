const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'teacher-dashboard.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Add comprehensive dark mode CSS for teacher dashboard
const darkModeCSS = `        body.dark-mode .nav-tabs .nav-link.active {
          background-color: #1e1e1e;
          border-color: #444;
          color: #ffffff;
        }`;

const newDarkModeCSS = `        body.dark-mode .nav-tabs .nav-link.active {
          background-color: #1e1e1e;
          border-color: #444;
          color: #ffffff;
        }
        body.dark-mode .table-striped > tbody > tr:nth-of-type(odd) > td {
          background-color: rgba(255, 255, 255, 0.05) !important;
        }
        body.dark-mode .table-hover > tbody > tr:hover > td {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        body.dark-mode .table-sm th, body.dark-mode .table-sm td {
          color: #e0e0e0 !important;
          border-color: #333 !important;
        }
        body.dark-mode .btn-success, body.dark-mode .btn-primary {
          color: #fff !important;
        }
        body.dark-mode .tab-content {
          background-color: #1e1e1e !important;
        }`;

content = content.replace(darkModeCSS, newDarkModeCSS);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed teacher dashboard students visibility in dark mode');