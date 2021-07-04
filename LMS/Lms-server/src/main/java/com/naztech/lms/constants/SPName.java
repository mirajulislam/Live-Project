package com.naztech.lms.constants;

/**
 * @author md.kamruzzaman
 */
public enum SPName {

	OFAC_SCHEMA("OFAC"),
	STAGE("STAGE"),
	OFAC_SCHEMA_DEFAULT("dbo"),
	ACT_USER("ACT_user"),
	SEL_USER("SEL_user_config"),
	SEL_ROLE("SEL_role"),
	ACT_LOAN("ACT_loan"),
	SEL_lOAN("SEL_loan"),
	ACT_REPORT("ACT_report"),
	ACT_CUSTOMER("ACT_customer"),
	GET_SYSTEM_KEY("GET_system_key"),
	ACT_configuration("ACT_configuration"),
	ACT_LOAN_DOC_MAP("ACT_loan_doc_map"),
	ACT_comment("ACT_comment"),
	ACT_LOAN_CONFIG("Act_loan_config"),
	ACT_LOAN_DOCUMENT("Act_loan_document"),
	ACT_existing_liability("ACT_existing_liability"),
	SEL_FSM_STATE("SEL_fsm_state"),
	ACT_LMS_DASHBOARD("ACT_lms_dashboard"),
	UPD_loan("UPD_loan"),
	INS_loan("INS_loan"),
	ACT_NID_INFORMATION("ACT_nid_information"),
	ACT_notes("ACT_notes"),
	ACT_lms_sms("ACT_lms_sms"),
	ACT_sms_result("ACT_sms_result");

	private final String storeProcedureName;

	private SPName(String storeProcedureName) {
		this.storeProcedureName = storeProcedureName;
	}

	@Override
	public String toString() {
		return storeProcedureName;
	}

}
