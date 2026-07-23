package com.aicreatorstudio.backend.controller;

import com.aicreatorstudio.backend.dto.ImageRequest;
import com.aicreatorstudio.backend.entity.ImageHistory;
import com.aicreatorstudio.backend.repository.ImageHistoryRepository;

import org.springframework.web.bind.annotation.*;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/ai")
public class AIController {

	private final ImageHistoryRepository imageHistoryRepository;

    public AIController(ImageHistoryRepository imageHistoryRepository) {
        this.imageHistoryRepository = imageHistoryRepository;
    }
    
    @PostMapping("/generate-image")
    public Map<String, String> generateImage(
            @RequestBody ImageRequest request) {

        String encodedPrompt =
                URLEncoder.encode(request.getPrompt(), StandardCharsets.UTF_8);

        String imageUrl =
                "https://image.pollinations.ai/prompt/" + encodedPrompt;

        ImageHistory history = new ImageHistory();

        history.setPrompt(request.getPrompt());
        history.setImageUrl(imageUrl);
        history.setUserEmail("demo@user.com");
        history.setCreatedAt(LocalDateTime.now());

        imageHistoryRepository.save(history);

        Map<String, String> response = new HashMap<>();
        response.put("imageUrl", imageUrl);

        return response;
    }
    
    @GetMapping("/history")
    public List<ImageHistory> getHistory() {
        return imageHistoryRepository.findAll();
    }

}