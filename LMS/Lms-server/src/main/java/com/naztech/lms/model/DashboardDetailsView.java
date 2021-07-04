package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author assaduzzaman.sohan
 * @since 2020-07-07
 */
public class DashboardDetailsView extends BaseModel {
	// loan properties
	private Integer loanId;
	private String accountNo;
	private Double appliedLoanAmount;

	// customer properties
	private Integer customerIdKey;
	private String customerId;
	private String bpNo;
	private String customerName;
	private String smsStatus;

	private String loanTrackingId;
	private String stateDisplayLabel;

	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_loan_key", "loanId");
			rs2BeanMap.put("tx_account_no", "accountNo");
			rs2BeanMap.put("dec_applied_loan_amount", "appliedLoanAmount");

			rs2BeanMap.put("id_customer_key", "customerIdKey");
			rs2BeanMap.put("tx_customer_id", "customerId");
			rs2BeanMap.put("tx_bp_no", "bpNo");
			rs2BeanMap.put("tx_customer_name", "customerName");
			rs2BeanMap.put("tx_loan_tracking_id", "loanTrackingId");
			rs2BeanMap.put("tx_state_display_label", "stateDisplayLabel");
			rs2BeanMap.put("tx_sms_status", "smsStatus");
		}
		return rs2BeanMap;
	}

	public Integer getLoanId() {
		return loanId;
	}

	public void setLoanId(Integer loanId) {
		this.loanId = loanId;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public Double getAppliedLoanAmount() {
		return appliedLoanAmount;
	}

	public void setAppliedLoanAmount(Double appliedLoanAmount) {
		this.appliedLoanAmount = appliedLoanAmount;
	}

	public Integer getCustomerIdKey() {
		return customerIdKey;
	}

	public void setCustomerIdKey(Integer customerIdKey) {
		this.customerIdKey = customerIdKey;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getBpNo() {
		return bpNo;
	}

	public void setBpNo(String bpNo) {
		this.bpNo = bpNo;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getLoanTrackingId() {
		return loanTrackingId;
	}

	public void setLoanTrackingId(String loanTrackingId) {
		this.loanTrackingId = loanTrackingId;
	}

	public String getStateDisplayLabel() {
		return stateDisplayLabel;
	}

	public void setStateDisplayLabel(String stateDisplayLabel) {
		this.stateDisplayLabel = stateDisplayLabel;
	}

	public String getSmsStatus() {
		return smsStatus;
	}

	public void setSmsStatus(String smsStatus) {
		this.smsStatus = smsStatus;
	}

}
