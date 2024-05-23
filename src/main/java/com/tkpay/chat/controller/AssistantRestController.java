package com.tkpay.chat.controller;

import com.tkpay.chat.dto.SendMessageRequest;
import com.tkpay.chat.service.ChatGPTAssistantService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@Slf4j
public class AssistantRestController {

    @Autowired
    ChatGPTAssistantService chatGPTAssistantService;
    @Value("${chatgpt.assistant.id}")
    private String assistantId;

    @Value("${chatgpt.thread.id}")
    private String threadId;

    @PostMapping("/sendMessage")
    public ResponseEntity<?> sendMessage(@RequestBody SendMessageRequest sendMessageRequest) {
        Map<String, Object> responseMap = chatGPTAssistantService.sendMessageToThread(sendMessageRequest.getMessage(),
                assistantId, threadId);
        return new ResponseEntity<>(responseMap, HttpStatus.OK);
    }
}