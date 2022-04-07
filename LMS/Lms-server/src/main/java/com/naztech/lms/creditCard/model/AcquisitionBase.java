package com.naztech.lms.creditCard.model;

import java.util.Date;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
/**
 * @author Mirajul.islam
 */
public class AcquisitionBase {
	protected Integer active;
	protected Integer idEnvKey;
	protected Integer userModKey;
	protected Date dttMod;
	protected Date createDate;
	protected Integer idEventKey;
	protected Integer creatorId;
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
			sql2BaseBeanMap.put("@id_creator_key", "creatorId");
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
			rs2BaseBeanMap.put("id_creator_key", "creatorId");
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

	public Integer getCreatorId() {
		return creatorId;
	}

	public void setCreatorId(Integer creatorId) {
		this.creatorId = creatorId;
	}	
	
}
