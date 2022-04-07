package com.naztech.lms.constants;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public final class Constants {
	public static final String STR_UNDERSCORE = "_";
	public static final String MAP_KEY_CIF_ID = "CIF_ID";
	public static final String MAP_KEY_BP_NO = "BP";
	public static final String MAP_KEY_NID = "NID";
	public static final String MAP_KEY_AC = "AC";
	public static final String MAP_KEY_PHONE = "PHONE";

	public static final String STR_UNIQUE_REQ_ID = "#UNIQUE_REQ_ID#";
	public static final String STR_SERVICE_REQUEST_ID = "#Ret_Cust_Inq#";
	public static final String STR_REQ_DATE_TIME = "#REQ_DATE_TIME#";
	public static final String STR_REQ_CUSTOMER_ID = "#REQ_CUSTOMER_ID#";
	public static final String DEFAULT_CHARSET = "UTF-8";
	public static Map<String, String> otp_number_map = new ConcurrentHashMap<String, String>();
	public static final String CBBL_MOBILE_USER = "CBBL";

}
