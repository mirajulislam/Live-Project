package com.naztech.nid.model;

public class Header {

	private String apiKey;

	private String contentType;
	private String actionType;
	private String requestType; // SYNC/ASYNC
	private String destination;
	private String forceRefetch;
	
	private String[] callbackUrl;

	public String getApiKey() {
		return apiKey;
	}

	public void setApiKey(String apiKey) {
		this.apiKey = apiKey;
	}

	public String getContentType() {
		return contentType;
	}

	public void setContentType(String contentType) {
		this.contentType = contentType;
	}

	public String getActionType() {
		return actionType;
	}

	public void setActionType(String actionType) {
		this.actionType = actionType;
	}

	public String getRequestType() {
		return requestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public String getDestination() {
		return destination;
	}

	public void setDestination(String destination) {
		this.destination = destination;
	}

	public String[] getCallbackUrl() {
		return callbackUrl;
	}

	public void setCallbackUrl(String[] callbackUrl) {
		this.callbackUrl = callbackUrl;
	}

	public String getForceRefetch() {
		return forceRefetch;
	}

	public void setForceRefetch(String forceRefetch) {
		this.forceRefetch = forceRefetch;
	}

}
