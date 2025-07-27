const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'pages');
const studentPages = [
  'dashboard.htm', 'attendance.htm', 'marks.htm', 'admitcard.htm', 
  'hostelmenu.htm', 'timetable.htm', 'notes.htm', 'events.htm', 
  'clubs.htm', 'profile.htm', 'assignments.htm', 'pyqs.htm', 
  'syllabus.htm', 'documents.htm', 'support.htm', 'notice.htm'
];

studentPages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Update the avatar dropdown HTML
    const oldDropdown = `<div class="avatar-dropdown" id="avatarDropdown">
            <a href="profile.htm" class="dropdown-item"><i class="fas fa-user me-2"></i>Profile</a>
            <a href="#" class="dropdown-item" onclick="toggleDarkMode()"><i class="fas fa-cog me-2"></i>Settings</a>
            <a href="#" class="dropdown-item" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a>
          </div>`;
    
    const newDropdown = `<div class="avatar-dropdown" id="avatarDropdown">
            <a href="profile.htm" class="dropdown-item"><i class="fas fa-user me-2"></i>Profile</a>
            <a href="#" class="dropdown-item" onclick="changePhoto()"><i class="fas fa-camera me-2"></i>Change Photo</a>
            <a href="#" class="dropdown-item" onclick="toggleDarkMode()"><i class="fas fa-cog me-2"></i>Settings</a>
            <a href="#" class="dropdown-item" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a>
          </div>`;
    
    content = content.replace(oldDropdown, newDropdown);
    
    // Add the changePhoto function
    const functionToAdd = `      
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
      };`;
    
    // Insert the function before the existing functions
    content = content.replace('window.toggleDarkMode = function() {', functionToAdd + '\n      window.toggleDarkMode = function() {');
    
    // Update avatar loading to check for saved photo
    const avatarUpdateCode = `// Update avatar with user initial
      const userName = localStorage.getItem('userName') || 'Student';
      const savedAvatar = localStorage.getItem('userAvatar');
      const avatarImg = document.getElementById('avatarImg');
      
      if (savedAvatar) {
        avatarImg.style.backgroundImage = \`url(\${savedAvatar})\`;
        avatarImg.style.backgroundSize = 'cover';
        avatarImg.style.backgroundPosition = 'center';
        avatarImg.textContent = '';
      } else {
        avatarImg.textContent = userName.charAt(0).toUpperCase();
      }`;
    
    content = content.replace(/\/\/ Update avatar with user initial[\s\S]*?userName\.charAt\(0\)\.toUpperCase\(\);/, avatarUpdateCode);
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${page} with change photo option`);
  }
});

console.log('Change photo option added to all student pages!');