const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'dashboard.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Add CSS to fix visibility and positioning
const cssToAdd = `
  <style>
    .welcome-card .text-end p {
      color: #6c757d !important;
      font-weight: 500;
    }
    body.dark-mode .welcome-card .text-end p {
      color: #adb5bd !important;
    }
    .theme-toggle {
      position: fixed !important;
      top: 15px !important;
      right: 70px !important;
      width: 40px !important;
      height: 40px !important;
      border-radius: 50% !important;
      background: #f8f9fa !important;
      border: 1px solid #dee2e6 !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      cursor: pointer !important;
      z-index: 1060 !important;
      transition: all 0.3s ease !important;
    }
    .theme-toggle:hover {
      background: #e9ecef !important;
    }
    body.dark-mode .theme-toggle {
      background: #2d2d2d !important;
      border-color: #444 !important;
      color: #e0e0e0 !important;
    }
    body.dark-mode .theme-toggle:hover {
      background: #3d3d3d !important;
    }
    @media (max-width: 767.98px) {
      .theme-toggle {
        top: 10px !important;
        right: 65px !important;
      }
    }
  </style>`;

// Add CSS before closing head tag
content = content.replace('</head>', cssToAdd + '\n</head>');

// Add class to welcome card for styling
content = content.replace('id="welcomeMessage" class="card', 'id="welcomeMessage" class="card welcome-card');

fs.writeFileSync(filePath, content);
console.log('✅ Fixed dashboard date/time visibility and theme toggle positioning');