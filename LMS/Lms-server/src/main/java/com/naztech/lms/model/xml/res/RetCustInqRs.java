package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "RetCustInqRs")
public class RetCustInqRs {
	@XmlElement
	RetCustDtls RetCustDtls;
	@XmlElement
	DemographicDtls DemographicDtls;
	@XmlElement
	EntityDocDtls EntityDocDtls;
	@XmlElement
	PsychographicDtls PsychographicDtls;
	@XmlElement
	RelBankDtls RelBankDtls;
	@XmlElement
	TradeFinDtls TradeFinDtls;
	@XmlElement
	RetailBaselDtls RetailBaselDtls;

	public RetCustDtls getRetCustDtls() {
		return RetCustDtls;
	}

	public void setRetCustDtls(RetCustDtls retCustDtls) {
		RetCustDtls = retCustDtls;
	}

	public DemographicDtls getDemographicDtls() {
		return DemographicDtls;
	}

	public void setDemographicDtls(DemographicDtls demographicDtls) {
		DemographicDtls = demographicDtls;
	}

	public EntityDocDtls getEntityDocDtls() {
		return EntityDocDtls;
	}

	public void setEntityDocDtls(EntityDocDtls entityDocDtls) {
		EntityDocDtls = entityDocDtls;
	}

	public PsychographicDtls getPsychographicDtls() {
		return PsychographicDtls;
	}

	public void setPsychographicDtls(PsychographicDtls psychographicDtls) {
		PsychographicDtls = psychographicDtls;
	}

	public RelBankDtls getRelBankDtls() {
		return RelBankDtls;
	}

	public void setRelBankDtls(RelBankDtls relBankDtls) {
		RelBankDtls = relBankDtls;
	}

	public TradeFinDtls getTradeFinDtls() {
		return TradeFinDtls;
	}

	public void setTradeFinDtls(TradeFinDtls tradeFinDtls) {
		TradeFinDtls = tradeFinDtls;
	}

	public RetailBaselDtls getRetailBaselDtls() {
		return RetailBaselDtls;
	}

	public void setRetailBaselDtls(RetailBaselDtls retailBaselDtls) {
		RetailBaselDtls = retailBaselDtls;
	}

}