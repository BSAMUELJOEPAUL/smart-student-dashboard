package com.smartdashboard.controller;

import com.smartdashboard.model.Student;
import com.smartdashboard.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/student")
@CrossOrigin(origins = "*")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping("/{id}")
    public ResponseEntity<Student> getProfile(@PathVariable Long id) {
        Student s = studentService.getById(id);
        s.setPassword(null);
        return ResponseEntity.ok(s);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Student> updateProfile(@PathVariable Long id, @RequestBody Student student) {
        Student updated = studentService.update(id, student);
        updated.setPassword(null);
        return ResponseEntity.ok(updated);
    }
}
