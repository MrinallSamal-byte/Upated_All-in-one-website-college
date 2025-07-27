const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'pages');
const studentPages = [
  'dashboard.htm', 'attendance.htm', 'marks.htm', 'admitcard.htm', 
  'hostelmenu.htm', 'timetable.htm', 'notes.htm', 'events.htm', 
  'clubs.htm', 'profile.htm', 'assignments.htm', 'pyqs.htm', 
  'syllabus.htm', 'documents.htm', 'support.htm', 'notice.htm'
];

studentPages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update CSS to add theme toggle button
    const oldCSS = `.profile-avatar {
          position: fixed;
          top: 15px;
          right: 15px;
          z-index: 1060;
        }`;
    
    const newCSS = `.profile-avatar {
          position: fixed;
          top: 15px;
          right: 15px;
          z-index: 1060;
        }
        .theme-toggle {
          position: fixed;
          top: 15px;
          right: 70px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #f8f9fa;
          border: 1px solid #dee2e6;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 1060;
          transition: all 0.3s ease;
        }
        .theme-toggle:hover {
          background: #e9ecef;
        }`;
    
    content = content.replace(oldCSS, newCSS);
    
    // Add theme toggle button to HTML
    const oldHTML = `// Create profile avatar
      const profileAvatar = document.createElement('div');
      profileAvatar.className = 'profile-avatar';`;
    
    const newHTML = `// Create theme toggle button
      const themeToggle = document.createElement('button');
      themeToggle.className = 'theme-toggle';
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      themeToggle.onclick = function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
      };
      
      // Create profile avatar
      const profileAvatar = document.createElement('div');
      profileAvatar.className = 'profile-avatar';`;
    
    content = content.replace(oldHTML, newHTML);
    
    // Update the insertBefore calls
    const oldInsert = `document.body.insertBefore(sidebar, document.body.firstChild);
      document.body.insertBefore(toggleBtn, document.body.firstChild);
      document.body.insertBefore(profileAvatar, document.body.firstChild);`;
    
    const newInsert = `document.body.insertBefore(sidebar, document.body.firstChild);
      document.body.insertBefore(toggleBtn, document.body.firstChild);
      document.body.insertBefore(themeToggle, document.body.firstChild);
      document.body.insertBefore(profileAvatar, document.body.firstChild);`;
    
    content = content.replace(oldInsert, newInsert);
    
    // Update the content wrapper filter
    const oldFilter = `const elementsToMove = Array.from(document.body.children).filter(child => 
        child !== sidebar && child !== toggleBtn && child !== profileAvatar &&
        child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE'
      );`;
    
    const newFilter = `const elementsToMove = Array.from(document.body.children).filter(child => 
        child !== sidebar && child !== toggleBtn && child !== themeToggle && child !== profileAvatar &&
        child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE'
      );`;
    
    content = content.replace(oldFilter, newFilter);
    
    // Update mobile CSS
    const oldMobileCSS = `.profile-avatar {
            top: 10px;
            right: 10px;
          }`;
    
    const newMobileCSS = `.profile-avatar {
            top: 10px;
            right: 10px;
          }
          .theme-toggle {
            top: 10px;
            right: 65px;
          }`;
    
    content = content.replace(oldMobileCSS, newMobileCSS);
    
    // Add dark mode styles for theme toggle
    const darkModeCSS = `body.dark-mode .dropdown-item:hover {
          background-color: #3d3d3d;
        }`;
    
    const newDarkModeCSS = `body.dark-mode .dropdown-item:hover {
          background-color: #3d3d3d;
        }
        body.dark-mode .theme-toggle {
          background: #2d2d2d;
          border-color: #444;
          color: #e0e0e0;
        }
        body.dark-mode .theme-toggle:hover {
          background: #3d3d3d;
        }`;
    
    content = content.replace(darkModeCSS, newDarkModeCSS);
    
    // Update theme toggle initialization
    const oldInit = `// Apply dark mode if saved
      if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
      }`;
    
    const newInit = `// Apply dark mode if saved
      if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }`;
    
    content = content.replace(oldInit, newInit);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Added theme toggle to ${page}`);
  }
});

console.log('Theme toggle button added to all student pages!');