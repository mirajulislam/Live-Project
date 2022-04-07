package com.naztech.nid.scraper;

import java.io.File;
import java.net.URL;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.TimeUnit;

import javax.annotation.PostConstruct;

import org.apache.commons.io.FileUtils;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.naztech.nid.constants.Constants;
import com.naztech.nid.constants.Str;
import com.naztech.nid.model.NationalId;
import com.naztech.nid.utils.ScraperUtils;

/**
 * @author assaduzzaman.sohan
 */
@Service
public class NidScraper extends AbstractScraper {

	private static Logger log = LoggerFactory.getLogger(NidScraper.class);

	private static final DateTimeFormatter DF = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	public static WebDriverWait wait;
	public static WebDriver driver, driver2;

	@Value("${nid.user}")
	private String nidUser;

	@Value("${nid.pass}")
	private String nidPass;

	@Value("${nid.url}")
	private String url;

	@Value("${nid.base.image.path}")
	private String basePath;

	@Value("${chrome.driver.path}")
	private String chromeDriverPath;

	@Value("${nid.image.base.folder}")
	private String nidImageBaseFolder;

	private String publicUlrBasePath;

	@Value("${server.host.ip}")
	private String serverHost;

	@Value("${server.port}")
	private String serverPort;

	private boolean isDriverReady;

	@Value("${xpath.username.input}")
	private String xpathUsernameInput;

	@Value("${xpath.password.input}")
	private String xpathPasswordInput;

	@Value("${xpath.login.button}")
	private String xpathLoginButton;

	@Value("${xpath.verify.element}")
	private String xpathVerifyElement;

	@Value("${xpath.nidno.input}")
	private String xpathNidNoInput;

	@Value("${xpath.dob.input}")
	private String xpathDobInput;

	@Value("${xpath.verify.button}")
	private String xpathVerifyButton;

	@Value("${xpath.row.border.element}")
	private String xpathRowBorderElement;

	@Value("${xpath.person.img.element}")
	private String xpathPersonImgElement;

	@Value("${xpath.datepicker.year.element}")
	private String xpathDatepickerYearEl;

	@Value("${xpath.datepicker.month.element}")
	private String xpathDatepickerMonthEl;

	@Value("${xpath.datepicker.day.element}")
	private String xpathDatepickerDayEl;

	@PostConstruct
	public void init() {
		/**
		 * Prepare public base url like http://10.33.56.115:8084/
		 * http://ip:port/
		 */
		publicUlrBasePath = new StringBuilder().append(Str.http).append(serverHost).append(Str.STR_COLON).append(serverPort).append(Str.STR_SLASH)
		        .toString();
	}

	/**
	 * Initialize driver to search NID page
	 * 1. Preparing driver from system(driver will do all thing and driver2 will use to take NID holder's picture)
	 * 2. Loading NID server page
	 * 3. Login
	 * 4. Go to search NID page
	 */
	private void initializeDriver() throws Exception {
		log.debug("Initializing Chrome Driver");
		driver = getChromeDriver(chromeDriverPath, true);
		driver2 = getChromeDriver(chromeDriverPath, true);

		driver.manage().timeouts().pageLoadTimeout(60, TimeUnit.SECONDS);
		wait = new WebDriverWait(driver, 60);
	}

	private void quitDriver() {
		driver.quit();
		driver2.quit();
	}

	public NationalId doScrapNid(String nidNo, LocalDate nidDob) {
		log.info("Scraping Start nid:dob=>[{}]:[{}]", nidNo, nidDob);

		NationalId nid = new NationalId(nidNo, nidDob);
		nid.setNid(nidNo);
		nid.setDateOfBirth(nidDob);
		nid.setExtractTime(LocalDateTime.now());
		try {
			try {
				initializeDriver();
			}
			catch (Exception e) {
				log.error("Unable to initialize driver[{}]", e);
				nid.setComments("System Error");
				return nid;
			}

			try {
				driver.get(url);

				WebElement elUser = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpathUsernameInput)));
				WebElement elPass = driver.findElement(By.xpath(xpathPasswordInput));
				WebElement elLogin = driver.findElement(By.xpath(xpathLoginButton));
				elUser.sendKeys(nidUser);
				elPass.sendKeys(nidPass);
				elLogin.click();

				WebElement elVerify = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpathVerifyElement)));
				elVerify.click();
			}
			catch (Exception e) {
				log.error("Unable to Login [{}]", e);
				nid.setComments("Unable to login");
				return nid;
			}

			log.info("Setting NID and DOB value to verify");
			try {
				WebElement elNid = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpathNidNoInput)));
				elNid.sendKeys(nidNo);

				// clicking text box to visible date picker
				WebElement elShowDatePicker = driver.findElement(By.xpath(xpathDobInput));
				elShowDatePicker.click();

				List<WebElement> elYear = wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(By.xpath(xpathDatepickerYearEl), 10));
				for (WebElement el : elYear) {
					if (el.getText().equalsIgnoreCase(String.valueOf(nid.getDateOfBirth().getYear()))) {
						el.click();
						break;
					}
				}
				List<WebElement> elMonth = wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(By.xpath(xpathDatepickerMonthEl), 10));
				for (WebElement el : elMonth) {
					if (nid.getDateOfBirth().getMonth().toString().toLowerCase().contains(el.getText().trim().toLowerCase())) {
						el.click();
						break;
					}
				}
				List<WebElement> elDate = wait.until(ExpectedConditions.numberOfElementsToBeMoreThan(By.xpath(xpathDatepickerDayEl), 10));
				for (WebElement el : elDate) {
					if (el.getText().equals(String.valueOf(nid.getDateOfBirth().getDayOfMonth()))) {
						el.click();
						break;
					}
				}

				WebElement btnVerify = driver.findElement(By.xpath(xpathVerifyButton));
				btnVerify.click();
			}
			catch (Exception e) {
				log.error("Failed to Fill NID and DOB value [{}]", e);
				nid.setComments("Failed to Fill NID and DOB value");
				return nid;
			}

			try {
				WebElement rowBorder = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath(xpathRowBorderElement)));
				String dataText = rowBorder.getText();
				if (dataText.length() <= 50 && dataText.toLowerCase().contains("invalid")) {
					nid.setComments(dataText);
					return nid;
				}
				nid = setNidInfo(rowBorder, nid);
			}
			catch (Exception e) {
				log.error("Failed to Parse NID Info [{}]", e);
				nid.setComments("Failed to Parse NID Info");
				return nid;
			}

			try {
				JavascriptExecutor executor = (JavascriptExecutor) driver;
				executor.executeScript("document.body.style.zoom = '0.5'");
				executor.executeScript("window.scrollBy(0,document.body.scrollHeight)");

				File scrFile = ((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE);
				String path = ScraperUtils.buildImagePath(nid.getNid(), basePath, Constants.SUFFIX_NID);
				File desFile = new File(path);
				FileUtils.copyFile(scrFile, desFile);

				nid.setNidImageName(desFile.getName());
				nid.setNidImagePath(path);

				executor.executeScript("document.body.style.zoom = '1'");
			}
			catch (Exception e) {
				log.error("Unable to take picture [{}]", e);
			}

			try {
				String personImgLink = driver.findElement(By.xpath(xpathPersonImgElement)).getAttribute("src");
				String path = ScraperUtils.buildImagePath(nid.getNid(), basePath, Constants.SUFFIX_PERSON);
				File desFile = new File(path);
				FileUtils.copyURLToFile(new URL(personImgLink), desFile);

				nid.setPersonImageName(desFile.getName());
				nid.setPersonImagePath(path);
			}
			catch (Exception e) {
				log.error("Unable to take picture [{}]", e);
			}

			try {
				nid.setNidImagePublicPath(buildPublicPath(nid.getNid(), nid.getNidImageName()));
				nid.setPersonImagePublicPath(buildPublicPath(nid.getNid(), nid.getPersonImageName()));
			}
			catch (Exception e) {
				log.error("Unable to make public URL [{}]", e);
			}

			return nid;
		}
		catch (Exception e) {
			log.error("Exception getting Nid info [{}]", e);
			nid.setComments(e.getLocalizedMessage());
			return nid;
		}
		finally {
			quitDriver();
		}
	}

	public String buildPublicPath(String nidId, String imageName) {
		return new StringBuilder().append(publicUlrBasePath).append(nidImageBaseFolder).append(Str.STR_SLASH).append(nidId).append(Str.STR_SLASH)
		        .append(imageName).toString();
	}

	private NationalId setNidInfo(WebElement rowBorder, NationalId nid) {
		List<WebElement> dataElList = rowBorder.findElements(By.xpath("div[@class='col-9 border']"));
		List<WebElement> addrElList = rowBorder.findElements(By.xpath("div[@class='col-9']/div"));
		List<WebElement> presentAddrElList = addrElList.get(0).findElements(By.xpath("div[@class='col-3 border']"));
		List<WebElement> permanentAddrElList = addrElList.get(1).findElements(By.xpath("div[@class='col-3 border']"));

		nid.setNameBangla(getValueFromList(dataElList, 0));
		nid.setNameEnglish(getValueFromList(dataElList, 1));
		nid.setDateOfBirth(parseDate(getValueFromList(dataElList, 2), DF));
		nid.setFatherName(getValueFromList(dataElList, 3));
		nid.setMotherName(getValueFromList(dataElList, 4));
		nid.setSpouseName(getValueFromList(dataElList, 5));
		nid.setOccupation(getValueFromList(dataElList, 6));
		nid.setBloodGroup(getValueFromList(dataElList, 7));
		nid.setNid(getValueFromList(dataElList, 8));
		nid.setNidPin(getValueFromList(dataElList, 9));

		nid.setPresentDivision(getValueFromList(presentAddrElList, 1));
		nid.setPresentDistrict(getValueFromList(presentAddrElList, 3));
		nid.setPresentRmo(getValueFromList(presentAddrElList, 5));
		nid.setPresentMunicipality(getValueFromList(presentAddrElList, 7));
		nid.setPresentUpozila(getValueFromList(presentAddrElList, 9));
		nid.setPresentUnion(getValueFromList(presentAddrElList, 11));
		nid.setPresentMoholla(getValueFromList(presentAddrElList, 13));
		nid.setPresentAddMoholla(getValueFromList(presentAddrElList, 15));
		nid.setPresentWardUnionPorishod(getValueFromList(presentAddrElList, 17));
		nid.setPresentVillage(getValueFromList(presentAddrElList, 19));
		nid.setPresentAddVillage(getValueFromList(presentAddrElList, 21));
		nid.setPresentHome(getValueFromList(presentAddrElList, 23));
		nid.setPresentPostOffice(getValueFromList(presentAddrElList, 25));
		nid.setPresentPostalCode(getValueFromList(presentAddrElList, 27));
		nid.setPresentRegion(getValueFromList(presentAddrElList, 29));

		nid.setPermanentDivision(getValueFromList(permanentAddrElList, 1));
		nid.setPermanentDistrict(getValueFromList(permanentAddrElList, 3));
		nid.setPermanentRmo(getValueFromList(permanentAddrElList, 5));
		nid.setPermanentMunicipality(getValueFromList(permanentAddrElList, 7));
		nid.setPermanentUpozila(getValueFromList(permanentAddrElList, 9));
		nid.setPermanentUnion(getValueFromList(permanentAddrElList, 11));
		nid.setPermanentMoholla(getValueFromList(permanentAddrElList, 13));
		nid.setPermanentAddMoholla(getValueFromList(permanentAddrElList, 15));
		nid.setPermanentWardUnionPorishod(getValueFromList(permanentAddrElList, 17));
		nid.setPermanentVillage(getValueFromList(permanentAddrElList, 19));
		nid.setPermanentAddVillage(getValueFromList(permanentAddrElList, 21));
		nid.setPermanentHome(getValueFromList(permanentAddrElList, 23));
		nid.setPermanentPostOffice(getValueFromList(permanentAddrElList, 25));
		nid.setPermanentPostalCode(getValueFromList(permanentAddrElList, 27));
		nid.setPermanentRegion(getValueFromList(permanentAddrElList, 29));

		nid.setRequestId(getValueFromPageByXpath("div[@class='col-9 font-weight-bold']", 0));

		return nid;
	}

	private String getValueFromList(List<WebElement> list, int index) {
		try {
			return list.get(index).getText().trim();
		}
		catch (Exception e) {
			return "";
		}
	}

	private String getValueFromPageByXpath(String xpath, int index) {
		try {
			return driver.findElements(By.xpath("div[@class='col-9 border']")).get(index).getText().trim();
		}
		catch (Exception e) {
			return "";
		}
	}

	public boolean isDriverReady() {
		return isDriverReady;
	}

	public void setDriverReady(boolean isDriverReady) {
		this.isDriverReady = isDriverReady;
	}

}
