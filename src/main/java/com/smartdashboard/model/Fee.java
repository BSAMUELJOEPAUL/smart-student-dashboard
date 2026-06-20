package com.smartdashboard.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "fees")
public class Fee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String feeType; // TUITION, HOSTEL, EXAM, LIBRARY
    private double amount;
    private double paid;
    private String status; // PAID, PENDING, PARTIAL
    private String semester;
    private String dueDate;
}
