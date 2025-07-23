package tradehub.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tradehub.backend.model.util.Sex;
import tradehub.backend.model.user.UserProfile;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "users")
@NoArgsConstructor
@Setter
@Getter
public class UserEntity {
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
    @Column(nullable = false, length = 1024)
    private String photoUrl;

    public UserEntity(UserProfile userProfile) {
        this.photoUrl = userProfile.getPhotoUrl();
        this.balance = BigDecimal.ZERO;
        this.sex = Sex.getSexFromString(userProfile.getSex());
        this.city = userProfile.getCity();
        this.createdAt = LocalDateTime.now();
        this.firstName = userProfile.getFirstName();
        this.lastName = userProfile.getLastName();
    }
}
