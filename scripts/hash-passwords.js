const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const seedFilePath = path.join(__dirname, '..', 'sql', 'seed.sql');

async function hashPasswords() {
    try {
        let seedContent = fs.readFileSync(seedFilePath, 'utf8');

        // Handle student passwords
        // Matches: ('register_no', 'name', 'password', department, semester, email, hostel_block)
        // Captures: 1: ('register_no', 'name', , 2: password, 3: , department, semester, email, hostel_block)
        const studentRegex = /(\('[^']+', '[^']+', )'([^']+)'(,[^)]+\))/g;
        seedContent = await replaceAsync(seedContent, studentRegex, async (match, p1, password, p2) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            return `${p1}'${hashedPassword}'${p2}`;
        });

        // Handle admin passwords
        // Matches: ('username', 'password', 'role')
        // Captures: 1: ('username', , 2: password, 3: , 'role')
        const adminRegex = /(\('[^']+', )'([^']+)'(, '[^']+'\))/g;
        seedContent = await replaceAsync(seedContent, adminRegex, async (match, p1, password, p2) => {
            const hashedPassword = await bcrypt.hash(password, 10);
            return `${p1}'${hashedPassword}'${p2}`;
        });

        fs.writeFileSync(seedFilePath, seedContent, 'utf8');
        console.log('Passwords in seed.sql have been hashed successfully.');
    } catch (error) {
        console.error('Error hashing passwords:', error);
    }
}

// Helper function to use async replacer with String.prototype.replace
async function replaceAsync(str, regex, asyncFn) {
    const promises = [];
    str.replace(regex, (match, ...args) => {
        const promise = asyncFn(match, ...args);
        promises.push(promise);
        return ''; // Return empty string, actual replacement happens after all promises resolve
    });
    const data = await Promise.all(promises);
    return str.replace(regex, () => data.shift());
}

hashPasswords();