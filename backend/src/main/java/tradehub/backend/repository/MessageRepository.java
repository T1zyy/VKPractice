package tradehub.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tradehub.backend.entity.Message;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    Page<Message> findAll(Specification<Message> specification, Pageable pageable);

    @Query("SELECT m FROM Message m WHERE m.chatId = :chatId AND m.recipientId = :recipientId AND m.read = false")
    List<Message> findUnreadMessages(@Param("chatId") Long chatId, @Param("recipientId") Long recipientId);
}
