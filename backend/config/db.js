const mysql = require('mysql2');
require('dotenv').config();

// Create connection pool with error handling
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'eduscanplus',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

// Handle pool errors
pool.on('error', (err) => {
  console.error('Database pool error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.error('Database connection was closed.');
  } else if (err.code === 'ER_CON_COUNT_ERROR') {
    console.error('Database has too many connections.');
  } else if (err.code === 'ECONNREFUSED') {
    console.error('Database connection was refused.');
  } else {
    console.error('Unexpected database error:', err);
  }
});

// Export promise-based pool
module.exports = pool.promise();