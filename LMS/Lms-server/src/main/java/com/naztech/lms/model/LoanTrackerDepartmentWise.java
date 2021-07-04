/**
 * 
 */
package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author mirajul.islam
 *
 */
public class LoanTrackerDepartmentWise {
	private String date;
	private Integer fieldOfficerCount;
	private Integer ppcCount;
	private Integer crmCount;
	private Integer cadCount;
	private Integer loanTrackerTotal;	
	
	private static Map<String, String> rs2BeanMap = null;
	
	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.put("tx_date", "date");
			rs2BeanMap.put("field_officer_count", "fieldOfficerCount");
			rs2BeanMap.put("ppc_count", "ppcCount");
			rs2BeanMap.put("crm_count", "crmCount");
			rs2BeanMap.put("cad_count", "cadCount");
			rs2BeanMap.put("loan_tracker_total", "loanTrackerTotal");
		}
		return rs2BeanMap;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}


	public Integer getFieldOfficerCount() {
		return fieldOfficerCount;
	}

	public void setFieldOfficerCount(Integer fieldOfficerCount) {
		this.fieldOfficerCount = fieldOfficerCount;
	}

	public Integer getPpcCount() {
		return ppcCount;
	}

	public void setPpcCount(Integer ppcCount) {
		this.ppcCount = ppcCount;
	}

	public Integer getCrmCount() {
		return crmCount;
	}

	public void setCrmCount(Integer crmCount) {
		this.crmCount = crmCount;
	}

	public Integer getCadCount() {
		return cadCount;
	}

	public void setCadCount(Integer cadCount) {
		this.cadCount = cadCount;
	}

	public Integer getLoanTrackerTotal() {
		return loanTrackerTotal;
	}

	public void setLoanTrackerTotal(Integer loanTrackerTotal) {
		this.loanTrackerTotal = loanTrackerTotal;
	}
	
	
}
