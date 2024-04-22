package OSS.oss.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Getter
@Setter
public class User {
    @Id
    //id 생성 방식 - AUTO_INCREMENT로 자동으로 생성되게 함
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId; //pk값 이름 테이블명+Id로 통일

    private String id; // 사용자 id = email값
    private String password;

    private String major;
    private String category; // 관심 카테고리
    private String moi; // 관심 언론사
    private int fov; // 방문 빈도
    @Temporal(TemporalType.TIMESTAMP)
    private Date staytime;
}
