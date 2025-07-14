package tradehub.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import tradehub.backend.model.Sex;

import java.math.BigDecimal;

@Data
@Entity
@Table
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
}
