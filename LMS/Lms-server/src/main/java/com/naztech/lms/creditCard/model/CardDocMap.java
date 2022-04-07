package com.naztech.lms.creditCard.model;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import com.naztech.lms.model.BaseModel;

public class CardDocMap extends BaseModel {

	Integer cardDocMapKey;
	Integer cardDocMapVer;

	Integer cardConfigKey;
	Integer docId;
	Integer isMandatory;
	Integer isMandatoryForAllCards;
	Integer isDefault;

	String docType;

	private List<CardDocMap> cardDocMapList;

	private static Map<String, String> sql2BeanMap = null;
	private static Map<String, String> rs2BeanMap = null;

	public static Map<String, String> getSql2BeanMap() {
		if (sql2BeanMap == null) {
			sql2BeanMap = new LinkedHashMap<String, String>();
			// Follow this pattern all over the application
			sql2BeanMap.putAll(getSql2BaseBeanMap());

			sql2BeanMap.put("@id_card_doc_map_key", "cardDocMapKey");
			sql2BeanMap.put("@id_card_doc_map_ver", "cardDocMapVer");

			sql2BeanMap.put("@id_card_config_key", "cardConfigKey");
			sql2BeanMap.put("@id_doc_key", "docId");
			sql2BeanMap.put("@is_mandatory", "isMandatory");
			sql2BeanMap.put("@is_mandatory_for_all_card", "isMandatoryForAllCards");

			sql2BeanMap.put("@is_deafult", "isDefault");
			sql2BeanMap.put("@tx_doc_type", "docType");

		}
		return sql2BeanMap;
	}

	public static Map<String, String> getRs2BeanMap() {
		if (rs2BeanMap == null) {
			rs2BeanMap = new LinkedHashMap<String, String>();

			rs2BeanMap.putAll(getRs2BaseBeanMap());

			rs2BeanMap.put("id_card_doc_map_key", "cardDocMapKey");
			rs2BeanMap.put("id_card_doc_map_ver", "cardDocMapVer");

			rs2BeanMap.put("id_card_config_key", "cardConfigKey");
			rs2BeanMap.put("id_doc_key", "docId");
			rs2BeanMap.put("is_mandatory", "isMandatory");
			rs2BeanMap.put("is_mandatory_for_all_cards", "isMandatoryForAllCards");

			rs2BeanMap.put("is_deafult", "isDefault");
			rs2BeanMap.put("tx_doc_type", "docType");

		}
		return rs2BeanMap;
	}

	public Integer getCardDocMapKey() {
		return cardDocMapKey;
	}

	public void setCardDocMapKey(Integer cardDocMapKey) {
		this.cardDocMapKey = cardDocMapKey;
	}

	public Integer getCardDocMapVer() {
		return cardDocMapVer;
	}

	public void setCardDocMapVer(Integer cardDocMapVer) {
		this.cardDocMapVer = cardDocMapVer;
	}

	public Integer getCardConfigKey() {
		return cardConfigKey;
	}

	public void setCardConfigKey(Integer cardConfigKey) {
		this.cardConfigKey = cardConfigKey;
	}

	public Integer getDocId() {
		return docId;
	}

	public void setDocId(Integer docId) {
		this.docId = docId;
	}

	public Integer getIsMandatory() {
		return isMandatory;
	}

	public void setIsMandatory(Integer isMandatory) {
		this.isMandatory = isMandatory;
	}	

	public Integer getIsMandatoryForAllCards() {
		return isMandatoryForAllCards;
	}

	public void setIsMandatoryForAllCards(Integer isMandatoryForAllCards) {
		this.isMandatoryForAllCards = isMandatoryForAllCards;
	}

	public Integer getIsDefault() {
		return isDefault;
	}

	public void setIsDefault(Integer isDefault) {
		this.isDefault = isDefault;
	}

	public String getDocType() {
		return docType;
	}

	public void setDocType(String docType) {
		this.docType = docType;
	}

	public List<CardDocMap> getCardDocMapList() {
		return cardDocMapList;
	}

	public void setCardDocMapList(List<CardDocMap> cardDocMapList) {
		this.cardDocMapList = cardDocMapList;
	}

}
