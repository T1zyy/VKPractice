package tradehub.backend.model;

import lombok.Data;

@Data
public class CreateChat {
    private final Long firstUserId;
    private final Long secondUserId;
}
