package tradehub.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import tradehub.backend.model.advertisement.CreateAdvertisement;
import tradehub.backend.model.advertisement.ShowLentAdvertisement;
import tradehub.backend.model.advertisement.ShowPageAdvertisement;
import tradehub.backend.service.AdvertisementService;

@RestController
@RequiredArgsConstructor
public class AdvertisementController {
    private final AdvertisementService advertisementService;
    private final PagedResourcesAssembler<ShowLentAdvertisement> assembler;

    @GetMapping("/recommendations")
    public PagedModel<EntityModel<ShowLentAdvertisement>> getRecommendedAdvertisements(@RequestParam int page) {
        return assembler.toModel(advertisementService.getRecommendedPage(page));
    }

    @GetMapping("/search")
    public PagedModel<EntityModel<ShowLentAdvertisement>> getSearchedAdvertisements(
            @RequestParam int page,
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "") String place) {
        return assembler.toModel(advertisementService.getSearchedPage(page, keyword, place));
    }

    @PostMapping("/advertisement")
    public ShowLentAdvertisement addAdvertisement(@Valid @RequestBody CreateAdvertisement advertisement, Authentication auth) {
        long userId = Long.parseLong((String) auth.getPrincipal());
        return advertisementService.createAndSaveAdvertisement(advertisement, userId);
    }

    @GetMapping("/advertisement/{advertisementId}")
    public ShowPageAdvertisement getAdvertisement(@PathVariable("advertisementId") long advertisementId) {
        return advertisementService.getAdvertisementByIdPaged(advertisementId);
    }
}
