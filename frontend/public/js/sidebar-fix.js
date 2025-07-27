// Simple sidebar fix - guaranteed to work
(function() {
  'use strict';
  
  function createSidebar() {
    // Check if sidebar already exists
    if (document.querySelector('.sidebar')) return;
    
    // Add CSS first
    const style = document.createElement('style');
    style.textContent = `
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
        transform: translateX(0);
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
      .theme-toggle {
        position: fixed;
        top: 15px;
        right: 15px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        z-index: 1060;
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
    `;
    document.head.appendChild(style);
    
    // Create sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'sidebar';
    sidebar.innerHTML = `
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
    `;
    
    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'sidebar-toggle btn btn-primary d-md-none';
    toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
    toggleBtn.onclick = () => sidebar.classList.toggle('show');
    
    // Create theme toggle
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle btn btn-outline-secondary';
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    themeToggle.onclick = () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDark);
      themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    };
    
    // Add to page
    document.body.insertBefore(sidebar, document.body.firstChild);
    document.body.insertBefore(toggleBtn, document.body.firstChild);
    document.body.insertBefore(themeToggle, document.body.firstChild);
    
    // Wrap content
    const content = document.createElement('div');
    content.className = 'content';
    const elementsToMove = Array.from(document.body.children).filter(child => 
      child !== sidebar && child !== toggleBtn && child !== themeToggle && 
      child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE'
    );
    elementsToMove.forEach(element => content.appendChild(element));
    document.body.appendChild(content);
    
    // Apply dark mode if saved
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark-mode');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
  }
  
  // Run when ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createSidebar);
  } else {
    setTimeout(createSidebar, 100);
  }
})();