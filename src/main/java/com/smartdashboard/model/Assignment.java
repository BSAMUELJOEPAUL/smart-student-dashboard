package com.smartdashboard.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "assignments")
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String title;
    private String subject;
    private String description;
    private LocalDate dueDate;
    private String status; // PENDING, SUBMITTED, GRADED
    private String priority; // LOW, MEDIUM, HIGH
}
