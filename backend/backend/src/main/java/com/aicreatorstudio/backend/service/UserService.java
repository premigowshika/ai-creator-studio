package com.aicreatorstudio.backend.service;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.aicreatorstudio.backend.dto.LoginRequest;
import com.aicreatorstudio.backend.dto.LoginResponse;
import com.aicreatorstudio.backend.dto.RegisterRequest;
import com.aicreatorstudio.backend.entity.User;
import com.aicreatorstudio.backend.repository.UserRepository;
import com.aicreatorstudio.backend.security.JwtService;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtService jwtService) {
    	this.userRepository = userRepository;
    	this.passwordEncoder = passwordEncoder;
    	this.jwtService = jwtService;
    }

    public String registerUser(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already registered";
        }

        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setEmail(request.getEmail());

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "User registered successfully";
    }
    
    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtService.generateToken(user.getEmail());

        return new LoginResponse(token, "Login successful");
    }
}