package tradehub.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tradehub.backend.entity.Advertisement;

import java.util.List;

@Repository
public interface AdvertisementRepository extends JpaRepository<Advertisement, Long> {
    Page<Advertisement> findAll(Specification<Advertisement> spec, Pageable pageable);

    List<Advertisement> findAllByUserId(long userId);
}
