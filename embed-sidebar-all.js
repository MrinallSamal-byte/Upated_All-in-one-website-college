const fs = require('fs');
const path = require('path');

const sidebarScript = `
    // Embedded sidebar script
    (function() {
      if (document.querySelector('.sidebar')) return;
      
      const style = document.createElement('style');
      style.textContent = \`
        .sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 250px;
          height: 100vh;
          background-color: #212529;
          color: white;
          overflow-y: auto;
          z-index: 1050;
        }
        .content {
          margin-left: 250px;
          padding: 15px;
        }
        @media (max-width: 767.98px) {
          .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
          }
          .sidebar.show {
            transform: translateX(0);
          }
          .content {
            margin-left: 0;
          }
          .sidebar-toggle {
            position: fixed;
            top: 10px;
            left: 10px;
            z-index: 1060;
          }
        }
        .sidebar .nav-link {
          color: white;
          padding: 8px 16px;
        }
        .sidebar .nav-link:hover {
          background-color: rgba(255,255,255,0.1);
        }
        body.dark-mode {
          background-color: #121212 !important;
          color: #e0e0e0 !important;
        }
        body.dark-mode .card {
          background-color: #1e1e1e !important;
          border-color: #333 !important;
          color: #e0e0e0 !important;
        }
        body.dark-mode .card-header {
          background-color: #2d2d2d !important;
          color: #ffffff !important;
        }
      \`;
      document.head.appendChild(style);
      
      const sidebar = document.createElement('div');
      sidebar.className = 'sidebar';
      sidebar.innerHTML = \`
        <div class="text-center py-4 border-bottom">
          <div class="bg-primary text-white mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center" style="width:60px;height:60px;font-size:24px;">S</div>
          <div class="fs-5 fw-bold text-white">Student</div>
        </div>
        <ul class="nav flex-column">
          <li class="nav-item"><a class="nav-link text-white" href="dashboard.htm"><i class="fas fa-home me-2"></i> Dashboard</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="attendance.htm"><i class="fas fa-chart-bar me-2"></i> Attendance</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="marks.htm"><i class="fas fa-graduation-cap me-2"></i> Marks</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="admitcard.htm"><i class="fas fa-id-card me-2"></i> Admit Card</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="hostelmenu.htm"><i class="fas fa-utensils me-2"></i> Hostel Menu</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="timetable.htm"><i class="fas fa-calendar-alt me-2"></i> Timetable</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="notes.htm"><i class="fas fa-book me-2"></i> Notes</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="events.htm"><i class="fas fa-calendar-day me-2"></i> Events</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="clubs.htm"><i class="fas fa-users me-2"></i> Clubs</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="profile.htm"><i class="fas fa-user me-2"></i> Profile</a></li>
          <li class="nav-item"><a class="nav-link text-white" href="#" onclick="localStorage.clear(); window.location.href='/login.html';"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
        </ul>
      \`;
      
      const toggleBtn = document.createElement('button');
      toggleBtn.className = 'sidebar-toggle btn btn-primary d-md-none';
      toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
      toggleBtn.onclick = () => sidebar.classList.toggle('show');
      
      document.body.insertBefore(sidebar, document.body.firstChild);
      document.body.insertBefore(toggleBtn, document.body.firstChild);
      
      const content = document.createElement('div');
      content.className = 'content';
      const elementsToMove = Array.from(document.body.children).filter(child => 
        child !== sidebar && child !== toggleBtn && 
        child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE'
      );
      elementsToMove.forEach(element => content.appendChild(element));
      document.body.appendChild(content);
    })();`;

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
    
    // Remove external sidebar script
    content = content.replace(/<script[^>]*sidebar-fix\.js[^>]*><\/script>/g, '');
    
    // Add embedded sidebar script before closing body tag
    if (!content.includes('Embedded sidebar script')) {
      content = content.replace('</body>', `  <script>${sidebarScript}
  </script>
</body>`);
      
      fs.writeFileSync(filePath, content);
      console.log(`✅ Added sidebar to ${page}`);
    } else {
      console.log(`✅ ${page} already has embedded sidebar`);
    }
  }
});

console.log('Sidebar embedded in all student pages!');