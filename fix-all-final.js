const fs = require('fs');
const path = require('path');

console.log('Final comprehensive bug fix...');

const pagesDir = path.join(__dirname, 'frontend', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.htm'));

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix 1: Remove all problematic scripts
  const badScripts = [
    'nav-fix.js', 'page-header.js', 'direct-sidebar.js', 'load-sidebar.js',
    'threeDBackground.js', '3d-background.js', 'student-global.css'
  ];
  
  badScripts.forEach(script => {
    const regex = new RegExp(`<[^>]*${script}[^>]*>`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, '');
      modified = true;
    }
  });

  // Fix 2: Remove 3D background divs
  if (content.includes('threeDBackground')) {
    content = content.replace(/<div[^>]*threeDBackground[^>]*><\/div>/g, '');
    modified = true;
  }

  // Fix 3: Remove duplicate CSS links
  const cssLinks = content.match(/<link[^>]*\.css[^>]*>/g) || [];
  const uniqueCSS = [...new Set(cssLinks)];
  if (cssLinks.length !== uniqueCSS.length) {
    cssLinks.forEach((link, i) => {
      if (i > 0 && uniqueCSS.includes(link)) {
        content = content.replace(link, '');
      }
    });
    modified = true;
  }

  // Fix 4: Ensure Bootstrap CSS and JS
  if (!content.includes('bootstrap@5.3.3/dist/css/bootstrap.min.css')) {
    content = content.replace('<head>', '<head>\n  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">');
    modified = true;
  }

  if (!content.includes('font-awesome')) {
    content = content.replace('<head>', '<head>\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">');
    modified = true;
  }

  if (!content.includes('bootstrap.bundle.min.js')) {
    content = content.replace('</body>', '  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>\n</body>');
    modified = true;
  }

  // Fix 5: Ensure proper sidebar script
  const hasAdminSidebar = content.includes('admin-sidebar.js');
  const hasSidebar = content.includes('sidebar-fix.js');
  
  if (!hasAdminSidebar && !hasSidebar) {
    const isAdmin = file.includes('admin');
    const sidebarScript = isAdmin ? 'admin-sidebar.js' : 'sidebar-fix.js';
    content = content.replace('</body>', `  <script src="../public/js/${sidebarScript}"></script>\n</body>`);
    modified = true;
  }

  // Fix 6: Remove broken sidebar HTML structure
  if (content.includes('<aside class="col-md-3 sidebar"></aside>')) {
    content = content.replace(/<aside[^>]*sidebar[^>]*><\/aside>/g, '');
    content = content.replace(/<div class="container-fluid">\s*<div class="row">/g, '');
    content = content.replace(/<main class="col-md-9 content">/g, '');
    content = content.replace(/<\/main>\s*<\/div>\s*<\/div>/g, '');
    modified = true;
  }

  // Fix 7: Clean up empty lines and formatting
  content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
  content = content.replace(/\s+\n/g, '\n');

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${file}`);
  } else {
    console.log(`✅ ${file} already clean`);
  }
});

// Fix backend routes
const routesDir = path.join(__dirname, 'backend', 'routes');
const routes = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));

routes.forEach(route => {
  const filePath = path.join(routesDir, route);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Ensure all routes have error handling
  if (content.includes('await db.query') && !content.includes('try {')) {
    const lines = content.split('\n');
    const newLines = [];
    let inRoute = false;
    
    lines.forEach(line => {
      if (line.includes('router.')) {
        inRoute = true;
        newLines.push(line);
        if (line.includes('{')) {
          newLines.push('  try {');
        }
      } else if (inRoute && line.includes('});')) {
        newLines.push('  } catch (err) {');
        newLines.push('    console.error(err);');
        newLines.push('    res.status(500).json({ error: "Server error" });');
        newLines.push('  }');
        newLines.push(line);
        inRoute = false;
      } else {
        newLines.push(line);
      }
    });
    
    const newContent = newLines.join('\n');
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent);
      console.log(`✅ Fixed ${route}`);
      modified = true;
    }
  }
});

console.log('\n🎉 All bugs fixed across all pages!');