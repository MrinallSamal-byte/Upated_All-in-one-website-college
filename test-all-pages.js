const fs = require('fs');
const path = require('path');

console.log('Testing all pages for common issues...');

const pagesDir = path.join(__dirname, 'frontend', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.htm'));

let totalIssues = 0;

files.forEach(file => {
  const filePath = path.join(pagesDir, file);
  const content = fs.readFileSync(filePath, 'utf8');
  let issues = [];

  // Check for missing Bootstrap
  if (!content.includes('bootstrap@5.3.3')) {
    issues.push('Missing Bootstrap CSS');
  }

  // Check for missing FontAwesome
  if (!content.includes('font-awesome')) {
    issues.push('Missing FontAwesome');
  }

  // Check for sidebar script
  if (!content.includes('sidebar-fix.js') && !content.includes('admin-sidebar.js')) {
    issues.push('Missing sidebar script');
  }

  // Check for 3D background issues (excluding Google Maps)
  if ((content.includes('threeDBackground') || content.includes('3d-background')) && !content.includes('google.com/maps')) {
    issues.push('Has 3D background');
  }

  // Check for broken scripts
  const brokenScripts = ['nav-fix.js', 'page-header.js', 'direct-sidebar.js'];
  brokenScripts.forEach(script => {
    if (content.includes(script)) {
      issues.push(`Has broken script: ${script}`);
    }
  });

  if (issues.length > 0) {
    console.log(`❌ ${file}: ${issues.join(', ')}`);
    totalIssues += issues.length;
  } else {
    console.log(`✅ ${file}: OK`);
  }
});

console.log(`\nSummary: ${totalIssues} issues found across ${files.length} pages`);

if (totalIssues === 0) {
  console.log('🎉 All pages are clean and should work properly!');
} else {
  console.log('⚠️ Some issues remain.');
}