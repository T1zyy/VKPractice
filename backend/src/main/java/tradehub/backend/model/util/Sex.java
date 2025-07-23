package tradehub.backend.model.util;

public enum Sex {
    FEMALE(1),
    MALE(2);

    private final int code;

    Sex(int code) {
        this.code = code;
    }

    public int getCode() {
        return code;
    }

    public static Sex fromCode(int code) {
        for (Sex sex : values()) {
            if (sex.code == code) return sex;
        }
        throw new IllegalArgumentException("Unknown sex code: " + code);
    }

    public static Sex getSexFromString(String sex) {
        if (sex.equalsIgnoreCase("female")) return FEMALE;
        if (sex.equalsIgnoreCase("male")) return MALE;
        return null;
    }
}