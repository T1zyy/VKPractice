package tradehub.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import tradehub.backend.entity.Chat;
import tradehub.backend.model.message.ChatMessage;
import tradehub.backend.model.chat.CreateChat;
import tradehub.backend.service.ChatService;
import tradehub.backend.service.MessageService;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class ChatController {
    private final ChatService chatService;
    private final MessageService messageService;

    @GetMapping("/chat")
    public List<Chat> getChats(Authentication auth) {
        String userId = (String) auth.getPrincipal();
        return chatService.getChatsForUser(Long.parseLong(userId));
    }

    @GetMapping("/chat/{secondUserId}")
    public Page<ChatMessage> getChat(
            @PathVariable long secondUserId,
            @RequestParam int page,
            Authentication auth) {
        String firstUserId = (String) auth.getPrincipal();
        return messageService.getAllMassageInChat(Long.parseLong(firstUserId), secondUserId, page);
    }

    @PostMapping("/chat")
    public Chat createChat(@Valid @RequestBody long secondUserId, Authentication auth) {
        long firstUserId = Long.parseLong((String) auth.getPrincipal());
        return chatService.findOrCreateChat(firstUserId, secondUserId);
    }
}
