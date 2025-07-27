/**
 * Startup script to ensure all required directories and files exist
 */
const fs = require('fs');
const path = require('path');
const { checkDatabaseConnection, checkRequiredTables } = require('./utils/db-check');

// Required directories
const requiredDirs = [
  'uploads',
  'uploads/notes',
  'uploads/pyqs',
  'uploads/syllabus',
  'uploads/admitcards',
  'uploads/documents'
];

/**
 * Ensure all required directories exist
 */
function ensureDirectories() {
  console.log('Checking required directories...');
  
  requiredDirs.forEach(dir => {
    const dirPath = path.join(__dirname, '..', dir);
    if (!fs.existsSync(dirPath)) {
      console.log(`Creating directory: ${dir}`);
      try {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`✅ Created directory: ${dir}`);
      } catch (err) {
        console.error(`❌ Failed to create directory: ${dir}`, err);
      }
    } else {
      console.log(`✅ Directory exists: ${dir}`);
    }
  });
}

/**
 * Check database connection and tables
 */
async function checkDatabase() {
  console.log('Checking database connection...');
  
  const dbConnected = await checkDatabaseConnection();
  if (dbConnected) {
    console.log('✅ Database connection successful');
    
    console.log('Checking required tables...');
    const tablesCheck = await checkRequiredTables();
    
    if (tablesCheck.success) {
      console.log('✅ All required tables exist');
    } else {
      console.error('❌ Missing tables:', tablesCheck.missingTables);
      console.log('Please run the SQL setup script: cd sql && mysql -u root -p < setup.sql');
    }
  } else {
    console.error('❌ Database connection failed');
    console.log('Please check your database credentials in .env file');
  }
}

/**
 * Run startup checks
 */
async function startup() {
  console.log('Running startup checks...');
  
  // Ensure directories
  ensureDirectories();
  
  // Check database
  await checkDatabase();
  
  console.log('Startup checks completed');
}

// Export for use in server.js
module.exports = startup;

// Run directly if called from command line
if (require.main === module) {
  startup().catch(err => {
    console.error('Startup error:', err);
    process.exit(1);
  });
}