// Immediately inject the sidebar when loaded
(function() {
  // Create the sidebar HTML
  const sidebarHTML = `
    <button class="sidebar-toggle btn btn-primary d-md-none">
      <i class="fas fa-bars"></i>
    </button>
    
    <div class="sidebar">
      <div class="sidebar-header text-center py-4 border-bottom">
        <div class="sidebar-profile mb-3">
          <div id="sidebarProfileCircle" class="sidebar-profile-circle bg-primary text-white mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center">U</div>
          <div id="sidebarProfileName" class="sidebar-profile-name fs-5 fw-bold text-white">Student</div>
          <div id="sidebarRegNumber" class="text-muted sidebar-reg-number">Register No</div>
        </div>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link text-white" href="dashboard.htm"><i class="fas fa-home me-2"></i> <span>Dashboard</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="attendance.htm"><i class="fas fa-chart-bar me-2"></i> <span>Attendance</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="marks.htm"><i class="fas fa-graduation-cap me-2"></i> <span>Marks</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="fees.htm"><i class="fas fa-rupee-sign me-2"></i> <span>Pay Fees</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="admitcard.htm"><i class="fas fa-id-card me-2"></i> <span>Admit Card</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="hostelmenu.htm"><i class="fas fa-utensils me-2"></i> <span>Hostel Menu</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="timetable.htm"><i class="fas fa-calendar-alt me-2"></i> <span>Timetable</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="notes.htm"><i class="fas fa-book me-2"></i> <span>Notes</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="assignments.htm"><i class="fas fa-tasks me-2"></i> <span>Assignments</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="pyqs.htm"><i class="fas fa-file-alt me-2"></i> <span>PYQs</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="syllabus.htm"><i class="fas fa-list-alt me-2"></i> <span>Syllabus</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="notice.htm"><i class="fas fa-bullhorn me-2"></i> <span>Notices</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="events.htm"><i class="fas fa-calendar-day me-2"></i> <span>Events</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="clubs.htm"><i class="fas fa-users me-2"></i> <span>Clubs</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="clubevents.htm"><i class="fas fa-star me-2"></i> <span>Club Events</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="documents.htm"><i class="fas fa-file me-2"></i> <span>Documents</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="history.htm"><i class="fas fa-history me-2"></i> <span>History</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="profile.htm"><i class="fas fa-user me-2"></i> <span>Profile</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="support.htm"><i class="fas fa-question-circle me-2"></i> <span>Support</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="faculty.htm"><i class="fas fa-users me-2"></i> <span>Faculty</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="calendar.htm"><i class="fas fa-calendar-alt me-2"></i> <span>Academic Calendar</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="forums.htm"><i class="fas fa-comments me-2"></i> <span>Discussion Forums</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="chat.htm"><i class="fas fa-comment-dots me-2"></i> <span>Chat</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#" id="darkModeToggle"><i id="darkModeIcon" class="fas fa-moon me-2"></i> <span id="darkModeText">Dark Mode</span></a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#" id="logoutButton"><i class="fas fa-sign-out-alt me-2"></i> <span>Logout</span></a></li>
      </ul>
    </div>
  `;
  
  // Create the CSS styles
  const sidebarStyles = document.createElement('style');
  sidebarStyles.textContent = `
    body, html {
      margin: 0;
      padding: 0;
      overflow-x: hidden;
    }
    
    .sidebar {
      position: fixed;
      top: 0;
      left: 0;
      width: 250px;
      height: 100vh;
      overflow-y: auto;
      background-color: #212529;
      color: #f8f9fa;
      z-index: 1050;
      padding: 0;
      margin: 0;
      border-right: 1px solid rgba(255,255,255,0.1);
      transform: translateX(0);
      transition: transform 0.3s ease;
    }
    
    .content {
      margin-left: 250px;
      padding: 15px;
      transition: margin-left 0.3s ease;
      position: relative;
    }
    
    .user-profile-icon {
      position: fixed;
      top: 15px;
      right: 15px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #0d6efd;
      cursor: pointer;
      z-index: 1060;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      border: 2px solid white;
    }
    
    .theme-toggle {
      position: fixed;
      top: 15px;
      right: 65px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #f8f9fa;
      color: #212529;
      cursor: pointer;
      z-index: 1060;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      border: 2px solid white;
      font-size: 18px;
      transition: all 0.3s ease;
    }
    
    .user-profile-icon img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    
    .user-dropdown {
      position: fixed;
      top: 60px;
      right: 15px;
      background-color: white;
      border-radius: 4px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.2);
      min-width: 200px;
      z-index: 1060;
      display: none;
    }
    
    .user-dropdown.show {
      display: block;
    }
    
    .user-dropdown-header {
      padding: 10px 15px;
      border-bottom: 1px solid #e9ecef;
      font-weight: bold;
    }
    
    .user-dropdown-item {
      padding: 8px 15px;
      display: block;
      color: #212529;
      text-decoration: none;
      transition: background-color 0.2s;
    }
    
    .user-dropdown-item:hover {
      background-color: #f8f9fa;
      text-decoration: none;
    }
    
    .user-dropdown-divider {
      height: 1px;
      background-color: #e9ecef;
      margin: 0;
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
    
    body.dark-mode .theme-toggle {
      background-color: #333;
      color: #f8f9fa;
      border-color: #555;
    }
    
    body.dark-mode .user-dropdown {
      background-color: #1e1e1e;
      border-color: #333;
    }
    
    body.dark-mode .user-dropdown-header {
      border-color: #333;
    }
    
    body.dark-mode .user-dropdown-item {
      color: #f8f9fa;
    }
    
    body.dark-mode .user-dropdown-item:hover {
      background-color: #2d2d2d;
    }
    
    body.dark-mode .user-dropdown-divider {
      background-color: #333;
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
        display: block;
        position: fixed;
        top: 10px;
        left: 10px;
        z-index: 1060;
      }
    }
    
    @media (min-width: 768px) {
      .sidebar-toggle {
        display: none;
      }
    }
    
    .sidebar-profile-circle {
      width: 60px;
      height: 60px;
      font-size: 24px;
    }
    
    .sidebar .nav-link {
      color: white;
      padding: 8px 16px;
      border-radius: 0;
      margin: 0;
    }
    
    .sidebar .nav-link:hover {
      background-color: rgba(255,255,255,0.1);
    }
    
    .sidebar .nav-item {
      margin: 0;
      padding: 0;
    }
    
    .sidebar .nav {
      padding-left: 0;
      padding-right: 0;
    }
  `;
  
  // Add the styles to the head
  document.head.appendChild(sidebarStyles);
  
  // Create a container for the sidebar
  const sidebarContainer = document.createElement('div');
  sidebarContainer.id = 'sidebarContainer';
  sidebarContainer.innerHTML = sidebarHTML;
  
  // Create user profile icon and dropdown
  const userProfileHTML = `
    <div class="theme-toggle" id="themeToggle">
      <i class="fas fa-sun" id="themeIcon"></i>
    </div>
    <div class="user-profile-icon" id="userProfileIcon">
      <img src="https://ui-avatars.com/api/?name=${localStorage.getItem('userName') || 'User'}&background=random" alt="User">
    </div>
    <div class="user-dropdown" id="userDropdown">
      <div class="user-dropdown-header">${localStorage.getItem('userName') || 'User'}</div>
      <a href="profile.htm" class="user-dropdown-item"><i class="fas fa-user me-2"></i> My Profile</a>
      <a href="settings.htm" class="user-dropdown-item"><i class="fas fa-cog me-2"></i> Settings</a>
      <div class="user-dropdown-divider"></div>
      <a href="#" class="user-dropdown-item" id="userDropdownLogout"><i class="fas fa-sign-out-alt me-2"></i> Logout</a>
    </div>
  `;
  
  const userProfileContainer = document.createElement('div');
  userProfileContainer.id = 'userProfileContainer';
  userProfileContainer.innerHTML = userProfileHTML;
  
  // Add the sidebar to the body
  document.body.insertBefore(sidebarContainer, document.body.firstChild);
  
  // Add the user profile icon to the body
  document.body.insertBefore(userProfileContainer, document.body.firstChild);
  
  // Wrap the existing content
  const contentElements = Array.from(document.body.children).filter(el => el.id !== 'sidebarContainer');
  const contentContainer = document.createElement('div');
  contentContainer.className = 'content';
  
  // Move all content into the container
  contentElements.forEach(el => {
    if (el !== sidebarContainer && el.tagName !== 'SCRIPT') {
      contentContainer.appendChild(el);
    }
  });
  
  // Add the content container to the body
  document.body.appendChild(contentContainer);
  
  // Initialize sidebar functionality when DOM is loaded
  function initSidebar() {
    // Update user info
    const userName = localStorage.getItem('userName') || 'Student';
    const registerNo = localStorage.getItem('registerNo') || '';
    
    const sidebarProfileName = document.getElementById('sidebarProfileName');
    const sidebarProfileCircle = document.getElementById('sidebarProfileCircle');
    const sidebarRegNumber = document.getElementById('sidebarRegNumber');
    
    if (sidebarProfileName) sidebarProfileName.textContent = userName;
    if (sidebarProfileCircle) sidebarProfileCircle.textContent = userName.charAt(0).toUpperCase();
    if (sidebarRegNumber) sidebarRegNumber.textContent = registerNo;
    
    // Mobile sidebar toggle
    const sidebarToggle = document.querySelector('.sidebar-toggle');
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebarToggle && sidebar) {
      sidebarToggle.addEventListener('click', function() {
        sidebar.classList.toggle('show');
      });
    }
    
    // Force sidebar to be visible on desktop
    if (window.innerWidth >= 768 && sidebar) {
      sidebar.classList.add('show');
    }
    
    // User profile dropdown toggle
    const userProfileIcon = document.getElementById('userProfileIcon');
    const userDropdown = document.getElementById('userDropdown');
    
    if (userProfileIcon && userDropdown) {
      userProfileIcon.addEventListener('click', function() {
        userDropdown.classList.toggle('show');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function(e) {
        if (!userProfileIcon.contains(e.target) && !userDropdown.contains(e.target)) {
          userDropdown.classList.remove('show');
        }
      });
    }
    
    // Dropdown logout functionality
    const userDropdownLogout = document.getElementById('userDropdownLogout');
    if (userDropdownLogout) {
      userDropdownLogout.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/login.html';
      });
    }
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    
    // Check if dark mode is enabled in localStorage
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      themeIcon.classList.replace('fa-sun', 'fa-moon');
    }
    
    // Theme toggle click handler
    if (themeToggle && themeIcon) {
      themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
        
        // Update icon
        if (isDarkMode) {
          themeIcon.classList.replace('fa-sun', 'fa-moon');
        } else {
          themeIcon.classList.replace('fa-moon', 'fa-sun');
        }
      });
    }
    
    // Sidebar logout functionality
    const logoutButton = document.getElementById('logoutButton');
    if (logoutButton) {
      logoutButton.addEventListener('click', function(e) {
        e.preventDefault();
        localStorage.clear();
        window.location.href = '/login.html';
      });
    }
    
    // Hide the dark mode toggle in sidebar
    const sidebarDarkModeToggle = document.getElementById('darkModeToggle');
    if (sidebarDarkModeToggle) {
      const parentItem = sidebarDarkModeToggle.closest('.nav-item');
      if (parentItem) {
        parentItem.style.display = 'none';
      }
    }
  }
  
  // Apply dark mode immediately if set in localStorage
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  
  // Initialize when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSidebar);
  } else {
    initSidebar();
  }
})();