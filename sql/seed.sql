INSERT INTO students (register_no, name, password, department, semester, email, hostel_block) VALUES
('24E112R17', 'Mrinall Samal', '$2b$10$j.OOaVdo/g/Igv2.S0.FeODKhjmOi9Y7rEO5BIy0FFvIuzx1FtUNi', 'ECE', 5, 'mrinall.samal@example.com', 'A'),
('24C117C17', 'John Doe', '$2b$10$Vyczz7HG8J8Y3qeYkFQKmeZYI6XnzHcY67srYIsl5AL9c1yOx0yGi', 'CSE', 6, 'john.doe@example.com', 'B'),
('24C117C18', 'Jane Smith', '$2b$10$xA6PjGjLDoM9F3kok02lxeNkKjFQAFjAJeJ33PqXz6KSErGQKWHNu', 'CSE', 6, 'jane.smith@example.com', 'C'),
('24M115M19', 'Robert Johnson', '$2b$10$ieS0asBc.bmCilupe.FXA.V6as59KdDYNZCDL71zHQiLehCrXJadO', 'MECH', 4, 'robert.johnson@example.com', 'A'),
('24E113E20', 'Emily Davis', '$2b$10$s83nVdY5ytYmDjvVlDPG4OQNrsLPlIjWB6cOooUIT0ietPhV/NBpW', 'EEE', 5, 'emily.davis@example.com', 'D'),
('24C118C21', 'Michael Brown', '$2b$10$7S2v8Ud9OgejL4sAVXR3CO2y1XP1sPJflMDqEFihVOE3DMUqQatY2', 'CSE', 7, 'michael.brown@example.com', 'B'),
('24E114E22', 'Sarah Wilson', '$2b$10$mcwtCcBSGPebbjvIRV47E.8YE1CcF2sI.xJkFa.mtejvCojzDyvGy', 'ECE', 3, 'sarah.wilson@example.com', 'C'),
('24M116M23', 'David Miller', '$2b$10$ADYEdcimqQaGBgFlUzhfpOpUssm8CNrVRE0eYv3pTgm6KxUgaOY2S', 'MECH', 6, 'david.miller@example.com', 'D'),
('24C119C24', 'Jennifer Taylor', '$2b$10$KrgxWr3P8dRrPs6E5VNEjOsyG6KWW2Z2ZFY5CkEdf7uZ6U8os7.Ha', 'CSE', 4, 'jennifer.taylor@example.com', 'A'),
('24E115E25', 'Thomas Anderson', '$2b$10$HvUvXLX0kfhmdAkZriU0A.5Ud5u7LsMHXKthP9q.mSTK6b3LAL/Kq', 'EEE', 7, 'thomas.anderson@example.com', 'B');

INSERT INTO teachers (name, register_no, password, department, email, phone) VALUES
('Prof. Sharma', 'TECH001', '$2b$10$XFE/UbpRmHwAOUmNFvJRPeQeEYHBGI8YvRs/jWcMn.5ePyKVVwUdC', 'CSE', 'sharma@example.com', '9876543210'),
('Prof. Gupta', 'TECH002', '$2b$10$XFE/UbpRmHwAOUmNFvJRPeQeEYHBGI8YvRs/jWcMn.5ePyKVVwUdC', 'ECE', 'gupta@example.com', '9876543211'),
('Dr. Patel', 'TECH003', '$2b$10$XFE/UbpRmHwAOUmNFvJRPeQeEYHBGI8YvRs/jWcMn.5ePyKVVwUdC', 'MECH', 'patel@example.com', '9876543212');

INSERT INTO admin (username, password, role) VALUES
('admin', '$2b$10$sQcndSYLLpddhQ50kIufou9JcGucPmnQ9B2DAvF7c8G0gALPigWMC', 'admin');

INSERT INTO hostel_menus (hostel_block, menu_date, breakfast, lunch, snacks, dinner) VALUES
('A', CURDATE(), 'Bread, Eggs, Tea', 'Rice, Dal, Chicken Curry, Salad', 'Tea, Biscuits', 'Chapati, Paneer Butter Masala, Rice'),
('B', CURDATE(), 'Idli, Sambar, Coffee', 'Rice, Dal, Fish Curry, Papad', 'Coffee, Samosa', 'Chapati, Mixed Vegetable, Rice'),
('C', CURDATE(), 'Poha, Milk, Fruits', 'Rice, Dal, Egg Curry, Pickle', 'Juice, Cookies', 'Chapati, Chicken Biryani, Raita'),
('D', CURDATE(), 'Upma, Tea, Boiled Eggs', 'Rice, Dal, Vegetable Curry, Curd', 'Tea, Pakora', 'Chapati, Dal Makhani, Rice');

INSERT INTO subject_teachers (teacher_id, subject, semester, department) VALUES 
((SELECT id FROM teachers WHERE register_no = 'TECH001'), 'Data Structures', 3, 'CSE'),
((SELECT id FROM teachers WHERE register_no = 'TECH001'), 'Algorithms', 4, 'CSE'),
((SELECT id FROM teachers WHERE register_no = 'TECH002'), 'Digital Electronics', 3, 'ECE'),
((SELECT id FROM teachers WHERE register_no = 'TECH003'), 'Thermodynamics', 3, 'MECH');

INSERT INTO notes (subject, title, description, file_path, semester, uploaded_by) VALUES
('Data Structures', 'Introduction to Linked Lists', 'Basic concepts and implementation of singly linked lists', '/uploads/notes/linked-lists.pdf', 3, (SELECT id FROM teachers WHERE register_no = 'TECH001')),
('Algorithms', 'Sorting Algorithms', 'Comparison of different sorting algorithms and their complexities', '/uploads/notes/sorting-algorithms.pdf', 4, (SELECT id FROM teachers WHERE register_no = 'TECH001')),
('Digital Electronics', 'Boolean Algebra', 'Introduction to Boolean algebra and logic gates', '/uploads/notes/boolean-algebra.pdf', 3, (SELECT id FROM teachers WHERE register_no = 'TECH002'));

INSERT INTO pyqs (subject, year, exam_type, file_path) VALUES
('Data Structures', 2022, 'Mid-Term', '/uploads/pyqs/ds-midterm-2022.pdf'),
('Algorithms', 2022, 'End-Term', '/uploads/pyqs/algo-endterm-2022.pdf'),
('Digital Electronics', 2022, 'Mid-Term', '/uploads/pyqs/de-midterm-2022.pdf');

INSERT INTO attendance (student_id, subject, present_days, total_days, semester) VALUES
((SELECT id FROM students WHERE register_no = '24E112R17'), 'Digital Electronics', 20, 25, 5),
((SELECT id FROM students WHERE register_no = '24E112R17'), 'Microprocessors', 18, 20, 5),
((SELECT id FROM students WHERE register_no = '24C117C17'), 'Data Structures', 22, 25, 6),
((SELECT id FROM students WHERE register_no = '24C117C17'), 'Algorithms', 19, 22, 6);

INSERT INTO marks (student_id, subject, mid_term, internal, semester) VALUES
((SELECT id FROM students WHERE register_no = '24E112R17'), 'Digital Electronics', 85, 90, 5),
((SELECT id FROM students WHERE register_no = '24E112R17'), 'Microprocessors', 78, 82, 5),
((SELECT id FROM students WHERE register_no = '24C117C17'), 'Data Structures', 92, 88, 6),
((SELECT id FROM students WHERE register_no = '24C117C17'), 'Algorithms', 87, 85, 6);

INSERT INTO clubs (name, description, contact) VALUES
('Programming Club', 'Learn and practice programming skills', 'programming@iter.edu'),
('Robotics Club', 'Build and program robots', 'robotics@iter.edu'),
('Cultural Club', 'Organize cultural events and activities', 'cultural@iter.edu');

INSERT INTO notices (title, message, posted_by) VALUES
('Mid-term Exam Schedule', 'Mid-term examinations will be conducted from March 15-25, 2024.', (SELECT id FROM admin WHERE username = 'admin')),
('Library Hours Extended', 'Library will remain open until 10 PM during exam period.', (SELECT id FROM admin WHERE username = 'admin')),
('Sports Day Registration', 'Register for annual sports day events by March 10, 2024.', (SELECT id FROM admin WHERE username = 'admin'));