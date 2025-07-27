export function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const content = document.querySelector('.content');
  sidebar.classList.toggle('active');
  content.classList.toggle('sidebar-active');
  localStorage.setItem('sidebarActive', sidebar.classList.contains('active'));
}

export function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  updateDarkModeToggle();
}

export function updateDarkModeToggle() {
  const isDarkMode = localStorage.getItem('darkMode') === 'true';
  const darkModeIcon = document.getElementById('darkModeIcon');
  const darkModeText = document.getElementById('darkModeText');
  if (darkModeIcon) {
    darkModeIcon.textContent = isDarkMode ? '☀️' : '🌙';
  }
  if (darkModeText) {
    darkModeText.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
  }
}

export function initUI() {
  if (localStorage.getItem('sidebarActive') === 'true') {
    toggleSidebar();
  }
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  updateDarkModeToggle();
}