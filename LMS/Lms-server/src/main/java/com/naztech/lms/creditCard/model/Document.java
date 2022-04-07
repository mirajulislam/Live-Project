package com.naztech.lms.creditCard.model;

import java.util.LinkedHashMap;
import java.util.Map;

import com.naztech.lms.model.BaseModel;
/**
 * @author Mirajul.islam
 */
public class Document extends BaseModel {

	private Integer documentKey;
	private Integer documentVer;

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

	private Integer idCardTypeKey;
	private Integer idCustomerTypeKey;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_document_key", "documentKey");
			sql2BeanMap.put("@id_document_ver", "documentVer");

			sql2BeanMap.put("@tx_object_type", "objectType");
			sql2BeanMap.put("@id_ref_key", "refKey");
			sql2BeanMap.put("@id_doc_key", "docId");
			sql2BeanMap.put("@tx_doc_type", "docType");
			sql2BeanMap.put("@int_upload_status", "uploadStatus");
			sql2BeanMap.put("@tx_download_link", "downloadLink");
			sql2BeanMap.put("@int_is_mandatory", "isMandatory");
			sql2BeanMap.put("@tx_document_name", "docName");
			sql2BeanMap.put("@tx_document_path", "docPath");
			sql2BeanMap.put("@int_file_present", "filePresent");

			sql2BeanMap.put("@id_card_type_key", "idCardTypeKey");
			sql2BeanMap.put("@id_customer_type_key", "idCustomerTypeKey");
		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_document_key", "documentKey");
			rs2BeanMap.put("id_document_ver", "documentVer");

			rs2BeanMap.put("tx_object_type", "objectType");
			rs2BeanMap.put("id_ref_key", "refKey");
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

	public Integer getDocumentKey() {
		return documentKey;
	}

	public void setDocumentKey(Integer documentKey) {
		this.documentKey = documentKey;
	}

	public Integer getDocumentVer() {
		return documentVer;
	}

	public void setDocumentVer(Integer documentVer) {
		this.documentVer = documentVer;
	}

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

	public Integer getIdCardTypeKey() {
		return idCardTypeKey;
	}

	public void setIdCardTypeKey(Integer idCardTypeKey) {
		this.idCardTypeKey = idCardTypeKey;
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

	public Integer getIdCustomerTypeKey() {
		return idCustomerTypeKey;
	}

	public void setIdCustomerTypeKey(Integer idCustomerTypeKey) {
		this.idCustomerTypeKey = idCustomerTypeKey;
	}

}
