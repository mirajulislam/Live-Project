package com.mirajul.islam.base.model;

import java.util.List;

/**
 * @author mirajul.islam
 */
public class NConfiguration extends BaseModel {

	Integer configurationId;
	Integer configurationVer;

	Integer readOnly;
	String group;
	String subGroup;
	String name;
	String value1;
	String value2;
	String value3;
	String desc;
	String comment;
	String valueType;
	String modifiedBy;

	List<Integer> configList;

	public Integer getConfigurationId() {
		return configurationId;
	}

	public void setConfigurationId(Integer configurationId) {
		this.configurationId = configurationId;
	}

	public Integer getConfigurationVer() {
		return configurationVer;
	}

	public void setConfigurationVer(Integer configurationVer) {
		this.configurationVer = configurationVer;
	}

	public Integer getReadOnly() {
		return readOnly;
	}

	public void setReadOnly(Integer readOnly) {
		this.readOnly = readOnly;
	}

	public String getGroup() {
		return group;
	}

	public void setGroup(String group) {
		this.group = group;
	}

	public String getSubGroup() {
		return subGroup;
	}

	public void setSubGroup(String subGroup) {
		this.subGroup = subGroup;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getValue1() {
		return value1;
	}

	public void setValue1(String value1) {
		this.value1 = value1;
	}

	public String getValue2() {
		return value2;
	}

	public void setValue2(String value2) {
		this.value2 = value2;
	}

	public String getValue3() {
		return value3;
	}

	public void setValue3(String value3) {
		this.value3 = value3;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getValueType() {
		return valueType;
	}

	public void setValueType(String valueType) {
		this.valueType = valueType;
	}

	public String getModifiedBy() {
		return modifiedBy;
	}

	public void setModifiedBy(String modifiedBy) {
		this.modifiedBy = modifiedBy;
	}

	public List<Integer> getConfigList() {
		return configList;
	}

	public void setConfigList(List<Integer> configList) {
		this.configList = configList;
	}

}
