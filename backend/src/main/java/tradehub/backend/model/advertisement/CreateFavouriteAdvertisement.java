package tradehub.backend.model.advertisement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateFavouriteAdvertisement {
    private Long userId;
    private Long advertisementId;
}
