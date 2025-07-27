/**
 * Common page header component for ITER portal
 * Adds breadcrumbs, page title, and quick actions
 */

(function() {
  // Check if header already exists
  if (document.querySelector('.page-header-container')) {
    return;
  }
  
  // Get current page name from URL
  const currentPage = window.location.pathname.split('/').pop().replace('.htm', '');
  
  // Define page metadata
  const pageMetadata = {
    'dashboard': { title: 'Dashboard', icon: 'home', parent: null },
    'attendance': { title: 'Attendance', icon: 'chart-bar', parent: 'Academics' },
    'marks': { title: 'Marks', icon: 'graduation-cap', parent: 'Academics' },
    'timetable': { title: 'Timetable', icon: 'calendar-alt', parent: 'Academics' },
    'notes': { title: 'Notes', icon: 'book', parent: 'Academics' },
    'assignments': { title: 'Assignments', icon: 'tasks', parent: 'Academics' },
    'pyqs': { title: 'Previous Year Questions', icon: 'file-alt', parent: 'Academics' },
    'syllabus': { title: 'Syllabus', icon: 'list-alt', parent: 'Academics' },
    'fees': { title: 'Fee Payment', icon: 'rupee-sign', parent: 'Campus Services' },
    'library': { title: 'Library', icon: 'book-reader', parent: 'Campus Services' },
    'hostelmenu': { title: 'Hostel Menu', icon: 'utensils', parent: 'Campus Services' },
    'campus-map': { title: 'Campus Map', icon: 'map-marked-alt', parent: 'Campus Services' },
    'career': { title: 'Career Services', icon: 'briefcase', parent: 'Career & Activities' },
    'clubs': { title: 'Clubs', icon: 'users', parent: 'Career & Activities' },
    'events': { title: 'Events', icon: 'calendar-day', parent: 'Career & Activities' },
    'admitcard': { title: 'Admit Card', icon: 'id-card', parent: 'Personal' },
    'documents': { title: 'Documents', icon: 'file', parent: 'Personal' },
    'notice': { title: 'Notices', icon: 'bullhorn', parent: 'Personal' },
    'profile': { title: 'Profile', icon: 'user', parent: 'Personal' },
    'support': { title: 'Support', icon: 'question-circle', parent: 'Personal' }
  };
  
  // Get metadata for current page
  const metadata = pageMetadata[currentPage] || { title: 'Page', icon: 'file', parent: null };
  
  // Create breadcrumbs HTML
  let breadcrumbsHTML = `
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item"><a href="dashboard.htm">Home</a></li>
  `;
  
  if (metadata.parent) {
    breadcrumbsHTML += `<li class="breadcrumb-item">${metadata.parent}</li>`;
  }
  
  breadcrumbsHTML += `
        <li class="breadcrumb-item active" aria-current="page">${metadata.title}</li>
      </ol>
    </nav>
  `;
  
  // Create header HTML
  const headerHTML = `
    <div class="page-header-container mb-4">
      <div class="d-flex justify-content-between align-items-center border-bottom pb-2">
        <div>
          ${breadcrumbsHTML}
          <div class="d-flex align-items-center mt-2">
            <i class="fas fa-${metadata.icon} fa-2x me-3 text-primary"></i>
            <h2 class="mb-0">${metadata.title}</h2>
          </div>
        </div>
        <div class="d-flex">
          <button class="btn btn-sm btn-outline-primary me-2" id="refreshBtn">
            <i class="fas fa-sync-alt me-1"></i> Refresh
          </button>
          <button class="btn btn-sm btn-outline-secondary" id="helpBtn">
            <i class="fas fa-question-circle me-1"></i> Help
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Find the first heading element to replace
  const firstHeading = document.querySelector('h1, h2, h3, h4, h5, h6');
  
  if (firstHeading) {
    // Create header container
    const headerContainer = document.createElement('div');
    headerContainer.innerHTML = headerHTML;
    
    // Replace the first heading with our header
    const parentElement = firstHeading.parentElement;
    if (parentElement.classList.contains('d-flex') && parentElement.classList.contains('border-bottom')) {
      parentElement.parentElement.replaceChild(headerContainer, parentElement);
    } else {
      firstHeading.parentElement.insertBefore(headerContainer, firstHeading);
      firstHeading.remove();
    }
    
    // Add event listeners
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', function() {
        window.location.reload();
      });
    }
    
    const helpBtn = document.getElementById('helpBtn');
    if (helpBtn) {
      helpBtn.addEventListener('click', function() {
        alert(`Help for ${metadata.title}\n\nThis page allows you to view and manage your ${metadata.title.toLowerCase()}. For more assistance, please contact the support team.`);
      });
    }
  }
})();