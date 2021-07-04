/**
 * 
 */
package com.naztech.lms.model;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author mirajul.islam
 *
 */
public class SmsResult extends BaseModel{
	private Integer smsResultId;
	private Integer smsResultVersion;
	
	private String gatewayId;
	private String gatewayName;
	private String clientCbsSmsId;
	private String smsNumber;
	private String smsStatus;
	private String telcoSmsId;
	private String senderId;
	private String smsMsg;
	private LocalDateTime telcoResponseDateTime;
	private Integer loanId;
	
	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;
	
	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			sql2BeanMap.putAll(getSql2BaseBeanMap());
			sql2BeanMap.put("@id_sms_result_key", "smsResultId");
			sql2BeanMap.put("@id_sms_result_version", "smsResultVersion");
			
			sql2BeanMap.put("@tx_gateway_id", "gatewayId");
			sql2BeanMap.put("@tx_gateway_name", "gatewayName");
			sql2BeanMap.put("@tx_client_cbs_sms_id", "clientCbsSmsId");
			sql2BeanMap.put("@tx_sms_number", "smsNumber");
			sql2BeanMap.put("@tx_sms_status", "smsStatus");
			sql2BeanMap.put("@tx_telco_sms_id", "telcoSmsId");
			sql2BeanMap.put("@tx_sender_id", "senderId");
			sql2BeanMap.put("@tx_sms_msg", "smsMsg");
			sql2BeanMap.put("@id_loan_key", "loanId");
			sql2BeanMap.put("@dtt_telco_response_time", "telcoResponseDateTime");
		}
		return sql2BeanMap;
	}
	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.putAll(getRs2BaseBeanMap());
			rs2BeanMap.put("id_sms_result_key", "smsResultId");
			rs2BeanMap.put("id_sms_result_version", "smsResultVersion");
			
			rs2BeanMap.put("tx_gateway_id", "gatewayId");
			rs2BeanMap.put("tx_gateway_name", "gatewayName");
			rs2BeanMap.put("tx_client_cbs_sms_id", "clientCbsSmsId");
			rs2BeanMap.put("tx_sms_number", "smsNumber");
			rs2BeanMap.put("tx_sms_status", "smsStatus");
			rs2BeanMap.put("tx_telco_sms_id", "telcoSmsId");
			rs2BeanMap.put("tx_sender_id", "senderId");
			rs2BeanMap.put("tx_sms_msg", "smsMsg");
			rs2BeanMap.put("id_loan_key", "loanId");
			rs2BeanMap.put("dtt_telco_response_time", "telcoResponseDateTime");			
		}
		return rs2BeanMap;
	}
	public Integer getSmsResultId() {
		return smsResultId;
	}
	public void setSmsResultId(Integer smsResultId) {
		this.smsResultId = smsResultId;
	}
	public Integer getSmsResultVersion() {
		return smsResultVersion;
	}
	public void setSmsResultVersion(Integer smsResultVersion) {
		this.smsResultVersion = smsResultVersion;
	}
	public String getGatewayId() {
		return gatewayId;
	}
	public void setGatewayId(String gatewayId) {
		this.gatewayId = gatewayId;
	}
	public String getGatewayName() {
		return gatewayName;
	}
	public void setGatewayName(String gatewayName) {
		this.gatewayName = gatewayName;
	}
	public String getClientCbsSmsId() {
		return clientCbsSmsId;
	}
	public void setClientCbsSmsId(String clientCbsSmsId) {
		this.clientCbsSmsId = clientCbsSmsId;
	}
	public String getSmsNumber() {
		return smsNumber;
	}
	public void setSmsNumber(String smsNumber) {
		this.smsNumber = smsNumber;
	}
	public String getSmsStatus() {
		return smsStatus;
	}
	public void setSmsStatus(String smsStatus) {
		this.smsStatus = smsStatus;
	}
	public String getTelcoSmsId() {
		return telcoSmsId;
	}
	public void setTelcoSmsId(String telcoSmsId) {
		this.telcoSmsId = telcoSmsId;
	}
	public String getSenderId() {
		return senderId;
	}
	public void setSenderId(String senderId) {
		this.senderId = senderId;
	}
	public String getSmsMsg() {
		return smsMsg;
	}
	public void setSmsMsg(String smsMsg) {
		this.smsMsg = smsMsg;
	}
	public LocalDateTime getTelcoResponseDateTime() {
		return telcoResponseDateTime;
	}
	public void setTelcoResponseDateTime(LocalDateTime telcoResponseDateTime) {
		this.telcoResponseDateTime = telcoResponseDateTime;
	}
	public Integer getLoanId() {
		return loanId;
	}
	public void setLoanId(Integer loanId) {
		this.loanId = loanId;
	}	
}
