package tradehub.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tradehub.backend.entity.Chat;
import tradehub.backend.model.chat.CreateChat;
import tradehub.backend.repository.ChatRepository;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRepository chatRepository;

    public List<Chat> getChatsForUser(long userId) {
        return chatRepository.findChatsSorted(userId);
    }

    public void findOrCreateChat(CreateChat chat) {
        chatRepository.findChatBetweenUsers(chat.getFirstUserId(), chat.getSecondUserId())
                .orElseGet(() -> {
                    Chat temp = new Chat(chat.getFirstUserId(), chat.getSecondUserId());
                    return chatRepository.save(temp);
                });
    }

    public void updateLastMessage(long chatId, String lastMessage, LocalDateTime time) {
        chatRepository.findById(chatId).ifPresent(chat -> {
            chat.setLastMessage(lastMessage);
            chat.setLastMessageTime(time);
            chatRepository.save(chat);
        });
    }
}
