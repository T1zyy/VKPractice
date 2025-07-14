package tradehub.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class ChatMessage {
    private final String text;
    private final Long sender;
    private final Long recipient;
    private Long chatId;
    private LocalDateTime createdAt;
    private Boolean read;
}
