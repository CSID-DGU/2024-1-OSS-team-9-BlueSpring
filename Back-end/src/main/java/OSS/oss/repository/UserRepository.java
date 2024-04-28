package OSS.oss.repository;

import OSS.oss.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    Boolean existsById(String id);

    //id 값을 받아 db테이블에서 회원 조회
    User findById(String id);
}
