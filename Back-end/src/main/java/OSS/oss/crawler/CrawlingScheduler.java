package OSS.oss.crawler;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class CrawlingScheduler {
    private static final long INITIAL_DELAY = 0;
    private static final long PERIOD = 12; // 크롤링 주기를 12시간으로 설정
    private static final TimeUnit TIME_UNIT = TimeUnit.HOURS;

    public static void main(String[] args) {
        ScheduledExecutorService scheduler = Executors.newSingleThreadScheduledExecutor();
        scheduler.scheduleAtFixedRate(new CrawlingTask(), INITIAL_DELAY, PERIOD, TIME_UNIT);
    }

    private static class CrawlingTask implements Runnable {
        @Override
        public void run() {
            try {
                // 크롤링 작업 수행
                OSS.oss.crawler.NewsCrawler.main(null);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
}
