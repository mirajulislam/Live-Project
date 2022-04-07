/**
 * 
 */
package com.naztech.nid.constants;
/**
 * 
 * @author md.kamruzzaman
 *
 */
public enum ContentType {

	PATIENT("Patient"), NEXOFKIN("PatientNextOfKin"), STATUS("STATUS"), UserConfigPA("UserConfigPA"), MULTI_MESSAGE("MULTI_MESSAGE"), MULTI("MULTI");

	private final String contentTypeName;

	private ContentType(String contentTypeName) {
		this.contentTypeName = contentTypeName;
	}

	@Override
	public String toString() {
		return contentTypeName;
	}

}
