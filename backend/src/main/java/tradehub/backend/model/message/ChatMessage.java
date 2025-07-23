package tradehub.backend.model.message;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessage {
    private String text;
    private Long sender;
    private Long recipient;
    private Long chatId;
    private LocalDateTime createdAt;
    private Boolean read;
}
