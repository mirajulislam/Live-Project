
package com.naztech.lms.constants;

/**
 * 
 * @author md.kamruzzaman
 *
 */
public enum Destination {

	destination("Lms-server"),;

	private final String destinationName;

	private Destination(String destinationName) {
		this.destinationName = destinationName;
	}

	@Override
	public String toString() {
		return destinationName;
	}

}
