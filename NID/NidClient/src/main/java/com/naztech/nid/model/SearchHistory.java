package com.naztech.nid.model;

public class SearchHistory {

	private String nid;
	private String dob;
	private String requestDate; //requestTime;
	private String extractTime; //fatchTime;
	private Integer nidSource;
	private Integer success;

	public String getNid() {
		return nid;
	}

	public void setNid(String nid) {
		this.nid = nid;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(String requestDate) {
		this.requestDate = requestDate;
	}

	public String getExtractTime() {
		return extractTime;
	}

	public void setExtractTime(String extractTime) {
		this.extractTime = extractTime;
	}
	
	public Integer getNidSource() {
		return nidSource;
	}

	public void setNidSource(Integer nidSource) {
		this.nidSource = nidSource;
	}

	public Integer getSuccess() {
		return success;
	}

	public void setSuccess(Integer success) {
		this.success = success;
	}

	@Override
	public String toString() {
		return "SearchHistory [nid=" + nid + ", dob=" + dob + ", requestDate=" + requestDate + ", extractTime=" + extractTime + ", nidSource="
		        + getNidSource() + ", success=" + getSuccess() + "]";
	}

}
