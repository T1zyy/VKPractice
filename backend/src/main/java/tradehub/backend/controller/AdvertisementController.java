package tradehub.backend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.web.PagedResourcesAssembler;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.PagedModel;
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
    private final PagedResourcesAssembler<ShowAdvertisement> assembler;

    @GetMapping("/recommendations")
    public PagedModel<EntityModel<ShowAdvertisement>> getRecommendedAdvertisements(@RequestParam int page) {
        return assembler.toModel(advertisementService.getRecommendedPage(page));
    }

    @GetMapping("/search")
    public PagedModel<EntityModel<ShowAdvertisement>> getSearchedAdvertisements(
            @RequestParam int page,
            @RequestParam(defaultValue = "") String keyword,
            @RequestParam(defaultValue = "") String place) {
        return assembler.toModel(advertisementService.getSearchedPage(page, keyword, place));
    }

    @PostMapping("/advertisement")
    public ShowAdvertisement addAdvertisement(@Valid @RequestBody CreateAdvertisement advertisement, Authentication auth) {
        long userId = Long.parseLong((String) auth.getPrincipal());
        System.out.println("Создание объявления от userId=" + userId + " => " + advertisement);
        return advertisementService.createAndSaveAdvertisement(advertisement, userId);
    }
}
