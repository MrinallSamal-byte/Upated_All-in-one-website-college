# ITER College Portal - Setup Guide

## Database Setup

1. Install MySQL if not already installed
2. Create a database user or use the root user
3. Update the `.env` file in the `backend` directory with your database credentials
4. Run the setup script:

```bash
cd sql
mysql -u root -p < setup.sql
```

## Backend Setup

1. Install Node.js if not already installed
2. Install dependencies:

```bash
cd backend
npm install
```

3. Start the backend server:

```bash
npm start
```

## Frontend Setup

The frontend is served by the backend server, so no separate setup is needed.

## Login Credentials

### Student Login
- Register No: 24E112R17
- Password: Mrinall1235

### Admin Login
- Username: admin
- Password: Admin1234

### Teacher Login
- Register No: TECH001
- Password: Teacher1234

## Troubleshooting

### MIME Type Errors
If you see errors like "Failed to load module script: Expected a JavaScript-or-Wasm module script but the server responded with a MIME type of 'text/html'", make sure you're using the updated server.js file that sets the correct Content-Type headers.

### Database Connection Issues
If you have issues connecting to the database, check:
1. MySQL service is running
2. Database credentials in .env file are correct
3. The database and tables exist (run setup.sql if needed)

### Missing Files or Directories
If you see errors about missing files or directories:
1. Make sure all required directories exist (create them if needed)
2. Check file paths in the code match your system's file structure

## File Structure

- `backend/` - Node.js backend server
- `frontend/` - HTML, CSS, and JavaScript files
- `sql/` - Database setup scripts
- `uploads/` - Directory for uploaded files (created automatically)