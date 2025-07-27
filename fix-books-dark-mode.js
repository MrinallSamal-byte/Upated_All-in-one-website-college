const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'notes.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Add dark mode styles for book titles and author text
const oldDarkModeCSS = `body.dark-mode .list-group-item:hover {
          background-color: #2d2d2d;
        }`;

const newDarkModeCSS = `body.dark-mode .list-group-item:hover {
          background-color: #2d2d2d;
        }
        body.dark-mode h1, body.dark-mode h2, body.dark-mode h3, body.dark-mode h4, body.dark-mode h5, body.dark-mode h6 {
          color: #ffffff !important;
        }
        body.dark-mode p, body.dark-mode span, body.dark-mode div {
          color: #e0e0e0 !important;
        }
        body.dark-mode .text-muted {
          color: #adb5bd !important;
        }
        body.dark-mode .card-body h6 {
          color: #ffffff !important;
        }
        body.dark-mode .card-body p {
          color: #adb5bd !important;
        }`;

content = content.replace(oldDarkModeCSS, newDarkModeCSS);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed dark mode visibility for book titles and authors');