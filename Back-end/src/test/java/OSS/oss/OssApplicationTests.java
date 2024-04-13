package OSS.oss;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDateTime;

@SpringBootTest
class OssApplicationTests {

	@Autowired
	private NewsRepository newsRepository;
	@Test
	void testJPA() {
		News n1 = new News();
		n1.setTitle("테스트 타이틀1");
		n1.setCategory("경제");
		n1.setContent("테스트 컨텐츠");
		n1.setMedia("동아일보");
		n1.setSource("Test url");
		n1.setSummary("Test summary");
		n1.setTotalDislike(1);
		n1.setTotalLike(2);
		this.newsRepository.save(n1);
	}

}
