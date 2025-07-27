const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'profile.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Remove the large profile avatar section
const oldProfileSection = `          <div class="profile-avatar mb-3">
            <div class="bg-primary text-white mx-auto rounded-circle d-flex align-items-center justify-content-center profile-card-avatar" id="profileCardAvatar">S</div>
          </div>`;

content = content.replace(oldProfileSection, '');

// Remove the CSS for profile-card-avatar
content = content.replace(
  '.profile-card-avatar {\n          width: 100px;\n          height: 100px;\n          font-size: 40px;\n        }',
  ''
);

// Remove the JavaScript that syncs the large avatar
const syncJS = `      // Sync profile card avatar with top-right avatar
      const profileCardAvatar = document.getElementById('profileCardAvatar');
      if (profileCardAvatar && savedAvatar) {
        profileCardAvatar.style.backgroundImage = \`url(\${savedAvatar})\`;
        profileCardAvatar.style.backgroundSize = 'cover';
        profileCardAvatar.style.backgroundPosition = 'center';
        profileCardAvatar.textContent = '';
      } else if (profileCardAvatar) {
        profileCardAvatar.textContent = userName.charAt(0).toUpperCase();
      }`;

content = content.replace(syncJS, '');

fs.writeFileSync(filePath, content);
console.log('✅ Removed large profile picture from profile page');