package OSS.oss.service;

import OSS.oss.entity.News;
import OSS.oss.repository.NewsRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class NewsServiceImpl implements NewsService {
    private final NewsRepository newsRepository;

    public NewsServiceImpl(NewsRepository newsRepository) {
        this.newsRepository = newsRepository;
    }

    @Override
    public Page<News> getRecommendedNews(Pageable pageable) {
        return newsRepository.findAll(pageable);
        // 추천 알고리즘 적용
    }

    @Override
    public Page<News> getNewsByCategory(String category, Pageable pageable) {
        return newsRepository.findByCategory(category, pageable);
    }

    @Override
    public Page<News> searchNews(String keyword, Pageable pageable) {
        return newsRepository.findByTitleContainingOrContentContaining(keyword, keyword, pageable);
    }

    @Override
    public News getNewsDetail(Long articleId) {
        return newsRepository.findById(articleId)
                .orElseThrow(() -> new IllegalArgumentException("News not found with id: " + articleId));
    }
}