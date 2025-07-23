package tradehub.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tradehub.backend.model.advertisement.CreateFavouriteAdvertisement;

@Data
@Entity
@Getter
@Setter
@Table(name = "favourite")
@NoArgsConstructor
public class Favourite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    private Long advertisementId;

    public Favourite(CreateFavouriteAdvertisement createFavourite) {
        this.userId = createFavourite.getUserId();
        this.advertisementId = createFavourite.getAdvertisementId();
        this.id = null;
    }
}
