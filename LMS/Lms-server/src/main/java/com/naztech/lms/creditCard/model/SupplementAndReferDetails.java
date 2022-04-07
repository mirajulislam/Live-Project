package com.naztech.lms.creditCard.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;
/**
 * @author Mirajul.islam
 */
public class SupplementAndReferDetails extends AcquisitionBase{
	private Integer idSupplementAndReferKey;
	private Integer idSupplementAndReferVer;
	private String 	suppApplicantName;											
	private String 	relationPrincipalApplicant;													
	private String 	relationPrincipalApplicantOthers;													
	private String 	suppApplicantGender;												
	private Date 	suppApplicantDateOfBirth;												
	private String 	suppApplicantOccupation;													
	private String 	suppApplicantFatherName;												
	private String 	suppApplicantMotherName;											
	private String 	suppApplicantSpouseName;														
	private String 	suppApplicantPresentAddress;												
	private String 	suppApplicantPerAddress;													
	private String 	suppApplicantMobile;													
	private String 	suppApplicantEmail;															
	private String 	suppApplicantNid;													
	private String 	suppApplicantPassport;														
	private Date 	suppApplicantDateOfExp;		
	private String 	suppYouAreSetupLimitCard;
	private Double 	suppSetUpLimitBDAmount;
	private Double 	suppSetUpLimitPercent;
	private Double 	suppSetUpLimitUSDAmount;
	private String 	refName;
	private String 	refRelationWithApplicant;
	private String 	refProfession;
	private String 	refOrgName;
	private String 	refDesignation;
	private String 	refWorkOrResidenceAddress;
	private String 	refTelephone;
	private String 	refMobile;
	private String 	refEmail;
	
	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;
	
	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			sql2BeanMap.putAll(getSql2BaseBeanMap());
			
			sql2BeanMap.put("@id_supplement_and_refer_key","idSupplementAndReferKey");							
			sql2BeanMap.put("@id_supplement_and_refer_ver","idSupplementAndReferVer");
			sql2BeanMap.put("@tx_supp_applicant_name","suppApplicantName");							
			sql2BeanMap.put("@tx_relation_principal_applicant","relationPrincipalApplicant");						
			sql2BeanMap.put("@tx_relation_principal_applicant_others","relationPrincipalApplicantOthers");	
			sql2BeanMap.put("@tx_supp_applicant_gender","suppApplicantGender");								
			sql2BeanMap.put("@dtt_supp_applicant_dateof_birth","suppApplicantDateOfBirth");								
			sql2BeanMap.put("@tx_supp_applicant_occupation","suppApplicantOccupation");									
			sql2BeanMap.put("@tx_supp_applicant_father_name","suppApplicantFatherName");								
			sql2BeanMap.put("@tx_supp_applicant_mother_name","suppApplicantMotherName");								
			sql2BeanMap.put("@tx_supp_applicant_spouse_name","suppApplicantSpouseName");								
			sql2BeanMap.put("@tx_supp_applicant_present_address","suppApplicantPresentAddress");						
			sql2BeanMap.put("@tx_supp_applicant_per_address","suppApplicantPerAddress");								
			sql2BeanMap.put("@tx_supp_applicant_mobile","suppApplicantMobile");									
			sql2BeanMap.put("@tx_supp_applicant_email","suppApplicantEmail");											
			sql2BeanMap.put("@tx_supp_applicant_nid","suppApplicantNid");								
			sql2BeanMap.put("@tx_supp_applicant_passport","suppApplicantPassport");										
			sql2BeanMap.put("@dtt_supp_applicant_dateof_exp","suppApplicantDateOfExp");
			sql2BeanMap.put("@tx_supp_you_are_setup_limit_card","suppYouAreSetupLimitCard");
			sql2BeanMap.put("@dec_supp_set_up_limit_bd_amount","suppSetUpLimitBDAmount");
			sql2BeanMap.put("@dec_supp_set_up_limit_percent","suppSetUpLimitPercent");
			sql2BeanMap.put("@dec_supp_set_up_limit_usd_amount","suppSetUpLimitUSDAmount");
			sql2BeanMap.put("@tx_ref_name","refName");
			sql2BeanMap.put("@tx_ref_relation_with_applicant","refRelationWithApplicant");
			sql2BeanMap.put("@tx_ref_profession","refProfession");
			sql2BeanMap.put("@tx_ref_org_name","refOrgName");
			sql2BeanMap.put("@tx_ref_designation","refDesignation");
			sql2BeanMap.put("@tx_ref_workor_residence_address","refWorkOrResidenceAddress");
			sql2BeanMap.put("@tx_ref_telephone","refTelephone");
			sql2BeanMap.put("@tx_ref_mobile","refMobile");
			sql2BeanMap.put("@tx_ref_email","refEmail");
		}
		return sql2BeanMap;
	}
	
	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.putAll(getRs2BaseBeanMap());
			
			rs2BeanMap.put("id_supplement_and_refer_key","idSupplementAndReferKey");							
			rs2BeanMap.put("id_supplement_and_refer_ver","idSupplementAndReferVer");
			rs2BeanMap.put("tx_supp_applicant_name","suppApplicantName");							
			rs2BeanMap.put("tx_relation_principal_applicant","relationPrincipalApplicant");						
			rs2BeanMap.put("tx_relation_principal_applicant_others","relationPrincipalApplicantOthers");	
			rs2BeanMap.put("tx_supp_applicant_gender","suppApplicantGender");								
			rs2BeanMap.put("dtt_supp_applicant_dateof_birth","suppApplicantDateOfBirth");								
			rs2BeanMap.put("tx_supp_applicant_occupation","suppApplicantOccupation");									
			rs2BeanMap.put("tx_supp_applicant_father_name","suppApplicantFatherName");									
			rs2BeanMap.put("tx_supp_applicant_mother_name","suppApplicantMotherName");								
			rs2BeanMap.put("tx_supp_applicant_spouse_name","suppApplicantSpouseName");									
			rs2BeanMap.put("tx_supp_applicant_present_address","suppApplicantPresentAddress");							
			rs2BeanMap.put("tx_supp_applicant_per_address","suppApplicantPerAddress");									
			rs2BeanMap.put("tx_supp_applicant_mobile","suppApplicantMobile");									
			rs2BeanMap.put("tx_supp_applicant_email","suppApplicantEmail");											
			rs2BeanMap.put("tx_supp_applicant_nid","suppApplicantNid");								
			rs2BeanMap.put("tx_supp_applicant_passport","suppApplicantPassport");										
			rs2BeanMap.put("dtt_supp_applicant_dateof_exp","suppApplicantDateOfExp");
			rs2BeanMap.put("tx_supp_you_are_setup_limit_card","suppYouAreSetupLimitCard");
			rs2BeanMap.put("dec_supp_set_up_limit_bd_amount","suppSetUpLimitBDAmount");
			rs2BeanMap.put("dec_supp_set_up_limit_percent","suppSetUpLimitPercent");
			rs2BeanMap.put("dec_supp_set_up_limit_usd_amount","suppSetUpLimitUSDAmount");
			rs2BeanMap.put("tx_ref_name","refName");
			rs2BeanMap.put("tx_ref_relation_with_applicant","refRelationWithApplicant");
			rs2BeanMap.put("tx_ref_profession","refProfession");
			rs2BeanMap.put("tx_ref_org_name","refOrgName");
			rs2BeanMap.put("tx_ref_designation","refDesignation");
			rs2BeanMap.put("tx_ref_workor_residence_address","refWorkOrResidenceAddress");
			rs2BeanMap.put("tx_ref_telephone","refTelephone");
			rs2BeanMap.put("tx_ref_mobile","refMobile");
			rs2BeanMap.put("tx_ref_email","refEmail");
		}
		return rs2BeanMap;
	}

	public String getSuppApplicantName() {
		return suppApplicantName;
	}

	public void setSuppApplicantName(String suppApplicantName) {
		this.suppApplicantName = suppApplicantName;
	}

	public String getRelationPrincipalApplicant() {
		return relationPrincipalApplicant;
	}

	public void setRelationPrincipalApplicant(String relationPrincipalApplicant) {
		this.relationPrincipalApplicant = relationPrincipalApplicant;
	}

	public String getRelationPrincipalApplicantOthers() {
		return relationPrincipalApplicantOthers;
	}

	public void setRelationPrincipalApplicantOthers(String relationPrincipalApplicantOthers) {
		this.relationPrincipalApplicantOthers = relationPrincipalApplicantOthers;
	}

	public String getSuppApplicantGender() {
		return suppApplicantGender;
	}

	public void setSuppApplicantGender(String suppApplicantGender) {
		this.suppApplicantGender = suppApplicantGender;
	}

	public Date getSuppApplicantDateOfBirth() {
		return suppApplicantDateOfBirth;
	}

	public void setSuppApplicantDateOfBirth(Date suppApplicantDateOfBirth) {
		this.suppApplicantDateOfBirth = suppApplicantDateOfBirth;
	}

	public String getSuppApplicantOccupation() {
		return suppApplicantOccupation;
	}

	public void setSuppApplicantOccupation(String suppApplicantOccupation) {
		this.suppApplicantOccupation = suppApplicantOccupation;
	}

	public String getSuppApplicantFatherName() {
		return suppApplicantFatherName;
	}

	public void setSuppApplicantFatherName(String suppApplicantFatherName) {
		this.suppApplicantFatherName = suppApplicantFatherName;
	}

	public String getSuppApplicantMotherName() {
		return suppApplicantMotherName;
	}

	public void setSuppApplicantMotherName(String suppApplicantMotherName) {
		this.suppApplicantMotherName = suppApplicantMotherName;
	}

	public String getSuppApplicantSpouseName() {
		return suppApplicantSpouseName;
	}

	public void setSuppApplicantSpouseName(String suppApplicantSpouseName) {
		this.suppApplicantSpouseName = suppApplicantSpouseName;
	}

	public String getSuppApplicantPresentAddress() {
		return suppApplicantPresentAddress;
	}

	public void setSuppApplicantPresentAddress(String suppApplicantPresentAddress) {
		this.suppApplicantPresentAddress = suppApplicantPresentAddress;
	}

	public String getSuppApplicantPerAddress() {
		return suppApplicantPerAddress;
	}

	public void setSuppApplicantPerAddress(String suppApplicantPerAddress) {
		this.suppApplicantPerAddress = suppApplicantPerAddress;
	}

	public String getSuppApplicantMobile() {
		return suppApplicantMobile;
	}

	public void setSuppApplicantMobile(String suppApplicantMobile) {
		this.suppApplicantMobile = suppApplicantMobile;
	}

	public String getSuppApplicantEmail() {
		return suppApplicantEmail;
	}

	public void setSuppApplicantEmail(String suppApplicantEmail) {
		this.suppApplicantEmail = suppApplicantEmail;
	}

	public String getSuppApplicantNid() {
		return suppApplicantNid;
	}

	public void setSuppApplicantNid(String suppApplicantNid) {
		this.suppApplicantNid = suppApplicantNid;
	}

	public String getSuppApplicantPassport() {
		return suppApplicantPassport;
	}

	public void setSuppApplicantPassport(String suppApplicantPassport) {
		this.suppApplicantPassport = suppApplicantPassport;
	}

	public Date getSuppApplicantDateOfExp() {
		return suppApplicantDateOfExp;
	}

	public void setSuppApplicantDateOfExp(Date suppApplicantDateOfExp) {
		this.suppApplicantDateOfExp = suppApplicantDateOfExp;
	}

	public String getSuppYouAreSetupLimitCard() {
		return suppYouAreSetupLimitCard;
	}

	public void setSuppYouAreSetupLimitCard(String suppYouAreSetupLimitCard) {
		this.suppYouAreSetupLimitCard = suppYouAreSetupLimitCard;
	}

	public Double getSuppSetUpLimitBDAmount() {
		return suppSetUpLimitBDAmount;
	}

	public void setSuppSetUpLimitBDAmount(Double suppSetUpLimitBDAmount) {
		this.suppSetUpLimitBDAmount = suppSetUpLimitBDAmount;
	}

	public Double getSuppSetUpLimitPercent() {
		return suppSetUpLimitPercent;
	}

	public void setSuppSetUpLimitPercent(Double suppSetUpLimitPercent) {
		this.suppSetUpLimitPercent = suppSetUpLimitPercent;
	}

	public Double getSuppSetUpLimitUSDAmount() {
		return suppSetUpLimitUSDAmount;
	}

	public void setSuppSetUpLimitUSDAmount(Double suppSetUpLimitUSDAmount) {
		this.suppSetUpLimitUSDAmount = suppSetUpLimitUSDAmount;
	}

	public String getRefName() {
		return refName;
	}

	public void setRefName(String refName) {
		this.refName = refName;
	}

	public String getRefRelationWithApplicant() {
		return refRelationWithApplicant;
	}

	public void setRefRelationWithApplicant(String refRelationWithApplicant) {
		this.refRelationWithApplicant = refRelationWithApplicant;
	}

	public String getRefProfession() {
		return refProfession;
	}

	public void setRefProfession(String refProfession) {
		this.refProfession = refProfession;
	}

	public String getRefOrgName() {
		return refOrgName;
	}

	public void setRefOrgName(String refOrgName) {
		this.refOrgName = refOrgName;
	}

	public String getRefDesignation() {
		return refDesignation;
	}

	public void setRefDesignation(String refDesignation) {
		this.refDesignation = refDesignation;
	}

	public String getRefWorkOrResidenceAddress() {
		return refWorkOrResidenceAddress;
	}

	public void setRefWorkOrResidenceAddress(String refWorkOrResidenceAddress) {
		this.refWorkOrResidenceAddress = refWorkOrResidenceAddress;
	}

	public String getRefTelephone() {
		return refTelephone;
	}

	public void setRefTelephone(String refTelephone) {
		this.refTelephone = refTelephone;
	}

	public String getRefMobile() {
		return refMobile;
	}

	public void setRefMobile(String refMobile) {
		this.refMobile = refMobile;
	}

	public String getRefEmail() {
		return refEmail;
	}

	public void setRefEmail(String refEmail) {
		this.refEmail = refEmail;
	}

	public Integer getIdSupplementAndReferKey() {
		return idSupplementAndReferKey;
	}

	public void setIdSupplementAndReferKey(Integer idSupplementAndReferKey) {
		this.idSupplementAndReferKey = idSupplementAndReferKey;
	}

	public Integer getIdSupplementAndReferVer() {
		return idSupplementAndReferVer;
	}

	public void setIdSupplementAndReferVer(Integer idSupplementAndReferVer) {
		this.idSupplementAndReferVer = idSupplementAndReferVer;
	}

	@Override
	public String toString() {
		return "SupplementAndReferDetails [suppApplicantName=" + suppApplicantName + ", relationPrincipalApplicant="
				+ relationPrincipalApplicant + ", relationPrincipalApplicantOthers=" + relationPrincipalApplicantOthers
				+ ", suppApplicantGender=" + suppApplicantGender + ", suppApplicantDateOfBirth="
				+ suppApplicantDateOfBirth + ", suppApplicantOccupation=" + suppApplicantOccupation
				+ ", suppApplicantFatherName=" + suppApplicantFatherName + ", suppApplicantMotherName="
				+ suppApplicantMotherName + ", suppApplicantSpouseName=" + suppApplicantSpouseName
				+ ", suppApplicantPresentAddress=" + suppApplicantPresentAddress + ", suppApplicantPerAddress="
				+ suppApplicantPerAddress + ", suppApplicantMobile=" + suppApplicantMobile + ", suppApplicantEmail="
				+ suppApplicantEmail + ", suppApplicantNid=" + suppApplicantNid + ", suppApplicantPassport="
				+ suppApplicantPassport + ", suppApplicantDateOfExp=" + suppApplicantDateOfExp
				+ ", suppYouAreSetupLimitCard=" + suppYouAreSetupLimitCard + ", suppSetUpLimitBDAmount="
				+ suppSetUpLimitBDAmount + ", suppSetUpLimitPercent=" + suppSetUpLimitPercent
				+ ", suppSetUpLimitUSDAmount=" + suppSetUpLimitUSDAmount + ", refName=" + refName
				+ ", refRelationWithApplicant=" + refRelationWithApplicant + ", refProfession=" + refProfession
				+ ", refOrgName=" + refOrgName + ", refDesignation=" + refDesignation + ", refWorkOrResidenceAddress="
				+ refWorkOrResidenceAddress + ", refTelephone=" + refTelephone + ", refMobile=" + refMobile
				+ ", refEmail=" + refEmail + "]";
	}

}
