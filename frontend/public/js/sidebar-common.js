// Common sidebar functionality for all pages
document.addEventListener('DOMContentLoaded', function() {
  // Create sidebar HTML
  const sidebarHTML = `
    <div class="sidebar-header text-center py-4 border-bottom">
      <div class="sidebar-profile mb-3">
        <div id="sidebarProfileCircle" class="sidebar-profile-circle bg-primary text-white mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center" style="width: 60px; height: 60px; font-size: 24px;">U</div>
        <div id="sidebarProfileName" class="sidebar-profile-name fs-5 fw-bold text-white">Student</div>
        <div id="sidebarRegNumber" class="text-muted sidebar-reg-number">Register No</div>
      </div>
    </div>
    <ul class="nav flex-column py-3">
      <li class="nav-item"><a class="nav-link text-white" href="dashboard.htm"><i class="fas fa-home me-2"></i> <span>Dashboard</span></a></li>
      <li class="nav-item"><a class="nav-link text-white" href="attendance.htm"><i class="fas fa-chart-bar me-2"></i> <span>Attendance</span></a></li>
      <li class="nav-item"><a class="nav-link text-white" href="marks.htm"><i class="fas fa-graduation-cap me-2"></i> <span>Marks</span></a></li>
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
  `;
  
  // Insert sidebar into page
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    sidebar.innerHTML = sidebarHTML;
  }
  
  // Update user info
  const userName = localStorage.getItem('userName') || 'Student';
  const registerNo = localStorage.getItem('registerNo') || '';
  
  const sidebarProfileName = document.getElementById('sidebarProfileName');
  const sidebarProfileCircle = document.getElementById('sidebarProfileCircle');
  const sidebarRegNumber = document.getElementById('sidebarRegNumber');
  
  if (sidebarProfileName && userName) {
    sidebarProfileName.textContent = userName;
  }
  
  if (sidebarProfileCircle && userName) {
    sidebarProfileCircle.textContent = userName.charAt(0).toUpperCase();
  }
  
  if (sidebarRegNumber && registerNo) {
    sidebarRegNumber.textContent = registerNo;
  }
  
  // Handle sidebar toggle for mobile
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function() {
      sidebar.classList.toggle('show');
    });
  }
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth < 768 && 
        sidebar && 
        sidebar.classList.contains('show') && 
        !sidebar.contains(e.target) && 
        e.target !== sidebarToggle) {
      sidebar.classList.remove('show');
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (sidebar) {
      if (window.innerWidth >= 768) {
        sidebar.classList.add('show');
      } else {
        sidebar.classList.remove('show');
      }
    }
  });
  
  // Force sidebar to be visible on desktop
  if (window.innerWidth >= 768 && sidebar) {
    sidebar.classList.add('show');
  }
  
  // Dark mode toggle
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', function(e) {
      e.preventDefault();
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
      
      const darkModeIcon = document.getElementById('darkModeIcon');
      const darkModeText = document.getElementById('darkModeText');
      
      if (darkModeIcon) {
        if (isDarkMode) {
          darkModeIcon.classList.remove('fa-moon');
          darkModeIcon.classList.add('fa-sun');
        } else {
          darkModeIcon.classList.remove('fa-sun');
          darkModeIcon.classList.add('fa-moon');
        }
      }
      
      if (darkModeText) {
        darkModeText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
      }
    });
  }
  
  // Apply dark mode if saved in localStorage
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    const darkModeIcon = document.getElementById('darkModeIcon');
    const darkModeText = document.getElementById('darkModeText');
    
    if (darkModeIcon) {
      darkModeIcon.classList.remove('fa-moon');
      darkModeIcon.classList.add('fa-sun');
    }
    
    if (darkModeText) {
      darkModeText.textContent = 'Light Mode';
    }
  }
  
  // Logout functionality
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function(e) {
      e.preventDefault();
      localStorage.clear();
      window.location.href = '/login.html';
    });
  }
});