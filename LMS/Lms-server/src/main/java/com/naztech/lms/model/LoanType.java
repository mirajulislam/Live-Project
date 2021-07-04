package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.Map;

public class LoanType extends BaseModel {

	private Integer loanTypeId;
	private Integer loanTypeVer;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_loan_type_key", "loanTypeId");
			sql2BeanMap.put("@id_loan_type_ver", "loanTypeVer");

		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_loan_type_key", "loanTypeId");
			rs2BeanMap.put("id_loan_type_ver", "loanTypeVer");

		}
		return rs2BeanMap;
	}

	public Integer getLoanTypeId() {
		return loanTypeId;
	}

	public void setLoanTypeId(Integer loanTypeId) {
		this.loanTypeId = loanTypeId;
	}

	public Integer getLoanTypeVer() {
		return loanTypeVer;
	}

	public void setLoanTypeVer(Integer loanTypeVer) {
		this.loanTypeVer = loanTypeVer;
	}

}
