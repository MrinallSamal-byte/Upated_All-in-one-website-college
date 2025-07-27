const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'pages');
const problematicFiles = ['admin-login.htm', 'admin-updated.htm', 'campus-map.htm', 'chat.htm'];

problematicFiles.forEach(file => {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove 3D background div
    content = content.replace(/<div[^>]*threeDBackground[^>]*><\/div>/g, '');
    
    // Remove 3D background scripts
    content = content.replace(/<script[^>]*threeDBackground[^>]*>[\s\S]*?<\/script>/g, '');
    content = content.replace(/<script[^>]*3d[^>]*>[\s\S]*?<\/script>/g, '');
    
    // Remove import statements for 3D
    content = content.replace(/import.*threeDBackground.*\n/g, '');
    content = content.replace(/init3DBackground.*\n/g, '');
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed 3D background in ${file}`);
  }
});

console.log('3D backgrounds removed!');