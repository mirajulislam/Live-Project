package com.example.JobScraperJavaEight;

import org.apache.commons.lang3.StringUtils;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;

import java.io.IOException;

public class JsoupExample {
    private static String USER_AGENT = "Mozilla/5.0 (iPad; U; CPU OS 3_2_1 like Mac OS X; en-us) AppleWebKit/531.21.10 (KHTML, like Gecko) Mobile/7B405";
    private static String baseUrl;

    public static void main(String[] args) throws IOException, InterruptedException {
        System.out.println("Ok");
        getScrapedJobs();
    }

    public static void getScrapedJobs() throws InterruptedException, IOException {
        baseUrl = "https://www.metacareers.com/";
        int totalPage = getTotalPage("https://www.metacareers.com/jobs?divisions[0]=Facebook");
        for (int i = 1; i <= totalPage; i++) {
            String url = "https://www.metacareers.com/jobs/?divisions[0]=Facebook&is_leadership=0&page=" + i
                    + "&is_in_page=0";
            try {
                browseJobList(url);
            } catch (Exception e) {
//                log.warn("Failed to parse job list page of [{}] -> {}" + url, e);
            }
        }
    }

    private static void browseJobList(String url) throws InterruptedException, IOException {
        Document doc = SSLHelper.getConnection(url).userAgent(USER_AGENT).timeout(10000).get();
        Elements rowList = doc.select("div[id=\"search_result\"] > div > a");
        for (Element el : rowList) {
            Job job = new Job(baseUrl + el.attr("href"));

            String category = el
                    .select(" div > div > div > div:last-child > div:last-child > div:nth-child(2) > div > div").text()
                    .trim();
            if (category.contains("+"))
                category = category.split("\\+")[0];
            job.setCategory(category);

            try {
                System.out.println(getJobDetail(job));
//                log.info("Save methode called");
            } catch (Exception e) {
//                log.warn("Failed to parse job detail of [{}] -> {}" + job.getUrl(), e);
            }
        }
    }

    private static Job getJobDetail(Job job) throws IOException {
        Document doc = SSLHelper.getConnection(job.getUrl()).userAgent(USER_AGENT).timeout(10000).get();
        job.setTitle(doc.selectFirst(
                        "div[id=\"careersContentContainer\"] > div > div:nth-child(2) > div > div > div:last-child > div > div:nth-child(2) > div:first-child")
                .text().trim());
        job.setName(job.getTitle());
        job.setSpec(doc.select(
                        "div[id=\"careersContentContainer\"] > div > div:last-child > div:nth-child(2) > div > div > div:first-child")
                .text());
        job.setPrerequisite(doc.select(
                        "div[id=\"careersContentContainer\"] > div > div:last-child > div:nth-child(2) > div > div > div:first-child > div > div:nth-child(4) > div:last-child")
                .text().trim());
        Element jobE = doc.selectFirst(
                "div[id=\"careersContentContainer\"] > div > div:nth-child(2) > div > div > div:last-child > div > div:nth-child(2)  a");
        if (jobE != null)
            job.setApplicationUrl(baseUrl + jobE.attr("href"));

        Element location = doc.selectFirst(
                "div[id=\"careersContentContainer\"] > div > div:nth-child(2) > div > div > div:last-child > div > div:nth-child(3) span");
        if (location != null)
            job.setLocation(location.text().trim());

        return job;
    }

    private static int getTotalPage(String url) throws IOException {
        try {
            Document doc = SSLHelper.getConnection(url).userAgent(USER_AGENT).timeout(10000).get();
            Element el = doc.selectFirst("div[id=\"search_result\"] > div:last-child > div > div");
            String totalJob = el.text().split("of")[1].trim();
            if (totalJob.contains(","))
                totalJob = totalJob.replaceAll(",", "").trim();
            return getPageCount(totalJob, 25);
        } catch (IOException e) {
//            log.error("Failed to parse total job, site exiting.... {}", e);
            throw e;
        }
    }

    public static int getPageCount(String jobCount, int jobPerPage) {
        if (StringUtils.isBlank(jobCount))
            return 0;
        try {
            int totalJobs = Integer.parseInt(jobCount);
            int totalPage = totalJobs / jobPerPage;
            return totalJobs % jobPerPage > 0 ? ++totalPage : totalPage;
        } catch (NumberFormatException e) {
//            log.warn("{} failed to parse job count from value {}", getSiteName(), jobCount);
        }
        return 0;
    }
}
