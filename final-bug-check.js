const fs = require('fs');
const path = require('path');

console.log('Final bug check and fix...');

// Check backend routes
const routesDir = path.join(__dirname, 'backend', 'routes');
const routes = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));

routes.forEach(route => {
  const filePath = path.join(routesDir, route);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Fix missing error handling
  if (!content.includes('try {') && content.includes('await db.query')) {
    content = content.replace(
      /(router\.[a-z]+\([^{]+{)/g,
      '$1\n  try {'
    ).replace(
      /(res\.json\([^)]+\);)/g,
      '$1\n  } catch (err) {\n    console.error(err);\n    res.status(500).json({ error: "Server error" });\n  }'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${route}`);
  }
});

// Check frontend pages
const pagesDir = path.join(__dirname, 'frontend', 'pages');
const pages = fs.readdirSync(pagesDir).filter(f => f.endsWith('.htm'));

pages.forEach(page => {
  const filePath = path.join(pagesDir, page);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Remove broken scripts
  const brokenScripts = ['nav-fix.js', 'page-header.js', 'direct-sidebar.js'];
  brokenScripts.forEach(script => {
    if (content.includes(script)) {
      content = content.replace(new RegExp(`<script[^>]*${script}[^>]*><\/script>`, 'g'), '');
      modified = true;
    }
  });

  // Ensure Bootstrap JS exists
  if (!content.includes('bootstrap.bundle.min.js')) {
    content = content.replace('</body>', '  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>\n</body>');
    modified = true;
  }

  // Ensure sidebar script exists
  if (!content.includes('sidebar-fix.js') && !content.includes('admin-sidebar.js')) {
    const sidebarScript = page.includes('admin') ? 'admin-sidebar.js' : 'sidebar-fix.js';
    content = content.replace('</body>', `  <script src="../public/js/${sidebarScript}"></script>\n</body>`);
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Fixed ${page}`);
  }
});

console.log('Bug check complete!');