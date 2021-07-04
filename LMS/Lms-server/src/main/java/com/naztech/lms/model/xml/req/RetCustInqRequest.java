package com.naztech.lms.model.xml.req;

import javax.xml.bind.annotation.XmlElement;

public class RetCustInqRequest {

	RetCustInqRq RetCustInqRq;

	public RetCustInqRq getRetCustInqRq() {
		return RetCustInqRq;
	}

	@XmlElement(name = "RetCustInqRq")
	public void setRetCustInqRq(RetCustInqRq retCustInqRq) {
		RetCustInqRq = retCustInqRq;
	}

}