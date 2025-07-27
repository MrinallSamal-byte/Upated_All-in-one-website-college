-- Master setup file for ITER College Portal database
-- Run this file to set up the complete database

-- Create database schema
SOURCE schema.sql;

-- Insert seed data
SOURCE seed.sql;

-- Set up calendar tables
SOURCE calendar.sql;

-- Set up forums tables
SOURCE forums.sql;

-- Set up chat tables
SOURCE chat.sql;

-- Display success message
SELECT 'Database setup completed successfully!' AS 'Setup Status';