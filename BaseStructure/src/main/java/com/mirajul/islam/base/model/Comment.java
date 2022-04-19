package com.mirajul.islam.base.model;

/**
 * @author mirajul.islam
 */
public class Comment extends BaseModel {

	private Integer commentId;
	private Integer commentVer;
	private String objectType;
	private String commentType;
	private Integer refId;
	private String comments;
	private String commentedBy;
	private String commentResponse;
	private String commentResponseBy;

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

	public String getCommentedBy() {
		return commentedBy;
	}

	public void setCommentedBy(String commentedBy) {
		this.commentedBy = commentedBy;
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

	@Override
	public String toString() {
		return "Comment [commentId=" + commentId + ", commentVer=" + commentVer + ", objectType=" + objectType
				+ ", commentType=" + commentType + ", refId=" + refId + ", comments=" + comments + ", commentedBy="
				+ commentedBy + ", commentResponse=" + commentResponse + ", commentResponseBy=" + commentResponseBy
				+ "]";
	}
	
}
