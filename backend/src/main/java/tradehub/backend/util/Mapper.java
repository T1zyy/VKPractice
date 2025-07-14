package tradehub.backend.util;

import org.springframework.stereotype.Component;
import tradehub.backend.entity.Advertisement;
import tradehub.backend.entity.Message;
import tradehub.backend.entity.User;
import tradehub.backend.model.ChatMessage;
import tradehub.backend.model.ShowAdvertisement;
import tradehub.backend.model.UserProfile;

@Component
public class Mapper {
    public UserProfile userToUserProfile(User user) {
        return new UserProfile(user.getFirstName(), user.getLastName(), user.getCity(), user.getSex().toString());
    }

    public ChatMessage messageToChatMessage(Message message) {
        return new ChatMessage(message.getText(), message.getSenderId(), message.getRecipientId(), message.getChatId(), message.getCreatedAt(), message.getRead());
    }

    public ShowAdvertisement advertisementToShowAdvertisement(Advertisement advertisement) {
        return new ShowAdvertisement(advertisement.getTitle(), advertisement.getDescription(), advertisement.getPrice(), advertisement.getWeight(), advertisement.getAddress());
    }

    public Message chatMessageToMessage(ChatMessage chatMessage) {
        var message = new Message();
        message.setText(chatMessage.getText());
        message.setSenderId(chatMessage.getSender());
        message.setRecipientId(chatMessage.getRecipient());
        message.setCreatedAt(chatMessage.getCreatedAt());
        message.setRead(false);
        message.setChatId(chatMessage.getChatId());
        return message;
    }
}
