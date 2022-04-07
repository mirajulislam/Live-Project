package com.naztech.lms.creditCard.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * @author Mirajul.islam
 */
public class AcquisitionApplicantDetails extends AcquisitionBase {
	private Integer idAcquisitionApplicantKey;
	private Integer idAcquisitionApplicantVer;

	private SupplementAndReferDetails supplementAndReferDetails;
	private List<Document> applicantDocumentList;
	private List<AcquisitionDetailsConfig> priviousOrganizationDetails;
	private List<AcquisitionDetailsConfig> othersBankLiabilityPosition;
	private List<AcquisitionDetailsConfig> aboutOtherBankDetails;
	private List<AcquisitionDetailsConfig> securityDetails;
	private List<AcquisitionDetailsConfig> companiesUderOwnership;
	private Integer idSupplementAndReferKey;
	private Integer creditCardId;
	private String applicantTId;
	private String applicantCustomerType;
	private String applicantAccountNumber;
	private String applicantNidNumber;
	private String applicantBpNumber;
	private String applicantApplyingFor;
	private String applicantTypeOfCard;
	private String applicantName;
	private String applicantGenderNeutralTitle;
	private String applicantNameOnCard;
	private String applicantNameInBangla;
	private String applicantNationality;
	private String applicantSpecifyNationality;
	private String applicantProfession;
	private Date applicantDateOfBirth;
	private String applicantEtinNumber;
	private String applicantGender;
	private String applicantMobileNumber;
	private String applicantOtherPhotoID;
	private String applicantPassportNo;
	private String applicantIdIssueCountry;
	private Date applicantIdIssueDate;
	private Date applicantIdIssueDateExp;
	private String applicantFatherName;
	private String applicantMotherName;
	private String applicantSpouseName;
	private String applicantSpouseMobileNo;
	private String applicantMaritalStatus;
	private String applicantMaritalStatusOthers;
	private String applicantNoOfDependents;
	private String applicantHighestEducation;
	private String applicantHighestEducationOthers;
	private String applicantResStatus;
	private String applicantResiAddress;
	private String applicantResiNearLandmark;
	private String applicantResiAddressPS;
	private String applicantResiAddressPostCode;
	private String applicantResiAddressDistrict;
	private String applicantResiAddressCountry;
	private String applicantPerAddress;
	private String applicantPerAddressNearLand;
	private String applicantPerAddressPS;
	private String applicantPerAddressPostCode;
	private String applicantPerAddressDistrict;
	private String applicantPerAddressCountry;
	private String applicantOccupation;
	private String applicantOccupationOthers;
	private String applicantCompanyName;
	private String applicantDesignation;
	private String applicantDepartment;
	private String applicantNatureOfBusiness;
	private String applicantEmployeeID;
	private String applicantOfficeAddress;
	private String applicantOfficeAddressPS;
	private String applicantOfficeAddressPostCode;
	private String applicantOfficeAddressDistrict;
	private String applicantOfficeAddressCountry;
	private String applicantEmployeeStatus;
	private String applicantBusinessEstablished;
	private String applicantDurInCurrentJobYear;
	private String applicantDurInCurrentJobMonth;
	private String applicantTotalWorkExpYear;
	private String applicantTotalWorkExpMonth;
	private String applicantOfficePhoneNo;
	private String applicantMobileNo;
	private String applicantMailingComAddress;
	private String applicantCardReceivingWayName;
	private String applicantCardReceivingWay;
	private String applicantMonthlyStatementsSentWay;
	private String applicantPromActivitPurposeId;
	private Double applicantAdditionalIncome;
	private Double applicantSpouseIncome;
	private Double salariedMonthGrossSalary;
	private Double salariedMonthTotalDeduction;
	private Double salariedMonthNetIncome;
	private Double nonSalariedMonthGrossSalary;
	private Double nonSalariedMonthTotalExpense;
	private Double nonSalariedMonthNetIncome;
	private String otherBankLiabilityPosition;
	private String otherBankAccDetails;
	private Double demandPromissoryTaka;
	private Date demandPromissoryDate;
	private String demandPromissoryPlace;
	private String demandPromissoryMessage;
	private Double demandPromissorySecondTaka;
	private Integer demandPromissoryRate;
	private String bankBranchname;
	private Integer bankSolID;
	private String bankGeoLocationCheck1;
	private String bankGeoLocationText1;
	private String bankGeoLocationText2;
	private String bankGeoLocationCheck2;
	private String sourceComments;
	private String applicantPostalCode;
	private String applicantAddress;
	private String applicantDistrict;
	private String applicantStreetName;
	private String applicantStreetNo;
	private String applicantPostCode;
	private String applicantDistrictOfBirth;
	private String applicantCountryOfBirth;
	private String businessAddress;
	private String businessDistrict;
	private String businessStreetName;
	private String businessStreetNumber;
	private String businessPostalCode;
	private String businessCountry;
	private String applicantOwnerPartner;
	private String applicantIdNo;
	private String cibSubjectCode;
	private String fiSubjectCode;
	private String bankName;
	private String tradeName;
	private String fiCode;
	private String branchCode;
	private String typeOfFinancing;
	private Double totalRequestedAmountOrCreditLmt;
	private Date installmentContractDate;
	private Double installmentAmount;
	private String numOfInstallment;
	private String paymentPeriodicity;
	private String sectorType;
	private String sectorCode;
	private String managerSealAndSignaure;
	private String applicantSignature;
	private String authorizedOfficerSealAndSignaure;
	private String applicantPresentaddressStreetName;
	private String applicantPresentaddressStreetNumber;
	private String cifNo;
	private String fundSource;
	private Double monthlyincome;
	private String spouseEmploymentStatus;
	private String membershipOfClub;
	private String specifyClubName;
	private String youAreVerifiedCustomer;
	private Double houseRentRange;
	private String haveCustomerOwnCar;
	private String carBrandName;
	private Double travelYearlyNumber;
	private String passportNumberIndentity;
	private String nidIndetity;
	private String eTinIdIdentity;
	private String passportNumberObtained;
	private String passportNumberVerified;
	private String nidIndetityObtained;
	private String nidIndetityVerified;
	private String eTinIdIdentityObtained;
	private String eTinIdIdentityVerified;
	private String politicallyExposedPerson;
	private String youAreSeniorManagment;
	private String youAreFaceToFaceInterview;
	private String youAreTerroristActivities;
	private String youAreTerroristActivitieRegard;
	private String exceptionDetails;
	private Double applicantAskingLimit;
	private Double applicantRecommendedLimit;
	private String interviewedSourceSign;
	private String managerOrUnitHeadSign;
	private String youAreCbblAccountHolder;
	private String autoPayInstruction;
	private String applicantUsdAccountPortion;
	private String cardStateName;
	private Integer cardStateId;
	private String paymentTypeOfStandingInstruction;
	private String paymentTypeOfStandingInstruction1;
	private String applicantIdType;
	private String applicantOtherId;
	private String applicantPerStreetNo;
	private String applicantPerStreetName;
	private String folderName;
	private String fromDate4Src;
	private String toDate4Src;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_acquisition_applicant_key", "idAcquisitionApplicantKey");
			sql2BeanMap.put("@id_acquisition_applicant_ver", "idAcquisitionApplicantVer");

			sql2BeanMap.put("@id_supplement_and_refer_key", "idSupplementAndReferKey");
			sql2BeanMap.put("@id_credit_card_key", "creditCardId");
			sql2BeanMap.put("@tx_applicant_tid", "applicantTId");
			sql2BeanMap.put("@tx_applicant_customer_type", "applicantCustomerType");
			sql2BeanMap.put("@tx_applicant_account_number", "applicantAccountNumber");
			sql2BeanMap.put("@tx_applicant_nid_number", "applicantNidNumber");
			sql2BeanMap.put("@tx_applicant_bp_number", "applicantBpNumber");
			sql2BeanMap.put("@tx_applicant_applying_for", "applicantApplyingFor");
			sql2BeanMap.put("@tx_applicant_typeof_card", "applicantTypeOfCard");
			sql2BeanMap.put("@tx_applicant_name", "applicantName");
			sql2BeanMap.put("@tx_applicant_gender_neutral_title", "applicantGenderNeutralTitle");
			sql2BeanMap.put("@tx_applicant_nameon_card", "applicantNameOnCard");
			sql2BeanMap.put("@tx_applicant_namein_bangla", "applicantNameInBangla");
			sql2BeanMap.put("@tx_applicant_nationality", "applicantNationality");
			sql2BeanMap.put("@tx_applicant_specify_nationality", "applicantSpecifyNationality");
			sql2BeanMap.put("@tx_applicant_profession", "applicantProfession");
			sql2BeanMap.put("@dtt_applicant_dateof_birth", "applicantDateOfBirth");
			sql2BeanMap.put("@tx_applicant_etin_number", "applicantEtinNumber");
			sql2BeanMap.put("@tx_applicant_gender", "applicantGender");
			sql2BeanMap.put("@tx_applicant_mobile_number", "applicantMobileNumber");
			sql2BeanMap.put("@tx_applicant_other_photoid", "applicantOtherPhotoID");
			sql2BeanMap.put("@tx_applicant_passportno", "applicantPassportNo");
			sql2BeanMap.put("@tx_applicant_id_issue_country", "applicantIdIssueCountry");
			sql2BeanMap.put("@dtt_applicant_id_issue_date", "applicantIdIssueDate");
			sql2BeanMap.put("@dtt_applicant_id_issue_date_exp", "applicantIdIssueDateExp");
			sql2BeanMap.put("@tx_applicant_father_name", "applicantFatherName");
			sql2BeanMap.put("@tx_applicant_mother_name", "applicantMotherName");
			sql2BeanMap.put("@tx_applicant_spouse_name", "applicantSpouseName");
			sql2BeanMap.put("@tx_applicant_spouse_mobile_no", "applicantSpouseMobileNo");
			sql2BeanMap.put("@tx_applicant_marital_status", "applicantMaritalStatus");
			sql2BeanMap.put("@tx_applicant_marital_status_others", "applicantMaritalStatusOthers");
			sql2BeanMap.put("@tx_applicant_noof_dependents", "applicantNoOfDependents");
			sql2BeanMap.put("@tx_applicant_highest_education", "applicantHighestEducation");
			sql2BeanMap.put("@tx_applicant_highest_education_others", "applicantHighestEducationOthers");
			sql2BeanMap.put("@tx_applicant_resi_status", "applicantResStatus");
			sql2BeanMap.put("@tx_applicant_resi_address", "applicantResiAddress");
			sql2BeanMap.put("@tx_applicant_resi_near_landmark", "applicantResiNearLandmark");
			sql2BeanMap.put("@tx_applicant_resi_address_ps", "applicantResiAddressPS");
			sql2BeanMap.put("@tx_applicant_resi_address_post_code", "applicantResiAddressPostCode");
			sql2BeanMap.put("@tx_applicant_resi_address_district", "applicantResiAddressDistrict");
			sql2BeanMap.put("@tx_applicant_resi_address_country", "applicantResiAddressCountry");
			sql2BeanMap.put("@tx_applicant_per_address", "applicantPerAddress");
			sql2BeanMap.put("@tx_applicant_per_address_near_land", "applicantPerAddressNearLand");
			sql2BeanMap.put("@tx_applicant_per_address_ps", "applicantPerAddressPS");
			sql2BeanMap.put("@tx_applicant_per_address_post_code", "applicantPerAddressPostCode");
			sql2BeanMap.put("@tx_applicant_per_address_district", "applicantPerAddressDistrict");
			sql2BeanMap.put("@tx_applicant_per_address_country", "applicantPerAddressCountry");
			sql2BeanMap.put("@tx_applicant_occupation", "applicantOccupation");
			sql2BeanMap.put("@tx_applicant_occupation_others", "applicantOccupationOthers");
			sql2BeanMap.put("@tx_applicant_company_name", "applicantCompanyName");
			sql2BeanMap.put("@tx_applicant_designation", "applicantDesignation");
			sql2BeanMap.put("@tx_applicant_department", "applicantDepartment");
			sql2BeanMap.put("@tx_applicant_nature_of_business", "applicantNatureOfBusiness");
			sql2BeanMap.put("@tx_applicant_employee_id", "applicantEmployeeID");
			sql2BeanMap.put("@tx_applicant_office_address", "applicantOfficeAddress");
			sql2BeanMap.put("@tx_applicant_office_address_ps", "applicantOfficeAddressPS");
			sql2BeanMap.put("@tx_applicant_office_address_post_code", "applicantOfficeAddressPostCode");
			sql2BeanMap.put("@tx_applicant_office_address_district", "applicantOfficeAddressDistrict");
			sql2BeanMap.put("@tx_applicant_office_address_country", "applicantOfficeAddressCountry");
			sql2BeanMap.put("@tx_applicant_employee_status", "applicantEmployeeStatus");
			sql2BeanMap.put("@tx_applicant_business_established", "applicantBusinessEstablished");
			sql2BeanMap.put("@tx_applicant_dur_in_currentjob_year", "applicantDurInCurrentJobYear");
			sql2BeanMap.put("@tx_applicant_dur_in_currentjob_month", "applicantDurInCurrentJobMonth");
			sql2BeanMap.put("@tx_applicant_total_work_expyear", "applicantTotalWorkExpYear");
			sql2BeanMap.put("@tx_applicant_total_work_expmonth", "applicantTotalWorkExpMonth");
			sql2BeanMap.put("@tx_applicant_office_phoneno", "applicantOfficePhoneNo");
			sql2BeanMap.put("@tx_applicant_mobileno", "applicantMobileNo");
			sql2BeanMap.put("@tx_applicant_mailing_com_address", "applicantMailingComAddress");
			sql2BeanMap.put("@tx_applicant_card_receiving_way_name", "applicantCardReceivingWayName");
			sql2BeanMap.put("@tx_applicant_card_receiving_way", "applicantCardReceivingWay");
			sql2BeanMap.put("@tx_applicant_monthly_statements_sentWay", "applicantMonthlyStatementsSentWay");
			sql2BeanMap.put("@tx_applicant_prom_activit_purpose_id", "applicantPromActivitPurposeId");
			sql2BeanMap.put("@dec_applicant_additional_income", "applicantAdditionalIncome");
			sql2BeanMap.put("@dec_applicant_spouse_income", "applicantSpouseIncome");
			sql2BeanMap.put("@dec_salaried_month_gross_salary", "salariedMonthGrossSalary");
			sql2BeanMap.put("@dec_salaried_month_total_deduction", "salariedMonthTotalDeduction");
			sql2BeanMap.put("@dec_salaried_month_net_income", "salariedMonthNetIncome");
			sql2BeanMap.put("@dec_nonsalaried_month_gross_salary", "nonSalariedMonthGrossSalary");
			sql2BeanMap.put("@dec_non_salaried_month_total_expense", "nonSalariedMonthTotalExpense");
			sql2BeanMap.put("@dec_non_salaried_month_net_income", "nonSalariedMonthNetIncome");
			sql2BeanMap.put("@dec_demand_promissory_taka", "demandPromissoryTaka");
			sql2BeanMap.put("@dtt_demand_promissory_date", "demandPromissoryDate");
			sql2BeanMap.put("@tx_demand_promissory_place", "demandPromissoryPlace");
			sql2BeanMap.put("@tx_demand_promissory_message", "demandPromissoryMessage");
			sql2BeanMap.put("@dec_demand_promissory_second_taka", "demandPromissorySecondTaka");
			sql2BeanMap.put("@int_demand_promissory_rate", "demandPromissoryRate");
			sql2BeanMap.put("@tx_bank_branch_name", "bankBranchname");
			sql2BeanMap.put("@int_bank_solid", "bankSolID");
			sql2BeanMap.put("@tx_bank_geo_location_check1", "bankGeoLocationCheck1");
			sql2BeanMap.put("@tx_bank_geo_location_text1", "bankGeoLocationText1");
			sql2BeanMap.put("@tx_bank_geo_location_text2", "bankGeoLocationText2");
			sql2BeanMap.put("@tx_bank_geo_location_check2", "bankGeoLocationCheck2");
			sql2BeanMap.put("@tx_source_comments", "sourceComments");
			sql2BeanMap.put("@tx_applicant_postal_code", "applicantPostalCode");
			sql2BeanMap.put("@tx_applicant_address", "applicantAddress");
			sql2BeanMap.put("@tx_applicant_district", "applicantDistrict");
			sql2BeanMap.put("@tx_applicant_street_name", "applicantStreetName");
			sql2BeanMap.put("@tx_applicant_streetno", "applicantStreetNo");
			sql2BeanMap.put("@tx_applicant_post_code", "applicantPostCode");
			sql2BeanMap.put("@tx_applicant_district_of_birth", "applicantDistrictOfBirth");
			sql2BeanMap.put("@tx_applicant_country_of_birth", "applicantCountryOfBirth");
			sql2BeanMap.put("@tx_applicant_idno", "applicantIdNo");
			sql2BeanMap.put("@tx_cib_subject_code", "cibSubjectCode");
			sql2BeanMap.put("@tx_fi_subject_code", "fiSubjectCode");
			sql2BeanMap.put("@tx_bank_name", "bankName");
			sql2BeanMap.put("@tx_trade_name", "tradeName");
			sql2BeanMap.put("@tx_fi_code", "fiCode");
			sql2BeanMap.put("@tx_branch_code", "branchCode");
			sql2BeanMap.put("@tx_typeof_financing", "typeOfFinancing");
			sql2BeanMap.put("@dec_total_requested_amountor_creditlmt", "totalRequestedAmountOrCreditLmt");
			sql2BeanMap.put("@dtt_installment_contract_date", "installmentContractDate");
			sql2BeanMap.put("@dec_installment_amount", "installmentAmount");
			sql2BeanMap.put("@tx_numof_installment", "numOfInstallment");
			sql2BeanMap.put("@tx_payment_periodicity", "paymentPeriodicity");
			sql2BeanMap.put("@tx_sector_type", "sectorType");
			sql2BeanMap.put("@tx_sector_code", "sectorCode");
			sql2BeanMap.put("@tx_manager_sealan_signaure", "managerSealAndSignaure");
			sql2BeanMap.put("@tx_applicant_signature", "applicantSignature");
			sql2BeanMap.put("@tx_authorized_officer_seal_and_signaure", "authorizedOfficerSealAndSignaure");
			sql2BeanMap.put("@tx_applicant_present_address_street_name", "applicantPresentaddressStreetName");
			sql2BeanMap.put("@tx_applicant_present_address_street_num", "applicantPresentaddressStreetNumber");
			sql2BeanMap.put("@tx_cif_no", "cifNo");
			sql2BeanMap.put("@tx_fund_source", "fundSource");
			sql2BeanMap.put("@dec_monthly_income", "monthlyincome");
			sql2BeanMap.put("@tx_spouse_employment_status", "spouseEmploymentStatus");
			sql2BeanMap.put("@tx_member_ship_of_club", "membershipOfClub");
			sql2BeanMap.put("@tx_specify_club_name", "specifyClubName");
			sql2BeanMap.put("@tx_you_are_verified_customer", "youAreVerifiedCustomer");
			sql2BeanMap.put("@dec_house_rent_range", "houseRentRange");
			sql2BeanMap.put("@tx_have_customer_own_car", "haveCustomerOwnCar");
			sql2BeanMap.put("@tx_car_brand_name", "carBrandName");
			sql2BeanMap.put("@dec_travel_yearly_number", "travelYearlyNumber");
			sql2BeanMap.put("@tx_passport_number_indentity", "passportNumberIndentity");
			sql2BeanMap.put("@tx_passport_number_obtained", "passportNumberObtained");
			sql2BeanMap.put("@tx_passport_number_verified", "passportNumberVerified");
			sql2BeanMap.put("@tx_nid_indetity", "nidIndetity");
			sql2BeanMap.put("@tx_nid_indetity_obtained", "nidIndetityObtained");
			sql2BeanMap.put("@tx_nid_indetity_verified", "nidIndetityVerified");
			sql2BeanMap.put("@tx_etin_id_identity", "eTinIdIdentity");
			sql2BeanMap.put("@tx_etin_id_identity_obtained", "eTinIdIdentityObtained");
			sql2BeanMap.put("@tx_etin_id_identity_verified", "eTinIdIdentityVerified");
			sql2BeanMap.put("@tx_politically_exposed_person", "politicallyExposedPerson");
			sql2BeanMap.put("@tx_you_are_senior_managment", "youAreSeniorManagment");
			sql2BeanMap.put("@tx_you_are_face_to_face_interview", "youAreFaceToFaceInterview");
			sql2BeanMap.put("@tx_you_are_terrorist_activities", "youAreTerroristActivities");
			sql2BeanMap.put("@tx_you_are_terrorist_activitie_regard", "youAreTerroristActivitieRegard");
			sql2BeanMap.put("@tx_exception_details", "exceptionDetails");
			sql2BeanMap.put("@dec_applicant_asking_limit", "applicantAskingLimit");
			sql2BeanMap.put("@dec_applicant_recommended_limit", "applicantRecommendedLimit");
			sql2BeanMap.put("@tx_interviewed_source_sign", "interviewedSourceSign");
			sql2BeanMap.put("@tx_managerOr_unit_head_sign", "managerOrUnitHeadSign");
			sql2BeanMap.put("@tx_you_are_cbbl_account_holder", "youAreCbblAccountHolder");
			sql2BeanMap.put("@tx_auto_pay_instruction", "autoPayInstruction");
			sql2BeanMap.put("@tx_applicant_usd_account_portion", "applicantUsdAccountPortion");
			sql2BeanMap.put("@tx_other_bank_liability_position", "otherBankLiabilityPosition");
			sql2BeanMap.put("@tx_other_bankacc_details", "otherBankAccDetails");
			sql2BeanMap.put("@tx_card_state_name", "cardStateName");
			sql2BeanMap.put("@int_card_state_id", "cardStateId");
			sql2BeanMap.put("@tx_payment_type_of_standing_instruction", "paymentTypeOfStandingInstruction");
			sql2BeanMap.put("@tx_payment_type_of_standing_instruction1", "paymentTypeOfStandingInstruction1");
			sql2BeanMap.put("@tx_applicant_id_type", "applicantIdType");
			sql2BeanMap.put("@tx_applicant_other_id", "applicantOtherId");
			sql2BeanMap.put("@tx_from_date", "fromDate4Src");
			sql2BeanMap.put("@tx_to_date", "toDate4Src");
			sql2BeanMap.put("@tx_business_address", "businessAddress");
			sql2BeanMap.put("@tx_business_district", "businessDistrict");
			sql2BeanMap.put("@tx_business_street_name", "businessStreetName");
			sql2BeanMap.put("@tx_business_street_number", "businessStreetNumber");
			sql2BeanMap.put("@tx_business_postal_code", "businessPostalCode");
			sql2BeanMap.put("@tx_business_country", "businessCountry");
			sql2BeanMap.put("@tx_applicant_owner_partner", "applicantOwnerPartner");
			sql2BeanMap.put("@tx_applicant_per_street_no","applicantPerStreetNo");
			sql2BeanMap.put("@tx_applicant_per_street_name","applicantPerStreetName");

		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_acquisition_applicant_key", "idAcquisitionApplicantKey");
			rs2BeanMap.put("id_acquisition_applicant_ver", "idAcquisitionApplicantVer");
			rs2BeanMap.put("id_supplement_and_refer_key", "idSupplementAndReferKey");
			rs2BeanMap.put("id_credit_card_key", "creditCardId");
			rs2BeanMap.put("tx_applicant_tid", "applicantTId");
			rs2BeanMap.put("tx_applicant_customer_type", "applicantCustomerType");
			rs2BeanMap.put("tx_applicant_account_number", "applicantAccountNumber");
			rs2BeanMap.put("tx_applicant_nid_number", "applicantNidNumber");
			rs2BeanMap.put("tx_applicant_bp_number", "applicantBpNumber");
			rs2BeanMap.put("tx_applicant_applying_for", "applicantApplyingFor");
			rs2BeanMap.put("tx_applicant_typeof_card", "applicantTypeOfCard");
			rs2BeanMap.put("tx_applicant_name", "applicantName");
			rs2BeanMap.put("tx_applicant_gender_neutral_title", "applicantGenderNeutralTitle");
			rs2BeanMap.put("tx_applicant_nameon_card", "applicantNameOnCard");
			rs2BeanMap.put("tx_applicant_namein_bangla", "applicantNameInBangla");
			rs2BeanMap.put("tx_applicant_nationality", "applicantNationality");
			rs2BeanMap.put("tx_applicant_specify_nationality", "applicantSpecifyNationality");
			rs2BeanMap.put("tx_applicant_profession", "applicantProfession");
			rs2BeanMap.put("dtt_applicant_dateof_birth", "applicantDateOfBirth");
			rs2BeanMap.put("tx_applicant_etin_number", "applicantEtinNumber");
			rs2BeanMap.put("tx_applicant_gender", "applicantGender");
			rs2BeanMap.put("tx_applicant_mobile_number", "applicantMobileNumber");
			rs2BeanMap.put("tx_applicant_other_photoid", "applicantOtherPhotoID");
			rs2BeanMap.put("tx_applicant_passportno", "applicantPassportNo");
			rs2BeanMap.put("tx_applicant_id_issue_country", "applicantIdIssueCountry");
			rs2BeanMap.put("dtt_applicant_id_issue_date", "applicantIdIssueDate");
			rs2BeanMap.put("dtt_applicant_id_issue_date_exp", "applicantIdIssueDateExp");
			rs2BeanMap.put("tx_applicant_father_name", "applicantFatherName");
			rs2BeanMap.put("tx_applicant_mother_name", "applicantMotherName");
			rs2BeanMap.put("tx_applicant_spouse_name", "applicantSpouseName");
			rs2BeanMap.put("tx_applicant_spouse_mobile_no", "applicantSpouseMobileNo");
			rs2BeanMap.put("tx_applicant_marital_status", "applicantMaritalStatus");
			rs2BeanMap.put("tx_applicant_marital_status_others", "applicantMaritalStatusOthers");
			rs2BeanMap.put("tx_applicant_noof_dependents", "applicantNoOfDependents");
			rs2BeanMap.put("tx_applicant_highest_education", "applicantHighestEducation");
			rs2BeanMap.put("tx_applicant_highest_education_others", "applicantHighestEducationOthers");
			rs2BeanMap.put("tx_applicant_resi_status", "applicantResStatus");
			rs2BeanMap.put("tx_applicant_resi_address", "applicantResiAddress");
			rs2BeanMap.put("tx_applicant_resi_near_landmark", "applicantResiNearLandmark");
			rs2BeanMap.put("tx_applicant_resi_address_ps", "applicantResiAddressPS");
			rs2BeanMap.put("tx_applicant_resi_address_post_code", "applicantResiAddressPostCode");
			rs2BeanMap.put("tx_applicant_resi_address_district", "applicantResiAddressDistrict");
			rs2BeanMap.put("tx_applicant_resi_address_country", "applicantResiAddressCountry");
			rs2BeanMap.put("tx_applicant_per_address", "applicantPerAddress");
			rs2BeanMap.put("tx_applicant_per_address_near_land", "applicantPerAddressNearLand");
			rs2BeanMap.put("tx_applicant_per_address_ps", "applicantPerAddressPS");
			rs2BeanMap.put("tx_applicant_per_address_post_code", "applicantPerAddressPostCode");
			rs2BeanMap.put("tx_applicant_per_address_district", "applicantPerAddressDistrict");
			rs2BeanMap.put("tx_applicant_per_address_country", "applicantPerAddressCountry");
			rs2BeanMap.put("tx_applicant_occupation", "applicantOccupation");
			rs2BeanMap.put("tx_applicant_occupation_others", "applicantOccupationOthers");
			rs2BeanMap.put("tx_applicant_company_name", "applicantCompanyName");
			rs2BeanMap.put("tx_applicant_designation", "applicantDesignation");
			rs2BeanMap.put("tx_applicant_department", "applicantDepartment");
			rs2BeanMap.put("tx_applicant_nature_of_business", "applicantNatureOfBusiness");
			rs2BeanMap.put("tx_applicant_employee_id", "applicantEmployeeID");
			rs2BeanMap.put("tx_applicant_office_address", "applicantOfficeAddress");
			rs2BeanMap.put("tx_applicant_office_address_ps", "applicantOfficeAddressPS");
			rs2BeanMap.put("tx_applicant_office_address_post_code", "applicantOfficeAddressPostCode");
			rs2BeanMap.put("tx_applicant_office_address_district", "applicantOfficeAddressDistrict");
			rs2BeanMap.put("tx_applicant_office_address_country", "applicantOfficeAddressCountry");
			rs2BeanMap.put("tx_applicant_employee_status", "applicantEmployeeStatus");
			rs2BeanMap.put("tx_applicant_business_established", "applicantBusinessEstablished");
			rs2BeanMap.put("tx_applicant_dur_in_currentjob_year", "applicantDurInCurrentJobYear");
			rs2BeanMap.put("tx_applicant_dur_in_currentjob_month", "applicantDurInCurrentJobMonth");
			rs2BeanMap.put("tx_applicant_total_work_expyear", "applicantTotalWorkExpYear");
			rs2BeanMap.put("tx_applicant_total_work_expmonth", "applicantTotalWorkExpMonth");
			rs2BeanMap.put("tx_applicant_office_phoneno", "applicantOfficePhoneNo");
			rs2BeanMap.put("tx_applicant_mobileno", "applicantMobileNo");
			rs2BeanMap.put("tx_applicant_mailing_com_address", "applicantMailingComAddress");
			rs2BeanMap.put("tx_applicant_card_receiving_way_name", "applicantCardReceivingWayName");
			rs2BeanMap.put("tx_applicant_card_receiving_way", "applicantCardReceivingWay");
			rs2BeanMap.put("tx_applicant_monthly_statements_sentWay", "applicantMonthlyStatementsSentWay");
			rs2BeanMap.put("tx_applicant_prom_activit_purpose_id", "applicantPromActivitPurposeId");
			rs2BeanMap.put("dec_applicant_additional_income", "applicantAdditionalIncome");
			rs2BeanMap.put("dec_applicant_spouse_income", "applicantSpouseIncome");
			rs2BeanMap.put("dec_salaried_month_gross_salary", "salariedMonthGrossSalary");
			rs2BeanMap.put("dec_salaried_month_total_deduction", "salariedMonthTotalDeduction");
			rs2BeanMap.put("dec_salaried_month_net_income", "salariedMonthNetIncome");
			rs2BeanMap.put("dec_nonsalaried_month_gross_salary", "nonSalariedMonthGrossSalary");
			rs2BeanMap.put("dec_non_salaried_month_total_expense", "nonSalariedMonthTotalExpense");
			rs2BeanMap.put("dec_non_salaried_month_net_income", "nonSalariedMonthNetIncome");
			rs2BeanMap.put("dec_demand_promissory_taka", "demandPromissoryTaka");
			rs2BeanMap.put("dtt_demand_promissory_date", "demandPromissoryDate");
			rs2BeanMap.put("tx_demand_promissory_place", "demandPromissoryPlace");
			rs2BeanMap.put("tx_demand_promissory_message", "demandPromissoryMessage");
			rs2BeanMap.put("dec_demand_promissory_second_taka", "demandPromissorySecondTaka");
			rs2BeanMap.put("int_demand_promissory_rate", "demandPromissoryRate");
			rs2BeanMap.put("tx_bank_branch_name", "bankBranchname");
			rs2BeanMap.put("int_bank_solid", "bankSolID");
			rs2BeanMap.put("tx_bank_geo_location_check1", "bankGeoLocationCheck1");
			rs2BeanMap.put("tx_bank_geo_location_text1", "bankGeoLocationText1");
			rs2BeanMap.put("tx_bank_geo_location_text2", "bankGeoLocationText2");
			rs2BeanMap.put("tx_bank_geo_location_check2", "bankGeoLocationCheck2");
			rs2BeanMap.put("tx_source_comments", "sourceComments");
			rs2BeanMap.put("tx_applicant_postal_code", "applicantPostalCode");
			rs2BeanMap.put("tx_applicant_address", "applicantAddress");
			rs2BeanMap.put("tx_applicant_district", "applicantDistrict");
			rs2BeanMap.put("tx_applicant_street_name", "applicantStreetName");
			rs2BeanMap.put("tx_applicant_streetno", "applicantStreetNo");
			rs2BeanMap.put("tx_applicant_post_code", "applicantPostCode");
			rs2BeanMap.put("tx_applicant_district_of_birth", "applicantDistrictOfBirth");
			rs2BeanMap.put("tx_applicant_country_of_birth", "applicantCountryOfBirth");
			rs2BeanMap.put("tx_applicant_idno", "applicantIdNo");
			rs2BeanMap.put("tx_cib_subject_code", "cibSubjectCode");
			rs2BeanMap.put("tx_fi_subject_code", "fiSubjectCode");
			rs2BeanMap.put("tx_bank_name", "bankName");
			rs2BeanMap.put("tx_trade_name", "tradeName");
			rs2BeanMap.put("tx_fi_code", "fiCode");
			rs2BeanMap.put("tx_branch_code", "branchCode");
			rs2BeanMap.put("tx_typeof_financing", "typeOfFinancing");
			rs2BeanMap.put("dec_total_requested_amountor_creditlmt", "totalRequestedAmountOrCreditLmt");
			rs2BeanMap.put("dtt_installment_contract_date", "installmentContractDate");
			rs2BeanMap.put("dec_installment_amount", "installmentAmount");
			rs2BeanMap.put("tx_numof_installment", "numOfInstallment");
			rs2BeanMap.put("tx_payment_periodicity", "paymentPeriodicity");
			rs2BeanMap.put("tx_sector_type", "sectorType");
			rs2BeanMap.put("tx_sector_code", "sectorCode");
			rs2BeanMap.put("tx_manager_sealan_signaure", "managerSealAndSignaure");
			rs2BeanMap.put("tx_applicant_signature", "applicantSignature");
			rs2BeanMap.put("tx_authorized_officer_seal_and_signaure", "authorizedOfficerSealAndSignaure");
			rs2BeanMap.put("tx_applicant_present_address_street_name", "applicantPresentaddressStreetName");
			rs2BeanMap.put("tx_applicant_present_address_street_num", "applicantPresentaddressStreetNumber");
			rs2BeanMap.put("tx_cif_no", "cifNo");
			rs2BeanMap.put("tx_fund_source", "fundSource");
			rs2BeanMap.put("dec_monthly_income", "monthlyincome");
			rs2BeanMap.put("tx_spouse_employment_status", "spouseEmploymentStatus");
			rs2BeanMap.put("tx_member_ship_of_club", "membershipOfClub");
			rs2BeanMap.put("tx_specify_club_name", "specifyClubName");
			rs2BeanMap.put("tx_you_are_verified_customer", "youAreVerifiedCustomer");
			rs2BeanMap.put("dec_house_rent_range", "houseRentRange");
			rs2BeanMap.put("tx_have_customer_own_car", "haveCustomerOwnCar");
			rs2BeanMap.put("tx_car_brand_name", "carBrandName");
			rs2BeanMap.put("dec_travel_yearly_number", "travelYearlyNumber");
			rs2BeanMap.put("tx_passport_number_indentity", "passportNumberIndentity");
			rs2BeanMap.put("tx_passport_number_obtained", "passportNumberObtained");
			rs2BeanMap.put("tx_passport_number_verified", "passportNumberVerified");
			rs2BeanMap.put("tx_nid_indetity", "nidIndetity");
			rs2BeanMap.put("tx_nid_indetity_obtained", "nidIndetityObtained");
			rs2BeanMap.put("tx_nid_indetity_verified", "nidIndetityVerified");
			rs2BeanMap.put("tx_etin_id_identity", "eTinIdIdentity");
			rs2BeanMap.put("tx_etin_id_identity_obtained", "eTinIdIdentityObtained");
			rs2BeanMap.put("tx_etin_id_identity_verified", "eTinIdIdentityVerified");
			rs2BeanMap.put("tx_politically_exposed_person", "politicallyExposedPerson");
			rs2BeanMap.put("tx_you_are_senior_managment", "youAreSeniorManagment");
			rs2BeanMap.put("tx_you_are_face_to_face_interview", "youAreFaceToFaceInterview");
			rs2BeanMap.put("tx_you_are_terrorist_activities", "youAreTerroristActivities");
			rs2BeanMap.put("tx_you_are_terrorist_activitie_regard", "youAreTerroristActivitieRegard");
			rs2BeanMap.put("tx_exception_details", "exceptionDetails");
			rs2BeanMap.put("dec_applicant_asking_limit", "applicantAskingLimit");
			rs2BeanMap.put("dec_applicant_recommended_limit", "applicantRecommendedLimit");
			rs2BeanMap.put("tx_interviewed_source_sign", "interviewedSourceSign");
			rs2BeanMap.put("tx_managerOr_unit_head_sign", "managerOrUnitHeadSign");
			rs2BeanMap.put("tx_you_are_cbbl_account_holder", "youAreCbblAccountHolder");
			rs2BeanMap.put("tx_auto_pay_instruction", "autoPayInstruction");
			rs2BeanMap.put("tx_applicant_usd_account_portion", "applicantUsdAccountPortion");
			rs2BeanMap.put("tx_other_bank_liability_position", "otherBankLiabilityPosition");
			rs2BeanMap.put("tx_other_bankacc_details", "otherBankAccDetails");
			rs2BeanMap.put("tx_card_state_name", "cardStateName");
			rs2BeanMap.put("int_card_state_id", "cardStateId");
			rs2BeanMap.put("tx_payment_type_of_standing_instruction", "paymentTypeOfStandingInstruction");
			rs2BeanMap.put("tx_payment_type_of_standing_instruction1", "paymentTypeOfStandingInstruction1");
			rs2BeanMap.put("tx_applicant_id_type", "applicantIdType");
			rs2BeanMap.put("tx_applicant_other_id", "applicantOtherId");
			rs2BeanMap.put("tx_folder_name", "folderName");
			rs2BeanMap.put("tx_business_address", "businessAddress");
			rs2BeanMap.put("tx_business_district", "businessDistrict");
			rs2BeanMap.put("tx_business_street_name", "businessStreetName");
			rs2BeanMap.put("tx_business_street_number", "businessStreetNumber");
			rs2BeanMap.put("tx_business_postal_code", "businessPostalCode");
			rs2BeanMap.put("tx_business_country", "businessCountry");
			rs2BeanMap.put("tx_applicant_owner_partner", "applicantOwnerPartner");
			rs2BeanMap.put("tx_applicant_per_street_no","applicantPerStreetNo");
			rs2BeanMap.put("tx_applicant_per_street_name","applicantPerStreetName");
		}
		return rs2BeanMap;
	}

	public String getApplicantTId() {
		return applicantTId;
	}

	public void setApplicantTId(String applicantTId) {
		this.applicantTId = applicantTId;
	}

	public String getApplicantCustomerType() {
		return applicantCustomerType;
	}

	public void setApplicantCustomerType(String applicantCustomerType) {
		this.applicantCustomerType = applicantCustomerType;
	}

	public String getApplicantAccountNumber() {
		return applicantAccountNumber;
	}

	public void setApplicantAccountNumber(String applicantAccountNumber) {
		this.applicantAccountNumber = applicantAccountNumber;
	}

	public String getApplicantNidNumber() {
		return applicantNidNumber;
	}

	public void setApplicantNidNumber(String applicantNidNumber) {
		this.applicantNidNumber = applicantNidNumber;
	}

	public String getApplicantBpNumber() {
		return applicantBpNumber;
	}

	public void setApplicantBpNumber(String applicantBpNumber) {
		this.applicantBpNumber = applicantBpNumber;
	}

	public String getApplicantApplyingFor() {
		return applicantApplyingFor;
	}

	public void setApplicantApplyingFor(String applicantApplyingFor) {
		this.applicantApplyingFor = applicantApplyingFor;
	}

	public String getApplicantTypeOfCard() {
		return applicantTypeOfCard;
	}

	public void setApplicantTypeOfCard(String applicantTypeOfCard) {
		this.applicantTypeOfCard = applicantTypeOfCard;
	}

	public String getApplicantName() {
		return applicantName;
	}

	public void setApplicantName(String applicantName) {
		this.applicantName = applicantName;
	}

	public String getApplicantGenderNeutralTitle() {
		return applicantGenderNeutralTitle;
	}

	public void setApplicantGenderNeutralTitle(String applicantGenderNeutralTitle) {
		this.applicantGenderNeutralTitle = applicantGenderNeutralTitle;
	}

	public String getApplicantNameOnCard() {
		return applicantNameOnCard;
	}

	public void setApplicantNameOnCard(String applicantNameOnCard) {
		this.applicantNameOnCard = applicantNameOnCard;
	}

	public String getApplicantNameInBangla() {
		return applicantNameInBangla;
	}

	public void setApplicantNameInBangla(String applicantNameInBangla) {
		this.applicantNameInBangla = applicantNameInBangla;
	}

	public String getApplicantNationality() {
		return applicantNationality;
	}

	public void setApplicantNationality(String applicantNationality) {
		this.applicantNationality = applicantNationality;
	}

	public String getApplicantSpecifyNationality() {
		return applicantSpecifyNationality;
	}

	public void setApplicantSpecifyNationality(String applicantSpecifyNationality) {
		this.applicantSpecifyNationality = applicantSpecifyNationality;
	}

	public String getApplicantProfession() {
		return applicantProfession;
	}

	public void setApplicantProfession(String applicantProfession) {
		this.applicantProfession = applicantProfession;
	}

	public Date getApplicantDateOfBirth() {
		return applicantDateOfBirth;
	}

	public void setApplicantDateOfBirth(Date applicantDateOfBirth) {
		this.applicantDateOfBirth = applicantDateOfBirth;
	}

	public String getApplicantEtinNumber() {
		return applicantEtinNumber;
	}

	public void setApplicantEtinNumber(String applicantEtinNumber) {
		this.applicantEtinNumber = applicantEtinNumber;
	}

	public String getApplicantGender() {
		return applicantGender;
	}

	public void setApplicantGender(String applicantGender) {
		this.applicantGender = applicantGender;
	}

	public String getApplicantMobileNumber() {
		return applicantMobileNumber;
	}

	public void setApplicantMobileNumber(String applicantMobileNumber) {
		this.applicantMobileNumber = applicantMobileNumber;
	}

	public String getApplicantOtherPhotoID() {
		return applicantOtherPhotoID;
	}

	public void setApplicantOtherPhotoID(String applicantOtherPhotoID) {
		this.applicantOtherPhotoID = applicantOtherPhotoID;
	}

	public String getApplicantPassportNo() {
		return applicantPassportNo;
	}

	public void setApplicantPassportNo(String applicantPassportNo) {
		this.applicantPassportNo = applicantPassportNo;
	}

	public String getApplicantIdIssueCountry() {
		return applicantIdIssueCountry;
	}

	public void setApplicantIdIssueCountry(String applicantIdIssueCountry) {
		this.applicantIdIssueCountry = applicantIdIssueCountry;
	}

	public Date getApplicantIdIssueDate() {
		return applicantIdIssueDate;
	}

	public void setApplicantIdIssueDate(Date applicantIdIssueDate) {
		this.applicantIdIssueDate = applicantIdIssueDate;
	}

	public Date getApplicantIdIssueDateExp() {
		return applicantIdIssueDateExp;
	}

	public void setApplicantIdIssueDateExp(Date applicantIdIssueDateExp) {
		this.applicantIdIssueDateExp = applicantIdIssueDateExp;
	}

	public String getApplicantFatherName() {
		return applicantFatherName;
	}

	public void setApplicantFatherName(String applicantFatherName) {
		this.applicantFatherName = applicantFatherName;
	}

	public String getApplicantMotherName() {
		return applicantMotherName;
	}

	public void setApplicantMotherName(String applicantMotherName) {
		this.applicantMotherName = applicantMotherName;
	}

	public String getApplicantSpouseName() {
		return applicantSpouseName;
	}

	public void setApplicantSpouseName(String applicantSpouseName) {
		this.applicantSpouseName = applicantSpouseName;
	}

	public String getApplicantSpouseMobileNo() {
		return applicantSpouseMobileNo;
	}

	public void setApplicantSpouseMobileNo(String applicantSpouseMobileNo) {
		this.applicantSpouseMobileNo = applicantSpouseMobileNo;
	}

	public String getApplicantMaritalStatus() {
		return applicantMaritalStatus;
	}

	public void setApplicantMaritalStatus(String applicantMaritalStatus) {
		this.applicantMaritalStatus = applicantMaritalStatus;
	}

	public String getApplicantMaritalStatusOthers() {
		return applicantMaritalStatusOthers;
	}

	public void setApplicantMaritalStatusOthers(String applicantMaritalStatusOthers) {
		this.applicantMaritalStatusOthers = applicantMaritalStatusOthers;
	}

	public String getApplicantNoOfDependents() {
		return applicantNoOfDependents;
	}

	public void setApplicantNoOfDependents(String applicantNoOfDependents) {
		this.applicantNoOfDependents = applicantNoOfDependents;
	}

	public String getApplicantHighestEducation() {
		return applicantHighestEducation;
	}

	public void setApplicantHighestEducation(String applicantHighestEducation) {
		this.applicantHighestEducation = applicantHighestEducation;
	}

	public String getApplicantHighestEducationOthers() {
		return applicantHighestEducationOthers;
	}

	public void setApplicantHighestEducationOthers(String applicantHighestEducationOthers) {
		this.applicantHighestEducationOthers = applicantHighestEducationOthers;
	}

	public String getApplicantResStatus() {
		return applicantResStatus;
	}

	public void setApplicantResStatus(String applicantResStatus) {
		this.applicantResStatus = applicantResStatus;
	}

	public String getApplicantResiAddress() {
		return applicantResiAddress;
	}

	public void setApplicantResiAddress(String applicantResiAddress) {
		this.applicantResiAddress = applicantResiAddress;
	}

	public String getApplicantResiNearLandmark() {
		return applicantResiNearLandmark;
	}

	public void setApplicantResiNearLandmark(String applicantResiNearLandmark) {
		this.applicantResiNearLandmark = applicantResiNearLandmark;
	}

	public String getApplicantResiAddressPS() {
		return applicantResiAddressPS;
	}

	public void setApplicantResiAddressPS(String applicantResiAddressPS) {
		this.applicantResiAddressPS = applicantResiAddressPS;
	}

	public String getApplicantResiAddressPostCode() {
		return applicantResiAddressPostCode;
	}

	public void setApplicantResiAddressPostCode(String applicantResiAddressPostCode) {
		this.applicantResiAddressPostCode = applicantResiAddressPostCode;
	}

	public String getApplicantResiAddressDistrict() {
		return applicantResiAddressDistrict;
	}

	public void setApplicantResiAddressDistrict(String applicantResiAddressDistrict) {
		this.applicantResiAddressDistrict = applicantResiAddressDistrict;
	}

	public String getApplicantResiAddressCountry() {
		return applicantResiAddressCountry;
	}

	public void setApplicantResiAddressCountry(String applicantResiAddressCountry) {
		this.applicantResiAddressCountry = applicantResiAddressCountry;
	}

	public String getApplicantPerAddress() {
		return applicantPerAddress;
	}

	public void setApplicantPerAddress(String applicantPerAddress) {
		this.applicantPerAddress = applicantPerAddress;
	}

	public String getApplicantPerAddressNearLand() {
		return applicantPerAddressNearLand;
	}

	public void setApplicantPerAddressNearLand(String applicantPerAddressNearLand) {
		this.applicantPerAddressNearLand = applicantPerAddressNearLand;
	}

	public String getApplicantPerAddressPS() {
		return applicantPerAddressPS;
	}

	public void setApplicantPerAddressPS(String applicantPerAddressPS) {
		this.applicantPerAddressPS = applicantPerAddressPS;
	}

	public String getApplicantPerAddressPostCode() {
		return applicantPerAddressPostCode;
	}

	public void setApplicantPerAddressPostCode(String applicantPerAddressPostCode) {
		this.applicantPerAddressPostCode = applicantPerAddressPostCode;
	}

	public String getApplicantPerAddressDistrict() {
		return applicantPerAddressDistrict;
	}

	public void setApplicantPerAddressDistrict(String applicantPerAddressDistrict) {
		this.applicantPerAddressDistrict = applicantPerAddressDistrict;
	}

	public String getApplicantPerAddressCountry() {
		return applicantPerAddressCountry;
	}

	public void setApplicantPerAddressCountry(String applicantPerAddressCountry) {
		this.applicantPerAddressCountry = applicantPerAddressCountry;
	}

	public String getApplicantOccupation() {
		return applicantOccupation;
	}

	public void setApplicantOccupation(String applicantOccupation) {
		this.applicantOccupation = applicantOccupation;
	}

	public String getApplicantOccupationOthers() {
		return applicantOccupationOthers;
	}

	public void setApplicantOccupationOthers(String applicantOccupationOthers) {
		this.applicantOccupationOthers = applicantOccupationOthers;
	}

	public String getApplicantCompanyName() {
		return applicantCompanyName;
	}

	public void setApplicantCompanyName(String applicantCompanyName) {
		this.applicantCompanyName = applicantCompanyName;
	}

	public String getApplicantDesignation() {
		return applicantDesignation;
	}

	public void setApplicantDesignation(String applicantDesignation) {
		this.applicantDesignation = applicantDesignation;
	}

	public String getApplicantDepartment() {
		return applicantDepartment;
	}

	public void setApplicantDepartment(String applicantDepartment) {
		this.applicantDepartment = applicantDepartment;
	}

	public String getApplicantNatureOfBusiness() {
		return applicantNatureOfBusiness;
	}

	public void setApplicantNatureOfBusiness(String applicantNatureOfBusiness) {
		this.applicantNatureOfBusiness = applicantNatureOfBusiness;
	}

	public String getApplicantEmployeeID() {
		return applicantEmployeeID;
	}

	public void setApplicantEmployeeID(String applicantEmployeeID) {
		this.applicantEmployeeID = applicantEmployeeID;
	}

	public String getApplicantOfficeAddress() {
		return applicantOfficeAddress;
	}

	public void setApplicantOfficeAddress(String applicantOfficeAddress) {
		this.applicantOfficeAddress = applicantOfficeAddress;
	}

	public String getApplicantOfficeAddressPS() {
		return applicantOfficeAddressPS;
	}

	public void setApplicantOfficeAddressPS(String applicantOfficeAddressPS) {
		this.applicantOfficeAddressPS = applicantOfficeAddressPS;
	}

	public String getApplicantOfficeAddressPostCode() {
		return applicantOfficeAddressPostCode;
	}

	public void setApplicantOfficeAddressPostCode(String applicantOfficeAddressPostCode) {
		this.applicantOfficeAddressPostCode = applicantOfficeAddressPostCode;
	}

	public String getApplicantOfficeAddressDistrict() {
		return applicantOfficeAddressDistrict;
	}

	public void setApplicantOfficeAddressDistrict(String applicantOfficeAddressDistrict) {
		this.applicantOfficeAddressDistrict = applicantOfficeAddressDistrict;
	}

	public String getApplicantOfficeAddressCountry() {
		return applicantOfficeAddressCountry;
	}

	public void setApplicantOfficeAddressCountry(String applicantOfficeAddressCountry) {
		this.applicantOfficeAddressCountry = applicantOfficeAddressCountry;
	}

	public String getApplicantEmployeeStatus() {
		return applicantEmployeeStatus;
	}

	public void setApplicantEmployeeStatus(String applicantEmployeeStatus) {
		this.applicantEmployeeStatus = applicantEmployeeStatus;
	}

	public String getApplicantBusinessEstablished() {
		return applicantBusinessEstablished;
	}

	public void setApplicantBusinessEstablished(String applicantBusinessEstablished) {
		this.applicantBusinessEstablished = applicantBusinessEstablished;
	}

	public String getApplicantDurInCurrentJobYear() {
		return applicantDurInCurrentJobYear;
	}

	public void setApplicantDurInCurrentJobYear(String applicantDurInCurrentJobYear) {
		this.applicantDurInCurrentJobYear = applicantDurInCurrentJobYear;
	}

	public String getApplicantDurInCurrentJobMonth() {
		return applicantDurInCurrentJobMonth;
	}

	public void setApplicantDurInCurrentJobMonth(String applicantDurInCurrentJobMonth) {
		this.applicantDurInCurrentJobMonth = applicantDurInCurrentJobMonth;
	}

	public String getApplicantTotalWorkExpYear() {
		return applicantTotalWorkExpYear;
	}

	public void setApplicantTotalWorkExpYear(String applicantTotalWorkExpYear) {
		this.applicantTotalWorkExpYear = applicantTotalWorkExpYear;
	}

	public String getApplicantTotalWorkExpMonth() {
		return applicantTotalWorkExpMonth;
	}

	public void setApplicantTotalWorkExpMonth(String applicantTotalWorkExpMonth) {
		this.applicantTotalWorkExpMonth = applicantTotalWorkExpMonth;
	}

	public String getApplicantOfficePhoneNo() {
		return applicantOfficePhoneNo;
	}

	public void setApplicantOfficePhoneNo(String applicantOfficePhoneNo) {
		this.applicantOfficePhoneNo = applicantOfficePhoneNo;
	}

	public String getApplicantMobileNo() {
		return applicantMobileNo;
	}

	public void setApplicantMobileNo(String applicantMobileNo) {
		this.applicantMobileNo = applicantMobileNo;
	}

	public String getApplicantMailingComAddress() {
		return applicantMailingComAddress;
	}

	public void setApplicantMailingComAddress(String applicantMailingComAddress) {
		this.applicantMailingComAddress = applicantMailingComAddress;
	}

	public String getApplicantCardReceivingWayName() {
		return applicantCardReceivingWayName;
	}

	public void setApplicantCardReceivingWayName(String applicantCardReceivingWayName) {
		this.applicantCardReceivingWayName = applicantCardReceivingWayName;
	}

	public String getApplicantCardReceivingWay() {
		return applicantCardReceivingWay;
	}

	public void setApplicantCardReceivingWay(String applicantCardReceivingWay) {
		this.applicantCardReceivingWay = applicantCardReceivingWay;
	}

	public String getApplicantMonthlyStatementsSentWay() {
		return applicantMonthlyStatementsSentWay;
	}

	public void setApplicantMonthlyStatementsSentWay(String applicantMonthlyStatementsSentWay) {
		this.applicantMonthlyStatementsSentWay = applicantMonthlyStatementsSentWay;
	}

	public String getApplicantPromActivitPurposeId() {
		return applicantPromActivitPurposeId;
	}

	public void setApplicantPromActivitPurposeId(String applicantPromActivitPurposeId) {
		this.applicantPromActivitPurposeId = applicantPromActivitPurposeId;
	}

	public Double getApplicantAdditionalIncome() {
		return applicantAdditionalIncome;
	}

	public void setApplicantAdditionalIncome(Double applicantAdditionalIncome) {
		this.applicantAdditionalIncome = applicantAdditionalIncome;
	}

	public Double getApplicantSpouseIncome() {
		return applicantSpouseIncome;
	}

	public void setApplicantSpouseIncome(Double applicantSpouseIncome) {
		this.applicantSpouseIncome = applicantSpouseIncome;
	}

	public Double getSalariedMonthGrossSalary() {
		return salariedMonthGrossSalary;
	}

	public void setSalariedMonthGrossSalary(Double salariedMonthGrossSalary) {
		this.salariedMonthGrossSalary = salariedMonthGrossSalary;
	}

	public Double getSalariedMonthTotalDeduction() {
		return salariedMonthTotalDeduction;
	}

	public void setSalariedMonthTotalDeduction(Double salariedMonthTotalDeduction) {
		this.salariedMonthTotalDeduction = salariedMonthTotalDeduction;
	}

	public Double getSalariedMonthNetIncome() {
		return salariedMonthNetIncome;
	}

	public void setSalariedMonthNetIncome(Double salariedMonthNetIncome) {
		this.salariedMonthNetIncome = salariedMonthNetIncome;
	}

	public Double getNonSalariedMonthGrossSalary() {
		return nonSalariedMonthGrossSalary;
	}

	public void setNonSalariedMonthGrossSalary(Double nonSalariedMonthGrossSalary) {
		this.nonSalariedMonthGrossSalary = nonSalariedMonthGrossSalary;
	}

	public Double getNonSalariedMonthTotalExpense() {
		return nonSalariedMonthTotalExpense;
	}

	public void setNonSalariedMonthTotalExpense(Double nonSalariedMonthTotalExpense) {
		this.nonSalariedMonthTotalExpense = nonSalariedMonthTotalExpense;
	}

	public Double getNonSalariedMonthNetIncome() {
		return nonSalariedMonthNetIncome;
	}

	public void setNonSalariedMonthNetIncome(Double nonSalariedMonthNetIncome) {
		this.nonSalariedMonthNetIncome = nonSalariedMonthNetIncome;
	}

	public Double getDemandPromissoryTaka() {
		return demandPromissoryTaka;
	}

	public void setDemandPromissoryTaka(Double demandPromissoryTaka) {
		this.demandPromissoryTaka = demandPromissoryTaka;
	}

	public Date getDemandPromissoryDate() {
		return demandPromissoryDate;
	}

	public void setDemandPromissoryDate(Date demandPromissoryDate) {
		this.demandPromissoryDate = demandPromissoryDate;
	}

	public String getDemandPromissoryPlace() {
		return demandPromissoryPlace;
	}

	public void setDemandPromissoryPlace(String demandPromissoryPlace) {
		this.demandPromissoryPlace = demandPromissoryPlace;
	}

	public String getDemandPromissoryMessage() {
		return demandPromissoryMessage;
	}

	public void setDemandPromissoryMessage(String demandPromissoryMessage) {
		this.demandPromissoryMessage = demandPromissoryMessage;
	}

	public Double getDemandPromissorySecondTaka() {
		return demandPromissorySecondTaka;
	}

	public void setDemandPromissorySecondTaka(Double demandPromissorySecondTaka) {
		this.demandPromissorySecondTaka = demandPromissorySecondTaka;
	}

	public Integer getDemandPromissoryRate() {
		return demandPromissoryRate;
	}

	public void setDemandPromissoryRate(Integer demandPromissoryRate) {
		this.demandPromissoryRate = demandPromissoryRate;
	}

	public String getBankBranchname() {
		return bankBranchname;
	}

	public void setBankBranchname(String bankBranchname) {
		this.bankBranchname = bankBranchname;
	}

	public Integer getBankSolID() {
		return bankSolID;
	}

	public void setBankSolID(Integer bankSolID) {
		this.bankSolID = bankSolID;
	}

	public String getBankGeoLocationCheck1() {
		return bankGeoLocationCheck1;
	}

	public void setBankGeoLocationCheck1(String bankGeoLocationCheck1) {
		this.bankGeoLocationCheck1 = bankGeoLocationCheck1;
	}

	public String getBankGeoLocationText1() {
		return bankGeoLocationText1;
	}

	public void setBankGeoLocationText1(String bankGeoLocationText1) {
		this.bankGeoLocationText1 = bankGeoLocationText1;
	}

	public String getBankGeoLocationText2() {
		return bankGeoLocationText2;
	}

	public void setBankGeoLocationText2(String bankGeoLocationText2) {
		this.bankGeoLocationText2 = bankGeoLocationText2;
	}

	public String getBankGeoLocationCheck2() {
		return bankGeoLocationCheck2;
	}

	public void setBankGeoLocationCheck2(String bankGeoLocationCheck2) {
		this.bankGeoLocationCheck2 = bankGeoLocationCheck2;
	}

	public String getSourceComments() {
		return sourceComments;
	}

	public void setSourceComments(String sourceComments) {
		this.sourceComments = sourceComments;
	}

	public String getApplicantPostalCode() {
		return applicantPostalCode;
	}

	public void setApplicantPostalCode(String applicantPostalCode) {
		this.applicantPostalCode = applicantPostalCode;
	}

	public String getApplicantAddress() {
		return applicantAddress;
	}

	public void setApplicantAddress(String applicantAddress) {
		this.applicantAddress = applicantAddress;
	}

	public String getApplicantDistrict() {
		return applicantDistrict;
	}

	public void setApplicantDistrict(String applicantDistrict) {
		this.applicantDistrict = applicantDistrict;
	}

	public String getApplicantStreetName() {
		return applicantStreetName;
	}

	public void setApplicantStreetName(String applicantStreetName) {
		this.applicantStreetName = applicantStreetName;
	}

	public String getApplicantStreetNo() {
		return applicantStreetNo;
	}

	public void setApplicantStreetNo(String applicantStreetNo) {
		this.applicantStreetNo = applicantStreetNo;
	}

	public String getApplicantPostCode() {
		return applicantPostCode;
	}

	public void setApplicantPostCode(String applicantPostCode) {
		this.applicantPostCode = applicantPostCode;
	}

	public String getApplicantDistrictOfBirth() {
		return applicantDistrictOfBirth;
	}

	public void setApplicantDistrictOfBirth(String applicantDistrictOfBirth) {
		this.applicantDistrictOfBirth = applicantDistrictOfBirth;
	}

	public String getApplicantCountryOfBirth() {
		return applicantCountryOfBirth;
	}

	public void setApplicantCountryOfBirth(String applicantCountryOfBirth) {
		this.applicantCountryOfBirth = applicantCountryOfBirth;
	}

	public String getApplicantIdNo() {
		return applicantIdNo;
	}

	public void setApplicantIdNo(String applicantIdNo) {
		this.applicantIdNo = applicantIdNo;
	}

	public String getCibSubjectCode() {
		return cibSubjectCode;
	}

	public void setCibSubjectCode(String cibSubjectCode) {
		this.cibSubjectCode = cibSubjectCode;
	}

	public String getFiSubjectCode() {
		return fiSubjectCode;
	}

	public void setFiSubjectCode(String fiSubjectCode) {
		this.fiSubjectCode = fiSubjectCode;
	}

	public String getBankName() {
		return bankName;
	}

	public void setBankName(String bankName) {
		this.bankName = bankName;
	}

	public String getTradeName() {
		return tradeName;
	}

	public void setTradeName(String tradeName) {
		this.tradeName = tradeName;
	}

	public String getFiCode() {
		return fiCode;
	}

	public void setFiCode(String fiCode) {
		this.fiCode = fiCode;
	}

	public String getBranchCode() {
		return branchCode;
	}

	public void setBranchCode(String branchCode) {
		this.branchCode = branchCode;
	}

	public String getTypeOfFinancing() {
		return typeOfFinancing;
	}

	public void setTypeOfFinancing(String typeOfFinancing) {
		this.typeOfFinancing = typeOfFinancing;
	}

	public Double getTotalRequestedAmountOrCreditLmt() {
		return totalRequestedAmountOrCreditLmt;
	}

	public void setTotalRequestedAmountOrCreditLmt(Double totalRequestedAmountOrCreditLmt) {
		this.totalRequestedAmountOrCreditLmt = totalRequestedAmountOrCreditLmt;
	}

	public Date getInstallmentContractDate() {
		return installmentContractDate;
	}

	public void setInstallmentContractDate(Date installmentContractDate) {
		this.installmentContractDate = installmentContractDate;
	}

	public String getNumOfInstallment() {
		return numOfInstallment;
	}

	public void setNumOfInstallment(String numOfInstallment) {
		this.numOfInstallment = numOfInstallment;
	}

	public String getPaymentPeriodicity() {
		return paymentPeriodicity;
	}

	public void setPaymentPeriodicity(String paymentPeriodicity) {
		this.paymentPeriodicity = paymentPeriodicity;
	}

	public String getSectorType() {
		return sectorType;
	}

	public void setSectorType(String sectorType) {
		this.sectorType = sectorType;
	}

	public String getSectorCode() {
		return sectorCode;
	}

	public void setSectorCode(String sectorCode) {
		this.sectorCode = sectorCode;
	}

	public String getManagerSealAndSignaure() {
		return managerSealAndSignaure;
	}

	public void setManagerSealAndSignaure(String managerSealAndSignaure) {
		this.managerSealAndSignaure = managerSealAndSignaure;
	}

	public String getApplicantSignature() {
		return applicantSignature;
	}

	public void setApplicantSignature(String applicantSignature) {
		this.applicantSignature = applicantSignature;
	}

	public String getAuthorizedOfficerSealAndSignaure() {
		return authorizedOfficerSealAndSignaure;
	}

	public void setAuthorizedOfficerSealAndSignaure(String authorizedOfficerSealAndSignaure) {
		this.authorizedOfficerSealAndSignaure = authorizedOfficerSealAndSignaure;
	}

	public String getApplicantPresentaddressStreetName() {
		return applicantPresentaddressStreetName;
	}

	public void setApplicantPresentaddressStreetName(String applicantPresentaddressStreetName) {
		this.applicantPresentaddressStreetName = applicantPresentaddressStreetName;
	}

	public String getApplicantPresentaddressStreetNumber() {
		return applicantPresentaddressStreetNumber;
	}

	public void setApplicantPresentaddressStreetNumber(String applicantPresentaddressStreetNumber) {
		this.applicantPresentaddressStreetNumber = applicantPresentaddressStreetNumber;
	}

	public String getCifNo() {
		return cifNo;
	}

	public void setCifNo(String cifNo) {
		this.cifNo = cifNo;
	}

	public String getFundSource() {
		return fundSource;
	}

	public void setFundSource(String fundSource) {
		this.fundSource = fundSource;
	}

	public Double getMonthlyincome() {
		return monthlyincome;
	}

	public void setMonthlyincome(Double monthlyincome) {
		this.monthlyincome = monthlyincome;
	}

	public String getSpouseEmploymentStatus() {
		return spouseEmploymentStatus;
	}

	public void setSpouseEmploymentStatus(String spouseEmploymentStatus) {
		this.spouseEmploymentStatus = spouseEmploymentStatus;
	}

	public String getMembershipOfClub() {
		return membershipOfClub;
	}

	public void setMembershipOfClub(String membershipOfClub) {
		this.membershipOfClub = membershipOfClub;
	}

	public String getSpecifyClubName() {
		return specifyClubName;
	}

	public void setSpecifyClubName(String specifyClubName) {
		this.specifyClubName = specifyClubName;
	}

	public String getYouAreVerifiedCustomer() {
		return youAreVerifiedCustomer;
	}

	public void setYouAreVerifiedCustomer(String youAreVerifiedCustomer) {
		this.youAreVerifiedCustomer = youAreVerifiedCustomer;
	}

	public Double getHouseRentRange() {
		return houseRentRange;
	}

	public void setHouseRentRange(Double houseRentRange) {
		this.houseRentRange = houseRentRange;
	}

	public String getHaveCustomerOwnCar() {
		return haveCustomerOwnCar;
	}

	public void setHaveCustomerOwnCar(String haveCustomerOwnCar) {
		this.haveCustomerOwnCar = haveCustomerOwnCar;
	}

	public String getCarBrandName() {
		return carBrandName;
	}

	public void setCarBrandName(String carBrandName) {
		this.carBrandName = carBrandName;
	}

	public Double getTravelYearlyNumber() {
		return travelYearlyNumber;
	}

	public void setTravelYearlyNumber(Double travelYearlyNumber) {
		this.travelYearlyNumber = travelYearlyNumber;
	}

	public String getPassportNumberIndentity() {
		return passportNumberIndentity;
	}

	public void setPassportNumberIndentity(String passportNumberIndentity) {
		this.passportNumberIndentity = passportNumberIndentity;
	}

	public String getNidIndetity() {
		return nidIndetity;
	}

	public void setNidIndetity(String nidIndetity) {
		this.nidIndetity = nidIndetity;
	}

	public String geteTinIdIdentity() {
		return eTinIdIdentity;
	}

	public void seteTinIdIdentity(String eTinIdIdentity) {
		this.eTinIdIdentity = eTinIdIdentity;
	}

	public String getPassportNumberObtained() {
		return passportNumberObtained;
	}

	public void setPassportNumberObtained(String passportNumberObtained) {
		this.passportNumberObtained = passportNumberObtained;
	}

	public String getPassportNumberVerified() {
		return passportNumberVerified;
	}

	public void setPassportNumberVerified(String passportNumberVerified) {
		this.passportNumberVerified = passportNumberVerified;
	}

	public String getNidIndetityObtained() {
		return nidIndetityObtained;
	}

	public void setNidIndetityObtained(String nidIndetityObtained) {
		this.nidIndetityObtained = nidIndetityObtained;
	}

	public String getNidIndetityVerified() {
		return nidIndetityVerified;
	}

	public void setNidIndetityVerified(String nidIndetityVerified) {
		this.nidIndetityVerified = nidIndetityVerified;
	}

	public String geteTinIdIdentityObtained() {
		return eTinIdIdentityObtained;
	}

	public void seteTinIdIdentityObtained(String eTinIdIdentityObtained) {
		this.eTinIdIdentityObtained = eTinIdIdentityObtained;
	}

	public String geteTinIdIdentityVerified() {
		return eTinIdIdentityVerified;
	}

	public void seteTinIdIdentityVerified(String eTinIdIdentityVerified) {
		this.eTinIdIdentityVerified = eTinIdIdentityVerified;
	}

	public String getPoliticallyExposedPerson() {
		return politicallyExposedPerson;
	}

	public void setPoliticallyExposedPerson(String politicallyExposedPerson) {
		this.politicallyExposedPerson = politicallyExposedPerson;
	}

	public String getYouAreSeniorManagment() {
		return youAreSeniorManagment;
	}

	public void setYouAreSeniorManagment(String youAreSeniorManagment) {
		this.youAreSeniorManagment = youAreSeniorManagment;
	}

	public String getYouAreFaceToFaceInterview() {
		return youAreFaceToFaceInterview;
	}

	public void setYouAreFaceToFaceInterview(String youAreFaceToFaceInterview) {
		this.youAreFaceToFaceInterview = youAreFaceToFaceInterview;
	}

	public String getYouAreTerroristActivities() {
		return youAreTerroristActivities;
	}

	public void setYouAreTerroristActivities(String youAreTerroristActivities) {
		this.youAreTerroristActivities = youAreTerroristActivities;
	}

	public String getYouAreTerroristActivitieRegard() {
		return youAreTerroristActivitieRegard;
	}

	public SupplementAndReferDetails getSupplementAndReferDetails() {
		return supplementAndReferDetails;
	}

	public void setSupplementAndReferDetails(SupplementAndReferDetails supplementAndReferDetails) {
		this.supplementAndReferDetails = supplementAndReferDetails;
	}

	public void setYouAreTerroristActivitieRegard(String youAreTerroristActivitieRegard) {
		this.youAreTerroristActivitieRegard = youAreTerroristActivitieRegard;
	}

	public String getExceptionDetails() {
		return exceptionDetails;
	}

	public void setExceptionDetails(String exceptionDetails) {
		this.exceptionDetails = exceptionDetails;
	}

	public Double getApplicantAskingLimit() {
		return applicantAskingLimit;
	}

	public void setApplicantAskingLimit(Double applicantAskingLimit) {
		this.applicantAskingLimit = applicantAskingLimit;
	}

	public Double getApplicantRecommendedLimit() {
		return applicantRecommendedLimit;
	}

	public void setApplicantRecommendedLimit(Double applicantRecommendedLimit) {
		this.applicantRecommendedLimit = applicantRecommendedLimit;
	}

	public String getInterviewedSourceSign() {
		return interviewedSourceSign;
	}

	public void setInterviewedSourceSign(String interviewedSourceSign) {
		this.interviewedSourceSign = interviewedSourceSign;
	}

	public String getManagerOrUnitHeadSign() {
		return managerOrUnitHeadSign;
	}

	public void setManagerOrUnitHeadSign(String managerOrUnitHeadSign) {
		this.managerOrUnitHeadSign = managerOrUnitHeadSign;
	}

	public Integer getIdAcquisitionApplicantKey() {
		return idAcquisitionApplicantKey;
	}

	public void setIdAcquisitionApplicantKey(Integer idAcquisitionApplicantKey) {
		this.idAcquisitionApplicantKey = idAcquisitionApplicantKey;
	}

	public Integer getIdAcquisitionApplicantVer() {
		return idAcquisitionApplicantVer;
	}

	public void setIdAcquisitionApplicantVer(Integer idAcquisitionApplicantVer) {
		this.idAcquisitionApplicantVer = idAcquisitionApplicantVer;
	}

	public String getYouAreCbblAccountHolder() {
		return youAreCbblAccountHolder;
	}

	public void setYouAreCbblAccountHolder(String youAreCbblAccountHolder) {
		this.youAreCbblAccountHolder = youAreCbblAccountHolder;
	}

	public String getAutoPayInstruction() {
		return autoPayInstruction;
	}

	public void setAutoPayInstruction(String autoPayInstruction) {
		this.autoPayInstruction = autoPayInstruction;
	}

	public String getApplicantUsdAccountPortion() {
		return applicantUsdAccountPortion;
	}

	public void setApplicantUsdAccountPortion(String applicantUsdAccountPortion) {
		this.applicantUsdAccountPortion = applicantUsdAccountPortion;
	}

	public Integer getIdSupplementAndReferKey() {
		return idSupplementAndReferKey;
	}

	public void setIdSupplementAndReferKey(Integer idSupplementAndReferKey) {
		this.idSupplementAndReferKey = idSupplementAndReferKey;
	}

	public List<Document> getApplicantDocumentList() {
		return applicantDocumentList;
	}

	public void setApplicantDocumentList(List<Document> applicantDocumentList) {
		this.applicantDocumentList = applicantDocumentList;
	}

	public Integer getCreditCardId() {
		return creditCardId;
	}

	public void setCreditCardId(Integer creditCardId) {
		this.creditCardId = creditCardId;
	}

	public List<AcquisitionDetailsConfig> getPriviousOrganizationDetails() {
		return priviousOrganizationDetails;
	}

	public void setPriviousOrganizationDetails(List<AcquisitionDetailsConfig> priviousOrganizationDetails) {
		this.priviousOrganizationDetails = priviousOrganizationDetails;
	}

	public List<AcquisitionDetailsConfig> getOthersBankLiabilityPosition() {
		return othersBankLiabilityPosition;
	}

	public void setOthersBankLiabilityPosition(List<AcquisitionDetailsConfig> othersBankLiabilityPosition) {
		this.othersBankLiabilityPosition = othersBankLiabilityPosition;
	}

	public List<AcquisitionDetailsConfig> getAboutOtherBankDetails() {
		return aboutOtherBankDetails;
	}

	public void setAboutOtherBankDetails(List<AcquisitionDetailsConfig> aboutOtherBankDetails) {
		this.aboutOtherBankDetails = aboutOtherBankDetails;
	}

	public List<AcquisitionDetailsConfig> getSecurityDetails() {
		return securityDetails;
	}

	public void setSecurityDetails(List<AcquisitionDetailsConfig> securityDetails) {
		this.securityDetails = securityDetails;
	}

	public List<AcquisitionDetailsConfig> getCompaniesUderOwnership() {
		return companiesUderOwnership;
	}

	public void setCompaniesUderOwnership(List<AcquisitionDetailsConfig> companiesUderOwnership) {
		this.companiesUderOwnership = companiesUderOwnership;
	}

	public String getOtherBankLiabilityPosition() {
		return otherBankLiabilityPosition;
	}

	public void setOtherBankLiabilityPosition(String otherBankLiabilityPosition) {
		this.otherBankLiabilityPosition = otherBankLiabilityPosition;
	}

	public String getOtherBankAccDetails() {
		return otherBankAccDetails;
	}

	public void setOtherBankAccDetails(String otherBankAccDetails) {
		this.otherBankAccDetails = otherBankAccDetails;
	}

	public String getCardStateName() {
		return cardStateName;
	}

	public void setCardStateName(String cardStateName) {
		this.cardStateName = cardStateName;
	}

	public Integer getCardStateId() {
		return cardStateId;
	}

	public void setCardStateId(Integer cardStateId) {
		this.cardStateId = cardStateId;
	}

	public String getPaymentTypeOfStandingInstruction() {
		return paymentTypeOfStandingInstruction;
	}

	public void setPaymentTypeOfStandingInstruction(String paymentTypeOfStandingInstruction) {
		this.paymentTypeOfStandingInstruction = paymentTypeOfStandingInstruction;
	}

	public String getPaymentTypeOfStandingInstruction1() {
		return paymentTypeOfStandingInstruction1;
	}

	public void setPaymentTypeOfStandingInstruction1(String paymentTypeOfStandingInstruction1) {
		this.paymentTypeOfStandingInstruction1 = paymentTypeOfStandingInstruction1;
	}

	public String getFolderName() {
		return folderName;
	}

	public Double getInstallmentAmount() {
		return installmentAmount;
	}

	public void setInstallmentAmount(Double installmentAmount) {
		this.installmentAmount = installmentAmount;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	public String getApplicantIdType() {
		return applicantIdType;
	}

	public void setApplicantIdType(String applicantIdType) {
		this.applicantIdType = applicantIdType;
	}

	public String getApplicantOtherId() {
		return applicantOtherId;
	}

	public void setApplicantOtherId(String applicantOtherId) {
		this.applicantOtherId = applicantOtherId;
	}

	public String getFromDate4Src() {
		return fromDate4Src;
	}

	public void setFromDate4Src(String fromDate4Src) {
		this.fromDate4Src = fromDate4Src;
	}

	public String getToDate4Src() {
		return toDate4Src;
	}

	public void setToDate4Src(String toDate4Src) {
		this.toDate4Src = toDate4Src;
	}

	public String getBusinessAddress() {
		return businessAddress;
	}

	public void setBusinessAddress(String businessAddress) {
		this.businessAddress = businessAddress;
	}

	public String getBusinessDistrict() {
		return businessDistrict;
	}

	public void setBusinessDistrict(String businessDistrict) {
		this.businessDistrict = businessDistrict;
	}

	public String getBusinessStreetName() {
		return businessStreetName;
	}

	public void setBusinessStreetName(String businessStreetName) {
		this.businessStreetName = businessStreetName;
	}

	public String getBusinessStreetNumber() {
		return businessStreetNumber;
	}

	public void setBusinessStreetNumber(String businessStreetNumber) {
		this.businessStreetNumber = businessStreetNumber;
	}

	public String getBusinessPostalCode() {
		return businessPostalCode;
	}

	public void setBusinessPostalCode(String businessPostalCode) {
		this.businessPostalCode = businessPostalCode;
	}

	public String getBusinessCountry() {
		return businessCountry;
	}

	public void setBusinessCountry(String businessCountry) {
		this.businessCountry = businessCountry;
	}

	public String getApplicantOwnerPartner() {
		return applicantOwnerPartner;
	}

	public void setApplicantOwnerPartner(String applicantOwnerPartner) {
		this.applicantOwnerPartner = applicantOwnerPartner;
	}

	public String getApplicantPerStreetNo() {
		return applicantPerStreetNo;
	}

	public void setApplicantPerStreetNo(String applicantPerStreetNo) {
		this.applicantPerStreetNo = applicantPerStreetNo;
	}

	public String getApplicantPerStreetName() {
		return applicantPerStreetName;
	}

	public void setApplicantPerStreetName(String applicantPerStreetName) {
		this.applicantPerStreetName = applicantPerStreetName;
	}

	@Override
	public String toString() {
		return "AcquisitionApplicantDetails [idAcquisitionApplicantKey=" + idAcquisitionApplicantKey + ", idAcquisitionApplicantVer="
		        + idAcquisitionApplicantVer + ", supplementAndReferDetails=" + supplementAndReferDetails + ", applicantDocumentList="
		        + applicantDocumentList + ", priviousOrganizationDetails=" + priviousOrganizationDetails + ", othersBankLiabilityPosition="
		        + othersBankLiabilityPosition + ", aboutOtherBankDetails=" + aboutOtherBankDetails + ", securityDetails=" + securityDetails
		        + ", companiesUderOwnership=" + companiesUderOwnership + ", idSupplementAndReferKey=" + idSupplementAndReferKey + ", creditCardId="
		        + creditCardId + ", applicantTId=" + applicantTId + ", applicantCustomerType=" + applicantCustomerType + ", applicantAccountNumber="
		        + applicantAccountNumber + ", applicantNidNumber=" + applicantNidNumber + ", applicantBpNumber=" + applicantBpNumber
		        + ", applicantApplyingFor=" + applicantApplyingFor + ", applicantTypeOfCard=" + applicantTypeOfCard + ", applicantName="
		        + applicantName + ", applicantGenderNeutralTitle=" + applicantGenderNeutralTitle + ", applicantNameOnCard=" + applicantNameOnCard
		        + ", applicantNameInBangla=" + applicantNameInBangla + ", applicantNationality=" + applicantNationality
		        + ", applicantSpecifyNationality=" + applicantSpecifyNationality + ", applicantProfession=" + applicantProfession
		        + ", applicantDateOfBirth=" + applicantDateOfBirth + ", applicantEtinNumber=" + applicantEtinNumber + ", applicantGender="
		        + applicantGender + ", applicantMobileNumber=" + applicantMobileNumber + ", applicantOtherPhotoID=" + applicantOtherPhotoID
		        + ", applicantPassportNo=" + applicantPassportNo + ", applicantIdIssueCountry=" + applicantIdIssueCountry + ", applicantIdIssueDate="
		        + applicantIdIssueDate + ", applicantIdIssueDateExp=" + applicantIdIssueDateExp + ", applicantFatherName=" + applicantFatherName
		        + ", applicantMotherName=" + applicantMotherName + ", applicantSpouseName=" + applicantSpouseName + ", applicantSpouseMobileNo="
		        + applicantSpouseMobileNo + ", applicantMaritalStatus=" + applicantMaritalStatus + ", applicantMaritalStatusOthers="
		        + applicantMaritalStatusOthers + ", applicantNoOfDependents=" + applicantNoOfDependents + ", applicantHighestEducation="
		        + applicantHighestEducation + ", applicantHighestEducationOthers=" + applicantHighestEducationOthers + ", applicantResStatus="
		        + applicantResStatus + ", applicantResiAddress=" + applicantResiAddress + ", applicantResiNearLandmark=" + applicantResiNearLandmark
		        + ", applicantResiAddressPS=" + applicantResiAddressPS + ", applicantResiAddressPostCode=" + applicantResiAddressPostCode
		        + ", applicantResiAddressDistrict=" + applicantResiAddressDistrict + ", applicantResiAddressCountry=" + applicantResiAddressCountry
		        + ", applicantPerAddress=" + applicantPerAddress + ", applicantPerAddressNearLand=" + applicantPerAddressNearLand
		        + ", applicantPerAddressPS=" + applicantPerAddressPS + ", applicantPerAddressPostCode=" + applicantPerAddressPostCode
		        + ", applicantPerAddressDistrict=" + applicantPerAddressDistrict + ", applicantPerAddressCountry=" + applicantPerAddressCountry
		        + ", applicantOccupation=" + applicantOccupation + ", applicantOccupationOthers=" + applicantOccupationOthers
		        + ", applicantCompanyName=" + applicantCompanyName + ", applicantDesignation=" + applicantDesignation + ", applicantDepartment="
		        + applicantDepartment + ", applicantNatureOfBusiness=" + applicantNatureOfBusiness + ", applicantEmployeeID=" + applicantEmployeeID
		        + ", applicantOfficeAddress=" + applicantOfficeAddress + ", applicantOfficeAddressPS=" + applicantOfficeAddressPS
		        + ", applicantOfficeAddressPostCode=" + applicantOfficeAddressPostCode + ", applicantOfficeAddressDistrict="
		        + applicantOfficeAddressDistrict + ", applicantOfficeAddressCountry=" + applicantOfficeAddressCountry + ", applicantEmployeeStatus="
		        + applicantEmployeeStatus + ", applicantBusinessEstablished=" + applicantBusinessEstablished + ", applicantDurInCurrentJobYear="
		        + applicantDurInCurrentJobYear + ", applicantDurInCurrentJobMonth=" + applicantDurInCurrentJobMonth + ", applicantTotalWorkExpYear="
		        + applicantTotalWorkExpYear + ", applicantTotalWorkExpMonth=" + applicantTotalWorkExpMonth + ", applicantOfficePhoneNo="
		        + applicantOfficePhoneNo + ", applicantMobileNo=" + applicantMobileNo + ", applicantMailingComAddress=" + applicantMailingComAddress
		        + ", applicantCardReceivingWayName=" + applicantCardReceivingWayName + ", applicantCardReceivingWay=" + applicantCardReceivingWay
		        + ", applicantMonthlyStatementsSentWay=" + applicantMonthlyStatementsSentWay + ", applicantPromActivitPurposeId="
		        + applicantPromActivitPurposeId + ", applicantAdditionalIncome=" + applicantAdditionalIncome + ", applicantSpouseIncome="
		        + applicantSpouseIncome + ", salariedMonthGrossSalary=" + salariedMonthGrossSalary + ", salariedMonthTotalDeduction="
		        + salariedMonthTotalDeduction + ", salariedMonthNetIncome=" + salariedMonthNetIncome + ", nonSalariedMonthGrossSalary="
		        + nonSalariedMonthGrossSalary + ", nonSalariedMonthTotalExpense=" + nonSalariedMonthTotalExpense + ", nonSalariedMonthNetIncome="
		        + nonSalariedMonthNetIncome + ", otherBankLiabilityPosition=" + otherBankLiabilityPosition + ", otherBankAccDetails="
		        + otherBankAccDetails + ", demandPromissoryTaka=" + demandPromissoryTaka + ", demandPromissoryDate=" + demandPromissoryDate
		        + ", demandPromissoryPlace=" + demandPromissoryPlace + ", demandPromissoryMessage=" + demandPromissoryMessage
		        + ", demandPromissorySecondTaka=" + demandPromissorySecondTaka + ", demandPromissoryRate=" + demandPromissoryRate
		        + ", bankBranchname=" + bankBranchname + ", bankSolID=" + bankSolID + ", bankGeoLocationCheck1=" + bankGeoLocationCheck1
		        + ", bankGeoLocationText1=" + bankGeoLocationText1 + ", bankGeoLocationText2=" + bankGeoLocationText2 + ", bankGeoLocationCheck2="
		        + bankGeoLocationCheck2 + ", sourceComments=" + sourceComments + ", applicantPostalCode=" + applicantPostalCode
		        + ", applicantAddress=" + applicantAddress + ", applicantDistrict=" + applicantDistrict + ", applicantStreetName="
		        + applicantStreetName + ", applicantStreetNo=" + applicantStreetNo + ", applicantPostCode=" + applicantPostCode
		        + ", applicantDistrictOfBirth=" + applicantDistrictOfBirth + ", applicantCountryOfBirth=" + applicantCountryOfBirth
		        + ", applicantIdNo=" + applicantIdNo + ", cibSubjectCode=" + cibSubjectCode + ", fiSubjectCode=" + fiSubjectCode + ", bankName="
		        + bankName + ", tradeName=" + tradeName + ", fiCode=" + fiCode + ", branchCode=" + branchCode + ", typeOfFinancing=" + typeOfFinancing
		        + ", totalRequestedAmountOrCreditLmt=" + totalRequestedAmountOrCreditLmt + ", installmentContractDate=" + installmentContractDate
		        + ", installmentAmount=" + installmentAmount + ", numOfInstallment=" + numOfInstallment + ", paymentPeriodicity=" + paymentPeriodicity
		        + ", sectorType=" + sectorType + ", sectorCode=" + sectorCode + ", managerSealAndSignaure=" + managerSealAndSignaure
		        + ", applicantSignature=" + applicantSignature + ", authorizedOfficerSealAndSignaure=" + authorizedOfficerSealAndSignaure
		        + ", applicantPresentaddressStreetName=" + applicantPresentaddressStreetName + ", applicantPresentaddressStreetNumber="
		        + applicantPresentaddressStreetNumber + ", cifNo=" + cifNo + ", fundSource=" + fundSource + ", monthlyincome=" + monthlyincome
		        + ", spouseEmploymentStatus=" + spouseEmploymentStatus + ", membershipOfClub=" + membershipOfClub + ", specifyClubName="
		        + specifyClubName + ", youAreVerifiedCustomer=" + youAreVerifiedCustomer + ", houseRentRange=" + houseRentRange
		        + ", haveCustomerOwnCar=" + haveCustomerOwnCar + ", carBrandName=" + carBrandName + ", travelYearlyNumber=" + travelYearlyNumber
		        + ", passportNumberIndentity=" + passportNumberIndentity + ", nidIndetity=" + nidIndetity + ", eTinIdIdentity=" + eTinIdIdentity
		        + ", passportNumberObtained=" + passportNumberObtained + ", passportNumberVerified=" + passportNumberVerified
		        + ", nidIndetityObtained=" + nidIndetityObtained + ", nidIndetityVerified=" + nidIndetityVerified + ", eTinIdIdentityObtained="
		        + eTinIdIdentityObtained + ", eTinIdIdentityVerified=" + eTinIdIdentityVerified + ", politicallyExposedPerson="
		        + politicallyExposedPerson + ", youAreSeniorManagment=" + youAreSeniorManagment + ", youAreFaceToFaceInterview="
		        + youAreFaceToFaceInterview + ", youAreTerroristActivities=" + youAreTerroristActivities + ", youAreTerroristActivitieRegard="
		        + youAreTerroristActivitieRegard + ", exceptionDetails=" + exceptionDetails + ", applicantAskingLimit=" + applicantAskingLimit
		        + ", applicantRecommendedLimit=" + applicantRecommendedLimit + ", interviewedSourceSign=" + interviewedSourceSign
		        + ", managerOrUnitHeadSign=" + managerOrUnitHeadSign + ", youAreCbblAccountHolder=" + youAreCbblAccountHolder
		        + ", autoPayInstruction=" + autoPayInstruction + ", applicantUsdAccountPortion=" + applicantUsdAccountPortion + ", cardStateName="
		        + cardStateName + ", cardStateId=" + cardStateId + ", paymentTypeOfStandingInstruction=" + paymentTypeOfStandingInstruction
		        + ", paymentTypeOfStandingInstruction1=" + paymentTypeOfStandingInstruction1 + ", folderName=" + folderName + ", fromDate4Src="
		        + fromDate4Src + ", toDate4Src=" + toDate4Src + "]";
	}

}
