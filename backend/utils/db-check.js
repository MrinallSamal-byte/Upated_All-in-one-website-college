const db = require('../config/db');

async function checkDatabaseConnection() {
  try {
    await db.query('SELECT 1');
    return true;
  } catch (err) {
    console.error('Database connection check failed:', err);
    return false;
  }
}

async function checkRequiredTables() {
  const requiredTables = [
    'students',
    'teachers',
    'admin',
    'attendance',
    'marks',
    'notes',
    'pyqs',
    'hostel_menus'
  ];
  
  try {
    const [rows] = await db.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = ?
    `, [process.env.DB_NAME]);
    
    const existingTables = rows.map(row => {
      const tableName = row.table_name || row.TABLE_NAME;
      return tableName ? tableName.toLowerCase() : '';
    }).filter(name => name);
    
    const missingTables = requiredTables.filter(table => !existingTables.includes(table));
    
    return {
      success: missingTables.length === 0,
      missingTables
    };
  } catch (err) {
    console.error('Table check failed:', err);
    return {
      success: false,
      missingTables: requiredTables,
      error: err.message
    };
  }
}

module.exports = {
  checkDatabaseConnection,
  checkRequiredTables
};