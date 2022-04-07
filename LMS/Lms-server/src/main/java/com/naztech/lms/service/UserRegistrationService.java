package com.naztech.lms.service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.nazdaqTechnologies.core.service.AbstractService;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.Constants;
import com.naztech.lms.constants.RSType;
import com.naztech.lms.constants.SPName;
import com.naztech.lms.constants.Str;
import com.naztech.lms.model.Customer;
import com.naztech.lms.model.LmsSms;
import com.naztech.lms.model.UserDocument;
import com.naztech.lms.model.UserRegistration;
import com.naztech.lms.utils.DbExecutor;
import com.naztech.lms.utils.RequestSender;
import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageBuilder;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;

public class UserRegistrationService extends AbstractService<UserRegistration> {
	private static Logger log = LogManager.getLogger(UserRegistrationService.class);

	static Gson gson;
	static {
		gson = new Gson();
	}

	@Autowired
	JdbcService jdbcService;
	@Autowired
	LmsSmsService lmsSmsService;
	@Autowired
	UserDocumentService userDocumentService;
	@Value("${app.user.legalEntityTypeId}")
	private Integer legalEntityTypeId;
	@Value("${app.user.primaryGroupId}")
	private Integer primaryGroupId;
	@Value("${sms.otp.call.mode}")
	private boolean userIdSmsSentMode;
	@Value("${sms.lms.base.url}")
	public String baseUrl;
	@Value("${sms.otp.call.mode}")
	private boolean otpSmsSentMode;
	@Value("${sms.otp.remove.time}")
	private Integer otpTimeRemove;

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();

			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.UPDATE.toString())) {
				UserRegistration userRegistration = handleUpdateApplication(msg, action);
				msgResponse = MessageBuilder.withPayload(userRegistration).copyHeadersIfAbsent(msgHeader).build();
			}else if(action.equals(ActionType.NEW_APP_USER.toString())) {
				msgResponse = MessageBuilder.withPayload(createAppUser(msg, action))
						.copyHeadersIfAbsent(msgHeader).build();
			}else if(action.equals(ActionType.SELECT_PASSWORD_FOR_UPDATE.toString())|| action.equals(ActionType.SELECT_USER_FOR_FORGOT.toString())) {
				msgResponse = MessageBuilder.withPayload(selectUserDetails(msg, action))
						.copyHeadersIfAbsent(msgHeader).build();
			}else if(action.equals(ActionType.SELECT.toString())) {
				msgResponse = MessageBuilder.withPayload(selectUser(msg, action))
						.copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.RESENT_OTP_NUMBER.toString())) {
				UserRegistration userRegistration = doHandleResentOtpUser(msg, action);
				msgResponse = MessageBuilder.withPayload(userRegistration).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.CHECK_MOBILE_OTP.toString())) {
				UserRegistration userReg = doHandleCheckUserMobileOtp(msg, action);
				msgResponse = MessageBuilder.withPayload(userReg).copyHeadersIfAbsent(msgHeader).build();
			}  else {
				throw new Exception("Unknown action " + action);
			}
		} catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}

		return msgResponse;
	}
	
	private UserRegistration selectUser(Message<List<UserRegistration>> msg, String action) throws Exception {
		List<UserRegistration> userRegistrationList = msg.getPayload();
		String source = msg.getHeader().getSource();
		userRegistrationList.get(0).setAppName(source);		
		return doSelectUser(userRegistrationList.get(0),action);
	}

	private UserRegistration doSelectUser(UserRegistration userRegistration, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		String userName = null;
		Integer otpNum;
		
		log.info("User Search FOR FORGOT PASSWORD: Action {} , Properties: {}", action, userRegistration.toString());
		List<UserRegistration> userRegistrationList = new ArrayList<UserRegistration>();
		
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(userRegistration, UserRegistration.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService
					.getJdbcStoredProcedure(SPName.ACT_user_registration.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_user_registration.toString(), spArgsMap, jdbcResult);

			userRegistrationList = JdbcUtils.mapRows(UserRegistration.class, UserRegistration.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_SELECT_USER_DETAILS.toString()));
			
			log.info("Search Data Size : [{}]", userRegistrationList.size());
			
			
		} catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		if(userRegistrationList.isEmpty()) {
			 userRegistration.setSuccessStatus(Str.USER_NOT_FOUND);
			 userRegistrationList.add(userRegistration);
		}
		return userRegistrationList.get(0);
	}

	@Scheduled(initialDelay = 1000L , fixedDelayString = "${otp.sms.schedular.time}")
	public void smsSendApiCall() throws Exception {		
		String key,value;
        for (Map.Entry me : Constants.otp_number_map.entrySet()) {         
        	key = me.getKey().toString();
        	value = me.getValue().toString();
        	checkTimeForOtpRemove(key,value);
        }
	}
	
	private void checkTimeForOtpRemove(String key, String value) {
		String[] getTimeValue = value.split("-");
		LocalDateTime prvTime = millsToLocalDateTime(Long.valueOf(getTimeValue[1]));
		long comapreTime = ChronoUnit.SECONDS.between(prvTime, LocalDateTime.now());
		if(comapreTime>otpTimeRemove) {			
			log.info("You Are Timeout OTP Remove OTP : [{}] Second [{}]: ",getTimeValue[0],comapreTime);	
			Constants.otp_number_map.remove(key);			
		}		
	}
	public static LocalDateTime millsToLocalDateTime(long millis) {
		Instant instant = Instant.ofEpochMilli(millis);
		LocalDateTime date = instant.atZone(ZoneId.systemDefault()).toLocalDateTime();
		return date;
	}

	private UserRegistration doHandleCheckUserMobileOtp(Message<List<UserRegistration>> msg, String action) {
		List<UserRegistration> userRegistrationList = msg.getPayload();
		String source = msg.getHeader().getSource();
		userRegistrationList.get(0).setAppName(source);
		
		return HandleCheckUserMobileOtp(userRegistrationList.get(0),action);
	}

	private UserRegistration HandleCheckUserMobileOtp(UserRegistration userRegistration, String action) {
		
		if(!isNullOrEmptyMap(Constants.otp_number_map)) {
			String[] getOTP = Constants.otp_number_map.get(userRegistration.getUserName()).split("-");			
			int checkOtp = Integer.parseInt(getOTP[0]);
			
			if (!isNullOrEmptyMap(Constants.otp_number_map) && (checkOtp == userRegistration.getOtpNumber())) {
			
				log.info("Mobile Sent OTP Number , Customer Sent OTP Number: [{}], OTP : [{}]",checkOtp,userRegistration.getOtpNumber());
				log.info("Remove OTP :: User Name: [{}], OTP : [{}]", userRegistration.getUserName(),userRegistration.getOtpNumber());
			
				Constants.otp_number_map.remove(userRegistration.getUserName());			
				userRegistration.setSuccessStatus(Str.VERIFIED_SUCCESSFULLY.toString());
			} else {
				userRegistration.setSuccessStatus(Str.OTP_NOT_MATCH.toString());
				log.info("Mobile Sent OTP Number , Customer Sent OTP Number: [{}], OTP : [{}]",checkOtp,userRegistration.getOtpNumber());
			}
		}else {
				userRegistration.setSuccessStatus(Str.OTP_NOT_MATCH.toString());
				log.info("Customer Sent OTP Number: [{}] Not Match",userRegistration.getOtpNumber());
		}
		return userRegistration;
	}

	private UserRegistration doHandleResentOtpUser(Message<List<UserRegistration>> msg, String action) throws Exception {
		List<UserRegistration> userRegistrationList = msg.getPayload();

		if (userRegistrationList == null || userRegistrationList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doResentOtpUser(userRegistrationList.get(0), action);
	}

	private UserRegistration doResentOtpUser(UserRegistration userRegistration, String action) throws Exception {
		String userName = userRegistration.getUserName();
		try {

			Integer otpNum = randomNumber();
			// 1. Generate random unique value for OTP and put in to map
			String time = String.valueOf(System.currentTimeMillis());
			
			String otp = String.valueOf(otpNum) + "-" + time;
			Constants.otp_number_map.put(userName, otp);
			
//			customer.setOtpNumber(otpNum);
			log.info("RESENT OTP, User Name : [{}] , OTP Number : [{}] ", userName,otpNum);
			
			// 2. Send OTP SMS
			if (otpSmsSentMode) {
				LmsSms lmsSms = lmsSmsService.setOtpSmsParameterUser(userRegistration);
				log.info("SMS API BASE URL: [{}]",  baseUrl);
				String resData = sendRequestSmsSendOrUpdateApi(lmsSms, baseUrl);

				if (!isEmptyString(resData) && RequestSender.isJson(resData)) {
					userRegistration.setSuccessStatus(Str.SEND_OTP_IN_YOUR_MOBILE.toString());
				} else {
					log.info("Sms Api responce: [{}]", resData);
				}
			} else {
				log.info(Str.SMS_OTP_SERVICE_OFF.toString());
			}
		}catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return userRegistration;
	}

	private UserRegistration selectUserDetails(Message<List<UserRegistration>> msg, String action) throws Exception {
		List<UserRegistration> userRegistrationList = msg.getPayload();

		if (userRegistrationList == null || userRegistrationList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		if(action.equals(ActionType.SELECT_USER_FOR_FORGOT.toString())) {
			return doSelectForForgotUserPassword(userRegistrationList.get(0), action);
		}else {
			return doSelectForUpdateUserPassword(userRegistrationList.get(0), action);
		}		
	}

	private UserRegistration doSelectForForgotUserPassword(UserRegistration userRegistration, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		String userName = null;
		Integer otpNum;
		
		log.info("User Search FOR FORGOT PASSWORD: Action {} , Properties: {}", action, userRegistration.toString());
		List<UserRegistration> userRegistrationList = new ArrayList<UserRegistration>();
		
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(userRegistration, UserRegistration.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService
					.getJdbcStoredProcedure(SPName.ACT_user_registration.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_user_registration.toString(), spArgsMap, jdbcResult);

			userRegistrationList = JdbcUtils.mapRows(UserRegistration.class, UserRegistration.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_SELECT_USER_DETAILS.toString()));
			
			log.info("Search Data Size : [{}]", userRegistrationList.size());
			
			if (userRegistrationList.size() != 0) {
				userName = userRegistrationList.get(0).getUserName();
				otpNum = randomNumber();
				// 1. Generate random unique value for OTP and put in to map
				String time = String.valueOf(System.currentTimeMillis());				
				String otp = String.valueOf(otpNum) + "-" + time;
				
				Constants.otp_number_map.put(userName, otp);
				userRegistrationList.get(0).setOtpNumber(otpNum);
				log.info("User Send User Name : [{}] , OTP Number: [{}]", userName, otpNum);
				if (otpSmsSentMode) {
					// Send OTP SMS
					LmsSms lmsSms = lmsSmsService.setOtpSmsParameterUser(userRegistrationList.get(0));
					String resData = sendRequestSmsSendOrUpdateApi(lmsSms, baseUrl);
					log.info("SMS Base URL: [{}]",baseUrl);

					if (!isEmptyString(resData) && RequestSender.isJson(resData)) {
						userRegistrationList.get(0).setSuccessStatus(Str.SEND_OTP_IN_YOUR_MOBILE.toString());
//						customerList.get(0).setOtpNumber(null);
					} else {
						log.info("Sms Api responce: [{}]", resData);
					}
				} else {
					log.info(Str.SMS_OTP_SERVICE_OFF.toString());
				}
			}else {
				userRegistration.setSuccessStatus(Str.USER_NOT_FOUND.toString());
				userRegistrationList.add(userRegistration);				
			}
		} catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return userRegistrationList.get(0);
	}

	private UserRegistration doSelectForUpdateUserPassword(UserRegistration userRegistration, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		String inputPassword = null;
		inputPassword =  userRegistration.getPassword();
		String selectedPassword = null;
		UserRegistration userReg = new UserRegistration() ;
		log.info("Search For User For Reset Or Forget : Action {} , Properties: {}", action, userRegistration.toString());
		List<UserRegistration> userRegistrationList = new ArrayList<UserRegistration>();		
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(userRegistration, UserRegistration.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService
					.getJdbcStoredProcedure(SPName.ACT_user_registration.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_user_registration.toString(), spArgsMap, jdbcResult);

			userRegistrationList = JdbcUtils.mapRows(UserRegistration.class, UserRegistration.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_SELECT_USER_DETAILS.toString()));
			log.info("Search Data Size : [{}]", userRegistrationList.size());
			
			if (userRegistrationList.size() != 0) {		
				    log.info("Your Old password : [{}] : Input Password :[{}] : New Password [{}]: ",userRegistrationList.get(0).getPassword(), inputPassword,userRegistration.getNewPassword());
					selectedPassword = userRegistrationList.get(0).getPassword();
					if(selectedPassword.equals(inputPassword)) {
						userReg.setUserId(userRegistration.getUserId());
						userReg.setUserVar(userRegistration.getUserVar());
						userReg.setUserName(userRegistration.getUserName());
						userReg.setPassword(userRegistration.getNewPassword());
						userReg = executeUser(userReg,ActionType.UPDATE.toString());
						userRegistrationList.get(0).setUserVar(userReg.getUserVar());
						userRegistrationList.get(0).setSuccessStatus(Str.PASSWORD_UPDATE_SUCCESSFULLY.toString());
					}else {
						userRegistration.setSuccessStatus(Str.PASSWORD_NOT_MATCH.toString());
						userRegistrationList.get(0).setSuccessStatus(Str.PASSWORD_NOT_MATCH.toString());
					}			
				 
			}else {
				userRegistration.setSuccessStatus(Str.USER_NOT_FOUND.toString());
				userRegistrationList.add(userRegistration);
			}
		} catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return userRegistrationList.get(0);
	}

	public UserRegistration handleSaveUser(String action, UserRegistration user, MultipartFile[] files) {
		log.debug("Handling initial user [{}]", user.toString());

		List<UserDocument> userDocList = user.getUserDocumentList();
		user.setUserDocumentList(null);
		Integer userId = null;
		try {
			if(user.getUserId()==null) {
				log.debug("Saving initial user");
				log.info("Saving initial user");
				UserRegistration userRegistration =  handleSaveUser(user, action);
				userId = userRegistration.getUserId();
			}else {
				log.debug("Updating initial loan");
				log.info("Updating initial loan");
				handleUpdateUser(user, action);
				userId = user.getUserId();
			}
			
			for (MultipartFile file : files) {

				if (!file.isEmpty()) {
					UserDocument userDoc = getDocFromDocName(file.getOriginalFilename(), userDocList);

					if (userDoc != null) {
						userDoc.setUserId(userId);
						userDoc.setUserModKey(user.getUserModKey());
						userDocumentService.saveDocumentFile(file, userDoc, Str.MOBILE_VIEW);
					}
				}
			}
			for (UserDocument loanDoc : userDocList) {
				loanDoc.setUserId(userId);
				loanDoc.setUserModKey(user.getUserModKey());
				userDocumentService.doExecute(loanDoc, ActionType.NEW_MOBILE_VIEW.toString());
			}
		}
		catch (Exception e) {
			log.error("Exception processing loan with file request, [{}]", e);
		}
		return null;
	}

	private UserDocument getDocFromDocName(String filename, List<UserDocument> userDocList) {
		for (UserDocument userDoc : userDocList) {
			if (userDoc.getDocName() != null && userDoc.getDocName().equals(filename)) {
				UserDocument userDocument = userDoc;
				userDocList.remove(userDoc);
				return userDocument;
			}
		}
		return null;
	}

	private UserRegistration handleUpdateUser(UserRegistration user, String action) throws Exception {
		return executeUser(user,action);		
	}

	private UserRegistration handleSaveUser(UserRegistration userDoc, String action) throws Exception {
		return doCreateAppUser(userDoc,action);
	}
	
	private UserRegistration createAppUser(Message<List<UserRegistration>> msg, String action) throws Exception {
		
		List<UserRegistration> userRegistrationList = msg.getPayload();
		String source = msg.getHeader().getSource();
		userRegistrationList.get(0).setAppName(source);

		if (userRegistrationList == null || userRegistrationList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doCreateAppUser(userRegistrationList.get(0), action);
	}

	private UserRegistration doCreateAppUser(UserRegistration userRegistration, String action) throws Exception {
		Integer userId;
		Integer userVar;
		log.info("New User Creation Parameters: [{}] , Action [{}]:", userRegistration.toString(),action);
	//	// Save user details && check otp verified
		userRegistration = saveNewUser(userRegistration);
		userId = userRegistration.getUserId();
		userVar = userRegistration.getUserVar();
		userRegistration.setUserVar(userVar);
		userRegistration.setUserId(userId);
		if(userId !=null) {
			userRegistration.setSuccessStatus("USER CREATE SUCCESSFULLY");
		}else {
			userRegistration.setSuccessStatus("USER NOT CREATE");
		}
		return userRegistration;
	}


	private UserRegistration handleUpdateApplication(Message<List<UserRegistration>> msg, String action)
			throws Exception {
		List<UserRegistration> userList = msg.getPayload();
		String source = msg.getHeader().getSource();
		userList.get(0).setAppName(source);
		
		if (userList == null || userList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return executeUser(userList.get(0), action);
	}

	public UserRegistration saveNewUserCust(Customer customer) throws Exception {

		Integer userId;
		Integer userVar;
		String customerId = null;

		// prepare parameter for registration T_USER
		UserRegistration userRegistration = new UserRegistration();

		userRegistration = setUserParameterCust(customer);
		log.info("Save User Parameter For Login Create : [{}], Action : [{}]", customer.toString(),ActionType.NEW_APP_USER.toString());		
		//sms parameter for user id send
		LmsSms lmsSms = lmsSmsService.userIdSmsParameterCust(customer);
		userRegistration.setUserName(lmsSms.getMobileUserUId());
		log.info("User Id Message : [{}]", lmsSms.getMessage());
		
		log.info("MobileUser User Name : [{}]",lmsSms.getMobileUserUId());
		if (userIdSmsSentMode) {
			// 2. Send user id SMS					
			String resData = sendRequestSmsSendOrUpdateApi(lmsSms, baseUrl);
			log.info("SMS Base URL: [{}]",baseUrl);
			customer.setSuccessStatus(Str.SEND_LOGIN_ID_IN_YOUR_MOBILE.toString());

			if (!isEmptyString(resData) && RequestSender.isJson(resData)) {
				customer.setSuccessStatus(Str.SEND_LOGIN_ID_IN_YOUR_MOBILE.toString());
			} else {
				log.info("Sms Api responce: [{}]", resData);
			}
		} else {
			customer.setSuccessStatus(Str.SEND_LOGIN_ID_IN_YOUR_MOBILE.toString());
			log.info(Str.SMS_OTP_SERVICE_OFF.toString());
		}
		userRegistration = executeUser(userRegistration, ActionType.NEW_APP_USER.toString());
		userRegistration.setCustomerId(customerId);
		userId = userRegistration.getUserId();
		userVar = userRegistration.getUserVar();
		customerId = userRegistration.getCustomerId();
		log.info("User Id : [{}], User Version : [{}]", userId,userVar);
		return userRegistration;

	}
	
	public UserRegistration saveNewUser(UserRegistration userRegistration) throws Exception {

		Integer userId;
		Integer userVar;
		String customerId = null;

		log.info("Save User Parameter For Login Create : [{}], Action : [{}]", userRegistration.toString(),ActionType.NEW_APP_USER.toString());		
		//sms parameter for user id send
		LmsSms lmsSms = lmsSmsService.userIdSmsParameter(userRegistration);
		userRegistration.setUserName(lmsSms.getMobileUserUId());
		
		log.info("MobileUser User Name : [{}]",lmsSms.getMobileUserUId());
		if (userIdSmsSentMode) {
			// 2. Send user id SMS					
			String resData = sendRequestSmsSendOrUpdateApi(lmsSms, baseUrl);
			log.info("SMS Base URL: [{}]",baseUrl);
			userRegistration.setSuccessStatus(Str.SEND_LOGIN_ID_IN_YOUR_MOBILE.toString());

			if (!isEmptyString(resData) && RequestSender.isJson(resData)) {
				userRegistration.setSuccessStatus(Str.SEND_LOGIN_ID_IN_YOUR_MOBILE.toString());
			} else {
				log.info("Sms Api responce: [{}]", resData);
			}
		} else {
			userRegistration.setSuccessStatus(Str.SEND_LOGIN_ID_IN_YOUR_MOBILE.toString());
			log.info(Str.SMS_OTP_SERVICE_OFF.toString());
		}
		userRegistration = executeUser(userRegistration, ActionType.NEW_APP_USER.toString());
		userRegistration.setCustomerId(customerId);
		userId = userRegistration.getUserId();
		userVar = userRegistration.getUserVar();
		customerId = userRegistration.getCustomerId();
		log.info("User Id : [{}], User Version : [{}]", userId,userVar);
		return userRegistration;

	}

	private UserRegistration setUserParameterCust(Customer customer) {
		UserRegistration userReg = new UserRegistration();
		checkMobileNumber(customer);
		String mobile = customer.getMobile().trim();
		if (!isEmptyString(mobile)) {
			userReg.setMobile(mobile);
		}
		userReg.setPassword(customer.getPassword());
		userReg.setUserName(mobile);
		userReg.setDesignation(customer.getDesignation());
		userReg.setCustomerId(customer.getCustomerId());
		userReg.setNid(customer.getNid());
		userReg.setBpNo(customer.getBpNo());
		userReg.setTin(customer.getTin());
		userReg.setDateOfBirth(customer.getDateOfBirth());
		userReg.setFirstName(customer.getCustomerName());
		userReg.setCustomerName(customer.getCustomerName());
		userReg.setUserAlias(customer.getCustomerName());
		userReg.setEmail(customer.getEmail());
		userReg.setCreatorId(100000);
		userReg.setUserModKey(100000);
		userReg.setPrimaryGroupId(primaryGroupId);
		userReg.setLegalEntityTypeId(legalEntityTypeId);
		userReg.setIsAllowLogin(1);
		userReg.setIsFirstLogin(0);
		userReg.setIsInVacation(0);
		userReg.setIsDisabled(0);
		userReg.setAppName(customer.getAppName());

		return userReg;
	}

	private UserRegistration executeUser(UserRegistration userReg, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		log.info("Save Or Update User Parameter For Login Create : [{}], Action : [{}]", userReg.toString(),action);
		log.info("User Id : [{}], User Version : [{}], User Name : [{}]", userReg.getUserId(),userReg.getUserVar(),userReg.getUserName());
		userReg.setUserModKey(100000);
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(userReg, UserRegistration.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_user.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_user.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_user_key") != null) {
				userReg.setUserId(Integer.parseInt(outputMap.get("@id_user_key").toString()));
			}
			if (outputMap.get("@id_user_ver") != null) {
				userReg.setUserVar(Integer.parseInt(outputMap.get("@id_user_ver").toString()));
			}
			if (action.equals(ActionType.NEW_APP_USER.toString())) {
				// for User to group mapping
				mapUserToGroup(userReg);
			}
			log.info("User Version After Update: [{}]",userReg.getUserVar());
			
			if(userReg.getUserId()!= null && action.equals(ActionType.NEW_APP_USER.toString())) {	
				log.info("Save Mobile App User For Login Create");
				execute(userReg,ActionType.NEW.toString());
			}
			if(action.equals(ActionType.UPDATE.toString())) {
				log.info("Update Mobile App User Details");
				execute(userReg,ActionType.UPDATE.toString());
			}

		} catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return userReg;
	}
	
	private void mapUserToGroup(UserRegistration userReg) throws Exception {

		log.info("Maaping user {} to group. App Name: {}", userReg.getUserName(), userReg.getAppName());

		Map<String, Object> spArgsMap = JdbcService.createSqlMap(userReg, UserRegistration.getSql2BeanMap());

		try {
			DbExecutor.execute(SPName.ACT_user.toString(), ActionType.MAP_USER_TO_GROUP.toString(), spArgsMap,
					getJdbcService());
		} catch (Exception e) {
			throw e;
		}

	}

	private UserRegistration execute(UserRegistration userReg, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(userReg, UserRegistration.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService
					.getJdbcStoredProcedure(SPName.ACT_user_registration.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_user_registration.toString(), spArgsMap, jdbcResult);

		} catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return userReg;
	}

	private Customer checkMobileNumber(Customer loanInFo) {
		String mobileNumber = loanInFo.getMobile();
		if (!isEmptyString(mobileNumber)) {
			mobileNumber = mobileNumber.trim();
			if (isValidMobileNo(mobileNumber)) {
				if (mobileNumber.length() == 11) {
					loanInFo.setMobile(mobileNumber);
				} else if (mobileNumber.length() == 13) {
					mobileNumber = mobileNumber.substring(2, 13);
					loanInFo.setMobile(mobileNumber);
				} else if (mobileNumber.length() == 14) {
					mobileNumber = mobileNumber.substring(3, 14);
					loanInFo.setMobile(mobileNumber);
				} else if (mobileNumber.length() == 15) {
					mobileNumber = mobileNumber.substring(4, 15);
					loanInFo.setMobile(mobileNumber);
				} else {
					log.info("Unknown Mobile Number: [{}], Length: [{}]", loanInFo.getMobile(),
							loanInFo.getMobile().length());
				}
			} else {
				log.info("Validation Failed");
				log.info("Unknown Mobile Number: [{}], Length: [{}]", loanInFo.getMobile(),
						loanInFo.getMobile().length());
			}
		}
		return loanInFo;
	}

	public static boolean isValidMobileNo(String str) {

		Pattern ptrn = Pattern.compile("(^(\\+8801|8801|01|008801))[1|3-9]{1}(\\d){8}$");
		Matcher match = ptrn.matcher(str);

		return (match.find() && match.group().equals(str));
	}

	boolean isEmptyString(String string) {
		return string == null || string.isEmpty();
	}
	
	private String sendRequestSmsSendOrUpdateApi(LmsSms lmsSms, String url) throws Exception {
		return RequestSender.send4Str(url, gson.toJson(lmsSms));
	}
	private Integer randomNumber() {
		Random random = new Random();
		Integer number = 100000 + random.nextInt(900000);
		return number;
	}
	public static boolean isNullOrEmptyMap(Map<?, ?> map) {
		return (map == null || map.isEmpty());
	}

}
