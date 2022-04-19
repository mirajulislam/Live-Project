package com.mirajul.islam.base.model;

/**
 * @author mirajul.islam
 */
public class Document extends BaseModel{
	
	private String objectType;
	private Integer refKey;
	private Integer docId;
	private String docType;
	private Integer uploadStatus;
	private String downloadLink;
	private Integer isMandatory;
	private String docName;
	private String docPath;
	private Integer filePresent;
	
	public String getObjectType() {
		return objectType;
	}
	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}
	public Integer getRefKey() {
		return refKey;
	}
	public void setRefKey(Integer refKey) {
		this.refKey = refKey;
	}
	public Integer getDocId() {
		return docId;
	}
	public void setDocId(Integer docId) {
		this.docId = docId;
	}
	public String getDocType() {
		return docType;
	}
	public void setDocType(String docType) {
		this.docType = docType;
	}
	public Integer getUploadStatus() {
		return uploadStatus;
	}
	public void setUploadStatus(Integer uploadStatus) {
		this.uploadStatus = uploadStatus;
	}
	public String getDownloadLink() {
		return downloadLink;
	}
	public void setDownloadLink(String downloadLink) {
		this.downloadLink = downloadLink;
	}
	public Integer getIsMandatory() {
		return isMandatory;
	}
	public void setIsMandatory(Integer isMandatory) {
		this.isMandatory = isMandatory;
	}
	public String getDocName() {
		return docName;
	}
	public void setDocName(String docName) {
		this.docName = docName;
	}
	public String getDocPath() {
		return docPath;
	}
	public void setDocPath(String docPath) {
		this.docPath = docPath;
	}
	public Integer getFilePresent() {
		return filePresent;
	}
	public void setFilePresent(Integer filePresent) {
		this.filePresent = filePresent;
	}
	
	@Override
	public String toString() {
		return "Document [objectType=" + objectType + ", refKey=" + refKey + ", docId=" + docId + ", docType=" + docType
				+ ", uploadStatus=" + uploadStatus + ", downloadLink=" + downloadLink + ", isMandatory=" + isMandatory
				+ ", docName=" + docName + ", docPath=" + docPath + ", filePresent=" + filePresent + "]";
	}
}
