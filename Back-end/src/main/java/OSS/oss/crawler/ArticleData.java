package OSS.oss.crawler;

import java.util.List;

public class ArticleData {
    private String category;
    private String title;
    private String content;
    private String date;
    private String url;
    private String media;
    private List<String> imageUrls;

    public ArticleData(String category, String title, String content, String date, String url, String media, List<String> imageUrls) {
        this.category = category;
        this.title = title;
        this.content = content;
        this.date = date;
        this.url = url;
        this.media = media;
        this.imageUrls = imageUrls;
    }

    public String toCSV() {
        return category + "," +
                escapeCSV(title) + "," +
                escapeCSV(content) + "," +
                String.join(";", imageUrls) + "," +
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
