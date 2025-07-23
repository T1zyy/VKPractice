package tradehub.backend.model.advertisement;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.server.core.Relation;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Relation(collectionRelation = "showAdvertisementList")
public class ShowLentAdvertisement {
    private long id;
    private String title;
    private BigDecimal price;
    private Float weight;
    private String address;
}
