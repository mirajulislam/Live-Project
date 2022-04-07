/**
 * 
 */
package com.naztech.lms.creditCard.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

import com.naztech.lms.model.BaseModel;

public class CardReport extends BaseModel{
	//card loan info
	private Integer ccTrackingNumber;
	private Double appliedAmount;
	private Double approvedLimit;
	private Double interestRate;
	private Double proposedDbr;
	private String accountNo;
	private String additionalIncomeSource;
	private String applicationNumber;
	private String kycLevel;
	private String proposedBillingDate;
	private String cardSecurityType;
	private String cibStatus;
	private String status;
	private String submitUnit;
	private String stateMap;
	
	private String bpNo;
	private String customerName;
	private String designation;
	private String currentPlaceofPosting;
	private Date dateOfBirth;
	private String nid;
	private String tin;
	private String mobile;
	private Date lastDateOfPosting;
	private String districtOfPosting;
	private String nameAsPerNid;
	private String customerPostingDistrict;
	private String customerPostingDivision;
	private String passportNo;
	private String highestLevelOfEducation;
	private Date passpordExpiryDate;
	private String email;
	private String cardMonthlyBillDebited;
	
	/* For crm Report Service */
	private String cardType;
	private Date dateOfQuery;
	private String inputBy;
	private String customerType;
	private String cbsUserId;
	private Date reSubmitDate;
	private Date approvedDate;
	private String analyst;
	private Date returnToSourceDate;
	private String analystComments;
	private Double totalEMI;
	private String nameOfGuarantor;
	private Double recommendedForApproval;
	
	private Date receivedByCrm;
	
	private String cardIdListStr;
	
	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_credit_card_key", "creditCardId");
			sql2BeanMap.put("@id_credit_card_ver", "creditCardVer");

			sql2BeanMap.put("@id_userId", "userId");
			sql2BeanMap.put("@tx_card_id_list", "cardIdListStr");
		}
		return sql2BeanMap;
	}
	
	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.putAll(getRs2BaseBeanMap());
			
			rs2BeanMap.put("int_cc_tracking_number", "ccTrackingNumber");
			rs2BeanMap.put("tx_application_number", "applicationNumber");
			rs2BeanMap.put("dec_approved_limit", "approvedLimit");
			rs2BeanMap.put("dec_interest_rate", "interestRate");
			rs2BeanMap.put("dec_proposed_dbr", "proposedDbr");
			rs2BeanMap.put("tx_account_no", "accountNo");
			rs2BeanMap.put("tx_additional_income_source", "additionalIncomeSource");
			rs2BeanMap.put("dec_applied_amount", "appliedAmount");
			rs2BeanMap.put("tx_kyc_level", "kycLevel");
			rs2BeanMap.put("tx_proposed_billing_date", "proposedBillingDate");
			rs2BeanMap.put("tx_card_security_type", "cardSecurityType");
			rs2BeanMap.put("tx_cib_status", "cibStatus");
			rs2BeanMap.put("tx_card_current_status", "status");
			rs2BeanMap.put("tx_card_creator", "submitUnit");
			rs2BeanMap.put("tx_state_map", "stateMap");
			
			rs2BeanMap.put("tx_loan_type", "loanType");
			rs2BeanMap.put("dtt_of_query", "dateOfQuery");
			rs2BeanMap.put("tx_input_by", "inputBy");
			rs2BeanMap.put("tx_cbs_user_id", "cbsUserId");
			rs2BeanMap.put("tx_customer_type", "customerType");
			rs2BeanMap.put("dtt_approved_date", "approvedDate");
			rs2BeanMap.put("tx_analyst", "analyst");
			rs2BeanMap.put("dtt_return_to_source_date", "returnToSourceDate");
			rs2BeanMap.put("dec_total_emi", "totalEMI");
			rs2BeanMap.put("tx_name_of_guarantor", "nameOfGuarantor");
			
			rs2BeanMap.put("tx_bp_no", "bpNo");
			rs2BeanMap.put("tx_customer_name", "customerName");
			rs2BeanMap.put("tx_designation", "designation");
			rs2BeanMap.put("tx_current_posting_place", "currentPlaceofPosting");
			rs2BeanMap.put("dtt_date_of_birth", "dateOfBirth");
			rs2BeanMap.put("tx_nid", "nid");
			rs2BeanMap.put("tx_tin", "tin");
			rs2BeanMap.put("tx_mobile", "mobile");			
			rs2BeanMap.put("dt_last_date_of_posting", "lastDateOfPosting");
			rs2BeanMap.put("tx_district_of_posting", "districtOfPosting");
			rs2BeanMap.put("tx_name_as_per_nid", "nameAsPerNid");
			rs2BeanMap.put("tx_customer_posting_district", "customerPostingDistrict");
			rs2BeanMap.put("tx_customer_posting_division", "customerPostingDivision");
			rs2BeanMap.put("int_passport_no", "passportNo");
			rs2BeanMap.put("tx_highest_level_of_education", "highestLevelOfEducation");
			rs2BeanMap.put("dt_passpord_expiry_date", "passpordExpiryDate");
			rs2BeanMap.put("tx_email", "email");
			rs2BeanMap.put("tx_card_monthly_bill_debited", "cardMonthlyBillDebited");
			rs2BeanMap.put("tx_card_type", "cardType");
			rs2BeanMap.put("dec_recommend_for_approval", "recommendedForApproval");
			rs2BeanMap.put("dtt_crm_received_date", "receivedByCrm");
		}
		return rs2BeanMap;
	}
	
	public Integer getCcTrackingNumber() {
		return ccTrackingNumber;
	}
	public void setCcTrackingNumber(Integer ccTrackingNumber) {
		this.ccTrackingNumber = ccTrackingNumber;
	}
	public Double getAppliedAmount() {
		return appliedAmount;
	}
	public void setAppliedAmount(Double appliedAmount) {
		this.appliedAmount = appliedAmount;
	}
	public Double getApprovedLimit() {
		return approvedLimit;
	}
	public void setApprovedLimit(Double approvedLimit) {
		this.approvedLimit = approvedLimit;
	}
	public Double getInterestRate() {
		return interestRate;
	}
	public void setInterestRate(Double interestRate) {
		this.interestRate = interestRate;
	}
	public Double getProposedDbr() {
		return proposedDbr;
	}
	public void setProposedDbr(Double proposedDbr) {
		this.proposedDbr = proposedDbr;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public String getAdditionalIncomeSource() {
		return additionalIncomeSource;
	}
	public void setAdditionalIncomeSource(String additionalIncomeSource) {
		this.additionalIncomeSource = additionalIncomeSource;
	}
	public String getApplicationNumber() {
		return applicationNumber;
	}
	public void setApplicationNumber(String applicationNumber) {
		this.applicationNumber = applicationNumber;
	}
	public String getKycLevel() {
		return kycLevel;
	}
	public void setKycLevel(String kycLevel) {
		this.kycLevel = kycLevel;
	}
	public String getProposedBillingDate() {
		return proposedBillingDate;
	}
	public void setProposedBillingDate(String proposedBillingDate) {
		this.proposedBillingDate = proposedBillingDate;
	}
	public String getCardSecurityType() {
		return cardSecurityType;
	}
	public void setCardSecurityType(String cardSecurityType) {
		this.cardSecurityType = cardSecurityType;
	}
	public String getCibStatus() {
		return cibStatus;
	}
	public void setCibStatus(String cibStatus) {
		this.cibStatus = cibStatus;
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
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getCurrentPlaceofPosting() {
		return currentPlaceofPosting;
	}
	public void setCurrentPlaceofPosting(String currentPlaceofPosting) {
		this.currentPlaceofPosting = currentPlaceofPosting;
	}
	public Date getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getNid() {
		return nid;
	}
	public void setNid(String nid) {
		this.nid = nid;
	}
	public String getTin() {
		return tin;
	}
	public void setTin(String tin) {
		this.tin = tin;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public Date getLastDateOfPosting() {
		return lastDateOfPosting;
	}
	public void setLastDateOfPosting(Date lastDateOfPosting) {
		this.lastDateOfPosting = lastDateOfPosting;
	}
	public String getDistrictOfPosting() {
		return districtOfPosting;
	}
	public void setDistrictOfPosting(String districtOfPosting) {
		this.districtOfPosting = districtOfPosting;
	}
	public String getNameAsPerNid() {
		return nameAsPerNid;
	}
	public void setNameAsPerNid(String nameAsPerNid) {
		this.nameAsPerNid = nameAsPerNid;
	}
	public String getCustomerPostingDistrict() {
		return customerPostingDistrict;
	}
	public void setCustomerPostingDistrict(String customerPostingDistrict) {
		this.customerPostingDistrict = customerPostingDistrict;
	}
	public String getCustomerPostingDivision() {
		return customerPostingDivision;
	}
	public void setCustomerPostingDivision(String customerPostingDivision) {
		this.customerPostingDivision = customerPostingDivision;
	}
	public String getPassportNo() {
		return passportNo;
	}
	public void setPassportNo(String passportNo) {
		this.passportNo = passportNo;
	}
	public String getHighestLevelOfEducation() {
		return highestLevelOfEducation;
	}
	public void setHighestLevelOfEducation(String highestLevelOfEducation) {
		this.highestLevelOfEducation = highestLevelOfEducation;
	}
	public Date getPasspordExpiryDate() {
		return passpordExpiryDate;
	}
	public void setPasspordExpiryDate(Date passpordExpiryDate) {
		this.passpordExpiryDate = passpordExpiryDate;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getCardMonthlyBillDebited() {
		return cardMonthlyBillDebited;
	}
	public void setCardMonthlyBillDebited(String cardMonthlyBillDebited) {
		this.cardMonthlyBillDebited = cardMonthlyBillDebited;
	}
	public String getCardType() {
		return cardType;
	}
	public void setCardType(String cardType) {
		this.cardType = cardType;
	}
	public Date getDateOfQuery() {
		return dateOfQuery;
	}
	public void setDateOfQuery(Date dateOfQuery) {
		this.dateOfQuery = dateOfQuery;
	}
	public String getInputBy() {
		return inputBy;
	}
	public void setInputBy(String inputBy) {
		this.inputBy = inputBy;
	}
	public String getCustomerType() {
		return customerType;
	}
	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}
	public String getCbsUserId() {
		return cbsUserId;
	}
	public void setCbsUserId(String cbsUserId) {
		this.cbsUserId = cbsUserId;
	}
	public Date getReSubmitDate() {
		return reSubmitDate;
	}
	public void setReSubmitDate(Date reSubmitDate) {
		this.reSubmitDate = reSubmitDate;
	}
	public Date getApprovedDate() {
		return approvedDate;
	}
	public void setApprovedDate(Date approvedDate) {
		this.approvedDate = approvedDate;
	}
	public String getAnalyst() {
		return analyst;
	}
	public void setAnalyst(String analyst) {
		this.analyst = analyst;
	}
	public Date getReturnToSourceDate() {
		return returnToSourceDate;
	}
	public void setReturnToSourceDate(Date returnToSourceDate) {
		this.returnToSourceDate = returnToSourceDate;
	}
	public String getAnalystComments() {
		return analystComments;
	}
	public void setAnalystComments(String analystComments) {
		this.analystComments = analystComments;
	}
	public Double getTotalEMI() {
		return totalEMI;
	}
	public void setTotalEMI(Double totalEMI) {
		this.totalEMI = totalEMI;
	}
	public String getNameOfGuarantor() {
		return nameOfGuarantor;
	}
	public void setNameOfGuarantor(String nameOfGuarantor) {
		this.nameOfGuarantor = nameOfGuarantor;
	}
	public Double getRecommendedForApproval() {
		return recommendedForApproval;
	}
	public void setRecommendedForApproval(Double recommendedForApproval) {
		this.recommendedForApproval = recommendedForApproval;
	}

	public String getCardIdListStr() {
		return cardIdListStr;
	}

	public void setCardIdListStr(String cardIdListStr) {
		this.cardIdListStr = cardIdListStr;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSubmitUnit() {
		return submitUnit;
	}

	public void setSubmitUnit(String submitUnit) {
		this.submitUnit = submitUnit;
	}

	public String getStateMap() {
		return stateMap;
	}

	public void setStateMap(String stateMap) {
		this.stateMap = stateMap;
	}

	public Date getReceivedByCrm() {
		return receivedByCrm;
	}

	public void setReceivedByCrm(Date receivedByCrm) {
		this.receivedByCrm = receivedByCrm;
	}
	
	
	
}
