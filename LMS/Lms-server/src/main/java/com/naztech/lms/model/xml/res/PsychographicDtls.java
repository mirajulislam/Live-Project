package com.naztech.lms.model.xml.res;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "PsychographicDtls")
public class PsychographicDtls {
	private String DespatchMode;
	private String HouseHoldNum;
	private String PrefAddrMode;
	private String PrefRep;
	private String PrefName;
	private String RiskBehaviour;
	private String SegmentationClass;
	private String StmtFreq;
	private String StmtType;
	private String StmtDtWeekDay;
	private String StmtDateWeekDay;
	private String StmtWeekOfMonth;
	private String External_System_Pricing;
	private String Relationship_Pricing_ID;
	ArrayList<Object> campaignDependencyModData = new ArrayList<Object>();
	private String NumberofDependantChildren;
	private String NumberofDependants;
	PrefMiscInqDtls PrefMiscInqDtls;

	public String getDespatchMode() {
		return DespatchMode;
	}

	public void setDespatchMode(String despatchMode) {
		DespatchMode = despatchMode;
	}

	public String getHouseHoldNum() {
		return HouseHoldNum;
	}

	public void setHouseHoldNum(String houseHoldNum) {
		HouseHoldNum = houseHoldNum;
	}

	public String getPrefAddrMode() {
		return PrefAddrMode;
	}

	public void setPrefAddrMode(String prefAddrMode) {
		PrefAddrMode = prefAddrMode;
	}

	public String getPrefRep() {
		return PrefRep;
	}

	public void setPrefRep(String prefRep) {
		PrefRep = prefRep;
	}

	public String getPrefName() {
		return PrefName;
	}

	public void setPrefName(String prefName) {
		PrefName = prefName;
	}

	public String getRiskBehaviour() {
		return RiskBehaviour;
	}

	public void setRiskBehaviour(String riskBehaviour) {
		RiskBehaviour = riskBehaviour;
	}

	public String getSegmentationClass() {
		return SegmentationClass;
	}

	public void setSegmentationClass(String segmentationClass) {
		SegmentationClass = segmentationClass;
	}

	public String getStmtFreq() {
		return StmtFreq;
	}

	public void setStmtFreq(String stmtFreq) {
		StmtFreq = stmtFreq;
	}

	public String getStmtType() {
		return StmtType;
	}

	public void setStmtType(String stmtType) {
		StmtType = stmtType;
	}

	public String getStmtDtWeekDay() {
		return StmtDtWeekDay;
	}

	public void setStmtDtWeekDay(String stmtDtWeekDay) {
		StmtDtWeekDay = stmtDtWeekDay;
	}

	public String getStmtDateWeekDay() {
		return StmtDateWeekDay;
	}

	public void setStmtDateWeekDay(String stmtDateWeekDay) {
		StmtDateWeekDay = stmtDateWeekDay;
	}

	public String getStmtWeekOfMonth() {
		return StmtWeekOfMonth;
	}

	public void setStmtWeekOfMonth(String stmtWeekOfMonth) {
		StmtWeekOfMonth = stmtWeekOfMonth;
	}

	public String getExternal_System_Pricing() {
		return External_System_Pricing;
	}

	public void setExternal_System_Pricing(String external_System_Pricing) {
		External_System_Pricing = external_System_Pricing;
	}

	public String getRelationship_Pricing_ID() {
		return Relationship_Pricing_ID;
	}

	public void setRelationship_Pricing_ID(String relationship_Pricing_ID) {
		Relationship_Pricing_ID = relationship_Pricing_ID;
	}

	public ArrayList<Object> getCampaignDependencyModData() {
		return campaignDependencyModData;
	}

	public void setCampaignDependencyModData(ArrayList<Object> campaignDependencyModData) {
		this.campaignDependencyModData = campaignDependencyModData;
	}

	public String getNumberofDependantChildren() {
		return NumberofDependantChildren;
	}

	public void setNumberofDependantChildren(String numberofDependantChildren) {
		NumberofDependantChildren = numberofDependantChildren;
	}

	public String getNumberofDependants() {
		return NumberofDependants;
	}

	public void setNumberofDependants(String numberofDependants) {
		NumberofDependants = numberofDependants;
	}

	public PrefMiscInqDtls getPrefMiscInqDtls() {
		return PrefMiscInqDtls;
	}

	public void setPrefMiscInqDtls(PrefMiscInqDtls prefMiscInqDtls) {
		PrefMiscInqDtls = prefMiscInqDtls;
	}

}