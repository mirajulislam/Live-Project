/**
 * 
 */
package com.naztech.lms.model;

import java.util.List;

/**
 * @author mirajul.islam
 *
 */
public class CibInformation {
    private String quaryMod;
    NewInquiryModel newInquiryModel;
    private String docDownloadUrl;
    private List<String> userStatus;
    private String cibStatus;
    private String msg;
    private String fileBase64;
    private Integer loanId;
    protected Integer userModKey;
    
	public String getQuaryMod() {
		return quaryMod;
	}
	public void setQuaryMod(String quaryMod) {
		this.quaryMod = quaryMod;
	}
	public NewInquiryModel getNewInquiryModel() {
		return newInquiryModel;
	}
	public void setNewInquiryModel(NewInquiryModel newInquiryModel) {
		this.newInquiryModel = newInquiryModel;
	}
	public String getDocDownloadUrl() {
		return docDownloadUrl;
	}
	public void setDocDownloadUrl(String docDownloadUrl) {
		this.docDownloadUrl = docDownloadUrl;
	}
	public List<String> getUserStatus() {
		return userStatus;
	}
	public void setUserStatus(List<String> userStatus) {
		this.userStatus = userStatus;
	}
	public String getCibStatus() {
		return cibStatus;
	}
	public void setCibStatus(String cibStatus) {
		this.cibStatus = cibStatus;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getFileBase64() {
		return fileBase64;
	}
	public void setFileBase64(String fileBase64) {
		this.fileBase64 = fileBase64;
	}
	public Integer getLoanId() {
		return loanId;
	}
	public void setLoanId(Integer loanId) {
		this.loanId = loanId;
	}
	public Integer getUserModKey() {
		return userModKey;
	}
	public void setUserModKey(Integer userModKey) {
		this.userModKey = userModKey;
	}
	@Override
	public String toString() {
		return "CibInformation [quaryMod=" + quaryMod + ", newInquiryModel=" + newInquiryModel + ", docDownloadUrl=" + docDownloadUrl
		        + ", userStatus=" + userStatus + ", cibStatus=" + cibStatus + ", msg=" + msg + ", fileBase64=" + fileBase64 + ", loanId=" + loanId
		        + ", userModKey=" + userModKey + "]";
	}
    
    
}
