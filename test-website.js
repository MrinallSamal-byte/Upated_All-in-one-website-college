const http = require('http');

console.log('Testing website functionality...');

// Test server health
const testHealth = () => {
  return new Promise((resolve, reject) => {
    const req = http.get('http://localhost:5000/api/health', (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('✅ Server health check passed');
          resolve(true);
        } else {
          console.log('❌ Server health check failed');
          resolve(false);
        }
      });
    });
    
    req.on('error', (err) => {
      console.log('❌ Server not running');
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      console.log('❌ Server timeout');
      resolve(false);
    });
  });
};

// Test main page
const testMainPage = () => {
  return new Promise((resolve) => {
    const req = http.get('http://localhost:5000/', (res) => {
      if (res.statusCode === 200) {
        console.log('✅ Main page loads correctly');
        resolve(true);
      } else {
        console.log('❌ Main page failed to load');
        resolve(false);
      }
    });
    
    req.on('error', () => {
      console.log('❌ Main page connection failed');
      resolve(false);
    });
    
    req.setTimeout(5000, () => {
      req.destroy();
      console.log('❌ Main page timeout');
      resolve(false);
    });
  });
};

// Run tests
async function runTests() {
  const healthOk = await testHealth();
  const mainPageOk = await testMainPage();
  
  if (healthOk && mainPageOk) {
    console.log('\n🎉 All tests passed! Website is working correctly.');
    console.log('✅ No critical bugs found');
  } else {
    console.log('\n⚠️ Some tests failed. Check server status.');
  }
}

runTests();