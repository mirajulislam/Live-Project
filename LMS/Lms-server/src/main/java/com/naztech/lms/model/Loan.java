package com.naztech.lms.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author md.kamruzzaman
 */
public class Loan extends BaseModel {

	Customer customer;
	List<ExistingLiability> existingLiabilityList;
	List<Comment> cibStatusList;
	List<Comment> analystsCommentsList;
	List<Comment> exceptionDetailsList;
	List<Comment> instructionToCadList;

	List<Comment> cmntJustificationList;
	List<Comment> cmntWaiverSoughtList;
	List<Comment> sourceRecmndList;
	List<Comment> branchRecmndList;

	List<Comment> commentList;

	List<LoanDocument> loanDocumentList;
	List<LoanDocument> loanDocListForCibStatus;

	List<LoanConfig> loanConfigList;
	List<Loan> rmOrUhManagerList;
	List<Integer> loanIdList;
	List<Loan> loanList;

	private Integer loanId;
	private Integer loanVer;

	private Integer customerIdKey;

	private String applicationNo;

	private Integer idLoanTypeKey;
	private Integer idCustomerTypeKey;

	private Double appliedLoanAmount;
	private String purposeOfLoan;
	private Integer overLoan;
	private Double netMonthlyIncome;
	private Double tenorYear;
	private Double existingLoanAmount;
	private Double interestRate;
	private Double totalEMI;
	private Double monthlyInstallment;
	private Double disposableIncome;
	private String proposeEMIDate;
	private String duplications;
	private Date cibGenerationDate;
	private Double allowedDBR;
	private String cibStatus;
	private Double proposedDBR;
	private Double priceQuotationAmount;
	private String bankParticipation;

	private String security;
	private String guarantorElibiblity;
	private Date dobOfPg;
	private Double remainingAmtAftEMI;
	private Double grossSalaryPerMonth;
	private String dobOfPgYear;
	private String borrowerParticipation;
	private Integer idLegalEntityKey;
	private Integer idCustomerVer;
	private String nameOfGuarantor;
	private String relationshipWithApplicant;
	private String relationshipWithPg;
	private String dataSource;

	private Double businessRecommendedAmnt;
	private Double recommendedForApproval;
	private Integer topUp;

	// search properties
	private String accountNo4Src;
	private String bpNo4Src;
	private String nid4Src;
	private String phone4Src;
	private String fromDate4Src;
	private String toDate4Src;
	private String customerName;

	private String uiActionName;
	private String bpNo;
	private String deputyHoCRM;

	// internally we use some technical name for state but we may need to show some
	// human readable state name. T_FSM_STATE -> [tx_display_text]
	private String stateDisplayLabel;

	private String loanTrackingId;

	private String verificationEmail;

	// if 1 then no action allow on this loan.
	private int locked;
	private int permission;

	private Integer recommendGroupId;
	private Integer recommendToId;
	private Integer approvedById;

	private String fromRoleIds;
	private String staffId;
	private String sourcingBrc;

	private String condition;
	private boolean isFieldOfficer;

	/* For Report Service */
	private String loanType;
	private String dateOfQuery;
	private String inputBy;
	private Date crmReceivedDate;
	private String customerType;
	private String cbsUserId;
	private Date reSubmitDate;
	private Date approvedDate;
	private Date sentToCad;
	private String analyst;
	private Date returnToSourceDate;
	private String analystComments;
	private String loanCurrentStatus;

	private String loanIds;
	private Integer slGeneratCnt;

	private String userName;
	private String designation;
	private Double gPFAmount;

	private String guarantorNid;

	private String loanPrefix;

	private String loanGroupId;
	
	private String dobOfGroupCreate;
	
	private String mobileOfGuarantor;
	String accountNo;
	
	private String cibLink;
	
	private Integer startValue;
	private Integer limitValue;
	private Integer pageSize;
	//count duplication loan check same bp number 
	private Integer duplicationCheckSameBp;
	private String loanIdListStr;
	private String smsStatus;
	private String eLoanSearchState;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_loan_key", "loanId");
			sql2BeanMap.put("@id_loan_ver", "loanVer");

			sql2BeanMap.put("@id_customer_key", "customerIdKey");

			sql2BeanMap.put("@tx_application_no", "applicationNo");

			sql2BeanMap.put("@id_loan_type_key", "idLoanTypeKey");
			sql2BeanMap.put("@id_customer_type_key", "idCustomerTypeKey");

			sql2BeanMap.put("@dec_applied_loan_amount", "appliedLoanAmount");
			sql2BeanMap.put("@tx_loan_purpose", "purposeOfLoan");
			sql2BeanMap.put("@int_over_loan", "overLoan");
			sql2BeanMap.put("@dec_net_monthly_income", "netMonthlyIncome");
			sql2BeanMap.put("@dec_tenor_year", "tenorYear");
			sql2BeanMap.put("@dec_existing_loan_amount", "existingLoanAmount");
			sql2BeanMap.put("@dec_interest_rate", "interestRate");
			sql2BeanMap.put("@dec_total_emi", "totalEMI");
			sql2BeanMap.put("@dec_monthly_installment", "monthlyInstallment");
			sql2BeanMap.put("@dec_disposable_income", "disposableIncome");
			sql2BeanMap.put("@tx_propose_emi_date", "proposeEMIDate");
			sql2BeanMap.put("@tx_duplications", "duplications");
			sql2BeanMap.put("@dtt_cib_generation_date", "cibGenerationDate");
			sql2BeanMap.put("@dec_allowed_dbr", "allowedDBR");
			sql2BeanMap.put("@tx_cib_status", "cibStatus");
			sql2BeanMap.put("@dec_proposed_dbr", "proposedDBR");
			sql2BeanMap.put("@dec_price_quotation_amount", "priceQuotationAmount");
			sql2BeanMap.put("@tx_bank_participation", "bankParticipation");
			sql2BeanMap.put("@dec_business_recommended_amnt", "businessRecommendedAmnt");
			sql2BeanMap.put("@dec_recommended_for_approval", "recommendedForApproval");
			sql2BeanMap.put("@int_top_up", "topUp");

			sql2BeanMap.put("@tx_account_no", "accountNo4Src");
			sql2BeanMap.put("@tx_bp_no", "bpNo4Src");
			sql2BeanMap.put("@tx_nid", "nid4Src");
			sql2BeanMap.put("@tx_phone", "phone4Src");
			sql2BeanMap.put("@tx_from_date", "fromDate4Src");
			sql2BeanMap.put("@tx_to_date", "toDate4Src");

			sql2BeanMap.put("@tx_security", "security");
			sql2BeanMap.put("@tx_guarantor_elibiblity", "guarantorElibiblity");
			sql2BeanMap.put("@tx_dob_of_pg_year", "dobOfPgYear");
			sql2BeanMap.put("@dtt_dob_of_pg", "dobOfPg");
			sql2BeanMap.put("@dec_remaining_amt_aft_eml", "remainingAmtAftEMI");
			sql2BeanMap.put("@dec_gross_salary_per_month", "grossSalaryPerMonth");
			sql2BeanMap.put("@tx_borrower_participation", "borrowerParticipation");
			sql2BeanMap.put("@id_legal_entity_key", "idLegalEntityKey");
			sql2BeanMap.put("@id_customer_ver", "idCustomerVer");
			sql2BeanMap.put("@tx_name_of_guarantor", "nameOfGuarantor");
			sql2BeanMap.put("@tx_relationship_with_applicant", "relationshipWithApplicant");
			sql2BeanMap.put("@tx_relationship_with_pg", "relationshipWithPg");
			sql2BeanMap.put("@tx_bp_no", "bpNo");
			sql2BeanMap.put("@tx_state_display_label", "stateDisplayLabel");
			sql2BeanMap.put("@tx_data_source", "dataSource");
			sql2BeanMap.put("@tx_loan_tracking_id", "loanTrackingId");
			sql2BeanMap.put("@tx_verification_email", "verificationEmail");
			sql2BeanMap.put("@int_permission", "permission");

			sql2BeanMap.put("@int_recommend_group_key", "recommendGroupId");
			sql2BeanMap.put("@int_recommend_to_key", "recommendToId");
			sql2BeanMap.put("@int_approved_by_key", "approvedById");
			sql2BeanMap.put("@tx_role_ids", "fromRoleIds");
			sql2BeanMap.put("@tx_staff_id", "staffId");
			sql2BeanMap.put("@tx_condition", "condition");
			sql2BeanMap.put("@tx_loan_type", "loanType");
			sql2BeanMap.put("@dtt_of_query", "dateOfQuery");
			sql2BeanMap.put("@tx_customer_type", "customerType");
			sql2BeanMap.put("@dtt_re_submit_date", "reSubmitDate");
			sql2BeanMap.put("@tx_loan_ids", "loanIds");
			sql2BeanMap.put("@int_sl_generate_cnt", "slGeneratCnt");
			sql2BeanMap.put("@tx_guarantor_nid", "guarantorNid");
			sql2BeanMap.put("@dec_gPF_amount", "gPFAmount");
			sql2BeanMap.put("@tx_creatorName", "creatorName");
			sql2BeanMap.put("@tx_sourcing_brc", "sourcingBrc");
			sql2BeanMap.put("@tx_loan_group_id", "loanGroupId");
			sql2BeanMap.put("@dtt_group_create", "dobOfGroupCreate");
			sql2BeanMap.put("@tx_mobile_guarantor", "mobileOfGuarantor");
			sql2BeanMap.put("@tx_customer_name", "customerName");			
			sql2BeanMap.put("@int_start_value", "startValue");
			sql2BeanMap.put("@int_limit_value", "limitValue");
			sql2BeanMap.put("@int_page_size", "pageSize");
			sql2BeanMap.put("@tx_cib_link", "cibLink");		
			sql2BeanMap.put("@tx_loan_id_list", "loanIdListStr");
			sql2BeanMap.put("@tx_cib_link", "cibLink");	
			sql2BeanMap.put("@tx_el_search_sate", "eLoanSearchState");
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

			rs2BeanMap.put("id_customer_key", "customerIdKey");

			rs2BeanMap.put("tx_application_no", "applicationNo");
			rs2BeanMap.put("tx_account_no", "accountNo");

			rs2BeanMap.put("id_loan_type_key", "idLoanTypeKey");
			rs2BeanMap.put("id_customer_type_key", "idCustomerTypeKey");

			rs2BeanMap.put("dec_applied_loan_amount", "appliedLoanAmount");
			rs2BeanMap.put("tx_loan_purpose", "purposeOfLoan");
			rs2BeanMap.put("int_over_loan", "overLoan");
			rs2BeanMap.put("dec_net_monthly_income", "netMonthlyIncome");
			rs2BeanMap.put("dec_tenor_year", "tenorYear");
			rs2BeanMap.put("dec_existing_loan_amount", "existingLoanAmount");
			rs2BeanMap.put("dec_interest_rate", "interestRate");
			rs2BeanMap.put("dec_total_emi", "totalEMI");
			rs2BeanMap.put("dec_monthly_installment", "monthlyInstallment");
			rs2BeanMap.put("dec_disposable_income", "disposableIncome");
			rs2BeanMap.put("tx_propose_emi_date", "proposeEMIDate");
			rs2BeanMap.put("tx_duplications", "duplications");
			rs2BeanMap.put("dtt_cib_generation_date", "cibGenerationDate");
			rs2BeanMap.put("dec_allowed_dbr", "allowedDBR");
			rs2BeanMap.put("tx_cib_status", "cibStatus");
			rs2BeanMap.put("dec_proposed_dbr", "proposedDBR");
			rs2BeanMap.put("dec_price_quotation_amount", "priceQuotationAmount");
			rs2BeanMap.put("tx_bank_participation", "bankParticipation");
			rs2BeanMap.put("dec_business_recommended_amnt", "businessRecommendedAmnt");
			rs2BeanMap.put("dec_recommended_for_approval", "recommendedForApproval");

			rs2BeanMap.put("tx_security", "security");
			rs2BeanMap.put("tx_guarantor_elibiblity", "guarantorElibiblity");
			rs2BeanMap.put("tx_dob_of_pg_year", "dobOfPgYear");
			rs2BeanMap.put("dtt_dob_of_pg", "dobOfPg");
			rs2BeanMap.put("dec_remaining_amt_aft_eml", "remainingAmtAftEMI");
			rs2BeanMap.put("dec_gross_salary_per_month", "grossSalaryPerMonth");
			rs2BeanMap.put("tx_dob_of_pg_year", "dobOfPgYear");
			rs2BeanMap.put("tx_borrower_participation", "borrowerParticipation");
			rs2BeanMap.put("id_legal_entity_key", "idLegalEntityKey");
			rs2BeanMap.put("id_customer_ver", "idCustomerVer");
			rs2BeanMap.put("tx_name_of_guarantor", "nameOfGuarantor");
			rs2BeanMap.put("tx_relationship_with_applicant", "relationshipWithApplicant");
			rs2BeanMap.put("tx_relationship_with_pg", "relationshipWithPg");
			// tx_display_text
			rs2BeanMap.put("tx_state_display_label", "stateDisplayLabel");
			rs2BeanMap.put("tx_data_source", "dataSource");
			rs2BeanMap.put("tx_loan_tracking_id", "loanTrackingId");
			rs2BeanMap.put("tx_verification_email", "verificationEmail");

			rs2BeanMap.put("int_locked", "locked");
			rs2BeanMap.put("int_permission", "permission");

			rs2BeanMap.put("int_recommend_group_key", "recommendGroupId");
			rs2BeanMap.put("int_recommend_to_key", "recommendToId");
			rs2BeanMap.put("int_approved_by_key", "approvedById");
			rs2BeanMap.put("tx_staff_id", "staffId");
			rs2BeanMap.put("tx_condition", "condition");
			rs2BeanMap.put("tx_loan_type", "loanType");
			rs2BeanMap.put("dtt_of_query", "dateOfQuery");
			rs2BeanMap.put("tx_customer_type", "customerType");
			rs2BeanMap.put("dtt_crm_received_date", "crmReceivedDate");
			rs2BeanMap.put("tx_input_by", "inputBy");
			rs2BeanMap.put("tx_cbs_user_id", "cbsUserId");
			rs2BeanMap.put("dtt_approved_date", "approvedDate");
			rs2BeanMap.put("dtt_sent_to_cad", "sentToCad");
			rs2BeanMap.put("tx_analyst", "analyst");
			rs2BeanMap.put("dtt_re_submit_date", "reSubmitDate");
			rs2BeanMap.put("dtt_return_to_source_date", "returnToSourceDate");
			rs2BeanMap.put("tx_analyst_comments", "analystComments");
			rs2BeanMap.put("tx_loan_current_status", "loanCurrentStatus");
			rs2BeanMap.put("int_sl_generate_cnt", "slGeneratCnt");
			rs2BeanMap.put("tx_user_name", "userName");
			rs2BeanMap.put("tx_designation", "designation");
			rs2BeanMap.put("tx_guarantor_nid", "guarantorNid");
			rs2BeanMap.put("dec_gPF_amount", "gPFAmount");
			rs2BeanMap.put("tx_loan_prefix", "loanPrefix");
			rs2BeanMap.put("tx_sourcing_brc", "sourcingBrc");
			rs2BeanMap.put("tx_loan_group_id", "loanGroupId");
			rs2BeanMap.put("dtt_group_create", "dobOfGroupCreate");
			rs2BeanMap.put("tx_mobile_guarantor", "mobileOfGuarantor");
			rs2BeanMap.put("tx_deputy_ho_crm", "deputyHoCRM");
			rs2BeanMap.put("int_top_up", "topUp");
			rs2BeanMap.put("tx_account_no", "accountNo");
			rs2BeanMap.put("tx_cib_link", "cibLink");
			rs2BeanMap.put("int_duplicate_count_same_bp", "duplicationCheckSameBp");
			rs2BeanMap.put("tx_bp_no", "bpNo");
			rs2BeanMap.put("tx_sms_status", "smsStatus");
		}
		return rs2BeanMap;
	}

	public Double getgPFAmount() {
		return gPFAmount;
	}

	public void setgPFAmount(Double gPFAmount) {
		this.gPFAmount = gPFAmount;
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

	public Integer getOverLoan() {
		return overLoan;
	}

	public void setOverLoan(Integer overLoan) {
		this.overLoan = overLoan;
	}

	public Double getNetMonthlyIncome() {
		return netMonthlyIncome;
	}

	public void setNetMonthlyIncome(Double netMonthlyIncome) {
		this.netMonthlyIncome = netMonthlyIncome;
	}

	public Double getTenorYear() {
		return tenorYear;
	}

	public void setTenorYear(Double tenorYear) {
		this.tenorYear = tenorYear;
	}

	public Double getExistingLoanAmount() {
		return existingLoanAmount;
	}

	public void setExistingLoanAmount(Double existingLoanAmount) {
		this.existingLoanAmount = existingLoanAmount;
	}

	public Double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(Double interestRate) {
		this.interestRate = interestRate;
	}

	public Double getTotalEMI() {
		return totalEMI;
	}

	public void setTotalEMI(Double totalEMI) {
		this.totalEMI = totalEMI;
	}

	public Double getMonthlyInstallment() {
		return monthlyInstallment;
	}

	public void setMonthlyInstallment(Double monthlyInstallment) {
		this.monthlyInstallment = monthlyInstallment;
	}

	public Double getDisposableIncome() {
		return disposableIncome;
	}

	public void setDisposableIncome(Double disposableIncome) {
		this.disposableIncome = disposableIncome;
	}

	public String getProposeEMIDate() {
		return proposeEMIDate;
	}

	public void setProposeEMIDate(String proposeEMIDate) {
		this.proposeEMIDate = proposeEMIDate;
	}

	public String getDuplications() {
		return duplications;
	}

	public void setDuplications(String duplications) {
		this.duplications = duplications;
	}

	public Date getCibGenerationDate() {
		return cibGenerationDate;
	}

	public void setCibGenerationDate(Date cibGenerationDate) {
		this.cibGenerationDate = cibGenerationDate;
	}

	public Double getAllowedDBR() {
		return allowedDBR;
	}

	public void setAllowedDBR(Double allowedDBR) {
		this.allowedDBR = allowedDBR;
	}

	public String getCibStatus() {
		return cibStatus;
	}

	public void setCibStatus(String cibStatus) {
		this.cibStatus = cibStatus;
	}

	public Double getProposedDBR() {
		return proposedDBR;
	}

	public void setProposedDBR(Double proposedDBR) {
		this.proposedDBR = proposedDBR;
	}

	public Double getPriceQuotationAmount() {
		return priceQuotationAmount;
	}

	public void setPriceQuotationAmount(Double priceQuotationAmount) {
		this.priceQuotationAmount = priceQuotationAmount;
	}

	public String getBankParticipation() {
		return bankParticipation;
	}

	public void setBankParticipation(String bankParticipation) {
		this.bankParticipation = bankParticipation;
	}

	public Integer getCustomerIdKey() {
		return customerIdKey;
	}

	public void setCustomerIdKey(Integer customerIdKey) {
		this.customerIdKey = customerIdKey;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
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

	public List<ExistingLiability> getExistingLiabilityList() {
		return existingLiabilityList;
	}

	public void setExistingLiabilityList(List<ExistingLiability> existingLiabilityList) {
		this.existingLiabilityList = existingLiabilityList;
	}

	public List<Comment> getCibStatusList() {
		return cibStatusList;
	}

	public void setCibStatusList(List<Comment> cibStatusList) {
		this.cibStatusList = cibStatusList;
	}

	public List<Comment> getAnalystsCommentsList() {
		return analystsCommentsList;
	}

	public void setAnalystsCommentsList(List<Comment> analystsCommentsList) {
		this.analystsCommentsList = analystsCommentsList;
	}

	public List<Comment> getExceptionDetailsList() {
		return exceptionDetailsList;
	}

	public void setExceptionDetailsList(List<Comment> exceptionDetailsList) {
		this.exceptionDetailsList = exceptionDetailsList;
	}

	public List<Comment> getInstructionToCadList() {
		return instructionToCadList;
	}

	public void setInstructionToCadList(List<Comment> instructionToCadList) {
		this.instructionToCadList = instructionToCadList;
	}

	public Double getBusinessRecommendedAmnt() {
		return businessRecommendedAmnt;
	}

	public void setBusinessRecommendedAmnt(Double businessRecommendedAmnt) {
		this.businessRecommendedAmnt = businessRecommendedAmnt;
	}

	public Double getRecommendedForApproval() {
		return recommendedForApproval;
	}

	public void setRecommendedForApproval(Double recommendedForApproval) {
		this.recommendedForApproval = recommendedForApproval;
	}

	public String getAccountNo4Src() {
		return accountNo4Src;
	}

	public void setAccountNo4Src(String accountNo4Src) {
		this.accountNo4Src = accountNo4Src;
	}

	public String getBpNo4Src() {
		return bpNo4Src;
	}

	public void setBpNo4Src(String bpNo4Src) {
		this.bpNo4Src = bpNo4Src;
	}

	public String getNid4Src() {
		return nid4Src;
	}

	public void setNid4Src(String nid4Src) {
		this.nid4Src = nid4Src;
	}

	public String getPhone4Src() {
		return phone4Src;
	}

	public void setPhone4Src(String phone4Src) {
		this.phone4Src = phone4Src;
	}

	public String getFromDate4Src() {
		return fromDate4Src;
	}

	public void setFromDate4Src(String fromDate4Src) {
		this.fromDate4Src = fromDate4Src;
	}

	public String getToDate4Src() {
		return toDate4Src;
	}

	public void setToDate4Src(String toDate4Src) {
		this.toDate4Src = toDate4Src;
	}

	public String getSecurity() {
		return security;
	}

	public void setSecurity(String security) {
		this.security = security;
	}

	public String getGuarantorElibiblity() {
		return guarantorElibiblity;
	}

	public void setGuarantorElibiblity(String guarantorElibiblity) {
		this.guarantorElibiblity = guarantorElibiblity;
	}

	public Date getDobOfPg() {
		return dobOfPg;
	}

	public void setDobOfPg(Date dobOfPg) {
		this.dobOfPg = dobOfPg;
	}

	public Double getRemainingAmtAftEMI() {
		return remainingAmtAftEMI;
	}

	public void setRemainingAmtAftEMI(Double remainingAmtAftEMI) {
		this.remainingAmtAftEMI = remainingAmtAftEMI;
	}

	public Double getGrossSalaryPerMonth() {
		return grossSalaryPerMonth;
	}

	public void setGrossSalaryPerMonth(Double grossSalaryPerMonth) {
		this.grossSalaryPerMonth = grossSalaryPerMonth;
	}

	public String getDobOfPgYear() {
		return dobOfPgYear;
	}

	public void setDobOfPgYear(String dobOfPgYear) {
		this.dobOfPgYear = dobOfPgYear;
	}

	public List<Comment> getCmntJustificationList() {
		return cmntJustificationList;
	}

	public void setCmntJustificationList(List<Comment> cmntJustificationList) {
		this.cmntJustificationList = cmntJustificationList;
	}

	public List<Comment> getSourceRecmndList() {
		return sourceRecmndList;
	}

	public void setSourceRecmndList(List<Comment> sourceRecmndList) {
		this.sourceRecmndList = sourceRecmndList;
	}

	public List<Comment> getBranchRecmndList() {
		return branchRecmndList;
	}

	public void setBranchRecmndList(List<Comment> branchRecmndList) {
		this.branchRecmndList = branchRecmndList;
	}

	public String getBorrowerParticipation() {
		return borrowerParticipation;
	}

	public void setBorrowerParticipation(String borrowerParticipation) {
		this.borrowerParticipation = borrowerParticipation;
	}

	public Integer getIdLegalEntityKey() {
		return idLegalEntityKey;
	}

	public void setIdLegalEntityKey(Integer idLegalEntityKey) {
		this.idLegalEntityKey = idLegalEntityKey;
	}

	public Integer getIdCustomerVer() {
		return idCustomerVer;
	}

	public void setIdCustomerVer(Integer idCustomerVer) {
		this.idCustomerVer = idCustomerVer;
	}

	public List<LoanDocument> getLoanDocumentList() {
		return loanDocumentList;
	}

	public void setLoanDocumentList(List<LoanDocument> loanDocumentList) {
		this.loanDocumentList = loanDocumentList;
	}

	public String getNameOfGuarantor() {
		return nameOfGuarantor;
	}

	public void setNameOfGuarantor(String nameOfGuarantor) {
		this.nameOfGuarantor = nameOfGuarantor;
	}

	public String getRelationshipWithApplicant() {
		return relationshipWithApplicant;
	}

	public void setRelationshipWithApplicant(String relationshipWithApplicant) {
		this.relationshipWithApplicant = relationshipWithApplicant;
	}

	public String getUiActionName() {
		return uiActionName;
	}

	public void setUiActionName(String uiActionName) {
		this.uiActionName = uiActionName;
	}

	public String getBpNo() {
		return bpNo;
	}

	public void setBpNo(String bpNo) {
		this.bpNo = bpNo;
	}

	public String getDataSource() {
		return dataSource;
	}

	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}

	public String getStateDisplayLabel() {
		return stateDisplayLabel;
	}

	public void setStateDisplayLabel(String stateDisplayLabel) {
		this.stateDisplayLabel = stateDisplayLabel;
	}

	public String getLoanTrackingId() {
		return loanTrackingId;
	}

	public void setLoanTrackingId(String loanTrackingId) {
		this.loanTrackingId = loanTrackingId;
	}

	public String getVerificationEmail() {
		return verificationEmail;
	}

	public void setVerificationEmail(String verificationEmail) {
		this.verificationEmail = verificationEmail;
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

	public List<Comment> getCmntWaiverSoughtList() {
		return cmntWaiverSoughtList;
	}

	public void setCmntWaiverSoughtList(List<Comment> cmntWaiverSoughtList) {
		this.cmntWaiverSoughtList = cmntWaiverSoughtList;
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

	public List<Comment> getCommentList() {
		return commentList;
	}

	public void setCommentList(List<Comment> commentList) {
		this.commentList = commentList;
	}

	public List<LoanConfig> getLoanConfigList() {
		return loanConfigList;
	}

	public void setLoanConfigList(List<LoanConfig> loanConfigList) {
		this.loanConfigList = loanConfigList;
	}

	public List<Loan> getRmOrUhManagerList() {
		return rmOrUhManagerList;
	}

	public void setRmOrUhManagerList(List<Loan> rmOrUhManagerList) {
		this.rmOrUhManagerList = rmOrUhManagerList;
	}

	public String getFromRoleIds() {
		return fromRoleIds;
	}

	public void setFromRoleIds(String fromRoleIds) {
		this.fromRoleIds = fromRoleIds;
	}

	public List<LoanDocument> getLoanDocListForCibStatus() {
		return loanDocListForCibStatus;
	}

	public void setLoanDocListForCibStatus(List<LoanDocument> loanDocListForCibStatus) {
		this.loanDocListForCibStatus = loanDocListForCibStatus;
	}

	public String getRelationshipWithPg() {
		return relationshipWithPg;
	}

	public void setRelationshipWithPg(String relationshipWithPg) {
		this.relationshipWithPg = relationshipWithPg;
	}

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}

	public String getLoanType() {
		return loanType;
	}

	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}

	@Override
	public String toString() {
		return "Loan [customer=" + customer + ", existingLiabilityList=" + existingLiabilityList + ", cibStatusList=" + cibStatusList
		        + ", analystsCommentsList=" + analystsCommentsList + ", exceptionDetailsList=" + exceptionDetailsList + ", instructionToCadList="
		        + instructionToCadList + ", cmntJustificationList=" + cmntJustificationList + ", cmntWaiverSoughtList=" + cmntWaiverSoughtList
		        + ", sourceRecmndList=" + sourceRecmndList + ", branchRecmndList=" + branchRecmndList + ", commentList=" + commentList
		        + ", loanDocumentList=" + loanDocumentList + ", loanDocListForCibStatus=" + loanDocListForCibStatus + ", loanConfigList="
		        + loanConfigList + ", rmOrUhManagerList=" + rmOrUhManagerList + ", loanId=" + loanId + ", loanVer=" + loanVer + ", customerIdKey="
		        + customerIdKey + ", applicationNo=" + applicationNo + ", idLoanTypeKey=" + idLoanTypeKey + ", idCustomerTypeKey=" + idCustomerTypeKey
		        + ", appliedLoanAmount=" + appliedLoanAmount + ", purposeOfLoan=" + purposeOfLoan + ", overLoan=" + overLoan + ", netMonthlyIncome="
		        + netMonthlyIncome + ", tenorYear=" + tenorYear + ", existingLoanAmount=" + existingLoanAmount + ", interestRate=" + interestRate
		        + ", totalEMI=" + totalEMI + ", monthlyInstallment=" + monthlyInstallment + ", disposableIncome=" + disposableIncome
		        + ", proposeEMIDate=" + proposeEMIDate + ", duplications=" + duplications + ", cibGenerationDate=" + cibGenerationDate
		        + ", allowedDBR=" + allowedDBR + ", cibStatus=" + cibStatus + ", proposedDBR=" + proposedDBR + ", priceQuotationAmount="
		        + priceQuotationAmount + ", bankParticipation=" + bankParticipation + ", security=" + security + ", guarantorElibiblity="
		        + guarantorElibiblity + ", dobOfPg=" + dobOfPg + ", remainingAmtAftEMI=" + remainingAmtAftEMI + ", grossSalaryPerMonth="
		        + grossSalaryPerMonth + ", dobOfPgYear=" + dobOfPgYear + ", borrowerParticipation=" + borrowerParticipation + ", idLegalEntityKey="
		        + idLegalEntityKey + ", idCustomerVer=" + idCustomerVer + ", nameOfGuarantor=" + nameOfGuarantor + ", relationshipWithApplicant="
		        + relationshipWithApplicant + ", dataSource=" + dataSource + ", businessRecommendedAmnt=" + businessRecommendedAmnt
		        + ", recommendedForApproval=" + recommendedForApproval + ", accountNo4Src=" + accountNo4Src + ", bpNo4Src=" + bpNo4Src + ", nid4Src="
		        + nid4Src + ", phone4Src=" + phone4Src + ", fromDate4Src=" + fromDate4Src + ", toDate4Src=" + toDate4Src + ", uiActionName="
		        + uiActionName + ", bpNo=" + bpNo + ", stateDisplayLabel=" + stateDisplayLabel + ", loanTrackingId=" + loanTrackingId
		        + ", verificationEmail=" + verificationEmail + ", locked=" + locked + ", permission=" + permission + ", recommendGroupId="
		        + recommendGroupId + ", recommendToId=" + recommendToId + ", approvedById=" + approvedById + ", fromRoleIds=" + fromRoleIds
		        + ", loanType=" + loanType + "]";
	}

	public String getCondition() {
		return condition;
	}

	public void setCondition(String condition) {
		this.condition = condition;
	}

	public boolean isFieldOfficer() {
		return isFieldOfficer;
	}

	public void setFieldOfficer(boolean isFieldOfficer) {
		this.isFieldOfficer = isFieldOfficer;
	}

	public String getDateOfQuery() {
		return dateOfQuery;
	}

	public void setDateOfQuery(String dateOfQuery) {
		this.dateOfQuery = dateOfQuery;
	}

	public String getCustomerType() {
		return customerType;
	}

	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}

	public String getInputBy() {
		return inputBy;
	}

	public void setInputBy(String inputBy) {
		this.inputBy = inputBy;
	}

	public Date getCrmReceivedDate() {
		return crmReceivedDate;
	}

	public void setCrmReceivedDate(Date crmReceivedDate) {
		this.crmReceivedDate = crmReceivedDate;
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

	public Date getSentToCad() {
		return sentToCad;
	}

	public void setSentToCad(Date sentToCad) {
		this.sentToCad = sentToCad;
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

	public String getLoanCurrentStatus() {
		return loanCurrentStatus;
	}

	public void setLoanCurrentStatus(String loanCurrentStatus) {
		this.loanCurrentStatus = loanCurrentStatus;
	}

	public String getLoanIds() {
		return loanIds;
	}

	public void setLoanIds(String loanIds) {
		this.loanIds = loanIds;
	}

	public Integer getSlGeneratCnt() {
		return slGeneratCnt;
	}

	public void setSlGeneratCnt(Integer slGeneratCnt) {
		this.slGeneratCnt = slGeneratCnt;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getGuarantorNid() {
		return guarantorNid;
	}

	public void setGuarantorNid(String guarantorNid) {
		this.guarantorNid = guarantorNid;
	}

	public String getLoanPrefix() {
		return loanPrefix;
	}

	public void setLoanPrefix(String loanPrefix) {
		this.loanPrefix = loanPrefix;
	}

	public String getSourcingBrc() {
		return sourcingBrc;
	}

	public void setSourcingBrc(String sourcingBrc) {
		this.sourcingBrc = sourcingBrc;
	}

	public List<Integer> getLoanIdList() {
		return loanIdList;
	}

	public void setLoanIdList(List<Integer> loanIdList) {
		this.loanIdList = loanIdList;
	}

	public String getLoanGroupId() {
		return loanGroupId;
	}

	public void setLoanGroupId(String loanGroupId) {
		this.loanGroupId = loanGroupId;
	}

	public List<Loan> getLoanList() {
		return loanList;
	}

	public void setLoanList(List<Loan> loanList) {
		this.loanList = loanList;
	}

	public String getDobOfGroupCreate() {
		return dobOfGroupCreate;
	}

	public void setDobOfGroupCreate(String dobOfGroupCreate) {
		this.dobOfGroupCreate = dobOfGroupCreate;
	}

	public String getMobileOfGuarantor() {
		return mobileOfGuarantor;
	}

	public void setMobileOfGuarantor(String mobileOfGuarantor) {
		this.mobileOfGuarantor = mobileOfGuarantor;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getDeputyHoCRM() {
		return deputyHoCRM;
	}

	public void setDeputyHoCRM(String deputyHoCRM) {
		this.deputyHoCRM = deputyHoCRM;
	}

	public Integer getTopUp() {
		return topUp;
	}

	public void setTopUp(Integer topUp) {
		this.topUp = topUp;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public Integer getStartValue() {
		return startValue;
	}

	public void setStartValue(Integer startValue) {
		this.startValue = startValue;
	}

	public Integer getLimitValue() {
		return limitValue;
	}

	public void setLimitValue(Integer limitValue) {
		this.limitValue = limitValue;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
		
	public String geteLoanSearchState() {
		return eLoanSearchState;
	}

	public void seteLoanSearchState(String eLoanSearchState) {
		this.eLoanSearchState = eLoanSearchState;
	}

	public String getCibLink() {
		return cibLink;
	}

	public void setCibLink(String cibLink) {
		this.cibLink = cibLink;
	}

	public Integer getDuplicationCheckSameBp() {
		return duplicationCheckSameBp;
	}

	public void setDuplicationCheckSameBp(Integer duplicationCheckSameBp) {
		this.duplicationCheckSameBp = duplicationCheckSameBp;
	}

	public String getLoanIdListStr() {
		return loanIdListStr;
	}

	public void setLoanIdListStr(String loanIdListStr) {
		this.loanIdListStr = loanIdListStr;
	}

	public String getSmsStatus() {
		return smsStatus;
	}

	public void setSmsStatus(String smsStatus) {
		this.smsStatus = smsStatus;
	}	
	
}
