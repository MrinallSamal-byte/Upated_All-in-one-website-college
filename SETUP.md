# EduScanPlus - College Portal

## Quick Start Guide

### Step 1: Install Dependencies
```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### Step 2: Set Up Database
```bash
# Create database and tables
mysql -u root -p < ../sql/schema.sql
mysql -u root -p < ../sql/seed.sql
```

### Step 3: Start the Application
```bash
# Start backend server (from backend directory)
cd backend
node server.js

# In a new terminal, start frontend server (from frontend directory)
cd frontend
npm start
```

### Step 4: Access the Application
Open your browser and go to: http://localhost:3000

## Login Credentials

### Student Login
- Register No: 24E112R17
- Password: Mrinall1235

### Admin Login
- Username: admin
- Password: Admin1234

## Troubleshooting

### 404 Errors for Uploads
If you see 404 errors for uploaded files, make sure the uploads directory exists:
```bash
cd backend
mkdir -p uploads/admitcards uploads/pyqs uploads/syllabus uploads/notes uploads/timetables uploads/documents uploads/assignments
```

### Database Connection Issues
Check your .env file in the backend directory and make sure the database credentials are correct.