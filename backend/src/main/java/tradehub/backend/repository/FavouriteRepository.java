package tradehub.backend.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tradehub.backend.entity.Favourite;

@Repository
public interface FavouriteRepository extends JpaRepository<Favourite, Long> {
    Page<Favourite> getFavouritesByUserId(Long userId, Pageable pageable);
}
