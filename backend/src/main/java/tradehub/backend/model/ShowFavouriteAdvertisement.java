package tradehub.backend.model;

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

    public ShowFavouriteAdvertisement(ShowAdvertisement showAdvertisement, Long favouriteId) {
        this.favouriteId = favouriteId;
        this.title = showAdvertisement.getTitle();
        this.description = showAdvertisement.getDescription();
        this.price = showAdvertisement.getPrice();
        this.weight = showAdvertisement.getWeight();
        this.address = showAdvertisement.getAddress();
    }
}