/**
 * Script to check for common issues in the project
 */
const fs = require('fs');
const path = require('path');

console.log('Checking for common issues...');

// Check if required directories exist
const requiredDirs = [
  'backend',
  'frontend',
  'frontend/public',
  'frontend/pages',
  'backend/routes',
  'backend/middleware',
  'backend/utils',
  'uploads',
  'uploads/notes',
  'uploads/pyqs',
  'uploads/syllabus',
  'uploads/admitcards',
  'uploads/documents'
];

console.log('\nChecking required directories:');
requiredDirs.forEach(dir => {
  const dirPath = path.join(__dirname, dir);
  if (!fs.existsSync(dirPath)) {
    console.log(`❌ Missing directory: ${dir}`);
    // Create the directory
    try {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    } catch (err) {
      console.log(`⚠️ Failed to create directory: ${dir}`);
    }
  } else {
    console.log(`✅ Directory exists: ${dir}`);
  }
});

// Check if .env file exists
console.log('\nChecking .env file:');
const envPath = path.join(__dirname, 'backend', '.env');
if (!fs.existsSync(envPath)) {
  console.log('❌ Missing .env file');
  
  // Create a sample .env file
  const sampleEnv = `DB_HOST=localhost
DB_USER=root
DB_PASS=password
DB_NAME=eduscanplus
PORT=5000
JWT_SECRET=your_jwt_secret`;
  
  try {
    fs.writeFileSync(envPath, sampleEnv);
    console.log('✅ Created sample .env file');
  } catch (err) {
    console.log('⚠️ Failed to create .env file');
  }
} else {
  console.log('✅ .env file exists');
}

// Check for common JavaScript files
console.log('\nChecking for key JavaScript files:');
const keyFiles = [
  'backend/server.js',
  'frontend/public/js/sidebar-fix.js',
  'frontend/public/js/error-handler.js'
];

keyFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) {
    console.log(`❌ Missing file: ${file}`);
  } else {
    console.log(`✅ File exists: ${file}`);
  }
});

console.log('\nCheck complete!');
console.log('\nTo start the server:');
console.log('1. Make sure MySQL is running');
console.log('2. Update the .env file with your database credentials');
console.log('3. Run the SQL setup script: cd sql && mysql -u root -p < setup.sql');
console.log('4. Start the server: cd backend && npm start');
console.log('5. Access the application at http://localhost:5000');