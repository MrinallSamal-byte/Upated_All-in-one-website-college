CREATE TABLE IF NOT EXISTS academic_calendar (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  type VARCHAR(50) NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO academic_calendar (title, start_date, end_date, type, description)
VALUES
('Mid-Term Examinations', '2025-10-15', '2025-10-25', 'Exam', 'Mid-term exams for all departments.'),
('Diwali Vacation', '2025-11-01', '2025-11-07', 'Holiday', 'College will be closed for Diwali.'),
('Project Submission Deadline', '2025-11-20', NULL, 'Deadline', 'Final year project submissions.'),
('End-Term Examinations', '2025-12-10', '2025-12-22', 'Exam', 'End-term exams for all departments.');
