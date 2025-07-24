package tradehub.backend.model.user;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreateUser {
    private Long id;
    private String firstName;
    private String lastName;
    private String city;
    private String sex;
    private String photoUrl;
}
