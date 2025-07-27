// Define functions locally since imports may not work correctly in some environments
function checkLogin(expectedUserType) {
  const registerNo = localStorage.getItem('registerNo');
  const userType = localStorage.getItem('userType');

  if (!registerNo || !userType) {
    window.location.href = '/login.html';
    return false;
  }

  if (expectedUserType && userType !== expectedUserType) {
    window.location.href = '/login.html';
    return false;
  }

  return true;
}

function updateProfileInfo() {
  const userName = localStorage.getItem('userName');
  const registerNo = localStorage.getItem('registerNo');
  const userType = localStorage.getItem('userType');
  const department = localStorage.getItem('department');

  if (userName) {
    const sidebarProfileName = document.getElementById('sidebarProfileName');
    if (sidebarProfileName) {
      sidebarProfileName.textContent = userName;
    }
    const sidebarProfileCircle = document.getElementById('sidebarProfileCircle');
    if (sidebarProfileCircle) {
      const firstInitial = userName.charAt(0).toUpperCase();
      sidebarProfileCircle.textContent = firstInitial;
    }
  }

  if (registerNo) {
    const sidebarRegNumber = document.getElementById('sidebarRegNumber');
    if (sidebarRegNumber) {
      sidebarRegNumber.textContent = registerNo;
    }
  }

  if (userType === 'teacher' && department) {
    const sidebarDepartment = document.getElementById('sidebarDepartment');
    if (sidebarDepartment) {
      sidebarDepartment.textContent = department;
    }
  }
}

function logout() {
  localStorage.clear();
  window.location.href = '/login';
}

function initUI() {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  updateDarkModeToggle();
  
  // Initialize sidebar for responsive behavior
  const sidebar = document.querySelector('.sidebar');
  if (sidebar) {
    if (window.innerWidth >= 768) {
      sidebar.classList.add('show');
    } else {
      sidebar.classList.remove('show');
    }
  }
  
  // Handle sidebar toggle for mobile view
  const sidebarToggle = document.querySelector('.sidebar-toggle');
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });
  }
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth < 768 && 
        sidebar && 
        sidebar.classList.contains('show') && 
        !sidebar.contains(e.target) && 
        e.target !== sidebarToggle) {
      sidebar.classList.remove('show');
    }
  });
  
  // Handle window resize events
  window.addEventListener('resize', () => {
    if (sidebar) {
      if (window.innerWidth >= 768) {
        sidebar.classList.add('show');
      } else {
        sidebar.classList.remove('show');
      }
    }
  });
}

function updateDarkModeToggle() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
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
}

function initSession() {
  const timeLeftElement = document.getElementById('timeLeft');
  if (timeLeftElement) {
    setInterval(() => {
      const lastActivity = parseInt(localStorage.getItem('lastActivity') || Date.now());
      const remainingTime = Math.max(0, 20 * 60 * 1000 - (Date.now() - lastActivity));
      const minutes = Math.floor(remainingTime / 60000);
      const seconds = Math.floor((remainingTime % 60000) / 1000);
      timeLeftElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
  }
  
  document.addEventListener('mousemove', () => {
    localStorage.setItem('lastActivity', Date.now());
  });
  document.addEventListener('keypress', () => {
    localStorage.setItem('lastActivity', Date.now());
  });
  localStorage.setItem('lastActivity', Date.now());
}

// Load sidebar content directly without fetch to avoid path issues
function loadSidebarContent(userType) {
  const sidebar = document.querySelector('.sidebar');
  if (!sidebar) return;
  
  let sidebarContent = '';
  
  if (userType === 'student') {
    sidebarContent = `<div class="sidebar-header text-center py-4 border-bottom">
  <div class="sidebar-profile mb-3">
    <div id="sidebarProfileCircle" class="sidebar-profile-circle bg-primary text-white mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center">U</div>
    <div id="sidebarProfileName" class="sidebar-profile-name fs-5 fw-bold text-white">Student</div>
    <div id="sidebarRegNumber" class="text-muted sidebar-reg-number">Register No</div>
  </div>
  <div class="input-group px-3 mb-2">
    <input type="text" class="form-control form-control-sm" placeholder="Search..." aria-label="Search" id="sidebarSearchInput">
    <button class="btn btn-outline-light btn-sm" type="button"><i class="fas fa-search"></i></button>
  </div>
  <div class="px-3">
    <span class="badge bg-success">Online</span>
    <small class="text-muted ms-2">Session: <span id="timeLeft">20:00</span></small>
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
</ul>`;
  } else if (userType === 'admin') {
    // Admin sidebar content
    sidebarContent = `<div class="sidebar-header text-center py-4 border-bottom">
      <div class="sidebar-profile mb-3">
        <div id="sidebarProfileCircle" class="sidebar-profile-circle bg-danger text-white mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center">A</div>
        <div id="sidebarProfileName" class="sidebar-profile-name fs-5 fw-bold text-white">Admin</div>
        <div id="sidebarRegNumber" class="text-muted sidebar-reg-number">admin</div>
      </div>
    </div>
    <ul class="nav flex-column py-3">
      <li class="nav-item"><a class="nav-link text-white" href="admin.htm"><i class="fas fa-tachometer-alt me-2"></i> <span>Dashboard</span></a></li>
      <li class="nav-item"><a class="nav-link text-white" href="#" id="darkModeToggle"><i id="darkModeIcon" class="fas fa-moon me-2"></i> <span id="darkModeText">Dark Mode</span></a></li>
      <li class="nav-item"><a class="nav-link text-white" href="#" id="logoutButton"><i class="fas fa-sign-out-alt me-2"></i> <span>Logout</span></a></li>
    </ul>`;
  } else if (userType === 'teacher') {
    // Teacher sidebar content
    sidebarContent = `<div class="sidebar-header text-center py-4 border-bottom">
      <div class="sidebar-profile mb-3">
        <div id="sidebarProfileCircle" class="sidebar-profile-circle bg-success text-white mx-auto mb-2 rounded-circle d-flex align-items-center justify-content-center">T</div>
        <div id="sidebarProfileName" class="sidebar-profile-name fs-5 fw-bold text-white">Teacher</div>
        <div id="sidebarRegNumber" class="text-muted sidebar-reg-number">Faculty ID</div>
        <div id="sidebarDepartment" class="text-muted sidebar-department">Department</div>
      </div>
    </div>
    <ul class="nav flex-column py-3">
      <li class="nav-item"><a class="nav-link text-white" href="teacher-dashboard.htm"><i class="fas fa-home me-2"></i> <span>Dashboard</span></a></li>
      <li class="nav-item"><a class="nav-link text-white" href="teacher-attendance.htm"><i class="fas fa-chart-bar me-2"></i> <span>Attendance</span></a></li>
      <li class="nav-item"><a class="nav-link text-white" href="teacher-marks.htm"><i class="fas fa-graduation-cap me-2"></i> <span>Marks</span></a></li>
      <li class="nav-item"><a class="nav-link text-white" href="teacher-notes.htm"><i class="fas fa-book me-2"></i> <span>Notes</span></a></li>
      <li class="nav-item"><a class="nav-link text-white" href="teacher-assignments.htm"><i class="fas fa-tasks me-2"></i> <span>Assignments</span></a></li>
      <li class="nav-item"><a class="nav-link text-white" href="teacher-profile.htm"><i class="fas fa-user me-2"></i> <span>Profile</span></a></li>
      <li class="nav-item"><a class="nav-link text-white" href="#" id="darkModeToggle"><i id="darkModeIcon" class="fas fa-moon me-2"></i> <span id="darkModeText">Dark Mode</span></a></li>
      <li class="nav-item"><a class="nav-link text-white" href="#" id="logoutButton"><i class="fas fa-sign-out-alt me-2"></i> <span>Logout</span></a></li>
    </ul>`;
  }
  
  sidebar.innerHTML = sidebarContent;
  return true;
}

document.addEventListener('DOMContentLoaded', () => {
  const userType = localStorage.getItem('userType');
  let expectedUserType = null;

  if (userType === 'admin') {
    expectedUserType = 'admin';
  } else if (userType === 'teacher') {
    expectedUserType = 'teacher';
  } else {
    expectedUserType = 'student';
  }

  if (checkLogin(expectedUserType)) {
    // Try to load sidebar directly first
    if (loadSidebarContent(userType)) {
      updateProfileInfo();
      initUI();
      initSession();

      // Add logout functionality
      const logoutButton = document.getElementById('logoutButton');
      if (logoutButton) {
        logoutButton.addEventListener('click', (e) => {
          e.preventDefault();
          logout();
        });
      }
      
      // Add dark mode toggle functionality
      const darkModeToggle = document.getElementById('darkModeToggle');
      if (darkModeToggle) {
        darkModeToggle.addEventListener('click', (e) => {
          e.preventDefault();
          document.body.classList.toggle('dark-mode');
          const isDarkMode = document.body.classList.contains('dark-mode');
          localStorage.setItem('darkMode', isDarkMode);
          
          // Update icon and text
          updateDarkModeToggle();
        });
      }
    } else {
      console.error('Failed to load sidebar content directly');
    }
  }
});