package com.naztech.nid.utils;

import java.io.File;
import java.net.InetAddress;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.naztech.nid.constants.Constants;
import com.naztech.nid.constants.Str;
import com.naztech.nid.model.NationalId;

public class ScraperUtils {
	private static Logger log = LoggerFactory.getLogger(ScraperUtils.class);
	private static final String FILE_EPERATOR = File.separator;
	private static final String STR_SLASH = "/";
	private static final DateFormat DF_IMAGE_NAME = new SimpleDateFormat("yyyyMMdd");

	public static String buildImagePath(String nid, Date dob, String basePath, String subFolder, String suffix) {
		return new StringBuilder().append(basePath).append(FILE_EPERATOR).append(subFolder).append(FILE_EPERATOR)
		        .append(buildImageName(nid, dob, suffix)).toString();
	}

	public static String buildImageName(String nid, Date dob, String suffix) {
		return new StringBuilder().append(nid).append(Str.UNDERSCORE).append(DF_IMAGE_NAME.format(dob)).append(Str.UNDERSCORE).append(suffix)
		        .append(Constants.EXT_PNG).toString();
	}

	public static String buildImagePath(String nid, String basePath, String suffix) {
		String path = buildImageName(nid, basePath);
		makeDirIfNotExist(path);
		return new StringBuilder().append(path).append(FILE_EPERATOR).append(buildImageName(suffix)).toString();
	}

	public static String buildImageName(String nid, String basePath) {
		return new StringBuilder().append(basePath).append(FILE_EPERATOR).append(nid).toString();
	}

	public static String buildImageName(String suffix) {
		return new StringBuilder().append(suffix).append(Constants.EXT_PNG).toString();
	}

	public static void makeDirIfNotExist(String path) {
		File theDir = new File(path);
		if (!theDir.exists()) {
			theDir.mkdirs();
		}
	}

	public static String getIp() {
		try {
			InetAddress ipAddr = InetAddress.getLocalHost();
			String ip = ipAddr.toString();
			log.info("Machine ip [{}]", ip);
			if (ip.contains(STR_SLASH)) {
				return ip.split(STR_SLASH)[1];
			}
			else {
				return ip;
			}
		}
		catch (Exception e) {
			log.error("Exception getting machine ip {}", e);
		}
		return "";
	}

	public static boolean isNidDataExpired(NationalId nid, int nidExpiredTimeInDays) {
		if (nid.getExtractTime() == null) return true;
		if (Math.abs(nid.getExtractTime().until(LocalDateTime.now(), ChronoUnit.DAYS)) > nidExpiredTimeInDays) return true;
		return false;
	}

	public static boolean isUnsuccessfull(NationalId nid) {
		if (nid.getSuccess() == null || !nid.getSuccess().equals(Constants.SUCCESS_FLAG)) return true;
		return false;
	}

}
