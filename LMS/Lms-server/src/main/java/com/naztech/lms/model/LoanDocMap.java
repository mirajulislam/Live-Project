package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Imamul Hossain
 * @since Jan 14, 2020
 */
public class LoanDocMap extends BaseModel {

	Integer loanDocMapId;
	Integer loanDocMapVer;

	Integer loanConfigId;
	Integer docId;
	Integer isMandatory;
	Integer isMandatoryForAllLoans;
	Integer isDefault;

	String docType;

	List<LoanDocMap> loanDocMapList;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_loan_doc_map_key", "loanDocMapId");
			sql2BeanMap.put("@id_loan_doc_map_ver", "loanDocMapVer");

			sql2BeanMap.put("@id_loan_config_key", "loanConfigId");
			sql2BeanMap.put("@id_doc_key", "docId");
			sql2BeanMap.put("@is_mandatory", "isMandatory");
			sql2BeanMap.put("@is_mandatory_for_all_loans", "isMandatoryForAllLoans");

			sql2BeanMap.put("@is_deafult", "isDefault");
			sql2BeanMap.put("@tx_doc_type", "docType");

		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();

			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_loan_doc_map_key", "loanDocMapId");
			rs2BeanMap.put("id_loan_doc_map_ver", "loanDocMapVer");

			rs2BeanMap.put("id_loan_config_key", "loanConfigId");
			rs2BeanMap.put("id_doc_key", "docId");
			rs2BeanMap.put("is_mandatory", "isMandatory");
			rs2BeanMap.put("is_mandatory_for_all_loans", "isMandatoryForAllLoans");

			rs2BeanMap.put("is_deafult", "isDefault");
			rs2BeanMap.put("tx_doc_type", "docType");

		}
		return rs2BeanMap;
	}

	public Integer getLoanDocMapId() {
		return loanDocMapId;
	}

	public void setLoanDocMapId(Integer loanDocMapId) {
		this.loanDocMapId = loanDocMapId;
	}

	public Integer getLoanDocMapVer() {
		return loanDocMapVer;
	}

	public void setLoanDocMapVer(Integer loanDocMapVer) {
		this.loanDocMapVer = loanDocMapVer;
	}

	public Integer getLoanConfigId() {
		return loanConfigId;
	}

	public void setLoanConfigId(Integer loanConfigId) {
		this.loanConfigId = loanConfigId;
	}

	public Integer getDocId() {
		return docId;
	}

	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	public Integer getIsMandatory() {
		return isMandatory;
	}

	public void setIsMandatory(Integer isMandatory) {
		this.isMandatory = isMandatory;
	}

	public Integer getIsMandatoryForAllLoans() {
		return isMandatoryForAllLoans;
	}

	public void setIsMandatoryForAllLoans(Integer isMandatoryForAllLoans) {
		this.isMandatoryForAllLoans = isMandatoryForAllLoans;
	}

	public Integer getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(Integer isDefault) {
		this.isDefault = isDefault;
	}

	public String getDocType() {
		return docType;
	}

	public void setDocType(String docType) {
		this.docType = docType;
	}

	public List<LoanDocMap> getLoanDocMapList() {
		return loanDocMapList;
	}

	public void setLoanDocMapList(List<LoanDocMap> loanDocMapList) {
		this.loanDocMapList = loanDocMapList;
	}

}
