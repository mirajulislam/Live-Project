package com.naztech.lms.model;

import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Report extends BaseModel {

	//Customer customer;

	private Integer loanId;
	private Integer loanVer;
	private String loanTrackingId;
	private Integer userId;
	private Integer serial;
	private Integer number;
	private String branchName;
	private String fileRefNo;
	private String status;
	private Date sendToCadDate;
	private Double approvedAmount;
	private Date receivedByCrm;
	private Date cibGenerationDate;
	private String mail;
	private String districName;
	private String submitUnit;
	private Date mailSendDate;
	private Date ppcReceivedDate;
	private Date receivedCibFromCadDate;
	private Date submitToCrm;
	private String sourceTat;
	private Date sendToCrm;
	private String crmStatus;
	private Date approvedAmtDate;
	private String crmTat;
	private Date cadQuriesDate;
	private String cadStatus;
	private Date disbursedDate;
	private String cadTat;
	private Double gPFAmount;
	private String userName;
	private Double tenorYear;
	private String mobileOfGuarantor;
	private String guarantorNid;
	private Double appliedLoanAmount;
	private String district;
	private String division;
	private Double proposedDBR;
	private Double allowedDBR;
	private String sourcingBrc;

	private String unitName;
	private String subUnitName;
	private String loanIdListStr;
	private Integer customerId;
	
	/* For crm Report Service */
	private String loanType;
	private Date dateOfQuery;
	private String inputBy;
	private String customerType;
	private String cbsUserId;
	private Date reSubmitDate;
	private Date approvedDate;
	private String analyst;
	private Date returnToSourceDate;
	private String analystComments;
	private String applicationNo;
	private Double interestRate;
	private Double totalEMI;
	private String nameOfGuarantor;
	private Double recommendedForApproval;
//	customer 
	String bpNo;
	String customerName;
	String designation;
	String currentPlaceofPosting;
	Date dateOfBirth;
	String age;
	Date joiningDate;
	String serviceLength;
	Date retirementDate;
	String remainingYearOfRetirement;
	String houseOwnership;
	String permanentAddr;
	String officeAddr;

	String nid;
	String tin;
	Integer salaryDisbursedWithCBBL;
	String accountNo;
	String cif;
	String maritalStatus;
	String motherName;
	String fatherName;
	String spouse;

	String isMatchedNid;
	String phone;
	String mobile;
	String alternativeMobile;
	String emerPhone;
	String officeId;

	Integer idCustomerTypeKey;

	String banglaNameOfBorrower;

	String staffBranchName;
	
	String stateMap;
	private Date sL_GeneratedDate;
	private Date crmTatEndTime;
	String actionWiseComment;
	String queryComments;
	

	List<Integer> loandIdList = new ArrayList<Integer>();

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_loan_key", "loanId");
			sql2BeanMap.put("@id_loan_ver", "loanVer");

			sql2BeanMap.put("@id_userId", "userId");
			
			sql2BeanMap.put("@tx_loan_id_list", "loanIdListStr");
			

		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_loan_key", "loanId");
			rs2BeanMap.put("id_loan_ver", "loanVer");

			rs2BeanMap.put("tx_loan_tracking_id", "loanTrackingId");
			rs2BeanMap.put("id_userId", "userId");
			rs2BeanMap.put("id_serial", "serial");
			rs2BeanMap.put("id_number", "number");
			rs2BeanMap.put("tx_application_no", "fileRefNo");
			rs2BeanMap.put("tx_loan_current_status", "status");
			rs2BeanMap.put("dtt_sent_to_cad", "sendToCadDate");
			rs2BeanMap.put("dec_recommended_for_approval", "approvedAmount");
			rs2BeanMap.put("dtt_approved_date", "approvedDate");
			rs2BeanMap.put("dtt_crm_received_date", "receivedByCrm");
			rs2BeanMap.put("dtt_cib_generation_date", "cibGenerationDate");
			rs2BeanMap.put("tx_progress_status", "progressStatus");
			rs2BeanMap.put("tx_verification_email", "mail");
			rs2BeanMap.put("tx_distric_name", "districName");
			rs2BeanMap.put("tx_loan_creator", "submitUnit");
			rs2BeanMap.put("tx_unit_name2", "unitName2");
			rs2BeanMap.put("tx_loan_type", "loanType");
			rs2BeanMap.put("dtt_ppc_received_date", "fileReceivedDate");
			rs2BeanMap.put("dtt_mail_send_date", "mailSendDate");
			rs2BeanMap.put("dtt_ppc_received_date", "ppcReceivedDate");
			rs2BeanMap.put("dtt_cib_upload_date", "receivedCibFromCadDate");
			rs2BeanMap.put("dtt_sent_to_crm", "submitToCrm");
			rs2BeanMap.put("tx_source_tat", "sourceTat");
			rs2BeanMap.put("dtt_send_to_cad", "sendToCad");
			rs2BeanMap.put("tx_crm_status", "crmStatus");
			rs2BeanMap.put("dtt_submit_to_crm_date", "approvedAmtDate");
			rs2BeanMap.put("tx_crm_tat", "crmTat");
			rs2BeanMap.put("dtt_cad_quries_date", "cadQuriesDate");
			rs2BeanMap.put("tx_cad_satatus", "cadStatus");
			rs2BeanMap.put("dtt_disbursed_date", "disbursedDate");
			rs2BeanMap.put("tx_cad_tat", "cadTat");
			rs2BeanMap.put("dec_gPF_amount", "gPFAmount");
			rs2BeanMap.put("tx_user_name", "userName");
			rs2BeanMap.put("dec_tenor_year", "tenorYear");
			rs2BeanMap.put("tx_guarantor_nid", "guarantorNid");
			rs2BeanMap.put("tx_mobile_guarantor", "mobileOfGuarantor");
			rs2BeanMap.put("dec_applied_loan_amount", "appliedLoanAmount");
			rs2BeanMap.put("tx_district", "district");
			rs2BeanMap.put("tx_division", "division");
			rs2BeanMap.put("dec_allowed_dbr", "allowedDBR");
			rs2BeanMap.put("dec_proposed_dbr", "proposedDBR");
			rs2BeanMap.put("tx_sourcing_brc", "sourcingBrc");
			rs2BeanMap.put("tx_unit_1", "unitName");
			rs2BeanMap.put("tx_unit_2", "subUnitName");
			rs2BeanMap.put("tx_legal_entity_name", "branchName");

			rs2BeanMap.put("id_customer_key", "customerId");
			rs2BeanMap.put("tx_bp_no", "bpNo");
			rs2BeanMap.put("tx_customer_name", "customerName");
			rs2BeanMap.put("tx_designation", "designation");
			rs2BeanMap.put("tx_current_posting_place", "currentPlaceofPosting");
			rs2BeanMap.put("dtt_date_of_birth", "dateOfBirth");
			rs2BeanMap.put("tx_age", "age");
			rs2BeanMap.put("dtt_joining_date", "joiningDate");
			rs2BeanMap.put("tx_service_length", "serviceLength");
			rs2BeanMap.put("dtt_retirement_date", "retirementDate");
			rs2BeanMap.put("tx_remaining_year_of_retirement", "remainingYearOfRetirement");
			rs2BeanMap.put("tx_house_ownership", "houseOwnership");
			rs2BeanMap.put("tx_permanet_addr", "permanentAddr");
			rs2BeanMap.put("tx_office_addr", "officeAddr");

			rs2BeanMap.put("tx_nid", "nid");
			rs2BeanMap.put("tx_tin", "tin");
			rs2BeanMap.put("int_salary_disbursed_with_cbbl", "salaryDisbursedWithCBBL");
			rs2BeanMap.put("tx_account_no", "accountNo");
			rs2BeanMap.put("tx_cif", "cif");
			rs2BeanMap.put("tx_marital_status", "maritalStatus");
			rs2BeanMap.put("tx_mother_name", "motherName");
			rs2BeanMap.put("tx_father_name", "fatherName");
			rs2BeanMap.put("tx_spouse", "spouse");
			rs2BeanMap.put("tx_is_matched_nid", "isMatchedNid");
			rs2BeanMap.put("tx_mobile", "mobile");
			rs2BeanMap.put("tx_emer_phone", "emerPhone");
			rs2BeanMap.put("tx_office_id", "officeId");
			rs2BeanMap.put("id_customer_type_key", "idCustomerTypeKey");
			rs2BeanMap.put("tx_name_in_bangla", "banglaNameOfBorrower");
			rs2BeanMap.put("tx_staff_branch_name", "staffBranchName");

			rs2BeanMap.put("tx_analyst", "analyst");
			rs2BeanMap.put("dtt_return_to_source_date", "returnToSourceDate");
			rs2BeanMap.put("tx_analyst_comments", "analystComments");
			rs2BeanMap.put("dtt_of_query", "dateOfQuery");
			rs2BeanMap.put("tx_cbs_user_id", "cbsUserId");
			rs2BeanMap.put("tx_customer_type", "customerType");
			rs2BeanMap.put("tx_input_by", "inputBy");
			rs2BeanMap.put("tx_application_no", "applicationNo");
			rs2BeanMap.put("dec_interest_rate", "interestRate");
			rs2BeanMap.put("dec_total_emi", "totalEMI");
			rs2BeanMap.put("tx_name_of_guarantor", "nameOfGuarantor");
			rs2BeanMap.put("dec_recommended_for_approval", "recommendedForApproval");
			rs2BeanMap.put("tx_state_map", "stateMap");
			rs2BeanMap.put("tx_comment_action", "actionWiseComment");
			rs2BeanMap.put("tx_query_comments", "queryComments");			
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

	public String getLoanTrackingId() {
		return loanTrackingId;
	}

	public void setLoanTrackingId(String loanTrackingId) {
		this.loanTrackingId = loanTrackingId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getSerial() {
		return serial;
	}

	public void setSerial(Integer serial) {
		this.serial = serial;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
	}

	public String getBranchName() {
		return branchName;
	}

	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}

	public String getFileRefNo() {
		return fileRefNo;
	}

	public void setFileRefNo(String fileRefNo) {
		this.fileRefNo = fileRefNo;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getSendToCadDate() {
		return sendToCadDate;
	}

	public void setSendToCadDate(Date sendToCadDate) {
		this.sendToCadDate = sendToCadDate;
	}

	public Double getApprovedAmount() {
		return approvedAmount;
	}

	public void setApprovedAmount(Double approvedAmount) {
		this.approvedAmount = approvedAmount;
	}

	public Date getApprovedDate() {
		return approvedDate;
	}

	public void setApprovedDate(Date approvedDate) {
		this.approvedDate = approvedDate;
	}

	public Date getReceivedByCrm() {
		return receivedByCrm;
	}

	public void setReceivedByCrm(Date receivedByCrm) {
		this.receivedByCrm = receivedByCrm;
	}

	public Date getCibGenerationDate() {
		return cibGenerationDate;
	}

	public void setCibGenerationDate(Date cibGenerationDate) {
		this.cibGenerationDate = cibGenerationDate;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getDistricName() {
		return districName;
	}

	public void setDistricName(String districName) {
		this.districName = districName;
	}

	public String getSubmitUnit() {
		return submitUnit;
	}

	public void setSubmitUnit(String submitUnit) {
		this.submitUnit = submitUnit;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getLoanType() {
		return loanType;
	}

	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}

	public Date getMailSendDate() {
		return mailSendDate;
	}

	public void setMailSendDate(Date mailSendDate) {
		this.mailSendDate = mailSendDate;
	}

	public Date getPpcReceivedDate() {
		return ppcReceivedDate;
	}

	public void setPpcReceivedDate(Date ppcReceivedDate) {
		this.ppcReceivedDate = ppcReceivedDate;
	}

	public Date getReceivedCibFromCadDate() {
		return receivedCibFromCadDate;
	}

	public void setReceivedCibFromCadDate(Date receivedCibFromCadDate) {
		this.receivedCibFromCadDate = receivedCibFromCadDate;
	}

	public Date getSubmitToCrm() {
		return submitToCrm;
	}

	public void setSubmitToCrm(Date submitToCrm) {
		this.submitToCrm = submitToCrm;
	}

	public String getSourceTat() {
		return sourceTat;
	}

	public void setSourceTat(String sourceTat) {
		this.sourceTat = sourceTat;
	}

	public Date getSendToCrm() {
		return sendToCrm;
	}

	public void setSendToCrm(Date sendToCrm) {
		this.sendToCrm = sendToCrm;
	}

	public String getCrmStatus() {
		return crmStatus;
	}

	public void setCrmStatus(String crmStatus) {
		this.crmStatus = crmStatus;
	}

	public Date getApprovedAmtDate() {
		return approvedAmtDate;
	}

	public void setApprovedAmtDate(Date approvedAmtDate) {
		this.approvedAmtDate = approvedAmtDate;
	}

	public String getCrmTat() {
		return crmTat;
	}

	public void setCrmTat(String crmTat) {
		this.crmTat = crmTat;
	}

	public Date getCadQuriesDate() {
		return cadQuriesDate;
	}

	public void setCadQuriesDate(Date cadQuriesDate) {
		this.cadQuriesDate = cadQuriesDate;
	}

	public String getCadStatus() {
		return cadStatus;
	}

	public void setCadStatus(String cadStatus) {
		this.cadStatus = cadStatus;
	}

	public Date getDisbursedDate() {
		return disbursedDate;
	}

	public void setDisbursedDate(Date disbursedDate) {
		this.disbursedDate = disbursedDate;
	}

	public String getCadTat() {
		return cadTat;
	}

	public void setCadTat(String cadTat) {
		this.cadTat = cadTat;
	}

	public String getLoanIdListStr() {
		return loanIdListStr;
	}

	public void setLoanIdListStr(String loanIdListStr) {
		this.loanIdListStr = loanIdListStr;
	}

	public Integer getCustomerId() {
		return customerId;
	}

	public void setCustomerId(Integer customerId) {
		this.customerId = customerId;
	}

	public List<Integer> getLoandIdList() {
		return loandIdList;
	}

	public void setLoandIdList(List<Integer> loandIdList) {
		this.loandIdList = loandIdList;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Double getTenorYear() {
		return tenorYear;
	}

	public void setTenorYear(Double tenorYear) {
		this.tenorYear = tenorYear;
	}

	public String getMobileOfGuarantor() {
		return mobileOfGuarantor;
	}

	public void setMobileOfGuarantor(String mobileOfGuarantor) {
		this.mobileOfGuarantor = mobileOfGuarantor;
	}

	public String getGuarantorNid() {
		return guarantorNid;
	}

	public void setGuarantorNid(String guarantorNid) {
		this.guarantorNid = guarantorNid;
	}

	public Double getAppliedLoanAmount() {
		return appliedLoanAmount;
	}

	public void setAppliedLoanAmount(Double appliedLoanAmount) {
		this.appliedLoanAmount = appliedLoanAmount;
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

	public String getSourcingBrc() {
		return sourcingBrc;
	}

	public void setSourcingBrc(String sourcingBrc) {
		this.sourcingBrc = sourcingBrc;
	}

	public String getSubUnitName() {
		return subUnitName;
	}

	public void setSubUnitName(String subUnitName) {
		this.subUnitName = subUnitName;
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

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public Date getJoiningDate() {
		return joiningDate;
	}

	public void setJoiningDate(Date joiningDate) {
		this.joiningDate = joiningDate;
	}

	public String getServiceLength() {
		return serviceLength;
	}

	public void setServiceLength(String serviceLength) {
		this.serviceLength = serviceLength;
	}

	public Date getRetirementDate() {
		return retirementDate;
	}

	public void setRetirementDate(Date retirementDate) {
		this.retirementDate = retirementDate;
	}

	public String getRemainingYearOfRetirement() {
		return remainingYearOfRetirement;
	}

	public void setRemainingYearOfRetirement(String remainingYearOfRetirement) {
		this.remainingYearOfRetirement = remainingYearOfRetirement;
	}

	public String getHouseOwnership() {
		return houseOwnership;
	}

	public void setHouseOwnership(String houseOwnership) {
		this.houseOwnership = houseOwnership;
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

	public Integer getSalaryDisbursedWithCBBL() {
		return salaryDisbursedWithCBBL;
	}

	public void setSalaryDisbursedWithCBBL(Integer salaryDisbursedWithCBBL) {
		this.salaryDisbursedWithCBBL = salaryDisbursedWithCBBL;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	public String getCif() {
		return cif;
	}

	public void setCif(String cif) {
		this.cif = cif;
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

	public String getIsMatchedNid() {
		return isMatchedNid;
	}

	public void setIsMatchedNid(String isMatchedNid) {
		this.isMatchedNid = isMatchedNid;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getAlternativeMobile() {
		return alternativeMobile;
	}

	public void setAlternativeMobile(String alternativeMobile) {
		this.alternativeMobile = alternativeMobile;
	}

	public String getEmerPhone() {
		return emerPhone;
	}

	public void setEmerPhone(String emerPhone) {
		this.emerPhone = emerPhone;
	}

	public String getOfficeId() {
		return officeId;
	}

	public void setOfficeId(String officeId) {
		this.officeId = officeId;
	}

	public Integer getIdCustomerTypeKey() {
		return idCustomerTypeKey;
	}

	public void setIdCustomerTypeKey(Integer idCustomerTypeKey) {
		this.idCustomerTypeKey = idCustomerTypeKey;
	}

	public String getBanglaNameOfBorrower() {
		return banglaNameOfBorrower;
	}

	public void setBanglaNameOfBorrower(String banglaNameOfBorrower) {
		this.banglaNameOfBorrower = banglaNameOfBorrower;
	}

	public String getStaffBranchName() {
		return staffBranchName;
	}

	public void setStaffBranchName(String staffBranchName) {
		this.staffBranchName = staffBranchName;
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

	public String getApplicationNo() {
		return applicationNo;
	}

	public void setApplicationNo(String applicationNo) {
		this.applicationNo = applicationNo;
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

	public String getStateMap() {
		return stateMap;
	}

	public void setStateMap(String stateMap) {
		this.stateMap = stateMap;
	}

	public Date getsL_GeneratedDate() {
		return sL_GeneratedDate;
	}

	public void setsL_GeneratedDate(Date sL_GeneratedDate) {
		this.sL_GeneratedDate = sL_GeneratedDate;
	}

	public Date getCrmTatEndTime() {
		return crmTatEndTime;
	}

	public void setCrmTatEndTime(Date crmTatEndTime) {
		this.crmTatEndTime = crmTatEndTime;
	}

	public String getActionWiseComment() {
		return actionWiseComment;
	}

	public void setActionWiseComment(String actionWiseComment) {
		this.actionWiseComment = actionWiseComment;
	}

	public String getQueryComments() {
		return queryComments;
	}

	public void setQueryComments(String queryComments) {
		this.queryComments = queryComments;
	}	
}
