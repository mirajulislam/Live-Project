package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "PrefMiscInqDtls")
public class PrefMiscInqDtls {
	private String MiscellaneousID;
	private String dbFloat1;
	private String dbFloat2;
	private String dbFloat3;
	private String dbFloat4;
	private String dbFloat5;
	private String dtDate1;
	private String strText10;
	private String Type;

	// Getter Methods

	public String getMiscellaneousID() {
		return MiscellaneousID;
	}

	public String getDbFloat1() {
		return dbFloat1;
	}

	public String getDbFloat2() {
		return dbFloat2;
	}

	public String getDbFloat3() {
		return dbFloat3;
	}

	public String getDbFloat4() {
		return dbFloat4;
	}

	public String getDbFloat5() {
		return dbFloat5;
	}

	public String getDtDate1() {
		return dtDate1;
	}

	public String getStrText10() {
		return strText10;
	}

	public String getType() {
		return Type;
	}

	// Setter Methods

	public void setMiscellaneousID(String MiscellaneousID) {
		this.MiscellaneousID = MiscellaneousID;
	}

	public void setDbFloat1(String dbFloat1) {
		this.dbFloat1 = dbFloat1;
	}

	public void setDbFloat2(String dbFloat2) {
		this.dbFloat2 = dbFloat2;
	}

	public void setDbFloat3(String dbFloat3) {
		this.dbFloat3 = dbFloat3;
	}

	public void setDbFloat4(String dbFloat4) {
		this.dbFloat4 = dbFloat4;
	}

	public void setDbFloat5(String dbFloat5) {
		this.dbFloat5 = dbFloat5;
	}

	public void setDtDate1(String dtDate1) {
		this.dtDate1 = dtDate1;
	}

	public void setStrText10(String strText10) {
		this.strText10 = strText10;
	}

	public void setType(String Type) {
		this.Type = Type;
	}
}