// Fallback script to ensure sidebar is loaded
(function() {
  // Wait for DOM to be fully loaded
  window.addEventListener('load', function() {
    // Check if sidebar has content after a short delay
    setTimeout(function() {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar && (!sidebar.innerHTML || sidebar.innerHTML.trim() === '')) {
        console.log('Sidebar appears empty, attempting fallback loading...');
        
        // Determine user type
        const userType = localStorage.getItem('userType') || 'student';
        
        // Try to use the loadSidebarContent function if it exists
        if (typeof loadSidebarContent === 'function') {
          if (loadSidebarContent(userType)) {
            console.log('Sidebar loaded via fallback mechanism');
            
            // Update profile info if possible
            if (typeof updateProfileInfo === 'function') {
              updateProfileInfo();
            }
            
            // Initialize UI if possible
            if (typeof initUI === 'function') {
              initUI();
            }
            
            // Initialize session if possible
            if (typeof initSession === 'function') {
              initSession();
            }
            
            // Force sidebar to be visible on desktop
            if (window.innerWidth >= 768 && sidebar) {
              sidebar.classList.add('show');
            }
            
            // Add event listeners for sidebar toggle
            const sidebarToggle = document.querySelector('.sidebar-toggle');
            if (sidebarToggle && sidebar) {
              sidebarToggle.addEventListener('click', function() {
                sidebar.classList.toggle('show');
              });
            }
          }
        }
      }
    }, 1000); // Check after 1 second
  });
})();