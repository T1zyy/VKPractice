package tradehub.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import tradehub.backend.entity.Favourite;
import tradehub.backend.model.CreateFavourite;
import tradehub.backend.model.ShowAdvertisement;
import tradehub.backend.model.ShowFavouriteAdvertisement;
import tradehub.backend.repository.FavouriteRepository;
import tradehub.backend.util.Mapper;

@Service
@RequiredArgsConstructor
public class FavouriteService {
    private final FavouriteRepository favouriteRepository;
    private final Integer PAGE_SIZE = 10;
    private final AdvertisementService advertisementService;
    private final Mapper mapper;

    public Page<ShowFavouriteAdvertisement> getFavouritesBuUserId(Long userId, Integer page) {
        Pageable pageable = PageRequest.of(page, PAGE_SIZE);
        Page<Favourite> favourites = favouriteRepository.getFavouritesByUserId(userId, pageable);
        return favourites.map(favourite -> {
            ShowAdvertisement show = advertisementService.getAdvertisementById(favourite.getAdvertisementId());
            return new ShowFavouriteAdvertisement(show, favourite.getId());
        });
    }

    public void addFavourite(CreateFavourite createFavourite) {
        Favourite favourite = new Favourite(createFavourite);
        favouriteRepository.save(favourite);
    }
}
