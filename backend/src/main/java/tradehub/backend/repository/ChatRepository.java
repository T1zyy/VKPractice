package tradehub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tradehub.backend.entity.Chat;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query("SELECT c FROM Chat c WHERE c.firstUserId = :userId ORDER BY c.lastMessageTime ASC")
    List<Chat> findChatsSorted(@Param("userId") Long userId);

    @Query("""
    SELECT c FROM Chat c
    WHERE (c.firstUserId = :user1 AND c.secondUserId = :user2)
       OR (c.firstUserId = :user2 AND c.secondUserId = :user1)
""")
    Optional<Chat> findChatBetweenUsers(@Param("user1") long user1, @Param("user2") long user2);}
