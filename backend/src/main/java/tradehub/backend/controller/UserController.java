package tradehub.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import tradehub.backend.entity.UserEntity;
import tradehub.backend.model.advertisement.ShowLentAdvertisement;
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
    public UserProfile getUserProfile(@PathVariable Long userId) {
        return userService.getUserProfileByUserId(userId);
    }

    @PostMapping("/profile")
    public void saveUser(@Valid @RequestBody UserEntity user) {
        userService.saveUser(user);
    }

    @GetMapping("/profile/{id}/advertisements")
    public List<ShowLentAdvertisement> getUserAds(@PathVariable Long id) {
        return advertisementService.getAdvertisementsByUserId(id);
    }
}
