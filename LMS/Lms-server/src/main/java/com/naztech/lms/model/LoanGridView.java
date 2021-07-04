package com.naztech.lms.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author assaduzzaman.sohan
 * @since 2020-01-06
 */

public class LoanGridView extends BaseModel {

	// loan properties
	private Integer loanId;
	private Integer loanVer;
	private String applicationNo;
	private String accountNo;
	private Integer idLoanTypeKey;
	private Integer idCustomerTypeKey;
	private Double appliedLoanAmount;
	private String purposeOfLoan;
	private Double interestRate;
	private Double monthlyInstallment;
	private String mobile;
	private String cibStatus;

	// customer properties
	private Integer customerIdKey;
	private String customerId;
	private String customerType;
	private String bpNo;
	private String customerName;
	private String designation;
	private Date dateOfBirth;
	private Date joiningDate;
	private String permanentAddr;
	private String officeAddr;
	private String nid;
	private String tin;
	private String maritalStatus;
	private String motherName;
	private String fatherName;
	private String spouse;

	private String loanTrackingId;
	private String dataSource;

	private Double recommendedForApproval;

	private String stateDisplayLabel;

	// It will use for recommend and return group
	private Integer recommendGroupId;
	// It will use for recommend to and return to
	private Integer recommendToId;

	private Integer approvedById;

	// if 1 then no action allow on this loan.
	private int locked;
	// check loan permission level for current user
	private int permission;
	private String legalEntityName;
	private String creatorName;
	private String district;
	private String division;

	// this will be use to show in work history
	private String currentStateName;
	private String actionName;
	private String userName;

	private String loanGroupId;
	private String loanGroupCreator;

	private String folderName;
	/*  0 for not create group, 1 for create group, 2 for remove from group */
	private Integer inGroup;

	private Double tenorYear;
	private Double proposedDBR;
	private Double allowedDBR;
	private Integer totalCount;
	private String smsStatus;
	private String stateList;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_loan_key", "loanId");
			sql2BeanMap.put("@id_loan_ver", "loanVer");
			sql2BeanMap.put("@tx_application_no", "applicationNo");
			sql2BeanMap.put("@tx_account_no", "accountNo");
			sql2BeanMap.put("@id_loan_type_key", "idLoanTypeKey");
			sql2BeanMap.put("@id_customer_type_key", "idCustomerTypeKey");
			sql2BeanMap.put("@dec_applied_loan_amount", "appliedLoanAmount");
			sql2BeanMap.put("@tx_loan_purpose", "purposeOfLoan");
			sql2BeanMap.put("@dec_interest_rate", "interestRate");
			sql2BeanMap.put("@dec_monthly_installment", "monthlyInstallment");
			sql2BeanMap.put("@tx_mobile", "mobile");
			sql2BeanMap.put("@tx_emer_phone", "emerPhone");
			sql2BeanMap.put("@tx_cib_status", "cibStatus");

			sql2BeanMap.put("@id_customer_key", "customerIdKey");
			sql2BeanMap.put("@tx_customer_id", "customerId");
			sql2BeanMap.put("@tx_customer_type", "customerType");
			sql2BeanMap.put("@tx_bp_no", "bpNo");
			sql2BeanMap.put("@tx_customer_name", "customerName");
			sql2BeanMap.put("@tx_designation", "designation");
			sql2BeanMap.put("@dtt_date_of_birth", "dateOfBirth");
			sql2BeanMap.put("@dtt_joining_date", "joiningDate");
			sql2BeanMap.put("@tx_permanet_addr", "permanentAddr");
			sql2BeanMap.put("@tx_office_addr", "officeAddr");
			sql2BeanMap.put("@tx_nid", "nid");
			sql2BeanMap.put("@tx_tin", "tin");
			sql2BeanMap.put("@tx_marital_status", "maritalStatus");
			sql2BeanMap.put("@tx_mother_name", "motherName");
			sql2BeanMap.put("@tx_father_name", "fatherName");
			sql2BeanMap.put("@tx_spouse", "spouse");
			sql2BeanMap.put("@tx_data_source", "dataSource");
			sql2BeanMap.put("@tx_loan_tracking_id", "loanTrackingId");
			sql2BeanMap.put("@int_permission", "permission");

			sql2BeanMap.put("@dec_recommended_for_approval", "recommendedForApproval");

			sql2BeanMap.put("@int_recommend_group_key", "recommendGroupId");
			sql2BeanMap.put("@int_recommend_to_key", "recommendToId");
			sql2BeanMap.put("@int_approved_by_key", "approvedById");
			sql2BeanMap.put("@tx_loan_group_id", "loanGroupId");
			sql2BeanMap.put("@int_in_group", "inGroup");
		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_loan_key", "loanId");
			rs2BeanMap.put("id_loan_ver", "loanVer");

			rs2BeanMap.put("tx_application_no", "applicationNo");
			rs2BeanMap.put("tx_account_no", "accountNo");
			rs2BeanMap.put("id_loan_type_key", "idLoanTypeKey");
			rs2BeanMap.put("id_customer_type_key", "idCustomerTypeKey");
			rs2BeanMap.put("dec_applied_loan_amount", "appliedLoanAmount");
			rs2BeanMap.put("tx_loan_purpose", "purposeOfLoan");
			rs2BeanMap.put("dec_interest_rate", "interestRate");
			rs2BeanMap.put("dec_monthly_installment", "monthlyInstallment");
			rs2BeanMap.put("tx_mobile", "mobile");
			rs2BeanMap.put("tx_emer_phone", "emerPhone");
			rs2BeanMap.put("tx_cib_status", "cibStatus");

			rs2BeanMap.put("id_customer_key", "customerIdKey");
			rs2BeanMap.put("tx_customer_id", "customerId");
			rs2BeanMap.put("tx_customer_type", "customerType");
			rs2BeanMap.put("tx_bp_no", "bpNo");
			rs2BeanMap.put("tx_customer_name", "customerName");
			rs2BeanMap.put("tx_designation", "designation");
			rs2BeanMap.put("dtt_date_of_birth", "dateOfBirth");
			rs2BeanMap.put("dtt_joining_date", "joiningDate");
			rs2BeanMap.put("tx_permanet_addr", "permanentAddr");
			rs2BeanMap.put("tx_office_addr", "officeAddr");
			rs2BeanMap.put("tx_nid", "nid");
			rs2BeanMap.put("tx_tin", "tin");
			rs2BeanMap.put("tx_marital_status", "maritalStatus");
			rs2BeanMap.put("tx_mother_name", "motherName");
			rs2BeanMap.put("tx_father_name", "fatherName");
			rs2BeanMap.put("tx_spouse", "spouse");
			rs2BeanMap.put("tx_loan_tracking_id", "loanTrackingId");
			rs2BeanMap.put("int_locked", "locked");
			rs2BeanMap.put("int_permission", "permission");
			rs2BeanMap.put("tx_state_display_label", "stateDisplayLabel");

			rs2BeanMap.put("int_recommend_group_key", "recommendGroupId");
			rs2BeanMap.put("int_recommend_to_key", "recommendToId");

			rs2BeanMap.put("dec_recommended_for_approval", "recommendedForApproval");
			rs2BeanMap.put("int_approved_by_key", "approvedById");
			rs2BeanMap.put("tx_legal_entity_name", "legalEntityName");
			rs2BeanMap.put("tx_creator_name", "creatorName");
			rs2BeanMap.put("tx_data_source", "dataSource");
			rs2BeanMap.put("tx_district", "district");
			rs2BeanMap.put("tx_division", "division");

			rs2BeanMap.put("tx_current_state_name", "currentStateName");
			rs2BeanMap.put("tx_action_name", "actionName");
			rs2BeanMap.put("tx_login_name", "userName");
			rs2BeanMap.put("tx_loan_group_id", "loanGroupId");
			rs2BeanMap.put("tx_loan_group_creator", "loanGroupCreator");
			rs2BeanMap.put("tx_folder_name", "folderName");
			rs2BeanMap.put("int_in_group", "inGroup");
			rs2BeanMap.put("dec_tenor_year", "tenorYear");
			rs2BeanMap.put("dec_allowed_dbr", "allowedDBR");
			rs2BeanMap.put("dec_proposed_dbr", "proposedDBR");
			rs2BeanMap.put("int_total_count", "totalCount");
			rs2BeanMap.put("tx_sms_status", "smsStatus");
			rs2BeanMap.put("tx_state_list", "stateList");
		}
		return rs2BeanMap;
	}

	public Integer getLoanId() {
		return loanId;
	}

	public void setLoanId(Integer loanId) {
		this.loanId = loanId;
	}

	public Integer getLoanVer() {
		return loanVer;
	}

	public void setLoanVer(Integer loanVer) {
		this.loanVer = loanVer;
	}

	public String getApplicationNo() {
		return applicationNo;
	}

	public void setApplicationNo(String applicationNo) {
		this.applicationNo = applicationNo;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public Integer getIdLoanTypeKey() {
		return idLoanTypeKey;
	}

	public void setIdLoanTypeKey(Integer idLoanTypeKey) {
		this.idLoanTypeKey = idLoanTypeKey;
	}

	public Integer getIdCustomerTypeKey() {
		return idCustomerTypeKey;
	}

	public void setIdCustomerTypeKey(Integer idCustomerTypeKey) {
		this.idCustomerTypeKey = idCustomerTypeKey;
	}

	public Double getAppliedLoanAmount() {
		return appliedLoanAmount;
	}

	public void setAppliedLoanAmount(Double appliedLoanAmount) {
		this.appliedLoanAmount = appliedLoanAmount;
	}

	public String getPurposeOfLoan() {
		return purposeOfLoan;
	}

	public void setPurposeOfLoan(String purposeOfLoan) {
		this.purposeOfLoan = purposeOfLoan;
	}

	public Double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(Double interestRate) {
		this.interestRate = interestRate;
	}

	public Double getMonthlyInstallment() {
		return monthlyInstallment;
	}

	public void setMonthlyInstallment(Double monthlyInstallment) {
		this.monthlyInstallment = monthlyInstallment;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
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

	public String getCustomerType() {
		return customerType;
	}

	public void setCustomerType(String customerType) {
		this.customerType = customerType;
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

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
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

	public String getCibStatus() {
		return cibStatus;
	}

	public void setCibStatus(String cibStatus) {
		this.cibStatus = cibStatus;
	}

	public String getLoanTrackingId() {
		return loanTrackingId;
	}

	public void setLoanTrackingId(String loanTrackingId) {
		this.loanTrackingId = loanTrackingId;
	}

	public String getDataSource() {
		return dataSource;
	}

	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}

	public Double getRecommendedForApproval() {
		return recommendedForApproval;
	}

	public void setRecommendedForApproval(Double recommendedForApproval) {
		this.recommendedForApproval = recommendedForApproval;
	}

	public int getLocked() {
		return locked;
	}

	public void setLocked(int locked) {
		this.locked = locked;
	}

	public int getPermission() {
		return permission;
	}

	public void setPermission(int permission) {
		this.permission = permission;
	}

	public Integer getRecommendGroupId() {
		return recommendGroupId;
	}

	public void setRecommendGroupId(Integer recommendGroupId) {
		this.recommendGroupId = recommendGroupId;
	}

	public Integer getRecommendToId() {
		return recommendToId;
	}

	public void setRecommendToId(Integer recommendToId) {
		this.recommendToId = recommendToId;
	}

	public Integer getApprovedById() {
		return approvedById;
	}

	public void setApprovedById(Integer approvedById) {
		this.approvedById = approvedById;
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

	public String getCreatorName() {
		return creatorName;
	}

	public void setCreatorName(String creatorName) {
		this.creatorName = creatorName;
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

	public String getLoanGroupId() {
		return loanGroupId;
	}

	public void setLoanGroupId(String loanGroupId) {
		this.loanGroupId = loanGroupId;
	}

	public String getLoanGroupCreator() {
		return loanGroupCreator;
	}

	public void setLoanGroupCreator(String loanGroupCreator) {
		this.loanGroupCreator = loanGroupCreator;
	}

	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public Integer getInGroup() {
		return inGroup;
	}

	public void setInGroup(Integer inGroup) {
		this.inGroup = inGroup;
	}

	public Double getTenorYear() {
		return tenorYear;
	}

	public void setTenorYear(Double tenorYear) {
		this.tenorYear = tenorYear;
	}

	public Double getProposedDBR() {
		return proposedDBR;
	}

	public void setProposedDBR(Double proposedDBR) {
		this.proposedDBR = proposedDBR;
	}

	public Double getAllowedDBR() {
		return allowedDBR;
	}

	public void setAllowedDBR(Double allowedDBR) {
		this.allowedDBR = allowedDBR;
	}
	
	public Integer getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(Integer totalCount) {
		this.totalCount = totalCount;
	}

	public String getSmsStatus() {
		return smsStatus;
	}

	public void setSmsStatus(String smsStatus) {
		this.smsStatus = smsStatus;
	}
	public String getStateList() {
		return stateList;
	}

	public void setStateList(String stateList) {
		this.stateList = stateList;
	}

}
