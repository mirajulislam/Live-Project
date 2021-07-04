package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "RetCustInqResponse")
public class RetCustInqResponse {
	@XmlElement
	RetCustInqRs RetCustInqRs;
	@XmlElement
	private String RetCustInq_CustomData;

	public RetCustInqRs getRetCustInqRs() {
		return RetCustInqRs;
	}

	public void setRetCustInqRs(RetCustInqRs retCustInqRs) {
		RetCustInqRs = retCustInqRs;
	}

	public String getRetCustInq_CustomData() {
		return RetCustInq_CustomData;
	}

	public void setRetCustInq_CustomData(String retCustInq_CustomData) {
		RetCustInq_CustomData = retCustInq_CustomData;
	}

}