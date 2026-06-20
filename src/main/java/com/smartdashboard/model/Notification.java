package com.smartdashboard.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "notifications")
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long studentId;
    private String title;
    private String message;
    private String type; // INFO, WARNING, SUCCESS, DANGER
    private boolean isRead = false;
    private LocalDateTime createdAt = LocalDateTime.now();
}
