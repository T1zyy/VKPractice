package tradehub.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import tradehub.backend.model.CreateFavourite;

@Data
@Entity
@Getter
@Setter
@Table
public class Favourite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    private Long advertisementId;

    public Favourite(CreateFavourite createFavourite) {
        this.userId = createFavourite.getUserId();
        this.advertisementId = createFavourite.getAdvertisementId();
        this.id = null;
    }
}
