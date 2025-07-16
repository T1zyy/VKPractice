package tradehub.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import tradehub.backend.model.Category;
import tradehub.backend.model.CreateAdvertisement;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table
public class Advertisement {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long userId;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;
    @Column(nullable = false)
    private BigDecimal price;
    @Column(nullable = false)
    private Float weight;
    @Column(nullable = false)
    private Boolean available;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private LocalDateTime updatedAt;
    @Column(nullable = false)
    private String address;
    @Column(nullable = false)
    private Integer views;
    @Column(nullable = false)
    private Integer likes;
    @Column(nullable = false)
    private Category category;

    public Advertisement(CreateAdvertisement createAdvertisement, Long userId) {
        this.userId = userId;
        this.title = createAdvertisement.getTitle();
        this.description = createAdvertisement.getDescription();
        this.price = createAdvertisement.getPrice();
        this.weight = createAdvertisement.getWeight();
        this.address = createAdvertisement.getAddress();
        this.views = 0;
        this.likes = 0;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
        this.category = createAdvertisement.getCategory();
        this.available = false;
    }
}
