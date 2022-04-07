package com.naztech.nid.scraper;

import java.io.IOException;
import java.util.Date;

import org.openqa.selenium.WebElement;

import com.naztech.nid.model.NationalId;

/**
 * 
 * @author fahim.reza
 *
 */
public interface Scraper {

	NationalId scrapNid(String nid, Date dob);
	void saveDetailsInfoImage(WebElement el, String name, NationalId nid) throws IOException;
	void savePhoto(WebElement el, String name, NationalId nid) throws IOException;
	void quit();
}
