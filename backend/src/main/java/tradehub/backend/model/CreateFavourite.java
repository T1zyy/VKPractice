package tradehub.backend.model;

import lombok.Data;

@Data
public class CreateFavourite {
    private final Long userId;
    private final Long advertisementId;
}
