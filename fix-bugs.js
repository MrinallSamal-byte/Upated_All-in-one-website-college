/**
 * Script to fix common bugs in the project
 */
const fs = require('fs');
const path = require('path');

console.log('Fixing common bugs...');

// Fix package.json if it doesn't have required dependencies
function fixPackageJson() {
  const packagePath = path.join(__dirname, 'backend', 'package.json');
  
  if (!fs.existsSync(packagePath)) {
    console.log('❌ package.json not found');
    return;
  }
  
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const requiredDeps = {
    'express': '^4.18.2',
    'cors': '^2.8.5',
    'mysql2': '^3.6.0',
    'bcryptjs': '^2.4.3',
    'jsonwebtoken': '^9.0.2',
    'multer': '^1.4.5-lts.1',
    'socket.io': '^4.7.2',
    'dotenv': '^16.3.1'
  };
  
  let needsUpdate = false;
  
  if (!packageJson.dependencies) {
    packageJson.dependencies = {};
  }
  
  for (const [dep, version] of Object.entries(requiredDeps)) {
    if (!packageJson.dependencies[dep]) {
      packageJson.dependencies[dep] = version;
      needsUpdate = true;
      console.log(`✅ Added dependency: ${dep}@${version}`);
    }
  }
  
  if (needsUpdate) {
    fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2));
    console.log('✅ Updated package.json');
  } else {
    console.log('✅ package.json is up to date');
  }
}

// Fix .env file
function fixEnvFile() {
  const envPath = path.join(__dirname, 'backend', '.env');
  
  if (!fs.existsSync(envPath)) {
    const envContent = `DB_HOST=localhost
DB_USER=root
DB_PASS=Mrinall@1123
DB_NAME=eduscanplus
PORT=5000
JWT_SECRET=your_jwt_secret_replace_this_in_production
NODE_ENV=development`;
    
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Created .env file');
  } else {
    console.log('✅ .env file exists');
  }
}

// Fix missing directories
function fixDirectories() {
  const dirs = [
    'backend/controllers',
    'backend/models',
    'backend/middleware',
    'backend/routes',
    'backend/utils',
    'uploads',
    'uploads/notes',
    'uploads/pyqs',
    'uploads/syllabus',
    'uploads/admitcards',
    'uploads/documents'
  ];
  
  dirs.forEach(dir => {
    const dirPath = path.join(__dirname, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`✅ Created directory: ${dir}`);
    }
  });
}

// Fix SQL setup script
function fixSQLSetup() {
  const setupPath = path.join(__dirname, 'sql', 'setup.sql');
  
  const setupContent = `-- Master setup file for ITER College Portal database
-- Run this file to set up the complete database

-- Create database schema
SOURCE schema.sql;

-- Insert seed data
SOURCE seed.sql;

-- Display success message
SELECT 'Database setup completed successfully!' AS 'Setup Status';`;
  
  if (!fs.existsSync(setupPath)) {
    fs.writeFileSync(setupPath, setupContent);
    console.log('✅ Created SQL setup script');
  }
}

// Run all fixes
fixPackageJson();
fixEnvFile();
fixDirectories();
fixSQLSetup();

console.log('\nBug fixes complete!');
console.log('\nNext steps:');
console.log('1. Run: cd backend && npm install');
console.log('2. Update .env file with your database credentials');
console.log('3. Run: cd sql && mysql -u root -p < setup.sql');
console.log('4. Run: cd backend && npm start');