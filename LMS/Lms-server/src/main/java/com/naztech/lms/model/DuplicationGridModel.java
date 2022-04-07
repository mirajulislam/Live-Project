package com.naztech.lms.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

public class DuplicationGridModel {
	private Integer loanId;
	private Integer creditCardId;
	private String trackingNumber;
	private String status;
	private Date statusDate;
	private String loanAcount;
	private Double disbursedAmount;
	private Double approvedAmount;
	private Date disbursedDate;
	private Double emiPaidOutOf;
	private Double emiSize;
	private String outstanding;
	private String objectName;
	private String product;
	
	private static Map<String, String> rs2BeanMap = null;
	
	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			
			rs2BeanMap.put("int_loan_id","loanId");
			rs2BeanMap.put("int_credit_card_id","creditCardId");
			rs2BeanMap.put("tx_tracking_number","trackingNumber");
			rs2BeanMap.put("tx_status","status");
			rs2BeanMap.put("dtt_status_date","statusDate");
			rs2BeanMap.put("loan_account","loanAcount");
			rs2BeanMap.put("dec_disbursed_amount","disbursedAmount");
			rs2BeanMap.put("dec_approved_amount","approvedAmount");
			rs2BeanMap.put("dtt_disbursed_date","disbursedDate");
			rs2BeanMap.put("dec_emi_paid_out_of","emiPaidOutOf");
			rs2BeanMap.put("dec_emi_size","emiSize");
			rs2BeanMap.put("out_standing","outstanding");
			rs2BeanMap.put("object_name","objectName");
			rs2BeanMap.put("tx_product","product");
		}
		return rs2BeanMap;
	}
	public Integer getLoanId() {
		return loanId;
	}
	public void setLoanId(Integer loanId) {
		this.loanId = loanId;
	}
	public Integer getCreditCardId() {
		return creditCardId;
	}
	public void setCreditCardId(Integer creditCardId) {
		this.creditCardId = creditCardId;
	}
	public String getTrackingNumber() {
		return trackingNumber;
	}
	public void setTrackingNumber(String trackingNumber) {
		this.trackingNumber = trackingNumber;
	}

	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public Date getStatusDate() {
		return statusDate;
	}
	public void setStatusDate(Date statusDate) {
		this.statusDate = statusDate;
	}
	public String getLoanAcount() {
		return loanAcount;
	}
	public void setLoanAcount(String loanAcount) {
		this.loanAcount = loanAcount;
	}
	public Double getDisbursedAmount() {
		return disbursedAmount;
	}
	public void setDisbursedAmount(Double disbursedAmount) {
		this.disbursedAmount = disbursedAmount;
	}
	
	public Date getDisbursedDate() {
		return disbursedDate;
	}
	public void setDisbursedDate(Date disbursedDate) {
		this.disbursedDate = disbursedDate;
	}
	public Double getEmiPaidOutOf() {
		return emiPaidOutOf;
	}
	public void setEmiPaidOutOf(Double emiPaidOutOf) {
		this.emiPaidOutOf = emiPaidOutOf;
	}
	public Double getEmiSize() {
		return emiSize;
	}
	public void setEmiSize(Double emiSize) {
		this.emiSize = emiSize;
	}
	public String getOutstanding() {
		return outstanding;
	}
	public void setOutstanding(String outstanding) {
		this.outstanding = outstanding;
	}
	public String getObjectName() {
		return objectName;
	}
	public void setObjectName(String objectName) {
		this.objectName = objectName;
	}
	public Double getApprovedAmount() {
		return approvedAmount;
	}
	public void setApprovedAmount(Double approvedAmount) {
		this.approvedAmount = approvedAmount;
	}
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
		
}
