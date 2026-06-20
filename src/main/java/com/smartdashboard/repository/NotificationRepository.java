package com.smartdashboard.repository;

import com.smartdashboard.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByStudentIdOrderByCreatedAtDesc(Long studentId);
    long countByStudentIdAndIsRead(Long studentId, boolean isRead);
}
