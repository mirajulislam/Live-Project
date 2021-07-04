package com.naztech.lms.model;

public class ResponseStatus {

	private String status;
	private String statusText;

	public ResponseStatus(String status, String statusText) {
		this.status = status;
		this.statusText = statusText;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStatusText() {
		return statusText;
	}

	public void setStatusText(String statusText) {
		this.statusText = statusText;
	}

}
