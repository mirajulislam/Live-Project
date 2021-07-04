package com.naztech.lms.model.xml.req;

import javax.xml.bind.annotation.XmlElement;

public class Security {

	Token Token;

	private String FICertToken;

	private String RealUserLoginSessionId;

	private String RealUser;

	private String RealUserPwd;

	private String SSOTransferToken;

	public Token getToken() {
		return Token;
	}

	@XmlElement(name = "Token")
	public void setToken(Token token) {
		Token = token;
	}

	public String getFICertToken() {
		return FICertToken;
	}

	public void setFICertToken(String fICertToken) {
		FICertToken = fICertToken;
	}

	public String getRealUserLoginSessionId() {
		return RealUserLoginSessionId;
	}

	@XmlElement(name = "RealUserLoginSessionId")
	public void setRealUserLoginSessionId(String realUserLoginSessionId) {
		RealUserLoginSessionId = realUserLoginSessionId;
	}

	public String getRealUser() {
		return RealUser;
	}

	@XmlElement(name = "RealUser")
	public void setRealUser(String realUser) {
		RealUser = realUser;
	}

	public String getRealUserPwd() {
		return RealUserPwd;
	}

	@XmlElement(name = "RealUserPwd")
	public void setRealUserPwd(String realUserPwd) {
		RealUserPwd = realUserPwd;
	}

	public String getSSOTransferToken() {
		return SSOTransferToken;
	}

	public void setSSOTransferToken(String sSOTransferToken) {
		SSOTransferToken = sSOTransferToken;
	}

}