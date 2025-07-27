CREATE TABLE IF NOT EXISTS chats (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  is_group BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS chat_participants (
  chat_id INT NOT NULL,
  user_id INT NOT NULL,
  user_type ENUM('student', 'teacher', 'admin') NOT NULL,
  PRIMARY KEY (chat_id, user_id, user_type),
  FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  chat_id INT NOT NULL,
  sender_id INT NOT NULL,
  sender_type ENUM('student', 'teacher', 'admin') NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE
);

-- Sample Data (Optional, for testing)
INSERT INTO chats (name, is_group) VALUES ('General Chat', TRUE);
INSERT INTO chat_participants (chat_id, user_id, user_type) VALUES (1, 1, 'student'); -- Assuming student with ID 1
INSERT INTO chat_participants (chat_id, user_id, user_type) VALUES (1, 1, 'teacher'); -- Assuming teacher with ID 1
INSERT INTO messages (chat_id, sender_id, sender_type, content) VALUES (1, 1, 'student', 'Hello everyone!');
INSERT INTO messages (chat_id, sender_id, sender_type, content) VALUES (1, 1, 'teacher', 'Welcome to the chat!');
