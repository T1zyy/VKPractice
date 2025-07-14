package tradehub.backend.model;

import lombok.Data;
import java.math.BigDecimal;

@Data
public class ShowAdvertisement {
    private final String title;
    private final String description;
    private final BigDecimal price;
    private final Float weight;
    private final String address;
}
