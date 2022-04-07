package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.Map;

public class UserDocument extends BaseModel{

	private Integer userDocId;
	private Integer userDocVer;

	private Integer userId;
	private Integer docId;
	private String docType;
	private Integer uploadStatus;
	private String downloadLink;
	private Integer isMandatory;
	private String docName;
	private String docPath;
	private Integer filePresent;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_user_doc_key", "userDocId");
			sql2BeanMap.put("@id_user_doc_ver", "userDocVer");

			sql2BeanMap.put("@id_user_key", "userId");
			sql2BeanMap.put("@id_doc_key", "docId");
			sql2BeanMap.put("@tx_doc_type", "docType");
			sql2BeanMap.put("@int_upload_status", "uploadStatus");
			sql2BeanMap.put("@tx_download_link", "downloadLink");
			sql2BeanMap.put("@int_is_mandatory", "isMandatory");
			sql2BeanMap.put("@tx_document_name", "docName");
			sql2BeanMap.put("@tx_document_path", "docPath");
			sql2BeanMap.put("@int_file_present", "filePresent");
		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_user_doc_key", "userDocId");
			rs2BeanMap.put("id_user_doc_ver", "userDocVer");

			rs2BeanMap.put("id_user_key", "userId");
			rs2BeanMap.put("id_doc_key", "docId");
			rs2BeanMap.put("tx_doc_type", "docType");
			rs2BeanMap.put("int_upload_status", "uploadStatus");
			rs2BeanMap.put("tx_download_link", "downloadLink");
			rs2BeanMap.put("int_is_mandatory", "isMandatory");
			rs2BeanMap.put("tx_document_name", "docName");
			rs2BeanMap.put("tx_document_path", "docPath");
			rs2BeanMap.put("int_file_present", "filePresent");

		}
		return rs2BeanMap;
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

	public Integer getIsMandatory() {
		return isMandatory;
	}

	public void setIsMandatory(Integer isMandatory) {
		this.isMandatory = isMandatory;
	}

	public Integer getFilePresent() {
		return filePresent;
	}

	public void setFilePresent(Integer filePresent) {
		this.filePresent = filePresent;
	}

	public Integer getUserDocId() {
		return userDocId;
	}

	public void setUserDocId(Integer userDocId) {
		this.userDocId = userDocId;
	}

	public Integer getUserDocVer() {
		return userDocVer;
	}

	public void setUserDocVer(Integer userDocVer) {
		this.userDocVer = userDocVer;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "UserDocument [userDocId=" + userDocId + ", userDocVer=" + userDocVer + ", userId=" + userId + ", docId="
				+ docId + ", docType=" + docType + ", uploadStatus=" + uploadStatus + ", downloadLink=" + downloadLink
				+ ", isMandatory=" + isMandatory + ", docName=" + docName + ", docPath=" + docPath + ", filePresent="
				+ filePresent + "]";
	}

}
