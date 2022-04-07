package com.naztech.nid.constants;

/**
 * @author md.kamruzzaman
 */
public enum ActionType {

	NEW("NEW"),
	Login("LOGIN"),
	UPDATE("UPDATE"),
	FETCH("FETCH"),
	SELECT("SELECT"),
	SELECT_HISTORY("SELECT_HISTORY"),
	NEW_SEARCH_RESULT("NEW_SEARCH_RESULT"),
	NEW_SEARCH("NEW_SEARCH"),
	SELECT_NID_DETAILS("SELECT_NID_DETAILS"),
	SELECT_REQUEST_HISTORY("SELECT_REQUEST_HISTORY");

	private final String actionType;

	private ActionType(String actionType) {
		this.actionType = actionType;
	}

	@Override
	public String toString() {
		return actionType;
	}

}
