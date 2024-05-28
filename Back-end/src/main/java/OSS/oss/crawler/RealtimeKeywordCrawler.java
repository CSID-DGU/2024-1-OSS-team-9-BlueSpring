package OSS.oss.crawler;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;

import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class RealtimeKeywordCrawler {
    public static void main(String[] args) {
        // ChromeDriver 설정
        System.setProperty("webdriver.chrome.driver", "Back-end/drivers/chromedriver.exe");

        // 크롬 설정을 담은 객체 생성
        ChromeOptions options = new ChromeOptions();
        // 창을 띄우지 않는 옵션
        //options.addArguments("headless");
        // 설정한 옵션을 담은 드라이버 객체 생성
        WebDriver driver = new ChromeDriver(options);

        String signalUrl = "https://www.signal.bz/";

        // CSV 파일에 저장할 FileWriter 객체 생성
        try (FileWriter writer = new FileWriter("realtime_keywords.csv")) {
            // CSV 파일에 헤더 작성
            writer.append("Rank,Keyword\n");

            driver.get(signalUrl);

            // 실시간 검색어 수집
            List<WebElement> keywordElements = driver.findElements(By.cssSelector("#app > div > main > div > section > div > section > section:nth-child(2) > div:nth-child(2) > div > div > div > a > span.rank-text"));
            List<String> keywordList = new ArrayList<>();
            for (WebElement element : keywordElements) {
                String keyword = element.getText();
                keywordList.add(keyword);
            }

            // 실시간 검색어 출력
            for (int i = 0; i < keywordList.size(); i++) {
                String keyword = keywordList.get(i);
                System.out.println((i + 1) + ". " + keyword);
                // CSV 파일에 데이터 작성
                writer.append((i + 1) + "," + escapeCSV(keyword)).append("\n");
            }

            System.out.println("실시간 검색어가 realtime_keywords.csv 파일에 저장되었습니다.");
        } catch (IOException e) {
            System.out.println("파일 저장 중 오류가 발생했습니다.");
            e.printStackTrace();
        }

        // WebDriver 종료
        driver.quit();
    }

    // CSV 파일에 작성할 때 값을 이스케이프 처리하는 메서드
    private static String escapeCSV(String value) {
        if (value.contains(",")) {
            value = "\"" + value + "\"";
        }
        return value;
    }
}