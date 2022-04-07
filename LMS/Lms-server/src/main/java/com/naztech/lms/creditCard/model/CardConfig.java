package com.naztech.lms.creditCard.model;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.naztech.lms.model.BaseModel;

public class CardConfig extends BaseModel {

	Integer cardConfigKey;
	Integer cardConfigVer;

	Integer cardTypeKey;
	Integer customerTypeKey;
	Double interestRate;

	String customerType;
	String cardType;
	Double defaultInterestRate;

	List<CardDocMap> cardDocMapList;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_card_config_key", "cardConfigKey");
			sql2BeanMap.put("@id_card_config_ver", "cardConfigVer");

			sql2BeanMap.put("@id_card_type_key", "cardTypeKey");
			sql2BeanMap.put("@id_customer_type_key", "customerTypeKey");
			sql2BeanMap.put("@dec_interest_rate", "interestRate");

			sql2BeanMap.put("@tx_customer_type", "customerType");
			sql2BeanMap.put("@tx_card_type", "cardType");
			sql2BeanMap.put("@dec_default_interest_rate", "defaultInterestRate");
		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_card_config_key", "cardConfigKey");
			rs2BeanMap.put("id_card_config_ver", "cardConfigVer");

			rs2BeanMap.put("id_card_type_key", "cardTypeKey");
			rs2BeanMap.put("id_customer_type_key", "customerTypeKey");
			rs2BeanMap.put("dec_interest_rate", "interestRate");

			rs2BeanMap.put("tx_customer_type", "customerType");
			rs2BeanMap.put("tx_card_type", "cardType");
			rs2BeanMap.put("dec_default_interest_rate", "defaultInterestRate");
		}
		return rs2BeanMap;
	}

	public Integer getCardConfigKey() {
		return cardConfigKey;
	}

	public void setCardConfigKey(Integer cardConfigKey) {
		this.cardConfigKey = cardConfigKey;
	}

	public Integer getCardConfigVer() {
		return cardConfigVer;
	}

	public void setCardConfigVer(Integer cardConfigVer) {
		this.cardConfigVer = cardConfigVer;
	}

	public Integer getCardTypeKey() {
		return cardTypeKey;
	}

	public void setCardTypeKey(Integer cardTypeKey) {
		this.cardTypeKey = cardTypeKey;
	}

	public Integer getCustomerTypeKey() {
		return customerTypeKey;
	}

	public void setCustomerTypeKey(Integer customerTypeKey) {
		this.customerTypeKey = customerTypeKey;
	}

	public Double getInterestRate() {
		return interestRate;
	}

	public void setInterestRate(Double interestRate) {
		this.interestRate = interestRate;
	}

	public String getCustomerType() {
		return customerType;
	}

	public void setCustomerType(String customerType) {
		this.customerType = customerType;
	}

	public String getCardType() {
		return cardType;
	}

	public void setCardType(String cardType) {
		this.cardType = cardType;
	}

	public Double getDefaultInterestRate() {
		return defaultInterestRate;
	}

	public void setDefaultInterestRate(Double defaultInterestRate) {
		this.defaultInterestRate = defaultInterestRate;
	}

	public List<CardDocMap> getCardDocMapList() {
		return cardDocMapList;
	}

	public void setCardDocMapList(List<CardDocMap> cardDocMapList) {
		this.cardDocMapList = cardDocMapList;
	}

}
