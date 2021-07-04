package com.naztech.lms.model.xml.req;

import javax.xml.bind.annotation.XmlElement;

public class Body {

	RetCustInqRequest RetCustInqRequest;

	public RetCustInqRequest getRetCustInqRequest() {
		return RetCustInqRequest;
	}

	@XmlElement(name = "RetCustInqRequest")
	public void setRetCustInqRequest(RetCustInqRequest retCustInqRequest) {
		RetCustInqRequest = retCustInqRequest;
	}

}