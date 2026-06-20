package com.smartdashboard.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
@Entity
@Table(name = "exams")
public class Exam {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String subject;
    private String examType;
    private LocalDate examDate;
    private LocalTime startTime;
    private LocalTime endTime;
    private String venue;
    private String semester;
    private String department;
}
