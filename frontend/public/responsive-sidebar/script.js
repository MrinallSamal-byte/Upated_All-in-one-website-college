document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggle-btn');
  const sidebar = document.querySelector('.sidebar');
  const navItems = document.querySelectorAll('.nav-item');
  
  // Toggle sidebar
  toggleBtn.addEventListener('click', function() {
    sidebar.classList.toggle('collapsed');
    
    // For mobile devices
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('show');
    }
  });
  
  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 768 && 
        sidebar.classList.contains('show') && 
        !sidebar.contains(e.target) && 
        e.target !== toggleBtn) {
      sidebar.classList.remove('show');
    }
  });
  
  // Handle window resize
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
      sidebar.classList.remove('show');
    }
  });
  
  // Active link functionality
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // Remove active class from all items
      navItems.forEach(i => i.classList.remove('active'));
      
      // Add active class to clicked item
      this.classList.add('active');
      
      // On mobile, close the sidebar after clicking a link
      if (window.innerWidth <= 768) {
        sidebar.classList.remove('show');
      }
    });
  });
});