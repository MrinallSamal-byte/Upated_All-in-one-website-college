// Simple sidebar implementation
(function() {
  // Create sidebar HTML
  const sidebarHTML = `
    <button class="btn btn-primary sidebar-toggle">
      <i class="fas fa-bars"></i>
    </button>
    
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-profile-circle" id="profileCircle">U</div>
        <div class="fw-bold fs-5" id="profileName">User Name</div>
        <div class="text-muted" id="profileRegNo">Register No</div>
      </div>
      
      <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link" href="dashboard.htm"><i class="fas fa-home me-2"></i> Dashboard</a></li>
        
        <!-- Academics -->
        <li class="nav-item"><a class="nav-link" href="attendance.htm"><i class="fas fa-chart-bar me-2"></i> Attendance</a></li>
        <li class="nav-item"><a class="nav-link" href="marks.htm"><i class="fas fa-graduation-cap me-2"></i> Marks</a></li>
        <li class="nav-item"><a class="nav-link" href="timetable.htm"><i class="fas fa-calendar-alt me-2"></i> Timetable</a></li>
        <li class="nav-item"><a class="nav-link" href="notes.htm"><i class="fas fa-book me-2"></i> Notes</a></li>
        <li class="nav-item"><a class="nav-link" href="assignments.htm"><i class="fas fa-tasks me-2"></i> Assignments</a></li>
        <li class="nav-item"><a class="nav-link" href="pyqs.htm"><i class="fas fa-file-alt me-2"></i> PYQs</a></li>
        <li class="nav-item"><a class="nav-link" href="syllabus.htm"><i class="fas fa-list-alt me-2"></i> Syllabus</a></li>
        
        <!-- Campus Services -->
        <li class="nav-item"><a class="nav-link" href="fees.htm"><i class="fas fa-rupee-sign me-2"></i> Pay Fees</a></li>
        <li class="nav-item"><a class="nav-link" href="library.htm"><i class="fas fa-book-reader me-2"></i> Library</a></li>
        <li class="nav-item"><a class="nav-link" href="hostelmenu.htm"><i class="fas fa-utensils me-2"></i> Hostel Menu</a></li>
        <li class="nav-item"><a class="nav-link" href="campus-map.htm"><i class="fas fa-map-marked-alt me-2"></i> Campus Map</a></li>
        
        <!-- Career & Activities -->
        <li class="nav-item"><a class="nav-link" href="career.htm"><i class="fas fa-briefcase me-2"></i> Career Services</a></li>
        <li class="nav-item"><a class="nav-link" href="clubs.htm"><i class="fas fa-users me-2"></i> Clubs</a></li>
        <li class="nav-item"><a class="nav-link" href="events.htm"><i class="fas fa-calendar-day me-2"></i> Events</a></li>
        
        <!-- Personal -->
        <li class="nav-item"><a class="nav-link" href="admitcard.htm"><i class="fas fa-id-card me-2"></i> Admit Card</a></li>
        <li class="nav-item"><a class="nav-link" href="documents.htm"><i class="fas fa-file me-2"></i> Documents</a></li>
        <li class="nav-item"><a class="nav-link" href="notice.htm"><i class="fas fa-bullhorn me-2"></i> Notices</a></li>
        <li class="nav-item"><a class="nav-link" href="profile.htm"><i class="fas fa-user me-2"></i> Profile</a></li>
        <li class="nav-item"><a class="nav-link" href="support.htm"><i class="fas fa-question-circle me-2"></i> Support</a></li>
        <li class="nav-item"><a class="nav-link" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
      </ul>
    </div>
  `;
  
  // Create sidebar styles
  const sidebarStyles = document.createElement('style');
  sidebarStyles.textContent = `
    /* Basic sidebar styles */
    body, html {
      margin: 0;
      padding: 0;
      height: 100%;
    }
    
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 250px;
      height: 100vh;
      background-color: #212529;
      color: white;
      overflow-y: auto;
      z-index: 1000;
    }
    
    .content {
      margin-left: 250px;
      padding: 20px;
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
    }
    
    .sidebar-toggle {
      position: fixed;
      top: 10px;
      left: 10px;
      z-index: 1050;
      display: none;
    }
    
    @media (max-width: 767.98px) {
      .sidebar-toggle {
        display: block;
      }
    }
    
    .sidebar-header {
      padding: 20px;
      text-align: center;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }
    
    .sidebar-profile-circle {
      width: 60px;
      height: 60px;
      background-color: #0d6efd;
      border-radius: 50%;
      margin: 0 auto 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }
    
    .sidebar .nav-link {
      color: white;
      padding: 8px 16px;
    }
    
    .sidebar .nav-link:hover {
      background-color: rgba(255,255,255,0.1);
    }
  `;
  
  // Add styles to head
  document.head.appendChild(sidebarStyles);
  
  // Create sidebar container
  const sidebarContainer = document.createElement('div');
  sidebarContainer.id = 'sidebarContainer';
  sidebarContainer.innerHTML = sidebarHTML;
  
  // Add sidebar to body
  document.body.insertBefore(sidebarContainer, document.body.firstChild);
  
  // Wrap existing content
  const contentDiv = document.createElement('div');
  contentDiv.className = 'content';
  
  // Move all body children except sidebar into content div
  while (document.body.children.length > 1) {
    const child = document.body.children[1];
    if (child !== sidebarContainer && child.tagName !== 'SCRIPT') {
      contentDiv.appendChild(child);
    } else if (child.tagName === 'SCRIPT') {
      document.body.appendChild(child);
    }
  }
  
  // Add content div to body
  document.body.appendChild(contentDiv);
  
  // Initialize sidebar when DOM is loaded
  function initSidebar() {
    // Update user info from localStorage
    const userName = localStorage.getItem('userName') || 'User';
    const registerNo = localStorage.getItem('registerNo') || 'Register No';
    
    const profileName = document.getElementById('profileName');
    const profileCircle = document.getElementById('profileCircle');
    const profileRegNo = document.getElementById('profileRegNo');
    
    if (profileName) profileName.textContent = userName;
    if (profileCircle) profileCircle.textContent = userName.charAt(0).toUpperCase();
    if (profileRegNo) profileRegNo.textContent = registerNo;
    
    // Sidebar toggle for mobile
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
      });
    }
    
    // Show sidebar by default on desktop
    if (window.innerWidth >= 768 && sidebar) {
      sidebar.classList.add('show');
    }
    
    // Logout functionality
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/login.html';
      });
    }
  }
  
  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();