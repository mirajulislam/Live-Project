package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "RelBankDtls")
public class RelBankDtls {
	private String OrgKey;
	private String EntityCreationFlag;
	private String NumOfCrCards;

	// Getter Methods

	public String getOrgKey() {
		return OrgKey;
	}

	public String getEntityCreationFlag() {
		return EntityCreationFlag;
	}

	public String getNumOfCrCards() {
		return NumOfCrCards;
	}

	// Setter Methods

	public void setOrgKey(String OrgKey) {
		this.OrgKey = OrgKey;
	}

	public void setEntityCreationFlag(String EntityCreationFlag) {
		this.EntityCreationFlag = EntityCreationFlag;
	}

	public void setNumOfCrCards(String NumOfCrCards) {
		this.NumOfCrCards = NumOfCrCards;
	}
}