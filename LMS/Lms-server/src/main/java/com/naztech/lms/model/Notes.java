/**
 * 
 */
package com.naztech.lms.model;

import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author mirajul.islam
 *
 */
public class Notes extends BaseModel{
	private Integer notesId;
	private Integer notesVer;
	private Integer refId;
	private String loanNotes;
	private String notesBy;
	
	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;
	
	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();			
			sql2BeanMap.putAll(getSql2BaseBeanMap());
			
			sql2BeanMap.put("@id_notes_key", "notesId");
			sql2BeanMap.put("@id_notes_ver", "notesVer");
			
			sql2BeanMap.put("@id_ref_key", "refId");
			sql2BeanMap.put("@tx_loan_notes", "loanNotes");
			sql2BeanMap.put("@tx_notes_by", "notesBy");
		}
		return sql2BeanMap;
	}
	
	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			rs2BeanMap.putAll(getRs2BaseBeanMap());
			
			rs2BeanMap.put("id_notes_key", "notesId");
			rs2BeanMap.put("id_notes_ver", "notesVer");
			
			rs2BeanMap.put("id_ref_key", "refId");
			rs2BeanMap.put("tx_loan_notes", "loanNotes");
			rs2BeanMap.put("tx_notes_by", "notesBy");
		}
		return rs2BeanMap;
	}
	
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

	public String getLoanNotes() {
		return loanNotes;
	}

	public void setLoanNotes(String loanNotes) {
		this.loanNotes = loanNotes;
	}

	public String getNotesBy() {
		return notesBy;
	}

	public void setNotesBy(String notesBy) {
		this.notesBy = notesBy;
	}

	@Override
	public String toString() {
		return "Notes [notesId=" + notesId + ", notesVer=" + notesVer + ", refId=" + refId + ", loanNotes=" + loanNotes + ", notesBy=" + notesBy
		        + "]";
	}
	
}
