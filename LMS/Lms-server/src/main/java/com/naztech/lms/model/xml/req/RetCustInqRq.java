package com.naztech.lms.model.xml.req;

import javax.xml.bind.annotation.XmlElement;

public class RetCustInqRq {

	private String CustId;

	// Getter Methods

	public String getCustId() {
		return CustId;
	}

	// Setter Methods
	@XmlElement(name = "CustId")
	public void setCustId(String CustId) {
		this.CustId = CustId;
	}
}