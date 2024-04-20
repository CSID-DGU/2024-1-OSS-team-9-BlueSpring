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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    private String id;
    private String password;

    private String major;
    private String category;
    private String moi; // 관심 언론사
    private int fov;
    @Temporal(TemporalType.TIMESTAMP)
    private Date staytime;
}
