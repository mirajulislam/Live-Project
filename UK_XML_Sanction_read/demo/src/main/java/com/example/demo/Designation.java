package com.example.demo;

import java.util.List;

public class Designation {
	private String LastUpdated;
	private String DateDesignated;
	private String UniqueID;
	private String OFSIGroupID;
	private String UNReceNumber;
	private String RegimeName;
	private String IndividualEntityShip;
	private String DesignationSource;
	private String SanctionsImposed;
	private String OtherInformation;
	SanctionsImposedIndicators sanctionsImposedIndicators;
	
	List<Address> address;
	List<EmailAddresses> emailAddresses;
	List<Name> name;
	List<NonLatinName> nonLatinName;
	List<PhoneNumbers> phoneNumbers;
	
	public String getLastUpdated() {
		return LastUpdated;
	}
	public void setLastUpdated(String lastUpdated) {
		LastUpdated = lastUpdated;
	}
	public String getDateDesignated() {
		return DateDesignated;
	}
	public void setDateDesignated(String dateDesignated) {
		DateDesignated = dateDesignated;
	}
	public String getUniqueID() {
		return UniqueID;
	}
	public void setUniqueID(String uniqueID) {
		UniqueID = uniqueID;
	}
	public String getOFSIGroupID() {
		return OFSIGroupID;
	}
	public void setOFSIGroupID(String oFSIGroupID) {
		OFSIGroupID = oFSIGroupID;
	}
	public String getUNReceNumber() {
		return UNReceNumber;
	}
	public void setUNReceNumber(String uNReceNumber) {
		UNReceNumber = uNReceNumber;
	}
	public String getRegimeName() {
		return RegimeName;
	}
	public void setRegimeName(String regimeName) {
		RegimeName = regimeName;
	}
	public String getIndividualEntityShip() {
		return IndividualEntityShip;
	}
	public void setIndividualEntityShip(String individualEntityShip) {
		IndividualEntityShip = individualEntityShip;
	}
	public String getDesignationSource() {
		return DesignationSource;
	}
	public void setDesignationSource(String designationSource) {
		DesignationSource = designationSource;
	}
	public String getSanctionsImposed() {
		return SanctionsImposed;
	}
	public void setSanctionsImposed(String sanctionsImposed) {
		SanctionsImposed = sanctionsImposed;
	}
	public String getOtherInformation() {
		return OtherInformation;
	}
	public void setOtherInformation(String otherInformation) {
		OtherInformation = otherInformation;
	}
	
	public List<Address> getAddress() {
		return address;
	}
	public void setAddress(List<Address> address) {
		this.address = address;
	}
	public List<EmailAddresses> getEmailAddresses() {
		return emailAddresses;
	}
	public void setEmailAddresses(List<EmailAddresses> emailAddresses) {
		this.emailAddresses = emailAddresses;
	}
	public List<Name> getName() {
		return name;
	}
	public void setName(List<Name> name) {
		this.name = name;
	}
	public List<NonLatinName> getNonLatinName() {
		return nonLatinName;
	}
	public void setNonLatinName(List<NonLatinName> nonLatinName) {
		this.nonLatinName = nonLatinName;
	}
	public List<PhoneNumbers> getPhoneNumbers() {
		return phoneNumbers;
	}
	public void setPhoneNumbers(List<PhoneNumbers> phoneNumbers) {
		this.phoneNumbers = phoneNumbers;
	}
	
	public SanctionsImposedIndicators getSanctionsImposedIndicators() {
		return sanctionsImposedIndicators;
	}
	public void setSanctionsImposedIndicators(SanctionsImposedIndicators sanctionsImposedIndicators) {
		this.sanctionsImposedIndicators = sanctionsImposedIndicators;
	}
	@Override
	public String toString() {
		return "Designation [LastUpdated=" + LastUpdated + ", DateDesignated=" + DateDesignated + ", UniqueID="
				+ UniqueID + ", OFSIGroupID=" + OFSIGroupID + ", UNReceNumber=" + UNReceNumber + ", RegimeName="
				+ RegimeName + ", IndividualEntityShip=" + IndividualEntityShip + ", DesignationSource="
				+ DesignationSource + ", SanctionsImposed=" + SanctionsImposed + ", OtherInformation="
				+ OtherInformation + "]";
	}

}
