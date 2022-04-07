package com.naztech.lms.creditCard.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
/**
 * @author Mirajul.islam
 */
public class AcquisitionDetailsConfig extends AcquisitionBase{
	private Integer acquisitionDetailsConfigId;
	private Integer acquisitionDetailsConfigVer;
	private Integer idAcquisitionApplicantKey;
	private String organizationName;
	private String designation;
	private Double serviceLength;
	private String loanType;
	private String financialInstitutionName;
	private String loanACnoOrCardNo;
	private Double sanctionLimit;
	private String validity;
	private Double presentOutstanding;
	private Double emi;
	
	private String accountTitle;
	private String branchName;
	private String accountNo;
	private String securityType;
	private String beneficiary;
	private Double rate;
	private String aCInstrumentNo;
	private String bankName;
	private Date issueDate;
	private String faceValue;
	private String presentValue;
	private String companyName;
	private String mainAddress;
	private String additionalAddress;
	private String availingAnyLoanThisCompany;
	private String nameOfCompanyBank;
	private String branchOfCompanyBank;
	private String objectType;
	private String inputedBy;
	private	String group;
	private	String subGroup;
	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;
	
	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			sql2BeanMap.putAll(getSql2BaseBeanMap());
			
			sql2BeanMap.put("@id_acquisition_details_config_key","acquisitionDetailsConfigId");
			sql2BeanMap.put("@id_acquisition_details_config_ver","acquisitionDetailsConfigVer");
			sql2BeanMap.put("@id_acquisition_applicant_key","idAcquisitionApplicantKey");
			sql2BeanMap.put("@tx_organization_name","organizationName");														
			sql2BeanMap.put("@tx_designation","designation");															
			sql2BeanMap.put("@dec_service_length","serviceLength");																												
			sql2BeanMap.put("@tx_loan_type","loanType");																
			sql2BeanMap.put("@tx_financial_institution_name","financialInstitutionName");												
			sql2BeanMap.put("@tx_loanacno_or_card_no","loanACnoOrCardNo");														
			sql2BeanMap.put("@dec_sanction_limit","sanctionLimit");															
			sql2BeanMap.put("@tx_validity","validity");																
			sql2BeanMap.put("@dec_present_out_standing","presentOutstanding");													
			sql2BeanMap.put("@dec_emi","emi");																													
			sql2BeanMap.put("@tx_account_title","accountTitle");															
			sql2BeanMap.put("@tx_branch_name","branchName");															
			sql2BeanMap.put("@tx_account_no","accountNo");																
			sql2BeanMap.put("@tx_security_type","securityType");															
			sql2BeanMap.put("@tx_beneficiary","beneficiary");															
			sql2BeanMap.put("@dec_rate","rate");																	
			sql2BeanMap.put("@tx_ac_instrument_no","aCInstrumentNo");														
			sql2BeanMap.put("@tx_bank_name","bankName");																
			sql2BeanMap.put("@dtt_issue_date","issueDate");																
			sql2BeanMap.put("@tx_face_value","faceValue");																
			sql2BeanMap.put("@tx_present_value","presentValue");															
			sql2BeanMap.put("@tx_company_name","companyName");															
			sql2BeanMap.put("@tx_main_address","mainAddress");															
			sql2BeanMap.put("@tx_additional_address","additionalAddress");														
			sql2BeanMap.put("@tx_availing_any_loan_this_company","availingAnyLoanThisCompany");										
			sql2BeanMap.put("@tx_name_of_company_bank","nameOfCompanyBank");														
			sql2BeanMap.put("@tx_branch_of_company_bank","branchOfCompanyBank");													
			sql2BeanMap.put("@tx_object_type","objectType");																												
			sql2BeanMap.put("@tx_inputed_by","inputedBy");																
			sql2BeanMap.put("@tx_group","group");																	
			sql2BeanMap.put("@tx_sub_group","subGroup");
		}
		return sql2BeanMap;
	}
	
	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.putAll(getRs2BaseBeanMap());
			
			rs2BeanMap.put("id_acquisition_details_config_key","acquisitionDetailsConfigId");
			rs2BeanMap.put("id_acquisition_details_config_ver","acquisitionDetailsConfigVer");
			rs2BeanMap.put("id_acquisition_applicant_key","idAcquisitionApplicantKey");
			rs2BeanMap.put("tx_organization_name","organizationName");														
			rs2BeanMap.put("tx_designation","designation");															
			rs2BeanMap.put("dec_service_length","serviceLength");																												
			rs2BeanMap.put("tx_loan_type","loanType");																
			rs2BeanMap.put("tx_financial_institution_name","financialInstitutionName");												
			rs2BeanMap.put("tx_loanacno_or_card_no","loanACnoOrCardNo");														
			rs2BeanMap.put("dec_sanction_limit","sanctionLimit");															
			rs2BeanMap.put("tx_validity","validity");																
			rs2BeanMap.put("dec_present_out_standing","presentOutstanding");													
			rs2BeanMap.put("dec_emi","emi");																													
			rs2BeanMap.put("tx_account_title","accountTitle");															
			rs2BeanMap.put("tx_branch_name","branchName");															
			rs2BeanMap.put("tx_account_no","accountNo");																
			rs2BeanMap.put("tx_security_type","securityType");															
			rs2BeanMap.put("tx_beneficiary","beneficiary");															
			rs2BeanMap.put("dec_rate","rate");																	
			rs2BeanMap.put("tx_ac_instrument_no","aCInstrumentNo");														
			rs2BeanMap.put("tx_bank_name","bankName");																
			rs2BeanMap.put("dtt_issue_date","issueDate");																
			rs2BeanMap.put("tx_face_value","faceValue");																
			rs2BeanMap.put("tx_present_value","presentValue");															
			rs2BeanMap.put("tx_company_name","companyName");															
			rs2BeanMap.put("tx_main_address","mainAddress");															
			rs2BeanMap.put("tx_additional_address","additionalAddress");														
			rs2BeanMap.put("tx_availing_any_loan_this_company","availingAnyLoanThisCompany");										
			rs2BeanMap.put("tx_name_of_company_bank","nameOfCompanyBank");														
			rs2BeanMap.put("tx_branch_of_company_bank","branchOfCompanyBank");													
			rs2BeanMap.put("tx_object_type","objectType");																												
			rs2BeanMap.put("tx_inputed_by","inputedBy");																
			rs2BeanMap.put("tx_group","group");																	
			rs2BeanMap.put("tx_sub_group","subGroup");
		}
		return rs2BeanMap;
	}

	public Integer getAcquisitionDetailsConfigId() {
		return acquisitionDetailsConfigId;
	}

	public void setAcquisitionDetailsConfigId(Integer acquisitionDetailsConfigId) {
		this.acquisitionDetailsConfigId = acquisitionDetailsConfigId;
	}

	public Integer getAcquisitionDetailsConfigVer() {
		return acquisitionDetailsConfigVer;
	}

	public void setAcquisitionDetailsConfigVer(Integer acquisitionDetailsConfigVer) {
		this.acquisitionDetailsConfigVer = acquisitionDetailsConfigVer;
	}

	public Integer getIdAcquisitionApplicantKey() {
		return idAcquisitionApplicantKey;
	}

	public void setIdAcquisitionApplicantKey(Integer idAcquisitionApplicantKey) {
		this.idAcquisitionApplicantKey = idAcquisitionApplicantKey;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public Double getServiceLength() {
		return serviceLength;
	}

	public void setServiceLength(Double serviceLength) {
		this.serviceLength = serviceLength;
	}

	public String getLoanType() {
		return loanType;
	}

	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}

	public String getFinancialInstitutionName() {
		return financialInstitutionName;
	}

	public void setFinancialInstitutionName(String financialInstitutionName) {
		this.financialInstitutionName = financialInstitutionName;
	}

	public String getLoanACnoOrCardNo() {
		return loanACnoOrCardNo;
	}

	public void setLoanACnoOrCardNo(String loanACnoOrCardNo) {
		this.loanACnoOrCardNo = loanACnoOrCardNo;
	}

	public Double getSanctionLimit() {
		return sanctionLimit;
	}

	public void setSanctionLmit(Double sanctionLimit) {
		this.sanctionLimit = sanctionLimit;
	}

	public String getValidity() {
		return validity;
	}

	public void setValidity(String validity) {
		this.validity = validity;
	}

	public Double getPresentOutstanding() {
		return presentOutstanding;
	}

	public void setPresentOutstanding(Double presentOutstanding) {
		this.presentOutstanding = presentOutstanding;
	}

	public Double getEmi() {
		return emi;
	}

	public void setEmi(Double emi) {
		this.emi = emi;
	}

	public String getAccountTitle() {
		return accountTitle;
	}

	public void setAccountTitle(String accountTitle) {
		this.accountTitle = accountTitle;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public String getSecurityType() {
		return securityType;
	}

	public void setSecurityType(String securityType) {
		this.securityType = securityType;
	}

	public String getBeneficiary() {
		return beneficiary;
	}

	public void setBeneficiary(String beneficiary) {
		this.beneficiary = beneficiary;
	}

	public Double getRate() {
		return rate;
	}

	public void setRate(Double rate) {
		this.rate = rate;
	}

	public String getaCInstrumentNo() {
		return aCInstrumentNo;
	}

	public void setaCInstrumentNo(String aCInstrumentNo) {
		this.aCInstrumentNo = aCInstrumentNo;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public Date getIssueDate() {
		return issueDate;
	}

	public void setIssueDate(Date issueDate) {
		this.issueDate = issueDate;
	}

	public String getFaceValue() {
		return faceValue;
	}

	public void setFaceValue(String faceValue) {
		this.faceValue = faceValue;
	}

	public String getPresentValue() {
		return presentValue;
	}

	public void setPresentValue(String presentValue) {
		this.presentValue = presentValue;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}

	public String getMainAddress() {
		return mainAddress;
	}

	public void setMainAddress(String mainAddress) {
		this.mainAddress = mainAddress;
	}

	public String getAdditionalAddress() {
		return additionalAddress;
	}

	public void setAdditionalAddress(String additionalAddress) {
		this.additionalAddress = additionalAddress;
	}

	public String getAvailingAnyLoanThisCompany() {
		return availingAnyLoanThisCompany;
	}

	public void setAvailingAnyLoanThisCompany(String availingAnyLoanThisCompany) {
		this.availingAnyLoanThisCompany = availingAnyLoanThisCompany;
	}

	public String getNameOfCompanyBank() {
		return nameOfCompanyBank;
	}

	public void setNameOfCompanyBank(String nameOfCompanyBank) {
		this.nameOfCompanyBank = nameOfCompanyBank;
	}

	public String getBranchOfCompanyBank() {
		return branchOfCompanyBank;
	}

	public void setBranchOfCompanyBank(String branchOfCompanyBank) {
		this.branchOfCompanyBank = branchOfCompanyBank;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getInputedBy() {
		return inputedBy;
	}

	public void setInputedBy(String inputedBy) {
		this.inputedBy = inputedBy;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getSubGroup() {
		return subGroup;
	}

	public void setSubGroup(String subGroup) {
		this.subGroup = subGroup;
	}

	public void setSanctionLimit(Double sanctionLimit) {
		this.sanctionLimit = sanctionLimit;
	}

	@Override
	public String toString() {
		return "AcquisitionDetailsConfig [acquisitionDetailsConfigId=" + acquisitionDetailsConfigId
				+ ", acquisitionDetailsConfigVer=" + acquisitionDetailsConfigVer + ", idAcquisitionApplicantKey="
				+ idAcquisitionApplicantKey + ", organizationName=" + organizationName + ", designation=" + designation
				+ ", serviceLength=" + serviceLength + ", loanType=" + loanType + ", financialInstitutionName="
				+ financialInstitutionName + ", loanACnoOrCardNo=" + loanACnoOrCardNo + ", sanctionLimit="
				+ sanctionLimit + ", validity=" + validity + ", presentOutstanding=" + presentOutstanding + ", emi="
				+ emi + ", accountTitle=" + accountTitle + ", branchName=" + branchName + ", accountNo=" + accountNo
				+ ", securityType=" + securityType + ", beneficiary=" + beneficiary + ", rate=" + rate
				+ ", aCInstrumentNo=" + aCInstrumentNo + ", bankName=" + bankName + ", issueDate=" + issueDate
				+ ", faceValue=" + faceValue + ", presentValue=" + presentValue + ", companyName=" + companyName
				+ ", mainAddress=" + mainAddress + ", additionalAddress=" + additionalAddress
				+ ", availingAnyLoanThisCompany=" + availingAnyLoanThisCompany + ", nameOfCompanyBank="
				+ nameOfCompanyBank + ", branchOfCompanyBank=" + branchOfCompanyBank + ", objectType=" + objectType
				+ ", inputedBy=" + inputedBy + ", group=" + group + ", subGroup=" + subGroup + "]";
	}
}
