/**
 * Error handling utilities for ITER College Portal
 */

// Show loading state in a container
function showLoading(elementId, message = 'Loading...') {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Check container type
  if (element.tagName === 'UL' || element.tagName === 'OL') {
    // List container
    element.innerHTML = `
      <li class="list-group-item">
        <div class="d-flex align-items-center">
          <div class="spinner-border spinner-border-sm text-primary me-2" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <span>${message}</span>
        </div>
      </li>
    `;
  } else if (element.tagName === 'TABLE' || element.closest('table')) {
    // Table container
    const tableBody = element.tagName === 'TABLE' ? element.querySelector('tbody') || element : element;
    tableBody.innerHTML = `
      <tr>
        <td colspan="100" class="text-center p-3">
          <div class="d-flex align-items-center justify-content-center">
            <div class="spinner-border spinner-border-sm text-primary me-2" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
            <span>${message}</span>
          </div>
        </td>
      </tr>
    `;
  } else {
    // Default container
    element.innerHTML = `
      <div class="d-flex align-items-center justify-content-center p-3">
        <div class="spinner-border spinner-border-sm text-primary me-2" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <span>${message}</span>
      </div>
    `;
  }
}

// Show error message in a container
function showError(elementId, message = 'An error occurred. Please try again later.') {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Check container type
  if (element.tagName === 'UL' || element.tagName === 'OL') {
    // List container
    element.innerHTML = `
      <li class="list-group-item text-danger">
        <i class="fas fa-exclamation-circle me-2"></i>
        ${message}
      </li>
    `;
  } else if (element.tagName === 'TABLE' || element.closest('table')) {
    // Table container
    const tableBody = element.tagName === 'TABLE' ? element.querySelector('tbody') || element : element;
    tableBody.innerHTML = `
      <tr>
        <td colspan="100" class="text-center text-danger p-3">
          <i class="fas fa-exclamation-circle me-2"></i>
          ${message}
        </td>
      </tr>
    `;
  } else {
    // Default container
    element.innerHTML = `
      <div class="alert alert-danger">
        <i class="fas fa-exclamation-circle me-2"></i>
        ${message}
      </div>
    `;
  }
}

// Show empty state message in a container
function showEmpty(elementId, message = 'No data available.', icon = 'info-circle') {
  const element = document.getElementById(elementId);
  if (!element) return;
  
  // Check container type
  if (element.tagName === 'UL' || element.tagName === 'OL') {
    // List container
    element.innerHTML = `
      <li class="list-group-item text-center p-4">
        <i class="fas fa-${icon} mb-2" style="font-size: 1.5rem;"></i>
        <p class="mb-0">${message}</p>
      </li>
    `;
  } else if (element.tagName === 'TABLE' || element.closest('table')) {
    // Table container
    const tableBody = element.tagName === 'TABLE' ? element.querySelector('tbody') || element : element;
    tableBody.innerHTML = `
      <tr>
        <td colspan="100" class="text-center p-4">
          <i class="fas fa-${icon} mb-2" style="font-size: 1.5rem;"></i>
          <p class="mb-0">${message}</p>
        </td>
      </tr>
    `;
  } else {
    // Default container
    element.innerHTML = `
      <div class="text-center p-4 text-muted">
        <i class="fas fa-${icon} mb-3" style="font-size: 2rem;"></i>
        <p class="mb-0">${message}</p>
      </div>
    `;
  }
}

// Handle fetch errors consistently
function handleFetchError(error, elementId, customMessage = null) {
  console.error('Fetch error:', error);
  showError(elementId, customMessage || 'Unable to connect to the server. Please try again later.');
  
  // Show more detailed error in console for debugging
  if (error.message) {
    console.error('Error details:', error.message);
  }
  
  return false; // Return false to allow for conditional handling
}

// Check if server is online
function checkServerStatus(url = 'http://localhost:5000/api/health') {
  return fetch(url)
    .then(response => response.ok)
    .catch(() => false);
}

// Make these functions available globally
window.showLoading = showLoading;
window.showError = showError;
window.showEmpty = showEmpty;
window.handleFetchError = handleFetchError;
window.checkServerStatus = checkServerStatus;