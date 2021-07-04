package com.naztech.lms.model.xml.res;

import javax.xml.bind.annotation.XmlElement;

public class ResponseHeader {
	@XmlElement
	private RequestMessageKey RequestMessageKey;

	@XmlElement
	private ResponseMessageInfo ResponseMessageInfo;

	private UBUSTransaction UBUSTransaction;

	private HostTransaction HostTransaction;

	private HostParentTransaction HostParentTransaction;

	private String CustomInfo;

	public RequestMessageKey getRequestMessageKey() {
		return RequestMessageKey;
	}

	public void setRequestMessageKey(RequestMessageKey requestMessageKey) {
		RequestMessageKey = requestMessageKey;
	}

	public ResponseMessageInfo getResponseMessageInfo() {
		return ResponseMessageInfo;
	}

	public void setResponseMessageInfo(ResponseMessageInfo responseMessageInfo) {
		ResponseMessageInfo = responseMessageInfo;
	}

	public UBUSTransaction getUBUSTransaction() {
		return UBUSTransaction;
	}

	public void setUBUSTransaction(UBUSTransaction uBUSTransaction) {
		UBUSTransaction = uBUSTransaction;
	}

	public HostTransaction getHostTransaction() {
		return HostTransaction;
	}

	public void setHostTransaction(HostTransaction hostTransaction) {
		HostTransaction = hostTransaction;
	}

	public HostParentTransaction getHostParentTransaction() {
		return HostParentTransaction;
	}

	public void setHostParentTransaction(HostParentTransaction hostParentTransaction) {
		HostParentTransaction = hostParentTransaction;
	}

	public String getCustomInfo() {
		return CustomInfo;
	}

	public void setCustomInfo(String customInfo) {
		CustomInfo = customInfo;
	}

}