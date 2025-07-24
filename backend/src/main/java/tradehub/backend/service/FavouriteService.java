package tradehub.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tradehub.backend.entity.Favourite;
import tradehub.backend.model.advertisement.CreateFavouriteAdvertisement;
import tradehub.backend.model.advertisement.ShowLentAdvertisement;
import tradehub.backend.model.advertisement.ShowFavouriteAdvertisement;
import tradehub.backend.repository.FavouriteRepository;
import tradehub.backend.util.Mapper;

@Service
@RequiredArgsConstructor
public class FavouriteService {
    private final FavouriteRepository favouriteRepository;
    private final Integer PAGE_SIZE = 10;
    private final AdvertisementService advertisementService;
    private final Mapper mapper;

    public Page<ShowFavouriteAdvertisement> getFavouritesBuUserId(long userId, int page) {
        Pageable pageable = PageRequest.of(page, PAGE_SIZE);
        Page<Favourite> favourites = favouriteRepository.getFavouritesByUserId(userId, pageable);
        return favourites.map(favourite -> {
            ShowLentAdvertisement show = advertisementService.getAdvertisementByIdListed(favourite.getAdvertisementId());
            return new ShowFavouriteAdvertisement(show, favourite.getId());
        });
    }

    public void addFavourite(CreateFavouriteAdvertisement createFavourite) {
        Favourite favourite = new Favourite(createFavourite);
        favouriteRepository.save(favourite);
    }
}
