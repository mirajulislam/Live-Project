package com.naztech.lms.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class LmsDashboard extends BaseModel {

	private List<LmsDashboard> dataList;
	private List<LmsDashboard> userList;
	private List<LmsDashboard> dateList;

	private String loginName;
	private String date;
	private String deptName;

	private Date fromDate;
	private Date toDate;

	private Double totalRequest;
	private Double totalCompleted;
	private Double totalPending; 

	// search properties
	private String accountNo4Src;
	private String bpNo4Src;
	private String nid4Src;
	private String phone4Src;
	private String fromDate4Src;
	private String toDate4Src;
	private String loanTrackingId4Src;
	private String applicationNo4Src;
	private String total;
	private Integer dateType;
	
	private String staffId;

	private String customerName;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@dtt_from_date", "fromDate");
			sql2BeanMap.put("@dtt_to_date", "toDate");
			sql2BeanMap.put("@tx_dept_name", "deptName");
			sql2BeanMap.put("@tx_date", "date");

			sql2BeanMap.put("@tx_account_no", "accountNo4Src");
			sql2BeanMap.put("@tx_bp_no", "bpNo4Src");
			sql2BeanMap.put("@tx_nid", "nid4Src");
			sql2BeanMap.put("@tx_phone", "phone4Src");
			sql2BeanMap.put("@tx_from_date", "fromDate4Src");
			sql2BeanMap.put("@tx_to_date", "toDate4Src");
			sql2BeanMap.put("@tx_loan_tracking_id", "loanTrackingId4Src");
			sql2BeanMap.put("@tx_application_no", "applicationNo4Src");
			sql2BeanMap.put("@tx_login_name", "loginName");
			sql2BeanMap.put("@tx_staff_id", "staffId");
			sql2BeanMap.put("@int_date_type", "dateType");
			

			sql2BeanMap.put("@tx_customer_name", "customerName");
		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("tx_login_name", "loginName");
			rs2BeanMap.put("tx_date", "date");

			rs2BeanMap.put("dec_total_request", "totalRequest");
			rs2BeanMap.put("dec_total_completed", "totalCompleted");
			rs2BeanMap.put("dec_pend_received", "totalPending");
		}
		return rs2BeanMap;
	}

	public String getLoginName() {
		return loginName;
	}

	public void setLoginName(String loginName) {
		this.loginName = loginName;
	}

	public List<LmsDashboard> getDataList() {
		return dataList;
	}

	public void setDataList(List<LmsDashboard> dataList) {
		this.dataList = dataList;
	}

	public List<LmsDashboard> getUserList() {
		return userList;
	}

	public void setUserList(List<LmsDashboard> userList) {
		this.userList = userList;
	}

	public List<LmsDashboard> getDateList() {
		return dateList;
	}

	public void setDateList(List<LmsDashboard> dateList) {
		this.dateList = dateList;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Date getFromDate() {
		return fromDate;
	}

	public void setFromDate(Date fromDate) {
		this.fromDate = fromDate;
	}

	public Date getToDate() {
		return toDate;
	}

	public void setToDate(Date toDate) {
		this.toDate = toDate;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getAccountNo4Src() {
		return accountNo4Src;
	}

	public void setAccountNo4Src(String accountNo4Src) {
		this.accountNo4Src = accountNo4Src;
	}

	public String getBpNo4Src() {
		return bpNo4Src;
	}

	public void setBpNo4Src(String bpNo4Src) {
		this.bpNo4Src = bpNo4Src;
	}

	public String getNid4Src() {
		return nid4Src;
	}

	public void setNid4Src(String nid4Src) {
		this.nid4Src = nid4Src;
	}

	public String getPhone4Src() {
		return phone4Src;
	}

	public void setPhone4Src(String phone4Src) {
		this.phone4Src = phone4Src;
	}

	public String getFromDate4Src() {
		return fromDate4Src;
	}

	public void setFromDate4Src(String fromDate4Src) {
		this.fromDate4Src = fromDate4Src;
	}

	public String getToDate4Src() {
		return toDate4Src;
	}

	public void setToDate4Src(String toDate4Src) {
		this.toDate4Src = toDate4Src;
	}

	public String getLoanTrackingId4Src() {
		return loanTrackingId4Src;
	}

	public void setLoanTrackingId4Src(String loanTrackingId4Src) {
		this.loanTrackingId4Src = loanTrackingId4Src;
	}

	public String getApplicationNo4Src() {
		return applicationNo4Src;
	}

	public void setApplicationNo4Src(String applicationNo4Src) {
		this.applicationNo4Src = applicationNo4Src;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public Double getTotalRequest() {
		return totalRequest;
	}

	public void setTotalRequest(Double totalRequest) {
		this.totalRequest = totalRequest;
	}

	public Double getTotalCompleted() {
		return totalCompleted;
	}

	public void setTotalCompleted(Double totalCompleted) {
		this.totalCompleted = totalCompleted;
	}

	public Double getTotalPending() {
		return totalPending;
	}

	public void setTotalPending(Double totalPending) {
		this.totalPending = totalPending;
	}

	public String getStaffId() {
		return staffId;
	}

	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public Integer getDateType() {
		return dateType;
	}

	public void setDateType(Integer dateType) {
		this.dateType = dateType;
	}

}
