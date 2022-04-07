package com.naztech.nid.model;

import java.util.List;

public class RequestHistoryResponse {
	
	private Header header;
	private List<SearchHistory> payload;

	public Header getHeader() {
		return header;
	}

	public void setHeader(Header header) {
		this.header = header;
	}

	public List<SearchHistory> getPayload() {
		return payload;
	}

	public void setPayload(List<SearchHistory> payload) {
		this.payload = payload;
	}

}
