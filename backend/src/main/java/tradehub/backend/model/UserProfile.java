package tradehub.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserProfile {
    private String firstName;
    private String lastName;
    private String city;
    private String sex;
    private String photoUrl;
}
