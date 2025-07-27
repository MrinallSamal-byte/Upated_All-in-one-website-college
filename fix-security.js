/**
 * Script to fix common security issues in the project
 */
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

console.log('Fixing common security issues...');

// Generate a secure JWT secret
function generateSecureSecret() {
  return crypto.randomBytes(32).toString('hex');
}

// Update .env file with secure JWT secret
function updateEnvFile() {
  const envPath = path.join(__dirname, 'backend', '.env');
  
  if (!fs.existsSync(envPath)) {
    console.log('❌ .env file not found');
    return;
  }
  
  let envContent = fs.readFileSync(envPath, 'utf8');
  
  // Check if JWT_SECRET already exists
  if (envContent.includes('JWT_SECRET=')) {
    console.log('✅ JWT_SECRET already exists in .env file');
  } else {
    // Add JWT_SECRET to .env file
    const jwtSecret = generateSecureSecret();
    envContent += `\nJWT_SECRET=${jwtSecret}`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Added secure JWT_SECRET to .env file');
  }
}

// Fix JWT issues in files
function fixJWTIssues() {
  const accessControlPath = path.join(__dirname, 'backend', 'middleware', 'accessControl.js');
  
  if (!fs.existsSync(accessControlPath)) {
    console.log('❌ accessControl.js file not found');
    return;
  }
  
  let content = fs.readFileSync(accessControlPath, 'utf8');
  
  // Fix weak JWT secret
  if (content.includes("process.env.JWT_SECRET || 'your_jwt_secret'")) {
    content = content.replace(
      "process.env.JWT_SECRET || 'your_jwt_secret'",
      "process.env.JWT_SECRET"
    );
    fs.writeFileSync(accessControlPath, content);
    console.log('✅ Fixed weak JWT secret in accessControl.js');
  } else {
    console.log('✅ No weak JWT secret found in accessControl.js');
  }
}

// Fix CORS issues
function fixCORSIssues() {
  const serverPath = path.join(__dirname, 'backend', 'server.js');
  
  if (!fs.existsSync(serverPath)) {
    console.log('❌ server.js file not found');
    return;
  }
  
  let content = fs.readFileSync(serverPath, 'utf8');
  
  // Fix overly permissive CORS
  if (content.includes("cors()")) {
    content = content.replace(
      "app.use(cors());",
      `app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.ALLOWED_ORIGINS?.split(',') || 'http://localhost:5000' 
    : '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));`
    );
    fs.writeFileSync(serverPath, content);
    console.log('✅ Fixed overly permissive CORS in server.js');
  } else {
    console.log('✅ No overly permissive CORS found in server.js');
  }
}

// Run the fixes
updateEnvFile();
fixJWTIssues();
fixCORSIssues();

console.log('\nSecurity fixes complete!');
console.log('\nRecommendations:');
console.log('1. Review all SQL queries to ensure they use parameterized queries');
console.log('2. Sanitize user input before inserting into HTML');
console.log('3. Implement rate limiting for login and API endpoints');
console.log('4. Set secure and HTTP-only flags for cookies');
console.log('5. Implement proper error handling to avoid information leakage');