package com.smartdashboard.repository;

import com.smartdashboard.model.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByStudentId(Long studentId);
    List<Assignment> findByStudentIdAndStatus(Long studentId, String status);
}
