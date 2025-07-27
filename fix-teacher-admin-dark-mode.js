const fs = require('fs');
const path = require('path');

// Fix teacher dashboard
const teacherPath = path.join(__dirname, 'frontend', 'pages', 'teacher-dashboard.htm');
let teacherContent = fs.readFileSync(teacherPath, 'utf8');

// Add comprehensive dark mode CSS for teacher dashboard
const teacherDarkCSS = `        body.dark-mode .tab-content {
          background-color: #1e1e1e !important;
        }`;

const newTeacherDarkCSS = `        body.dark-mode .tab-content {
          background-color: #1e1e1e !important;
        }
        body.dark-mode .modal-content {
          background-color: #1e1e1e !important;
          color: #e0e0e0 !important;
        }
        body.dark-mode .modal-header {
          background-color: #2d2d2d !important;
          border-bottom-color: #444 !important;
        }
        body.dark-mode .modal-footer {
          background-color: #2d2d2d !important;
          border-top-color: #444 !important;
        }
        body.dark-mode .btn-close {
          filter: invert(1);
        }
        body.dark-mode .alert-info {
          background-color: #055160 !important;
          border-color: #087990 !important;
          color: #b6effb !important;
        }
        body.dark-mode .alert-success {
          background-color: #0f5132 !important;
          border-color: #146c43 !important;
          color: #d1e7dd !important;
        }
        body.dark-mode .alert-warning {
          background-color: #664d03 !important;
          border-color: #997404 !important;
          color: #ffecb5 !important;
        }
        body.dark-mode .list-group-item-action:hover {
          background-color: #2d2d2d !important;
        }`;

teacherContent = teacherContent.replace(teacherDarkCSS, newTeacherDarkCSS);

// Fix admin dashboard
const adminPath = path.join(__dirname, 'frontend', 'pages', 'admin.htm');
let adminContent = fs.readFileSync(adminPath, 'utf8');

// Add comprehensive dark mode CSS for admin dashboard
const adminDarkCSS = `    body.dark-mode .alert-info {
      background-color: #055160 !important;
      border-color: #087990 !important;
      color: #b6effb !important;
    }`;

const newAdminDarkCSS = `    body.dark-mode .alert-info {
      background-color: #055160 !important;
      border-color: #087990 !important;
      color: #b6effb !important;
    }
    body.dark-mode .modal-header {
      background-color: #2d2d2d !important;
      border-bottom-color: #444 !important;
    }
    body.dark-mode .modal-footer {
      background-color: #2d2d2d !important;
      border-top-color: #444 !important;
    }
    body.dark-mode .btn-close {
      filter: invert(1);
    }
    body.dark-mode .alert-success {
      background-color: #0f5132 !important;
      border-color: #146c43 !important;
      color: #d1e7dd !important;
    }
    body.dark-mode .alert-danger {
      background-color: #842029 !important;
      border-color: #b02a37 !important;
      color: #f8d7da !important;
    }
    body.dark-mode .list-group-item-action:hover {
      background-color: #2d2d2d !important;
    }
    body.dark-mode .nav-pills .nav-link.active {
      background-color: #0d6efd !important;
    }
    body.dark-mode .nav-pills .nav-link {
      color: #e0e0e0 !important;
    }`;

adminContent = adminContent.replace(adminDarkCSS, newAdminDarkCSS);

// Write the updated files
fs.writeFileSync(teacherPath, teacherContent);
fs.writeFileSync(adminPath, adminContent);

console.log('✅ Fixed dark mode visibility for teacher and admin dashboards');