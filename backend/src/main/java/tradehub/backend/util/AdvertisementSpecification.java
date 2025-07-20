package tradehub.backend.util;

import org.springframework.data.jpa.domain.Specification;
import tradehub.backend.entity.Advertisement;

public class AdvertisementSpecification {

    public static Specification<Advertisement> hasPlace(String place) {
        return (root, query, builder) ->
                (place == null || place.isBlank()) ? null :
                        builder.like(builder.lower(root.get("address")), "%" + place.toLowerCase() + "%");
    }

    public static Specification<Advertisement> hasKeyword(String keyword) {
        return (root, query, builder) ->
                (keyword == null || keyword.isBlank()) ? null :
                        builder.or(
                                builder.like(builder.lower(root.get("title")), "%" + keyword.toLowerCase() + "%"),
                                builder.like(builder.lower(root.get("description")), "%" + keyword.toLowerCase() + "%")
                        );
    }

    public static Specification<Advertisement> isAvailable(Boolean available) {
        return (root, query, builder) ->
                available == null ? null : builder.equal(root.get("available"), available);
    }
}