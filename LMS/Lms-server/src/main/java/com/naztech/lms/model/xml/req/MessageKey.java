package com.naztech.lms.model.xml.req;

import javax.xml.bind.annotation.XmlElement;

public class MessageKey {

	private String RequestUUID;

	private String ServiceRequestId;

	private String ServiceRequestVersion;

	private String ChannelId;

	private String LanguageId;

	public String getRequestUUID() {
		return RequestUUID;
	}

	@XmlElement(name = "RequestUUID")
	public void setRequestUUID(String requestUUID) {
		RequestUUID = requestUUID;
	}

	public String getServiceRequestId() {
		return ServiceRequestId;
	}

	@XmlElement(name = "ServiceRequestId")
	public void setServiceRequestId(String serviceRequestId) {
		ServiceRequestId = serviceRequestId;
	}

	public String getServiceRequestVersion() {
		return ServiceRequestVersion;
	}

	@XmlElement(name = "ServiceRequestVersion")
	public void setServiceRequestVersion(String serviceRequestVersion) {
		ServiceRequestVersion = serviceRequestVersion;
	}

	public String getChannelId() {
		return ChannelId;
	}

	@XmlElement(name = "ChannelId")
	public void setChannelId(String channelId) {
		ChannelId = channelId;
	}

	public String getLanguageId() {
		return LanguageId;
	}

	@XmlElement(name = "LanguageId")
	public void setLanguageId(String languageId) {
		LanguageId = languageId;
	}

}