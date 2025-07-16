package tradehub.backend.model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ShowFavouriteAdvertisement {
    private final Long favouriteId;
    private final String title;
    private final String description;
    private final BigDecimal price;
    private final Float weight;
    private final String address;

    public ShowFavouriteAdvertisement(ShowAdvertisement showAdvertisement, Long favouriteId) {
        this.favouriteId = favouriteId;
        this.title = showAdvertisement.getTitle();
        this.description = showAdvertisement.getDescription();
        this.price = showAdvertisement.getPrice();
        this.weight = showAdvertisement.getWeight();
        this.address = showAdvertisement.getAddress();
    }
}