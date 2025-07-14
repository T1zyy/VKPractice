package tradehub.backend.model;

import lombok.Data;

@Data
public class ReadStatusMessage {
    private Long chatId;
    private Long readerId;
}