package com.mirajul.islam.base.model;

import java.util.Date;

/**
 * @author mirajul.islam
 */
public class BaseModel {

	protected Integer userModKey;
	private String loginName;
	protected Date dttMod;
	protected Date createDate;
	protected String actionType;
	protected Integer creatorId;
	private String description;
	
	public Integer getUserModKey() {
		return userModKey;
	}
	public void setUserModKey(Integer userModKey) {
		this.userModKey = userModKey;
	}
	public String getLoginName() {
		return loginName;
	}
	public void setLoginName(String loginName) {
		this.loginName = loginName;
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
	
	@Override
	public String toString() {
		return "BaseModel [userModKey=" + userModKey + ", loginName=" + loginName + ", dttMod=" + dttMod
				+ ", createDate=" + createDate + ", actionType=" + actionType + ", creatorId=" + creatorId
				+ ", description=" + description + "]";
	}	
	
}
