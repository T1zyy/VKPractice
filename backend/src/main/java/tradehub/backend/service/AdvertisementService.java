package tradehub.backend.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import tradehub.backend.entity.Advertisement;
import tradehub.backend.model.CreateAdvertisement;
import tradehub.backend.model.ShowAdvertisement;
import tradehub.backend.repository.AdvertisementRepository;
import tradehub.backend.util.Mapper;

import java.time.LocalDateTime;
import java.util.List;

import static tradehub.backend.util.AdvertisementSpecification.*;

@Service
@RequiredArgsConstructor
public class AdvertisementService {
    private final AdvertisementRepository advertisementRepository;
    private final Mapper mapper;

    public Page<Advertisement> getRecommendedPage(int page) {
        Pageable pageable = PageRequest.of(page, 30);
        return advertisementRepository.findAll(pageable);
    }

    public Page<ShowAdvertisement> getSearchedPage(int page, String keyword, String place) {
        Pageable pageable = PageRequest.of(page, 30);
        Specification<Advertisement> spec = Specification.allOf(hasPlace(place))
                .and(hasKeyword(keyword))
                .and(isAvailable(true));
        Page<Advertisement> advertisements = advertisementRepository.findAll(spec, pageable);
        return advertisements.map(mapper::advertisementToShowAdvertisement);
    }

    public ShowAdvertisement createAndSaveAdvertisement(CreateAdvertisement createAdvertisement, long userId) {
        Advertisement advertisement = new Advertisement(createAdvertisement, userId);
        advertisementRepository.save(advertisement);
        return mapper.advertisementToShowAdvertisement(advertisement);
    }

    public ShowAdvertisement getAdvertisementById(Long advertisementId) {
        Advertisement advertisement = advertisementRepository.findById(advertisementId).orElseThrow(() -> new RuntimeException("Advertisement with id " + advertisementId + " not found"));
        return mapper.advertisementToShowAdvertisement(advertisement);
    }
}
