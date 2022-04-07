package com.naztech.nid.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author fahim.reza
 */
public class NidRequest {

	private Integer nidRequestId;
	private Integer nidRequestVer;

	private Integer userModKey;

	private Date requestTime;
	private Date responseTime;
	private Integer validReq;
	private Integer dataSource;
	private Integer successReq;
	private Integer matchPercentage;

	private String comments;
	private String callBackUrl;

	private Integer idNidKey;

	private static Map<String, String> rs2BeanMap;
	private static Map<String, String> sp2BeanMap;

	public static Map<String, String> getRs2BeanMap() {

		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();

			rs2BeanMap.put("id_nid_request_key", "nidRequestId");
			rs2BeanMap.put("id_nid_request_ver", "nidRequestVer");
			rs2BeanMap.put("dtt_request", "requestTime");
			rs2BeanMap.put("dtt_response", "responseTime");
			rs2BeanMap.put("is_valid_req", "validReq");
			rs2BeanMap.put("int_data_source", "dataSource");
			rs2BeanMap.put("is_success_req", "successReq");
			rs2BeanMap.put("int_match_percentage", "matchPercentage");
			rs2BeanMap.put("id_user_mod_key", "userModKey");
			rs2BeanMap.put("tx_comments", "comments");
			rs2BeanMap.put("tx_call_back_url", "callBackUrl");
			rs2BeanMap.put("id_nid_key", "idNidKey");

		}
		return rs2BeanMap;
	}

	public static Map<String, String> getSp2BeanMap() {

		if (sp2BeanMap == null) {
			sp2BeanMap = new LinkedHashMap<String, String>();

			sp2BeanMap.put("@id_nid_request_key", "nidRequestId");
			sp2BeanMap.put("@id_nid_request_ver", "nidRequestVer");
			sp2BeanMap.put("@dtt_request", "requestTime");
			sp2BeanMap.put("@dtt_response", "responseTime");
			sp2BeanMap.put("@is_valid_req", "validReq");
			sp2BeanMap.put("@int_data_source", "dataSource");
			sp2BeanMap.put("@is_success_req", "successReq");
			sp2BeanMap.put("@int_match_percentage", "matchPercentage");
			sp2BeanMap.put("@id_user_mod_key", "userModKey");
			sp2BeanMap.put("@tx_comments", "comments");
			sp2BeanMap.put("@tx_call_back_url", "callBackUrl");
			sp2BeanMap.put("@id_nid_key", "idNidKey");
		}

		return sp2BeanMap;
	}

	public Integer getNidRequestId() {
		return nidRequestId;
	}

	public void setNidRequestId(Integer nidRequestId) {
		this.nidRequestId = nidRequestId;
	}

	public Integer getNidRequestVer() {
		return nidRequestVer;
	}

	public void setNidRequestVer(Integer nidRequestVer) {
		this.nidRequestVer = nidRequestVer;
	}

	public Date getRequestTime() {
		return requestTime;
	}

	public void setRequestTime(Date requestTime) {
		this.requestTime = requestTime;
	}

	public Date getResponseTime() {
		return responseTime;
	}

	public void setResponseTime(Date responseTime) {
		this.responseTime = responseTime;
	}

	public Integer getUserModKey() {
		return userModKey;
	}

	public void setUserModKey(Integer userModKey) {
		this.userModKey = userModKey;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getCallBackUrl() {
		return callBackUrl;
	}

	public void setCallBackUrl(String callBackUrl) {
		this.callBackUrl = callBackUrl;
	}

	public Integer getValidReq() {
		return validReq;
	}

	public void setValidReq(Integer validReq) {
		this.validReq = validReq;
	}

	public Integer getDataSource() {
		return dataSource;
	}

	public void setDataSource(Integer dataSource) {
		this.dataSource = dataSource;
	}

	public Integer getSuccessReq() {
		return successReq;
	}

	public void setSuccessReq(Integer successReq) {
		this.successReq = successReq;
	}

	public Integer getMatchPercentage() {
		return matchPercentage;
	}

	public void setMatchPercentage(Integer matchPercentage) {
		this.matchPercentage = matchPercentage;
	}

	public Integer getIdNidKey() {
		return idNidKey;
	}

	public void setIdNidKey(Integer idNidKey) {
		this.idNidKey = idNidKey;
	}

}
