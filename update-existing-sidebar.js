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
    
    // Update sidebar CSS
    const oldSidebarCSS = `.sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100vh;
          background-color: #212529;
          color: white;
          overflow-y: auto;
          z-index: 1050;
        }`;

    const newSidebarCSS = `.sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          overflow-y: auto;
          z-index: 1050;
          transition: width 0.3s ease;
          box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }
        .sidebar.collapsed {
          width: 70px;
        }
        .sidebar-header {
          padding: 15px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .toggle-btn {
          background: none;
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          padding: 8px;
          border-radius: 4px;
          transition: background-color 0.3s ease;
        }
        .toggle-btn:hover {
          background-color: rgba(255,255,255,0.1);
        }
        .sidebar .nav-link {
          transition: all 0.3s ease;
          position: relative;
        }
        .sidebar .nav-link:hover {
          transform: translateX(5px);
        }
        .nav-text {
          opacity: 1;
          transition: opacity 0.3s ease;
          margin-left: 10px;
        }
        .sidebar.collapsed .nav-text {
          opacity: 0;
        }
        .sidebar.collapsed .nav-link::after {
          content: attr(data-tooltip);
          position: absolute;
          left: 70px;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0,0,0,0.8);
          color: white;
          padding: 8px 12px;
          border-radius: 4px;
          font-size: 14px;
          white-space: nowrap;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
          z-index: 1001;
        }
        .sidebar.collapsed .nav-link:hover::after {
          opacity: 1;
          visibility: visible;
        }`;

    content = content.replace(oldSidebarCSS, newSidebarCSS);

    // Update content margin
    const oldContentCSS = `.content {
          margin-left: 250px;
          padding: 15px;
        }`;

    const newContentCSS = `.content {
          margin-left: 250px;
          padding: 15px;
          transition: margin-left 0.3s ease;
        }
        .sidebar.collapsed + * .content,
        body:has(.sidebar.collapsed) .content {
          margin-left: 70px;
        }`;

    content = content.replace(oldContentCSS, newContentCSS);

    // Add toggle button to sidebar
    const oldSidebarHTML = `<div class="text-center py-4 border-bottom">
          <div class="bg-primary text-white mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center" style="width:60px;height:60px;font-size:24px;">S</div>
          <div class="fs-5 fw-bold text-white" id="sidebarStudentName">Student</div>
        </div>`;

    const newSidebarHTML = `<div class="sidebar-header">
          <div class="d-flex align-items-center">
            <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center me-2" style="width:40px;height:40px;font-size:18px;">S</div>
            <div class="fs-6 fw-bold text-white nav-text" id="sidebarStudentName">Student</div>
          </div>
          <button class="toggle-btn" id="sidebarToggle">
            <i class="fas fa-bars"></i>
          </button>
        </div>`;

    content = content.replace(oldSidebarHTML, newSidebarHTML);

    // Add data-tooltip attributes to nav links
    content = content.replace(
      '<a class="nav-link text-white" href="dashboard.htm"><i class="fas fa-home me-2"></i> Dashboard</a>',
      '<a class="nav-link text-white" href="dashboard.htm" data-tooltip="Dashboard"><i class="fas fa-home me-2"></i><span class="nav-text">Dashboard</span></a>'
    );
    content = content.replace(
      '<a class="nav-link text-white" href="attendance.htm"><i class="fas fa-chart-bar me-2"></i> Attendance</a>',
      '<a class="nav-link text-white" href="attendance.htm" data-tooltip="Attendance"><i class="fas fa-chart-bar me-2"></i><span class="nav-text">Attendance</span></a>'
    );
    content = content.replace(
      '<a class="nav-link text-white" href="marks.htm"><i class="fas fa-graduation-cap me-2"></i> Marks</a>',
      '<a class="nav-link text-white" href="marks.htm" data-tooltip="Marks"><i class="fas fa-graduation-cap me-2"></i><span class="nav-text">Marks</span></a>'
    );
    content = content.replace(
      '<a class="nav-link text-white" href="admitcard.htm"><i class="fas fa-id-card me-2"></i> Admit Card</a>',
      '<a class="nav-link text-white" href="admitcard.htm" data-tooltip="Admit Card"><i class="fas fa-id-card me-2"></i><span class="nav-text">Admit Card</span></a>'
    );
    content = content.replace(
      '<a class="nav-link text-white" href="hostelmenu.htm"><i class="fas fa-utensils me-2"></i> Hostel Menu</a>',
      '<a class="nav-link text-white" href="hostelmenu.htm" data-tooltip="Hostel Menu"><i class="fas fa-utensils me-2"></i><span class="nav-text">Hostel Menu</span></a>'
    );
    content = content.replace(
      '<a class="nav-link text-white" href="timetable.htm"><i class="fas fa-calendar-alt me-2"></i> Timetable</a>',
      '<a class="nav-link text-white" href="timetable.htm" data-tooltip="Timetable"><i class="fas fa-calendar-alt me-2"></i><span class="nav-text">Timetable</span></a>'
    );
    content = content.replace(
      '<a class="nav-link text-white" href="notes.htm"><i class="fas fa-book me-2"></i> Notes</a>',
      '<a class="nav-link text-white" href="notes.htm" data-tooltip="Notes"><i class="fas fa-book me-2"></i><span class="nav-text">Notes</span></a>'
    );
    content = content.replace(
      '<a class="nav-link text-white" href="events.htm"><i class="fas fa-calendar-day me-2"></i> Events</a>',
      '<a class="nav-link text-white" href="events.htm" data-tooltip="Events"><i class="fas fa-calendar-day me-2"></i><span class="nav-text">Events</span></a>'
    );
    content = content.replace(
      '<a class="nav-link text-white" href="clubs.htm"><i class="fas fa-users me-2"></i> Clubs</a>',
      '<a class="nav-link text-white" href="clubs.htm" data-tooltip="Clubs"><i class="fas fa-users me-2"></i><span class="nav-text">Clubs</span></a>'
    );
    content = content.replace(
      '<a class="nav-link text-white" href="profile.htm"><i class="fas fa-user me-2"></i> Profile</a>',
      '<a class="nav-link text-white" href="profile.htm" data-tooltip="Profile"><i class="fas fa-user me-2"></i><span class="nav-text">Profile</span></a>'
    );

    // Add toggle functionality
    const toggleJS = `
      // Sidebar toggle functionality
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

    // Add the toggle JS before the closing script tag
    content = content.replace('})();', '})();\n' + toggleJS);

    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${page}`);
  }
});

console.log('All pages updated with collapsible sidebar!');