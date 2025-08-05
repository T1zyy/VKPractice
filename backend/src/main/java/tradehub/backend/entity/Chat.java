package tradehub.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "chat")
@NoArgsConstructor
@Setter
@Getter
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private Long firstUserId;
    @Column(nullable = false)
    private Long secondUserId;
    @Column(nullable = false)
    private String lastMessage;
    @Column(nullable = false)
    private LocalDateTime lastMessageTime;

    public Chat(Long firstUserId, Long secondUserId) {
        this.firstUserId = firstUserId;
        this.secondUserId = secondUserId;
        this.lastMessageTime = LocalDateTime.now();
        this.lastMessage = "";
    }
}
