package tradehub.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tradehub.backend.model.Sex;
import tradehub.backend.util.Mapper;
import tradehub.backend.entity.User;
import tradehub.backend.model.UserProfile;
import tradehub.backend.repository.UserRepository;

import java.math.BigDecimal;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final Mapper mapper;

    public UserProfile getUserProfileByUserId(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return mapper.userToUserProfile(user);
    }

    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public UserProfile saveUser(UserProfile userProfile) {
        User user = new User(userProfile);
        userRepository.save(user);
        return mapper.userToUserProfile(user);
    }

    public void saveUser(User user) {
        userRepository.save(user);
    }
}
