// Admin sidebar fix - runs immediately when loaded
(function() {
  'use strict';
  
  // Prevent multiple executions
  if (window.adminSidebarLoaded) return;
  window.adminSidebarLoaded = true;
  
  function createAdminSidebar() {
    // Check if sidebar already exists
    if (document.querySelector('.sidebar')) return;
    
    // Create sidebar HTML
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
      <div class="sidebar-header text-center py-4 border-bottom">
        <div class="sidebar-profile mb-3">
          <div id="profileCircle" class="bg-danger text-white mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center" style="width:60px;height:60px;font-size:24px;">A</div>
          <div id="profileName" class="fs-5 fw-bold text-white">Admin</div>
          <div id="profileRegNo" class="text-muted">Administrator</div>
        </div>
      </div>
      <ul class="nav flex-column">
        <li class="nav-item"><a class="nav-link text-white" href="admin.htm"><i class="fas fa-tachometer-alt me-2"></i> Dashboard</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="admin-students.htm"><i class="fas fa-users me-2"></i> Students</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="admin-teachers.htm"><i class="fas fa-chalkboard-teacher me-2"></i> Teachers</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="admin-attendance.htm"><i class="fas fa-chart-bar me-2"></i> Attendance</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="admin-marks.htm"><i class="fas fa-graduation-cap me-2"></i> Marks</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="admin-upload.htm"><i class="fas fa-upload me-2"></i> Upload Files</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="admin-notices.htm"><i class="fas fa-bullhorn me-2"></i> Notices</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="admin-events.htm"><i class="fas fa-calendar-day me-2"></i> Events</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="admin-clubs.htm"><i class="fas fa-users me-2"></i> Clubs</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="admin-reports.htm"><i class="fas fa-chart-line me-2"></i> Reports</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="admin-settings.htm"><i class="fas fa-cog me-2"></i> Settings</a></li>
        <li class="nav-item"><a class="nav-link text-white" href="#" id="logoutBtn"><i class="fas fa-sign-out-alt me-2"></i> Logout</a></li>
      </ul>
    `;
    
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle btn btn-danger d-md-none';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    
    // Create theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle btn btn-outline-secondary';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    
    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
      body, html {
        margin: 0;
        padding: 0;
        transition: background-color 0.3s ease, color 0.3s ease;
      }
      .sidebar {
        position: fixed;
        top: 0;
        left: 0;
        width: 250px;
        height: 100vh;
        background-color: #dc3545;
        color: white;
        overflow-y: auto;
        z-index: 1050;
        transform: translateX(0);
      }
      .content {
        margin-left: 250px;
        padding: 15px;
        transition: margin-left 0.3s ease;
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
        transition: background-color 0.2s ease;
      }
      .sidebar .nav-link:hover {
        background-color: rgba(255,255,255,0.1);
      }
      .sidebar .nav-link.active {
        background-color: rgba(255,255,255,0.2);
        color: white;
      }
      .theme-toggle {
        position: fixed;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1060;
        transition: all 0.3s ease;
        background-color: #f8f9fa;
        border: 1px solid #dee2e6;
      }
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
      body.dark-mode .table {
        color: #f8f9fa;
      }
      body.dark-mode .form-control,
      body.dark-mode .form-select {
        background-color: #2d2d2d;
        border-color: #444;
        color: #f8f9fa;
      }
      body.dark-mode .theme-toggle {
        background-color: #2d2d2d;
        border-color: #444;
        color: #f8f9fa;
      }
      
      /* Comprehensive dark mode styles */
      body.dark-mode * {
        color: #f8f9fa !important;
      }
      body.dark-mode .card-body {
        background-color: #1e1e1e !important;
        color: #f8f9fa !important;
      }
      body.dark-mode .table th,
      body.dark-mode .table td {
        color: #f8f9fa !important;
        border-color: #333 !important;
      }
      body.dark-mode .table-striped > tbody > tr:nth-of-type(odd) > td {
        background-color: #2d2d2d !important;
      }
      body.dark-mode .form-control:focus,
      body.dark-mode .form-select:focus {
        background-color: #2d2d2d !important;
        border-color: #0d6efd !important;
        color: #f8f9fa !important;
        box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
      }
      body.dark-mode .btn-primary {
        background-color: #0d6efd !important;
        border-color: #0d6efd !important;
        color: #fff !important;
      }
      body.dark-mode .alert {
        background-color: #2d2d2d !important;
        border-color: #444 !important;
        color: #f8f9fa !important;
      }
      body.dark-mode .modal-content {
        background-color: #1e1e1e !important;
        border-color: #333 !important;
        color: #f8f9fa !important;
      }
      body.dark-mode .modal-header,
      body.dark-mode .modal-footer {
        border-color: #333 !important;
        background-color: #2d2d2d !important;
      }
      body.dark-mode .text-muted {
        color: #adb5bd !important;
      }
      body.dark-mode .input-group-text {
        background-color: #2d2d2d !important;
        border-color: #444 !important;
        color: #f8f9fa !important;
      }
    `;
    document.head.appendChild(style);
    
    // Add elements to body
    document.body.insertBefore(sidebar, document.body.firstChild);
    document.body.insertBefore(toggleBtn, document.body.firstChild);
    document.body.insertBefore(themeToggle, document.body.firstChild);
    
    // Create content wrapper and move existing content
    const content = document.createElement('div');
    content.className = 'content';
    
    const elementsToMove = Array.from(document.body.children).filter(child => 
      child !== sidebar && child !== toggleBtn && child !== themeToggle && 
      child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE'
    );
    
    elementsToMove.forEach(element => content.appendChild(element));
    document.body.appendChild(content);
    
    // Update user info
    const userName = localStorage.getItem('userName') || 'Admin';
    const registerNo = localStorage.getItem('registerNo') || 'Administrator';
    
    const profileName = document.getElementById('profileName');
    const profileCircle = document.getElementById('profileCircle');
    const profileRegNo = document.getElementById('profileRegNo');
    
    if (profileName) profileName.textContent = userName;
    if (profileCircle) profileCircle.textContent = userName.charAt(0).toUpperCase();
    if (profileRegNo) profileRegNo.textContent = registerNo;
    
    // Toggle sidebar on mobile
    toggleBtn.addEventListener('click', function() {
      sidebar.classList.toggle('show');
    });
    
    // Show sidebar by default on desktop
    if (window.innerWidth >= 768) {
      sidebar.classList.add('show');
    }
    
    // Highlight active page
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = sidebar.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === currentPage) {
        link.classList.add('active');
      }
    });
    
    // Theme toggle functionality
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      
      if (isDark) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      }
    });
    
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
  
  // Run immediately or when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createAdminSidebar);
  } else {
    createAdminSidebar();
  }
})();