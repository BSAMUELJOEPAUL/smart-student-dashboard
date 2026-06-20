package com.smartdashboard.repository;

import com.smartdashboard.model.Fee;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface FeeRepository extends JpaRepository<Fee, Long> {
    List<Fee> findByStudentId(Long studentId);
    List<Fee> findByStudentIdAndSemester(Long studentId, String semester);
}
