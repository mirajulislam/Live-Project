package com.naztech.lms.model.xml.res;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "RetCustDtls")
public class RetCustDtls {
	@XmlElement
	private String AcctName;
	@XmlElement
	private String AnnualRevenue;
	@XmlElement
	private String Assistant;
	@XmlElement
	private String AvailableCrLimit;
	@XmlElement
	private String BlacklistNotes;
	@XmlElement
	private String BlacklistReason;
	@XmlElement
	private String IsBlacklisted;
	@XmlElement
	private String CardHolder;
	@XmlElement
	private String Category;
	@XmlElement
	private String ChargeLevelCode;
	@XmlElement
	private String CustId;

	private String CIN;
	@XmlElement
	private String City;
	@XmlElement
	private String CombinedStmtFlag;
	@XmlElement
	private String ConstitutionCode;
	@XmlElement
	private String ConstitutionRefCode;
	@XmlElement
	private String CorpRepCount;
	@XmlElement
	private String CountryOfBirth;
	@XmlElement
	private String CreatedFrom;
	@XmlElement
	private String CreatedBySystemId;
	@XmlElement
	private String CurrCode;
	@XmlElement
	private String CurrentCrExposure;
	@XmlElement
	private String CommunityCode;
	@XmlElement
	private String Community;
	@XmlElement
	private String BirthDt;
	@XmlElement
	private String FirstName;
	@XmlElement
	private String FirstNameNative;
	@XmlElement
	private String FirstNameNative1;
	@XmlElement
	private String Health;
	@XmlElement
	private String HealthCode;
	@XmlElement
	private String Language;
	@XmlElement
	private String LastName;
	@XmlElement
	private String LastNameNative;
	@XmlElement
	private String LastNameNative1;
	@XmlElement
	private String MiddleName;
	@XmlElement
	private String MiddleNameNative;
	@XmlElement
	private String MiddleNameNative1;
	@XmlElement
	private String IsStaff;
	@XmlElement
	private String SwiftCode;
	@XmlElement
	private String CustType;
	@XmlElement
	private String CustTypeCode;
	@XmlElement
	private String CustClass;
	@XmlElement
	private String IsMinor;
	@XmlElement
	private String IsNRE;
	@XmlElement
	private String CustProfitability;
	@XmlElement
	private String CustRelNum;
	@XmlElement
	private String CustTrade;
	@XmlElement
	private String DefaultAddrType;
	@XmlElement
	private String DelinquencyFlag;
	@XmlElement
	private String DeliquencyPeriod;
	@XmlElement
	private String Designation;
	@XmlElement
	private String IsDocReceived;
	@XmlElement
	private String DualFirstName;
	@XmlElement
	private String DualLastName;
	@XmlElement
	private String DualMiddleName;
	@XmlElement
	private String Education;
	@XmlElement
	private String EntityCreationFlag;
	@XmlElement
	private String ExtnNum;
	@XmlElement
	private String FatherOrHusbandName;
	@XmlElement
	private String Fax;
	@XmlElement
	private String FaxHome;
	@XmlElement
	private String Gender;
	@XmlElement
	private String GroupIdCode;
	@XmlElement
	private String HouseholdName;
	@XmlElement
	private String IncrementalDt;
	@XmlElement
	private String InternalScore;
	@XmlElement
	private String SalutationCodeOfIntroducer;
	@XmlElement
	private String StatusOfIntroducer;
	@XmlElement
	private String NameOfIntroducer;
	@XmlElement
	private String SalutationOfIntroducer;
	@XmlElement
	private String IsSwiftCodeOfBank;
	@XmlElement
	private String IsCorpRepresentative;
	@XmlElement
	private String IsDummy;
	@XmlElement
	private String IsEBankingEnabled;
	@XmlElement
	private String IsSMSBankingEnabled;
	@XmlElement
	private String IsWAPBankingEnabled;
	@XmlElement
	private String LeadSource;
	@XmlElement
	private String LicenseNum;
	@XmlElement
	private String MaidenName;
	@XmlElement
	private String MaidenNameOfMother;
	@XmlElement
	private String Manager;
	@XmlElement
	private String ManagerOpinion;
	@XmlElement
	private String GuardianCode;
	@XmlElement
	private String GuardianName;
	@XmlElement
	private String ModifiedBySysId;
	@XmlElement
	private String MotherName;
	@XmlElement
	private String Name;
	@XmlElement
	private String NameSuffix;
	@XmlElement
	private String NationalIdCardNum;
	@XmlElement
	private String NativeLanguage;
	@XmlElement
	private String NativeLanguageCode;
	@XmlElement
	private String NativeLanguageName;
	@XmlElement
	private String NativeLanguageTitle;
	@XmlElement
	private String NativeLanguageTitleCode;
	@XmlElement
	private String IsNegated;
	@XmlElement
	private String NegationNotes;
	@XmlElement
	private String NegationReason;
	@XmlElement
	private String NickName;
	@XmlElement
	private String Notes;
	@XmlElement
	private String Occupation;
	@XmlElement
	private String OccupationCode;
	@XmlElement
	private String OfflineCumDrLimit;
	private String PAN;
	@XmlElement
	private String PassportNum;
	@XmlElement
	private String PersonType;
	@XmlElement
	private String Phone;
	@XmlElement
	ArrayList<PhoneEmailInfo> PhoneEmailInfo = new ArrayList<PhoneEmailInfo>();
	@XmlElement
	private String PlaceOfBirth;
	@XmlElement
	private String PotentialCrLine;
	@XmlElement
	private String PrefCode;
	@XmlElement
	private String PrefCodeRefCode;
	@XmlElement
	private String PrefName;
	@XmlElement
	private String PreviousName;
	@XmlElement
	private String PrimaryServiceCentre;
	@XmlElement
	private String PrimarySolId;
	@XmlElement
	private String PriorityCode;
	@XmlElement
	private String ProofOfAgeDoc;
	@XmlElement
	private String ProofOfAgeFlag;
	@XmlElement
	private String PassportDtls;
	@XmlElement
	private String Rating;
	@XmlElement
	private String RatingCode;
	@XmlElement
	private String Region;
	@XmlElement
	private String RelationshipLevel;
	@XmlElement
	private String RelationshipType;
	@XmlElement
	private String RelationshipOpeningDt;
	@XmlElement
	private String RelationshipValue;
	@XmlElement
	RetCustAddrInfo RetCustAddrInfoObject;
	@XmlElement
	private String RevenueUnits;
	@XmlElement
	private String Salutation;
	@XmlElement
	private String SalutationCode;
	@XmlElement
	private String Sector;
	@XmlElement
	private String SectorCode;
	@XmlElement
	private String SegmentationClass;
	@XmlElement
	private String ShortName;
	@XmlElement
	private String ShortNameNative;
	@XmlElement
	private String ShortNameNative1;

	private String SICCode;

	private String SMSBankingMobNum;

	private String SSN;
	@XmlElement
	private String StaffFlag;
	@XmlElement
	private String StartDt;
	@XmlElement
	private String Status;
	@XmlElement
	private String SubSector;
	@XmlElement
	private String SubSectorCode;
	@XmlElement
	private String SubSegment;
	@XmlElement
	private String SuspendNotes;
	@XmlElement
	private String SuspendReason;
	@XmlElement
	private String IsSuspended;

	private String TFPartyFlag;
	@XmlElement
	private String TickerSymbol;
	@XmlElement
	private String TotalCrExposure;
	@XmlElement
	private String ForeignAccTaxReportingReq;
	@XmlElement
	private String ForeignTaxReportingCountry;
	@XmlElement
	private String ForeignTaxReportingStatus;
	@XmlElement
	private String FatcaRemarks;
	@XmlElement
	private String DateOfDeath;
	@XmlElement
	private String DateOfNotification;
	@XmlElement
	private String SenCitizenApplicableDate;
	@XmlElement
	private String SeniorCitizen;
	@XmlElement
	private String CustStatus;
	@XmlElement
	private String PhysicalState;
	@XmlElement
	private String AadhaarNumber;
	@XmlElement
	private String StaffEmployeeID;

	// Getter Methods

	public String getAcctName() {
		return AcctName;
	}

	public String getAnnualRevenue() {
		return AnnualRevenue;
	}

	public String getAssistant() {
		return Assistant;
	}

	public String getAvailableCrLimit() {
		return AvailableCrLimit;
	}

	public String getBlacklistNotes() {
		return BlacklistNotes;
	}

	public String getBlacklistReason() {
		return BlacklistReason;
	}

	public String getIsBlacklisted() {
		return IsBlacklisted;
	}

	public String getCardHolder() {
		return CardHolder;
	}

	public String getCategory() {
		return Category;
	}

	public String getChargeLevelCode() {
		return ChargeLevelCode;
	}

	public String getCustId() {
		return CustId;
	}

	public String getCIN() {
		return CIN;
	}

	public String getCity() {
		return City;
	}

	public String getCombinedStmtFlag() {
		return CombinedStmtFlag;
	}

	public String getConstitutionCode() {
		return ConstitutionCode;
	}

	public String getConstitutionRefCode() {
		return ConstitutionRefCode;
	}

	public String getCorpRepCount() {
		return CorpRepCount;
	}

	public String getCountryOfBirth() {
		return CountryOfBirth;
	}

	public String getCreatedFrom() {
		return CreatedFrom;
	}

	public String getCreatedBySystemId() {
		return CreatedBySystemId;
	}

	public String getCurrCode() {
		return CurrCode;
	}

	public String getCurrentCrExposure() {
		return CurrentCrExposure;
	}

	public String getCommunityCode() {
		return CommunityCode;
	}

	public String getCommunity() {
		return Community;
	}

	public String getBirthDt() {
		return BirthDt;
	}

	public String getFirstName() {
		return FirstName;
	}

	public String getFirstNameNative() {
		return FirstNameNative;
	}

	public String getFirstNameNative1() {
		return FirstNameNative1;
	}

	public String getHealth() {
		return Health;
	}

	public String getHealthCode() {
		return HealthCode;
	}

	public String getLanguage() {
		return Language;
	}

	public String getLastName() {
		return LastName;
	}

	public String getLastNameNative() {
		return LastNameNative;
	}

	public String getLastNameNative1() {
		return LastNameNative1;
	}

	public String getMiddleName() {
		return MiddleName;
	}

	public String getMiddleNameNative() {
		return MiddleNameNative;
	}

	public String getMiddleNameNative1() {
		return MiddleNameNative1;
	}

	public String getIsStaff() {
		return IsStaff;
	}

	public String getSwiftCode() {
		return SwiftCode;
	}

	public String getCustType() {
		return CustType;
	}

	public String getCustTypeCode() {
		return CustTypeCode;
	}

	public String getCustClass() {
		return CustClass;
	}

	public String getIsMinor() {
		return IsMinor;
	}

	public String getIsNRE() {
		return IsNRE;
	}

	public String getCustProfitability() {
		return CustProfitability;
	}

	public String getCustRelNum() {
		return CustRelNum;
	}

	public String getCustTrade() {
		return CustTrade;
	}

	public String getDefaultAddrType() {
		return DefaultAddrType;
	}

	public String getDelinquencyFlag() {
		return DelinquencyFlag;
	}

	public String getDeliquencyPeriod() {
		return DeliquencyPeriod;
	}

	public String getDesignation() {
		return Designation;
	}

	public String getIsDocReceived() {
		return IsDocReceived;
	}

	public String getDualFirstName() {
		return DualFirstName;
	}

	public String getDualLastName() {
		return DualLastName;
	}

	public String getDualMiddleName() {
		return DualMiddleName;
	}

	public String getEducation() {
		return Education;
	}

	public String getEntityCreationFlag() {
		return EntityCreationFlag;
	}

	public String getExtnNum() {
		return ExtnNum;
	}

	public String getFatherOrHusbandName() {
		return FatherOrHusbandName;
	}

	public String getFax() {
		return Fax;
	}

	public String getFaxHome() {
		return FaxHome;
	}

	public String getGender() {
		return Gender;
	}

	public String getGroupIdCode() {
		return GroupIdCode;
	}

	public String getHouseholdName() {
		return HouseholdName;
	}

	public String getIncrementalDt() {
		return IncrementalDt;
	}

	public String getInternalScore() {
		return InternalScore;
	}

	public String getSalutationCodeOfIntroducer() {
		return SalutationCodeOfIntroducer;
	}

	public String getStatusOfIntroducer() {
		return StatusOfIntroducer;
	}

	public String getNameOfIntroducer() {
		return NameOfIntroducer;
	}

	public String getSalutationOfIntroducer() {
		return SalutationOfIntroducer;
	}

	public String getIsSwiftCodeOfBank() {
		return IsSwiftCodeOfBank;
	}

	public String getIsCorpRepresentative() {
		return IsCorpRepresentative;
	}

	public String getIsDummy() {
		return IsDummy;
	}

	public String getIsEBankingEnabled() {
		return IsEBankingEnabled;
	}

	public String getIsSMSBankingEnabled() {
		return IsSMSBankingEnabled;
	}

	public String getIsWAPBankingEnabled() {
		return IsWAPBankingEnabled;
	}

	public String getLeadSource() {
		return LeadSource;
	}

	public String getLicenseNum() {
		return LicenseNum;
	}

	public String getMaidenName() {
		return MaidenName;
	}

	public String getMaidenNameOfMother() {
		return MaidenNameOfMother;
	}

	public String getManager() {
		return Manager;
	}

	public String getManagerOpinion() {
		return ManagerOpinion;
	}

	public String getGuardianCode() {
		return GuardianCode;
	}

	public String getGuardianName() {
		return GuardianName;
	}

	public String getModifiedBySysId() {
		return ModifiedBySysId;
	}

	public String getMotherName() {
		return MotherName;
	}

	public String getName() {
		return Name;
	}

	public String getNameSuffix() {
		return NameSuffix;
	}

	public String getNationalIdCardNum() {
		return NationalIdCardNum;
	}

	public String getNativeLanguage() {
		return NativeLanguage;
	}

	public String getNativeLanguageCode() {
		return NativeLanguageCode;
	}

	public String getNativeLanguageName() {
		return NativeLanguageName;
	}

	public String getNativeLanguageTitle() {
		return NativeLanguageTitle;
	}

	public String getNativeLanguageTitleCode() {
		return NativeLanguageTitleCode;
	}

	public String getIsNegated() {
		return IsNegated;
	}

	public String getNegationNotes() {
		return NegationNotes;
	}

	public String getNegationReason() {
		return NegationReason;
	}

	public String getNickName() {
		return NickName;
	}

	public String getNotes() {
		return Notes;
	}

	public String getOccupation() {
		return Occupation;
	}

	public String getOccupationCode() {
		return OccupationCode;
	}

	public String getOfflineCumDrLimit() {
		return OfflineCumDrLimit;
	}

	public String getPAN() {
		return PAN;
	}

	public String getPassportNum() {
		return PassportNum;
	}

	public String getPersonType() {
		return PersonType;
	}

	public String getPhone() {
		return Phone;
	}

	public String getPlaceOfBirth() {
		return PlaceOfBirth;
	}

	public String getPotentialCrLine() {
		return PotentialCrLine;
	}

	public String getPrefCode() {
		return PrefCode;
	}

	public String getPrefCodeRefCode() {
		return PrefCodeRefCode;
	}

	public String getPrefName() {
		return PrefName;
	}

	public String getPreviousName() {
		return PreviousName;
	}

	public String getPrimaryServiceCentre() {
		return PrimaryServiceCentre;
	}

	public String getPrimarySolId() {
		return PrimarySolId;
	}

	public String getPriorityCode() {
		return PriorityCode;
	}

	public String getProofOfAgeDoc() {
		return ProofOfAgeDoc;
	}

	public String getProofOfAgeFlag() {
		return ProofOfAgeFlag;
	}

	public String getPassportDtls() {
		return PassportDtls;
	}

	public String getRating() {
		return Rating;
	}

	public String getRatingCode() {
		return RatingCode;
	}

	public String getRegion() {
		return Region;
	}

	public String getRelationshipLevel() {
		return RelationshipLevel;
	}

	public String getRelationshipType() {
		return RelationshipType;
	}

	public String getRelationshipOpeningDt() {
		return RelationshipOpeningDt;
	}

	public String getRelationshipValue() {
		return RelationshipValue;
	}

	public RetCustAddrInfo getRetCustAddrInfo() {
		return RetCustAddrInfoObject;
	}

	public String getRevenueUnits() {
		return RevenueUnits;
	}

	public String getSalutation() {
		return Salutation;
	}

	public String getSalutationCode() {
		return SalutationCode;
	}

	public String getSector() {
		return Sector;
	}

	public String getSectorCode() {
		return SectorCode;
	}

	public String getSegmentationClass() {
		return SegmentationClass;
	}

	public String getShortName() {
		return ShortName;
	}

	public String getShortNameNative() {
		return ShortNameNative;
	}

	public String getShortNameNative1() {
		return ShortNameNative1;
	}

	public String getSICCode() {
		return SICCode;
	}

	public String getSMSBankingMobNum() {
		return SMSBankingMobNum;
	}

	public String getSSN() {
		return SSN;
	}

	public String getStaffFlag() {
		return StaffFlag;
	}

	public String getStartDt() {
		return StartDt;
	}

	public String getStatus() {
		return Status;
	}

	public String getSubSector() {
		return SubSector;
	}

	public String getSubSectorCode() {
		return SubSectorCode;
	}

	public String getSubSegment() {
		return SubSegment;
	}

	public String getSuspendNotes() {
		return SuspendNotes;
	}

	public String getSuspendReason() {
		return SuspendReason;
	}

	public String getIsSuspended() {
		return IsSuspended;
	}

	public String getTFPartyFlag() {
		return TFPartyFlag;
	}

	public String getTickerSymbol() {
		return TickerSymbol;
	}

	public String getTotalCrExposure() {
		return TotalCrExposure;
	}

	public String getForeignAccTaxReportingReq() {
		return ForeignAccTaxReportingReq;
	}

	public String getForeignTaxReportingCountry() {
		return ForeignTaxReportingCountry;
	}

	public String getForeignTaxReportingStatus() {
		return ForeignTaxReportingStatus;
	}

	public String getFatcaRemarks() {
		return FatcaRemarks;
	}

	public String getDateOfDeath() {
		return DateOfDeath;
	}

	public String getDateOfNotification() {
		return DateOfNotification;
	}

	public String getSenCitizenApplicableDate() {
		return SenCitizenApplicableDate;
	}

	public String getSeniorCitizen() {
		return SeniorCitizen;
	}

	public String getCustStatus() {
		return CustStatus;
	}

	public String getPhysicalState() {
		return PhysicalState;
	}

	public String getAadhaarNumber() {
		return AadhaarNumber;
	}

	public String getStaffEmployeeID() {
		return StaffEmployeeID;
	}

	// Setter Methods

	public void setAcctName(String AcctName) {
		this.AcctName = AcctName;
	}

	public void setAnnualRevenue(String AnnualRevenue) {
		this.AnnualRevenue = AnnualRevenue;
	}

	public void setAssistant(String Assistant) {
		this.Assistant = Assistant;
	}

	public void setAvailableCrLimit(String AvailableCrLimit) {
		this.AvailableCrLimit = AvailableCrLimit;
	}

	public void setBlacklistNotes(String BlacklistNotes) {
		this.BlacklistNotes = BlacklistNotes;
	}

	public void setBlacklistReason(String BlacklistReason) {
		this.BlacklistReason = BlacklistReason;
	}

	public void setIsBlacklisted(String IsBlacklisted) {
		this.IsBlacklisted = IsBlacklisted;
	}

	public void setCardHolder(String CardHolder) {
		this.CardHolder = CardHolder;
	}

	public void setCategory(String Category) {
		this.Category = Category;
	}

	public void setChargeLevelCode(String ChargeLevelCode) {
		this.ChargeLevelCode = ChargeLevelCode;
	}

	public void setCustId(String CustId) {
		this.CustId = CustId;
	}

	public void setCIN(String CIN) {
		this.CIN = CIN;
	}

	public void setCity(String City) {
		this.City = City;
	}

	public void setCombinedStmtFlag(String CombinedStmtFlag) {
		this.CombinedStmtFlag = CombinedStmtFlag;
	}

	public void setConstitutionCode(String ConstitutionCode) {
		this.ConstitutionCode = ConstitutionCode;
	}

	public void setConstitutionRefCode(String ConstitutionRefCode) {
		this.ConstitutionRefCode = ConstitutionRefCode;
	}

	public void setCorpRepCount(String CorpRepCount) {
		this.CorpRepCount = CorpRepCount;
	}

	public void setCountryOfBirth(String CountryOfBirth) {
		this.CountryOfBirth = CountryOfBirth;
	}

	public void setCreatedFrom(String CreatedFrom) {
		this.CreatedFrom = CreatedFrom;
	}

	public void setCreatedBySystemId(String CreatedBySystemId) {
		this.CreatedBySystemId = CreatedBySystemId;
	}

	public void setCurrCode(String CurrCode) {
		this.CurrCode = CurrCode;
	}

	public void setCurrentCrExposure(String CurrentCrExposure) {
		this.CurrentCrExposure = CurrentCrExposure;
	}

	public void setCommunityCode(String CommunityCode) {
		this.CommunityCode = CommunityCode;
	}

	public void setCommunity(String Community) {
		this.Community = Community;
	}

	public void setBirthDt(String BirthDt) {
		this.BirthDt = BirthDt;
	}

	public void setFirstName(String FirstName) {
		this.FirstName = FirstName;
	}

	public void setFirstNameNative(String FirstNameNative) {
		this.FirstNameNative = FirstNameNative;
	}

	public void setFirstNameNative1(String FirstNameNative1) {
		this.FirstNameNative1 = FirstNameNative1;
	}

	public void setHealth(String Health) {
		this.Health = Health;
	}

	public void setHealthCode(String HealthCode) {
		this.HealthCode = HealthCode;
	}

	public void setLanguage(String Language) {
		this.Language = Language;
	}

	public void setLastName(String LastName) {
		this.LastName = LastName;
	}

	public void setLastNameNative(String LastNameNative) {
		this.LastNameNative = LastNameNative;
	}

	public void setLastNameNative1(String LastNameNative1) {
		this.LastNameNative1 = LastNameNative1;
	}

	public void setMiddleName(String MiddleName) {
		this.MiddleName = MiddleName;
	}

	public void setMiddleNameNative(String MiddleNameNative) {
		this.MiddleNameNative = MiddleNameNative;
	}

	public void setMiddleNameNative1(String MiddleNameNative1) {
		this.MiddleNameNative1 = MiddleNameNative1;
	}

	public void setIsStaff(String IsStaff) {
		this.IsStaff = IsStaff;
	}

	public void setSwiftCode(String SwiftCode) {
		this.SwiftCode = SwiftCode;
	}

	public void setCustType(String CustType) {
		this.CustType = CustType;
	}

	public void setCustTypeCode(String CustTypeCode) {
		this.CustTypeCode = CustTypeCode;
	}

	public void setCustClass(String CustClass) {
		this.CustClass = CustClass;
	}

	public void setIsMinor(String IsMinor) {
		this.IsMinor = IsMinor;
	}

	public void setIsNRE(String IsNRE) {
		this.IsNRE = IsNRE;
	}

	public void setCustProfitability(String CustProfitability) {
		this.CustProfitability = CustProfitability;
	}

	public void setCustRelNum(String CustRelNum) {
		this.CustRelNum = CustRelNum;
	}

	public void setCustTrade(String CustTrade) {
		this.CustTrade = CustTrade;
	}

	public void setDefaultAddrType(String DefaultAddrType) {
		this.DefaultAddrType = DefaultAddrType;
	}

	public void setDelinquencyFlag(String DelinquencyFlag) {
		this.DelinquencyFlag = DelinquencyFlag;
	}

	public void setDeliquencyPeriod(String DeliquencyPeriod) {
		this.DeliquencyPeriod = DeliquencyPeriod;
	}

	public void setDesignation(String Designation) {
		this.Designation = Designation;
	}

	public void setIsDocReceived(String IsDocReceived) {
		this.IsDocReceived = IsDocReceived;
	}

	public void setDualFirstName(String DualFirstName) {
		this.DualFirstName = DualFirstName;
	}

	public void setDualLastName(String DualLastName) {
		this.DualLastName = DualLastName;
	}

	public void setDualMiddleName(String DualMiddleName) {
		this.DualMiddleName = DualMiddleName;
	}

	public void setEducation(String Education) {
		this.Education = Education;
	}

	public void setEntityCreationFlag(String EntityCreationFlag) {
		this.EntityCreationFlag = EntityCreationFlag;
	}

	public void setExtnNum(String ExtnNum) {
		this.ExtnNum = ExtnNum;
	}

	public void setFatherOrHusbandName(String FatherOrHusbandName) {
		this.FatherOrHusbandName = FatherOrHusbandName;
	}

	public void setFax(String Fax) {
		this.Fax = Fax;
	}

	public void setFaxHome(String FaxHome) {
		this.FaxHome = FaxHome;
	}

	public void setGender(String Gender) {
		this.Gender = Gender;
	}

	public void setGroupIdCode(String GroupIdCode) {
		this.GroupIdCode = GroupIdCode;
	}

	public void setHouseholdName(String HouseholdName) {
		this.HouseholdName = HouseholdName;
	}

	public void setIncrementalDt(String IncrementalDt) {
		this.IncrementalDt = IncrementalDt;
	}

	public void setInternalScore(String InternalScore) {
		this.InternalScore = InternalScore;
	}

	public void setSalutationCodeOfIntroducer(String SalutationCodeOfIntroducer) {
		this.SalutationCodeOfIntroducer = SalutationCodeOfIntroducer;
	}

	public void setStatusOfIntroducer(String StatusOfIntroducer) {
		this.StatusOfIntroducer = StatusOfIntroducer;
	}

	public void setNameOfIntroducer(String NameOfIntroducer) {
		this.NameOfIntroducer = NameOfIntroducer;
	}

	public void setSalutationOfIntroducer(String SalutationOfIntroducer) {
		this.SalutationOfIntroducer = SalutationOfIntroducer;
	}

	public void setIsSwiftCodeOfBank(String IsSwiftCodeOfBank) {
		this.IsSwiftCodeOfBank = IsSwiftCodeOfBank;
	}

	public void setIsCorpRepresentative(String IsCorpRepresentative) {
		this.IsCorpRepresentative = IsCorpRepresentative;
	}

	public void setIsDummy(String IsDummy) {
		this.IsDummy = IsDummy;
	}

	public void setIsEBankingEnabled(String IsEBankingEnabled) {
		this.IsEBankingEnabled = IsEBankingEnabled;
	}

	public void setIsSMSBankingEnabled(String IsSMSBankingEnabled) {
		this.IsSMSBankingEnabled = IsSMSBankingEnabled;
	}

	public void setIsWAPBankingEnabled(String IsWAPBankingEnabled) {
		this.IsWAPBankingEnabled = IsWAPBankingEnabled;
	}

	public void setLeadSource(String LeadSource) {
		this.LeadSource = LeadSource;
	}

	public void setLicenseNum(String LicenseNum) {
		this.LicenseNum = LicenseNum;
	}

	public void setMaidenName(String MaidenName) {
		this.MaidenName = MaidenName;
	}

	public void setMaidenNameOfMother(String MaidenNameOfMother) {
		this.MaidenNameOfMother = MaidenNameOfMother;
	}

	public void setManager(String Manager) {
		this.Manager = Manager;
	}

	public void setManagerOpinion(String ManagerOpinion) {
		this.ManagerOpinion = ManagerOpinion;
	}

	public void setGuardianCode(String GuardianCode) {
		this.GuardianCode = GuardianCode;
	}

	public void setGuardianName(String GuardianName) {
		this.GuardianName = GuardianName;
	}

	public void setModifiedBySysId(String ModifiedBySysId) {
		this.ModifiedBySysId = ModifiedBySysId;
	}

	public void setMotherName(String MotherName) {
		this.MotherName = MotherName;
	}

	public void setName(String Name) {
		this.Name = Name;
	}

	public void setNameSuffix(String NameSuffix) {
		this.NameSuffix = NameSuffix;
	}

	public void setNationalIdCardNum(String NationalIdCardNum) {
		this.NationalIdCardNum = NationalIdCardNum;
	}

	public void setNativeLanguage(String NativeLanguage) {
		this.NativeLanguage = NativeLanguage;
	}

	public void setNativeLanguageCode(String NativeLanguageCode) {
		this.NativeLanguageCode = NativeLanguageCode;
	}

	public void setNativeLanguageName(String NativeLanguageName) {
		this.NativeLanguageName = NativeLanguageName;
	}

	public void setNativeLanguageTitle(String NativeLanguageTitle) {
		this.NativeLanguageTitle = NativeLanguageTitle;
	}

	public void setNativeLanguageTitleCode(String NativeLanguageTitleCode) {
		this.NativeLanguageTitleCode = NativeLanguageTitleCode;
	}

	public void setIsNegated(String IsNegated) {
		this.IsNegated = IsNegated;
	}

	public void setNegationNotes(String NegationNotes) {
		this.NegationNotes = NegationNotes;
	}

	public void setNegationReason(String NegationReason) {
		this.NegationReason = NegationReason;
	}

	public void setNickName(String NickName) {
		this.NickName = NickName;
	}

	public void setNotes(String Notes) {
		this.Notes = Notes;
	}

	public void setOccupation(String Occupation) {
		this.Occupation = Occupation;
	}

	public void setOccupationCode(String OccupationCode) {
		this.OccupationCode = OccupationCode;
	}

	public void setOfflineCumDrLimit(String OfflineCumDrLimit) {
		this.OfflineCumDrLimit = OfflineCumDrLimit;
	}

	public void setPAN(String PAN) {
		this.PAN = PAN;
	}

	public void setPassportNum(String PassportNum) {
		this.PassportNum = PassportNum;
	}

	public void setPersonType(String PersonType) {
		this.PersonType = PersonType;
	}

	public void setPhone(String Phone) {
		this.Phone = Phone;
	}

	public void setPlaceOfBirth(String PlaceOfBirth) {
		this.PlaceOfBirth = PlaceOfBirth;
	}

	public void setPotentialCrLine(String PotentialCrLine) {
		this.PotentialCrLine = PotentialCrLine;
	}

	public void setPrefCode(String PrefCode) {
		this.PrefCode = PrefCode;
	}

	public void setPrefCodeRefCode(String PrefCodeRefCode) {
		this.PrefCodeRefCode = PrefCodeRefCode;
	}

	public void setPrefName(String PrefName) {
		this.PrefName = PrefName;
	}

	public void setPreviousName(String PreviousName) {
		this.PreviousName = PreviousName;
	}

	public void setPrimaryServiceCentre(String PrimaryServiceCentre) {
		this.PrimaryServiceCentre = PrimaryServiceCentre;
	}

	public void setPrimarySolId(String PrimarySolId) {
		this.PrimarySolId = PrimarySolId;
	}

	public void setPriorityCode(String PriorityCode) {
		this.PriorityCode = PriorityCode;
	}

	public void setProofOfAgeDoc(String ProofOfAgeDoc) {
		this.ProofOfAgeDoc = ProofOfAgeDoc;
	}

	public void setProofOfAgeFlag(String ProofOfAgeFlag) {
		this.ProofOfAgeFlag = ProofOfAgeFlag;
	}

	public void setPassportDtls(String PassportDtls) {
		this.PassportDtls = PassportDtls;
	}

	public void setRating(String Rating) {
		this.Rating = Rating;
	}

	public void setRatingCode(String RatingCode) {
		this.RatingCode = RatingCode;
	}

	public void setRegion(String Region) {
		this.Region = Region;
	}

	public void setRelationshipLevel(String RelationshipLevel) {
		this.RelationshipLevel = RelationshipLevel;
	}

	public void setRelationshipType(String RelationshipType) {
		this.RelationshipType = RelationshipType;
	}

	public void setRelationshipOpeningDt(String RelationshipOpeningDt) {
		this.RelationshipOpeningDt = RelationshipOpeningDt;
	}

	public void setRelationshipValue(String RelationshipValue) {
		this.RelationshipValue = RelationshipValue;
	}

	public void setRetCustAddrInfo(RetCustAddrInfo RetCustAddrInfoObject) {
		this.RetCustAddrInfoObject = RetCustAddrInfoObject;
	}

	public void setRevenueUnits(String RevenueUnits) {
		this.RevenueUnits = RevenueUnits;
	}

	public void setSalutation(String Salutation) {
		this.Salutation = Salutation;
	}

	public void setSalutationCode(String SalutationCode) {
		this.SalutationCode = SalutationCode;
	}

	public void setSector(String Sector) {
		this.Sector = Sector;
	}

	public void setSectorCode(String SectorCode) {
		this.SectorCode = SectorCode;
	}

	public void setSegmentationClass(String SegmentationClass) {
		this.SegmentationClass = SegmentationClass;
	}

	public void setShortName(String ShortName) {
		this.ShortName = ShortName;
	}

	public void setShortNameNative(String ShortNameNative) {
		this.ShortNameNative = ShortNameNative;
	}

	public void setShortNameNative1(String ShortNameNative1) {
		this.ShortNameNative1 = ShortNameNative1;
	}

	public void setSICCode(String SICCode) {
		this.SICCode = SICCode;
	}

	public void setSMSBankingMobNum(String SMSBankingMobNum) {
		this.SMSBankingMobNum = SMSBankingMobNum;
	}

	public void setSSN(String SSN) {
		this.SSN = SSN;
	}

	public void setStaffFlag(String StaffFlag) {
		this.StaffFlag = StaffFlag;
	}

	public void setStartDt(String StartDt) {
		this.StartDt = StartDt;
	}

	public void setStatus(String Status) {
		this.Status = Status;
	}

	public void setSubSector(String SubSector) {
		this.SubSector = SubSector;
	}

	public void setSubSectorCode(String SubSectorCode) {
		this.SubSectorCode = SubSectorCode;
	}

	public void setSubSegment(String SubSegment) {
		this.SubSegment = SubSegment;
	}

	public void setSuspendNotes(String SuspendNotes) {
		this.SuspendNotes = SuspendNotes;
	}

	public void setSuspendReason(String SuspendReason) {
		this.SuspendReason = SuspendReason;
	}

	public void setIsSuspended(String IsSuspended) {
		this.IsSuspended = IsSuspended;
	}

	public void setTFPartyFlag(String TFPartyFlag) {
		this.TFPartyFlag = TFPartyFlag;
	}

	public void setTickerSymbol(String TickerSymbol) {
		this.TickerSymbol = TickerSymbol;
	}

	public void setTotalCrExposure(String TotalCrExposure) {
		this.TotalCrExposure = TotalCrExposure;
	}

	public void setForeignAccTaxReportingReq(String ForeignAccTaxReportingReq) {
		this.ForeignAccTaxReportingReq = ForeignAccTaxReportingReq;
	}

	public void setForeignTaxReportingCountry(String ForeignTaxReportingCountry) {
		this.ForeignTaxReportingCountry = ForeignTaxReportingCountry;
	}

	public void setForeignTaxReportingStatus(String ForeignTaxReportingStatus) {
		this.ForeignTaxReportingStatus = ForeignTaxReportingStatus;
	}

	public void setFatcaRemarks(String FatcaRemarks) {
		this.FatcaRemarks = FatcaRemarks;
	}

	public void setDateOfDeath(String DateOfDeath) {
		this.DateOfDeath = DateOfDeath;
	}

	public void setDateOfNotification(String DateOfNotification) {
		this.DateOfNotification = DateOfNotification;
	}

	public void setSenCitizenApplicableDate(String SenCitizenApplicableDate) {
		this.SenCitizenApplicableDate = SenCitizenApplicableDate;
	}

	public void setSeniorCitizen(String SeniorCitizen) {
		this.SeniorCitizen = SeniorCitizen;
	}

	public void setCustStatus(String CustStatus) {
		this.CustStatus = CustStatus;
	}

	public void setPhysicalState(String PhysicalState) {
		this.PhysicalState = PhysicalState;
	}

	public void setAadhaarNumber(String AadhaarNumber) {
		this.AadhaarNumber = AadhaarNumber;
	}

	public void setStaffEmployeeID(String StaffEmployeeID) {
		this.StaffEmployeeID = StaffEmployeeID;
	}
}