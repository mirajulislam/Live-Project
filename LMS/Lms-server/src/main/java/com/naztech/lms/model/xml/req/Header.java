package com.naztech.lms.model.xml.req;

import javax.xml.bind.annotation.XmlElement;

public class Header {

	RequestHeader RequestHeader;

	// Getter Methods

	public RequestHeader getRequestHeader() {
		return RequestHeader;
	}

	// Setter Methods
	@XmlElement(name = "RequestHeader")
	public void setRequestHeader(RequestHeader RequestHeader) {
		this.RequestHeader = RequestHeader;
	}
}