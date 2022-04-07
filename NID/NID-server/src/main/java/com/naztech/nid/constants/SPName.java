package com.naztech.nid.constants;

/**
 * @author md.kamruzzaman
 */
public enum SPName {

	OFAC_SCHEMA("OFAC"),
	STAGE("STAGE"),
	OFAC_SCHEMA_DEFAULT("dbo"),
	ACT_USER("ACT_user"),
	SEL_USER("SEL_user_config"),

	ACT_NID("ACT_nid"),
	ACT_NID_V2("ACT_nid_v2"),
	ACT_NID_REQ("ACT_nid_request"),

	SEL_NID("SEL_nid"),
	ACT_SEARCH_NID("ACT_search_nid"),
	ACT_SEARCH_RESULT("ACT_search_result");

	private final String storeProcedureName;

	private SPName(String storeProcedureName) {
		this.storeProcedureName = storeProcedureName;
	}

	@Override
	public String toString() {
		return storeProcedureName;
	}

}
