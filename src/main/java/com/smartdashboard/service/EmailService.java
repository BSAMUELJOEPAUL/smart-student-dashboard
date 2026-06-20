package com.smartdashboard.service;

import org.springframework.stereotype.Service;

@Service
public class EmailService {

    public void sendResetEmail(String to, String token) {
        // Mail is disabled by default. To enable, configure SMTP in application.properties
        // and replace this stub with JavaMailSender implementation.
        System.out.println("Password reset token for " + to + ": " + token);
        System.out.println("Reset URL: http://localhost:8080/pages/reset-password.html?token=" + token);
    }
}
