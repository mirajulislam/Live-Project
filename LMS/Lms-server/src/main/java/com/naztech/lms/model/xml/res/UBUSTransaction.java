package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "UBUSTransaction")
public class UBUSTransaction {
	private String Id;
	private String Status;

	// Getter Methods

	public String getId() {
		return Id;
	}

	public String getStatus() {
		return Status;
	}

	// Setter Methods

	public void setId(String Id) {
		this.Id = Id;
	}

	public void setStatus(String Status) {
		this.Status = Status;
	}
}