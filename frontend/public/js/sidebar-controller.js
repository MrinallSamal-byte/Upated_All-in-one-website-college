// Add this to all student pages to ensure sidebar is properly loaded
document.addEventListener('DOMContentLoaded', function() {
  // Force sidebar to be visible on desktop
  const sidebar = document.querySelector('.sidebar');
  if (window.innerWidth >= 768 && sidebar) {
    sidebar.classList.add('show');
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
});