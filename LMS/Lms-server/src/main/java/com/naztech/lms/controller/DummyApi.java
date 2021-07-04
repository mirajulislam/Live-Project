/**
 * 
 */
package com.naztech.lms.controller;

import java.io.File;
import java.io.FileNotFoundException;

import org.apache.commons.io.FileUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.naztech.lms.constants.NConfigStr;
import com.naztech.lms.model.NConfiguration;
import com.naztech.lms.utils.NConfigUtils;

/**
 * @author md.kamruzzaman
 */
@RestController
@CrossOrigin(origins = "*")
public class DummyApi {
	private static Logger log = LogManager.getLogger(DummyApi.class);

	@Value("${finacle.res.file:classpath:docs/customer_res.xml}")
	String finFile;
	
	@Value("${i.office.res.file:classpath:docs/iOffice/res.xml}")
	String iOfficeFile;

	@PostMapping(value = "/finacle/customer")
	public String postMethodName(@RequestBody String entity) throws Exception {
		return FileUtils.readFileToString(getCustInfoFile());
	}

	public File getCustInfoFile() throws FileNotFoundException {
		NConfiguration fin = NConfigUtils.getConfig(NConfigStr.FILE, NConfigStr.RESPONSE, NConfigStr.FINACLE_CUSTOMER_RES);
		if (fin != null) {
			finFile = fin.getValue1();
		}
		log.info("Loading cust res file from [{}]", finFile);
		return ResourceUtils.getFile(finFile);
	}

	@PostMapping(value = "/ioffice/customer")
	public String getMethodName(@RequestBody String entity) throws Exception {
		return FileUtils.readFileToString(getCustInfoFileIOffice());
	}

	@GetMapping(value = "/ioffice/customer", produces = "application/xml")
	public String iOfficeCustAc() throws Exception {
		return FileUtils.readFileToString(getCustInfoFileIOffice());
	}

	public File getCustInfoFileIOffice() throws FileNotFoundException {
		NConfiguration fin = NConfigUtils.getConfig(NConfigStr.FILE, NConfigStr.RESPONSE, NConfigStr.I_OFFICE_CUSTOMER_RES);
		if (fin != null) {
			iOfficeFile = fin.getValue1();
		}
		log.info("Loading ioffic res file from [{}]", iOfficeFile);
		return ResourceUtils.getFile(iOfficeFile);
	}

}
