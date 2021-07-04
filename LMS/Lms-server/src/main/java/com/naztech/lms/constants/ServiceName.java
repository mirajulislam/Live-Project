package com.naztech.lms.constants;
/**
 * 
 * @author md.kamruzzaman
 *
 */
public enum ServiceName {

	SERVICE_POSTFIX("Service");

	private final String serviceName;

	private ServiceName(String serviceName) {
		this.serviceName = serviceName;
	}

	@Override
	public String toString() {
		return serviceName;
	}

}
