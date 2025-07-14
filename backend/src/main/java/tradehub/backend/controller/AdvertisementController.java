package tradehub.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import tradehub.backend.entity.Advertisement;
import tradehub.backend.model.CreateAdvertisement;
import tradehub.backend.model.ShowAdvertisement;
import tradehub.backend.service.AdvertisementService;

@RestController
@RequiredArgsConstructor
public class AdvertisementController {
    private final AdvertisementService advertisementService;

    @GetMapping("/recommendations")
    public Page<Advertisement> getRecommendedAdvertisements(@RequestParam int page) {
        return advertisementService.getRecommendedPage(page);
    }

    @GetMapping("/search")
    public Page<ShowAdvertisement> getSearchedAdvertisements(
            @RequestParam int page,
            @RequestParam String keyword,
            @RequestParam String place) {
        return advertisementService.getSearchedPage(page, keyword, place);
    }

    @PostMapping("/advertisement")
    public ShowAdvertisement addAdvertisement(@Valid @RequestBody CreateAdvertisement advertisement, Authentication auth) {
        long userId = Long.parseLong((String) auth.getPrincipal());
        return advertisementService.createAndSaveAdvertisement(advertisement, userId);
    }
}
