package com.smartdashboard.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "students")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String fullName;

    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    private String password;

    private String rollNumber;
    private String department;
    private String semester;
    private String phone;
    private String profilePic;
    private String role = "STUDENT";

    private String resetToken;
    private LocalDateTime resetTokenExpiry;

    @Column(updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
