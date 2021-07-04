/**
 * 
 */
package com.naztech.lms.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author md.kamruzzaman
 */
public class Customer extends BaseModel {

	Integer customerIdKey;
	Integer idCustomerVer;

	String customerId;

	String customerType;

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

	private String officeDistrict;
	private String officeDivision;
	
	private String unitName;
	private String subUnitName;
	

	// only use for tracking
	private String searchByStr;
	
	String searchDateOfBirth;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_customer_key", "customerIdKey");
			sql2BeanMap.put("@id_customer_ver", "idCustomerVer");

			sql2BeanMap.put("@tx_customer_id", "customerId");

			sql2BeanMap.put("@tx_bp_no", "bpNo");
			sql2BeanMap.put("@tx_customer_name", "customerName");
			sql2BeanMap.put("@tx_designation", "designation");
			sql2BeanMap.put("@tx_current_posting_place", "currentPlaceofPosting");
			sql2BeanMap.put("@dtt_date_of_birth", "dateOfBirth");
			sql2BeanMap.put("@tx_age", "age");
			sql2BeanMap.put("@dtt_joining_date", "joiningDate");
			sql2BeanMap.put("@tx_service_length", "serviceLength");
			sql2BeanMap.put("@dtt_retirement_date", "retirementDate");
			sql2BeanMap.put("@tx_remaining_year_of_retirement", "remainingYearOfRetirement");
			sql2BeanMap.put("@tx_house_ownership", "houseOwnership");
			sql2BeanMap.put("@tx_permanet_addr", "permanentAddr");
			sql2BeanMap.put("@tx_office_addr", "officeAddr");

			sql2BeanMap.put("@tx_nid", "nid");
			sql2BeanMap.put("@tx_tin", "tin");
			sql2BeanMap.put("@int_salary_disbursed_with_cbbl", "salaryDisbursedWithCBBL");
			sql2BeanMap.put("@tx_account_no", "accountNo");
			sql2BeanMap.put("@tx_cif", "cif");
			sql2BeanMap.put("@tx_marital_status", "maritalStatus");
			sql2BeanMap.put("@tx_mother_name", "motherName");
			sql2BeanMap.put("@tx_father_name", "fatherName");
			sql2BeanMap.put("@tx_spouse", "spouse");
			sql2BeanMap.put("@tx_is_matched_nid", "isMatchedNid");

			sql2BeanMap.put("@tx_mobile", "mobile");
			sql2BeanMap.put("@tx_alternative_mobile", "alternativeMobile");
			sql2BeanMap.put("@tx_emer_phone", "emerPhone");
			sql2BeanMap.put("@tx_office_id", "officeId");
			sql2BeanMap.put("@id_customer_type_key", "idCustomerTypeKey");

			sql2BeanMap.put("@tx_customer_type", "customerType");
			sql2BeanMap.put("@tx_name_in_bangla", "banglaNameOfBorrower");

			sql2BeanMap.put("@tx_district", "officeDistrict");
			sql2BeanMap.put("@tx_division", "officeDivision");
			sql2BeanMap.put("@tx_unit_1", "unitName");
			sql2BeanMap.put("@tx_unit_2", "subUnitName");
			sql2BeanMap.put("@tx_search_Date_Of_Birth", "searchDateOfBirth");
		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_customer_key", "customerIdKey");
			rs2BeanMap.put("id_customer_ver", "idCustomerVer");

			rs2BeanMap.put("tx_customer_id", "customerId");

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

			rs2BeanMap.put("tx_district", "officeDistrict");
			rs2BeanMap.put("tx_division", "officeDivision");
			rs2BeanMap.put("tx_unit_1", "unitName");
			rs2BeanMap.put("tx_unit_2", "subUnitName");
		}
		return rs2BeanMap;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
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

	public String getCustomerType() {
		return customerType;
	}

	public void setCustomerType(String customerType) {
		this.customerType = customerType;
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

	public String getBpNo() {
		return bpNo;
	}

	public void setBpNo(String bpNo) {
		this.bpNo = bpNo;
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

	public String getMaritalStatus() {
		return maritalStatus;
	}

	public void setMaritalStatus(String maritalStatus) {
		this.maritalStatus = maritalStatus;
	}

	public String getHouseOwnership() {
		return houseOwnership;
	}

	public void setHouseOwnership(String houseOwnership) {
		this.houseOwnership = houseOwnership;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Integer getCustomerIdKey() {
		return customerIdKey;
	}

	public void setCustomerIdKey(Integer customerIdKey) {
		this.customerIdKey = customerIdKey;
	}

	public String getCif() {
		return cif;
	}

	public void setCif(String cif) {
		this.cif = cif;
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

	public String getOfficeAddr() {
		return officeAddr;
	}

	public void setOfficeAddr(String officeAddr) {
		this.officeAddr = officeAddr;
	}

	public String getAge() {
		return age;
	}

	public void setAge(String age) {
		this.age = age;
	}

	public String getPermanentAddr() {
		return permanentAddr;
	}

	public void setPermanentAddr(String permanentAddr) {
		this.permanentAddr = permanentAddr;
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

	public String getEmerPhone() {
		return emerPhone;
	}

	public void setEmerPhone(String emerPhone) {
		this.emerPhone = emerPhone;
	}

	public Integer getIdCustomerVer() {
		return idCustomerVer;
	}

	public void setIdCustomerVer(Integer idCustomerVer) {
		this.idCustomerVer = idCustomerVer;
	}

	public String getIsMatchedNid() {
		return isMatchedNid;
	}

	public void setIsMatchedNid(String isMatchedNid) {
		this.isMatchedNid = isMatchedNid;
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

	public String getSearchByStr() {
		return searchByStr;
	}

	public void setSearchByStr(String searchByStr) {
		this.searchByStr = searchByStr;
	}

	public String getAlternativeMobile() {
		return alternativeMobile;
	}

	public void setAlternativeMobile(String alternativeMobile) {
		this.alternativeMobile = alternativeMobile;
	}

	public String getOfficeId() {
		return officeId;
	}

	public void setOfficeId(String officeId) {
		this.officeId = officeId;
	}

	public String getStaffBranchName() {
		return staffBranchName;
	}

	public void setStaffBranchName(String staffBranchName) {
		this.staffBranchName = staffBranchName;
	}

	@Override
	public String toString() {
		return "Customer [customerIdKey=" + customerIdKey + ", idCustomerVer=" + idCustomerVer + ", customerId=" + customerId + ", customerType="
		        + customerType + ", bpNo=" + bpNo + ", customerName=" + customerName + ", designation=" + designation + ", currentPlaceofPosting="
		        + currentPlaceofPosting + ", dateOfBirth=" + dateOfBirth + ", age=" + age + ", joiningDate=" + joiningDate + ", serviceLength="
		        + serviceLength + ", retirementDate=" + retirementDate + ", remainingYearOfRetirement=" + remainingYearOfRetirement
		        + ", houseOwnership=" + houseOwnership + ", permanentAddr=" + permanentAddr + ", officeAddr=" + officeAddr + ", nid=" + nid + ", tin="
		        + tin + ", salaryDisbursedWithCBBL=" + salaryDisbursedWithCBBL + ", accountNo=" + accountNo + ", cif=" + cif + ", maritalStatus="
		        + maritalStatus + ", motherName=" + motherName + ", fatherName=" + fatherName + ", spouse=" + spouse + ", isMatchedNid="
		        + isMatchedNid + ", phone=" + phone + ", mobile=" + mobile + ", alternativeMobile=" + alternativeMobile + ", emerPhone=" + emerPhone
		        + ", officeId=" + officeId + ", idCustomerTypeKey=" + idCustomerTypeKey + ", banglaNameOfBorrower=" + banglaNameOfBorrower
		        + ", searchByStr=" + searchByStr + "]";
	}

	public String getOfficeDistrict() {
		return officeDistrict;
	}

	public void setOfficeDistrict(String officeDistrict) {
		this.officeDistrict = officeDistrict;
	}

	public String getOfficeDivision() {
		return officeDivision;
	}

	public void setOfficeDivision(String officeDivision) {
		this.officeDivision = officeDivision;
	}

	public String getUnitName() {
		return unitName;
	}

	public void setUnitName(String unitName) {
		this.unitName = unitName;
	}

	public String getSubUnitName() {
		return subUnitName;
	}

	public void setSubUnitName(String subUnitName) {
		this.subUnitName = subUnitName;
	}

	public String getSearchDateOfBirth() {
		return searchDateOfBirth;
	}

	public void setSearchDateOfBirth(String searchDateOfBirth) {
		this.searchDateOfBirth = searchDateOfBirth;
	}	

}
