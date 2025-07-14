package tradehub.backend.model;

import lombok.Data;

@Data
public class TypingMessage {
    private Long chatId;
    private Long senderId;
    private boolean typing;
}