package com.example.JobScraperJavaEight;

import org.apache.commons.lang3.StringUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class SeleniumExample {
    public static WebDriver driver;
    public static WebDriverWait wait;

    public static void main(String[] args) {
        prepareDriver();
        getScrapedJobs();

    }

    public static void prepareDriver() {
        System.setProperty("webdriver.chrome.driver", "C:\\Users\\nafiuzzaman.parves\\Downloads\\JobScraperJavaEight\\src\\main\\resources\\chromedriver.exe");
        // it will open up chrome
//        driver = new ChromeDriver();

        // it won't open chrome
        ChromeOptions options = new ChromeOptions().setHeadless(true);
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(driver, 40);
    }

    public static void getScrapedJobs() {
        try {
            driver.get("https://adobe.wd5.myworkdayjobs.com/external_experienced");
            List<Job> JobList = new ArrayList<Job>();
            int count = 0;
            while (true) {
                try {
                    List<WebElement> jobListE = wait.until(ExpectedConditions
                            .presenceOfAllElementsLocatedBy(By.cssSelector("a[data-automation-id=\"jobTitle\"]")));

                    for (WebElement webElement : jobListE) {
                        Job job = new Job();
                        job.setUrl(webElement.getAttribute("href"));
                        JobList.add(job);
                    }
                    if (!nextPage())
                        break;
                } catch (Exception e) {
//                    log.info(getSiteName() + " Failed job parse ", e);
                }
                count++;
                if(count == 2)
                    break;
            }

            for (Job eachJob : JobList) {
                try {
                    System.out.println(getJobDetails(eachJob));
                    System.out.println("************************************************************************************************************************************************************************************************");
                } catch (Exception e) {
//                    log.info("Failed to parse job details of [{}]", eachJob.getUrl(), e);

                }
            }
        } catch (Exception e) {
//            log.info("Exception in summary page, [{}]", site.getUrl(), e);
        } finally {
            driver.quit();
        }
    }

    private static boolean nextPage() {
        try {
            Thread.sleep(2000);
            List<WebElement> element = driver.findElements(By.cssSelector("button[aria-label=\"next\"]"));
            if (!element.isEmpty()) {
                WebElement nextBtn = element.get(0);
                JavascriptExecutor executor = (JavascriptExecutor) driver;
                executor.executeScript("arguments[0].click();", nextBtn);
                return true;
            } else
                return false;
        } catch (Exception e) {
//            log.error("can't go next page {}", e);
            return false;
        }
    }

    private static Job getJobDetails(Job job) throws InterruptedException {
        driver.get(job.getUrl());
        Thread.sleep(300);
        WebElement JobE = wait.until(ExpectedConditions
                .presenceOfElementLocated(By.cssSelector("h2[data-automation-id=\"jobPostingHeader\"]")));
        job.setName(JobE.getText().trim());
        job.setTitle(job.getName());
        JobE = driver.findElement(By.cssSelector("div[data-automation-id=\"jobPostingDescription\"]"));
        job.setSpec(JobE.getText().trim());
        JobE = driver.findElement(By.cssSelector("div[data-automation-id=\"requisitionId\"] dl > dd"));
        job.setReferenceId(JobE.getText().trim());
        JobE = driver.findElement(By.cssSelector(
                "div[data-automation-id=\"job-posting-details\"] div[data-automation-id=\"time\"] dl > dd"));
        job.setType(JobE.getText());
        JobE = driver.findElement(By.cssSelector(
                "div[data-automation-id=\"job-posting-details\"] div[data-automation-id=\"locations\"] dl > dd"));
        job.setLocation(JobE.getText());
        JobE = driver.findElement(By.cssSelector("a[data-automation-id=\"adventureButton\"]"));
        if (JobE != null)
            job.setApplicationUrl(JobE.getAttribute("href"));
        JobE = driver.findElement(By.cssSelector("div[data-automation-id=\"postedOn\"]"));
        String dateString = JobE.getText().split("Posted")[1].trim();
        job.setPostedDate(parseAgoDates(dateString));
        return job;
    }

    protected static LocalDate parseAgoDates(String val) {
        if (StringUtils.isBlank(val))
            return null;
        val = val.toLowerCase();

        LocalDate now = LocalDate.now();
        if ("today".equals(val))
            return now;
        if ("yesterday".equals(val))
            return now.minusDays(1);

        val = val.replace("ago", "").trim();
        String[] parts = val.split(" ");
        parts[0] = parts[0].replace("+", "");

        if ("hours".contains(parts[1]))
            return now;
        Long number = WordToNumbers.getNumber(parts[0]);
        if ("days".contains(parts[1]))
            return now.minusDays(number);
        if ("weeks".contains(parts[1]))
            return now.minusWeeks(number);
        if ("months".contains(parts[1]))
            return now.minusMonths(number);
        if ("years".contains(parts[1]))
            return now.minusYears(number);
        return null;
    }


}
