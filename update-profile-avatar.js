const fs = require('fs');
const path = require('path');

const updatedSidebarScript = `
    // Embedded sidebar script with profile avatar
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
        .profile-avatar {
          position: fixed;
          top: 15px;
          right: 15px;
          z-index: 1060;
        }
        .avatar-container {
          position: relative;
          width: 40px;
          height: 40px;
          cursor: pointer;
        }
        .avatar-img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: linear-gradient(45deg, #007bff, #0056b3);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 16px;
          border: 3px solid #28a745;
          box-sizing: border-box;
        }
        .avatar-dropdown {
          position: absolute;
          top: 50px;
          right: 0;
          background: white;
          border: 1px solid #ddd;
          border-radius: 8px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          min-width: 150px;
          display: none;
        }
        .avatar-dropdown.show {
          display: block;
        }
        .dropdown-item {
          padding: 10px 15px;
          cursor: pointer;
          border-bottom: 1px solid #f0f0f0;
          color: #333;
          text-decoration: none;
          display: block;
        }
        .dropdown-item:hover {
          background-color: #f8f9fa;
        }
        .dropdown-item:last-child {
          border-bottom: none;
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
          .profile-avatar {
            top: 10px;
            right: 10px;
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
        body.dark-mode .avatar-dropdown {
          background: #2d2d2d;
          border-color: #444;
        }
        body.dark-mode .dropdown-item {
          color: #e0e0e0;
          border-color: #444;
        }
        body.dark-mode .dropdown-item:hover {
          background-color: #3d3d3d;
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
      
      // Create profile avatar
      const profileAvatar = document.createElement('div');
      profileAvatar.className = 'profile-avatar';
      profileAvatar.innerHTML = \`
        <div class="avatar-container">
          <div class="avatar-img" id="avatarImg">S</div>
          <div class="avatar-dropdown" id="avatarDropdown">
            <a href="profile.htm" class="dropdown-item"><i class="fas fa-user me-2"></i>Profile</a>
            <a href="#" class="dropdown-item" onclick="toggleDarkMode()"><i class="fas fa-cog me-2"></i>Settings</a>
            <a href="#" class="dropdown-item" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a>
          </div>
        </div>
      \`;
      
      document.body.insertBefore(sidebar, document.body.firstChild);
      document.body.insertBefore(toggleBtn, document.body.firstChild);
      document.body.insertBefore(profileAvatar, document.body.firstChild);
      
      const content = document.createElement('div');
      content.className = 'content';
      const elementsToMove = Array.from(document.body.children).filter(child => 
        child !== sidebar && child !== toggleBtn && child !== profileAvatar &&
        child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE'
      );
      elementsToMove.forEach(element => content.appendChild(element));
      document.body.appendChild(content);
      
      // Update avatar with user initial
      const userName = localStorage.getItem('userName') || 'Student';
      document.getElementById('avatarImg').textContent = userName.charAt(0).toUpperCase();
      
      // Avatar dropdown functionality
      document.getElementById('avatarImg').onclick = function(e) {
        e.stopPropagation();
        document.getElementById('avatarDropdown').classList.toggle('show');
      };
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function() {
        document.getElementById('avatarDropdown').classList.remove('show');
      });
      
      // Global functions
      window.toggleDarkMode = function() {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
        document.getElementById('avatarDropdown').classList.remove('show');
      };
      
      window.logout = function() {
        localStorage.clear();
        window.location.href = '/login.html';
      };
      
      // Apply dark mode if saved
      if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
      }
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
    
    // Replace existing embedded sidebar script
    content = content.replace(/\/\/ Embedded sidebar script[\s\S]*?\}\)\(\);/g, updatedSidebarScript);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${page} with profile avatar`);
  }
});

console.log('Profile avatar added to all student pages!');