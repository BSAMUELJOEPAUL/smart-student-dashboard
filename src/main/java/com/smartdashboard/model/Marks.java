package com.smartdashboard.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "marks")
public class Marks {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String subject;
    private String examType; // MID1, MID2, FINAL
    private double marksObtained;
    private double maxMarks;
    private String semester;
    private String grade;
}
