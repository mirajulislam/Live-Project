package com.example.JobScraperJavaEight;

import com.gargoylesoftware.htmlunit.NicelyResynchronizingAjaxController;
import com.gargoylesoftware.htmlunit.SilentCssErrorHandler;
import com.gargoylesoftware.htmlunit.WebClient;
import com.gargoylesoftware.htmlunit.WebClientOptions;
import com.gargoylesoftware.htmlunit.html.HtmlElement;
import com.gargoylesoftware.htmlunit.html.HtmlPage;
import org.apache.commons.lang3.time.DateUtils;

import java.io.IOException;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.Date;
import java.util.List;

public class HtmlUnitExample {
    private static WebClient webClient = null;
    private static String baseUrl;
    private static DateTimeFormatter DF = DateTimeFormatter.ofPattern("dd MMM yyyy");
    private static DateTimeFormatter DF1 = DateTimeFormatter.ofPattern("d MMM yyyy");
    private static int expectedJobCount;
    private static Exception exception;

    public static void main(String[] args) throws IOException, InterruptedException {
        getScrapedJobs();
    }

    public static void getScrapedJobs() throws InterruptedException, IOException {
        String url = "https://nomuracareers.resourcesolutions.com/gold/cbjbaaa/jobsearch/jobresults.cfm?oSkillCategory=&oJobType=&oJobNameList=&oJobTitle=&oContainsAll=&oJobLocation=&overrideStartRow=1&overrideEndRow=69&chkInternal=";
        baseUrl = url.substring(0, 67);
        HtmlPage page = getWeb().getPage(url);
        webClient.waitForBackgroundJavaScript(5000);
        List<HtmlElement> viewAllEl = page.getBody().getElementsByAttribute("span", "class", "RJobTitle");
        for (HtmlElement el : viewAllEl) {
            if ("View All".equalsIgnoreCase(el.getTextContent())) {
                page = el.click();
                break;
            }
        }
        getSummaryPage(page);
    }

    private static void getSummaryPage(HtmlPage page) throws InterruptedException {
        try {
            Job job = new Job();
            List<HtmlElement> row = page.getByXPath("//div[@class = 'JSResForm']/div[@style='text-align:left;']");
            expectedJobCount = row.size();
            for (int i = 0; i <= row.size() - 1; i++) {
                job.setTitle(row.get(i).getElementsByTagName("div").get(0).getElementsByTagName("a").get(0).getTextContent().split("-")[1].trim());
                job.setName(job.getTitle());
                job.setReferenceId(row.get(i).getElementsByTagName("div").get(0).getElementsByTagName("a").get(0).getTextContent().split("-")[0].trim());
                job.setUrl(getBaseUrl() + row.get(i).getElementsByTagName("div").get(0).getElementsByTagName("a").get(0).getAttribute("href"));
                job.setCategory(row.get(i).getElementsByTagName("div").get(1).getTextContent().split(":")[1].trim());
                job.setPostedDate(parseDate(row.get(i).getElementsByTagName("div").get(2).getTextContent().split(":")[1].trim().substring(2), DF, DF1));
                try {
                    System.out.println(getJobDetail(job));
                } catch (Exception e) {
                    exception = e;
                }
            }
        } catch (Exception e) {
//            log.warn("Failed to parse summary page of " + getSiteName(), e);
        }
    }

    private static Job getJobDetail(Job job) {
        try {
            HtmlPage page = getWeb().getPage(job.getUrl());
            webClient.waitForBackgroundJavaScript(5000);
            try {
                job.setSpec(page.getBody().getOneHtmlElementByAttribute("div", "class", "WordSection1").getTextContent().trim());
                return job;
            } catch (Exception e) {
                job.setSpec(page.getBody().getOneHtmlElementByAttribute("div", "class", "JDetailFormDetail").getTextContent().trim());
                return job;
            }
        } catch (Exception e) {
//            log.warn("Failed to parse job details of " + job.getUrl(), e);
        }
        return null;
    }

    private static WebClient getWeb() {
        if (webClient == null) {
            webClient = getFirefoxClient();
            webClient.waitForBackgroundJavaScript(20 * 1000);
            webClient.waitForBackgroundJavaScriptStartingBefore(10 * 1000);
            webClient.getOptions().setTimeout(30 * 1000);
            webClient.getCookieManager().setCookiesEnabled(true);
            webClient.getOptions().setUseInsecureSSL(true);
            webClient.getOptions().setThrowExceptionOnScriptError(false);
            webClient.getOptions().setThrowExceptionOnFailingStatusCode(false);
            webClient.setCssErrorHandler(new SilentCssErrorHandler());
        }
        return webClient;
    }

    protected static WebClient getFirefoxClient() {
        WebClient ob = new WebClient();
        setWebClientOptions(ob.getOptions());
        setWebClientPreferences(ob);
        return ob;
    }

    private static void setWebClientOptions(WebClientOptions opts) {
        opts.setDoNotTrackEnabled(true);
        opts.setThrowExceptionOnScriptError(false);
        opts.setThrowExceptionOnFailingStatusCode(false);
        opts.setTimeout(30000);
        opts.setUseInsecureSSL(true);
    }

    private static void setWebClientPreferences(WebClient ob) {
        ob.waitForBackgroundJavaScript(10000);
        ob.setJavaScriptTimeout(15000);
        ob.setAjaxController(new NicelyResynchronizingAjaxController());
        ob.getCookieManager().setCookiesEnabled(true);
    }

    protected static String getBaseUrl() {
        return baseUrl;
    }

    protected static LocalDate parseDate(String val, DateTimeFormatter... formats) {
        for (DateTimeFormatter fmt : formats) {
            LocalDate ob = parseDate(val, fmt);
            if (ob != null) return ob;
        }
//        log.warn(getSiteName() + " failed to parse date " + val);
        return null;
    }

    protected static LocalDate parseDate(String date, String... patterns) {
        Date dfDate = null;
        try {
            dfDate = DateUtils.parseDate(date, patterns);
        } catch (ParseException e) {
//            log.warn(getSiteName() + " failed to parse date " + date);
        }
        return new java.sql.Date(dfDate.getTime()).toLocalDate();
    }

    private static LocalDate parseDate(String val, DateTimeFormatter df) {
        try {
            return LocalDate.parse(val, df);
        } catch (DateTimeParseException e) {
            // NOTE: do not put log here. intentionally left blank
        }
        return null;
    }
}
