const express = require('express');
const router = express.Router();
const { checkDatabaseConnection, checkRequiredTables } = require('../utils/db-check');
const fs = require('fs');
const path = require('path');

// Health check endpoint
router.get('/', async (req, res) => {
  try {
    // Check database connection
    const dbConnected = await checkDatabaseConnection();
    
    // Check required tables
    const tablesCheck = dbConnected ? await checkRequiredTables() : { success: false, missingTables: [] };
    
    // Check required directories
    const requiredDirs = [
      'uploads',
      'uploads/notes',
      'uploads/pyqs',
      'uploads/syllabus',
      'uploads/admitcards',
      'uploads/documents'
    ];
    
    const dirChecks = requiredDirs.map(dir => {
      const dirPath = path.join(__dirname, '..', '..', dir);
      const exists = fs.existsSync(dirPath);
      
      // Create directory if it doesn't exist
      if (!exists) {
        try {
          fs.mkdirSync(dirPath, { recursive: true });
          return { dir, exists: true, created: true };
        } catch (err) {
          return { dir, exists: false, error: err.message };
        }
      }
      
      return { dir, exists: true };
    });
    
    // Overall health status
    const isHealthy = dbConnected && tablesCheck.success && dirChecks.every(check => check.exists);
    
    res.json({
      status: isHealthy ? 'healthy' : 'unhealthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: {
          connected: dbConnected,
          tables: tablesCheck
        },
        filesystem: {
          directories: dirChecks
        }
      }
    });
  } catch (err) {
    console.error('Health check failed:', err);
    res.status(500).json({ 
      status: 'error', 
      message: 'Health check failed', 
      error: err.message 
    });
  }
});

module.exports = router;