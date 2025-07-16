package tradehub.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tradehub.backend.model.Sex;
import tradehub.backend.model.UserProfile;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "user")
@NoArgsConstructor
@Setter
@Getter
public class User {
    @Id
    @Column(nullable = false, unique = true)
    private Long id;
    @Column(nullable = false)
    private String firstName;
    @Column(nullable = false)
    private String lastName;
    @Column(nullable = false)
    private String city;
    @Column(nullable = false)
    private Sex sex;
    @Column(nullable = false)
    private BigDecimal balance;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false)
    private String photoUrl;

    public User(UserProfile userProfile) {
        this.photoUrl = userProfile.getPhotoUrl();
        this.balance = BigDecimal.ZERO;
        this.sex = Sex.getSexFromString(userProfile.getSex());
        this.city = userProfile.getCity();
        this.createdAt = LocalDateTime.now();
        this.firstName = userProfile.getFirstName();
        this.lastName = userProfile.getLastName();
    }
}
