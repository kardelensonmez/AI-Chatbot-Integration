package com.tkpay.chat.dto;

import lombok.Data;

@Data
public class ChatGPTCreateMessageRequest {
    private String role;
    private String content;
}
