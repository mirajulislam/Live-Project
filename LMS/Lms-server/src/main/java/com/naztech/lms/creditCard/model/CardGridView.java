/**
 * 
 */
package com.naztech.lms.creditCard.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.naztech.lms.model.BaseModel;

/**
 * @author mirajul.islam
 *
 */
public class CardGridView extends BaseModel{
	private Integer creditCardId;
	private Integer creditCardVer;
	private String applicationNumber;
	private Integer ccTrackingNumber;	
	private Integer cardTypeKey;	
	private String bpNo;
	private String stateDisplayLabel;
	private String legalEntityName;	
	private String customerName;
	private String accountNo;
	private Double applicantAskingLimit;
	private Double interestRate;
	private String mobile;
	private String customerId;
	private Integer idCustomerTypeKey;
	private String nid;
	private String tin;
	private Date dateOfBirth;
	private String designation;
	private Date joiningDate;
	private String permanentAddr;
	private String officeAddr;
	private String maritalStatus;
	private String motherName;
	private String fatherName;
	private String spouse;
	private String creatorName;
	private String dataSource;
	private String district;
	private String division;
	private Double approvedLimit;
	
	private String currentStateName;
	private String actionName;
	private String userName;
	
	private String folderName;
	private String staffId;
	private String sourceBrance;
	
	private String cardGroupId;
	private String cardGroupCreator;
	private Integer inGroup;
	private String dobOfGroupCreate;
	private double totalGroupAmount;
	private Integer totalLoanThisGroup;
	private String hoCrmComment;
	private String cadComment;
	private Integer idGroupStateKey;
	
	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.putAll(getRs2BaseBeanMap());
			
			sql2BeanMap.put("@id_credit_card_key", "creditCardId");
			sql2BeanMap.put("@id_credit_card_ver", "creditCardVer");
			sql2BeanMap.put("@int_cc_tracking_number", "ccTrackingNumber");
			sql2BeanMap.put("@tx_application_number", "applicationNumber");
			sql2BeanMap.put("@id_card_type_key", "cardTypeKey");
			sql2BeanMap.put("@tx_bp_no", "bpNo");
			sql2BeanMap.put("@tx_customer_name", "customerName");
			sql2BeanMap.put("@tx_account_no", "accountNo");
			sql2BeanMap.put("@dec_applicant_asking_limit", "applicantAskingLimit");
			sql2BeanMap.put("@dec_interest_rate", "interestRate");
			sql2BeanMap.put("@tx_card_group_id", "cardGroupId");
			sql2BeanMap.put("@int_in_group", "inGroup");	
			sql2BeanMap.put("@dtt_group_create", "dobOfGroupCreate");
			sql2BeanMap.put("@tx_sourcing_staff_id", "staffId");
			sql2BeanMap.put("@tx_sourcing_branch", "sourceBrance");
			sql2BeanMap.put("@tx_ho_crm_comment", "hoCrmComment");
			sql2BeanMap.put("@tx_cad_comment", "cadComment");
			sql2BeanMap.put("@id_group_state_key", "idGroupStateKey");
		}
		return sql2BeanMap;
	}
	
	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.putAll(getRs2BaseBeanMap());
			
			rs2BeanMap.put("id_credit_card_key", "creditCardId");
			rs2BeanMap.put("id_credit_card_ver", "creditCardVer");
			rs2BeanMap.put("int_cc_tracking_number", "ccTrackingNumber");
			rs2BeanMap.put("tx_application_number", "applicationNumber");
			rs2BeanMap.put("id_card_type_key", "cardTypeKey");
			rs2BeanMap.put("tx_bp_no", "bpNo");
			rs2BeanMap.put("tx_state_display_label", "stateDisplayLabel");
			rs2BeanMap.put("tx_legal_entity_name", "legalEntityName");
			rs2BeanMap.put("tx_customer_name", "customerName");
			rs2BeanMap.put("tx_account_no", "accountNo");
			rs2BeanMap.put("dec_applicant_asking_limit", "applicantAskingLimit");
			rs2BeanMap.put("dec_interest_rate", "interestRate");
			rs2BeanMap.put("tx_mobile", "mobile");
			rs2BeanMap.put("tx_customer_id", "customerId");
			rs2BeanMap.put("id_customer_type_key", "idCustomerTypeKey");
			rs2BeanMap.put("tx_nid", "nid");
			rs2BeanMap.put("tx_tin", "tin");
			rs2BeanMap.put("tx_marital_status", "maritalStatus");
			rs2BeanMap.put("tx_mother_name", "motherName");
			rs2BeanMap.put("tx_father_name", "fatherName");
			rs2BeanMap.put("tx_spouse", "spouse");
			rs2BeanMap.put("tx_designation", "designation");
			rs2BeanMap.put("dtt_date_of_birth", "dateOfBirth");
			rs2BeanMap.put("dtt_joining_date", "joiningDate");
			rs2BeanMap.put("tx_permanet_addr", "permanentAddr");
			rs2BeanMap.put("tx_office_addr", "officeAddr");
			rs2BeanMap.put("tx_creator_name", "creatorName");
			rs2BeanMap.put("tx_data_source", "dataSource");
			rs2BeanMap.put("tx_district", "district");
			rs2BeanMap.put("tx_division", "division");
			rs2BeanMap.put("tx_folder_name", "folderName");
			rs2BeanMap.put("tx_card_group_id", "cardGroupId");
			rs2BeanMap.put("tx_card_group_creator", "cardGroupCreator");
			rs2BeanMap.put("int_in_group", "inGroup");
			rs2BeanMap.put("dtt_group_create", "dobOfGroupCreate");					
			rs2BeanMap.put("tx_current_state_name", "currentStateName");
			rs2BeanMap.put("tx_action_name", "actionName");
			rs2BeanMap.put("tx_login_name", "userName");
			rs2BeanMap.put("tx_sourcing_staff_id", "staffId");
			rs2BeanMap.put("tx_sourcing_branch", "sourceBrance");
			rs2BeanMap.put("dec_total_group_amount", "totalGroupAmount");
			rs2BeanMap.put("total_loan_this_group", "totalLoanThisGroup");
			rs2BeanMap.put("tx_ho_crm_comment", "hoCrmComment");
			rs2BeanMap.put("tx_cad_comment", "cadComment");
			rs2BeanMap.put("dec_approved_limit", "approvedLimit");
			rs2BeanMap.put("id_group_state_key", "idGroupStateKey");
		}
		return rs2BeanMap;
	}
	
	public Integer getCreditCardId() {
		return creditCardId;
	}
	public void setCreditCardId(Integer creditCardId) {
		this.creditCardId = creditCardId;
	}
	public Integer getCreditCardVer() {
		return creditCardVer;
	}
	public void setCreditCardVer(Integer creditCardVer) {
		this.creditCardVer = creditCardVer;
	}
	public String getApplicationNumber() {
		return applicationNumber;
	}
	public void setApplicationNumber(String applicationNumber) {
		this.applicationNumber = applicationNumber;
	}
	public Integer getCcTrackingNumber() {
		return ccTrackingNumber;
	}
	public void setCcTrackingNumber(Integer ccTrackingNumber) {
		this.ccTrackingNumber = ccTrackingNumber;
	}
	public Integer getCardTypeKey() {
		return cardTypeKey;
	}
	public void setCardTypeKey(Integer cardTypeKey) {
		this.cardTypeKey = cardTypeKey;
	}
	public String getBpNo() {
		return bpNo;
	}
	public void setBpNo(String bpNo) {
		this.bpNo = bpNo;
	}
	public String getStateDisplayLabel() {
		return stateDisplayLabel;
	}
	public void setStateDisplayLabel(String stateDisplayLabel) {
		this.stateDisplayLabel = stateDisplayLabel;
	}
	public String getLegalEntityName() {
		return legalEntityName;
	}
	public void setLegalEntityName(String legalEntityName) {
		this.legalEntityName = legalEntityName;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public Double getApplicantAskingLimit() {
		return applicantAskingLimit;
	}
	public void setApplicantAskingLimit(Double applicantAskingLimit) {
		this.applicantAskingLimit = applicantAskingLimit;
	}
	public Double getInterestRate() {
		return interestRate;
	}
	public void setInterestRate(Double interestRate) {
		this.interestRate = interestRate;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public Integer getIdCustomerTypeKey() {
		return idCustomerTypeKey;
	}
	public void setIdCustomerTypeKey(Integer idCustomerTypeKey) {
		this.idCustomerTypeKey = idCustomerTypeKey;
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
	public Date getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public Date getJoiningDate() {
		return joiningDate;
	}
	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
	}
	public String getPermanentAddr() {
		return permanentAddr;
	}
	public void setPermanentAddr(String permanentAddr) {
		this.permanentAddr = permanentAddr;
	}
	public String getOfficeAddr() {
		return officeAddr;
	}
	public void setOfficeAddr(String officeAddr) {
		this.officeAddr = officeAddr;
	}
	public String getMaritalStatus() {
		return maritalStatus;
	}
	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}
	public String getMotherName() {
		return motherName;
	}
	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}
	public String getFatherName() {
		return fatherName;
	}
	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}
	public String getSpouse() {
		return spouse;
	}
	public void setSpouse(String spouse) {
		this.spouse = spouse;
	}
	public String getCreatorName() {
		return creatorName;
	}
	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
	}
	public String getDataSource() {
		return dataSource;
	}
	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}
	public String getDistrict() {
		return district;
	}
	public void setDistrict(String district) {
		this.district = district;
	}
	public String getDivision() {
		return division;
	}
	public void setDivision(String division) {
		this.division = division;
	}
	
	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}		

	public String getCurrentStateName() {
		return currentStateName;
	}

	public void setCurrentStateName(String currentStateName) {
		this.currentStateName = currentStateName;
	}

	public String getActionName() {
		return actionName;
	}

	public void setActionName(String actionName) {
		this.actionName = actionName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}		

	public String getCardGroupId() {
		return cardGroupId;
	}

	public void setCardGroupId(String cardGroupId) {
		this.cardGroupId = cardGroupId;
	}

	public String getCardGroupCreator() {
		return cardGroupCreator;
	}

	public void setCardGroupCreator(String cardGroupCreator) {
		this.cardGroupCreator = cardGroupCreator;
	}

	public Integer getInGroup() {
		return inGroup;
	}

	public void setInGroup(Integer inGroup) {
		this.inGroup = inGroup;
	}

	public String getDobOfGroupCreate() {
		return dobOfGroupCreate;
	}

	public void setDobOfGroupCreate(String dobOfGroupCreate) {
		this.dobOfGroupCreate = dobOfGroupCreate;
	}

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}

	public String getSourceBrance() {
		return sourceBrance;
	}

	public void setSourceBrance(String sourceBrance) {
		this.sourceBrance = sourceBrance;
	}

	public double getTotalGroupAmount() {
		return totalGroupAmount;
	}

	public void setTotalGroupAmount(double totalGroupAmount) {
		this.totalGroupAmount = totalGroupAmount;
	}

	public Integer getTotalLoanThisGroup() {
		return totalLoanThisGroup;
	}

	public void setTotalLoanThisGroup(Integer totalLoanThisGroup) {
		this.totalLoanThisGroup = totalLoanThisGroup;
	}

	public String getHoCrmComment() {
		return hoCrmComment;
	}

	public void setHoCrmComment(String hoCrmComment) {
		this.hoCrmComment = hoCrmComment;
	}

	public String getCadComment() {
		return cadComment;
	}

	public void setCadComment(String cadComment) {
		this.cadComment = cadComment;
	}

	public Double getApprovedLimit() {
		return approvedLimit;
	}

	public void setApprovedLimit(Double approvedLimit) {
		this.approvedLimit = approvedLimit;
	}

	public Integer getIdGroupStateKey() {
		return idGroupStateKey;
	}

	public void setIdGroupStateKey(Integer idGroupStateKey) {
		this.idGroupStateKey = idGroupStateKey;
	}

	@Override
	public String toString() {
		return "CardGridView [creditCardId=" + creditCardId + ", creditCardVer=" + creditCardVer + ", applicationNumber=" + applicationNumber
		        + ", ccTrackingNumber=" + ccTrackingNumber + ", cardTypeKey=" + cardTypeKey + ", bpNo=" + bpNo + ", stateDisplayLabel="
		        + stateDisplayLabel + ", legalEntityName=" + legalEntityName + ", customerName=" + customerName + ", accountNo=" + accountNo
		        + ", applicantAskingLimit=" + applicantAskingLimit + ", interestRate=" + interestRate + ", mobile=" + mobile + ", customerId="
		        + customerId + ", idCustomerTypeKey=" + idCustomerTypeKey + ", nid=" + nid + ", tin=" + tin + ", dateOfBirth=" + dateOfBirth
		        + ", designation=" + designation + ", joiningDate=" + joiningDate + ", permanentAddr=" + permanentAddr + ", officeAddr=" + officeAddr
		        + ", maritalStatus=" + maritalStatus + ", motherName=" + motherName + ", fatherName=" + fatherName + ", spouse=" + spouse
		        + ", creatorName=" + creatorName + ", dataSource=" + dataSource + ", district=" + district + ", division=" + division + "]";
	}
	
}
