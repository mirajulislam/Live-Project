package com.naztech.lms.model.xml.req;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "FIXML")
public class ReqFIXML {

	Header Header;

	Body Body;

	public Header getHeader() {
		return Header;
	}

	@XmlElement(name = "Header")
	public void setHeader(Header header) {
		Header = header;
	}

	public Body getBody() {
		return Body;
	}

	@XmlElement(name = "Body")
	public void setBody(Body body) {
		Body = body;
	}

	// Getter Methods

}