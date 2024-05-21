package OSS.oss.entity;
import com.mysql.cj.protocol.ColumnDefinition;
import jakarta.persistence.*;

import java.time.LocalDate;


@Entity
public class News {
    public Integer getArticleID() {
        return articleID;
    }

    public void setArticleID(Integer articleID) {
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

    public String getEmotionType() {
        return emotionType;
    }

    public void setEmotionType(String emotionType) {
        this.emotionType = emotionType;
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

    @Id // primary key임을 지정
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer articleID;

    @Column(length = 200, nullable = false)
    private String title;

    @Column
    private String source;

    @Column
    private String media;

    @Column
    private String category;

    @Column
    private String emotionType;

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

}
