const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'profile.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Add CSS for proper avatar sizing in the profile card
const cssToAdd = `        .profile-avatar .avatar-img {
          width: 40px !important;
          height: 40px !important;
          font-size: 16px !important;
        }
        .profile-card-avatar {
          width: 100px;
          height: 100px;
          font-size: 40px;
        }`;

// Insert the CSS before the closing style tag
content = content.replace('body.dark-mode .text-muted {', cssToAdd + '\n        body.dark-mode .text-muted {');

// Update the profile card avatar to use a different class
content = content.replace(
  'class="bg-primary text-white mx-auto rounded-circle d-flex align-items-center justify-content-center" style="width:100px;height:100px;font-size:40px;">S</div>',
  'class="bg-primary text-white mx-auto rounded-circle d-flex align-items-center justify-content-center profile-card-avatar" id="profileCardAvatar">S</div>'
);

// Add JavaScript to sync the profile card avatar with the top-right avatar
const jsToAdd = `      // Sync profile card avatar with top-right avatar
      const profileCardAvatar = document.getElementById('profileCardAvatar');
      if (profileCardAvatar && savedAvatar) {
        profileCardAvatar.style.backgroundImage = \`url(\${savedAvatar})\`;
        profileCardAvatar.style.backgroundSize = 'cover';
        profileCardAvatar.style.backgroundPosition = 'center';
        profileCardAvatar.textContent = '';
      } else if (profileCardAvatar) {
        profileCardAvatar.textContent = userName.charAt(0).toUpperCase();
      }`;

// Insert the JavaScript after the existing avatar update code
content = content.replace(
  'avatarImg.textContent = userName.charAt(0).toUpperCase();',
  'avatarImg.textContent = userName.charAt(0).toUpperCase();\n      }\n      \n' + jsToAdd
);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed profile page avatar sizing and functionality');