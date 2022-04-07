package com.naztech.lms.creditCard.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.naztech.lms.model.BaseModel;
import com.naztech.lms.model.Comment;
import com.naztech.lms.model.Customer;
import com.naztech.lms.model.ExistingLiability;

public class CreditCard extends BaseModel {

	private Customer customer;
	private Integer customerIdKey;
	private Integer idCustomerVer;
	List<Document> cardDocumentList;
	List<ExistingLiability> existingLiabilityList;
	List<Comment> cibStatusList;
	List<Comment> analystsCommentsList;
	List<Comment> exceptionDetailsList;
	List<Comment> instructionToCadList;

	List<Comment> cmntJustificationList;
	List<Comment> cmntDeivationList;
	List<Comment> sourceRecmndList;
	List<Comment> branchRecmndList;

	List<Comment> commentList;
	List<Document> cardDocListForCibStatus;
	

	private Integer creditCardId;
	private Integer creditCardVer;
	private Integer cardTypeKey;
	private Integer idCustomerTypeKey;
	private Integer ccTrackingNumber;
	private Double additionalIncomeAmount;
	private Double afterCbblEmi;
	private Double allowedMuiltiplier;
	private Double amoutDepositeCbbl;
	private Double applicantAskingLimit;
	private Double appliedCardMinBill;
	private Double appliedAmount;
	private Double approvedLimit;
	private String autoDebitAmount;
	private Double autoDebitReqMinAmount;
	private Double balanceTransferRequestAmount;;
	private Double cardProposedLimit;
	private Double disposableIncome;
	private Double existingLoanEmi;
	private Double interestRate;
	private Double maxAllowdLimit;
	private Double maximumAllowedDbr;
	private Double minimumPayment;
	private Double preApprovedLimit;
	private Double preApprovedLimitLower;
	private Double preApprovedLimitedUpper;
	private Double preApprovedLimitRange;
	private Double proposedDbr;
	private Double remainingAmountAfterPaidEmi;
	private Double remainingEmi;
	private Double salaryDepositedLastMonth;
	private Double totalEmi;
	private Double totalEmiPaidInCbbl;
	private Double totalIncome;
	private Double recommendForApproval;
	private String cardDeliveryFrom;
	private Date cibGeneration;
	private String proposedBillingDate;
	private String accountNo;
	private String additionalIncomeSource;
	private String applicationNumber;
	private String autoDebitReqFullOutstanding;
	private String autoDebitReqMinimumAmount;
	private String btCreditCardOutstanding;
	private String cardDuplicationReason;
	private String cardDuplicationResult;
	private String cardMonthlyBilDebitedFrom;
	private String cardSecurityType;
	private String cibStatus;
	private String currentTypeBasedOnCardNature;
	private String dataSource;
	private String declaration;
	private String duplications;
	private String gpfLoan;
	private String individualDeclaration;
	private String kycLevel;
	private String loanToValue;
	private String maximumAllowedMultiplier;
	private Double netMonthlyIncome;
	private String ofacSanctionReason;
	private String ofacSanctionResult;
	private String sourceBrance;
	private String sourceCSE;
	private String sourceSelfApplication;
	private String sourceOthers;
	private String sourceFrom;
	private String staffId;
	private String sourcingBranch;
	private String unSanctionReason;
	private String unSanctionResult;
	private String valueOfSecurity;
	private Integer idLegalEntityKey;
	private String uiActionName;
	private String fromRoleIds;
	private String duplicationAreas;
	private String cibReportStatusList;

	private String cardGroupId;
	private String cardGroupCreator;
	private Integer inGroup;
	private String dobOfGroupCreate;
	private String creditCardType;
	private String nameOfCard;
	private String	referenceName;	
	private String	relationShipWithApplicant;	
	private String	referProfesion;	
	private String	referenceNameOfOrganization;	
	private String	referenceDesignation;	
	private String	referenceWorkAndResidenceAddress;	
	private String  referenceTelephone;	
	private String  referenceMobile;	
	private String  referenceEmail;
	List<Integer> cardIdList;

	// search properties
	private String accountNo4Src;
	private String bpNo4Src;
	private String nid4Src;
	private String phone4Src;
	private String fromDate4Src;
	private String toDate4Src;
	private String customerName;
	private String concerBankName;
	private String btRequest;
	private String hoCrmComment;
	private String cadComment;
	private String currentUserRoleName;
	private String custDesignation;
	private String tin4Src;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_credit_card_key", "creditCardId");
			sql2BeanMap.put("@id_credit_card_ver", "creditCardVer");
			sql2BeanMap.put("@id_customer_key", "customerIdKey");
			sql2BeanMap.put("@id_card_type_key", "cardTypeKey");
			sql2BeanMap.put("@tx_data_source", "dataSource");
			sql2BeanMap.put("@id_customer_type_key", "idCustomerTypeKey");
			sql2BeanMap.put("@tx_account_no", "accountNo");
			sql2BeanMap.put("@tx_sourcing_staff_id", "staffId");
			sql2BeanMap.put("@tx_source_branch", "sourceBrance");
			sql2BeanMap.put("@tx_source_cse", "sourceCSE");
			sql2BeanMap.put("@tx_source_self_application", "sourceSelfApplication");
			sql2BeanMap.put("@tx_source_others", "sourceOthers");
			sql2BeanMap.put("@int_cc_tracking_number", "ccTrackingNumber");
			sql2BeanMap.put("@tx_application_number", "applicationNumber");
			sql2BeanMap.put("@tx_source_from", "sourceFrom");
			sql2BeanMap.put("@tx_card_monthly_bil_debited_from", "cardMonthlyBilDebitedFrom");
			sql2BeanMap.put("@dec_salary_deposited_last_month", "salaryDepositedLastMonth");
			sql2BeanMap.put("@dec_additional_income_amount", "additionalIncomeAmount");
			sql2BeanMap.put("@dec_after_cbbl_emi", "afterCbblEmi");
			sql2BeanMap.put("@dec_total_income", "totalIncome");
			sql2BeanMap.put("@dec_recommend_for_approval", "recommendForApproval");
			sql2BeanMap.put("@dec_total_emi_paid_in_cbbl", "totalEmiPaidInCbbl");
			sql2BeanMap.put("@dec_remaining_emi", "remainingEmi");
			sql2BeanMap.put("@tx_additional_income_source", "additionalIncomeSource");
			sql2BeanMap.put("@tx_value_of_security", "valueOfSecurity");
			sql2BeanMap.put("@tx_loan_to_value", "loanToValue");
			sql2BeanMap.put("@tx_gpf_loan", "gpfLoan");
			sql2BeanMap.put("@dec_pre_approved_limit_lower", "preApprovedLimitLower");
			sql2BeanMap.put("@dec_pre_approved_limit", "preApprovedLimit");
			sql2BeanMap.put("@dec_pre_approved_limited_upper", "preApprovedLimitedUpper");
			sql2BeanMap.put("@dec_pre_approved_limit_range", "preApprovedLimitRange");
			sql2BeanMap.put("@dec_applied_card_min_bill", "appliedCardMinBill");
			sql2BeanMap.put("@dec_applied_amount", "appliedAmount");
			sql2BeanMap.put("@tx_individual_declaration", "individualDeclaration");
			sql2BeanMap.put("@tx_card_delivery_from", "cardDeliveryFrom");
			sql2BeanMap.put("@tx_declaration", "declaration");
			sql2BeanMap.put("@dec_auto_debit_req_min_amount", "autoDebitReqMinAmount");
			sql2BeanMap.put("@tx_auto_debit_req_full_outstanding", "autoDebitReqFullOutstanding");
			sql2BeanMap.put("@tx_auto_debit_req_minimum_amount", "autoDebitReqMinimumAmount");
			sql2BeanMap.put("@tx_card_duplication_result", "cardDuplicationResult");
			sql2BeanMap.put("@tx_card_duplication_reason", "cardDuplicationReason");
			sql2BeanMap.put("@tx_un_sanction_result", "unSanctionResult");
			sql2BeanMap.put("@tx_un_sanction_reason", "unSanctionReason");
			sql2BeanMap.put("@tx_ofac_sanction_result", "ofacSanctionResult");
			sql2BeanMap.put("@tx_ofac_sanction_reason", "ofacSanctionReason");
			sql2BeanMap.put("@dec_applicant_asking_limit", "applicantAskingLimit");
			sql2BeanMap.put("@dec_max_allowd_limit", "maxAllowdLimit");
			sql2BeanMap.put("@dec_approved_limit", "approvedLimit");
			sql2BeanMap.put("@dec_balance_transfer_request_amount", "balanceTransferRequestAmount");
			sql2BeanMap.put("@dec_card_proposed_limit", "cardProposedLimit");
			sql2BeanMap.put("@tx_proposed_billing_date", "proposedBillingDate");
			sql2BeanMap.put("@dec_minimum_payment", "minimumPayment");
			sql2BeanMap.put("@tx_bt_credit_card_outstanding", "btCreditCardOutstanding");
			sql2BeanMap.put("@tx_kyc_level", "kycLevel");
			sql2BeanMap.put("@tx_auto_debit_amount", "autoDebitAmount");
			sql2BeanMap.put("@dec_interest_rate", "interestRate");
			sql2BeanMap.put("@dt_cib_generation", "cibGeneration");
			sql2BeanMap.put("@tx_cib_status", "cibStatus");
			sql2BeanMap.put("@dec_proposed_dbr", "proposedDbr");
			sql2BeanMap.put("@dec_net_monthly_income", "netMonthlyIncome");
			sql2BeanMap.put("@tx_current_type_based_on_card_nature", "currentTypeBasedOnCardNature");
			sql2BeanMap.put("@tx_card_security_type", "cardSecurityType");
			sql2BeanMap.put("@dec_allowed_muiltiplier", "allowedMuiltiplier");
			sql2BeanMap.put("@dec_amout_deposite_cbbl", "amoutDepositeCbbl");
			sql2BeanMap.put("@dec_remaining_amount_after_paid_emi", "remainingAmountAfterPaidEmi");
			sql2BeanMap.put("@dec_disposable_income", "disposableIncome");
			sql2BeanMap.put("@dec_existing_loan_emi", "existingLoanEmi");
			sql2BeanMap.put("@dec_total_emi", "totalEmi");
			sql2BeanMap.put("@tx_duplications", "duplications");
			sql2BeanMap.put("@tx_maximum_allowed_multiplier", "maximumAllowedMultiplier");
			sql2BeanMap.put("@dec_maximum_allowed_dbr", "maximumAllowedDbr");
			sql2BeanMap.put("@tx_concer_bank_name", "concerBankName");
			sql2BeanMap.put("@tx_bt_request", "btRequest");
			sql2BeanMap.put("@tx_ui_action_name", "uiActionName");
			sql2BeanMap.put("@tx_role_ids", "fromRoleIds");
			sql2BeanMap.put("@tx_card_group_id", "cardGroupId");
			sql2BeanMap.put("@int_in_group", "inGroup");
			sql2BeanMap.put("@dtt_group_create", "dobOfGroupCreate");
			sql2BeanMap.put("@tx_sourcing_branch", "sourcingBranch");
			sql2BeanMap.put("@tx_duplication_areas", "duplicationAreas");
			sql2BeanMap.put("@tx_tin", "tin4Src");
			sql2BeanMap.put("@tx_cib_report_status_list", "cibReportStatusList");
			sql2BeanMap.put("@tx_account_no", "accountNo4Src");
			sql2BeanMap.put("@tx_bp_no", "bpNo4Src");
			sql2BeanMap.put("@tx_nid", "nid4Src");
			sql2BeanMap.put("@tx_phone", "phone4Src");
			sql2BeanMap.put("@tx_from_date", "fromDate4Src");
			sql2BeanMap.put("@tx_to_date", "toDate4Src");
			sql2BeanMap.put("@tx_customer_name", "customerName");
			sql2BeanMap.put("@id_legal_entity_key", "idLegalEntityKey");
			sql2BeanMap.put("@tx_ho_crm_comment", "hoCrmComment");
			sql2BeanMap.put("@tx_cad_comment", "cadComment");
			sql2BeanMap.put("@tx_value2", "currentUserRoleName");
			sql2BeanMap.put("@tx_name_of_card", "nameOfCard");			
			sql2BeanMap.put("@tx_reference_name","referenceName");			
			sql2BeanMap.put("@tx_relationship_with_applicant","relationShipWithApplicant");			
			sql2BeanMap.put("@tx_reference_profesion","referProfesion");			
			sql2BeanMap.put("@tx_reference_name_of_organization","referenceNameOfOrganization");			
			sql2BeanMap.put("@tx_reference_designation","referenceDesignation");			
			sql2BeanMap.put("@tx_reference_work_and_residence_address","referenceWorkAndResidenceAddress");			
			sql2BeanMap.put("@tx_reference_telephone","referenceTelephone");			
			sql2BeanMap.put("@tx_reference_mobile","referenceMobile");			
			sql2BeanMap.put("@tx_reference_email","referenceEmail");
		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_credit_card_key", "creditCardId");
			rs2BeanMap.put("id_credit_card_ver", "creditCardVer");
			rs2BeanMap.put("id_customer_key", "customerIdKey");
			rs2BeanMap.put("id_card_type_key", "cardTypeKey");
			rs2BeanMap.put("id_customer_type_key", "idCustomerTypeKey");
			rs2BeanMap.put("tx_data_source", "dataSource");
			rs2BeanMap.put("tx_account_no", "accountNo");
			rs2BeanMap.put("tx_sourcing_staff_id", "staffId");
			rs2BeanMap.put("tx_source_branch", "sourceBrance");
			rs2BeanMap.put("tx_source_cse", "sourceCSE");
			rs2BeanMap.put("tx_source_self_application", "sourceSelfApplication");
			rs2BeanMap.put("tx_source_others", "sourceOthers");
			rs2BeanMap.put("int_cc_tracking_number", "ccTrackingNumber");
			rs2BeanMap.put("tx_application_number", "applicationNumber");
			rs2BeanMap.put("tx_source_from", "sourceFrom");
			rs2BeanMap.put("tx_card_monthly_bil_debited_from", "cardMonthlyBilDebitedFrom");
			rs2BeanMap.put("dec_salary_deposited_last_month", "salaryDepositedLastMonth");
			rs2BeanMap.put("dec_additional_income_amount", "additionalIncomeAmount");
			rs2BeanMap.put("dec_after_cbbl_emi", "afterCbblEmi");
			rs2BeanMap.put("dec_total_income", "totalIncome");
			rs2BeanMap.put("dec_recommend_for_approval", "recommendForApproval");
			rs2BeanMap.put("dec_total_emi_paid_in_cbbl", "totalEmiPaidInCbbl");
			rs2BeanMap.put("dec_remaining_emi", "remainingEmi");
			rs2BeanMap.put("tx_additional_income_source", "additionalIncomeSource");
			rs2BeanMap.put("tx_value_of_security", "valueOfSecurity");
			rs2BeanMap.put("tx_loan_to_value", "loanToValue");
			rs2BeanMap.put("tx_gpf_loan", "gpfLoan");
			rs2BeanMap.put("dec_pre_approved_limit_lower", "preApprovedLimitLower");
			rs2BeanMap.put("dec_pre_approved_limit", "preApprovedLimit");
			rs2BeanMap.put("dec_pre_approved_limited_upper", "preApprovedLimitedUpper");
			rs2BeanMap.put("dec_pre_approved_limit_range", "preApprovedLimitRange");
			rs2BeanMap.put("dec_applied_card_min_bill", "appliedCardMinBill");
			rs2BeanMap.put("dec_applied_amount", "appliedAmount");
			rs2BeanMap.put("tx_individual_declaration", "individualDeclaration");
			rs2BeanMap.put("tx_card_delivery_from", "cardDeliveryFrom");
			rs2BeanMap.put("tx_declaration", "declaration");
			rs2BeanMap.put("dec_auto_debit_req_min_amount", "autoDebitReqMinAmount");
			rs2BeanMap.put("tx_auto_debit_req_full_outstanding", "autoDebitReqFullOutstanding");
			rs2BeanMap.put("tx_auto_debit_req_minimum_amount", "autoDebitReqMinimumAmount");
			rs2BeanMap.put("tx_card_duplication_result", "cardDuplicationResult");
			rs2BeanMap.put("tx_card_duplication_reason", "cardDuplicationReason");
			rs2BeanMap.put("tx_un_sanction_result", "unSanctionResult");
			rs2BeanMap.put("tx_un_sanction_reason", "unSanctionReason");
			rs2BeanMap.put("tx_ofac_sanction_result", "ofacSanctionResult");
			rs2BeanMap.put("tx_ofac_sanction_reason", "ofacSanctionReason");
			rs2BeanMap.put("dec_applicant_asking_limit", "applicantAskingLimit");
			rs2BeanMap.put("dec_max_allowd_limit", "maxAllowdLimit");
			rs2BeanMap.put("dec_approved_limit", "approvedLimit");
			rs2BeanMap.put("dec_balance_transfer_request_amount", "balanceTransferRequestAmount");
			rs2BeanMap.put("dec_card_proposed_limit", "cardProposedLimit");
			rs2BeanMap.put("tx_proposed_billing_date", "proposedBillingDate");
			rs2BeanMap.put("dec_minimum_payment", "minimumPayment");
			rs2BeanMap.put("tx_bt_credit_card_outstanding", "btCreditCardOutstanding");
			rs2BeanMap.put("tx_kyc_level", "kycLevel");
			rs2BeanMap.put("tx_auto_debit_amount", "autoDebitAmount");
			rs2BeanMap.put("dec_interest_rate", "interestRate");
			rs2BeanMap.put("dt_cib_generation", "cibGeneration");
			rs2BeanMap.put("tx_cib_status", "cibStatus");
			rs2BeanMap.put("dec_proposed_dbr", "proposedDbr");
			rs2BeanMap.put("dec_net_monthly_income", "netMonthlyIncome");
			rs2BeanMap.put("tx_current_type_based_on_card_nature", "currentTypeBasedOnCardNature");
			rs2BeanMap.put("tx_card_security_type", "cardSecurityType");
			rs2BeanMap.put("dec_allowed_muiltiplier", "allowedMuiltiplier");
			rs2BeanMap.put("dec_amout_deposite_cbbl", "amoutDepositeCbbl");
			rs2BeanMap.put("dec_remaining_amount_after_paid_emi", "remainingAmountAfterPaidEmi");
			rs2BeanMap.put("dec_disposable_income", "disposableIncome");
			rs2BeanMap.put("dec_existing_loan_emi", "existingLoanEmi");
			rs2BeanMap.put("dec_total_emi", "totalEmi");
			rs2BeanMap.put("tx_duplications", "duplications");
			rs2BeanMap.put("tx_maximum_allowed_multiplier", "maximumAllowedMultiplier");
			rs2BeanMap.put("dec_maximum_allowed_dbr", "maximumAllowedDbr");
			rs2BeanMap.put("id_legal_entity_key", "idLegalEntityKey");
			rs2BeanMap.put("tx_concer_bank_name", "concerBankName");
			rs2BeanMap.put("tx_bt_request", "btRequest");
			rs2BeanMap.put("tx_card_group_id", "cardGroupId");
			rs2BeanMap.put("tx_card_group_creator", "cardGroupCreator");
			rs2BeanMap.put("int_in_group", "inGroup");
			rs2BeanMap.put("dtt_group_create", "dobOfGroupCreate");
			rs2BeanMap.put("tx_sourcing_branch", "sourcingBranch");
			rs2BeanMap.put("tx_duplication_areas", "duplicationAreas");
			rs2BeanMap.put("tx_ho_crm_comment", "hoCrmComment");
			rs2BeanMap.put("tx_cad_comment", "cadComment");
			rs2BeanMap.put("tx_credit_card_type", "creditCardType");
			rs2BeanMap.put("tx_name_of_card", "nameOfCard");
			rs2BeanMap.put("tx_reference_name","referenceName");			
			rs2BeanMap.put("tx_relationship_with_applicant","relationShipWithApplicant");			
			rs2BeanMap.put("tx_reference_profesion","referProfesion");			
			rs2BeanMap.put("tx_reference_name_of_organization","referenceNameOfOrganization");			
			rs2BeanMap.put("tx_reference_designation","referenceDesignation");			
			rs2BeanMap.put("tx_reference_work_and_residence_address","referenceWorkAndResidenceAddress");			
			rs2BeanMap.put("tx_reference_telephone","referenceTelephone");			
			rs2BeanMap.put("tx_reference_mobile","referenceMobile");			
			rs2BeanMap.put("tx_reference_email","referenceEmail");
			rs2BeanMap.put("tx_cib_report_status_list", "cibReportStatusList");
		}
		return rs2BeanMap;
	}

	public Integer getCardTypeKey() {
		return cardTypeKey;
	}

	public void setCardTypeKey(Integer cardTypeKey) {
		this.cardTypeKey = cardTypeKey;
	}

	public Integer getCcTrackingNumber() {
		return ccTrackingNumber;
	}

	public void setCcTrackingNumber(Integer ccTrackingNumber) {
		this.ccTrackingNumber = ccTrackingNumber;
	}

	public Double getAdditionalIncomeAmount() {
		return additionalIncomeAmount;
	}

	public void setAdditionalIncomeAmount(Double additionalIncomeAmount) {
		this.additionalIncomeAmount = additionalIncomeAmount;
	}

	public Double getAllowedMuiltiplier() {
		return allowedMuiltiplier;
	}

	public void setAllowedMuiltiplier(Double allowedMuiltiplier) {
		this.allowedMuiltiplier = allowedMuiltiplier;
	}

	public Double getAmoutDepositeCbbl() {
		return amoutDepositeCbbl;
	}

	public void setAmoutDepositeCbbl(Double amoutDepositeCbbl) {
		this.amoutDepositeCbbl = amoutDepositeCbbl;
	}

	public Double getApplicantAskingLimit() {
		return applicantAskingLimit;
	}

	public void setApplicantAskingLimit(Double applicantAskingLimit) {
		this.applicantAskingLimit = applicantAskingLimit;
	}

	public Double getAppliedCardMinBill() {
		return appliedCardMinBill;
	}

	public void setAppliedCardMinBill(Double appliedCardMinBill) {
		this.appliedCardMinBill = appliedCardMinBill;
	}

	public Double getApprovedLimit() {
		return approvedLimit;
	}

	public void setApprovedLimit(Double approvedLimit) {
		this.approvedLimit = approvedLimit;
	}

	public String getAutoDebitAmount() {
		return autoDebitAmount;
	}

	public void setAutoDebitAmount(String autoDebitAmount) {
		this.autoDebitAmount = autoDebitAmount;
	}

	public Double getAutoDebitReqMinAmount() {
		return autoDebitReqMinAmount;
	}

	public void setAutoDebitReqMinAmount(Double autoDebitReqMinAmount) {
		this.autoDebitReqMinAmount = autoDebitReqMinAmount;
	}

	public Double getCardProposedLimit() {
		return cardProposedLimit;
	}

	public void setCardProposedLimit(Double cardProposedLimit) {
		this.cardProposedLimit = cardProposedLimit;
	}

	public Double getDisposableIncome() {
		return disposableIncome;
	}

	public void setDisposableIncome(Double disposableIncome) {
		this.disposableIncome = disposableIncome;
	}

	public Double getExistingLoanEmi() {
		return existingLoanEmi;
	}

	public void setExistingLoanEmi(Double existingLoanEmi) {
		this.existingLoanEmi = existingLoanEmi;
	}

	public Double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(Double interestRate) {
		this.interestRate = interestRate;
	}

	public Double getMaxAllowdLimit() {
		return maxAllowdLimit;
	}

	public void setMaxAllowdLimit(Double maxAllowdLimit) {
		this.maxAllowdLimit = maxAllowdLimit;
	}

	public Double getMaximumAllowedDbr() {
		return maximumAllowedDbr;
	}

	public void setMaximumAllowedDbr(Double maximumAllowedDbr) {
		this.maximumAllowedDbr = maximumAllowedDbr;
	}

	public Double getMinimumPayment() {
		return minimumPayment;
	}

	public void setMinimumPayment(Double minimumPayment) {
		this.minimumPayment = minimumPayment;
	}

	public Double getPreApprovedLimitLower() {
		return preApprovedLimitLower;
	}

	public void setPreApprovedLimitLower(Double preApprovedLimitLower) {
		this.preApprovedLimitLower = preApprovedLimitLower;
	}

	public Double getPreApprovedLimitedUpper() {
		return preApprovedLimitedUpper;
	}

	public void setPreApprovedLimitedUpper(Double preApprovedLimitedUpper) {
		this.preApprovedLimitedUpper = preApprovedLimitedUpper;
	}

	public Double getProposedDbr() {
		return proposedDbr;
	}

	public void setProposedDbr(Double proposedDbr) {
		this.proposedDbr = proposedDbr;
	}

	public Double getRemainingAmountAfterPaidEmi() {
		return remainingAmountAfterPaidEmi;
	}

	public void setRemainingAmountAfterPaidEmi(Double remainingAmountAfterPaidEmi) {
		this.remainingAmountAfterPaidEmi = remainingAmountAfterPaidEmi;
	}

	public Double getRemainingEmi() {
		return remainingEmi;
	}

	public void setRemainingEmi(Double remainingEmi) {
		this.remainingEmi = remainingEmi;
	}

	public Double getSalaryDepositedLastMonth() {
		return salaryDepositedLastMonth;
	}

	public void setSalaryDepositedLastMonth(Double salaryDepositedLastMonth) {
		this.salaryDepositedLastMonth = salaryDepositedLastMonth;
	}

	public Double getTotalEmi() {
		return totalEmi;
	}

	public void setTotalEmi(Double totalEmi) {
		this.totalEmi = totalEmi;
	}

	public Double getTotalEmiPaidInCbbl() {
		return totalEmiPaidInCbbl;
	}

	public void setTotalEmiPaidInCbbl(Double totalEmiPaidInCbbl) {
		this.totalEmiPaidInCbbl = totalEmiPaidInCbbl;
	}

	public Double getTotalIncome() {
		return totalIncome;
	}

	public void setTotalIncome(Double totalIncome) {
		this.totalIncome = totalIncome;
	}

	public String getCardDeliveryFrom() {
		return cardDeliveryFrom;
	}

	public void setCardDeliveryFrom(String cardDeliveryFrom) {
		this.cardDeliveryFrom = cardDeliveryFrom;
	}

	public Date getCibGeneration() {
		return cibGeneration;
	}

	public void setCibGeneration(Date cibGeneration) {
		this.cibGeneration = cibGeneration;
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

	public String getAutoDebitReqFullOutstanding() {
		return autoDebitReqFullOutstanding;
	}

	public void setAutoDebitReqFullOutstanding(String autoDebitReqFullOutstanding) {
		this.autoDebitReqFullOutstanding = autoDebitReqFullOutstanding;
	}

	public String getBtCreditCardOutstanding() {
		return btCreditCardOutstanding;
	}

	public void setBtCreditCardOutstanding(String btCreditCardOutstanding) {
		this.btCreditCardOutstanding = btCreditCardOutstanding;
	}

	public String getCardDuplicationReason() {
		return cardDuplicationReason;
	}

	public void setCardDuplicationReason(String cardDuplicationReason) {
		this.cardDuplicationReason = cardDuplicationReason;
	}

	public String getCardDuplicationResult() {
		return cardDuplicationResult;
	}

	public void setCardDuplicationResult(String cardDuplicationResult) {
		this.cardDuplicationResult = cardDuplicationResult;
	}

	public String getCardMonthlyBilDebitedFrom() {
		return cardMonthlyBilDebitedFrom;
	}

	public void setCardMonthlyBilDebitedFrom(String cardMonthlyBilDebitedFrom) {
		this.cardMonthlyBilDebitedFrom = cardMonthlyBilDebitedFrom;
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

	public String getCurrentTypeBasedOnCardNature() {
		return currentTypeBasedOnCardNature;
	}

	public void setCurrentTypeBasedOnCardNature(String currentTypeBasedOnCardNature) {
		this.currentTypeBasedOnCardNature = currentTypeBasedOnCardNature;
	}

	public String getDataSource() {
		return dataSource;
	}

	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}

	public String getDeclaration() {
		return declaration;
	}

	public void setDeclaration(String declaration) {
		this.declaration = declaration;
	}

	public String getDuplications() {
		return duplications;
	}

	public void setDuplications(String duplications) {
		this.duplications = duplications;
	}

	public String getGpfLoan() {
		return gpfLoan;
	}

	public void setGpfLoan(String gpfLoan) {
		this.gpfLoan = gpfLoan;
	}

	public String getIndividualDeclaration() {
		return individualDeclaration;
	}

	public void setIndividualDeclaration(String individualDeclaration) {
		this.individualDeclaration = individualDeclaration;
	}

	public String getKycLevel() {
		return kycLevel;
	}

	public void setKycLevel(String kycLevel) {
		this.kycLevel = kycLevel;
	}

	public String getLoanToValue() {
		return loanToValue;
	}

	public void setLoanToValue(String loanToValue) {
		this.loanToValue = loanToValue;
	}

	public String getMaximumAllowedMultiplier() {
		return maximumAllowedMultiplier;
	}

	public void setMaximumAllowedMultiplier(String maximumAllowedMultiplier) {
		this.maximumAllowedMultiplier = maximumAllowedMultiplier;
	}

	public Double getNetMonthlyIncome() {
		return netMonthlyIncome;
	}

	public void setNetMonthlyIncome(Double netMonthlyIncome) {
		this.netMonthlyIncome = netMonthlyIncome;
	}

	public String getOfacSanctionReason() {
		return ofacSanctionReason;
	}

	public void setOfacSanctionReason(String ofacSanctionReason) {
		this.ofacSanctionReason = ofacSanctionReason;
	}

	public String getOfacSanctionResult() {
		return ofacSanctionResult;
	}

	public void setOfacSanctionResult(String ofacSanctionResult) {
		this.ofacSanctionResult = ofacSanctionResult;
	}

	public String getSourceFrom() {
		return sourceFrom;
	}

	public void setSourceFrom(String sourceFrom) {
		this.sourceFrom = sourceFrom;
	}

	public String getUnSanctionReason() {
		return unSanctionReason;
	}

	public void setUnSanctionReason(String unSanctionReason) {
		this.unSanctionReason = unSanctionReason;
	}

	public String getUnSanctionResult() {
		return unSanctionResult;
	}

	public void setUnSanctionResult(String unSanctionResult) {
		this.unSanctionResult = unSanctionResult;
	}

	public String getValueOfSecurity() {
		return valueOfSecurity;
	}

	public void setValueOfSecurity(String valueOfSecurity) {
		this.valueOfSecurity = valueOfSecurity;
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

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Double getAfterCbblEmi() {
		return afterCbblEmi;
	}

	public void setAfterCbblEmi(Double afterCbblEmi) {
		this.afterCbblEmi = afterCbblEmi;
	}

	public Double getAppliedAmount() {
		return appliedAmount;
	}

	public void setAppliedAmount(Double appliedAmount) {
		this.appliedAmount = appliedAmount;
	}

	public Double getPreApprovedLimit() {
		return preApprovedLimit;
	}

	public void setPreApprovedLimit(Double preApprovedLimit) {
		this.preApprovedLimit = preApprovedLimit;
	}

	public Customer getCustomer() {
		return customer;
	}

	public void setCustomer(Customer customer) {
		this.customer = customer;
	}

	public List<Document> getCardDocumentList() {
		return cardDocumentList;
	}

	public void setCardDocumentList(List<Document> cardDocumentList) {
		this.cardDocumentList = cardDocumentList;
	}

	public Integer getCustomerIdKey() {
		return customerIdKey;
	}

	public void setCustomerIdKey(Integer customerIdKey) {
		this.customerIdKey = customerIdKey;
	}

	public Integer getIdCustomerVer() {
		return idCustomerVer;
	}

	public void setIdCustomerVer(Integer idCustomerVer) {
		this.idCustomerVer = idCustomerVer;
	}

	public Integer getIdLegalEntityKey() {
		return idLegalEntityKey;
	}

	public void setIdLegalEntityKey(Integer idLegalEntityKey) {
		this.idLegalEntityKey = idLegalEntityKey;
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

	public List<Comment> getCmntJustificationList() {
		return cmntJustificationList;
	}

	public void setCmntJustificationList(List<Comment> cmntJustificationList) {
		this.cmntJustificationList = cmntJustificationList;
	}

	public List<Comment> getCmntDeivationList() {
		return cmntDeivationList;
	}

	public void setCmntDeivationList(List<Comment> cmntDeivationList) {
		this.cmntDeivationList = cmntDeivationList;
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

	public List<Comment> getCommentList() {
		return commentList;
	}

	public void setCommentList(List<Comment> commentList) {
		this.commentList = commentList;
	}

	public List<Document> getCardDocListForCibStatus() {
		return cardDocListForCibStatus;
	}

	public void setCardDocListForCibStatus(List<Document> cardDocListForCibStatus) {
		this.cardDocListForCibStatus = cardDocListForCibStatus;
	}

	public String getUiActionName() {
		return uiActionName;
	}

	public void setUiActionName(String uiActionName) {
		this.uiActionName = uiActionName;
	}

	public String getProposedBillingDate() {
		return proposedBillingDate;
	}

	public void setProposedBillingDate(String proposedBillingDate) {
		this.proposedBillingDate = proposedBillingDate;
	}

	public Double getPreApprovedLimitRange() {
		return preApprovedLimitRange;
	}

	public void setPreApprovedLimitRange(Double preApprovedLimitRange) {
		this.preApprovedLimitRange = preApprovedLimitRange;
	}

	public Double getRecommendForApproval() {
		return recommendForApproval;
	}

	public void setRecommendForApproval(Double recommendForApproval) {
		this.recommendForApproval = recommendForApproval;
	}

	public Double getBalanceTransferRequestAmount() {
		return balanceTransferRequestAmount;
	}

	public void setBalanceTransferRequestAmount(Double balanceTransferRequestAmount) {
		this.balanceTransferRequestAmount = balanceTransferRequestAmount;
	}

	public String getConcerBankName() {
		return concerBankName;
	}

	public void setConcerBankName(String concerBankName) {
		this.concerBankName = concerBankName;
	}

	public String getBtRequest() {
		return btRequest;
	}

	public void setBtRequest(String btRequest) {
		this.btRequest = btRequest;
	}

	public String getFromRoleIds() {
		return fromRoleIds;
	}

	public void setFromRoleIds(String fromRoleIds) {
		this.fromRoleIds = fromRoleIds;
	}

	public String getSourceBrance() {
		return sourceBrance;
	}

	public void setSourceBrance(String sourceBrance) {
		this.sourceBrance = sourceBrance;
	}

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
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

	public List<Integer> getCardIdList() {
		return cardIdList;
	}

	public void setCardIdList(List<Integer> cardIdList) {
		this.cardIdList = cardIdList;
	}

	public String getSourceCSE() {
		return sourceCSE;
	}

	public void setSourceCSE(String sourceCSE) {
		this.sourceCSE = sourceCSE;
	}

	public String getSourceSelfApplication() {
		return sourceSelfApplication;
	}

	public void setSourceSelfApplication(String sourceSelfApplication) {
		this.sourceSelfApplication = sourceSelfApplication;
	}

	public String getSourceOthers() {
		return sourceOthers;
	}

	public void setSourceOthers(String sourceOthers) {
		this.sourceOthers = sourceOthers;
	}

	public String getSourcingBranch() {
		return sourcingBranch;
	}

	public void setSourcingBranch(String sourcingBranch) {
		this.sourcingBranch = sourcingBranch;
	}

	public Integer getIdCustomerTypeKey() {
		return idCustomerTypeKey;
	}

	public void setIdCustomerTypeKey(Integer idCustomerTypeKey) {
		this.idCustomerTypeKey = idCustomerTypeKey;
	}

	public String getAutoDebitReqMinimumAmount() {
		return autoDebitReqMinimumAmount;
	}

	public void setAutoDebitReqMinimumAmount(String autoDebitReqMinimumAmount) {
		this.autoDebitReqMinimumAmount = autoDebitReqMinimumAmount;
	}

	public String getDuplicationAreas() {
		return duplicationAreas;
	}

	public void setDuplicationAreas(String duplicationAreas) {
		this.duplicationAreas = duplicationAreas;
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

	public String getCurrentUserRoleName() {
		return currentUserRoleName;
	}

	public void setCurrentUserRoleName(String currentUserRoleName) {
		this.currentUserRoleName = currentUserRoleName;
	}

	public String getCustDesignation() {
		return custDesignation;
	}

	public void setCustDesignation(String custDesignation) {
		this.custDesignation = custDesignation;
	}
	public String getCreditCardType() {
		return creditCardType;
	}

	public void setCreditCardType(String creditCardType) {
		this.creditCardType = creditCardType;
	}
	public String getNameOfCard() {
		return nameOfCard;
	}

	public void setNameOfCard(String nameOfCard) {
		this.nameOfCard = nameOfCard;
	}

	public String getReferenceName() {
		return referenceName;
	}

	public void setReferenceName(String referenceName) {
		this.referenceName = referenceName;
	}

	public String getRelationShipWithApplicant() {
		return relationShipWithApplicant;
	}

	public void setRelationShipWithApplicant(String relationShipWithApplicant) {
		this.relationShipWithApplicant = relationShipWithApplicant;
	}

	public String getReferProfesion() {
		return referProfesion;
	}

	public void setReferProfesion(String referProfesion) {
		this.referProfesion = referProfesion;
	}

	public String getReferenceNameOfOrganization() {
		return referenceNameOfOrganization;
	}

	public void setReferenceNameOfOrganization(String referenceNameOfOrganization) {
		this.referenceNameOfOrganization = referenceNameOfOrganization;
	}

	public String getReferenceDesignation() {
		return referenceDesignation;
	}

	public void setReferenceDesignation(String referenceDesignation) {
		this.referenceDesignation = referenceDesignation;
	}

	public String getReferenceWorkAndResidenceAddress() {
		return referenceWorkAndResidenceAddress;
	}

	public void setReferenceWorkAndResidenceAddress(String referenceWorkAndResidenceAddress) {
		this.referenceWorkAndResidenceAddress = referenceWorkAndResidenceAddress;
	}

	public String getReferenceTelephone() {
		return referenceTelephone;
	}

	public void setReferenceTelephone(String referenceTelephone) {
		this.referenceTelephone = referenceTelephone;
	}

	public String getReferenceMobile() {
		return referenceMobile;
	}

	public void setReferenceMobile(String referenceMobile) {
		this.referenceMobile = referenceMobile;
	}

	public String getReferenceEmail() {
		return referenceEmail;
	}

	public void setReferenceEmail(String referenceEmail) {
		this.referenceEmail = referenceEmail;
	}

	public String getTin4Src() {
		return tin4Src;
	}

	public void setTin4Src(String tin4Src) {
		this.tin4Src = tin4Src;
	}

	public String getCibReportStatusList() {
		return cibReportStatusList;
	}

	public void setCibReportStatusList(String cibReportStatusList) {
		this.cibReportStatusList = cibReportStatusList;
	}	

}
