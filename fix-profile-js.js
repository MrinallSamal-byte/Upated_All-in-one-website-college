const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'frontend', 'pages', 'profile.htm');
let content = fs.readFileSync(filePath, 'utf8');

// Fix the JavaScript syntax error - remove extra closing brace
content = content.replace(
  '      }\n      \n      // Sync profile card avatar with top-right avatar',
  '      \n      // Sync profile card avatar with top-right avatar'
);

fs.writeFileSync(filePath, content);
console.log('✅ Fixed profile page JavaScript syntax error');