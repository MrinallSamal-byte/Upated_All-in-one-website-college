CREATE TABLE IF NOT EXISTS forums (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS topics (
  id INT AUTO_INCREMENT PRIMARY KEY,
  forum_id INT NOT NULL,
  user_id INT NOT NULL, -- Assuming user_id from students/teachers/admins
  user_type ENUM('student', 'teacher', 'admin') NOT NULL,
  title VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (forum_id) REFERENCES forums(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  topic_id INT NOT NULL,
  user_id INT NOT NULL,
  user_type ENUM('student', 'teacher', 'admin') NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (topic_id) REFERENCES topics(id) ON DELETE CASCADE
);

INSERT INTO forums (name, description) VALUES
('General Discussion', 'A place for general college-related discussions.'),
('Academic Help', 'Discuss academic topics and seek help from peers and faculty.'),
('Events & Activities', 'Information and discussion about college events and extracurriculars.');
