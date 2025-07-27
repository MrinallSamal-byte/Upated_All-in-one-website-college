export function logout() {
  localStorage.clear();
  window.location.href = '/login';
}

export function checkLogin(expectedUserType) {
  const registerNo = localStorage.getItem('registerNo');
  const userType = localStorage.getItem('userType');

  if (!registerNo || !userType) {
    window.location.href = '/login.html';
    return false;
  }

  if (expectedUserType && userType !== expectedUserType) {
    // Redirect to appropriate dashboard if userType doesn't match expectedUserType
    // Redirect to welcome page, which then redirects to the appropriate dashboard
    window.location.href = '/login.html';
    return false;
  }

  return true;
}

export function updateProfileInfo() {
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