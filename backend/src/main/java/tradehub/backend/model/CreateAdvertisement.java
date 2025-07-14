package tradehub.backend.model;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class CreateAdvertisement {
    private String title;
    private String description;
    private BigDecimal price;
    private String address;
    private Float weight;
}
