package tradehub.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import tradehub.backend.entity.Advertisement;
import tradehub.backend.model.advertisement.CreateAdvertisement;
import tradehub.backend.model.advertisement.ShowLentAdvertisement;
import tradehub.backend.model.advertisement.ShowPageAdvertisement;
import tradehub.backend.repository.AdvertisementRepository;
import tradehub.backend.util.Mapper;

import java.util.List;

import static tradehub.backend.util.AdvertisementSpecification.*;

@Service
@RequiredArgsConstructor
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final Mapper mapper;

    public Page<ShowLentAdvertisement> getRecommendedPage(int page) {
        Pageable pageable = PageRequest.of(page, 30);
        Page<Advertisement> pageOfAds = advertisementRepository.findAll(pageable);
        return pageOfAds.map(mapper::advertisementToShowLentAdvertisement);
    }
    public Page<ShowLentAdvertisement> getSearchedPage(int page, String keyword, String place) {
        Pageable pageable = PageRequest.of(page, 30);
        Specification<Advertisement> spec = Specification.allOf(hasPlace(place))
                .and(hasKeyword(keyword));
        Page<Advertisement> advertisements = advertisementRepository.findAll(spec, pageable);
        return advertisements.map(mapper::advertisementToShowLentAdvertisement);
    }

    public ShowLentAdvertisement createAndSaveAdvertisement(CreateAdvertisement createAdvertisement, long userId) {
        Advertisement advertisement = new Advertisement(createAdvertisement, userId);
        advertisementRepository.save(advertisement);
        return mapper.advertisementToShowLentAdvertisement(advertisement);
    }

    public ShowLentAdvertisement getAdvertisementByIdListed(Long advertisementId) {
        Advertisement advertisement = advertisementRepository.findById(advertisementId).orElseThrow(() -> new RuntimeException("Advertisement with id " + advertisementId + " not found"));
        return mapper.advertisementToShowLentAdvertisement(advertisement);
    }

    public ShowPageAdvertisement getAdvertisementByIdPaged(Long advertisementId) {
        Advertisement advertisement = advertisementRepository.findById(advertisementId).orElseThrow(() -> new RuntimeException("Advertisement with id " + advertisementId + " not found"));
        return mapper.advertisementToShowPageAdvertisement(advertisement);
    }

    public List<ShowLentAdvertisement> getAdvertisementsByUserId(Long userId) {
        List<Advertisement> advertisements = advertisementRepository.findAllByUserId(userId);
        return advertisements.stream().map(mapper::advertisementToShowLentAdvertisement).toList();
    }
}
