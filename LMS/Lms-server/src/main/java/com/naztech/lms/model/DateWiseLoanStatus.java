package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.Map;

public class DateWiseLoanStatus {

	private String date;
	private Integer entryELoan;
	private Integer entryWeb;
	private Integer ppcReceived;
	private Integer ppcRejcetPending;
	private Integer ppcRecommend;
	private Integer crmReceived;
	private Integer crmRejcetPending;
	private Integer crmApproved;
	private Integer mdApproved;
	private Integer cadSanction;
	private Integer cadDisbursed;

	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.put("tx_date", "date");
			rs2BeanMap.put("entry_e_loan", "entryELoan");
			rs2BeanMap.put("entry_web", "entryWeb");
			rs2BeanMap.put("ppc_received", "ppcReceived");
			rs2BeanMap.put("ppc_rejcet_pending", "ppcRejcetPending");
			rs2BeanMap.put("ppc_recommend", "ppcRecommend");
			rs2BeanMap.put("crm_received", "crmReceived");
			rs2BeanMap.put("crm_rejcet_pending", "crmRejcetPending");
			rs2BeanMap.put("crm_approved", "crmApproved");
			rs2BeanMap.put("md_approved", "mdApproved");
			rs2BeanMap.put("cad_sanction", "cadSanction");
			rs2BeanMap.put("cad_disbursed", "cadDisbursed");
		}
		return rs2BeanMap;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Integer getEntryELoan() {
		return entryELoan;
	}

	public void setEntryELoan(Integer entryELoan) {
		this.entryELoan = entryELoan;
	}

	public Integer getEntryWeb() {
		return entryWeb;
	}

	public void setEntryWeb(Integer entryWeb) {
		this.entryWeb = entryWeb;
	}

	public Integer getPpcReceived() {
		return ppcReceived;
	}

	public void setPpcReceived(Integer ppcReceived) {
		this.ppcReceived = ppcReceived;
	}

	public Integer getPpcRejcetPending() {
		return ppcRejcetPending;
	}

	public void setPpcRejcetPending(Integer ppcRejcetPending) {
		this.ppcRejcetPending = ppcRejcetPending;
	}

	public Integer getPpcRecommend() {
		return ppcRecommend;
	}

	public void setPpcRecommend(Integer ppcRecommend) {
		this.ppcRecommend = ppcRecommend;
	}

	public Integer getCrmReceived() {
		return crmReceived;
	}

	public void setCrmReceived(Integer crmReceived) {
		this.crmReceived = crmReceived;
	}

	public Integer getCrmRejcetPending() {
		return crmRejcetPending;
	}

	public void setCrmRejcetPending(Integer crmRejcetPending) {
		this.crmRejcetPending = crmRejcetPending;
	}

	public Integer getCrmApproved() {
		return crmApproved;
	}

	public void setCrmApproved(Integer crmApproved) {
		this.crmApproved = crmApproved;
	}

	public Integer getMdApproved() {
		return mdApproved;
	}

	public void setMdApproved(Integer mdApproved) {
		this.mdApproved = mdApproved;
	}

	public Integer getCadSanction() {
		return cadSanction;
	}

	public void setCadSanction(Integer cadSanction) {
		this.cadSanction = cadSanction;
	}

	public Integer getCadDisbursed() {
		return cadDisbursed;
	}

	public void setCadDisbursed(Integer cadDisbursed) {
		this.cadDisbursed = cadDisbursed;
	}

}
