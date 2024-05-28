package OSS.oss;

import OSS.oss.controller.NewsController;
import OSS.oss.entity.News;
import OSS.oss.service.NewsService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(NewsController.class)
public class NewsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private NewsService newsService;

    @Test
    public void testGetRecommendedNews() throws Exception {
        // Mock data 준비
        List<News> newsList = new ArrayList<>();
        // 테스트용 뉴스 데이터 추가
        newsList.add(new News("정치", "채상병 특검' 위해 연금개혁까지 정략 활용", "추경호 국민의힘 원내대표", "2024.05.24. 오전 10:31", "https://n.news.naver.com/mnews/article/214/0001350605", "MBC"));
        newsList.add(new News("사회", "입법권 무시 대통령, 국민이 심판해야", "채상병 특검법 거부 규탄 및 통과", "2024.05.25. 오후 7:17", "https://n.news.naver.com/mnews/article/047/0002434599", "오마이뉴스"));
        newsList.add(new News("IT", "라인사태 본질, IT 후진국된 日의 강탈 욕구에서 비롯", "국제 연구진, 40광년 떨어진 물고기자리서 발견", "2024.05.24. 오후 2:39", "https://n.news.naver.com/mnews/article/366/0000994541", "조선비즈"));
        newsList.add(new News("경제", "삼성전자, 7월 10일 파리서 갤럭시Z 시리즈 언팩 행사 개최", "갤럭시Z 시리즈 언팩 행사를 개최합니다.", "2024.05.24. 오후 12:50", "https://n.news.naver.com/mnews/article/055/0001157827", "SBS"));
        newsList.add(new News("연예", "'최대 15년형' 김호중에 경찰도 화나·정치권 희생양…화제도 제각각", "김호중의 예상 형량이 최대 15년형이라는 추측", "2024.05.25. 오후 6:51", "https://m.entertain.naver.com/ranking/article/311/0001729737", "엑스포츠뉴스"));
        newsList.add(new News("생활", "돌아온 뉴진스 인기 '굳건'...하이브-민희진 충돌 계속", "그룹 뉴진스, 하이브-민희진 갈등 속 컴백", "2024.05.25. 오후 5:17", "https://n.news.naver.com/mnews/article/052/0002040124", "YTN"));

        Page<News> newsPage = new PageImpl<>(newsList);

        // NewsService의 동작 정의
        when(newsService.getRecommendedNews(any(Pageable.class))).thenReturn(newsPage);

        // 컨트롤러 호출 및 결과 검증
        mockMvc.perform(get("/api/news")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(10))
                .andExpect(jsonPath("$.totalElements").value(newsList.size()))
                .andExpect(jsonPath("$.totalPages").value(1));
    }

    @Test
    public void testGetNewsByCategory() throws Exception {
        // Mock data 준비
        List<News> newsList = new ArrayList<>();
        // 테스트용 뉴스 데이터 추가
        newsList.add(new News("정치", "채상병 특검' 위해 연금개혁까지 정략 활용", "추경호 국민의힘 원내대표", "2024.05.24. 오전 10:31", "https://n.news.naver.com/mnews/article/214/0001350605", "MBC"));
        newsList.add(new News("사회", "입법권 무시 대통령, 국민이 심판해야", "채상병 특검법 거부 규탄 및 통과", "2024.05.25. 오후 7:17", "https://n.news.naver.com/mnews/article/047/0002434599", "오마이뉴스"));
        newsList.add(new News("IT", "라인사태 본질, IT 후진국된 日의 강탈 욕구에서 비롯", "국제 연구진, 40광년 떨어진 물고기자리서 발견", "2024.05.24. 오후 2:39", "https://n.news.naver.com/mnews/article/366/0000994541", "조선비즈"));
        newsList.add(new News("경제", "삼성전자, 7월 10일 파리서 갤럭시Z 시리즈 언팩 행사 개최", "갤럭시Z 시리즈 언팩 행사를 개최합니다.", "2024.05.24. 오후 12:50", "https://n.news.naver.com/mnews/article/055/0001157827", "SBS"));
        newsList.add(new News("연예", "'최대 15년형' 김호중에 경찰도 화나·정치권 희생양…화제도 제각각", "김호중의 예상 형량이 최대 15년형이라는 추측", "2024.05.25. 오후 6:51", "https://m.entertain.naver.com/ranking/article/311/0001729737", "엑스포츠뉴스"));
        newsList.add(new News("생활", "돌아온 뉴진스 인기 '굳건'...하이브-민희진 충돌 계속", "그룹 뉴진스, 하이브-민희진 갈등 속 컴백", "2024.05.25. 오후 5:17", "https://n.news.naver.com/mnews/article/052/0002040124", "YTN"));

        Page<News> newsPage = new PageImpl<>(newsList);

        // NewsService의 동작 정의
        when(newsService.getNewsByCategory(eq("정치"), any(Pageable.class))).thenReturn(newsPage);

        // 컨트롤러 호출 및 결과 검증
        mockMvc.perform(get("/api/news")
                        .param("category", "정치")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(10))
                .andExpect(jsonPath("$.totalElements").value(newsList.size()))
                .andExpect(jsonPath("$.totalPages").value(1));
    }

    @Test
    public void testSearchNews() throws Exception {
        // Mock data 준비
        List<News> newsList = new ArrayList<>();
        // 테스트용 뉴스 데이터 추가
        newsList.add(new News("정치", "채상병 특검' 위해 연금개혁까지 정략 활용", "추경호 국민의힘 원내대표", "2024.05.24. 오전 10:31", "https://n.news.naver.com/mnews/article/214/0001350605", "MBC"));
        newsList.add(new News("사회", "입법권 무시 대통령, 국민이 심판해야", "채상병 특검법 거부 규탄 및 통과", "2024.05.25. 오후 7:17", "https://n.news.naver.com/mnews/article/047/0002434599", "오마이뉴스"));
        newsList.add(new News("IT", "라인사태 본질, IT 후진국된 日의 강탈 욕구에서 비롯", "국제 연구진, 40광년 떨어진 물고기자리서 발견", "2024.05.24. 오후 2:39", "https://n.news.naver.com/mnews/article/366/0000994541", "조선비즈"));
        newsList.add(new News("경제", "삼성전자, 7월 10일 파리서 갤럭시Z 시리즈 언팩 행사 개최", "갤럭시Z 시리즈 언팩 행사를 개최합니다.", "2024.05.24. 오후 12:50", "https://n.news.naver.com/mnews/article/055/0001157827", "SBS"));
        newsList.add(new News("연예", "'최대 15년형' 김호중에 경찰도 화나·정치권 희생양…화제도 제각각", "김호중의 예상 형량이 최대 15년형이라는 추측", "2024.05.25. 오후 6:51", "https://m.entertain.naver.com/ranking/article/311/0001729737", "엑스포츠뉴스"));
        newsList.add(new News("생활", "돌아온 뉴진스 인기 '굳건'...하이브-민희진 충돌 계속", "그룹 뉴진스, 하이브-민희진 갈등 속 컴백", "2024.05.25. 오후 5:17", "https://n.news.naver.com/mnews/article/052/0002040124", "YTN"));

        Page<News> newsPage = new PageImpl<>(newsList);

        // NewsService의 동작 정의
        when(newsService.searchNews(eq("검색어"), any(Pageable.class))).thenReturn(newsPage);

        // 컨트롤러 호출 및 결과 검증
        mockMvc.perform(get("/api/news/search")
                        .param("keyword", "검색어")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.content").isArray())
                .andExpect(jsonPath("$.page").value(0))
                .andExpect(jsonPath("$.size").value(10))
                .andExpect(jsonPath("$.totalElements").value(newsList.size()))
                .andExpect(jsonPath("$.totalPages").value(1));
    }

    @Test
    public void testGetNewsDetail() throws Exception {
        // Mock data 준비
        News news = new News("정치", "채상병 특검' 위해 연금개혁까지 정략 활용", "추경호 국민의힘 원내대표", "2024.05.24. 오전 10:31", "https://n.news.naver.com/mnews/article/214/0001350605", "MBC");

        // NewsService의 동작 정의
        when(newsService.getNewsDetail(eq(1L))).thenReturn(news);

        // 컨트롤러 호출 및 결과 검증
        mockMvc.perform(get("/api/news/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.articleID").value(news.getArticleID()))
                .andExpect(jsonPath("$.title").value(news.getTitle()))
                // ... 필요한 필드 검증
                .andExpect(jsonPath("$.publishDate").value(news.getPublishDate()));
    }

    @Test
    public void testGetNewsDetailNotFound() throws Exception {
        // NewsService의 동작 정의
        when(newsService.getNewsDetail(eq(1L))).thenThrow(new IllegalArgumentException("News not found with id: 1"));

        // 컨트롤러 호출 및 결과 검증
        mockMvc.perform(get("/api/news/1")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }
}