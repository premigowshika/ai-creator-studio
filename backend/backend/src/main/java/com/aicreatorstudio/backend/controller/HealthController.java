package com.aicreatorstudio.backend.controller;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HealthController {

    @GetMapping("/api/health")
    public Map<String, Object> health() {

        Map<String, Object> response = new LinkedHashMap<>();

        response.put("status", "UP");
        response.put("application", "AI Creator Studio");
        response.put("version", "1.0.0");
        response.put("timestamp", LocalDateTime.now());

        return response;
    }
}