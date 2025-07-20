package tradehub.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TypingMessage {
    private Long chatId;
    private Long senderId;
    private boolean typing;
}