package tradehub.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tradehub.backend.entity.UserEntity;
import tradehub.backend.model.advertisement.ShowLentAdvertisement;
import tradehub.backend.model.user.CreateUser;
import tradehub.backend.model.user.UserProfile;
import tradehub.backend.service.AdvertisementService;
import tradehub.backend.service.UserService;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;
    private final AdvertisementService advertisementService;

    @GetMapping("/profile/{userId}")
    public UserProfile getUserProfile(@PathVariable long userId) {
        return userService.getUserProfileByUserId(userId);
    }

    @PostMapping("/profile")
    public void saveUser(@Valid @RequestBody CreateUser user) {
        userService.saveUser(user);
    }

    @GetMapping("/profile/{id}/advertisements")
    public List<ShowLentAdvertisement> getUserAds(@PathVariable Long id) {
        return advertisementService.getAdvertisementsByUserId(id);
    }

    @GetMapping("/user/{userId}")
    public UserEntity getUser(@PathVariable long userId) {
        return userService.getUserById(userId);
    }
}
