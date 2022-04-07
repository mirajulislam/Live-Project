package com.naztech.lms.atmDispute.model;

import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.naztech.lms.model.BaseModel;
import com.naztech.lms.model.Comment;

/**
 * @author Mirajul.islam
 * @since 2021-02-15
 */
public class Complaint extends BaseModel{

	private static Map<String, String> sp2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;
	
	List<Comment> commentList;

	private Integer customerComplaintKey;
	private Integer customerComplaintVer;
	private Date txnDate;
	private String atmOwner;
	private Double txnAmount;
	private String accountNumber;
	private String cardNumber;
	private String atmLocation;
	private String comment;
	private String dataSource;
	private Integer trackingNumber;
	private String uiActionName;
	private String fromDate4Src;
	private String toDate4Src;
	private String folderName;

	public static Map<String, String> getSp2BeanMap() {
		if (sp2BeanMap == null)
			sp2BeanMap = new LinkedHashMap<String, String>();
		    // Follow this pattern all over the application		    

		    sp2BeanMap = getRs2BeanMap().entrySet().stream().collect(Collectors.toMap(e -> "@" + e.getKey(), e -> e.getValue(), (e1, e2) -> e1));
		    sp2BeanMap.put("@tx_ui_action_name", "uiActionName");
		    sp2BeanMap.put("@tx_from_date", "fromDate4Src");
		    sp2BeanMap.put("@tx_to_date", "toDate4Src");
		    sp2BeanMap.putAll(getSql2BaseBeanMap());
		    return sp2BeanMap;
	}

	public static final Map<String, String> getRs2BeanMap() {

		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application			
			rs2BeanMap = new LinkedHashMap<String, String>();

			rs2BeanMap.put("id_customer_complaint_key", "customerComplaintKey");
			rs2BeanMap.put("id_customer_complaint_ver", "customerComplaintVer");
			rs2BeanMap.put("dtt_txn_date", "txnDate");
			rs2BeanMap.put("tx_atm_owner", "atmOwner");
			rs2BeanMap.put("dec_txn_amount", "txnAmount");
			rs2BeanMap.put("tx_account_number", "accountNumber");
			rs2BeanMap.put("tx_card_number", "cardNumber");
			rs2BeanMap.put("tx_atm_location", "atmLocation");
			rs2BeanMap.put("tx_comment", "comment");
			rs2BeanMap.put("tx_data_source", "dataSource");
			rs2BeanMap.put("int_tracking_number", "trackingNumber");
			rs2BeanMap.put("tx_folder_name", "folderName");
			rs2BeanMap.putAll(getRs2BaseBeanMap());
		}

		return rs2BeanMap;
	}

	public Integer getCustomerComplaintKey() {
		return customerComplaintKey;
	}

	public void setCustomerComplaintKey(Integer customerComplaintKey) {
		this.customerComplaintKey = customerComplaintKey;
	}

	public Integer getCustomerComplaintVer() {
		return customerComplaintVer;
	}

	public void setCustomerComplaintVer(Integer customerComplaintVer) {
		this.customerComplaintVer = customerComplaintVer;
	}

	public Date getTxnDate() {
		return txnDate;
	}

	public void setTxnDate(Date txnDate) {
		this.txnDate = txnDate;
	}

	public String getAtmOwner() {
		return atmOwner;
	}

	public void setAtmOwner(String atmOwner) {
		this.atmOwner = atmOwner;
	}

	public Double getTxnAmount() {
		return txnAmount;
	}

	public void setTxnAmount(Double txnAmount) {
		this.txnAmount = txnAmount;
	}

	public String getAccountNumber() {
		return accountNumber;
	}

	public void setAccountNumber(String accountNumber) {
		this.accountNumber = accountNumber;
	}

	public String getCardNumber() {
		return cardNumber;
	}

	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}

	public String getAtmLocation() {
		return atmLocation;
	}

	public void setAtmLocation(String atmLocation) {
		this.atmLocation = atmLocation;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public String getDataSource() {
		return dataSource;
	}

	public void setDataSource(String dataSource) {
		this.dataSource = dataSource;
	}

	public Integer getTrackingNumber() {
		return trackingNumber;
	}

	public void setTrackingNumber(Integer trackingNumber) {
		this.trackingNumber = trackingNumber;
	}

	public String getUiActionName() {
		return uiActionName;
	}

	public void setUiActionName(String uiActionName) {
		this.uiActionName = uiActionName;
	}

	public List<Comment> getCommentList() {
		return commentList;
	}

	public void setCommentList(List<Comment> commentList) {
		this.commentList = commentList;
	}

	public String getFromDate4Src() {
		return fromDate4Src;
	}

	public void setFromDate4Src(String fromDate4Src) {
		this.fromDate4Src = fromDate4Src;
	}

	public String getToDate4Src() {
		return toDate4Src;
	}

	public void setToDate4Src(String toDate4Src) {
		this.toDate4Src = toDate4Src;
	}

	public String getFolderName() {
		return folderName;
	}

	public void setFolderName(String folderName) {
		this.folderName = folderName;
	}

	@Override
	public String toString() {
		return "Complaint [customerComplaintKey=" + customerComplaintKey + ", customerComplaintVer="
				+ customerComplaintVer + ", txnDate=" + txnDate + ", atmOwner=" + atmOwner + ", txnAmount=" + txnAmount
				+ ", accountNumber=" + accountNumber + ", cardNumber=" + cardNumber + ", atmLocation=" + atmLocation
				+ ", comment=" + comment + ", dataSource=" + dataSource + ", trackingNumber=" + trackingNumber + "]";
	}
	
}
