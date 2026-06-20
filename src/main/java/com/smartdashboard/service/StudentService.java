package com.smartdashboard.service;

import com.smartdashboard.model.Student;
import com.smartdashboard.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    public Student register(Student student) {
        if (studentRepository.existsByEmail(student.getEmail()))
            throw new RuntimeException("Email already registered");
        student.setPassword(passwordEncoder.encode(student.getPassword()));
        return studentRepository.save(student);
    }

    public Optional<Student> login(String email, String rawPassword) {
        return studentRepository.findByEmail(email)
                .filter(s -> passwordEncoder.matches(rawPassword, s.getPassword()));
    }

    public Student getById(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public Student update(Long id, Student updated) {
        Student s = getById(id);
        s.setFullName(updated.getFullName());
        s.setPhone(updated.getPhone());
        s.setDepartment(updated.getDepartment());
        s.setSemester(updated.getSemester());
        if (updated.getProfilePic() != null) s.setProfilePic(updated.getProfilePic());
        return studentRepository.save(s);
    }

    public void sendPasswordReset(String email) {
        Student s = studentRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Email not found"));
        String token = UUID.randomUUID().toString();
        s.setResetToken(token);
        s.setResetTokenExpiry(LocalDateTime.now().plusHours(1));
        studentRepository.save(s);
        emailService.sendResetEmail(email, token);
    }

    public void resetPassword(String token, String newPassword) {
        Student s = studentRepository.findByResetToken(token)
                .orElseThrow(() -> new RuntimeException("Invalid token"));
        if (s.getResetTokenExpiry().isBefore(LocalDateTime.now()))
            throw new RuntimeException("Token expired");
        s.setPassword(passwordEncoder.encode(newPassword));
        s.setResetToken(null);
        s.setResetTokenExpiry(null);
        studentRepository.save(s);
    }
}
