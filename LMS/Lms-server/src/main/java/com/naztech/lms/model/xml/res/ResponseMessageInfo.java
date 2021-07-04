package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "ResponseMessageInfo")
public class ResponseMessageInfo {
	private String BankId;
	private String TimeZone;
	private String MessageDateTime;

	// Getter Methods

	public String getBankId() {
		return BankId;
	}

	public String getTimeZone() {
		return TimeZone;
	}

	public String getMessageDateTime() {
		return MessageDateTime;
	}

	// Setter Methods

	public void setBankId(String BankId) {
		this.BankId = BankId;
	}

	public void setTimeZone(String TimeZone) {
		this.TimeZone = TimeZone;
	}

	public void setMessageDateTime(String MessageDateTime) {
		this.MessageDateTime = MessageDateTime;
	}
}