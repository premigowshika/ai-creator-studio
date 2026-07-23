package com.aicreatorstudio.backend.repository;

import com.aicreatorstudio.backend.entity.ImageHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ImageHistoryRepository
        extends JpaRepository<ImageHistory, Long> {

    List<ImageHistory> findByUserEmailOrderByCreatedAtDesc(String userEmail);

}