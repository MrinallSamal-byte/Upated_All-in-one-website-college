const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'pages');
const sidebarScript = '<script src="../public/js/sidebar-fix.js"></script>';

// Get all HTML files in pages directory
const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.htm') || file.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Check if sidebar script is already included
  if (!content.includes('sidebar-fix.js')) {
    // Remove any existing sidebar HTML and scripts
    content = content.replace(/<div class="sidebar">[\s\S]*?<\/div>/g, '');
    content = content.replace(/<button class="sidebar-toggle[\s\S]*?<\/button>/g, '');
    content = content.replace(/<style>[\s\S]*?sidebar[\s\S]*?<\/style>/g, '');
    
    // Add sidebar script before closing body tag
    content = content.replace('</body>', `  ${sidebarScript}\n</body>`);
    
    // Clean up any duplicate Bootstrap or FontAwesome includes
    const lines = content.split('\n');
    const cleanedLines = [];
    let hasBootstrap = false;
    let hasFontAwesome = false;
    
    lines.forEach(line => {
      if (line.includes('bootstrap@5.3.3') && !hasBootstrap) {
        cleanedLines.push('  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">');
        hasBootstrap = true;
      } else if (line.includes('font-awesome') && !hasFontAwesome) {
        cleanedLines.push('  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">');
        hasFontAwesome = true;
      } else if (!line.includes('bootstrap@5.3.3') && !line.includes('font-awesome')) {
        cleanedLines.push(line);
      }
    });
    
    content = cleanedLines.join('\n');
    
    // Ensure Bootstrap and FontAwesome are included
    if (!hasBootstrap) {
      content = content.replace('<head>', '<head>\n  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">');
    }
    if (!hasFontAwesome) {
      content = content.replace('<head>', '<head>\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">');
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`✅ Updated ${file}`);
  } else {
    console.log(`✅ ${file} already has sidebar`);
  }
});

console.log(`\nProcessed ${files.length} files`);
console.log('All pages now have the sidebar!');