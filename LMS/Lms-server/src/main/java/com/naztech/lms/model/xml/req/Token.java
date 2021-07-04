package com.naztech.lms.model.xml.req;

import javax.xml.bind.annotation.XmlElement;

public class Token {

	PasswordToken PasswordToken;

	public PasswordToken getPasswordToken() {
		return PasswordToken;
	}

	@XmlElement(name = "PasswordToken")
	public void setPasswordToken(PasswordToken passwordToken) {
		PasswordToken = passwordToken;
	}

}