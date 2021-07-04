package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "DemographicDtls")
public class DemographicDtls {
	DemographicMiscInfo DemographicMiscInfo;
	private String DonotCallFlag;
	private String DonotMailFlag;
	private String DonotSendEMailFlag;
	private String NameOfEmployer;
	private String EmploymentStatus;
	private String MaritalStatus;
	private String Nationality;
	private String MaritalStatusCode;
	private String NationalityCode;
	private String PrefContactTime;
	private String PrefDayTimeContactNum;
	private String PrefDayTimeContactNumArea;
	private String PrefDayTimeContactNumCountry;
	private String PrefDayTimeContactNumLocal;
	private String ResidenceCountry;
	private String ResidenceCountryCode;
	private String Tax_Rate_Table_Code;

	public DemographicMiscInfo getDemographicMiscInfo() {
		return DemographicMiscInfo;
	}

	public void setDemographicMiscInfo(DemographicMiscInfo demographicMiscInfo) {
		DemographicMiscInfo = demographicMiscInfo;
	}

	public String getDonotCallFlag() {
		return DonotCallFlag;
	}

	public void setDonotCallFlag(String donotCallFlag) {
		DonotCallFlag = donotCallFlag;
	}

	public String getDonotMailFlag() {
		return DonotMailFlag;
	}

	public void setDonotMailFlag(String donotMailFlag) {
		DonotMailFlag = donotMailFlag;
	}

	public String getDonotSendEMailFlag() {
		return DonotSendEMailFlag;
	}

	public void setDonotSendEMailFlag(String donotSendEMailFlag) {
		DonotSendEMailFlag = donotSendEMailFlag;
	}

	public String getNameOfEmployer() {
		return NameOfEmployer;
	}

	public void setNameOfEmployer(String nameOfEmployer) {
		NameOfEmployer = nameOfEmployer;
	}

	public String getEmploymentStatus() {
		return EmploymentStatus;
	}

	public void setEmploymentStatus(String employmentStatus) {
		EmploymentStatus = employmentStatus;
	}

	public String getMaritalStatus() {
		return MaritalStatus;
	}

	public void setMaritalStatus(String maritalStatus) {
		MaritalStatus = maritalStatus;
	}

	public String getNationality() {
		return Nationality;
	}

	public void setNationality(String nationality) {
		Nationality = nationality;
	}

	public String getMaritalStatusCode() {
		return MaritalStatusCode;
	}

	public void setMaritalStatusCode(String maritalStatusCode) {
		MaritalStatusCode = maritalStatusCode;
	}

	public String getNationalityCode() {
		return NationalityCode;
	}

	public void setNationalityCode(String nationalityCode) {
		NationalityCode = nationalityCode;
	}

	public String getPrefContactTime() {
		return PrefContactTime;
	}

	public void setPrefContactTime(String prefContactTime) {
		PrefContactTime = prefContactTime;
	}

	public String getPrefDayTimeContactNum() {
		return PrefDayTimeContactNum;
	}

	public void setPrefDayTimeContactNum(String prefDayTimeContactNum) {
		PrefDayTimeContactNum = prefDayTimeContactNum;
	}

	public String getPrefDayTimeContactNumArea() {
		return PrefDayTimeContactNumArea;
	}

	public void setPrefDayTimeContactNumArea(String prefDayTimeContactNumArea) {
		PrefDayTimeContactNumArea = prefDayTimeContactNumArea;
	}

	public String getPrefDayTimeContactNumCountry() {
		return PrefDayTimeContactNumCountry;
	}

	public void setPrefDayTimeContactNumCountry(String prefDayTimeContactNumCountry) {
		PrefDayTimeContactNumCountry = prefDayTimeContactNumCountry;
	}

	public String getPrefDayTimeContactNumLocal() {
		return PrefDayTimeContactNumLocal;
	}

	public void setPrefDayTimeContactNumLocal(String prefDayTimeContactNumLocal) {
		PrefDayTimeContactNumLocal = prefDayTimeContactNumLocal;
	}

	public String getResidenceCountry() {
		return ResidenceCountry;
	}

	public void setResidenceCountry(String residenceCountry) {
		ResidenceCountry = residenceCountry;
	}

	public String getResidenceCountryCode() {
		return ResidenceCountryCode;
	}

	public void setResidenceCountryCode(String residenceCountryCode) {
		ResidenceCountryCode = residenceCountryCode;
	}

	public String getTax_Rate_Table_Code() {
		return Tax_Rate_Table_Code;
	}

	public void setTax_Rate_Table_Code(String tax_Rate_Table_Code) {
		Tax_Rate_Table_Code = tax_Rate_Table_Code;
	}

}