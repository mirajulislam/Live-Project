package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlElement;

public class Body {
	@XmlElement
	RetCustInqResponse RetCustInqResponse;

	public RetCustInqResponse getRetCustInqResponse() {
		return RetCustInqResponse;
	}

	public void setRetCustInqResponse(RetCustInqResponse retCustInqResponse) {
		RetCustInqResponse = retCustInqResponse;
	}

}