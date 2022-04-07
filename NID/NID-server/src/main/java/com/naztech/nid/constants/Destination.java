
package com.naztech.nid.constants;
/**
 * 
 * @author md.kamruzzaman
 *
 */
public enum Destination {

	destination("NidScaper"),
	;

	private final String destinationName;

	private Destination(String destinationName) {
		this.destinationName = destinationName;
	}

	@Override
	public String toString() {
		return destinationName;
	}

}
