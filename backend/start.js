const { spawn } = require('child_process');
const path = require('path');

// Define paths
const frontendPath = path.join(__dirname, '..', 'frontend');

console.log('Starting EduScanPlus application...');

// Start frontend server
console.log('\n🚀 Starting frontend server...');

const frontend = spawn('node', ['server.js'], {
  cwd: frontendPath,
  stdio: 'inherit',
  shell: true
});

frontend.on('error', (err) => {
  console.error('❌ Failed to start frontend server:', err);
});

console.log('✅ Frontend server running at http://localhost:3000');
console.log('\n📱 Access the application at http://localhost:3000');
console.log('\n📝 Student Login: 24E112R17 / Mrinall1235');
console.log('🔑 Admin Login: admin / Admin1234');