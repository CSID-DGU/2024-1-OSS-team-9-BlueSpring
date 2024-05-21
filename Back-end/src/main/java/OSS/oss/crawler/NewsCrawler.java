package OSS.oss.crawler;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.io.FileWriter;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.util.*;
public class NewsCrawler {
    public static void main(String[] args) throws UnsupportedEncodingException {
        // ChromeDriver 설정
        System.setProperty("webdriver.chrome.driver", "drivers/chromedriver.exe");

        // 크롬 설정을 담은 객체 생성
        ChromeOptions options = new ChromeOptions();
        // 창을 띄우지 않는 옵션
        options.addArguments("headless");
        // 설정한 옵션을 담은 드라이버 객체 생성
        WebDriver driver = new ChromeDriver(options);

        // 카테고리 URL과 카테고리명 매핑
        Map<String, CategoryCrawler> categoryMap = new HashMap<>();
        // 정치 카테고리
        categoryMap.put("https://news.naver.com/section/100", new PoliticsCrawler());
        // 경제 카테고리
        categoryMap.put("https://news.naver.com/section/101", new EconomyCrawler());
        // 사회 카테고리
        categoryMap.put("https://news.naver.com/section/102", new SocietyCrawler());
        // 생활/문화 카테고리
        categoryMap.put("https://news.naver.com/section/103", new LifeCultureCrawler());
        // 세계 카테고리
        categoryMap.put("https://news.naver.com/section/104", new WorldCrawler());
        // IT/과학 카테고리
        categoryMap.put("https://news.naver.com/section/105", new ITScienceCrawler());
        // 연예 카테고리
        //categoryMap.put("https://news.naver.com/section/106", new EntertainmentCrawler());
        // 스포츠 카테고리
        //categoryMap.put("https://news.naver.com/section/107", new SportsCrawler());
        // 학교 공지사항 카테고리
        //categoryMap.put("https://cse.dongguk.edu/article/notice1/list", new NoticeCrawler());

        // CSV 파일에 저장할 FileWriter 객체 생성
        try (FileWriter writer = new FileWriter("news_data.csv")) {
            // CSV 파일에 헤더 작성
            writer.append("Category,Title,Content,Date,URL,Media\n");

            // 각 카테고리별로 크롤링 수행
            for (Map.Entry<String, CategoryCrawler> entry : categoryMap.entrySet()) {
                String categoryUrl = entry.getKey();
                CategoryCrawler categoryCrawler = entry.getValue();

                driver.get(categoryUrl);

                // 뉴스 기사 링크 수집
                List<String> articleUrls = categoryCrawler.getArticleUrls(driver);

                // 각 기사 페이지 접속 및 정보 수집
                for (String articleUrl : articleUrls) {
                    driver.get(articleUrl);
                    ArticleData articleData = categoryCrawler.crawlArticle(driver);
                    writer.append(articleData.toCSV()).append("\n");
                }
            }

            System.out.println("데이터가 news_data.csv 파일에 저장되었습니다.");
        } catch (IOException e) {
            System.out.println("파일 저장 중 오류가 발생했습니다.");
            e.printStackTrace();
        }

        // WebDriver 종료
        driver.quit();
    }
}

interface CategoryCrawler {
    List<String> getArticleUrls(WebDriver driver);
    ArticleData crawlArticle(WebDriver driver);
}

class ArticleData {
    private String category;
    private String title;
    private String content;
    private String date;
    private String url;
    private String media;

    public ArticleData(String category, String title, String content, String date, String url, String media) {
        this.category = category;
        this.title = title;
        this.content = content;
        this.date = date;
        this.url = url;
        this.media = media;
    }

    public String toCSV() {
        return category + "," +
                escapeCSV(title) + "," +
                escapeCSV(content) + "," +
                date + "," +
                url + "," +
                media;
    }

    private String escapeCSV(String value) {
        if (value == null) {
            return "";
        }
        return "\"" + value.replace("\"", "\"\"") + "\"";
    }

    // 데이터베이스에 저장
    public boolean isArticleExists() {
        // DB에서 해당 기사의 URL을 검색하여 존재 여부를 확인하는 로직 구현
        // SELECT COUNT(*) FROM articles WHERE url = ?
        // 기사가 존재하면 true, 존재하지 않으면 false 반환
        return false;
    }

    public void saveToDatabase() {
        if (!isArticleExists()) {
            // 기사가 DB에 존재하지 않으면 저장하는 로직 구현
            // INSERT INTO articles (category, title, content, date, url, media) VALUES (?, ?, ?, ?, ?, ?)
            System.out.println("기사가 DB에 저장되었습니다.");
        } else {
            System.out.println("기사가 이미 DB에 존재합니다.");
        }
    }
}

class PoliticsCrawler implements CategoryCrawler {
    @Override
    public List<String> getArticleUrls(WebDriver driver) {
        List<WebElement> linkElements = driver.findElements(By.cssSelector("a.sa_text_title"));
        List<String> articleUrls = new ArrayList<>();
        for (WebElement linkElement : linkElements) {
            String url = linkElement.getAttribute("href");
            articleUrls.add(url);
        }
        return articleUrls;
    }

    @Override
    public ArticleData crawlArticle(WebDriver driver) {
        // 기사 제목 수집
        WebElement titleElement = driver.findElement(By.cssSelector("#title_area > span"));
        String title = titleElement.getText();

        // 기사 본문 수집
        WebElement contentElement = driver.findElement(By.cssSelector("#dic_area"));
        String content = contentElement.getText();

        // 기사 발행일자 수집
        WebElement dateElement = driver.findElement(By.cssSelector("#ct > div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div > span"));
        String date = dateElement.getText();

        // 카테고리 수집
        WebElement CategoryElement = driver.findElement(By.cssSelector("#contents > div.media_end_categorize > a > em"));
        String Category = CategoryElement.getText();

        // 언론사 수집
        WebElement MediaElement = driver.findElement(By.cssSelector("#contents > div.media_end_linked_more > div > a > em"));
        String Media = MediaElement.getText();

        return new ArticleData(Category, title, content, date, driver.getCurrentUrl(), Media);
    }
}

class EconomyCrawler implements CategoryCrawler {
    @Override
    public List<String> getArticleUrls(WebDriver driver) {
        List<WebElement> linkElements = driver.findElements(By.cssSelector("a.sa_text_title"));
        List<String> articleUrls = new ArrayList<>();
        for (WebElement linkElement : linkElements) {
            String url = linkElement.getAttribute("href");
            articleUrls.add(url);
        }
        return articleUrls;
    }

    @Override
    public ArticleData crawlArticle(WebDriver driver) {
        // 기사 제목 수집
        WebElement titleElement = driver.findElement(By.cssSelector("#title_area > span"));
        String title = titleElement.getText();

        // 기사 본문 수집
        WebElement contentElement = driver.findElement(By.cssSelector("#dic_area"));
        String content = contentElement.getText();

        // 기사 발행일자 수집
        WebElement dateElement = driver.findElement(By.cssSelector("#ct > div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div > span"));
        String date = dateElement.getText();

        // 카테고리 수집
        WebElement CategoryElement = driver.findElement(By.cssSelector("#contents > div.media_end_categorize > a > em"));
        String Category = CategoryElement.getText();

        // 언론사 수집
        WebElement MediaElement = driver.findElement(By.cssSelector("#contents > div.media_end_linked_more > div > a > em"));
        String Media = MediaElement.getText();

        return new ArticleData(Category, title, content, date, driver.getCurrentUrl(), Media);
    }
}

class SocietyCrawler implements CategoryCrawler {
    @Override
    public List<String> getArticleUrls(WebDriver driver) {
        List<WebElement> linkElements = driver.findElements(By.cssSelector("a.sa_text_title"));
        List<String> articleUrls = new ArrayList<>();
        for (WebElement linkElement : linkElements) {
            String url = linkElement.getAttribute("href");
            articleUrls.add(url);
        }
        return articleUrls;
    }

    @Override
    public ArticleData crawlArticle(WebDriver driver) {
        // 기사 제목 수집
        WebElement titleElement = driver.findElement(By.cssSelector("#title_area > span"));
        String title = titleElement.getText();

        // 기사 본문 수집
        WebElement contentElement = driver.findElement(By.cssSelector("#dic_area"));
        String content = contentElement.getText();

        // 기사 발행일자 수집
        WebElement dateElement = driver.findElement(By.cssSelector("#ct > div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div > span"));
        String date = dateElement.getText();

        // 카테고리 수집
        WebElement CategoryElement = driver.findElement(By.cssSelector("#contents > div.media_end_categorize > a > em"));
        String Category = CategoryElement.getText();

        // 언론사 수집
        WebElement MediaElement = driver.findElement(By.cssSelector("#contents > div.media_end_linked_more > div > a > em"));
        String Media = MediaElement.getText();

        return new ArticleData(Category, title, content, date, driver.getCurrentUrl(), Media);
    }
}

class LifeCultureCrawler implements CategoryCrawler {
    @Override
    public List<String> getArticleUrls(WebDriver driver) {
        List<WebElement> linkElements = driver.findElements(By.cssSelector("a.sa_text_title"));
        List<String> articleUrls = new ArrayList<>();
        for (WebElement linkElement : linkElements) {
            String url = linkElement.getAttribute("href");
            articleUrls.add(url);
        }
        return articleUrls;
    }

    @Override
    public ArticleData crawlArticle(WebDriver driver) {
        // 기사 제목 수집
        WebElement titleElement = driver.findElement(By.cssSelector("#title_area > span"));
        String title = titleElement.getText();

        // 기사 본문 수집
        WebElement contentElement = driver.findElement(By.cssSelector("#dic_area"));
        String content = contentElement.getText();

        // 기사 발행일자 수집
        WebElement dateElement = driver.findElement(By.cssSelector("#ct > div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div > span"));
        String date = dateElement.getText();

        // 카테고리 수집
        WebElement CategoryElement = driver.findElement(By.cssSelector("#contents > div.media_end_categorize > a > em"));
        String Category = CategoryElement.getText();

        // 언론사 수집
        WebElement MediaElement = driver.findElement(By.cssSelector("#contents > div.media_end_linked_more > div > a > em"));
        String Media = MediaElement.getText();

        return new ArticleData(Category, title, content, date, driver.getCurrentUrl(), Media);
    }
}

class WorldCrawler implements CategoryCrawler {
    @Override
    public List<String> getArticleUrls(WebDriver driver) {
        List<WebElement> linkElements = driver.findElements(By.cssSelector("a.sa_text_title"));
        List<String> articleUrls = new ArrayList<>();
        for (WebElement linkElement : linkElements) {
            String url = linkElement.getAttribute("href");
            articleUrls.add(url);
        }
        return articleUrls;
    }

    @Override
    public ArticleData crawlArticle(WebDriver driver) {
        // 기사 제목 수집
        WebElement titleElement = driver.findElement(By.cssSelector("#title_area > span"));
        String title = titleElement.getText();

        // 기사 본문 수집
        WebElement contentElement = driver.findElement(By.cssSelector("#dic_area"));
        String content = contentElement.getText();

        // 기사 발행일자 수집
        WebElement dateElement = driver.findElement(By.cssSelector("#ct > div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div > span"));
        String date = dateElement.getText();

        // 카테고리 수집
        WebElement CategoryElement = driver.findElement(By.cssSelector("#contents > div.media_end_categorize > a > em"));
        String Category = CategoryElement.getText();

        // 언론사 수집
        WebElement MediaElement = driver.findElement(By.cssSelector("#contents > div.media_end_linked_more > div > a > em"));
        String Media = MediaElement.getText();

        return new ArticleData(Category, title, content, date, driver.getCurrentUrl(), Media);
    }
}

class ITScienceCrawler implements CategoryCrawler {
    @Override
    public List<String> getArticleUrls(WebDriver driver) {
        List<WebElement> linkElements = driver.findElements(By.cssSelector("a.sa_text_title"));
        List<String> articleUrls = new ArrayList<>();
        for (WebElement linkElement : linkElements) {
            String url = linkElement.getAttribute("href");
            articleUrls.add(url);
        }
        return articleUrls;
    }

    @Override
    public ArticleData crawlArticle(WebDriver driver) {
        // 기사 제목 수집
        WebElement titleElement = driver.findElement(By.cssSelector("#title_area > span"));
        String title = titleElement.getText();

        // 기사 본문 수집
        WebElement contentElement = driver.findElement(By.cssSelector("#dic_area"));
        String content = contentElement.getText();

        // 기사 발행일자 수집
        WebElement dateElement = driver.findElement(By.cssSelector("#ct > div.media_end_head.go_trans > div.media_end_head_info.nv_notrans > div.media_end_head_info_datestamp > div > span"));
        String date = dateElement.getText();

        // 카테고리 수집
        WebElement CategoryElement = driver.findElement(By.cssSelector("#contents > div.media_end_categorize > a > em"));
        String Category = CategoryElement.getText();

        // 언론사 수집
        WebElement MediaElement = driver.findElement(By.cssSelector("#contents > div.media_end_linked_more > div > a > em"));
        String Media = MediaElement.getText();

        return new ArticleData(Category, title, content, date, driver.getCurrentUrl(), Media);
    }
}

class EntertainmentCrawler implements CategoryCrawler {
    @Override
    public List<String> getArticleUrls(WebDriver driver) {
        List<WebElement> linkElements = driver.findElements(By.cssSelector("#ranking_news > div > div.rank_lst > ul > li > a"));
        List<String> articleUrls = new ArrayList<>();
        for (WebElement linkElement : linkElements) {
            String url = linkElement.getAttribute("href");
            articleUrls.add(url);
        }
        return articleUrls;
    }

    @Override
    public ArticleData crawlArticle(WebDriver driver) {
        // 기사 제목 수집
        WebElement titleElement = driver.findElement(By.cssSelector("#content > div.end_ct > div > h2"));
        String title = titleElement.getText();

        // 기사 본문 수집
        WebElement contentElement = driver.findElement(By.cssSelector("#articeBody"));
        String content = contentElement.getText();

        // 기사 발행일자 수집
        WebElement dateElement = driver.findElement(By.cssSelector("#content > div.end_ct > div > div.article_info > span > em"));
        String date = dateElement.getText();

        // 카테고리 수집
        WebElement CategoryElement = driver.findElement(By.cssSelector("#content > div.end_ct > div > div.guide_categorization > a > em"));
        String Category = CategoryElement.getText();

        // 언론사 수집
        WebElement MediaElement = driver.findElement(By.cssSelector("#content > div.end_ct > div > div.press_logo > a > img"));
        String Media = MediaElement.getAttribute("alt");

        return new ArticleData(Category, title, content, date, driver.getCurrentUrl(), Media);
    }
}

class SportsCrawler implements CategoryCrawler {
    @Override
    public List<String> getArticleUrls(WebDriver driver) {
        List<WebElement> linkElements = driver.findElements(By.cssSelector("#content > div > div.today_section.type_no_da > ul > li > a"));
        List<String> articleUrls = new ArrayList<>();
        for (WebElement linkElement : linkElements) {
            String url = linkElement.getAttribute("href");
            articleUrls.add(url);
        }
        return articleUrls;
    }

    @Override
    public ArticleData crawlArticle(WebDriver driver) {
        // 기사 제목 수집
        WebElement titleElement = driver.findElement(By.cssSelector("#title_area > span"));
        String title = titleElement.getText();

        // 기사 본문 수집
        WebElement contentElement = driver.findElement(By.cssSelector("#newsEndContents"));
        String content = contentElement.getText();

        // 기사 발행일자 수집
        WebElement dateElement = driver.findElement(By.cssSelector("#content > div > div.content > div > div.news_headline > div > span"));
        String date = dateElement.getText();

        // 언론사 수집
        WebElement MediaElement = driver.findElement(By.cssSelector("#pressLogo > a > img"));
        String Media = MediaElement.getAttribute("alt");

        return new ArticleData("스포츠", title, content, date, driver.getCurrentUrl(), Media);
    }
}

class NoticeCrawler implements CategoryCrawler {
    @Override
    public List<String> getArticleUrls(WebDriver driver) {
        List<WebElement> linkElements = driver.findElements(By.cssSelector("#contents > div.contents > div.board_wrap > table > tbody > tr > td.td_tit > a"));
        List<String> articleUrls = new ArrayList<>();
        for (WebElement linkElement : linkElements) {
            String url = linkElement.getAttribute("href");
            if(!Objects.equals(url, "https://cse.dongguk.edu/article/notice1/list#none")) {
                articleUrls.add(url);
            }
        }
        return articleUrls;
    }

    @Override
    public ArticleData crawlArticle(WebDriver driver) {
        // 기사 제목 수집
        WebElement titleElement = driver.findElement(By.cssSelector("#contents > div.contents > div > div.tit > p"));
        String title = titleElement.getText();

        // 기사 본문 수집
        WebElement contentElement = driver.findElement(By.cssSelector("#contents > div.contents > div > div.view_cont"));
        String content = contentElement.getText();

        // 기사 발행일자 수집
        WebElement dateElement = driver.findElement(By.cssSelector("#contents > div.contents > div > div.tit > div > span:nth-child(1)"));
        String date = dateElement.getText();

        return new ArticleData("학교 공지사항", title, content, date, driver.getCurrentUrl(), "");
    }
}