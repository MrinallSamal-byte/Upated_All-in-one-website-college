/**
 * Script to check for common security issues in the project
 */
const fs = require('fs');
const path = require('path');

console.log('Checking for common security issues...');

// Check for hardcoded credentials
function checkFileForCredentials(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Check for hardcoded passwords
  const passwordRegex = /password\s*[:=]\s*['"](?!process|env|config|PASSWORD)([^'"]+)['"]/gi;
  let match;
  while ((match = passwordRegex.exec(content)) !== null) {
    issues.push(`Possible hardcoded password: ${match[0]}`);
  }
  
  // Check for hardcoded API keys
  const apiKeyRegex = /api[_-]?key\s*[:=]\s*['"]([^'"]+)['"]/gi;
  while ((match = apiKeyRegex.exec(content)) !== null) {
    issues.push(`Possible hardcoded API key: ${match[0]}`);
  }
  
  // Check for hardcoded tokens
  const tokenRegex = /token\s*[:=]\s*['"]([^'"]+)['"]/gi;
  while ((match = tokenRegex.exec(content)) !== null) {
    issues.push(`Possible hardcoded token: ${match[0]}`);
  }
  
  return issues;
}

// Check for SQL injection vulnerabilities
function checkForSQLInjection(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Check for string concatenation in SQL queries
  const sqlConcatRegex = /db\.query\(\s*['"].*\+/g;
  if (sqlConcatRegex.test(content)) {
    issues.push('Possible SQL injection vulnerability: String concatenation in SQL query');
  }
  
  // Check for direct use of req.params or req.body in SQL queries
  const sqlParamsRegex = /db\.query\(\s*['"](.*?)['"]\s*,\s*\[\s*req\.(params|body|query)\./g;
  if (sqlParamsRegex.test(content)) {
    issues.push('Possible SQL injection vulnerability: Direct use of request parameters in SQL query');
  }
  
  return issues;
}

// Check for XSS vulnerabilities
function checkForXSS(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Check for direct insertion of user input into HTML
  const xssRegex = /innerHTML\s*=\s*(?!.*encodeURI|.*escape|.*sanitize).*(req\.|params\.|query\.|body\.)/g;
  if (xssRegex.test(content)) {
    issues.push('Possible XSS vulnerability: Direct insertion of user input into HTML');
  }
  
  return issues;
}

// Check for CORS misconfiguration
function checkForCORSIssues(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Check for overly permissive CORS
  if (content.includes("origin: '*'") || content.includes("'Access-Control-Allow-Origin', '*'")) {
    issues.push('Possible CORS misconfiguration: Overly permissive CORS policy');
  }
  
  return issues;
}

// Check for JWT issues
function checkForJWTIssues(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const issues = [];
  
  // Check for missing JWT verification
  if (content.includes('jwt.sign') && !content.includes('jwt.verify')) {
    issues.push('Possible JWT issue: JWT signing without verification');
  }
  
  // Check for weak JWT secret
  if (content.includes("process.env.JWT_SECRET || 'your_jwt_secret'")) {
    issues.push('Possible JWT issue: Weak default JWT secret');
  }
  
  return issues;
}

// Scan files recursively
function scanDirectory(dir, fileExtensions = ['.js', '.html', '.htm']) {
  const issues = {};
  
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('node_modules') && !file.startsWith('.git')) {
      // Recursively scan subdirectories
      const subDirIssues = scanDirectory(filePath, fileExtensions);
      Object.assign(issues, subDirIssues);
    } else if (stat.isFile() && fileExtensions.includes(path.extname(filePath))) {
      // Check file for issues
      const fileIssues = [];
      
      fileIssues.push(...checkFileForCredentials(filePath));
      
      if (path.extname(filePath) === '.js') {
        fileIssues.push(...checkForSQLInjection(filePath));
        fileIssues.push(...checkForJWTIssues(filePath));
        fileIssues.push(...checkForCORSIssues(filePath));
      }
      
      if (path.extname(filePath) === '.html' || path.extname(filePath) === '.htm') {
        fileIssues.push(...checkForXSS(filePath));
      }
      
      if (fileIssues.length > 0) {
        issues[filePath] = fileIssues;
      }
    }
  }
  
  return issues;
}

// Run the security check
const issues = scanDirectory(path.join(__dirname));

// Print results
console.log('\nSecurity check results:');
if (Object.keys(issues).length === 0) {
  console.log('✅ No security issues found');
} else {
  console.log(`❌ Found ${Object.keys(issues).length} files with potential security issues:`);
  
  for (const [file, fileIssues] of Object.entries(issues)) {
    console.log(`\nFile: ${file}`);
    fileIssues.forEach((issue, index) => {
      console.log(`  ${index + 1}. ${issue}`);
    });
  }
  
  console.log('\nRecommendations:');
  console.log('1. Never hardcode credentials in source code');
  console.log('2. Always use parameterized queries for database operations');
  console.log('3. Sanitize user input before inserting into HTML');
  console.log('4. Use specific CORS policies instead of allowing all origins');
  console.log('5. Always verify JWT tokens and use strong secrets');
}

console.log('\nSecurity check complete!');