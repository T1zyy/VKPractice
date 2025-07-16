package tradehub.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tradehub.backend.entity.UserEntity;
import tradehub.backend.model.UserProfile;
import tradehub.backend.service.UserService;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/profile/{userId}")
    public UserProfile getUserProfile(@PathVariable Long userId) {
        return userService.getUserProfileByUserId(userId);
    }

    @PostMapping("/profile")
    public void saveUser(@Valid @RequestBody UserEntity user) {
        userService.saveUser(user);
    }
}
