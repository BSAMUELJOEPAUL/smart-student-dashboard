package com.smartdashboard.service;

import com.smartdashboard.model.*;
import com.smartdashboard.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final AttendanceRepository attendanceRepo;
    private final MarksRepository marksRepo;
    private final AssignmentRepository assignmentRepo;
    private final ExamRepository examRepo;
    private final NotificationRepository notificationRepo;
    private final FeeRepository feeRepo;

    // Attendance
    public List<Attendance> getAttendance(Long studentId) {
        return attendanceRepo.findByStudentId(studentId);
    }
    public Attendance saveAttendance(Attendance a) { return attendanceRepo.save(a); }

    // Marks
    public List<Marks> getMarks(Long studentId) {
        return marksRepo.findByStudentId(studentId);
    }
    public Marks saveMarks(Marks m) { return marksRepo.save(m); }

    // Assignments
    public List<Assignment> getAssignments(Long studentId) {
        return assignmentRepo.findByStudentId(studentId);
    }
    public Assignment saveAssignment(Assignment a) { return assignmentRepo.save(a); }
    public Assignment updateAssignmentStatus(Long id, String status) {
        Assignment a = assignmentRepo.findById(id).orElseThrow();
        a.setStatus(status);
        return assignmentRepo.save(a);
    }
    public void deleteAssignment(Long id) { assignmentRepo.deleteById(id); }

    // Exams
    public List<Exam> getExams(String dept, String sem) {
        return examRepo.findBySemesterAndDepartment(sem, dept);
    }

    // Notifications
    public List<Notification> getNotifications(Long studentId) {
        return notificationRepo.findByStudentIdOrderByCreatedAtDesc(studentId);
    }
    public long getUnreadCount(Long studentId) {
        return notificationRepo.countByStudentIdAndIsRead(studentId, false);
    }
    public void markAllRead(Long studentId) {
        List<Notification> list = notificationRepo.findByStudentIdOrderByCreatedAtDesc(studentId);
        list.forEach(n -> n.setRead(true));
        notificationRepo.saveAll(list);
    }

    // Fees
    public List<Fee> getFees(Long studentId) {
        return feeRepo.findByStudentId(studentId);
    }
}
