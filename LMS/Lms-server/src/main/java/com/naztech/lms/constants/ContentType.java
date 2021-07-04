/**
 * 
 */
package com.naztech.lms.constants;
/**
 * 
 * @author md.kamruzzaman
 *
 */
public enum ContentType {

	MULTI_MESSAGE("MULTI_MESSAGE"), MULTI("MULTI");

	private final String contentTypeName;

	private ContentType(String contentTypeName) {
		this.contentTypeName = contentTypeName;
	}

	@Override
	public String toString() {
		return contentTypeName;
	}

}
