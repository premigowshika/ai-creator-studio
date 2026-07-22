package com.aicreatorstudio.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.aicreatorstudio.backend.dto.ApiResponse;
import com.aicreatorstudio.backend.dto.LoginRequest;
import com.aicreatorstudio.backend.dto.LoginResponse;
import com.aicreatorstudio.backend.dto.RegisterRequest;
import com.aicreatorstudio.backend.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse> register(
            @RequestBody @Valid RegisterRequest request) {

        String message = userService.registerUser(request);

        return ResponseEntity.ok(new ApiResponse(true, message));
    }
    
    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody @Valid LoginRequest request) {

        return ResponseEntity.ok(userService.login(request));
    }
}