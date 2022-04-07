package com.naztech.nid.model;

import java.io.File;
import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.stream.Collectors;

@SuppressWarnings("serial")
public class NationalId implements Serializable {

	public NationalId() {
	}

	public NationalId(String nid, LocalDate dateOfBirth) {
		this.nid = nid;
		this.dateOfBirth = dateOfBirth;
	}

	private Integer active;
	private Integer idEnvKey;
	private Integer userModKey;
	private LocalDateTime dttMod;
	private Integer idEventKey;
	private Integer stateId;
	private Integer idActionKey;

	private Integer nidId;
	private Integer nidVer;
	private String nid;
	private String nidPin;
	private String nameBangla;
	private String nameEnglish;
	private LocalDate dateOfBirth;
	private String fatherName;
	private String motherName;
	private String spouseName;
	private String occupation;
	private String presentDistrict;
	private String presentDivision;
	private String presentRmo;
	private String presentMunicipality;
	private String presentUpozila;
	private String presentUnion;
	private String presentMoholla;
	private String presentAddMoholla;
	private String presentWardUnionPorishod;
	private String presentVillage;
	private String presentAddVillage;
	private String presentHome;
	private String presentPostOffice;
	private String presentPostalCode;
	private String presentRegion;
	private String permanentDistrict;
	private String permanentDivision;
	private String permanentRmo;
	private String permanentMunicipality;
	private String permanentUpozila;
	private String permanentUnion;
	private String permanentMoholla;
	private String permanentAddMoholla;
	private String permanentWardUnionPorishod;
	private String permanentVillage;
	private String permanentAddVillage;
	private String permanentHome;
	private String permanentPostOffice;
	private String permanentPostalCode;
	private String permanentRegion;
	private String bloodGroup;
	private String requestId;
	private LocalDateTime extractTime;
	private String nidImagePath;
	private String nidImageName;
	private String personImagePath;
	private String personImageName;
	private String nidImagePublicPath;
	private String personImagePublicPath;
	private LocalDate fromDate;
	private LocalDate toDate;
	private Integer nidRequestId;

	private Integer nidSource;

	private File nidImage;
	private File nidPersonImage;

	private String comments;

	private boolean forceFatch;
	private String callBackUrl;

	private Integer success;
	private String  source;
	private String  nidDetailsFrom;

	private static Map<String, String> rs2BeanMap = null;
	private static Map<String, String> sql2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {

		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<>();
			sql2BeanMap = getRs2BeanMap().entrySet().parallelStream().collect(Collectors.toMap(it -> "@" + it.getKey(), it -> it.getValue()));
		}

		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<>();
			rs2BeanMap.put("id_nid_key", "nidId");
			rs2BeanMap.put("id_nid_ver", "nidVer");
			rs2BeanMap.put("is_active", "active");
			rs2BeanMap.put("id_env_key", "idEnvKey");
			rs2BeanMap.put("id_user_mod_key", "userModKey");
			rs2BeanMap.put("dtt_mod", "dttMod");
			rs2BeanMap.put("id_event_key", "idEventKey");
			rs2BeanMap.put("id_state_key", "stateId");
			rs2BeanMap.put("id_action_key", "idActionKey");
			rs2BeanMap.put("id_nid_request_key", "nidRequestId");
			rs2BeanMap.put("tx_nid", "nid");
			rs2BeanMap.put("tx_nid_pin", "nidPin");
			rs2BeanMap.put("tx_name_bangla", "nameBangla");
			rs2BeanMap.put("tx_name_english", "nameEnglish");
			rs2BeanMap.put("dtt_dob", "dateOfBirth");
			rs2BeanMap.put("tx_father_name", "fatherName");
			rs2BeanMap.put("tx_mother_name", "motherName");
			rs2BeanMap.put("tx_spouse_name", "spouseName");
			rs2BeanMap.put("tx_occupation_name", "occupation");
			rs2BeanMap.put("tx_present_district", "presentDistrict");
			rs2BeanMap.put("tx_present_division", "presentDivision");
			rs2BeanMap.put("tx_present_rmo", "presentRmo");
			rs2BeanMap.put("tx_present_municipality", "presentMunicipality");
			rs2BeanMap.put("tx_present_upozila", "presentUpozila");
			rs2BeanMap.put("tx_present_union", "presentUnion");
			rs2BeanMap.put("tx_present_moholla", "presentMoholla");
			rs2BeanMap.put("tx_present_add_moholla", "presentAddMoholla");
			rs2BeanMap.put("tx_present_ward_union_porishod", "presentWardUnionPorishod");
			rs2BeanMap.put("tx_present_village", "presentVillage");
			rs2BeanMap.put("tx_present_add_village", "presentAddVillage");
			rs2BeanMap.put("tx_present_home", "presentHome");
			rs2BeanMap.put("tx_present_post_office", "presentPostOffice");
			rs2BeanMap.put("tx_present_postal_code", "presentPostalCode");
			rs2BeanMap.put("tx_present_region", "presentRegion");
			rs2BeanMap.put("tx_permanent_district", "permanentDistrict");
			rs2BeanMap.put("tx_permanent_division", "permanentDivision");
			rs2BeanMap.put("tx_permanent_rmo", "permanentRmo");
			rs2BeanMap.put("tx_permanent_municipality", "permanentMunicipality");
			rs2BeanMap.put("tx_permanent_upozila", "permanentUpozila");
			rs2BeanMap.put("tx_permanent_union", "permanentUnion");
			rs2BeanMap.put("tx_permanent_moholla", "permanentMoholla");
			rs2BeanMap.put("tx_permanent_add_moholla", "permanentAddMoholla");
			rs2BeanMap.put("tx_permanent_ward_union_porishod", "permanentWardUnionPorishod");
			rs2BeanMap.put("tx_permanent_village", "permanentVillage");
			rs2BeanMap.put("tx_permanent_add_village", "permanentAddVillage");
			rs2BeanMap.put("tx_permanent_home", "permanentHome");
			rs2BeanMap.put("tx_permanent_post_office", "permanentPostOffice");
			rs2BeanMap.put("tx_permanent_postal_code", "permanentPostalCode");
			rs2BeanMap.put("tx_permanent_region", "permanentRegion");
			rs2BeanMap.put("tx_blood_group", "bloodGroup");
			rs2BeanMap.put("tx_request_id", "requestId");
			rs2BeanMap.put("tx_nid_image_path", "nidImagePath");
			rs2BeanMap.put("tx_nid_image_name", "nidImageName");
			rs2BeanMap.put("tx_person_image_path", "personImagePath");
			rs2BeanMap.put("tx_person_image_name", "personImageName");
			rs2BeanMap.put("tx_nid_image_public_path", "nidImagePublicPath");
			rs2BeanMap.put("tx_person_image_public_path", "personImagePublicPath");
			rs2BeanMap.put("dtt_extract_time", "extractTime");
			rs2BeanMap.put("int_success", "success");
			rs2BeanMap.put("dt_form_date", "fromDate");
			rs2BeanMap.put("dt_to_date", "toDate");
			rs2BeanMap.put("tx_data_source", "source");
			rs2BeanMap.put("tx_force_fatch", "forceFatch");
			rs2BeanMap.put("tx_nid_details_from", "nidDetailsFrom");

		}

		return rs2BeanMap;
	}

	public Integer getNidId() {
		return nidId;
	}

	public void setNidId(Integer nidId) {
		this.nidId = nidId;
	}

	public Integer getNidVer() {
		return nidVer;
	}

	public void setNidVer(Integer nidVer) {
		this.nidVer = nidVer;
	}

	public String getNid() {
		return nid;
	}

	public void setNid(String nid) {
		this.nid = nid;
	}

	public String getNidPin() {
		return nidPin;
	}

	public void setNidPin(String nidPin) {
		this.nidPin = nidPin;
	}

	public String getNameBangla() {
		return nameBangla;
	}

	public void setNameBangla(String nameBangla) {
		this.nameBangla = nameBangla;
	}

	public String getNameEnglish() {
		return nameEnglish;
	}

	public void setNameEnglish(String nameEnglish) {
		this.nameEnglish = nameEnglish;
	}

	public LocalDate getDateOfBirth() {
		return dateOfBirth;
	}

	public void setDateOfBirth(LocalDate dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}

	public String getFatherName() {
		return fatherName;
	}

	public void setFatherName(String fatherName) {
		this.fatherName = fatherName;
	}

	public String getMotherName() {
		return motherName;
	}

	public void setMotherName(String motherName) {
		this.motherName = motherName;
	}

	public String getSpouseName() {
		return spouseName;
	}

	public void setSpouseName(String spouseName) {
		this.spouseName = spouseName;
	}

	public String getOccupation() {
		return occupation;
	}

	public void setOccupation(String occupation) {
		this.occupation = occupation;
	}

	public String getPresentDistrict() {
		return presentDistrict;
	}

	public void setPresentDistrict(String presentDistrict) {
		this.presentDistrict = presentDistrict;
	}

	public String getPresentDivision() {
		return presentDivision;
	}

	public void setPresentDivision(String presentDivision) {
		this.presentDivision = presentDivision;
	}

	public String getPresentRmo() {
		return presentRmo;
	}

	public void setPresentRmo(String presentRmo) {
		this.presentRmo = presentRmo;
	}

	public String getPresentMunicipality() {
		return presentMunicipality;
	}

	public void setPresentMunicipality(String presentMunicipality) {
		this.presentMunicipality = presentMunicipality;
	}

	public String getPresentUpozila() {
		return presentUpozila;
	}

	public void setPresentUpozila(String presentUpozila) {
		this.presentUpozila = presentUpozila;
	}

	public String getPresentUnion() {
		return presentUnion;
	}

	public void setPresentUnion(String presentUnion) {
		this.presentUnion = presentUnion;
	}

	public String getPresentMoholla() {
		return presentMoholla;
	}

	public void setPresentMoholla(String presentMoholla) {
		this.presentMoholla = presentMoholla;
	}

	public String getPresentAddMoholla() {
		return presentAddMoholla;
	}

	public void setPresentAddMoholla(String presentAddMoholla) {
		this.presentAddMoholla = presentAddMoholla;
	}

	public String getPresentWardUnionPorishod() {
		return presentWardUnionPorishod;
	}

	public void setPresentWardUnionPorishod(String presentWardUnionPorishod) {
		this.presentWardUnionPorishod = presentWardUnionPorishod;
	}

	public String getPresentVillage() {
		return presentVillage;
	}

	public void setPresentVillage(String presentVillage) {
		this.presentVillage = presentVillage;
	}

	public String getPresentAddVillage() {
		return presentAddVillage;
	}

	public void setPresentAddVillage(String presentAddVillage) {
		this.presentAddVillage = presentAddVillage;
	}

	public String getPresentHome() {
		return presentHome;
	}

	public void setPresentHome(String presentHome) {
		this.presentHome = presentHome;
	}

	public String getPresentPostOffice() {
		return presentPostOffice;
	}

	public void setPresentPostOffice(String presentPostOffice) {
		this.presentPostOffice = presentPostOffice;
	}

	public String getPresentPostalCode() {
		return presentPostalCode;
	}

	public void setPresentPostalCode(String presentPostalCode) {
		this.presentPostalCode = presentPostalCode;
	}

	public String getPresentRegion() {
		return presentRegion;
	}

	public void setPresentRegion(String presentRegion) {
		this.presentRegion = presentRegion;
	}

	public String getPermanentDistrict() {
		return permanentDistrict;
	}

	public void setPermanentDistrict(String permanentDistrict) {
		this.permanentDistrict = permanentDistrict;
	}

	public String getPermanentDivision() {
		return permanentDivision;
	}

	public void setPermanentDivision(String permanentDivision) {
		this.permanentDivision = permanentDivision;
	}

	public String getPermanentRmo() {
		return permanentRmo;
	}

	public void setPermanentRmo(String permanentRmo) {
		this.permanentRmo = permanentRmo;
	}

	public String getPermanentMunicipality() {
		return permanentMunicipality;
	}

	public void setPermanentMunicipality(String permanentMunicipality) {
		this.permanentMunicipality = permanentMunicipality;
	}

	public String getPermanentUpozila() {
		return permanentUpozila;
	}

	public void setPermanentUpozila(String permanentUpozila) {
		this.permanentUpozila = permanentUpozila;
	}

	public String getPermanentUnion() {
		return permanentUnion;
	}

	public void setPermanentUnion(String permanentUnion) {
		this.permanentUnion = permanentUnion;
	}

	public String getPermanentMoholla() {
		return permanentMoholla;
	}

	public void setPermanentMoholla(String permanentMoholla) {
		this.permanentMoholla = permanentMoholla;
	}

	public String getPermanentAddMoholla() {
		return permanentAddMoholla;
	}

	public void setPermanentAddMoholla(String permanentAddMoholla) {
		this.permanentAddMoholla = permanentAddMoholla;
	}

	public String getPermanentWardUnionPorishod() {
		return permanentWardUnionPorishod;
	}

	public void setPermanentWardUnionPorishod(String permanentWardUnionPorishod) {
		this.permanentWardUnionPorishod = permanentWardUnionPorishod;
	}

	public String getPermanentVillage() {
		return permanentVillage;
	}

	public void setPermanentVillage(String permanentVillage) {
		this.permanentVillage = permanentVillage;
	}

	public String getPermanentAddVillage() {
		return permanentAddVillage;
	}

	public void setPermanentAddVillage(String permanentAddVillage) {
		this.permanentAddVillage = permanentAddVillage;
	}

	public String getPermanentHome() {
		return permanentHome;
	}

	public void setPermanentHome(String permanentHome) {
		this.permanentHome = permanentHome;
	}

	public String getPermanentPostOffice() {
		return permanentPostOffice;
	}

	public void setPermanentPostOffice(String permanentPostOffice) {
		this.permanentPostOffice = permanentPostOffice;
	}

	public String getPermanentPostalCode() {
		return permanentPostalCode;
	}

	public void setPermanentPostalCode(String permanentPostalCode) {
		this.permanentPostalCode = permanentPostalCode;
	}

	public String getPermanentRegion() {
		return permanentRegion;
	}

	public void setPermanentRegion(String permanentRegion) {
		this.permanentRegion = permanentRegion;
	}

	public String getBloodGroup() {
		return bloodGroup;
	}

	public void setBloodGroup(String bloodGroup) {
		this.bloodGroup = bloodGroup;
	}

	public String getRequestId() {
		return requestId;
	}

	public void setRequestId(String requestId) {
		this.requestId = requestId;
	}

	public LocalDateTime getExtractTime() {
		return extractTime;
	}

	public void setExtractTime(LocalDateTime extractTime) {
		this.extractTime = extractTime;
	}

	public String getNidImagePath() {
		return nidImagePath;
	}

	public void setNidImagePath(String nidImagePath) {
		this.nidImagePath = nidImagePath;
	}

	public String getNidImageName() {
		return nidImageName;
	}

	public void setNidImageName(String nidImageName) {
		this.nidImageName = nidImageName;
	}

	public String getPersonImagePath() {
		return personImagePath;
	}

	public void setPersonImagePath(String personImagePath) {
		this.personImagePath = personImagePath;
	}

	public String getPersonImageName() {
		return personImageName;
	}

	public void setPersonImageName(String personImageName) {
		this.personImageName = personImageName;
	}

	public Integer getNidSource() {
		return nidSource;
	}

	public void setNidSource(Integer nidSource) {
		this.nidSource = nidSource;
	}

	public File getNidImage() {
		return nidImage;
	}

	public void setNidImage(File nidImage) {
		this.nidImage = nidImage;
	}

	public File getNidPersonImage() {
		return nidPersonImage;
	}

	public void setNidPersonImage(File nidPersonImage) {
		this.nidPersonImage = nidPersonImage;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getNidImagePublicPath() {
		return nidImagePublicPath;
	}

	public void setNidImagePublicPath(String nidImagePublicPath) {
		this.nidImagePublicPath = nidImagePublicPath;
	}

	public String getPersonImagePublicPath() {
		return personImagePublicPath;
	}

	public void setPersonImagePublicPath(String personImagePublicPath) {
		this.personImagePublicPath = personImagePublicPath;
	}

	public Integer getActive() {
		return active;
	}

	public void setActive(Integer active) {
		this.active = active;
	}

	public Integer getIdEnvKey() {
		return idEnvKey;
	}

	public void setIdEnvKey(Integer idEnvKey) {
		this.idEnvKey = idEnvKey;
	}

	public Integer getUserModKey() {
		return userModKey;
	}

	public void setUserModKey(Integer userModKey) {
		this.userModKey = userModKey;
	}

	public LocalDateTime getDttMod() {
		return dttMod;
	}

	public void setDttMod(LocalDateTime dttMod) {
		this.dttMod = dttMod;
	}

	public Integer getStateId() {
		return stateId;
	}

	public void setStateId(Integer stateId) {
		this.stateId = stateId;
	}

	public Integer getIdActionKey() {
		return idActionKey;
	}

	public void setIdActionKey(Integer idActionKey) {
		this.idActionKey = idActionKey;
	}

	public LocalDate getFromDate() {
		return fromDate;
	}

	public void setFromDate(LocalDate fromDate) {
		this.fromDate = fromDate;
	}

	public LocalDate getToDate() {
		return toDate;
	}

	public void setToDate(LocalDate toDate) {
		this.toDate = toDate;
	}

	public Integer getIdEventKey() {
		return idEventKey;
	}

	public void setIdEventKey(Integer idEventKey) {
		this.idEventKey = idEventKey;
	}

	public Integer getNidRequestId() {
		return nidRequestId;
	}

	public void setNidRequestId(Integer nidRequestId) {
		this.nidRequestId = nidRequestId;
	}

	public boolean isForceFatch() {
		return forceFatch;
	}

	public void setForceFatch(boolean forceFatch) {
		this.forceFatch = forceFatch;
	}

	public String getCallBackUrl() {
		return callBackUrl;
	}

	public void setCallBackUrl(String callBackUrl) {
		this.callBackUrl = callBackUrl;
	}

	public Integer getSuccess() {
		return success;
	}

	public void setSuccess(Integer success) {
		this.success = success;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getNidDetailsFrom() {
		return nidDetailsFrom;
	}

	public void setNidDetailsFrom(String nidDetailsFrom) {
		this.nidDetailsFrom = nidDetailsFrom;
	}	

}
