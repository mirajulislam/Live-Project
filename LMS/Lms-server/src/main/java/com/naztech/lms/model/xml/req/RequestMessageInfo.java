package com.naztech.lms.model.xml.req;

import javax.xml.bind.annotation.XmlElement;

public class RequestMessageInfo {

	private String BankId;

	private String TimeZone;

	private String EntityId;

	private String EntityType;

	private String ArmCorrelationId;

	private String MessageDateTime;

	public String getBankId() {
		return BankId;
	}

	@XmlElement(name = "BankId")
	public void setBankId(String bankId) {
		BankId = bankId;
	}

	public String getTimeZone() {
		return TimeZone;
	}

	@XmlElement(name = "TimeZone")
	public void setTimeZone(String timeZone) {
		TimeZone = timeZone;
	}

	public String getEntityId() {
		return EntityId;
	}

	@XmlElement(name = "EntityId")
	public void setEntityId(String entityId) {
		EntityId = entityId;
	}

	public String getEntityType() {
		return EntityType;
	}

	@XmlElement(name = "EntityType")
	public void setEntityType(String entityType) {
		EntityType = entityType;
	}

	public String getArmCorrelationId() {
		return ArmCorrelationId;
	}

	@XmlElement(name = "ArmCorrelationId")
	public void setArmCorrelationId(String armCorrelationId) {
		ArmCorrelationId = armCorrelationId;
	}

	public String getMessageDateTime() {
		return MessageDateTime;
	}

	@XmlElement(name = "MessageDateTime")
	public void setMessageDateTime(String messageDateTime) {
		MessageDateTime = messageDateTime;
	}

}