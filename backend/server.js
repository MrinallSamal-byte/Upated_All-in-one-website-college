const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const http = require('http');
const mimeMiddleware = require('./middleware/mime-middleware');
const errorHandler = require('./middleware/errorHandler');
const startup = require('./startup');

const app = express();
app.use(cors());
app.use(express.json());
app.use(mimeMiddleware);

// Serve uploads directory with proper path
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Create HTTP server
const server = http.createServer(app);

// Initialize Socket.IO
const io = require('socket.io')(server, { 
  cors: { 
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  } 
});

// Make io available to routes
app.set('io', io);

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '..', 'frontend', 'public')));
app.use('/pages', express.static(path.join(__dirname, '..', 'frontend', 'pages')));

// Import routes
const authRoutes = require('./routes/auth');
const pyqsRoutes = require('./routes/pyqs');
const syllabusRoutes = require('./routes/syllabus');
const attendanceRoutes = require('./routes/attendance');
const marksRoutes = require('./routes/marks');
const admitcardRoutes = require('./routes/admitcard');
const hostelmenuRoutes = require('./routes/hostelmenu');
const timetableRoutes = require('./routes/timetable');
const notesRoutes = require('./routes/notes');
const assignmentsRoutes = require('./routes/assignments');
const supportRoutes = require('./routes/support');
const clubsRoutes = require('./routes/clubs');
const documentsRoutes = require('./routes/documents');
const eventsRoutes = require('./routes/events');
const noticesRoutes = require('./routes/notices');
const profileRoutes = require('./routes/profile');
const adminRoutes = require('./routes/admin');
const teacherRoutes = require('./routes/teacher');
const historyRoutes = require('./routes/history');
const clubeventsRoutes = require('./routes/clubevents');
const facultyRoutes = require('./routes/faculty');
const calendarRoutes = require('./routes/calendar');
const forumsRoutes = require('./routes/forums');
const chatRoutes = require('./routes/chat');
const healthRoutes = require('./routes/health');

// Socket.IO connection handling
io.on('connection', socket => {
  console.log('User connected:', socket.id);
  
  socket.on('registerStudent', (studentId) => {
    socket.studentId = studentId;
    socket.join(`student:${studentId}`);
    console.log(`Student ${studentId} registered for notifications`);
  });

  socket.on('registerTeacher', (teacherId) => {
    socket.teacherId = teacherId;
    socket.join(`teacher:${teacherId}`);
    console.log(`Teacher ${teacherId} registered for notifications`);
  });

  socket.on('registerAdmin', (adminId) => {
    socket.adminId = adminId;
    socket.join('admins');
    console.log(`Admin ${adminId} registered for notifications`);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/pyqs', pyqsRoutes);
app.use('/api/syllabus', syllabusRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/admitcard', admitcardRoutes);
app.use('/api/hostelmenu', hostelmenuRoutes);
app.use('/api/timetable', timetableRoutes);
app.use('/api/notes', notesRoutes);
app.use('/api/assignments', assignmentsRoutes);
app.use('/api/support', supportRoutes);
app.use('/api/clubs', clubsRoutes);
app.use('/api/documents', documentsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/notices', noticesRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/teacher', teacherRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/clubevents', clubeventsRoutes);
app.use('/api/faculty', facultyRoutes);
app.use('/api/calendar', calendarRoutes);
app.use('/api/forums', forumsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/health', healthRoutes);

// Catch-all to serve index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'public', 'index.html'));
});

// Global error handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Run startup checks before starting the server
startup().then(() => {
  server.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
    console.log('✅ Frontend served by backend.');
    console.log(`\n📱 Access the application at http://localhost:${PORT}`);
    console.log(`\n📝 Student Login: 24E112R17 / Mrinall1235`);
    console.log(`🔑 Admin Login: admin / Admin1234`);
    console.log(`👨‍🏫 Teacher Login: TECH001 / Teacher1234`);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});