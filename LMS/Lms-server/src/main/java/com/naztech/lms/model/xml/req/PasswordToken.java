package com.naztech.lms.model.xml.req;

import javax.xml.bind.annotation.XmlElement;

public class PasswordToken {

	private String UserId;

	private String Password;

	// Getter Methods

	public String getUserId() {
		return UserId;
	}

	public String getPassword() {
		return Password;
	}

	// Setter Methods
	@XmlElement(name = "UserId")
	public void setUserId(String UserId) {
		this.UserId = UserId;
	}

	@XmlElement(name = "Password")
	public void setPassword(String Password) {
		this.Password = Password;
	}
}