// Direct sidebar implementation - no HTML tags, pure JavaScript
(function() {
  // Check if sidebar already exists to prevent duplicates
  if (document.querySelector('.sidebar')) {
    return;
  }
  
  // Create sidebar HTML as a string
  const sidebarHTML = `
    <button class="sidebar-toggle btn btn-primary d-md-none">
      <i class="fas fa-bars"></i>
    </button>
    
    <div class="sidebar">
      <div class="sidebar-header text-center py-4 border-bottom">
        <div class="sidebar-profile mb-3">
          <div id="profileCircle" class="bg-primary text-white mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center" style="width:60px;height:60px;font-size:24px;">U</div>
          <div id="profileName" class="fs-5 fw-bold text-white">Student</div>
          <div id="profileRegNo" class="text-muted">Register No</div>
        </div>
        <div class="d-flex justify-content-center gap-2 mt-2">
          <button id="notificationBtn" class="btn btn-sm btn-outline-light position-relative">
            <i class="fas fa-bell"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger notification-badge">3</span>
          </button>
          <button id="themeToggleBtn" class="btn btn-sm btn-outline-light">
            <i class="fas fa-moon"></i>
          </button>
        </div>
      </div>
      
      <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link text-white" href="dashboard.htm"><i class="fas fa-home me-2"></i> Dashboard</a></li>
        
        <!-- Academics -->
        <li class="nav-item"><a class="nav-link text-white" href="attendance.htm"><i class="fas fa-chart-bar me-2"></i> Attendance</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="marks.htm"><i class="fas fa-graduation-cap me-2"></i> Marks</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="timetable.htm"><i class="fas fa-calendar-alt me-2"></i> Timetable</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="notes.htm"><i class="fas fa-book me-2"></i> Notes</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="assignments.htm"><i class="fas fa-tasks me-2"></i> Assignments</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="pyqs.htm"><i class="fas fa-file-alt me-2"></i> PYQs</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="syllabus.htm"><i class="fas fa-list-alt me-2"></i> Syllabus</a></li>
        
        <!-- Campus Services -->
        <li class="nav-item"><a class="nav-link text-white" href="fees.htm"><i class="fas fa-rupee-sign me-2"></i> Pay Fees</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="library.htm"><i class="fas fa-book-reader me-2"></i> Library</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="hostelmenu.htm"><i class="fas fa-utensils me-2"></i> Hostel Menu</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="campus-map.htm"><i class="fas fa-map-marked-alt me-2"></i> Campus Map</a></li>
        
        <!-- Career & Activities -->
        <li class="nav-item"><a class="nav-link text-white" href="career.htm"><i class="fas fa-briefcase me-2"></i> Career Services</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="clubs.htm"><i class="fas fa-users me-2"></i> Clubs</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="events.htm"><i class="fas fa-calendar-day me-2"></i> Events</a></li>
        
        <!-- Personal -->
        <li class="nav-item"><a class="nav-link text-white" href="admitcard.htm"><i class="fas fa-id-card me-2"></i> Admit Card</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="documents.htm"><i class="fas fa-file me-2"></i> Documents</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="notice.htm"><i class="fas fa-bullhorn me-2"></i> Notices</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="student-calendar.htm"><i class="fas fa-calendar me-2"></i> My Calendar</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="profile.htm"><i class="fas fa-user me-2"></i> Profile</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="support.htm"><i class="fas fa-question-circle me-2"></i> Support</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
      </ul>
    </div>
  `;
  
  // Create and add CSS
  const style = document.createElement('style');
  style.textContent = `
    body, html {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
      transition: background-color 0.3s ease, color 0.3s ease;
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
      z-index: 1050;
      transition: all 0.3s ease;
    }
    
    .content {
      margin-left: 250px;
      padding: 15px;
      transition: margin-left 0.3s ease;
    }
    
    @media (max-width: 767.98px) {
      .sidebar {
        transform: translateX(-100%);
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
      transition: background-color 0.2s ease;
    }
    
    .sidebar .nav-link:hover {
      background-color: rgba(255,255,255,0.1);
    }
    
    .notification-dropdown {
      position: absolute;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      width: 220px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      display: none;
      z-index: 1060;
    }
    
    .notification-dropdown.show {
      display: block;
    }
    
    .notification-header {
      padding: 10px;
      border-bottom: 1px solid #e9ecef;
      font-weight: bold;
      color: #212529;
    }
    
    .notification-item {
      padding: 10px;
      border-bottom: 1px solid #e9ecef;
      color: #212529;
    }
    
    .notification-item:last-child {
      border-bottom: none;
    }
    
    .notification-item.unread {
      background-color: #f8f9fa;
    }
    
    .notification-item .notification-time {
      font-size: 0.8rem;
      color: #6c757d;
    }
    
    /* Dark mode styles */
    body.dark-mode {
      background-color: #121212;
      color: #f8f9fa;
    }
    
    body.dark-mode .card {
      background-color: #1e1e1e;
      border-color: #333;
    }
    
    body.dark-mode .card-header {
      background-color: #2d2d2d;
      border-color: #333;
    }
    
    body.dark-mode .list-group-item {
      background-color: #1e1e1e;
      border-color: #333;
      color: #f8f9fa;
    }
    
    body.dark-mode .text-muted {
      color: #adb5bd !important;
    }
    
    body.dark-mode .table {
      color: #f8f9fa;
    }
    
    body.dark-mode .table-striped > tbody > tr:nth-of-type(odd) > * {
      color: #f8f9fa;
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    body.dark-mode .form-control,
    body.dark-mode .form-select {
      background-color: #2d2d2d;
      border-color: #444;
      color: #f8f9fa;
    }
    
    body.dark-mode .notification-dropdown {
      background-color: #1e1e1e;
      border-color: #333;
    }
    
    body.dark-mode .notification-header {
      color: #f8f9fa;
      border-color: #333;
    }
    
    body.dark-mode .notification-item {
      color: #f8f9fa;
      border-color: #333;
    }
    
    body.dark-mode .notification-item.unread {
      background-color: #2d2d2d;
    }
  `;
  document.head.appendChild(style);
  
  // Create sidebar container
  const sidebarContainer = document.createElement('div');
  sidebarContainer.innerHTML = sidebarHTML;
  document.body.insertBefore(sidebarContainer, document.body.firstChild);
  
  // Create notification dropdown
  const notificationDropdown = document.createElement('div');
  notificationDropdown.className = 'notification-dropdown';
  notificationDropdown.innerHTML = `
    <div class="notification-header">Notifications</div>
    <div class="notification-item unread">
      <div>New assignment uploaded</div>
      <div class="notification-time">2 hours ago</div>
    </div>
    <div class="notification-item unread">
      <div>Exam schedule updated</div>
      <div class="notification-time">Yesterday</div>
    </div>
    <div class="notification-item unread">
      <div>Fee payment reminder</div>
      <div class="notification-time">2 days ago</div>
    </div>
  `;
  document.querySelector('.sidebar').appendChild(notificationDropdown);
  
  // Create content container
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content';
  
  // Move all body children except sidebar into content container
  while (document.body.children.length > 1) {
    const child = document.body.children[1];
    if (child !== sidebarContainer && child.tagName !== 'SCRIPT') {
      contentContainer.appendChild(child);
    } else if (child.tagName === 'SCRIPT') {
      document.body.appendChild(child);
    }
  }
  
  // Add content container to body
  document.body.appendChild(contentContainer);
  
  // Update user info
  const userName = localStorage.getItem('userName') || 'Student';
  const registerNo = localStorage.getItem('registerNo') || '';
  
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
  
  // Notification functionality
  const notificationBtn = document.getElementById('notificationBtn');
  const notificationDropdownElem = document.querySelector('.notification-dropdown');
  
  if (notificationBtn && notificationDropdownElem) {
    notificationBtn.addEventListener('click', function() {
      notificationDropdownElem.classList.toggle('show');
    });
    
    // Close notifications when clicking outside
    document.addEventListener('click', function(e) {
      if (!notificationBtn.contains(e.target) && !notificationDropdownElem.contains(e.target)) {
        notificationDropdownElem.classList.remove('show');
      }
    });
  }
  
  // Theme toggle functionality
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
  
  // Check if dark mode is enabled in localStorage
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  if (isDarkMode) {
    document.body.classList.add('dark-mode');
    if (themeIcon) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    }
  }
  
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
      
      if (themeIcon) {
        if (isDarkMode) {
          themeIcon.classList.remove('fa-moon');
          themeIcon.classList.add('fa-sun');
        } else {
          themeIcon.classList.remove('fa-sun');
          themeIcon.classList.add('fa-moon');
        }
      }
    });
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
})();