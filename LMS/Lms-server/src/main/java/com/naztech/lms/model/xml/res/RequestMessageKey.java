package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlElement;

public class RequestMessageKey {
	@XmlElement
	private String RequestUUID;
	@XmlElement
	private String ServiceRequestId;
	@XmlElement
	private String ServiceRequestVersion;
	@XmlElement
	private String ChannelId;

	// Getter Methods

	public String getRequestUUID() {
		return RequestUUID;
	}

	public String getServiceRequestId() {
		return ServiceRequestId;
	}

	public String getServiceRequestVersion() {
		return ServiceRequestVersion;
	}

	public String getChannelId() {
		return ChannelId;
	}

	// Setter Methods

	public void setRequestUUID(String RequestUUID) {
		this.RequestUUID = RequestUUID;
	}

	public void setServiceRequestId(String ServiceRequestId) {
		this.ServiceRequestId = ServiceRequestId;
	}

	public void setServiceRequestVersion(String ServiceRequestVersion) {
		this.ServiceRequestVersion = ServiceRequestVersion;
	}

	public void setChannelId(String ChannelId) {
		this.ChannelId = ChannelId;
	}
}