package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

public class Role {

	private Integer roleId;
	private Integer roleVer;
	private String roleName;

	List<User> roleUserList;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static final Map<String, String> getSql2BeanMap() {

		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();

			sql2BeanMap.put("@id_role_key", "roleId");
			sql2BeanMap.put("@id_role_ver", "roleVer");
			sql2BeanMap.put("@tx_role_name", "roleName");
		}
		return sql2BeanMap;
	}

	public static final Map<String, String> getRs2BeanMap() {

		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();

			rs2BeanMap.put("id_role_key", "roleId");
			rs2BeanMap.put("id_role_ver", "roleVer");
			rs2BeanMap.put("tx_role_name", "roleName");
		}

		return rs2BeanMap;
	}

	public Integer getRoleId() {
		return roleId;
	}

	public void setRoleId(Integer roleId) {
		this.roleId = roleId;
	}

	public Integer getRoleVer() {
		return roleVer;
	}

	public void setRoleVer(Integer roleVer) {
		this.roleVer = roleVer;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public List<User> getRoleUserList() {
		return roleUserList;
	}

	public void setRoleUserList(List<User> roleUserList) {
		this.roleUserList = roleUserList;
	}

	@Override
	public String toString() {
		return "Role [roleId=" + roleId + ", roleVer=" + roleVer + ", roleName=" + roleName + ", roleUserList=" + roleUserList + "]";
	}

}
