package com.naztech.lms.model.xml.req;

import javax.xml.bind.annotation.XmlElement;

public class RequestHeader {

	MessageKey MessageKey;

	RequestMessageInfo RequestMessageInfo;

	Security Security;

	public MessageKey getMessageKey() {
		return MessageKey;
	}

	@XmlElement(name = "MessageKey")
	public void setMessageKey(MessageKey messageKey) {
		MessageKey = messageKey;
	}

	public RequestMessageInfo getRequestMessageInfo() {
		return RequestMessageInfo;
	}

	@XmlElement(name = "RequestMessageInfo")
	public void setRequestMessageInfo(RequestMessageInfo requestMessageInfo) {
		RequestMessageInfo = requestMessageInfo;
	}

	public Security getSecurity() {
		return Security;
	}

	@XmlElement(name = "Security")
	public void setSecurity(Security security) {
		Security = security;
	}

}