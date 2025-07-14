package tradehub.backend.util;

import org.springframework.data.jpa.domain.Specification;
import tradehub.backend.entity.Advertisement;

public class AdvertisementSpecification {
    public static Specification<Advertisement> hasPlace(String place) {
        return (root, query, builder) ->
                place == null || place.isBlank() ? null : builder.like(builder.lower(root.get("city")), "%" + place.toLowerCase() + "%");
    }

    public static Specification<Advertisement> hasKeyword(String keyword) {
        return (root, query, builder) ->
                keyword == null || keyword.isBlank() ? null : builder.like(builder.lower(root.get("keyword")), "%" + keyword.toLowerCase() + "%");
    }

    public static Specification<Advertisement> isAvailable(Boolean available) {
        return (root, query, builder) -> {
            if (available == null) return null;
            return builder.equal(root.get("available"), available);
        };
    }
}
