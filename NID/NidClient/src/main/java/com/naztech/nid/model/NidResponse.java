package com.naztech.nid.model;

public class NidResponse {

	private Header header;
	private NationalId payload;

	public Header getHeader() {
		return header;
	}

	public void setHeader(Header header) {
		this.header = header;
	}

	public NationalId getPayload() {
		return payload;
	}

	public void setPayload(NationalId payload) {
		this.payload = payload;
	}

}
