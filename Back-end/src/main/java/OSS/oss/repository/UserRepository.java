package OSS.oss.repository;

import OSS.oss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {
    Boolean existsById(String id);

    //id 값을 받아 db테이블에서 회원 조회
    Optional<User> findById(String id);
}
