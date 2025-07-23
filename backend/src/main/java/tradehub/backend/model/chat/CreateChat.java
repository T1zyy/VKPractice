package tradehub.backend.model.chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateChat {
    private Long firstUserId;
    private Long secondUserId;
}
