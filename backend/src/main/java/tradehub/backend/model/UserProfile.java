package tradehub.backend.model;

import lombok.Data;

@Data
public class UserProfile {
    private final String firstName;
    private final String lastName;
    private final String city;
    private final String sex;
    private final String photoUrl;
}
