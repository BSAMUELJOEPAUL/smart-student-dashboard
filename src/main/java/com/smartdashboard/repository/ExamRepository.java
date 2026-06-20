package com.smartdashboard.repository;

import com.smartdashboard.model.Exam;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ExamRepository extends JpaRepository<Exam, Long> {
    List<Exam> findBySemesterAndDepartment(String semester, String department);
    List<Exam> findByDepartment(String department);
}
