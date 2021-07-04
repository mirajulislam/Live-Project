/**
 * 
 */
package com.naztech.lms.model;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author mirajul.islam
 *
 */
public class LmsSms extends BaseModel{
	private Integer smsId;
	private Integer smsVersion;
	
	private String clientUserName;
	private boolean test;
	private String clientCbsSmsId;
	private LocalDateTime txnDateTime;
	private String senderId;
	private String smsType;
	private String acctId;
	private String creditDebit;
	private Double amount;
	private String cellPhone;
	private String sendToNumber;
	private String message;
	private LocalDateTime clientRequestDateTime;
	private LocalDateTime expiryDateTime;
	private Integer retryCount;
	private boolean valid;
	private boolean validateCell;
	private Integer defaultSmsLength;
	private boolean exceedDefaultSmsLength;
	private String telcoLocalPrefix;
	private String telcoName;
	private String status;
	private boolean isDirty;
	private String customerNo;
	private String smsFormat;
	private Integer unicode;
	private boolean includeResend;
	private Integer messagetype;
	private List<SmsResult>smsResultList;	
	private String tzName;
	private Integer loanId;
	private String smsStatus;
	private String gatewayName;
	private LocalDateTime operatorRequestDateTime;
	
	private String checkClientCbsSmsId;
	
	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;
	
	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();			
			sql2BeanMap.putAll(getSql2BaseBeanMap());
			
			sql2BeanMap.put("@id_sms_key", "smsId");
			sql2BeanMap.put("@id_sms_version", "smsVersion");
			
			sql2BeanMap.put("@tx_client_user_name", "clientUserName");
			sql2BeanMap.put("@tx_client_cbs_sms_id", "clientCbsSmsId");
			sql2BeanMap.put("@dtt_txn_date_time", "txnDateTime");
			sql2BeanMap.put("@tx_sender_id", "senderId");
			sql2BeanMap.put("@tx_sms_type", "smsType");
			sql2BeanMap.put("@tx_acct_id", "acctId");
			sql2BeanMap.put("@tx_credit_debit", "creditDebit");
			sql2BeanMap.put("@dec_amount", "amount");
			sql2BeanMap.put("@tx_cell_phone", "cellPhone");
			sql2BeanMap.put("@tx_send_to_number", "sendToNumber");
			sql2BeanMap.put("@tx_message", "message");
			sql2BeanMap.put("@dtt_client_request_datetime", "clientRequestDateTime");
			sql2BeanMap.put("@dtt_expiry_datetime", "expiryDateTime");
			sql2BeanMap.put("@int_retry_count", "retryCount");
			sql2BeanMap.put("@int_default_sms_length", "defaultSmsLength");
			sql2BeanMap.put("@tx_telco_local_prefix", "telcoLocalPrefix");
			sql2BeanMap.put("@tx_telco_name", "telcoName");
			sql2BeanMap.put("@tx_status", "status");
			sql2BeanMap.put("@tx_customer_no", "customerNo");
			sql2BeanMap.put("@tx_sms_format", "smsFormat");
			sql2BeanMap.put("@int_unicode", "unicode");
			sql2BeanMap.put("@int_message_type", "messagetype");
			sql2BeanMap.put("@tx_tz_name", "tzName");
			sql2BeanMap.put("@id_loan_key", "loanId");
			sql2BeanMap.put("@tx_sms_status", "smsStatus");	
			sql2BeanMap.put("@tx_check_client_cbs_sms_id", "checkClientCbsSmsId");
			sql2BeanMap.put("@tx_gateway_name", "gatewayName");
			sql2BeanMap.put("@dtt_operator_req_time", "operatorRequestDateTime");
		}
		return sql2BeanMap;
	}
	
	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			
			rs2BeanMap.putAll(getRs2BaseBeanMap());
			
			rs2BeanMap.put("id_sms_key", "smsId");
			rs2BeanMap.put("id_sms_version", "smsVersion");
			
			rs2BeanMap.put("tx_client_user_name", "clientUserName");
			rs2BeanMap.put("tx_client_cbs_sms_id", "clientCbsSmsId");
			rs2BeanMap.put("dtt_txn_date_time", "txnDateTime");
			rs2BeanMap.put("tx_sender_id", "senderId");
			rs2BeanMap.put("tx_sms_type", "smsType");
			rs2BeanMap.put("tx_acct_id", "acctId");
			rs2BeanMap.put("tx_credit_debit", "creditDebit");
			rs2BeanMap.put("dec_amount", "amount");
			rs2BeanMap.put("tx_cell_phone", "cellPhone");
			rs2BeanMap.put("tx_send_to_number", "sendToNumber");
			rs2BeanMap.put("tx_message", "message");
			rs2BeanMap.put("dtt_client_request_datetime", "clientRequestDateTime");
			rs2BeanMap.put("dtt_expiry_datetime", "expiryDateTime");
			rs2BeanMap.put("int_retry_count", "retryCount");
			rs2BeanMap.put("int_default_sms_length", "defaultSmsLength");
			rs2BeanMap.put("tx_telco_local_prefix", "telcoLocalPrefix");
			rs2BeanMap.put("tx_telco_name", "telcoName");
			rs2BeanMap.put("tx_status", "status");
			rs2BeanMap.put("tx_customer_no", "customerNo");
			rs2BeanMap.put("tx_sms_format", "smsFormat");
			rs2BeanMap.put("int_unicode", "unicode");
			rs2BeanMap.put("int_message_type", "messagetype");
			rs2BeanMap.put("tx_tz_name", "tzName");
			rs2BeanMap.put("id_loan_key", "loanId");
			rs2BeanMap.put("tx_sms_status", "smsStatus");
			rs2BeanMap.put("tx_check_client_cbs_sms_id", "checkClientCbsSmsId");
			rs2BeanMap.put("tx_gateway_name", "gatewayName");
			rs2BeanMap.put("dtt_operator_req_time", "operatorRequestDateTime");
		}
		return rs2BeanMap;
	}

	public Integer getSmsId() {
		return smsId;
	}

	public void setSmsId(Integer smsId) {
		this.smsId = smsId;
	}

	public Integer getSmsVersion() {
		return smsVersion;
	}

	public void setSmsVersion(Integer smsVersion) {
		this.smsVersion = smsVersion;
	}

	public String getClientUserName() {
		return clientUserName;
	}

	public void setClientUserName(String clientUserName) {
		this.clientUserName = clientUserName;
	}

	public boolean isTest() {
		return test;
	}

	public void setTest(boolean test) {
		this.test = test;
	}

	public String getClientCbsSmsId() {
		return clientCbsSmsId;
	}

	public void setClientCbsSmsId(String clientCbsSmsId) {
		this.clientCbsSmsId = clientCbsSmsId;
	}

	public LocalDateTime getTxnDateTime() {
		return txnDateTime;
	}

	public void setTxnDateTime(LocalDateTime txnDateTime) {
		this.txnDateTime = txnDateTime;
	}

	public String getSenderId() {
		return senderId;
	}

	public void setSenderId(String senderId) {
		this.senderId = senderId;
	}

	public String getSmsType() {
		return smsType;
	}

	public void setSmsType(String smsType) {
		this.smsType = smsType;
	}

	public String getAcctId() {
		return acctId;
	}

	public void setAcctId(String acctId) {
		this.acctId = acctId;
	}

	public String getCreditDebit() {
		return creditDebit;
	}

	public void setCreditDebit(String creditDebit) {
		this.creditDebit = creditDebit;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

	public String getCellPhone() {
		return cellPhone;
	}

	public void setCellPhone(String cellPhone) {
		this.cellPhone = cellPhone;
	}

	public String getSendToNumber() {
		return sendToNumber;
	}

	public void setSendToNumber(String sendToNumber) {
		this.sendToNumber = sendToNumber;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public LocalDateTime getClientRequestDateTime() {
		return clientRequestDateTime;
	}

	public void setClientRequestDateTime(LocalDateTime clientRequestDateTime) {
		this.clientRequestDateTime = clientRequestDateTime;
	}

	public LocalDateTime getExpiryDateTime() {
		return expiryDateTime;
	}

	public void setExpiryDateTime(LocalDateTime expiryDateTime) {
		this.expiryDateTime = expiryDateTime;
	}

	public Integer getRetryCount() {
		return retryCount;
	}

	public void setRetryCount(Integer retryCount) {
		this.retryCount = retryCount;
	}

	public boolean isValid() {
		return valid;
	}

	public void setValid(boolean valid) {
		this.valid = valid;
	}

	public boolean isValidateCell() {
		return validateCell;
	}

	public void setValidateCell(boolean validateCell) {
		this.validateCell = validateCell;
	}

	public Integer getDefaultSmsLength() {
		return defaultSmsLength;
	}

	public void setDefaultSmsLength(Integer defaultSmsLength) {
		this.defaultSmsLength = defaultSmsLength;
	}

	public boolean isExceedDefaultSmsLength() {
		return exceedDefaultSmsLength;
	}

	public void setExceedDefaultSmsLength(boolean exceedDefaultSmsLength) {
		this.exceedDefaultSmsLength = exceedDefaultSmsLength;
	}

	public String getTelcoLocalPrefix() {
		return telcoLocalPrefix;
	}

	public void setTelcoLocalPrefix(String telcoLocalPrefix) {
		this.telcoLocalPrefix = telcoLocalPrefix;
	}

	public String getTelcoName() {
		return telcoName;
	}

	public void setTelcoName(String telcoName) {
		this.telcoName = telcoName;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public boolean isDirty() {
		return isDirty;
	}

	public void setDirty(boolean isDirty) {
		this.isDirty = isDirty;
	}

	public String getCustomerNo() {
		return customerNo;
	}

	public void setCustomerNo(String customerNo) {
		this.customerNo = customerNo;
	}

	public String getSmsFormat() {
		return smsFormat;
	}

	public void setSmsFormat(String smsFormat) {
		this.smsFormat = smsFormat;
	}

	public Integer getUnicode() {
		return unicode;
	}

	public void setUnicode(Integer unicode) {
		this.unicode = unicode;
	}

	public boolean isIncludeResend() {
		return includeResend;
	}

	public void setIncludeResend(boolean includeResend) {
		this.includeResend = includeResend;
	}

	public Integer getMessagetype() {
		return messagetype;
	}

	public void setMessagetype(Integer messagetype) {
		this.messagetype = messagetype;
	}

	public List<SmsResult> getSmsResultList() {
		return smsResultList;
	}

	public void setSmsResultList(List<SmsResult> smsResultList) {
		this.smsResultList = smsResultList;
	}

	public String getTzName() {
		return tzName;
	}

	public void setTzName(String tzName) {
		this.tzName = tzName;
	}

	public Integer getLoanId() {
		return loanId;
	}

	public void setLoanId(Integer loanId) {
		this.loanId = loanId;
	}

	public String getSmsStatus() {
		return smsStatus;
	}

	public void setSmsStatus(String smsStatus) {
		this.smsStatus = smsStatus;
	}

	public String getCheckClientCbsSmsId() {
		return checkClientCbsSmsId;
	}

	public void setCheckClientCbsSmsId(String checkClientCbsSmsId) {
		this.checkClientCbsSmsId = checkClientCbsSmsId;
	}

	public String getGatewayName() {
		return gatewayName;
	}

	public void setGatewayName(String gatewayName) {
		this.gatewayName = gatewayName;
	}

	public LocalDateTime getOperatorRequestDateTime() {
		return operatorRequestDateTime;
	}

	public void setOperatorRequestDateTime(LocalDateTime operatorRequestDateTime) {
		this.operatorRequestDateTime = operatorRequestDateTime;
	}

	@Override
	public String toString() {
		return "LmsSms [smsId=" + smsId + ", smsVersion=" + smsVersion + ", clientUserName=" + clientUserName + ", test=" + test + ", clientCbsSmsId="
		        + clientCbsSmsId + ", txnDateTime=" + txnDateTime + ", senderId=" + senderId + ", smsType=" + smsType + ", acctId=" + acctId
		        + ", creditDebit=" + creditDebit + ", amount=" + amount + ", cellPhone=" + cellPhone + ", sendToNumber=" + sendToNumber + ", message="
		        + message + ", clientRequestDateTime=" + clientRequestDateTime + ", expiryDateTime=" + expiryDateTime + ", retryCount=" + retryCount
		        + ", valid=" + valid + ", validateCell=" + validateCell + ", defaultSmsLength=" + defaultSmsLength + ", exceedDefaultSmsLength="
		        + exceedDefaultSmsLength + ", telcoLocalPrefix=" + telcoLocalPrefix + ", telcoName=" + telcoName + ", status=" + status + ", isDirty="
		        + isDirty + ", customerNo=" + customerNo + ", smsFormat=" + smsFormat + ", unicode=" + unicode + ", includeResend=" + includeResend
		        + ", messagetype=" + messagetype + ", smsResultList=" + smsResultList + ",  tzName=" + tzName + ", loanId="
		        + loanId + ", smsStatus=" + smsStatus + "]";
	}
	
}
