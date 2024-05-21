package OSS.oss.controller;

import OSS.oss.entity.News;
import OSS.oss.service.NewsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class NewsController {

    private final NewsService newsService;

    public NewsController(NewsService newsService) {
        this.newsService = newsService;
    }

    // 기본 추천 뉴스 API
    @GetMapping("/api/news")
    public ResponseEntity<Map<String, Object>> getRecommendedNews(
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<News> newsPage = newsService.getRecommendedNews(pageable);

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

    // 카테고리별 조회 API
    @GetMapping("/api/news")
    public ResponseEntity<Map<String, Object>> getNewsByCategory(
            @RequestParam(value = "category", required = false) String category,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<News> newsPage = newsService.getNewsByCategory(category, pageable);

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

    // 키워드 검색 API
    @GetMapping("/api/news/search")
    public ResponseEntity<Map<String, Object>> searchNews(
            @RequestParam(value = "keyword") String keyword,
            @RequestParam(value = "page", defaultValue = "0") int page,
            @RequestParam(value = "size", defaultValue = "10") int size
    ) {
        try {
            Pageable pageable = PageRequest.of(page, size);
            Page<News> newsPage = newsService.searchNews(keyword, pageable);

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
    @GetMapping("/api/news/{articleId}")
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