package com.naztech.lms.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * @author md.kamruzzaman
 */
public class Comment extends BaseModel {

	private Integer commentId;
	private Integer commentVer;

	/**
	 * It may be T_LOAN(LOAN), T_DOCUMENT(DOCUMENT)
	 */
	private String objectType;
	/**
	 * Analyst comments, Approver comments
	 */
	private String commentType;
	/**
	 * id_loan_key, id_document_key
	 */
	private Integer refId;
	/**
	 * Actual comments text
	 */
	private String comments;

	private Date createdDate;
	private String commentedBy;

	private String commentResponse;
	private String commentResponseBy;

	/*
	 * rowIndex is the row number of store, which is using to keep track 
	 * while saving from an existing loan window 
	 */
	private int rowIndex;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_comment_key", "commentId");
			sql2BeanMap.put("@id_comment_ver", "commentVer");

			sql2BeanMap.put("@tx_object_type", "objectType");
			sql2BeanMap.put("@tx_comment_type", "commentType");
			sql2BeanMap.put("@id_ref_key", "refId");
			sql2BeanMap.put("@tx_comment", "comments");
			sql2BeanMap.put("@dtt_created_date", "createdDate");
			sql2BeanMap.put("@tx_commented_by", "commentedBy");

			sql2BeanMap.put("@tx_comment_response", "commentResponse");
			sql2BeanMap.put("@tx_comment_response_by", "commentResponseBy");

		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_comment_key", "commentId");
			rs2BeanMap.put("id_comment_ver", "commentVer");

			rs2BeanMap.put("tx_object_type", "objectType");
			rs2BeanMap.put("tx_comment_type", "commentType");
			rs2BeanMap.put("id_ref_key", "refId");
			rs2BeanMap.put("tx_comment", "comments");
			rs2BeanMap.put("dtt_created_date", "createdDate");
			rs2BeanMap.put("tx_commented_by", "commentedBy");

			rs2BeanMap.put("tx_comment_response", "commentResponse");
			rs2BeanMap.put("tx_comment_response_by", "commentResponseBy");

		}
		return rs2BeanMap;
	}

	public Integer getCommentId() {
		return commentId;
	}

	public void setCommentId(Integer commentId) {
		this.commentId = commentId;
	}

	public Integer getCommentVer() {
		return commentVer;
	}

	public void setCommentVer(Integer commentVer) {
		this.commentVer = commentVer;
	}

	public String getObjectType() {
		return objectType;
	}

	public void setObjectType(String objectType) {
		this.objectType = objectType;
	}

	public String getCommentType() {
		return commentType;
	}

	public void setCommentType(String commentType) {
		this.commentType = commentType;
	}

	public Integer getRefId() {
		return refId;
	}

	public void setRefId(Integer refId) {
		this.refId = refId;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public Date getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	public String getCommentedBy() {
		return commentedBy;
	}

	public void setCommentedBy(String commentedBy) {
		this.commentedBy = commentedBy;
	}

	public int getRowIndex() {
		return rowIndex;
	}

	public void setRowIndex(int rowIndex) {
		this.rowIndex = rowIndex;
	}

	@Override
	public String toString() {
		return "Comment [commentId=" + commentId + ", commentVer=" + commentVer + ", objectType=" + objectType + ", commentType=" + commentType
		        + ", refId=" + refId + ", comments=" + comments + ", createdDate=" + createdDate + ", commentedBy=" + commentedBy + ", rowIndex="
		        + rowIndex + "]";
	}

	public String getCommentResponse() {
		return commentResponse;
	}

	public void setCommentResponse(String commentResponse) {
		this.commentResponse = commentResponse;
	}

	public String getCommentResponseBy() {
		return commentResponseBy;
	}

	public void setCommentResponseBy(String commentResponseBy) {
		this.commentResponseBy = commentResponseBy;
	}
}
