CREATE DATABASE IF NOT EXISTS eduscanplus;
USE eduscanplus;

CREATE TABLE IF NOT EXISTS students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  register_no VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  department VARCHAR(50),
  semester INT,
  email VARCHAR(100),
  hostel_block VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  register_no VARCHAR(20) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  department VARCHAR(50) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admin (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  role VARCHAR(20) DEFAULT 'admin'
);

CREATE TABLE IF NOT EXISTS attendance (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  subject VARCHAR(100),
  present_days INT DEFAULT 0,
  total_days INT DEFAULT 0,
  semester INT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS marks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  subject VARCHAR(100),
  mid_term INT,
  internal INT,
  semester INT,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS admit_cards (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  exam_name VARCHAR(100),
  exam_code VARCHAR(50),
  file_path VARCHAR(255),
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS pyqs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(100),
  year INT,
  exam_type VARCHAR(50),
  file_path VARCHAR(255),
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS hostel_menus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  hostel_block VARCHAR(50),
  menu_date DATE,
  breakfast VARCHAR(255),
  lunch VARCHAR(255),
  snacks VARCHAR(255),
  dinner VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  description TEXT,
  event_date DATE,
  venue VARCHAR(100),
  created_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (created_by) REFERENCES students(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS timetable (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(50),
  semester INT,
  day VARCHAR(20),
  period1 VARCHAR(100),
  period2 VARCHAR(100),
  period3 VARCHAR(100),
  period4 VARCHAR(100),
  period5 VARCHAR(100),
  file_path VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS syllabus (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(100),
  file_path VARCHAR(255),
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS notes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(100),
  title VARCHAR(255),
  description TEXT,
  file_path VARCHAR(255),
  semester INT,
  uploaded_by INT,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES teachers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(100),
  title VARCHAR(100),
  description TEXT,
  deadline DATE,
  file_path VARCHAR(255),
  uploaded_by INT,
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (uploaded_by) REFERENCES teachers(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS notices (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(100),
  message TEXT,
  posted_by INT,
  posted_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (posted_by) REFERENCES admin(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS support_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  message TEXT,
  status VARCHAR(20) DEFAULT 'open',
  response TEXT,
  responded_by INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (responded_by) REFERENCES admin(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id INT,
  doc_type VARCHAR(50),
  file_path VARCHAR(255),
  uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS clubs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE,
  description TEXT,
  contact VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS club_events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  club_id INT,
  title VARCHAR(100),
  event_date DATE,
  description TEXT,
  FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS club_join_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  club_id INT,
  student_id INT,
  email VARCHAR(100),
  requested_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'pending',
  FOREIGN KEY (club_id) REFERENCES clubs(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS feature_access (
  id INT AUTO_INCREMENT PRIMARY KEY,
  feature VARCHAR(50) NOT NULL,
  department VARCHAR(50),
  semester INT,
  UNIQUE KEY feature_unique (feature)
);

CREATE TABLE IF NOT EXISTS subject_teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  teacher_id INT NOT NULL,
  subject VARCHAR(100) NOT NULL,
  semester INT NOT NULL,
  department VARCHAR(50) NOT NULL,
  FOREIGN KEY (teacher_id) REFERENCES teachers(id) ON DELETE CASCADE,
  UNIQUE KEY (teacher_id, subject, semester, department)
);