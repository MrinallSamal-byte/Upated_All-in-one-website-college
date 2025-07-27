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
    
    // Update the avatar dropdown HTML to add ID Card option
    const oldDropdown = `<div class="avatar-dropdown" id="avatarDropdown">
            <a href="profile.htm" class="dropdown-item"><i class="fas fa-user me-2"></i>Profile</a>
            <a href="#" class="dropdown-item" onclick="changePhoto()"><i class="fas fa-camera me-2"></i>Change Photo</a>
            <a href="#" class="dropdown-item" onclick="toggleDarkMode()"><i class="fas fa-cog me-2"></i>Settings</a>
            <a href="#" class="dropdown-item" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a>
          </div>`;
    
    const newDropdown = `<div class="avatar-dropdown" id="avatarDropdown">
            <a href="profile.htm" class="dropdown-item"><i class="fas fa-user me-2"></i>Profile</a>
            <a href="#" class="dropdown-item" onclick="showIDCard()"><i class="fas fa-id-card me-2"></i>Show ID Card</a>
            <a href="#" class="dropdown-item" onclick="changePhoto()"><i class="fas fa-camera me-2"></i>Change Photo</a>
            <a href="#" class="dropdown-item" onclick="toggleDarkMode()"><i class="fas fa-cog me-2"></i>Settings</a>
            <a href="#" class="dropdown-item" onclick="logout()"><i class="fas fa-sign-out-alt me-2"></i>Logout</a>
          </div>`;
    
    content = content.replace(oldDropdown, newDropdown);
    
    // Add CSS for ID Card modal
    const modalCSS = `body.dark-mode .theme-toggle:hover {
          background: #3d3d3d;
        }`;
    
    const newModalCSS = `body.dark-mode .theme-toggle:hover {
          background: #3d3d3d;
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
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
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
        .id-card-header {
          text-align: center;
          margin-bottom: 20px;
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
          color: #667eea;
          font-weight: bold;
        }
        .id-card-info {
          text-align: center;
        }
        .id-card-name {
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 5px;
        }
        .id-card-reg {
          font-size: 14px;
          opacity: 0.9;
          margin-bottom: 15px;
        }
        .id-card-details {
          font-size: 12px;
          opacity: 0.8;
        }`;
    
    content = content.replace(modalCSS, newModalCSS);
    
    // Add the showIDCard function
    const functionToAdd = `      
      window.showIDCard = function() {
        const userName = localStorage.getItem('userName') || 'Student';
        const registerNo = localStorage.getItem('registerNo') || 'REG123456';
        const savedAvatar = localStorage.getItem('userAvatar');
        
        const modal = document.createElement('div');
        modal.className = 'id-card-modal';
        modal.innerHTML = \`
          <div class="id-card">
            <button class="id-card-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            <div class="id-card-header">
              <h6>ITER STUDENT ID</h6>
            </div>
            <div class="id-card-photo" id="modalPhoto">\${savedAvatar ? '' : userName.charAt(0).toUpperCase()}</div>
            <div class="id-card-info">
              <div class="id-card-name">\${userName}</div>
              <div class="id-card-reg">\${registerNo}</div>
              <div class="id-card-details">
                <div>Computer Science & Engineering</div>
                <div>Semester: 6</div>
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
      };`;
    
    // Insert the function before the existing changePhoto function
    content = content.replace('window.changePhoto = function() {', functionToAdd + '\n      window.changePhoto = function() {');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Added ID Card option to ${page}`);
  }
});

console.log('Show ID Card option added to all student pages!');