package com.naztech.nid.scraper;

import java.io.File;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeDriverService;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * @author fahim.reza
 */

public abstract class AbstractScraper {

	private static Logger log = LoggerFactory.getLogger(AbstractScraper.class);

	/**
	 * Returns selenium {@link WebDriver} instance of Google Chrome browser.
	 * 
	 * @param Path
	 *            of Google Chrome web driver binary
	 * @return Google Chrome {@link WebDriver} instance
	 */
	protected WebDriver getChromeDriver(String driverPath, boolean isHeadless) {
		log.info("Using chromeDriver from [{}]", driverPath);
		ChromeDriverService service = new ChromeDriverService.Builder().usingDriverExecutable(new File(driverPath)).usingAnyFreePort().build();
		ChromeOptions opts = new ChromeOptions().addArguments("--no-sandbox")
		        .addArguments("--disable-dev-shm-usage", "--disable-extensions", "disable-infobars")
		        .setExperimentalOption("useAutomationExtension", false).setHeadless(isHeadless);

		ChromeDriver driver = new ChromeDriver(service, opts);
		/*
		 * Developer should increase page load timeout in their scraper class when
		 * needed
		 */
		driver.manage().timeouts().pageLoadTimeout(40, TimeUnit.SECONDS);
		driver.manage().timeouts().setScriptTimeout(10, TimeUnit.SECONDS);
		return driver;
	}

	protected WebDriver getFirefoxDriver(String driverPath, boolean isHeadless) {
		log.info("Using FirefoxDriver from [{}]", driverPath);

		System.setProperty("webdriver.gecko.driver", driverPath);
		FirefoxOptions options = new FirefoxOptions();
		options.setHeadless(isHeadless);
		FirefoxDriver driver = new FirefoxDriver(options);
		/*
		 * Developer should increase page load timeout in their scraper class when
		 * needed
		 */
		driver.manage().timeouts().pageLoadTimeout(40, TimeUnit.SECONDS);
		driver.manage().timeouts().setScriptTimeout(10, TimeUnit.SECONDS);
		return driver;
	}

	/**
	 * Returns {@link LocalDate} instance from the given date formats.
	 * 
	 * @param val
	 *            String value of date
	 * @param formats
	 *            Expected {@link DateTimeFormatter} formats
	 * @return {@link LocalDate} instance
	 */
	protected LocalDate parseDate(String val, DateTimeFormatter... formats) {
		for (DateTimeFormatter fmt : formats) {
			LocalDate ob = parseDate(val, fmt);
			if (ob != null) return ob;
		}
		log.warn("Failed to parse date [{}]", val);
		return null;
	}

	private LocalDate parseDate(String val, DateTimeFormatter df) {
		try {
			return LocalDate.parse(val, df);
		}
		catch (DateTimeParseException e) {
			// NOTE: do not put log here. intentionally left blank
		}
		return null;
	}

}
