package tradehub.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowAdvertisement {
    private String title;
    private String description;
    private BigDecimal price;
    private Float weight;
    private String address;
}
