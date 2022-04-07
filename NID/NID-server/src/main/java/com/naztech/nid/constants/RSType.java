package com.naztech.nid.constants;

/**
 * @author md.kamruzzaman
 */
public enum RSType {

	RS_TYPE_PREFERENCE("RS_TYPE_PREFERENCE"),
	RS_TYPE_NID("RS_TYPE_NID"),
	RS_TYPE_NID_REQUEST("RS_TYPE_NID_REQUEST"),
	RS_TYPE_NID_SELECT_REQUEST_HISTORY("RS_TYPE_SELECT_REQUEST_HISTORY");

	private final String rsTypeName;

	private RSType(String rsTypeName) {
		this.rsTypeName = rsTypeName;
	}

	@Override
	public String toString() {
		return rsTypeName;
	}

}
