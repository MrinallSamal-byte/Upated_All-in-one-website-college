const fs = require('fs');
const path = require('path');

const pages = ['events.htm', 'clubs.htm'];
const pagesDir = path.join(__dirname, 'frontend', 'pages');

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add comprehensive dark mode CSS
    const darkModeCSS = `body.dark-mode .dropdown-item:hover {
          background-color: #3d3d3d;
        }`;
    
    const newDarkModeCSS = `body.dark-mode .dropdown-item:hover {
          background-color: #3d3d3d;
        }
        body.dark-mode h1, body.dark-mode h2, body.dark-mode h3, body.dark-mode h4, body.dark-mode h5, body.dark-mode h6 {
          color: #ffffff !important;
        }
        body.dark-mode p, body.dark-mode span, body.dark-mode div, body.dark-mode li, body.dark-mode small {
          color: #e0e0e0 !important;
        }
        body.dark-mode .text-muted {
          color: #adb5bd !important;
        }
        body.dark-mode .card-text {
          color: #e0e0e0 !important;
        }
        body.dark-mode .badge {
          color: #fff !important;
        }
        body.dark-mode .event-date, body.dark-mode .event-location, body.dark-mode .event-contact {
          color: #adb5bd !important;
        }`;
    
    content = content.replace(darkModeCSS, newDarkModeCSS);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed dark mode for ${page}`);
  }
});

console.log('Dark mode visibility fixed for events and clubs pages!');