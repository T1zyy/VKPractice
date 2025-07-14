package tradehub.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import tradehub.backend.entity.Message;
import tradehub.backend.model.ChatMessage;
import tradehub.backend.repository.MessageRepository;
import tradehub.backend.util.Mapper;
import tradehub.backend.util.MessageSpecification;

import java.util.List;


@Service
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;
    private final Mapper mapper;

    public Page<ChatMessage> getAllMassageInChat(long firstUserId, long secondUserId, int page) {
        Pageable pageable = PageRequest.of(page, 30, Sort.by(Sort.Direction.ASC, "createdAt"));
        Specification<Message> specification = MessageSpecification.betweenUsers(firstUserId, secondUserId);
        Page<Message> messages = messageRepository.findAll(specification, pageable);
        return messages.map(mapper::messageToChatMessage);
    }

    public void saveMessage(ChatMessage message) {
        messageRepository.save(mapper.chatMessageToMessage(message));
    }

    @Transactional
    public void markMessagesAsRead(Long chatId, Long readerId) {
        List<Message> unreadMessages = messageRepository.findUnreadMessages(chatId, readerId);

        for (Message message : unreadMessages) {
            message.setRead(true);
        }

        messageRepository.saveAll(unreadMessages);
    }
}
