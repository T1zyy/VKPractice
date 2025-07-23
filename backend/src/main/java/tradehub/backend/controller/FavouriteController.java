package tradehub.backend.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import tradehub.backend.model.advertisement.CreateFavouriteAdvertisement;
import tradehub.backend.model.advertisement.ShowFavouriteAdvertisement;
import tradehub.backend.service.FavouriteService;

@RestController
@RequiredArgsConstructor
@RequestMapping("/favourites")
public class FavouriteController {
    private final FavouriteService favouriteService;

    @GetMapping("/{userId}")
    public Page<ShowFavouriteAdvertisement> getFavourites(@PathVariable Long userId, @RequestParam Integer page) {
        return favouriteService.getFavouritesBuUserId(userId, page);
    }

    @PostMapping
    public void addFavourite(@RequestBody CreateFavouriteAdvertisement favourite) {
        favouriteService.addFavourite(favourite);
    }
}
