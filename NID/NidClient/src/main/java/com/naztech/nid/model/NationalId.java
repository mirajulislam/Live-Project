package com.naztech.nid.model;

import java.util.Date;

public class NationalId {

	private Integer nidId;
	private Integer nidVer;
	private Integer userModKey;

	private String nid;
	private String dob;
	private String name;
	private String bloodGroup;
	private String addrLine1;
	private String addrLine2;
	private String postOffice;
	private Integer postCode;
	private String policeStation;
	private String district;
	private String division;

	private Date nidIssueDate;
	private Date extractTime;
	private Date requestDate;
	private Date responseDate;
	private Integer matchPercentage;

	private String nidImagePath;
	private String nidImageName;

	private String personImagePath;
	private String personImageName;

	private Integer nidSource;
	
	private String comments;
	
	private String toDate;
	private String formDate;

	public Integer getNidId() {
		return nidId;
	}

	public void setNidId(Integer nidId) {
		this.nidId = nidId;
	}

	public Integer getNidVer() {
		return nidVer;
	}

	public void setNidVer(Integer nidVer) {
		this.nidVer = nidVer;
	}

	public Integer getUserModKey() {
		return userModKey;
	}

	public void setUserModKey(Integer userModKey) {
		this.userModKey = userModKey;
	}

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

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getAddrLine1() {
		return addrLine1;
	}

	public void setAddrLine1(String addrLine1) {
		this.addrLine1 = addrLine1;
	}

	public String getAddrLine2() {
		return addrLine2;
	}

	public void setAddrLine2(String addrLine2) {
		this.addrLine2 = addrLine2;
	}

	public String getPostOffice() {
		return postOffice;
	}

	public void setPostOffice(String postOffice) {
		this.postOffice = postOffice;
	}

	public Integer getPostCode() {
		return postCode;
	}

	public void setPostCode(Integer postCode) {
		this.postCode = postCode;
	}

	public String getPoliceStation() {
		return policeStation;
	}

	public void setPoliceStation(String policeStation) {
		this.policeStation = policeStation;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getDivision() {
		return division;
	}

	public void setDivision(String division) {
		this.division = division;
	}

	public Date getNidIssueDate() {
		return nidIssueDate;
	}

	public void setNidIssueDate(Date nidIssueDate) {
		this.nidIssueDate = nidIssueDate;
	}

	public Date getExtractTime() {
		return extractTime;
	}

	public void setExtractTime(Date extractTime) {
		this.extractTime = extractTime;
	}

	public Date getRequestDate() {
		return requestDate;
	}

	public void setRequestDate(Date requestDate) {
		this.requestDate = requestDate;
	}

	public Date getResponseDate() {
		return responseDate;
	}

	public void setResponseDate(Date responseDate) {
		this.responseDate = responseDate;
	}

	public Integer getMatchPercentage() {
		return matchPercentage;
	}

	public void setMatchPercentage(Integer matchPercentage) {
		this.matchPercentage = matchPercentage;
	}

	public String getNidImagePath() {
		return nidImagePath;
	}

	public void setNidImagePath(String nidImagePath) {
		this.nidImagePath = nidImagePath;
	}

	public String getNidImageName() {
		return nidImageName;
	}

	public void setNidImageName(String nidImageName) {
		this.nidImageName = nidImageName;
	}

	public String getPersonImagePath() {
		return personImagePath;
	}

	public void setPersonImagePath(String personImagePath) {
		this.personImagePath = personImagePath;
	}

	public String getPersonImageName() {
		return personImageName;
	}

	public void setPersonImageName(String personImageName) {
		this.personImageName = personImageName;
	}

	public Integer getNidSource() {
		return nidSource;
	}

	public void setNidSource(Integer nidSource) {
		this.nidSource = nidSource;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getFormDate() {
		return formDate;
	}

	public void setFormDate(String formDate) {
		this.formDate = formDate;
	}

}
