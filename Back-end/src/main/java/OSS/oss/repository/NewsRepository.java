package OSS.oss.repository;

import OSS.oss.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NewsRepository extends JpaRepository<News, Long> {
    Page<News> findByCategory(String category, Pageable pageable);
    Page<News> findByTitleContainingOrContentContaining(String title, String content, Pageable pageable);
}
