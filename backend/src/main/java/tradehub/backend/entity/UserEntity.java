package tradehub.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import tradehub.backend.model.user.CreateUser;
import tradehub.backend.model.util.Sex;
import tradehub.backend.model.user.UserProfile;
import tradehub.backend.util.SexConverter;

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
    @Convert(converter = SexConverter.class)
    @Column(nullable = false)
    private Sex sex;
    @Column(nullable = false)
    private BigDecimal balance;
    @Column(nullable = false)
    private LocalDateTime createdAt;
    @Column(nullable = false, length = 1024)
    private String photoUrl;

    public UserEntity(CreateUser createUser) {
        this.photoUrl = createUser.getPhotoUrl();
        this.balance = BigDecimal.ZERO;
        this.city = createUser.getCity();
        this.createdAt = LocalDateTime.now();
        this.firstName = createUser.getFirstName();
        this.lastName = createUser.getLastName();
        this.sex = Sex.getSexFromString(createUser.getSex());
        this.id = createUser.getId();
    }
}
