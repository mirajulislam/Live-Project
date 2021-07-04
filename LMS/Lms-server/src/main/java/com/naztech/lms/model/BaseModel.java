package com.naztech.lms.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @author md.kamruzzaman
 */
public class BaseModel {

	protected Integer active;
	protected Integer idEnvKey;
	protected Integer userModKey;
	protected Date dttMod;
	protected Date createDate;
	protected Integer idEventKey;
	protected Integer stateId;
	protected Integer idActionKey;
	protected Integer actionId;
	protected String actionType;
	protected Integer creatorId;
	private String description;
	private String stateName;

	private static Map<String, String> sql2BaseBeanMap = null;
	private static Map<String, String> rs2BaseBeanMap = null;

	protected static Map<String, String> getSql2BaseBeanMap() {
		if (sql2BaseBeanMap == null) {
			sql2BaseBeanMap = new ConcurrentHashMap<String, String>();

			sql2BaseBeanMap.put("@is_active", "active");
			sql2BaseBeanMap.put("@id_env_key", "idEnvKey");
			sql2BaseBeanMap.put("@id_user_mod_key", "userModKey");
			sql2BaseBeanMap.put("@dtt_mod", "dttMod");
			sql2BaseBeanMap.put("@dtt_create", "createDate");
			sql2BaseBeanMap.put("@id_event_key", "idEventKey");
			sql2BaseBeanMap.put("@id_state_key", "stateId");
			sql2BaseBeanMap.put("@id_action_key", "actionId");
			sql2BaseBeanMap.put("@tx_action_type", "actionType");
			sql2BaseBeanMap.put("@id_creator_key", "creatorId");
			sql2BaseBeanMap.put("@tx_desc", "description");
			sql2BaseBeanMap.put("@tx_state_name", "stateName");
			sql2BaseBeanMap.put("@id_state_key", "stateId");
		}
		return sql2BaseBeanMap;
	}

	protected static Map<String, String> getRs2BaseBeanMap() {
		if (rs2BaseBeanMap == null) {
			rs2BaseBeanMap = new ConcurrentHashMap<String, String>();
			rs2BaseBeanMap.put("is_active", "active");
			rs2BaseBeanMap.put("id_env_key", "idEnvKey");
			rs2BaseBeanMap.put("id_user_mod_key", "userModKey");
			rs2BaseBeanMap.put("dtt_mod", "dttMod");
			rs2BaseBeanMap.put("dtt_create", "createDate");
			rs2BaseBeanMap.put("id_event_key", "idEventKey");
			rs2BaseBeanMap.put("id_state_key", "stateId");
			rs2BaseBeanMap.put("id_action_key", "actionId");
			rs2BaseBeanMap.put("tx_action_type", "actionType");
			rs2BaseBeanMap.put("id_creator_key", "creatorId");
			rs2BaseBeanMap.put("tx_desc", "description");
			rs2BaseBeanMap.put("tx_state_name", "stateName");
			rs2BaseBeanMap.put("id_state_key", "stateId");

		}
		return rs2BaseBeanMap;
	}

	public Integer getActive() {
		return active;
	}

	public void setActive(Integer active) {
		this.active = active;
	}

	public Integer getIdEnvKey() {
		return idEnvKey;
	}

	public void setIdEnvKey(Integer idEnvKey) {
		this.idEnvKey = idEnvKey;
	}

	public Integer getUserModKey() {
		return userModKey;
	}

	public void setUserModKey(Integer userModKey) {
		this.userModKey = userModKey;
	}

	public Date getDttMod() {
		return dttMod;
	}

	public void setDttMod(Date dttMod) {
		this.dttMod = dttMod;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Integer getIdEventKey() {
		return idEventKey;
	}

	public void setIdEventKey(Integer idEventKey) {
		this.idEventKey = idEventKey;
	}

	public Integer getStateId() {
		return stateId;
	}

	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}

	public Integer getIdActionKey() {
		return idActionKey;
	}

	public void setIdActionKey(Integer idActionKey) {
		this.idActionKey = idActionKey;
	}

	public Integer getActionId() {
		return actionId;
	}

	public void setActionId(Integer actionId) {
		this.actionId = actionId;
	}

	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}

	public Integer getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Integer creatorId) {
		this.creatorId = creatorId;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

}
