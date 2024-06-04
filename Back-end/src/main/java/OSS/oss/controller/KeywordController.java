package OSS.oss.controller;

import OSS.oss.entity.Keyword;
import OSS.oss.repository.KeywordRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/keywords")
public class KeywordController {

    private final KeywordRepository keywordRepository;

    public KeywordController(KeywordRepository keywordRepository) {
        this.keywordRepository = keywordRepository;
    }

    @GetMapping("/realtime")
    public List<Keyword> getRealtimeKeywords() {
        return keywordRepository.findAllByOrderByRankAsc();
    }
}
