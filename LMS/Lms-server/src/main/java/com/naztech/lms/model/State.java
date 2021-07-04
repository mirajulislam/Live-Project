package com.naztech.lms.model;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class State {

	private Integer stateId;
	private Integer stateVer;
	private String stateName;
	private Integer permission;
	private Integer roleId;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public Integer getStateId() {
		return stateId;
	}

	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}

	public Integer getStateVer() {
		return stateVer;
	}

	public void setStateVer(Integer stateVer) {
		this.stateVer = stateVer;
	}

	public String getStateName() {
		return stateName;
	}

	public void setStateName(String stateName) {
		this.stateName = stateName;
	}

	public Integer getPermission() {
		return permission;
	}

	public void setPermission(Integer permission) {
		this.permission = permission;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public static final Map<String, String> getSql2BeanMap() {

		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();

			sql2BeanMap.put("@id_fsm_state_key", "stateId");
			sql2BeanMap.put("@id_fsm_state_ver", "stateVer");
			sql2BeanMap.put("@tx_state_name", "stateName");
			sql2BeanMap.put("@int_permission", "permission");
			sql2BeanMap.put("@id_role_key", "roleId");
		}
		return sql2BeanMap;
	}

	public static final Map<String, String> getRs2BeanMap() {

		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();

			rs2BeanMap.put("id_fsm_state_key", "stateId");
			rs2BeanMap.put("id_fsm_state_ver", "stateVer");
			rs2BeanMap.put("tx_state_name", "stateName");
			rs2BeanMap.put("int_permission", "permission");
			rs2BeanMap.put("id_role_key", "roleId");
		}

		return rs2BeanMap;
	}
}
