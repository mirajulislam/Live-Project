package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author assaduzzaman.sohan
 * @since 22-01-2020
 */
public class LoanDocument extends BaseModel {

	private Integer loanDocId;
	private Integer loanDocVer;

	private Integer loanId;
	private Integer docId;
	private String docType;
	private Integer uploadStatus;
	private String downloadLink;
	private Integer isMandatory;
	private String docName;
	private String docPath;
	private Integer filePresent;

	private Integer idLoanTypeKey;
	private Integer idCustomerTypeKey;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_loan_doc_key", "loanDocId");
			sql2BeanMap.put("@id_loan_doc_ver", "loanDocVer");

			sql2BeanMap.put("@id_loan_key", "loanId");
			sql2BeanMap.put("@id_doc_key", "docId");
			sql2BeanMap.put("@tx_doc_type", "docType");
			sql2BeanMap.put("@int_upload_status", "uploadStatus");
			sql2BeanMap.put("@tx_download_link", "downloadLink");
			sql2BeanMap.put("@int_is_mandatory", "isMandatory");
			sql2BeanMap.put("@tx_document_name", "docName");
			sql2BeanMap.put("@tx_document_path", "docPath");
			sql2BeanMap.put("@int_file_present", "filePresent");

			sql2BeanMap.put("@id_loan_type_key", "idLoanTypeKey");
			sql2BeanMap.put("@id_customer_type_key", "idCustomerTypeKey");
		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_loan_doc_key", "loanDocId");
			rs2BeanMap.put("id_loan_doc_ver", "loanDocVer");

			rs2BeanMap.put("id_loan_key", "loanId");
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

	public Integer getLoanDocId() {
		return loanDocId;
	}

	public void setLoanDocId(Integer loanDocId) {
		this.loanDocId = loanDocId;
	}

	public Integer getLoanDocVer() {
		return loanDocVer;
	}

	public void setLoanDocVer(Integer loanDocVer) {
		this.loanDocVer = loanDocVer;
	}

	public Integer getLoanId() {
		return loanId;
	}

	public void setLoanId(Integer loanId) {
		this.loanId = loanId;
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

	@Override
	public String toString() {
		return "LoanDocument [loanDocId=" + loanDocId + ", loanDocVer=" + loanDocVer + ", loanId=" + loanId + ", docId=" + docId + ", docType="
		        + docType + ", uploadStatus=" + uploadStatus + ", downloadLink=" + downloadLink + ", isMandatory=" + getIsMandatory() + ", docName="
		        + docName + ", docPath=" + docPath + "]";
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

	public Integer getIdLoanTypeKey() {
		return idLoanTypeKey;
	}

	public void setIdLoanTypeKey(Integer idLoanTypeKey) {
		this.idLoanTypeKey = idLoanTypeKey;
	}

	public Integer getIdCustomerTypeKey() {
		return idCustomerTypeKey;
	}

	public void setIdCustomerTypeKey(Integer idCustomerTypeKey) {
		this.idCustomerTypeKey = idCustomerTypeKey;
	}

}
