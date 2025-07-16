package tradehub.backend.model;

public enum Sex {
    FEMALE,
    MALE;

    public static Sex getSexFromString(String sex) {
        if (sex.equalsIgnoreCase("female")) {
            return FEMALE;
        } else if (sex.equalsIgnoreCase("male")) {
            return MALE;
        }
        return null;
    }
}
