package OSS.oss.controller;

import OSS.oss.entity.News;
import OSS.oss.service.NewsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/news")
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // 기본 추천 뉴스 및 카테고리별 조회 API
    @GetMapping
    public ResponseEntity<Map<String, Object>> getNews(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<News> newsPage;
            if (category == null || category.isEmpty()) {
                newsPage = newsService.getRecommendedNews(pageable);
            } else {
                newsPage = newsService.getNewsByCategory(category, pageable);
            }

            List<News> news = newsPage.getContent();
            int totalPages = newsPage.getTotalPages();
            long totalElements = newsPage.getTotalElements();

            Map<String, Object> response = new HashMap<>();
            response.put("content", news);
            response.put("page", page);
            response.put("size", size);
            response.put("totalElements", totalElements);
            response.put("totalPages", totalPages);

            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // 뉴스 본문 조회 API
    @GetMapping("/{articleId}")
    public ResponseEntity<News> getNewsDetail(@PathVariable Long articleId) {
        try {
            News news = newsService.getNewsDetail(articleId);
            return new ResponseEntity<>(news, HttpStatus.OK);
        } catch (IllegalArgumentException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
