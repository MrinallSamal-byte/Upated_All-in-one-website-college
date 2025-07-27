const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'pages');
const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.htm') || file.endsWith('.html'));

console.log('Fixing loading issues...');

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Remove problematic scripts that don't exist
  const problematicScripts = [
    'nav-fix.js',
    'page-header.js', 
    'direct-sidebar.js',
    'load-sidebar.js'
  ];

  problematicScripts.forEach(script => {
    const regex = new RegExp(`<script[^>]*${script}[^>]*><\/script>`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, '');
      modified = true;
    }
  });

  // Ensure only one sidebar script exists
  const sidebarMatches = content.match(/<script[^>]*sidebar[^>]*><\/script>/g) || [];
  if (sidebarMatches.length > 1) {
    // Remove all but the last one
    sidebarMatches.slice(0, -1).forEach(match => {
      content = content.replace(match, '');
    });
    modified = true;
  }

  // Add proper sidebar script if none exists
  if (!content.includes('sidebar-fix.js') && !content.includes('admin-sidebar.js')) {
    const isAdmin = file.includes('admin');
    const sidebarScript = isAdmin ? 
      '<script src="../public/js/admin-sidebar.js"></script>' :
      '<script src="../public/js/sidebar-fix.js"></script>';
    
    content = content.replace('</body>', `  ${sidebarScript}\n</body>`);
    modified = true;
  }

  // Remove duplicate CSS links
  const bootstrapMatches = content.match(/<link[^>]*bootstrap[^>]*>/g) || [];
  if (bootstrapMatches.length > 1) {
    bootstrapMatches.slice(1).forEach(match => {
      content = content.replace(match, '');
    });
    modified = true;
  }

  const fontAwesomeMatches = content.match(/<link[^>]*font-awesome[^>]*>/g) || [];
  if (fontAwesomeMatches.length > 1) {
    fontAwesomeMatches.slice(1).forEach(match => {
      content = content.replace(match, '');
    });
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${file}`);
  } else {
    console.log(`✅ ${file} already clean`);
  }
});

console.log(`\nFixed loading issues in ${files.length} pages!`);