const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.htm'));

console.log('Checking sidebar presence in all pages...\n');

files.forEach(file => {
  const content = fs.readFileSync(path.join(pagesDir, file), 'utf8');
  
  const hasSidebarScript = content.includes('sidebar-fix.js') || content.includes('admin-sidebar.js');
  const hasBootstrap = content.includes('bootstrap@5.3.3');
  const hasFontAwesome = content.includes('font-awesome');
  
  if (hasSidebarScript && hasBootstrap && hasFontAwesome) {
    console.log(`✅ ${file}: Sidebar ready`);
  } else {
    const missing = [];
    if (!hasSidebarScript) missing.push('sidebar script');
    if (!hasBootstrap) missing.push('Bootstrap');
    if (!hasFontAwesome) missing.push('FontAwesome');
    console.log(`❌ ${file}: Missing ${missing.join(', ')}`);
  }
});

console.log('\nSidebar check complete!');