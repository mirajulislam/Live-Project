package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * author : kamruzzaman
 */

public class Preference extends BaseModel {

	private Integer idPrefKey;
	private Integer idPrefVer;
	private Integer idPrefTypeValueKey;
	private Integer idPrefTypeValueKeyValue;
	
	private String prefGroup;
	private String prefName;
	private String prefValue;
	
	private Integer isAllowOverride;
	private Integer prefOrder;
	
	private String prefDesc;
	private String typeCatagory;
	private String typeName;
	private String prefTypeValue;

	private static Map<String, String> rs2BeanMap = null;
	private static Map<String, String> sql2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			
			sql2BeanMap.putAll(getSql2BaseBeanMap());
			sql2BeanMap.put("@id_pref_key"					, "idPrefKey");
			sql2BeanMap.put("@id_pref_ver"					, "idPrefVer");
			sql2BeanMap.put("@id_pref_type_value_key"		, "idPrefTypeValueKey");
			sql2BeanMap.put("@id_pref_type_value_key_value"	, "idPrefTypeValueKeyValue");
			sql2BeanMap.put("@tx_pref_group"				, "prefGroup");
			sql2BeanMap.put("@tx_pref_name"					, "prefName");
			sql2BeanMap.put("@tx_pref_value"				, "prefValue");
			sql2BeanMap.put("@is_allow_override"			, "isAllowOverride");
			sql2BeanMap.put("@int_pref_order"				, "prefOrder");
			sql2BeanMap.put("@tx_pref_desc"					, "prefDesc");
		}
		return sql2BeanMap;
	}

	public static final Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			
			rs2BeanMap.putAll(getRs2BaseBeanMap());
			rs2BeanMap.put("id_pref_key"					, "idPrefKey");
			rs2BeanMap.put("id_pref_ver"					, "idPrefVer");
			rs2BeanMap.put("id_pref_type_value_key"			, "idPrefTypeValueKey");
			rs2BeanMap.put("id_pref_type_value_key_value"	, "idPrefTypeValueKeyValue");
			rs2BeanMap.put("tx_pref_group"					, "prefGroup");
			rs2BeanMap.put("tx_pref_name"					, "prefName");
			rs2BeanMap.put("tx_pref_value"					, "prefValue");
			rs2BeanMap.put("is_allow_override"				, "isAllowOverride");
			rs2BeanMap.put("int_pref_order"					, "prefOrder");
			rs2BeanMap.put("tx_pref_desc"					, "prefDesc");
			rs2BeanMap.put("tx_type_category"				, "typeCatagory");
			rs2BeanMap.put("tx_type_name"					, "typeName");
			rs2BeanMap.put("tx_pref_type_value"				, "prefTypeValue");
		}

		return rs2BeanMap;
	}

	public Integer getIdPrefKey() {
		return idPrefKey;
	}

	public void setIdPrefKey(Integer idPrefKey) {
		this.idPrefKey = idPrefKey;
	}

	public Integer getIdPrefVer() {
		return idPrefVer;
	}

	public void setIdPrefVer(Integer idPrefVer) {
		this.idPrefVer = idPrefVer;
	}

	public Integer getIdPrefTypeValueKey() {
		return idPrefTypeValueKey;
	}

	public void setIdPrefTypeValueKey(Integer idPrefTypeValueKey) {
		this.idPrefTypeValueKey = idPrefTypeValueKey;
	}

	public Integer getIdPrefTypeValueKeyValue() {
		return idPrefTypeValueKeyValue;
	}

	public void setIdPrefTypeValueKeyValue(Integer idPrefTypeValueKeyValue) {
		this.idPrefTypeValueKeyValue = idPrefTypeValueKeyValue;
	}

	public String getPrefGroup() {
		return prefGroup;
	}

	public void setPrefGroup(String prefGroup) {
		this.prefGroup = prefGroup;
	}

	public String getPrefName() {
		return prefName;
	}

	public void setPrefName(String prefName) {
		this.prefName = prefName;
	}

	public String getPrefValue() {
		return prefValue;
	}

	public void setPrefValue(String prefValue) {
		this.prefValue = prefValue;
	}

	public Integer getIsAllowOverride() {
		return isAllowOverride;
	}

	public void setIsAllowOverride(Integer isAllowOverride) {
		this.isAllowOverride = isAllowOverride;
	}

	public Integer getPrefOrder() {
		return prefOrder;
	}

	public void setPrefOrder(Integer prefOrder) {
		this.prefOrder = prefOrder;
	}

	public String getPrefDesc() {
		return prefDesc;
	}

	public void setPrefDesc(String prefDesc) {
		this.prefDesc = prefDesc;
	}

	public String getTypeCatagory() {
		return typeCatagory;
	}

	public void setTypeCatagory(String typeCatagory) {
		this.typeCatagory = typeCatagory;
	}

	public String getTypeName() {
		return typeName;
	}

	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}

	public String getPrefTypeValue() {
		return prefTypeValue;
	}

	public void setPrefTypeValue(String prefTypeValue) {
		this.prefTypeValue = prefTypeValue;
	}

	
}
