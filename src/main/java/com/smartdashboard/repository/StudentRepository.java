package com.smartdashboard.repository;

import com.smartdashboard.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, Long> {
    Optional<Student> findByEmail(String email);
    Optional<Student> findByResetToken(String token);
    boolean existsByEmail(String email);
}
