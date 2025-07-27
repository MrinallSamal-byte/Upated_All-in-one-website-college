const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'pages');
const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.htm') || file.endsWith('.html'));

console.log('Fixing all bugs in pages...');

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix 1: Remove duplicate sidebar scripts
  const sidebarScripts = content.match(/<script[^>]*sidebar[^>]*><\/script>/g) || [];
  if (sidebarScripts.length > 1) {
    sidebarScripts.slice(0, -1).forEach(script => {
      content = content.replace(script, '');
    });
    modified = true;
  }

  // Fix 2: Ensure only one sidebar script at the end
  if (!content.includes('sidebar-fix.js') && !content.includes('admin-sidebar.js')) {
    const scriptToAdd = file.includes('admin') ? 
      '<script src="../public/js/admin-sidebar.js"></script>' : 
      '<script src="../public/js/sidebar-fix.js"></script>';
    content = content.replace('</body>', `  ${scriptToAdd}\n</body>`);
    modified = true;
  }

  // Fix 3: Remove conflicting scripts
  const conflictingScripts = [
    'page-header.js',
    'direct-sidebar.js',
    'load-sidebar.js'
  ];
  conflictingScripts.forEach(script => {
    const regex = new RegExp(`<script[^>]*${script}[^>]*><\/script>`, 'g');
    if (regex.test(content)) {
      content = content.replace(regex, '');
      modified = true;
    }
  });

  // Fix 4: Add Bootstrap JS if missing
  if (!content.includes('bootstrap.bundle.min.js')) {
    const bootstrapScript = '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>';
    content = content.replace('</body>', `  ${bootstrapScript}\n</body>`);
    modified = true;
  }

  // Fix 5: Fix fetch timeouts
  if (content.includes('fetch(') && !content.includes('AbortController')) {
    content = content.replace(
      /fetch\(([^)]+)\)/g,
      `fetch($1, { signal: AbortSignal.timeout(10000) })`
    );
    modified = true;
  }

  // Fix 6: Add error handling to all fetch calls
  if (content.includes('.then(') && !content.includes('.catch(')) {
    content = content.replace(
      /\.then\(([^}]+)\);/g,
      `.then($1).catch(error => { console.error('Error:', error); showError('Loading failed'); });`
    );
    modified = true;
  }

  // Fix 7: Remove inline styles that conflict with dark mode
  content = content.replace(/style="[^"]*color:[^"]*"/g, '');
  if (content !== fs.readFileSync(filePath, 'utf8')) modified = true;

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${file}`);
  } else {
    console.log(`✅ ${file} already clean`);
  }
});

console.log(`\nFixed ${files.length} pages!`);