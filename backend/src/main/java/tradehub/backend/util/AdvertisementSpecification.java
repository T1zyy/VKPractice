package tradehub.backend.util;

import org.springframework.data.jpa.domain.Specification;
import tradehub.backend.entity.Advertisement;

public class AdvertisementSpecification {

    public static Specification<Advertisement> hasPlace(String place) {
        return (root, query, cb) -> {
            if (place == null || place.trim().isEmpty()) return cb.conjunction();
            return cb.like(cb.lower(root.get("address")), "%" + place.toLowerCase() + "%");
        };
    }

    public static Specification<Advertisement> hasKeyword(String keyword) {
        return (root, query, cb) -> {
            if (keyword == null || keyword.trim().isEmpty()) return cb.conjunction();
            return cb.or(
                    cb.like(cb.lower(root.get("title")), "%" + keyword.toLowerCase() + "%"),
                    cb.like(cb.lower(root.get("description")), "%" + keyword.toLowerCase() + "%")
            );
        };
    }

    public static Specification<Advertisement> isAvailable(boolean available) {
        return (root, query, cb) -> cb.equal(root.get("available"), available);
    }
}