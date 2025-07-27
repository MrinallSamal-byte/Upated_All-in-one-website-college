const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'teacher-dashboard.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Add CSS for profile avatar and theme toggle
const cssToAdd = `
  <style>
    .profile-avatar {
      position: fixed;
      top: 15px;
      right: 15px;
      z-index: 1060;
    }
    .theme-toggle {
      position: fixed;
      top: 15px;
      right: 70px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: #f8f9fa;
      border: 1px solid #dee2e6;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 1060;
      transition: all 0.3s ease;
    }
    .theme-toggle:hover {
      background: #e9ecef;
    }
    .avatar-container {
      position: relative;
      width: 40px;
      height: 40px;
      cursor: pointer;
    }
    .avatar-img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: linear-gradient(45deg, #28a745, #20c997);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: 16px;
      border: 3px solid #28a745;
      box-sizing: border-box;
    }
    .avatar-dropdown {
      position: absolute;
      top: 50px;
      right: 0;
      background: white;
      border: 1px solid #ddd;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      min-width: 150px;
      display: none;
    }
    .avatar-dropdown.show {
      display: block;
    }
    .dropdown-item {
      padding: 10px 15px;
      cursor: pointer;
      border-bottom: 1px solid #f0f0f0;
      color: #333;
      text-decoration: none;
      display: block;
    }
    .dropdown-item:hover {
      background-color: #f8f9fa;
    }
    .dropdown-item:last-child {
      border-bottom: none;
    }
    .id-card-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.8);
      display: none;
      align-items: center;
      justify-content: center;
      z-index: 2000;
    }
    .id-card {
      background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
      border-radius: 15px;
      padding: 20px;
      width: 350px;
      color: white;
      box-shadow: 0 10px 30px rgba(0,0,0,0.3);
      position: relative;
    }
    .id-card-close {
      position: absolute;
      top: 10px;
      right: 15px;
      background: none;
      border: none;
      color: white;
      font-size: 20px;
      cursor: pointer;
    }
    .id-card-photo {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: #fff;
      margin: 0 auto 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30px;
      color: #28a745;
      font-weight: bold;
    }
    @media (max-width: 767.98px) {
      .profile-avatar {
        top: 10px;
        right: 10px;
      }
      .theme-toggle {
        top: 10px;
        right: 65px;
      }
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
    body.dark-mode .avatar-dropdown {
      background: #2d2d2d;
      border-color: #444;
    }
    body.dark-mode .dropdown-item {
      color: #e0e0e0;
      border-color: #444;
    }
    body.dark-mode .dropdown-item:hover {
      background-color: #3d3d3d;
    }
    body.dark-mode .theme-toggle {
      background: #2d2d2d;
      border-color: #444;
      color: #e0e0e0;
    }
    body.dark-mode .theme-toggle:hover {
      background: #3d3d3d;
    }
  </style>`;

// Add CSS before closing head tag
content = content.replace('</head>', cssToAdd + '\n</head>');

// Add JavaScript for avatar functionality before closing body tag
const jsToAdd = `
  <script>
    // Create profile avatar and theme toggle
    document.addEventListener('DOMContentLoaded', function() {
      // Create theme toggle button
      const themeToggle = document.createElement('button');
      themeToggle.className = 'theme-toggle';
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      themeToggle.onclick = function() {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark);
        themeToggle.innerHTML = isDark ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
      };
      
      // Create profile avatar
      const profileAvatar = document.createElement('div');
      profileAvatar.className = 'profile-avatar';
      profileAvatar.innerHTML = \`
        <div class="avatar-container">
          <div class="avatar-img" id="avatarImg">T</div>
          <div class="avatar-dropdown" id="avatarDropdown">
            <a href="teacher-profile.htm" class="dropdown-item"><i class="fas fa-user me-2"></i>Profile</a>
            <a href="#" class="dropdown-item" onclick="showIDCard()"><i class="fas fa-id-card me-2"></i>Show ID Card</a>
            <a href="#" class="dropdown-item" onclick="changePhoto()"><i class="fas fa-camera me-2"></i>Change Photo</a>
            <a href="#" class="dropdown-item" onclick="toggleDarkMode()"><i class="fas fa-cog me-2"></i>Settings</a>
            <a href="#" class="dropdown-item" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a>
          </div>
        </div>
      \`;
      
      document.body.insertBefore(themeToggle, document.body.firstChild);
      document.body.insertBefore(profileAvatar, document.body.firstChild);
      
      // Update avatar with teacher initial
      const teacherName = localStorage.getItem('userName') || 'Teacher';
      const savedAvatar = localStorage.getItem('userAvatar');
      const avatarImg = document.getElementById('avatarImg');
      
      if (savedAvatar) {
        avatarImg.style.backgroundImage = \`url(\${savedAvatar})\`;
        avatarImg.style.backgroundSize = 'cover';
        avatarImg.style.backgroundPosition = 'center';
        avatarImg.textContent = '';
      } else {
        avatarImg.textContent = teacherName.charAt(0).toUpperCase();
      }
      
      // Avatar dropdown functionality
      document.getElementById('avatarImg').onclick = function(e) {
        e.stopPropagation();
        document.getElementById('avatarDropdown').classList.toggle('show');
      };
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function() {
        document.getElementById('avatarDropdown').classList.remove('show');
      });
      
      // Apply dark mode if saved
      if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      }
    });

    // Global functions
    window.showIDCard = function() {
      const teacherName = localStorage.getItem('userName') || 'Teacher';
      const registerNo = localStorage.getItem('registerNo') || 'TECH001';
      const savedAvatar = localStorage.getItem('userAvatar');
      
      const modal = document.createElement('div');
      modal.className = 'id-card-modal';
      modal.innerHTML = \`
        <div class="id-card">
          <button class="id-card-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
          <div class="text-center mb-3">
            <h6>ITER FACULTY ID</h6>
          </div>
          <div class="id-card-photo" id="modalPhoto">\${savedAvatar ? '' : teacherName.charAt(0).toUpperCase()}</div>
          <div class="text-center">
            <div class="fw-bold fs-5">\${teacherName}</div>
            <div class="mb-2">\${registerNo}</div>
            <div style="font-size: 12px; opacity: 0.8;">
              <div>Computer Science & Engineering</div>
              <div>Assistant Professor</div>
              <div>Valid Until: Dec 2024</div>
            </div>
          </div>
        </div>
      \`;
      
      if (savedAvatar) {
        modal.querySelector('#modalPhoto').style.backgroundImage = \`url(\${savedAvatar})\`;
        modal.querySelector('#modalPhoto').style.backgroundSize = 'cover';
        modal.querySelector('#modalPhoto').style.backgroundPosition = 'center';
      }
      
      modal.style.display = 'flex';
      document.body.appendChild(modal);
      
      modal.onclick = function(e) {
        if (e.target === modal) {
          modal.remove();
        }
      };
      
      document.getElementById('avatarDropdown').classList.remove('show');
    };

    window.changePhoto = function() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = function(e) {
        const file = e.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            const avatarImg = document.getElementById('avatarImg');
            avatarImg.style.backgroundImage = \`url(\${e.target.result})\`;
            avatarImg.style.backgroundSize = 'cover';
            avatarImg.style.backgroundPosition = 'center';
            avatarImg.textContent = '';
            localStorage.setItem('userAvatar', e.target.result);
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
      document.getElementById('avatarDropdown').classList.remove('show');
    };

    window.toggleDarkMode = function() {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
      document.getElementById('avatarDropdown').classList.remove('show');
    };

    window.logout = function() {
      localStorage.clear();
      window.location.href = '/login.html';
    };
  </script>`;

// Add JavaScript before the existing script tag
content = content.replace('<script src="../public/js/sidebar-fix.js"></script>', jsToAdd + '\n  <script src="../public/js/sidebar-fix.js"></script>');

fs.writeFileSync(filePath, content);
console.log('✅ Added profile avatar to teacher dashboard');