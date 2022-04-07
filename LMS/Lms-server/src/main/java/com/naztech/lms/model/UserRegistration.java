package com.naztech.lms.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.naztech.lms.model.BaseModel;

public class UserRegistration extends BaseModel {
	
	List<UserDocument> userDocumentList;
	private Integer userLoginIdKey;
	private Integer userLoginVar;
	
	private String customerId;
	private String bpNo;
	private String nid;
	private String mobile;
	private String userName;
	private String password;
	private String imeiNumber;
	private String tin;
	private Date dateOfBirth;
	private String accountNo;

	private String unId;
	private Integer userVersion;
	private String firstName;
	private String lastName;
	private String customerName;
	private String userAlias;
	private String newPassword;
	private String legalEntityType;
	private Integer legalEntityTypeId;
	private Integer primaryGroupId;
	private String primaryGroupName;
	private Integer isInVacation;
	private Integer isDisabled;
	private Integer isLoggedIn;
	private Integer isFirstLogin;
	private String email;
	private Integer isAllowLogin;
	private String legalEntityId;
	private String cbsBranchId;
	private String securityQuestion1;
	private String securityQuestion2;
	private String securityQuestion3;
	private String securityAnswer1;
	private String securityAnswer2;
	private String securityAnswer3;
	// this is cbs user id if need
	private String cbsUserId;
	private String designation;
	private Integer userId;
	private Integer userVar;
	
	private String successStatus;
	private Integer otpNumber;
	
	private String appName;
	
	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			sql2BeanMap.putAll(getSql2BaseBeanMap());
			
			sql2BeanMap.put("@id_user_login_key", "userLoginIdKey");
			sql2BeanMap.put("@id_user_login_var", "userLoginVar");
			
			sql2BeanMap.put("@tx_customer_id", "customerId");
			sql2BeanMap.put("@tx_bp_no", "bpNo");
			sql2BeanMap.put("@tx_customer_name", "customerName");
			sql2BeanMap.put("@tx_designation", "designation");
			sql2BeanMap.put("@tx_nid", "nid");
			sql2BeanMap.put("@tx_mobile", "mobile");
			sql2BeanMap.put("@tx_login_name", "userName");
			sql2BeanMap.put("@tx_password", "password");
			sql2BeanMap.put("@tx_imei_number", "imeiNumber");
			sql2BeanMap.put("@tx_first_name", "firstName");
			sql2BeanMap.put("@tx_last_name", "lastName");
			sql2BeanMap.put("@is_in_vacation", "isInVacation");
			sql2BeanMap.put("@tx_email", "email");
			sql2BeanMap.put("@tx_success_status", "successStatus");
			sql2BeanMap.put("@id_user_key", "userId");
			sql2BeanMap.put("@id_user_ver", "userVar");
			sql2BeanMap.put("@is_allow_login", "isAllowLogin");
			sql2BeanMap.put("@is_first_login", "isFirstLogin");
			sql2BeanMap.put("@is_disabled", "isDisabled");
			sql2BeanMap.put("@tx_user_alias", "userAlias");
			sql2BeanMap.put("@id_group_key", "primaryGroupId");
			sql2BeanMap.put("@id_legal_entity_key", "legalEntityTypeId");
			sql2BeanMap.put("@tx_app_name", "appName");
			sql2BeanMap.put("@tx_security_question1","securityQuestion1");
			sql2BeanMap.put("@tx_security_question2","securityQuestion2");
			sql2BeanMap.put("@tx_security_question3","securityQuestion3");
			sql2BeanMap.put("@tx_security_answer1","securityAnswer1");
			sql2BeanMap.put("@tx_security_answer2","securityAnswer2");
			sql2BeanMap.put("@tx_security_answer3","securityAnswer3");
			sql2BeanMap.put("@dtt_date_of_birth", "dateOfBirth");
			sql2BeanMap.put("@tx_tin", "tin");
		}
		return sql2BeanMap;
	}
	
	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());
			rs2BeanMap.put("id_user_login_key", "userLoginIdKey");
			rs2BeanMap.put("id_user_login_var", "userLoginVar");
			
			rs2BeanMap.put("tx_customer_id", "customerId");
			rs2BeanMap.put("tx_bp_no", "bpNo");
			rs2BeanMap.put("tx_customer_name", "customerName");
			rs2BeanMap.put("tx_designation", "designation");
			rs2BeanMap.put("tx_nid", "nid");
			rs2BeanMap.put("tx_mobile", "mobile");
			rs2BeanMap.put("tx_login_name", "userName");
			rs2BeanMap.put("tx_password", "password");
			rs2BeanMap.put("tx_imei_number", "imeiNumber");
			rs2BeanMap.put("tx_first_name", "firstName");
			rs2BeanMap.put("tx_last_name", "lastName");
			rs2BeanMap.put("is_in_vacation", "isInVacation");
			rs2BeanMap.put("is_first_login", "isFirstLogin");
			rs2BeanMap.put("tx_email", "email");
			rs2BeanMap.put("tx_success_status", "successStatus");
			rs2BeanMap.put("id_user_key", "userId");
			rs2BeanMap.put("id_user_ver", "userVar");
			rs2BeanMap.put("is_allow_login", "isAllowLogin");
			rs2BeanMap.put("is_disabled", "isDisabled");
			rs2BeanMap.put("tx_user_alias", "userAlias");
			rs2BeanMap.put("id_group_key", "primaryGroupId");
			rs2BeanMap.put("id_legal_entity_key", "legalEntityTypeId");
			rs2BeanMap.put("tx_security_question1","securityQuestion1");
			rs2BeanMap.put("tx_security_question2","securityQuestion2");
			rs2BeanMap.put("tx_security_question3","securityQuestion3");
			rs2BeanMap.put("tx_security_answer1","securityAnswer1");
			rs2BeanMap.put("tx_security_answer2","securityAnswer2");
			rs2BeanMap.put("tx_security_answer3","securityAnswer3");
			rs2BeanMap.put("dtt_date_of_birth", "dateOfBirth");
			rs2BeanMap.put("tx_tin", "tin");
		}
		return rs2BeanMap;
	}
	
	public Integer getUserLoginIdKey() {
		return userLoginIdKey;
	}
	public void setUserLoginIdKey(Integer userLoginIdKey) {
		this.userLoginIdKey = userLoginIdKey;
	}
	public Integer getUserLoginVar() {
		return userLoginVar;
	}
	public void setUserLoginVar(Integer userLoginVar) {
		this.userLoginVar = userLoginVar;
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
	public String getNid() {
		return nid;
	}
	public void setNid(String nid) {
		this.nid = nid;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getImeiNumber() {
		return imeiNumber;
	}
	public void setImeiNumber(String imeiNumber) {
		this.imeiNumber = imeiNumber;
	}
	public String getUnId() {
		return unId;
	}
	public void setUnId(String unId) {
		this.unId = unId;
	}
	public Integer getUserVersion() {
		return userVersion;
	}
	public void setUserVersion(Integer userVersion) {
		this.userVersion = userVersion;
	}
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getUserAlias() {
		return userAlias;
	}
	public void setUserAlias(String userAlias) {
		this.userAlias = userAlias;
	}
	public String getNewPassword() {
		return newPassword;
	}
	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}
	public String getLegalEntityType() {
		return legalEntityType;
	}
	public void setLegalEntityType(String legalEntityType) {
		this.legalEntityType = legalEntityType;
	}
	public Integer getLegalEntityTypeId() {
		return legalEntityTypeId;
	}
	public void setLegalEntityTypeId(Integer legalEntityTypeId) {
		this.legalEntityTypeId = legalEntityTypeId;
	}
	public Integer getPrimaryGroupId() {
		return primaryGroupId;
	}
	public void setPrimaryGroupId(Integer primaryGroupId) {
		this.primaryGroupId = primaryGroupId;
	}
	public String getPrimaryGroupName() {
		return primaryGroupName;
	}
	public void setPrimaryGroupName(String primaryGroupName) {
		this.primaryGroupName = primaryGroupName;
	}
	public Integer getIsInVacation() {
		return isInVacation;
	}
	public void setIsInVacation(Integer isInVacation) {
		this.isInVacation = isInVacation;
	}
	public Integer getIsDisabled() {
		return isDisabled;
	}
	public void setIsDisabled(Integer isDisabled) {
		this.isDisabled = isDisabled;
	}
	public Integer getIsLoggedIn() {
		return isLoggedIn;
	}
	public void setIsLoggedIn(Integer isLoggedIn) {
		this.isLoggedIn = isLoggedIn;
	}
	public Integer getIsFirstLogin() {
		return isFirstLogin;
	}
	public void setIsFirstLogin(Integer isFirstLogin) {
		this.isFirstLogin = isFirstLogin;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public Integer getIsAllowLogin() {
		return isAllowLogin;
	}
	public void setIsAllowLogin(Integer isAllowLogin) {
		this.isAllowLogin = isAllowLogin;
	}
	public String getLegalEntityId() {
		return legalEntityId;
	}
	public void setLegalEntityId(String legalEntityId) {
		this.legalEntityId = legalEntityId;
	}
	public String getCbsBranchId() {
		return cbsBranchId;
	}
	public void setCbsBranchId(String cbsBranchId) {
		this.cbsBranchId = cbsBranchId;
	}
	public String getCbsUserId() {
		return cbsUserId;
	}
	public void setCbsUserId(String cbsUserId) {
		this.cbsUserId = cbsUserId;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	
	public String getSuccessStatus() {
		return successStatus;
	}

	public void setSuccessStatus(String successStatus) {
		this.successStatus = successStatus;
	}

	public Integer getOtpNumber() {
		return otpNumber;
	}

	public void setOtpNumber(Integer otpNumber) {
		this.otpNumber = otpNumber;
	}	

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	

	public Integer getUserVar() {
		return userVar;
	}

	public void setUserVar(Integer userVar) {
		this.userVar = userVar;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public String getSecurityQuestion1() {
		return securityQuestion1;
	}

	public void setSecurityQuestion1(String securityQuestion1) {
		this.securityQuestion1 = securityQuestion1;
	}

	public String getSecurityQuestion2() {
		return securityQuestion2;
	}

	public void setSecurityQuestion2(String securityQuestion2) {
		this.securityQuestion2 = securityQuestion2;
	}

	public String getSecurityQuestion3() {
		return securityQuestion3;
	}

	public void setSecurityQuestion3(String securityQuestion3) {
		this.securityQuestion3 = securityQuestion3;
	}

	public String getSecurityAnswer1() {
		return securityAnswer1;
	}

	public void setSecurityAnswer1(String securityAnswer1) {
		this.securityAnswer1 = securityAnswer1;
	}

	public String getSecurityAnswer2() {
		return securityAnswer2;
	}

	public void setSecurityAnswer2(String securityAnswer2) {
		this.securityAnswer2 = securityAnswer2;
	}

	public String getSecurityAnswer3() {
		return securityAnswer3;
	}

	public void setSecurityAnswer3(String securityAnswer3) {
		this.securityAnswer3 = securityAnswer3;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public List<UserDocument> getUserDocumentList() {
		return userDocumentList;
	}

	public void setUserDocumentList(List<UserDocument> userDocumentList) {
		this.userDocumentList = userDocumentList;
	}

	public Date getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(Date dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getTin() {
		return tin;
	}

	public void setTin(String tin) {
		this.tin = tin;
	}

	public String getAccountNo() {
		return accountNo;
	}

	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}

	@Override
	public String toString() {
		return "UserRegistration [userLoginIdKey=" + userLoginIdKey + ", userLoginVar=" + userLoginVar + ", customerId="
				+ customerId + ", bpNo=" + bpNo + ", nid=" + nid + ", mobile=" + mobile + ", userName=" + userName
				+ ", password=" + password + ", imeiNumber=" + imeiNumber + ", unId=" + unId + ", userVersion="
				+ userVersion + ", firstName=" + firstName + ", lastName=" + lastName + ", userAlias=" + userAlias
				+ ", newPassword=" + newPassword + ", legalEntityType=" + legalEntityType + ", legalEntityTypeId="
				+ legalEntityTypeId + ", primaryGroupId=" + primaryGroupId + ", primaryGroupName=" + primaryGroupName
				+ ", isInVacation=" + isInVacation + ", isDisabled=" + isDisabled + ", isLoggedIn=" + isLoggedIn
				+ ", isFirstLogin=" + isFirstLogin + ", email=" + email + ", isAllowLogin=" + isAllowLogin
				+ ", legalEntityId=" + legalEntityId + ", cbsBranchId=" + cbsBranchId + ", cbsUserId=" + cbsUserId
				+ ", designation=" + designation + ", userId=" + userId + ", userVar=" + userVar + ", successStatus="
				+ successStatus + ", otpNumber=" + otpNumber + ", appName=" + appName + "]";
	}

	
	
}
