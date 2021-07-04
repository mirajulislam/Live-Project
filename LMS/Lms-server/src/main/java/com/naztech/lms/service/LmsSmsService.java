/**
 * 
 */
package com.naztech.lms.service;

import java.text.Format;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;

import com.google.gson.Gson;
import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.service.AbstractService;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.RSType;
import com.naztech.lms.constants.SPName;
import com.naztech.lms.model.LmsSms;
import com.naztech.lms.model.Loan;
import com.naztech.lms.model.LoanGridView;
import com.naztech.lms.model.SmsResult;
import com.naztech.lms.utils.RequestSender;

/**
 * @author mirajul.islam
 *
 */
public class LmsSmsService extends AbstractService<LmsSms>{
	private static Logger log = LoggerFactory.getLogger(LmsSmsService.class);
	
	@Autowired
	JdbcService jdbcService;
	//sms parameter 
	@Value("${sms.smsFromDate}")
	public String smsFromDate;
	
	@Value("${sms.clientUserName}")
	public String clientUserName;	
	@Value("${sms.test}")
	public boolean test;	
	@Value("${sms.senderId}")
	public String senderId;	
	@Value("${sms.smsType}")
	public String smsType;	
	@Value("${sms.creditDebit}")
	public String creditDebit;
	@Value("${sms.valid}")
	public boolean valid;
	@Value("${sms.validateCell}")
	public boolean validateCell;
	@Value("${sms.defaultSmsLength}")
	public Integer defaultSmsLength;
	@Value("${sms.exceedDefaultSmsLength}")
	public boolean exceedDefaultSmsLength;
	@Value("${sms.isDirty}")
	public boolean isDirty;
	@Value("${sms.unicode}")
	public Integer unicode;
	@Value("${sms.includeResend}")
	public boolean includeResend;
	@Value("${sms.messagetype}")
	public Integer messagetype;
	@Value("${sms.message.sendToCad}")
	public String msgSendToCad;
	@Value("${sms.message.disbursed}")
	public String msgDisbursed;	
	@Value("${sms.expirytime.hour}")
	public Integer expirytimeHGour;
	@Value("${sms.formate}")
	public String smsFormat;
	@Value("${sms.tzName}")
	public String tzName;
	@Value("${sms.sentToCad.status}")
	public String smsStatusSentToCad;
	@Value("${sms.disbursed.status}")
	public String smsStatusDisbursed;
	
	@Value("${sms.api.call.mode}")	
	public boolean apiCallMode;
	
	@Value("${sms.lms.base.url}")
	public String baseUrl;
	
	
	static Gson gson;
	static {
		gson = new Gson();
	}
	
	@Override
	@SuppressWarnings("rawtypes")
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();			
			log.debug("Processing ACTION [{}]", action);
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}
		return msgResponse;
	}
	
	
	@Scheduled(initialDelay = 1000L , fixedDelayString = "${sms.insert.schedular.time}")
		public void smsSendApiCall() throws Exception {
			SimpleDateFormat formDate = new SimpleDateFormat("yyyy-MM-dd");
		    String toDate = formDate.format(new Date());
		    	
			Loan loan = new Loan();
			loan.setFromDate4Src(smsFromDate);
			loan.setToDate4Src(toDate);
			loan.setUserModKey(111000);
			log.info("Scheduler Start Time:[{}]",new Date());
			
			if(apiCallMode) {
				  log.info("Scheduler Basic SMS Api Call Mode : [{}]",apiCallMode);
				  handleSelectForSmsSend(loan, ActionType.SELECT_LOAN_FOR_SMS.toString());
			}
			else{
				  log.info("Scheduler Basic SMS Api Call Mode : [{}]",apiCallMode);
				}			
		}
	
	@Scheduled(initialDelayString = "${sms.update.schedular.time}" , fixedDelayString = "${sms.schedular.time}")
	public void smsUpdateApiCall() throws Exception {	    	
		LmsSms lmsSms = new LmsSms();
		lmsSms.setUserModKey(111000);
		log.info("Update Scheduler Start Time:[{}]",new Date());
		if(apiCallMode) {
			  log.info("Scheduler Basic SMS Api Call Mode : [{}]",apiCallMode);
			  handleUpdateSmsSendLoan(lmsSms, ActionType.SELECT_SEND_SMS_LOAN.toString());
		}
		else{
			  log.info("Scheduler Basic Update SMS Api Call Mode : [{}]",apiCallMode);
			}		
	}

	private void handleUpdateSmsSendLoan(LmsSms lmsSms, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<LmsSms>lmsSmsList= new ArrayList<LmsSms>();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(lmsSms, LmsSms.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_lms_sms.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_lms_sms.toString(), spArgsMap, jdbcResult);

			lmsSmsList = JdbcUtils.mapRows(LmsSms.class, LmsSms.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_SELECT_SEND_SMS_LOAN.toString()));
			log.info("Update SMS Status Requested Data Size : [{}]",lmsSmsList.size());			
			if(lmsSmsList.size()!=0) {	
				for(LmsSms lms:lmsSmsList) {
					//API request
				    String resData =sendRequestSmsSendOrUpdateApi(lms,baseUrl+"/getSmsStatus");
				    if (!isEmptyString(resData)&&RequestSender.isJson(resData)) {
				    	setResponseData(resData);
				    }else {
				    	log.info("Sms Update Api responce: [{}]",resData);
				    }
				}
			}else {
				log.info("Update SMS Status Requested Data: [{}]",lmsSmsList);	
			}
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		
	}

	private void setResponseData(String resData) throws Exception {
		LmsSms lmsSms;
		lmsSms = gson.fromJson(resData,LmsSms.class);
		if(!isEmptyString(lmsSms.getClientCbsSmsId())){
			List<SmsResult> smsResultList = lmsSms.getSmsResultList();
			if(isEmptyString(lmsSms.getSmsStatus())) {
				lmsSms.setSmsStatus(lmsSms.getStatus());
			}			
		    execute(lmsSms,ActionType.UPDATE.toString());					
			if(smsResultList != null) {
				for(SmsResult smsResult:smsResultList) {
					saveLmsSmsResult(smsResult);
				}
			}
		}
	}

	private void saveLmsSmsResult(SmsResult smsResult) throws Exception {
		executeSmsResult(smsResult,ActionType.NEW.toString());
	}

	private void executeSmsResult(SmsResult smsResult, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		smsResult.setUserModKey(111000);
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(smsResult,SmsResult.getSql2BeanMap());
			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_sms_result.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());			
			jdbcResult.setProcessWarnings(true);
			
			jdbcResult = jdbcService.executeSP(action, SPName.ACT_sms_result.toString(), spArgsMap, jdbcResult);
			
			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			if (outputMap.get("@id_sms_result_key") != null) {
				smsResult.setSmsResultId(Integer.parseInt(outputMap.get("@id_sms_result_key").toString()));
			}
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}

	public void handleSelectForSmsSend(Loan loan, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		log.info("Requested Data For SEND_TO_CAD STATE : [{}], [{}]",action,loan);
		List<LoanGridView> loanList;
		List<LmsSms> lmsSmsList;
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);
			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);
			loanList = JdbcUtils.mapRows(LoanGridView.class, LoanGridView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_SELECT_LOAN_FOR_SMS.toString()));
			log.info("Send Sms Requested Data Size : [{}]",loanList.size());
			if(loanList.size()!=0) {
				lmsSmsList = setLoanInFoInSms(loanList);	
				for(LmsSms lmsSms:lmsSmsList) {
					//save Lms Sms Status in database
					saveLmsSmsStatus(lmsSms);
					lmsSms.setSmsStatus("");
					//API request
					String resData = sendRequestSmsSendOrUpdateApi(lmsSms,baseUrl+"/processSingleSms");				    
					if (!isEmptyString(resData)&&RequestSender.isJson(resData)) {
						//update status api response data
				    	setResponseData(resData);
				    }else {
				    	log.info("Sms Update Api responce: [{}]",resData);
				    }
				}
			}else {
				log.info("Requested SMS Data Empty");
			}
			
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}

	private void saveLmsSmsStatus(LmsSms lmsSms) throws Exception {
		
		lmsSms.setClientUserName(clientUserName);
		lmsSms.setTest(test);
		lmsSms.setSenderId(senderId);
		lmsSms.setSmsType(smsType);
		lmsSms.setCreditDebit(creditDebit);
		lmsSms.setRetryCount(1);
		lmsSms.setValid(valid);
		lmsSms.setValidateCell(validateCell);
		lmsSms.setDefaultSmsLength(defaultSmsLength);
		lmsSms.setExceedDefaultSmsLength(exceedDefaultSmsLength);
		lmsSms.setSmsFormat(smsFormat);
		lmsSms.setUnicode(unicode);
		lmsSms.setIncludeResend(includeResend);
		lmsSms.setMessagetype(messagetype);
		lmsSms.setTzName(tzName);				
		lmsSms.setDirty(isDirty);		
		if(lmsSms.getStateName().equals("SENT_TO_CAD")) {
			lmsSms.setSmsStatus(smsStatusSentToCad);
		}else {
			lmsSms.setSmsStatus(smsStatusDisbursed);
		}
		//execute database.
		lmsSms = execute(lmsSms,ActionType.NEW.toString());	
	}
	
	private LmsSms execute(LmsSms lmsSms,String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		lmsSms.setUserModKey(111000);
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(lmsSms, LmsSms.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_lms_sms.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_lms_sms.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			if (outputMap.get("@id_sms_key") != null) {
				lmsSms.setSmsId(Integer.parseInt(outputMap.get("@id_sms_key").toString()));
			}
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return lmsSms;
	}

	private List<LmsSms> setLoanInFoInSms(List<LoanGridView> loanList) throws Exception {
		List<LmsSms> lmsSmsList = new ArrayList<LmsSms>();		
		for(LoanGridView loanInFo:loanList) {			
			LmsSms lmsSms  = setLmsSmsParameter(loanInFo);
			lmsSmsList.add(lmsSms);
		}			
		return lmsSmsList;
	}

	private LmsSms setLmsSmsParameter(LoanGridView loanInFo) throws Exception {
		LmsSms lmsSms = new LmsSms();
		LocalDateTime now = LocalDateTime.now();
		String smsMsg;
		
        String clientCbsSmsId;		
		SimpleDateFormat formDate = new SimpleDateFormat("yyyyMMdd");
	    String dateYear = formDate.format(new Date());	    
	    
	    Format f = new SimpleDateFormat("hhmmss");
	    String dateHoMiSe = f.format(new Date());
	    clientCbsSmsId = dateYear+"_"+dateHoMiSe+"_"+loanInFo.getApplicationNo();
	    lmsSms.setCheckClientCbsSmsId(clientCbsSmsId);
	    //check clientCbsSmsId then set
	    String dbCheckClientCbsSmsId = checkClientCbsSmsId(lmsSms);
	    if(dbCheckClientCbsSmsId.equals("OK")) {
	    	lmsSms.setClientCbsSmsId(clientCbsSmsId);
			lmsSms.setTxnDateTime(now);		
			lmsSms.setAcctId(loanInFo.getAccountNo());	
			lmsSms.setAmount(loanInFo.getRecommendedForApproval());
			checkMobileNumber(loanInFo);
			String mobile = loanInFo.getMobile();
			lmsSms.setStateName(loanInFo.getStateName());
			if(!isEmptyString(mobile)) {
				lmsSms.setCellPhone(loanInFo.getMobile().trim());
				lmsSms.setSendToNumber(loanInFo.getMobile().trim());
			}						
			
			if(loanInFo.getStateName().equals("SENT_TO_CAD")) {
				smsMsg = msgSendToCad.replaceAll("#APPLICATTION_NO#", loanInFo.getApplicationNo());
				smsMsg = smsMsg.replaceAll("#AMOUNT#", loanInFo.getRecommendedForApproval().toString());
				lmsSms.setMessage(smsMsg);
			}else {
				smsMsg = msgDisbursed.replaceAll("#APPLICATTION_NO#", loanInFo.getApplicationNo());
				smsMsg = smsMsg.replaceAll("#ACCOUNT#", loanInFo.getAccountNo());
				smsMsg = smsMsg.replaceAll("#AMOUNT#", loanInFo.getRecommendedForApproval().toString());
				lmsSms.setMessage(smsMsg);
			}
			
			lmsSms.setClientRequestDateTime(now);
			lmsSms.setExpiryDateTime(now.plusHours(expirytimeHGour));
			lmsSms.setCustomerNo(loanInFo.getCustomerId());
			lmsSms.setLoanId(loanInFo.getLoanId());
			lmsSms.setStateId(loanInFo.getStateId());
	    }	
		return lmsSms;
	}

	private String checkClientCbsSmsId(LmsSms lmsSms) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		lmsSms.setUserModKey(111000);
		List<LmsSms>lmsSmsList= new ArrayList<LmsSms>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(lmsSms, LmsSms.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_lms_sms.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(ActionType.SELECT_SMS_CBS_SMS_ID.toString(), SPName.ACT_lms_sms.toString(), spArgsMap, jdbcResult);

			lmsSmsList = JdbcUtils.mapRows(LmsSms.class, LmsSms.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_SMS_CBS_SMS_ID.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		if(lmsSmsList.size()==0) {
			return "OK";
		}else {
			return "NOT OK";
		}
		
	}

	private LoanGridView checkMobileNumber(LoanGridView loanInFo) {
		String mobileNumber = loanInFo.getMobile();
		if(!isEmptyString(mobileNumber)) {
			mobileNumber = mobileNumber.trim();
			if(isValidMobileNo(mobileNumber)) {
				if(mobileNumber.length()==11) {
					loanInFo.setMobile(mobileNumber);
				}else if(mobileNumber.length()==13){
					mobileNumber = mobileNumber.substring(2,13);
					loanInFo.setMobile(mobileNumber);
				}else if(mobileNumber.length()==14){
					mobileNumber = mobileNumber.substring(3,14);
					loanInFo.setMobile(mobileNumber);
				}else if(mobileNumber.length()==15){
					mobileNumber = mobileNumber.substring(4,15);
					loanInFo.setMobile(mobileNumber);
				}else {
					log.info("Unknown Mobile Number: [{}], Length: [{}]",loanInFo.getMobile(),loanInFo.getMobile().length());
				}
			}else {
				log.info("Validation Failed");
				log.info("Unknown Mobile Number: [{}], Length: [{}]",loanInFo.getMobile(),loanInFo.getMobile().length());						
			}
		}	
		return loanInFo;
	}	
	
	public static boolean isValidMobileNo(String str)  {  

	   Pattern ptrn = Pattern.compile("(^(\\+8801|8801|01|008801))[1|3-9]{1}(\\d){8}$");    
	   Matcher match = ptrn.matcher(str);  

	   return (match.find() && match.group().equals(str));  
	}
	
	private String sendRequestSmsSendOrUpdateApi(LmsSms lmsSms,String url) throws Exception {
		return RequestSender.send4Str(url, gson.toJson(lmsSms));
	}
	
	boolean isEmptyString(String string) {
		return string == null || string.isEmpty();
	}
}
