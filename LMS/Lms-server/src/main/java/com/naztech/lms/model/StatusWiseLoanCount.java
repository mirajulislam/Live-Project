package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.Map;

public class StatusWiseLoanCount {

	private String date;
	private Integer newEntry;
	private Integer pendingRecomPpc;
	private Integer recomByPpc;
	private Integer receivebyCrm;
	private Integer complete;
	private Integer conApproved;
	private Integer onProcess;
	private Integer pending;
	private Integer slGenerated;
	private Integer mdApproved;
	private Integer rejectOrDeclien;

	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.put("tx_date", "date");
			rs2BeanMap.put("new_entry", "newEntry");
			rs2BeanMap.put("pending_recom_ppc", "pendingRecomPpc");
			rs2BeanMap.put("recom_by_ppc", "recomByPpc");
			rs2BeanMap.put("receive_by_crm", "receivebyCrm");
			rs2BeanMap.put("complete", "complete");
			rs2BeanMap.put("con_approved", "conApproved");
			rs2BeanMap.put("on_process", "onProcess");
			rs2BeanMap.put("pending", "pending");
			rs2BeanMap.put("sl_generated", "slGenerated");
			rs2BeanMap.put("md_approved", "mdApproved");
			rs2BeanMap.put("reject_or_declien", "rejectOrDeclien");
		}
		return rs2BeanMap;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public Integer getNewEntry() {
		return newEntry;
	}

	public void setNewEntry(Integer newEntry) {
		this.newEntry = newEntry;
	}

	public Integer getPendingRecomPpc() {
		return pendingRecomPpc;
	}

	public void setPendingRecomPpc(Integer pendingRecomPpc) {
		this.pendingRecomPpc = pendingRecomPpc;
	}

	public Integer getRecomByPpc() {
		return recomByPpc;
	}

	public void setRecomByPpc(Integer recomByPpc) {
		this.recomByPpc = recomByPpc;
	}

	public Integer getReceivebyCrm() {
		return receivebyCrm;
	}

	public void setReceivebyCrm(Integer receivebyCrm) {
		this.receivebyCrm = receivebyCrm;
	}

	public Integer getComplete() {
		return complete;
	}

	public void setComplete(Integer complete) {
		this.complete = complete;
	}

	public Integer getConApproved() {
		return conApproved;
	}

	public void setConApproved(Integer conApproved) {
		this.conApproved = conApproved;
	}

	public Integer getOnProcess() {
		return onProcess;
	}

	public void setOnProcess(Integer onProcess) {
		this.onProcess = onProcess;
	}

	public Integer getPending() {
		return pending;
	}

	public void setPending(Integer pending) {
		this.pending = pending;
	}

	public Integer getSlGenerated() {
		return slGenerated;
	}

	public void setSlGenerated(Integer slGenerated) {
		this.slGenerated = slGenerated;
	}

	public Integer getMdApproved() {
		return mdApproved;
	}

	public void setMdApproved(Integer mdApproved) {
		this.mdApproved = mdApproved;
	}

	public Integer getRejectOrDeclien() {
		return rejectOrDeclien;
	}

	public void setRejectOrDeclien(Integer rejectOrDeclien) {
		this.rejectOrDeclien = rejectOrDeclien;
	}

}
