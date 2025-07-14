package tradehub.backend.util;

import org.springframework.data.jpa.domain.Specification;
import tradehub.backend.entity.Message;

public class MessageSpecification {
    public static Specification<Message> betweenUsers(Long userA, Long userB) {
        return (root, query, builder) -> builder.or(
                builder.and(
                        builder.equal(root.get("senderId"), userA),
                        builder.equal(root.get("receiverId"), userB)
                ),
                builder.and(
                        builder.equal(root.get("senderId"), userB),
                        builder.equal(root.get("receiverId"), userA)
                )
        );
    }
}
