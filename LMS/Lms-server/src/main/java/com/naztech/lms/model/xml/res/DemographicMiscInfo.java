package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "DemographicMiscInfo")
public class DemographicMiscInfo {
	private String Type;
	private String CustomField1;
	private String CustomField2;
	private String CustomField3;
	private String CustomField4;
	private String CustomField5;
	private String MiscellaneousID;
	private String StrText10;
	private String StrText4;

	// Getter Methods

	public String getType() {
		return Type;
	}

	public String getCustomField1() {
		return CustomField1;
	}

	public String getCustomField2() {
		return CustomField2;
	}

	public String getCustomField3() {
		return CustomField3;
	}

	public String getCustomField4() {
		return CustomField4;
	}

	public String getCustomField5() {
		return CustomField5;
	}

	public String getMiscellaneousID() {
		return MiscellaneousID;
	}

	public String getStrText10() {
		return StrText10;
	}

	public String getStrText4() {
		return StrText4;
	}

	// Setter Methods

	public void setType(String Type) {
		this.Type = Type;
	}

	public void setCustomField1(String CustomField1) {
		this.CustomField1 = CustomField1;
	}

	public void setCustomField2(String CustomField2) {
		this.CustomField2 = CustomField2;
	}

	public void setCustomField3(String CustomField3) {
		this.CustomField3 = CustomField3;
	}

	public void setCustomField4(String CustomField4) {
		this.CustomField4 = CustomField4;
	}

	public void setCustomField5(String CustomField5) {
		this.CustomField5 = CustomField5;
	}

	public void setMiscellaneousID(String MiscellaneousID) {
		this.MiscellaneousID = MiscellaneousID;
	}

	public void setStrText10(String StrText10) {
		this.StrText10 = StrText10;
	}

	public void setStrText4(String StrText4) {
		this.StrText4 = StrText4;
	}
}