const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'frontend', 'pages');
const files = fs.readdirSync(pagesDir).filter(file => file.endsWith('.htm') || file.endsWith('.html'));

console.log('Optimizing pages for smooth performance...');

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // Remove duplicate script tags
  const scriptMatches = content.match(/<script[^>]*src="[^"]*sidebar[^"]*"[^>]*><\/script>/g);
  if (scriptMatches && scriptMatches.length > 1) {
    // Keep only the last sidebar script
    const lastScript = scriptMatches[scriptMatches.length - 1];
    scriptMatches.slice(0, -1).forEach(script => {
      content = content.replace(script, '');
    });
    modified = true;
  }

  // Remove duplicate CSS links
  const cssMatches = content.match(/<link[^>]*bootstrap[^>]*>/g);
  if (cssMatches && cssMatches.length > 1) {
    cssMatches.slice(1).forEach(link => {
      content = content.replace(link, '');
    });
    modified = true;
  }

  // Add performance optimizations
  if (!content.includes('loading="lazy"') && content.includes('<img')) {
    content = content.replace(/<img([^>]*)>/g, '<img$1 loading="lazy">');
    modified = true;
  }

  // Add preload for critical resources
  if (!content.includes('rel="preload"')) {
    const headEnd = content.indexOf('</head>');
    if (headEnd !== -1) {
      const preloadLinks = `
  <link rel="preload" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" as="style">
  <link rel="preload" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" as="style">`;
      content = content.substring(0, headEnd) + preloadLinks + '\n' + content.substring(headEnd);
      modified = true;
    }
  }

  // Optimize JavaScript loading
  if (content.includes('src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"')) {
    content = content.replace(
      'src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"',
      'src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js" defer'
    );
    modified = true;
  }

  // Add error boundaries for fetch calls
  if (content.includes('fetch(') && !content.includes('setTimeout')) {
    content = content.replace(
      /fetch\(([^)]+)\)/g,
      'Promise.race([fetch($1), new Promise((_, reject) => setTimeout(() => reject(new Error("Timeout")), 10000))])'
    );
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content);
    console.log(`✅ Optimized ${file}`);
  } else {
    console.log(`✅ ${file} already optimized`);
  }
});

console.log(`\nOptimized ${files.length} pages for better performance!`);