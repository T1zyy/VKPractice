package tradehub.backend.model.advertisement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import tradehub.backend.model.util.Category;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateAdvertisement {
    private String title;
    private String description;
    private BigDecimal price;
    private String address;
    private Float weight;
    private Category category;
}
