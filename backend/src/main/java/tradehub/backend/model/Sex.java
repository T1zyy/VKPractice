package tradehub.backend.model;

public enum Sex {
    Female,
    Male;

    public static Sex getSexFromString(String sex) {
        if (sex.equalsIgnoreCase("female")) {
            return Female;
        } else if (sex.equalsIgnoreCase("male")) {
            return Male;
        }
        return null;
    }
}
