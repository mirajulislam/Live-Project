package com.naztech.nid;

import java.io.File;
import java.io.IOException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.concurrent.TimeUnit;

import org.apache.commons.io.FileUtils;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import com.naztech.nid.model.NationalId;
import com.naztech.nid.scraper.AbstractScraper;

class NidScraperApplicationTests extends AbstractScraper {
	DateTimeFormatter DF_yyyyMMdd = DateTimeFormatter.ofPattern("yyyy/MM/dd");
	DateTimeFormatter DF = DateTimeFormatter.ofPattern("yyyy-MM-dd");

	@Test
	void contextLoads() {
		String nidNo = "test-nid";
		LocalDate dateOfBirth = parseDate("1998/01/12", DF_yyyyMMdd);

		WebDriver driver = getChromeDriver("C:\\GIT\\Project\\WScrap\\nid\\NidScraper\\webdriver\\chromedriver.exe", false);
		WebDriver driver2 = getChromeDriver("C:\\GIT\\Project\\WScrap\\nid\\NidScraper\\webdriver\\chromedriver.exe", false);
		driver.manage().timeouts().pageLoadTimeout(20, TimeUnit.SECONDS);
		WebDriverWait wait = new WebDriverWait(driver, 20);

		driver.get("http://10.33.56.68/NID");

		WebElement elUser = driver.findElement(By.xpath("//input[@name='username']"));
		wait.until(ExpectedConditions.visibilityOf(elUser));

		WebElement elPass = driver.findElement(By.xpath("//input[@name='password']"));
		WebElement elLogin = driver.findElement(By.xpath("//input[@id='login-button']"));
		elUser.sendKeys("test-user");
		elPass.sendKeys("test-pass");
		elLogin.click();

		WebElement elVerify = driver.findElement(By.xpath("//a[@class='align-content-center']"));
		wait.until(ExpectedConditions.visibilityOf(elVerify));
		elVerify.click();

		WebElement elNid = driver.findElement(By.xpath("//input[@id='nidVoterInput']"));
		WebElement elDob = driver.findElement(By.xpath("//input[@id='dateOfBirth']"));
		elNid.sendKeys(nidNo);
		elDob.sendKeys(DF.format(dateOfBirth));

		WebElement btnVerify = driver.findElement(By.xpath("//button[@id='btnVerify']"));
		btnVerify.click();

		WebElement rowBorder = driver.findElement(By.xpath("//div[@class='row border']"));

		List<WebElement> dataElList = rowBorder.findElements(By.xpath("div[@class='col-9 border']"));
		List<WebElement> addrElList = rowBorder.findElements(By.xpath("div[@class='col-9']/div"));
		List<WebElement> presentAddrElList = addrElList.get(0).findElements(By.xpath("div[@class='col-3 border']"));
		List<WebElement> permanentAddrElList = addrElList.get(1).findElements(By.xpath("div[@class='col-3 border']"));

		System.out.println(driver.getPageSource());

		NationalId nid = new NationalId();

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

		String personImgLink = driver.findElement(By.xpath("//img[@class='border border-secondary']")).getAttribute("src");

		driver2.get(personImgLink);

		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("document.body.style.zoom = '0.57'");
		executor.executeScript("window.scrollBy(0,document.body.scrollHeight)");
		nid.setNidImage(((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE));
		nid.setNidPersonImage(((TakesScreenshot) driver2).getScreenshotAs(OutputType.FILE));
		executor.executeScript("document.body.style.zoom = '1'");

		File desFile = new File("C:\\NID\\nid.png");
		try {
			FileUtils.copyFile(nid.getNidImage(), desFile);
		}
		catch (IOException e) {
		}

		File desFile2 = new File("C:\\NID\\person.png");
		try {
			FileUtils.copyFile(nid.getNidPersonImage(), desFile2);
		}
		catch (IOException e) {
		}

		driver.quit();
		driver2.quit();
	}

	private String getValueFromList(List<WebElement> list, int index) {
		try {
			return list.get(index).getText().trim();
		}
		catch (Exception e) {
			return "";
		}
	}

	@Test
	void contextLoads2() {
		String nidNo = "8701550140";
		LocalDate dateOfBirth = parseDate("1997/04/01", DF_yyyyMMdd);

		WebDriver driver = getChromeDriver("C:\\STS-WS\\NidScraper\\webdriver\\chromedriver.exe", false);
		WebDriver driver2 = getChromeDriver("C:\\STS-WS\\NidScraper\\webdriver\\chromedriver.exe", false);
		driver.manage().timeouts().pageLoadTimeout(20, TimeUnit.SECONDS);
		WebDriverWait wait = new WebDriverWait(driver, 20);

		driver.get("https://prportal.nidw.gov.bd/partner-portal/login");

		WebElement elUser = driver.findElement(By.xpath("//input[@name='username']"));
		wait.until(ExpectedConditions.visibilityOf(elUser));

		WebElement elPass = driver.findElement(By.xpath("//input[@name='password']"));
		WebElement elLogin = driver.findElement(By.xpath("//input[@id='login-button']"));
		elUser.sendKeys("cbbl4");
		elPass.sendKeys("Cbbl@1234");
		elLogin.click();

		WebElement elVerify = driver.findElement(By.xpath("//a[@class='align-content-center']"));
		wait.until(ExpectedConditions.visibilityOf(elVerify));
		elVerify.click();

		WebElement elNid = driver.findElement(By.xpath("//input[@id='nidVoterInput']"));
		elNid.sendKeys(nidNo);

		// clicking text box to visible date picker
		WebElement elShowDatePicker = driver.findElement(By.xpath("//input[@id='dateOfBirth']"));
		elShowDatePicker.click();

		// select year
		List<WebElement> elYear = driver.findElements(By.xpath("//div[@class='ui-datepicker-title']/select[@class='ui-datepicker-year']/option"));
		for (WebElement el : elYear) {
			if (el.getText().equalsIgnoreCase(String.valueOf(dateOfBirth.getYear()))) {
				el.click();
				break;
			}
		}

		// select month
		List<WebElement> elMonth = driver.findElements(By.xpath("//div[@class='ui-datepicker-title']/select[@class='ui-datepicker-month']/option"));
		for (WebElement el : elMonth) {
			if (dateOfBirth.getMonth().toString().toLowerCase().contains(el.getText().trim().toLowerCase())) {
				el.click();
				break;
			}
		}

		// select date
		List<WebElement> elDate = driver.findElements(By.xpath("//table[@class='ui-datepicker-calendar']/tbody/tr/td[@data-handler='selectDay']/a"));
		for (WebElement el : elDate) {
			if (el.getText().equals(String.valueOf(dateOfBirth.getDayOfMonth()))) {
				el.click();
				break;
			}
		}

		WebElement btnVerify = driver.findElement(By.xpath("//button[@id='btnVerify']"));
		btnVerify.click();

		WebElement rowBorder = wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//div[@class='row border']")));

		List<WebElement> dataElList = rowBorder.findElements(By.xpath("div[@class='col-9 border']"));
		List<WebElement> addrElList = rowBorder.findElements(By.xpath("div[@class='col-9']/div"));
		List<WebElement> presentAddrElList = addrElList.get(0).findElements(By.xpath("div[@class='col-3 border']"));
		List<WebElement> permanentAddrElList = addrElList.get(1).findElements(By.xpath("div[@class='col-3 border']"));

		NationalId nid = new NationalId();

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

		String personImgLink = driver.findElement(By.xpath("//img[@class='border border-secondary']")).getAttribute("src");

		driver2.get(personImgLink);

		JavascriptExecutor executor = (JavascriptExecutor) driver;
		executor.executeScript("document.body.style.zoom = '0.57'");
		executor.executeScript("window.scrollBy(0,document.body.scrollHeight)");
		nid.setNidImage(((TakesScreenshot) driver).getScreenshotAs(OutputType.FILE));
		nid.setNidPersonImage(((TakesScreenshot) driver2).getScreenshotAs(OutputType.FILE));
		executor.executeScript("document.body.style.zoom = '1'");
	}

	@Test
	void testDate() {
		LocalDate dateOfBirth = parseDate("1998/01/12", DF_yyyyMMdd);
		System.out.println(dateOfBirth.getYear());
		System.out.println(dateOfBirth.getMonth());
		System.out.println(dateOfBirth.getDayOfMonth());
	}
}
