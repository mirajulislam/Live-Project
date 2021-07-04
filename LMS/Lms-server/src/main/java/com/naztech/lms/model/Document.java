package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 
 * @author md.kamruzzaman
 *
 */
public class Document extends BaseModel {

	private Integer documentId;
	private Integer documentVer;

	private String documentGroup;
	private String documentName;

	private static Map<String, String> sql2BeanMap = null;

	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_document_key", "documentId");
			sql2BeanMap.put("@id_document_ver", "documentVer");

		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_document_key", "documentId");
			rs2BeanMap.put("id_document_ver", "documentVer");

		}
		return rs2BeanMap;
	}

	public Integer getDocumentId() {
		return documentId;
	}

	public void setDocumentId(Integer documentId) {
		this.documentId = documentId;
	}

	public Integer getDocumentVer() {
		return documentVer;
	}

	public void setDocumentVer(Integer documentVer) {
		this.documentVer = documentVer;
	}

}
