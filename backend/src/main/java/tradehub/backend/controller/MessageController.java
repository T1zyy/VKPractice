package tradehub.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import tradehub.backend.model.ChatMessage;
import tradehub.backend.model.ReadStatusMessage;
import tradehub.backend.model.TypingMessage;
import tradehub.backend.service.ChatService;
import tradehub.backend.service.MessageService;

import java.time.LocalDateTime;

@Controller
@RequiredArgsConstructor
public class MessageController {
    private final MessageService messageService;
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.send")
    public void sendMessage(@Valid @Payload ChatMessage message) {
        message.setCreatedAt(LocalDateTime.now());
        messageService.saveMessage(message);
        chatService.updateLastMessage(message.getChatId(), message.getText(), message.getCreatedAt());
        messagingTemplate.convertAndSend("/topic/chat/" + message.getChatId(), message);
    }

    @MessageMapping("/chat.typing")
    public void typing(@Payload TypingMessage typingMessage) {
        messagingTemplate.convertAndSend(
                "/topic/chat/" + typingMessage.getChatId() + "/typing",
                typingMessage
        );
    }

    @MessageMapping("/chat.read")
    public void markAsRead(@Payload ReadStatusMessage message) {
        messageService.markMessagesAsRead(message.getChatId(), message.getReaderId());
        messagingTemplate.convertAndSend("/topic/chat/" + message.getChatId() + "/read", message);
    }
}