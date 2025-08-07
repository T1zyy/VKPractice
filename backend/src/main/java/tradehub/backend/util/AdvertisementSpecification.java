package tradehub.backend.util;

import org.springframework.data.jpa.domain.Specification;
import tradehub.backend.entity.Advertisement;

public class AdvertisementSpecification {

    public static Specification<Advertisement> hasKeyword(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.trim().isEmpty()) {
                return cb.conjunction();
            }
            String pattern = "%" + keyword.trim().toLowerCase() + "%";
            return cb.or(
                    cb.like(cb.lower(root.get("title")), pattern),
                    cb.like(cb.lower(root.get("description")), pattern)
            );
        };
    }

    public static Specification<Advertisement> hasPlace(String place) {
        return (root, query, cb) -> {
            if (place == null || place.trim().isEmpty()) {
                return cb.conjunction();
            }
            String pattern = "%" + place.trim().toLowerCase() + "%";
            return cb.like(cb.lower(root.get("address")), pattern);
        };
    }

    public static Specification<Advertisement> isAvailable(boolean available) {
        return (root, query, cb) -> cb.equal(root.get("available"), available);
    }
}