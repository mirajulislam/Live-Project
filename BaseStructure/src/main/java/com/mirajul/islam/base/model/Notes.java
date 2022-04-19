/**
 * 
 */
package com.mirajul.islam.base.model;

/**
 * @author mirajul.islam
 *
 */
public class Notes extends BaseModel{
	private Integer notesId;
	private Integer notesVer;
	private Integer refId;
	private String referNotes;
	private String notesBy;
	private String objectType;
	
	public Integer getNotesId() {
		return notesId;
	}

	public void setNotesId(Integer notesId) {
		this.notesId = notesId;
	}


	public Integer getNotesVer() {
		return notesVer;
	}

	public void setNotesVer(Integer notesVer) {
		this.notesVer = notesVer;
	}

	public Integer getRefId() {
		return refId;
	}

	public void setRefId(Integer refId) {
		this.refId = refId;
	}

	public String getNotesBy() {
		return notesBy;
	}

	public void setNotesBy(String notesBy) {
		this.notesBy = notesBy;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getReferNotes() {
		return referNotes;
	}

	public void setReferNotes(String referNotes) {
		this.referNotes = referNotes;
	}

}
