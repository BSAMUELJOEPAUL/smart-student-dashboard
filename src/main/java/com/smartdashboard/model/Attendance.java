package com.smartdashboard.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "attendance")
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String subject;
    private LocalDate date;
    private String status; // PRESENT, ABSENT, LATE

    @Column(name = "total_classes")
    private int totalClasses;

    @Column(name = "attended_classes")
    private int attendedClasses;
}
