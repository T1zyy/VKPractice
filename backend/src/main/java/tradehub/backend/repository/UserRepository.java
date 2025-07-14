package tradehub.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tradehub.backend.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
