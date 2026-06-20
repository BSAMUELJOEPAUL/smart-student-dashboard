CREATE DATABASE IF NOT EXISTS smart_dashboard;
USE smart_dashboard;

CREATE TABLE IF NOT EXISTS students (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    roll_number VARCHAR(50),
    department VARCHAR(100),
    semester VARCHAR(20),
    phone VARCHAR(15),
    profile_pic TEXT,
    role VARCHAR(20) DEFAULT 'STUDENT',
    reset_token VARCHAR(255),
    reset_token_expiry DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS attendance (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT,
    subject VARCHAR(100),
    date DATE,
    status VARCHAR(20),
    total_classes INT,
    attended_classes INT
);

CREATE TABLE IF NOT EXISTS marks (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT,
    subject VARCHAR(100),
    exam_type VARCHAR(20),
    marks_obtained DOUBLE,
    max_marks DOUBLE,
    semester VARCHAR(20),
    grade VARCHAR(5)
);

CREATE TABLE IF NOT EXISTS exams (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    subject VARCHAR(100),
    exam_type VARCHAR(20),
    exam_date DATE,
    start_time TIME,
    end_time TIME,
    venue VARCHAR(100),
    semester VARCHAR(20),
    department VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS assignments (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT,
    title VARCHAR(200),
    subject VARCHAR(100),
    description TEXT,
    due_date DATE,
    status VARCHAR(20),
    priority VARCHAR(10)
);

CREATE TABLE IF NOT EXISTS fees (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT,
    fee_type VARCHAR(50),
    amount DOUBLE,
    paid DOUBLE,
    status VARCHAR(20),
    semester VARCHAR(20),
    due_date VARCHAR(20)
);

CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT,
    title VARCHAR(200),
    message TEXT,
    type VARCHAR(20),
    is_read TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Sample student (password: student123)
INSERT IGNORE INTO students (full_name, email, password, roll_number, department, semester, phone, role)
VALUES ('Alex Johnson', 'alex@student.com',
        '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lby2',
        'CS2021001', 'Computer Science', 'Semester 5', '9876543210', 'STUDENT');

-- Sample attendance
INSERT IGNORE INTO attendance (student_id, subject, date, status, total_classes, attended_classes) VALUES
(1, 'Data Structures', '2024-01-15', 'PRESENT', 40, 36),
(1, 'DBMS', '2024-01-15', 'PRESENT', 38, 30),
(1, 'Operating Systems', '2024-01-15', 'ABSENT', 42, 35),
(1, 'Computer Networks', '2024-01-15', 'PRESENT', 36, 32),
(1, 'Software Engineering', '2024-01-15', 'PRESENT', 40, 38);

-- Sample marks
INSERT IGNORE INTO marks (student_id, subject, exam_type, marks_obtained, max_marks, semester, grade) VALUES
(1, 'Data Structures', 'MID1', 42, 50, 'Semester 5', 'A'),
(1, 'DBMS', 'MID1', 45, 50, 'Semester 5', 'A+'),
(1, 'Operating Systems', 'MID1', 38, 50, 'Semester 5', 'B+'),
(1, 'Computer Networks', 'MID1', 40, 50, 'Semester 5', 'A'),
(1, 'Software Engineering', 'MID1', 47, 50, 'Semester 5', 'A+');

-- Sample exams
INSERT IGNORE INTO exams (subject, exam_type, exam_date, start_time, end_time, venue, semester, department) VALUES
('Data Structures', 'FINAL', '2024-04-10', '09:00:00', '12:00:00', 'Hall A - Room 101', 'Semester 5', 'Computer Science'),
('DBMS', 'FINAL', '2024-04-12', '09:00:00', '12:00:00', 'Hall B - Room 201', 'Semester 5', 'Computer Science'),
('Operating Systems', 'FINAL', '2024-04-14', '14:00:00', '17:00:00', 'Hall A - Room 102', 'Semester 5', 'Computer Science'),
('Computer Networks', 'FINAL', '2024-04-16', '09:00:00', '12:00:00', 'Hall C - Room 301', 'Semester 5', 'Computer Science'),
('Software Engineering', 'FINAL', '2024-04-18', '14:00:00', '17:00:00', 'Hall B - Room 202', 'Semester 5', 'Computer Science');

-- Sample assignments
INSERT IGNORE INTO assignments (student_id, title, subject, description, due_date, status, priority) VALUES
(1, 'Binary Tree Implementation', 'Data Structures', 'Implement AVL tree with all operations', '2024-02-15', 'PENDING', 'HIGH'),
(1, 'ER Diagram for Hospital DB', 'DBMS', 'Design complete ER diagram', '2024-02-18', 'SUBMITTED', 'MEDIUM'),
(1, 'Process Scheduling Simulation', 'Operating Systems', 'Simulate Round Robin scheduling', '2024-02-20', 'PENDING', 'HIGH'),
(1, 'Socket Programming', 'Computer Networks', 'TCP client-server chat app', '2024-02-25', 'PENDING', 'MEDIUM');

-- Sample fees
INSERT IGNORE INTO fees (student_id, fee_type, amount, paid, status, semester, due_date) VALUES
(1, 'Tuition Fee', 45000, 45000, 'PAID', 'Semester 5', '2024-01-31'),
(1, 'Hostel Fee', 25000, 25000, 'PAID', 'Semester 5', '2024-01-31'),
(1, 'Exam Fee', 2500, 0, 'PENDING', 'Semester 5', '2024-03-15'),
(1, 'Library Fee', 1000, 500, 'PARTIAL', 'Semester 5', '2024-02-28');

-- Sample notifications
INSERT IGNORE INTO notifications (student_id, title, message, type, is_read, created_at) VALUES
(1, 'Exam Schedule Released', 'Final exam timetable for Semester 5 is now available.', 'INFO', 0, NOW()),
(1, 'Assignment Due Tomorrow', 'Binary Tree Implementation is due tomorrow!', 'WARNING', 0, NOW()),
(1, 'Attendance Alert', 'Your OS attendance is below 75%. Please attend classes.', 'DANGER', 0, NOW()),
(1, 'Fee Payment Reminder', 'Exam fee of Rs.2500 is due on March 15.', 'WARNING', 1, NOW()),
(1, 'Result Published', 'Mid-term results for Semester 5 are published.', 'SUCCESS', 1, NOW());
