package OSS.oss.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class News {

    public News() {
        // 기본 생성자
    }

    public News(Long articleID, String category, String title, String content, String publishDate, String source, String media) {
        this.articleID = articleID;
        this.category = category;
        this.title = title;
        this.content = content;
        this.publishDate = LocalDate.parse(publishDate);
        this.source = source;
        this.media = media;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long articleID;

    @Column(length = 200, nullable = false)
    private String title;

    @Column
    private String source;

    @Column
    private String media;

    @Column
    private String category;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column(columnDefinition = "TEXT")
    private String summary;

    @Column
    private Integer totalLike;

    @Column
    private Integer totalDislike;

    @Column
    private LocalDate publishDate;

    // Getter and Setter methods

    public Long getArticleID() {
        return articleID;
    }

    public void setArticleID(Long articleID) {
        this.articleID = articleID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getMedia() {
        return media;
    }

    public void setMedia(String media) {
        this.media = media;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSummary() {
        return summary;
    }

    public void setSummary(String summary) {
        this.summary = summary;
    }

    public Integer getTotalLike() {
        return totalLike;
    }

    public void setTotalLike(Integer totalLike) {
        this.totalLike = totalLike;
    }

    public Integer getTotalDislike() {
        return totalDislike;
    }

    public void setTotalDislike(Integer totalDislike) {
        this.totalDislike = totalDislike;
    }

    public LocalDate getPublishDate() {
        return publishDate;
    }

    public void setPublishDate(LocalDate publishDate) {
        this.publishDate = publishDate;
    }
}