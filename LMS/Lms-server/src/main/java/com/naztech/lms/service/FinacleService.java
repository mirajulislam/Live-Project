/**
 * 
 */
package com.naztech.lms.service;

import java.io.File;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.UUID;

import org.apache.commons.io.FileUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import com.naztech.lms.constants.Constants;
import com.naztech.lms.model.Customer;
import com.naztech.lms.model.xml.req.Body;
import com.naztech.lms.model.xml.req.Header;
import com.naztech.lms.model.xml.req.MessageKey;
import com.naztech.lms.model.xml.req.ReqFIXML;
import com.naztech.lms.model.xml.req.RequestHeader;
import com.naztech.lms.model.xml.req.RequestMessageInfo;
import com.naztech.lms.model.xml.req.RetCustInqRequest;
import com.naztech.lms.model.xml.req.RetCustInqRq;
import com.naztech.lms.model.xml.req.Token;
import com.naztech.lms.model.xml.res.IOFFICEGET;
import com.naztech.lms.model.xml.res.RetCustDtls;
import com.naztech.lms.model.xml.utils.XmlParser;
import com.naztech.lms.utils.NConfigUtils;
import com.naztech.lms.utils.RequestSender;

/**
 * @author md.kamruzzaman
 */
public class FinacleService {
	private static Logger log = LogManager.getLogger(LoanService.class);

	private static final DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
	private static final DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");

	@Value("${finacle.service.request.id:RetCustInq}")
	String serviceRequestId;

	@Value("${finacle.service.request.version:10.2}")
	String serviceRequestVersion;

	@Value("${finacle.channel.id:CRM}")
	String channelId;

	@Value("${finacle.bank.id:01}")
	String bankId;

	@Value("${fincle.cust.req.xml:finacle_customer_req.xml}")
	String finacleCustReqXml;

	public void init() {
		try {

		}
		catch (Exception e) {
			log.error("Error initializing finacle service {}", e);
		}
	}

	public Customer selectCustFromFinacle(Customer customer, String action) throws Exception {
		String customerId = getCustomerIdFromAccountNo(customer.getAccountNo());
		String buildReqXml = buildFinReqXml(customerId);
		String res = RequestSender.send4Str(NConfigUtils.getFinacleCustomerUrl(), buildReqXml);
		res = getParsableResponse(res);
		log.debug("finacle response \n[{}]", res);
		com.naztech.lms.model.xml.res.FIXML fixml = XmlParser.parseToObject(res);

		return getCuetomerFromRetCustDtlsRetCustDtls(fixml.getBody().getRetCustInqResponse().getRetCustInqRs().getRetCustDtls());
	}

	private String buildFinReqXml(String customerId) throws Exception {
		File file = new File(getClass().getClassLoader().getResource("finacle_customer_req.xml").getFile());
		String xml = FileUtils.readFileToString(file);

		String uniqueCode = UUID.randomUUID().toString();
		String reqDateTime = df.format(new Date());

		String res = StringUtils.replaceEachRepeatedly(xml, new String[] { Constants.STR_UNIQUE_REQ_ID, Constants.STR_SERVICE_REQUEST_ID,
		        Constants.STR_REQ_DATE_TIME, Constants.STR_REQ_CUSTOMER_ID }, new String[] { uniqueCode, serviceRequestId, reqDateTime, customerId });
		return res;
	}

	private Customer getCuetomerFromRetCustDtlsRetCustDtls(RetCustDtls retCustDtls) {
		log.debug("Building customer from Finacle Response.");

		Customer custDtls = new Customer();

		custDtls.setCustomerId(retCustDtls.getCustId());
		custDtls.setCustomerName(retCustDtls.getName());
		custDtls.setDesignation(retCustDtls.getDesignation());
		custDtls.setCustomerType(retCustDtls.getCustType());
		custDtls.setMotherName(retCustDtls.getMotherName());
		custDtls.setFatherName(retCustDtls.getFatherOrHusbandName());
		custDtls.setDateOfBirth(getFormatedDate(retCustDtls.getBirthDt()));
		custDtls.setMobile(retCustDtls.getPhone());

		return custDtls;
	}

	private Date getFormatedDate(String birthDt) {

		try {
			return df2.parse(birthDt.substring(0, 10));
		}
		catch (Exception e) {
			log.error("Exception formating date [{}]", e);
			return null;
		}
	}

	public Customer selectCustFromIOffice(Customer customer) throws Exception {

		Map<String, String> params = new LinkedHashMap<String, String>();

		if (customer.getAccountNo() != null && !customer.getAccountNo().isEmpty()) {
			params.put(Constants.MAP_KEY_AC, customer.getAccountNo());
		}
		else if (customer.getBpNo() != null && !customer.getBpNo().isEmpty()) {
			params.put(Constants.MAP_KEY_BP_NO, customer.getBpNo());
		}
		else if (customer.getNid() != null && !customer.getNid().isEmpty()) {
			params.put(Constants.MAP_KEY_NID, customer.getNid());
		}
		else if (customer.getPhone() != null && !customer.getPhone().isEmpty()) {
			params.put(Constants.MAP_KEY_PHONE, customer.getPhone());
		}
		else {
			return new Customer();
		}

		String res = RequestSender.sendGet4Str(NConfigUtils.getIOfficeCustomerUrl(), params);

		log.debug("Building ioffice req xml [{}]", res);
		com.naztech.lms.model.xml.res.IOFFICEGET fixml = XmlParser.parseToIOfficeObject(res);

		return getCuetomerFromIOfficeGET(fixml);

	}

	private Customer getCuetomerFromIOfficeGET(IOFFICEGET obj) {
		log.debug("Building customer from IOFFICE Response.");

		Customer cust = new Customer();

		cust.setBpNo(obj.getBp());
		cust.setPermanentAddr(obj.getPermananet_address());
		cust.setOfficeAddr(obj.getOffice_address());
		cust.setNid(obj.getNid());
		cust.setAccountNo(obj.getAc());
		cust.setCif(obj.getCif());
		cust.setCustomerId(obj.getCif());
		cust.setMaritalStatus(getMaritalStatus(obj.getMarital_status()));
		cust.setMotherName(obj.getMother());
		cust.setFatherName(obj.getFather());
		cust.setSpouse(obj.getSpouse());
		cust.setMobile(obj.getPhone1());
		cust.setEmerPhone(obj.getEmer_phone());
		cust.setCustomerType(obj.getCUSTOMER_TYPE());

		cust.setOfficeDistrict(obj.getOffice_district());
		cust.setOfficeDivision(obj.getOffice_division());
		cust.setUnitName(obj.getPOLICE_UNIT());
		cust.setSubUnitName(obj.getPOLICE_SUB_UNIT());
		cust.setDesignation(obj.getDesig_sort());

		return cust;
	}

	private String getMaritalStatus(String maritalStatus) {
		if (NConfigurationService.textValueMap.containsKey(maritalStatus)) {
			return NConfigurationService.textValueMap.get(maritalStatus);
		}
		return maritalStatus;
	}

	private String getCustomerIdFromAccountNo(String accountNo) {
		log.debug("Building CustomerId From AccountNo");

		if (accountNo == null || accountNo.length() < 6) return "";

		StringBuilder str = new StringBuilder(accountNo);

		str.deleteCharAt(0);
		str.deleteCharAt(0);
		str.deleteCharAt(0);
		str.deleteCharAt(str.length() - 1);
		str.deleteCharAt(str.length() - 1);
		str.deleteCharAt(str.length() - 1);
		log.info("Getting cust data from finacle for accountNo [{}] and CustId: [{}]", accountNo, str.toString());
		return str.toString();
	}

	private ReqFIXML buildCsutReq(String customerId) {
		ReqFIXML reqFIXML = new ReqFIXML();
		reqFIXML.setHeader(new Header());
		reqFIXML.getHeader().setRequestHeader(new RequestHeader());

		MessageKey key = new MessageKey();
		key.setRequestUUID(UUID.randomUUID().toString());
		key.setChannelId(channelId);
		key.setServiceRequestId(serviceRequestId);
		key.setServiceRequestVersion(serviceRequestVersion);
		reqFIXML.getHeader().getRequestHeader().setMessageKey(key);

		RequestMessageInfo info = new RequestMessageInfo();
		info.setBankId(bankId);
		info.setMessageDateTime(df.format(new Date()));
		reqFIXML.getHeader().getRequestHeader().setRequestMessageInfo(info);

		com.naztech.lms.model.xml.req.Security security = new com.naztech.lms.model.xml.req.Security();
		Token token = new Token();
		security.setToken(token);
		reqFIXML.getHeader().getRequestHeader().setSecurity(security);
		//-------------------------
		Body body = new Body();
		RetCustInqRequest retCustInqRequest = new RetCustInqRequest();
		RetCustInqRq retCustInqRq = new RetCustInqRq();
		retCustInqRq.setCustId(customerId);
		retCustInqRequest.setRetCustInqRq(retCustInqRq);

		body.setRetCustInqRequest(retCustInqRequest);
		reqFIXML.setBody(body);
		return reqFIXML;
	}

	/**
	 * <FIXML*> remove this *. * means anything except >.
	 * 
	 * @param res
	 * @return string
	 */
	private String getParsableResponse(String res) {
		log.debug("We are building response from the finacle => [{}]", res);
		StringBuilder str = new StringBuilder(res);
		while (true) {
			if (str.charAt(6) == '>') break;
			str.deleteCharAt(6);
		}
		return str.toString();
	}
}
