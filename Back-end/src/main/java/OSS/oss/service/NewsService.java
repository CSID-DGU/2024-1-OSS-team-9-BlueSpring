package OSS.oss.service;

import OSS.oss.entity.News;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface NewsService {
    Page<News> getRecommendedNews(Pageable pageable);
    Page<News> getNewsByCategory(String category, Pageable pageable);
    News getNewsDetail(Long articleId);
}