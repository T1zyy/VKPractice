package tradehub.backend.model.advertisement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowLentAdvertisement {
    private String title;
    private BigDecimal price;
    private Float weight;
    private String address;
}
