package tradehub.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tradehub.backend.entity.Chat;
import tradehub.backend.repository.ChatRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;

    public List<Chat> getChatsForUser(Long userId) {
        return chatRepository.findChatsSorted(userId);
    }

    public void findOrCreateChat(Chat chat) {
        chatRepository.findChatBetweenUsers(chat.getFirstUserId(), chat.getSecondUserId())
                .orElseGet(() -> {
                    Chat temp = new Chat();
                    temp.setFirstUserId(chat.getFirstUserId());
                    temp.setSecondUserId(chat.getSecondUserId());
                    temp.setLastMessage("");
                    temp.setLastMessageTime(LocalDateTime.now());
                    return chatRepository.save(temp);
                });
    }

    public void updateLastMessage(Long chatId, String lastMessage, LocalDateTime time) {
        chatRepository.findById(chatId).ifPresent(chat -> {
            chat.setLastMessage(lastMessage);
            chat.setLastMessageTime(time);
            chatRepository.save(chat);
        });
    }
}
