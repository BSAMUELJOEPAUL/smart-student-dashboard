package com.smartdashboard.controller;

import com.smartdashboard.model.*;
import com.smartdashboard.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    // Attendance
    @GetMapping("/attendance/{studentId}")
    public List<Attendance> getAttendance(@PathVariable Long studentId) {
        return dashboardService.getAttendance(studentId);
    }

    @PostMapping("/attendance")
    public Attendance saveAttendance(@RequestBody Attendance a) {
        return dashboardService.saveAttendance(a);
    }

    // Marks
    @GetMapping("/marks/{studentId}")
    public List<Marks> getMarks(@PathVariable Long studentId) {
        return dashboardService.getMarks(studentId);
    }

    @PostMapping("/marks")
    public Marks saveMarks(@RequestBody Marks m) {
        return dashboardService.saveMarks(m);
    }

    // Assignments
    @GetMapping("/assignments/{studentId}")
    public List<Assignment> getAssignments(@PathVariable Long studentId) {
        return dashboardService.getAssignments(studentId);
    }

    @PostMapping("/assignments")
    public Assignment saveAssignment(@RequestBody Assignment a) {
        return dashboardService.saveAssignment(a);
    }

    @PutMapping("/assignments/{id}/status")
    public Assignment updateStatus(@PathVariable Long id, @RequestBody Map<String, String> body) {
        return dashboardService.updateAssignmentStatus(id, body.get("status"));
    }

    @DeleteMapping("/assignments/{id}")
    public ResponseEntity<?> deleteAssignment(@PathVariable Long id) {
        dashboardService.deleteAssignment(id);
        return ResponseEntity.ok(Map.of("message", "Deleted"));
    }

    // Exams
    @GetMapping("/exams")
    public List<Exam> getExams(@RequestParam String dept, @RequestParam String sem) {
        return dashboardService.getExams(dept, sem);
    }

    // Notifications
    @GetMapping("/notifications/{studentId}")
    public List<Notification> getNotifications(@PathVariable Long studentId) {
        return dashboardService.getNotifications(studentId);
    }

    @GetMapping("/notifications/{studentId}/unread")
    public Map<String, Long> getUnreadCount(@PathVariable Long studentId) {
        return Map.of("count", dashboardService.getUnreadCount(studentId));
    }

    @PutMapping("/notifications/{studentId}/read")
    public ResponseEntity<?> markRead(@PathVariable Long studentId) {
        dashboardService.markAllRead(studentId);
        return ResponseEntity.ok(Map.of("message", "Marked as read"));
    }

    // Fees
    @GetMapping("/fees/{studentId}")
    public List<Fee> getFees(@PathVariable Long studentId) {
        return dashboardService.getFees(studentId);
    }
}
