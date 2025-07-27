# EduScanPlus - College Portal

## Quick Start Guide

### Option 1: One-Click Start (Windows)
Simply double-click the `start.bat` file in the root directory.

### Option 2: Using npm
```bash
cd backend
npm run dev
```

### Option 3: Manual Start
```bash
# Start backend server
cd backend
node server.js

# In a new terminal, start frontend server
cd frontend
node server.js
```

## Login Credentials

### Student Login
- Register No: 24E112R17
- Password: Mrinall1235

### Admin Login
- Register No: admin
- Password: Admin1234

> Note: User type (student or admin) is automatically determined from the database based on the credentials used.

## Features
- Student attendance, marks, and profile management
- Hostel menu viewer with block selection
- Admin panel for document uploads and management
- Dark mode support
- Responsive design for all devices

## Technical Stack
- Backend: Node.js, Express, MySQL
- Frontend: HTML, CSS, JavaScript
- Real-time updates: Socket.io