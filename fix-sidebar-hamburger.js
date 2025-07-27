const fs = require('fs');
const path = require('path');

const pages = [
  'dashboard.htm', 'attendance.htm', 'marks.htm', 'admitcard.htm', 
  'hostelmenu.htm', 'timetable.htm', 'notes.htm', 'events.htm', 
  'clubs.htm', 'profile.htm', 'admin.htm', 'teacher-dashboard.htm'
];

const pagesDir = path.join(__dirname, 'frontend', 'pages');

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Add CSS for collapsed hamburger menu
    const hamburgerCSS = `        .sidebar.collapsed .nav-text {
          opacity: 0;
        }`;

    const newHamburgerCSS = `        .sidebar.collapsed .nav-text {
          opacity: 0;
        }
        .collapsed-toggle {
          position: absolute;
          top: 15px;
          left: 15px;
          background: rgba(255,255,255,0.1);
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          transition: all 0.3s ease;
          opacity: 0;
          visibility: hidden;
        }
        .sidebar.collapsed .collapsed-toggle {
          opacity: 1;
          visibility: visible;
        }
        .collapsed-toggle:hover {
          background-color: rgba(255,255,255,0.2);
        }`;

    content = content.replace(hamburgerCSS, newHamburgerCSS);

    // Add collapsed hamburger button to sidebar
    const oldSidebarStart = `sidebar.innerHTML = \`
        <div class="sidebar-header">`;

    const newSidebarStart = `sidebar.innerHTML = \`
        <button class="collapsed-toggle" id="collapsedToggle">
          <i class="fas fa-bars"></i>
        </button>
        <div class="sidebar-header">`;

    content = content.replace(oldSidebarStart, newSidebarStart);

    // Update toggle functionality
    const oldToggleJS = `// Sidebar toggle functionality
      document.addEventListener('DOMContentLoaded', function() {
        const sidebar = document.querySelector('.sidebar');
        const toggleBtn = document.getElementById('sidebarToggle');
        
        if (toggleBtn) {
          toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('collapsed');
            localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
          });
        }
        
        // Restore sidebar state
        if (localStorage.getItem('sidebarCollapsed') === 'true') {
          sidebar.classList.add('collapsed');
        }
      });`;

    const newToggleJS = `// Sidebar toggle functionality
      document.addEventListener('DOMContentLoaded', function() {
        const sidebar = document.querySelector('.sidebar');
        const toggleBtn = document.getElementById('sidebarToggle');
        const collapsedToggle = document.getElementById('collapsedToggle');
        
        function toggleSidebar() {
          sidebar.classList.toggle('collapsed');
          localStorage.setItem('sidebarCollapsed', sidebar.classList.contains('collapsed'));
        }
        
        if (toggleBtn) {
          toggleBtn.addEventListener('click', toggleSidebar);
        }
        
        if (collapsedToggle) {
          collapsedToggle.addEventListener('click', toggleSidebar);
        }
        
        // Restore sidebar state
        if (localStorage.getItem('sidebarCollapsed') === 'true') {
          sidebar.classList.add('collapsed');
        }
      });`;

    content = content.replace(oldToggleJS, newToggleJS);

    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${page}`);
  }
});

console.log('Added hamburger menu for collapsed sidebar!');