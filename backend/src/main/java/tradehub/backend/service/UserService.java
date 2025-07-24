package tradehub.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tradehub.backend.model.user.CreateUser;
import tradehub.backend.util.Mapper;
import tradehub.backend.entity.UserEntity;
import tradehub.backend.model.user.UserProfile;
import tradehub.backend.repository.UserRepository;

import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final Mapper mapper;

    public UserProfile getUserProfileByUserId(Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return mapper.userToUserProfile(user);
    }

    public UserEntity getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Optional<UserEntity> findUserById(long userId) {
        return userRepository.findById(userId);
    }

    public void saveUser(CreateUser user) {
        var temp = new UserEntity(user);
        userRepository.save(temp);
    }

    public void saveUser(UserEntity user) {
        userRepository.save(user);
    }
}
