package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Imamul Hossain
 * @date Dec 31, 2019
 */
public class LoanConfig extends BaseModel {

	Integer loanConfigId;
	Integer loanConfigVer;

	Integer loanTypeId;
	Integer customerTypeId;
	Double interestRate;

	String customerType;
	String loanType;
	Double defaultInterestRate;

	List<LoanDocMap> loanDocMapList;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_loan_config_key", "loanConfigId");
			sql2BeanMap.put("@id_loan_config_ver", "loanConfigVer");

			sql2BeanMap.put("@id_loan_type_key", "loanTypeId");
			sql2BeanMap.put("@id_customer_type_key", "customerTypeId");
			sql2BeanMap.put("@dec_interest_rate", "interestRate");

			sql2BeanMap.put("@tx_customer_type", "customerType");
			sql2BeanMap.put("@tx_loan_type", "loanType");
			sql2BeanMap.put("@dec_default_interest_rate", "defaultInterestRate");
		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_loan_config_key", "loanConfigId");
			rs2BeanMap.put("id_loan_config_ver", "loanConfigVer");

			rs2BeanMap.put("id_loan_type_key", "loanTypeId");
			rs2BeanMap.put("id_customer_type_key", "customerTypeId");
			rs2BeanMap.put("dec_interest_rate", "interestRate");

			rs2BeanMap.put("tx_customer_type", "customerType");
			rs2BeanMap.put("tx_loan_type", "loanType");
			rs2BeanMap.put("dec_default_interest_rate", "defaultInterestRate");
		}
		return rs2BeanMap;
	}

	public Integer getLoanConfigId() {
		return loanConfigId;
	}

	public void setLoanConfigId(Integer loanConfigId) {
		this.loanConfigId = loanConfigId;
	}

	public Integer getLoanConfigVer() {
		return loanConfigVer;
	}

	public void setLoanConfigVer(Integer loanConfigVer) {
		this.loanConfigVer = loanConfigVer;
	}

	public Integer getLoanTypeId() {
		return loanTypeId;
	}

	public void setLoanTypeId(Integer loanTypeId) {
		this.loanTypeId = loanTypeId;
	}

	public Integer getCustomerTypeId() {
		return customerTypeId;
	}

	public void setCustomerTypeId(Integer customerTypeId) {
		this.customerTypeId = customerTypeId;
	}

	public Double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(Double interestRate) {
		this.interestRate = interestRate;
	}

	public String getCustomerType() {
		return customerType;
	}

	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}

	public String getLoanType() {
		return loanType;
	}

	public void setLoanType(String loanType) {
		this.loanType = loanType;
	}

	public Double getDefaultInterestRate() {
		return defaultInterestRate;
	}

	public void setDefaultInterestRate(Double defaultInterestRate) {
		this.defaultInterestRate = defaultInterestRate;
	}

	public List<LoanDocMap> getLoanDocMapList() {
		return loanDocMapList;
	}

	public void setLoanDocMapList(List<LoanDocMap> loanDocMapList) {
		this.loanDocMapList = loanDocMapList;
	}

	@Override
	public String toString() {
		return "LoanConfig [loanConfigId=" + loanConfigId + ", loanConfigVer=" + loanConfigVer + ", loanTypeId=" + loanTypeId + ", customerTypeId="
		        + customerTypeId + ", interestRate=" + interestRate + ", customerType=" + customerType + ", loanType=" + loanType
		        + ", defaultInterestRate=" + defaultInterestRate + ", loanDocMapList=" + loanDocMapList + "]";
	}

}
