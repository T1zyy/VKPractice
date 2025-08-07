package tradehub.backend.model.advertisement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowFavouriteAdvertisement {
    private Long favouriteId;
    private String title;
    private String description;
    private BigDecimal price;
    private Float weight;
    private String address;
    private String contacts;

    public ShowFavouriteAdvertisement(ShowLentAdvertisement showAdvertisement, Long favouriteId) {
        this.favouriteId = favouriteId;
        this.title = showAdvertisement.getTitle();
        this.price = showAdvertisement.getPrice();
        this.weight = showAdvertisement.getWeight();
        this.address = showAdvertisement.getAddress();
    }
}