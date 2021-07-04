package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "EntityDocDtls")
public class EntityDocDtls {
	private String CountryOfIssue;
	private String DocCode;
	private String IsDocDeleted;
	private String DocIssueDt;
	private String DocRmks;
	private String DocTypeCode;
	private String DocTypeDesc;
	private String EntityType;
	private String IdentificationType;
	private String PlaceOfIssue;
	private String RefNum;
	private String Status;
	private String EntityDocumentID;
	private String IsDocumentVerified;
	private String PreferredUniqueId;

	// Getter Methods

	public String getCountryOfIssue() {
		return CountryOfIssue;
	}

	public String getDocCode() {
		return DocCode;
	}

	public String getIsDocDeleted() {
		return IsDocDeleted;
	}

	public String getDocIssueDt() {
		return DocIssueDt;
	}

	public String getDocRmks() {
		return DocRmks;
	}

	public String getDocTypeCode() {
		return DocTypeCode;
	}

	public String getDocTypeDesc() {
		return DocTypeDesc;
	}

	public String getEntityType() {
		return EntityType;
	}

	public String getIdentificationType() {
		return IdentificationType;
	}

	public String getPlaceOfIssue() {
		return PlaceOfIssue;
	}

	public String getRefNum() {
		return RefNum;
	}

	public String getStatus() {
		return Status;
	}

	public String getEntityDocumentID() {
		return EntityDocumentID;
	}

	public String getIsDocumentVerified() {
		return IsDocumentVerified;
	}

	public String getPreferredUniqueId() {
		return PreferredUniqueId;
	}

	// Setter Methods

	public void setCountryOfIssue(String CountryOfIssue) {
		this.CountryOfIssue = CountryOfIssue;
	}

	public void setDocCode(String DocCode) {
		this.DocCode = DocCode;
	}

	public void setIsDocDeleted(String IsDocDeleted) {
		this.IsDocDeleted = IsDocDeleted;
	}

	public void setDocIssueDt(String DocIssueDt) {
		this.DocIssueDt = DocIssueDt;
	}

	public void setDocRmks(String DocRmks) {
		this.DocRmks = DocRmks;
	}

	public void setDocTypeCode(String DocTypeCode) {
		this.DocTypeCode = DocTypeCode;
	}

	public void setDocTypeDesc(String DocTypeDesc) {
		this.DocTypeDesc = DocTypeDesc;
	}

	public void setEntityType(String EntityType) {
		this.EntityType = EntityType;
	}

	public void setIdentificationType(String IdentificationType) {
		this.IdentificationType = IdentificationType;
	}

	public void setPlaceOfIssue(String PlaceOfIssue) {
		this.PlaceOfIssue = PlaceOfIssue;
	}

	public void setRefNum(String RefNum) {
		this.RefNum = RefNum;
	}

	public void setStatus(String Status) {
		this.Status = Status;
	}

	public void setEntityDocumentID(String EntityDocumentID) {
		this.EntityDocumentID = EntityDocumentID;
	}

	public void setIsDocumentVerified(String IsDocumentVerified) {
		this.IsDocumentVerified = IsDocumentVerified;
	}

	public void setPreferredUniqueId(String PreferredUniqueId) {
		this.PreferredUniqueId = PreferredUniqueId;
	}
}