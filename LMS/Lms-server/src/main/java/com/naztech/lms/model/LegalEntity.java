package com.naztech.lms.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

public class LegalEntity extends BaseModel {

	private Integer version;
	private Integer envId;
	private Integer eventKey;
	private Integer userIdModified;

	private Date dateModified;
	private Date lastRefreshTime;
	private Integer id;
	private String name;
	private String alias;

	private String mode;
	private String branchId;

	private String bicCode;

	private Boolean isHeadOffice;
	private String cbsBranchId;

	public String getCbsBranchId() {
		return cbsBranchId;
	}

	public void setCbsBranchId(String cbsBranchId) {
		this.cbsBranchId = cbsBranchId;
	}

	public String getBicCode() {
		return bicCode;
	}

	public void setBicCode(String bicCode) {
		this.bicCode = bicCode;
	}

	public Boolean getIsHeadOffice() {
		return isHeadOffice;
	}

	public void setIsHeadOffice(Boolean isHeadOffice) {
		this.isHeadOffice = isHeadOffice;
	}

	public String getBranchId() {
		return branchId;
	}

	public void setBranchId(String branchId) {
		this.branchId = branchId;
	}

	public String getUserNameModified() {
		return userNameModified;
	}

	public void setUserNameModified(String userNameModified) {
		this.userNameModified = userNameModified;
	}

	private String userNameModified;

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public Integer getEnvId() {
		return envId;
	}

	public void setEnvId(Integer envId) {
		this.envId = envId;
	}

	public Integer getEventKey() {
		return eventKey;
	}

	public void setEventKey(Integer eventKey) {
		this.eventKey = eventKey;
	}

	public Integer getUserIdModified() {
		return userIdModified;
	}

	public void setUserIdModified(Integer userIdModified) {
		this.userIdModified = userIdModified;
	}

	public Date getDateModified() {
		return dateModified;
	}

	public void setDateModified(Date dateModified) {
		this.dateModified = dateModified;
	}

	public Date getLastRefreshTime() {
		return lastRefreshTime;
	}

	public void setLastRefreshTime(Date lastRefreshTime) {
		this.lastRefreshTime = lastRefreshTime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public String getMode() {
		return mode;
	}

	public void setMode(String mode) {
		this.mode = mode;
	}

	private static LinkedHashMap<String, String> sp2BeanMap;

	private static Map<String, String> rs2BeanMap;

	public static LinkedHashMap<String, String> getSp2BeanMap() {

		if (sp2BeanMap == null) {
			sp2BeanMap = new LinkedHashMap<String, String>();
			sp2BeanMap.put("@id_legal_entity_ver", "version");
			sp2BeanMap.put("@is_active", "active");
			sp2BeanMap.put("@id_env_key", "envId");
			sp2BeanMap.put("@id_event_key", "eventKey");
			sp2BeanMap.put("@id_user_mod_key", "userIdModified");
			sp2BeanMap.put("@dtt_mod", "dateModified");
			sp2BeanMap.put("@dtt_last_refresh", "lastRefreshTime");
			sp2BeanMap.put("@id_legal_entity_key", "id");
			sp2BeanMap.put("@tx_legal_entity_name", "name");
			sp2BeanMap.put("@tx_legal_entity_alias", "alias");
			sp2BeanMap.put("@tx_mode", "mode");
			sp2BeanMap.put("@tx_legal_entity_id", "branchId");
			sp2BeanMap.put("@tx_desc", "description");
			sp2BeanMap.put("@is_head_office", "isHeadOffice");
			sp2BeanMap.put("@tx_default_sender_bic_code", "bicCode");
			sp2BeanMap.put("@tx_cbs_branch_id", "cbsBranchId");
		}
		return sp2BeanMap;
	}

	public static final Map<String, String> getRs2BeanMap() {

		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();

			rs2BeanMap.put("id_legal_entity_ver", "version");
			rs2BeanMap.put("is_active", "active");
			rs2BeanMap.put("id_env_key", "envId");
			rs2BeanMap.put("id_event_key", "eventKey");
			rs2BeanMap.put("dtt_mod", "dateModified");
			rs2BeanMap.put("id_user_mod_key", "userIdModified");
			rs2BeanMap.put("tx_login_name", "userNameModified");
			rs2BeanMap.put("tx_user_mod_name", "userNameModified");
			rs2BeanMap.put("id_legal_entity_key", "id");
			rs2BeanMap.put("tx_legal_entity_name", "name");
			rs2BeanMap.put("tx_legal_entity_alias", "alias");
			rs2BeanMap.put("tx_mode", "mode");
			rs2BeanMap.put("tx_legal_entity_id", "branchId");
			rs2BeanMap.put("tx_desc", "description");
			rs2BeanMap.put("is_head_office", "isHeadOffice");
			rs2BeanMap.put("tx_default_sender_bic_code", "bicCode");
			rs2BeanMap.put("tx_cbs_branch_id", "cbsBranchId");
		}
		return rs2BeanMap;

	}
}
