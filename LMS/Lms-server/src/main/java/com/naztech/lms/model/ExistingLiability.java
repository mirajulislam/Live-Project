package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author md.kamruzzaman
 */
public class ExistingLiability extends BaseModel {

	Integer existingLiabilityId;
	Integer existingLiabilityVer;

	Integer loanId;

	String bankName;
	String product;
	Double disbursed;
	Double currentOutstanding;
	Double eMISize;
	String remarks;

	/*
	 * rowIndex is the row number of store, which is using to keep track 
	 * while saving from an existing loan window 
	 */
	int rowIndex;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_existing_liability_key", "existingLiabilityId");
			sql2BeanMap.put("@id_existing_liability_ver", "existingLiabilityVer");

			sql2BeanMap.put("@id_loan_key", "loanId");

			sql2BeanMap.put("@tx_bank_name", "bankName");
			sql2BeanMap.put("@tx_product_name", "product");
			sql2BeanMap.put("@dec_disbursed", "disbursed");
			sql2BeanMap.put("@dec_current_outstanding", "currentOutstanding");
			sql2BeanMap.put("@dec_emi_size", "eMISize");
			sql2BeanMap.put("@tx_remarks", "remarks");

		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_existing_liability_key", "existingLiabilityId");
			rs2BeanMap.put("id_existing_liability_ver", "existingLiabilityVer");

			rs2BeanMap.put("id_loan_key", "loanId");

			rs2BeanMap.put("tx_bank_name", "bankName");
			rs2BeanMap.put("tx_product_name", "product");
			rs2BeanMap.put("dec_disbursed", "disbursed");
			rs2BeanMap.put("dec_current_outstanding", "currentOutstanding");
			rs2BeanMap.put("dec_emi_size", "eMISize");
			rs2BeanMap.put("tx_remarks", "remarks");
		}
		return rs2BeanMap;
	}

	public Integer getExistingLiabilityId() {
		return existingLiabilityId;
	}

	public void setExistingLiabilityId(Integer existingLiabilityId) {
		this.existingLiabilityId = existingLiabilityId;
	}

	public Integer getExistingLiabilityVer() {
		return existingLiabilityVer;
	}

	public void setExistingLiabilityVer(Integer existingLiabilityVer) {
		this.existingLiabilityVer = existingLiabilityVer;
	}

	public Integer getLoanId() {
		return loanId;
	}

	public void setLoanId(Integer loanId) {
		this.loanId = loanId;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getProduct() {
		return product;
	}

	public void setProduct(String product) {
		this.product = product;
	}

	public Double getDisbursed() {
		return disbursed;
	}

	public void setDisbursed(Double disbursed) {
		this.disbursed = disbursed;
	}

	public Double getCurrentOutstanding() {
		return currentOutstanding;
	}

	public void setCurrentOutstanding(Double currentOutstanding) {
		this.currentOutstanding = currentOutstanding;
	}

	public Double geteMISize() {
		return eMISize;
	}

	public void seteMISize(Double eMISize) {
		this.eMISize = eMISize;
	}

	public String getRemarks() {
		return remarks;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public int getRowIndex() {
		return rowIndex;
	}

	public void setRowIndex(int rowIndex) {
		this.rowIndex = rowIndex;
	}

	@Override
	public String toString() {
		return "ExistingLiability [existingLiabilityId=" + existingLiabilityId + ", existingLiabilityVer=" + existingLiabilityVer + ", loanId="
		        + loanId + ", bankName=" + bankName + ", product=" + product + ", disbursed=" + disbursed + ", currentOutstanding="
		        + currentOutstanding + ", eMISize=" + eMISize + ", remarks=" + remarks + ", rowIndex=" + rowIndex + "]";
	}

}
