package com.naztech.lms.creditCard.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;

import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageBuilder;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.service.AbstractService;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.RSType;
import com.naztech.lms.constants.SPName;
import com.naztech.lms.constants.Str;
import com.naztech.lms.creditCard.model.CardConfig;
import com.naztech.lms.creditCard.model.CardDocMap;
import com.naztech.lms.model.NConfiguration;

public class CardConfigService extends AbstractService<CardConfig> {
	private static Logger log = LogManager.getLogger(CardConfigService.class);

	@Autowired
	CardDocMapService cardDocMapService;

	public void init() {
		try {
			log.info("Initializing card config service");
		}
		catch (Exception e) {
			log.error("Error initializing card config service {}", e);
		}

	}

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		List<CardConfig> list = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();

			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.SELECT_CARD_CONFIG.toString())) {
				list = selectCardConfig(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.UPDATE.toString())) {
				list = updateCardConfig(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
			}else if(action.equals(ActionType.SELECT_CARD_PERCENT.toString())) {
				CardConfig cardConfig = selectCardPercent(msg,action);
				msgResponse = MessageBuilder.withPayload(cardConfig).copyHeadersIfAbsent(msgHeader).build();
			}
			else {
				throw new Exception("Unknown action " + action);
			}
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}

		return msgResponse;
	}

	private List<CardConfig> updateCardConfig(Message<List<CardConfig>> msg, String action) throws Exception {
		CardConfig cardConfig = msg.getPayload().get(0);

		//Update card doc map
		if (cardConfig.getCardDocMapList().size() > 0) {
			cardDocMapService.update(cardConfig.getCardDocMapList(), action);
		}

		return execute(cardConfig, action);
	}

	/**
	 * @param actionType
	 * @param msg
	 * @return
	 */
	private List<CardConfig> selectCardConfig(Message<List<CardConfig>> msg, String action) throws Exception {
		CardConfig cardConfig = msg.getPayload().get(0);
		return execute(cardConfig, action);
	}

	@SuppressWarnings("unused")
	private List<CardConfig> insert(Message<List<CardConfig>> msg, String action) throws Exception {
		CardConfig cardConfig = msg.getPayload().get(0);
		return execute(cardConfig, action);
	}

	@SuppressWarnings("unused")
	private List<CardConfig> update(Message<List<CardConfig>> msg, String action) throws Exception {
		CardConfig cardConfig = msg.getPayload().get(0);
		return execute(cardConfig, action);
	}

	@SuppressWarnings("unused")
	private List<CardConfig> delete(Message<List<CardConfig>> msg, String action) throws Exception {
		CardConfig cardConfig = msg.getPayload().get(0);
		return execute(cardConfig, action);
	}

	private List<CardConfig> execute(CardConfig cardConfig, String action) {

		JdbcResult jdbcResult = new JdbcResult();
		List<CardConfig> cardConfigList = null;

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(cardConfig, CardConfig.getSql2BeanMap());

			if (cardConfig.getUserModKey() == null) {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_CARD_CONFIG.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP(action, SPName.ACT_CARD_CONFIG.toString(), spArgsMap, jdbcResult);

			cardConfigList = JdbcUtils.mapRows(CardConfig.class, CardConfig.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_CARD_CONFIG.toString()));

			if (action.equals(ActionType.SELECT_CARD_CONFIG.toString()) && cardConfigList.size() > 0) {
				for (CardConfig lc : cardConfigList) {

					List<CardDocMap> cardDocMapList = cardDocMapService.selectCardConfigMap(lc.getCardConfigKey());

					List<CardDocMap> tmpDocMapList = new ArrayList<CardDocMap>();

					for (int i = 0; i < cardDocMapList.size(); i++) {
						CardDocMap ldm = cardDocMapList.get(i);

						if (ldm.getActive() == 1) {
							if ((ldm.getIsDefault() == 0 && ldm.getIsMandatory() == 1) || (ldm.getIsDefault() == 1 && ldm.getIsMandatory() == 0)
							        || (ldm.getIsDefault() == 1 && ldm.getIsMandatory() == 1)) {
								tmpDocMapList.add(ldm);
							}
						}
					}

					lc.setCardDocMapList(tmpDocMapList);
					cardDocMapList = null;
				}
			}
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
		}

		return cardConfigList;
	}

	/**
	 * Save card and customer type mapping
	 * 
	 * @param config
	 * @param action
	 */
	public void savecardConfig(NConfiguration config, String action) {
		log.info("Executing action [{}] for card config [{}]", action, config.getGroup());

		CardConfig cardConfig = new CardConfig();

		for (Integer configId : config.getConfigList()) {
			if (config.getGroup().equalsIgnoreCase(Str.STR_CREDIT_CARD) && config.getSubGroup().equalsIgnoreCase(Str.STR_CREDIT_CARD_TYPE)) {
				cardConfig.setCustomerTypeKey(configId);
				cardConfig.setCardTypeKey(config.getConfigurationId());
				cardConfig.setInterestRate(Double.parseDouble(config.getValue2()));
			}
			else if (config.getGroup().equalsIgnoreCase(Str.STR_CUSTOMER) && config.getSubGroup().equalsIgnoreCase(Str.STR_CUSTOMER_TYPE)) {
				cardConfig.setCardTypeKey(configId);
				cardConfig.setCustomerTypeKey(config.getConfigurationId());
				cardConfig.setInterestRate(null);
			}

			//check this config exits
			if (!iscardConfigExists(cardConfig)) {
				execute(cardConfig, ActionType.NEW.toString());
			}

		}
	}

	private boolean iscardConfigExists(CardConfig cardConfig) {
		log.info("Checking config exists or not. CustomerTypeId =>{}/ cardTypeId =>{}", cardConfig.getCustomerType(), cardConfig.getCardTypeKey());

		cardConfig.setInterestRate(null);

		List<CardConfig> cardConfigList = execute(cardConfig, ActionType.SELECT_CARD_CONFIG.toString());

		return cardConfigList.size() > 0 ? true : false;
	}

	/**
	 * delete card and customer type mapping
	 * 
	 * @param config
	 * @param action
	 */
	public void delete(NConfiguration config, String action) {

		log.info("Executing action [{}]", action);

		CardConfig cardConfig = new CardConfig();

		if (config.getGroup().equalsIgnoreCase(Str.STR_CREDIT_CARD) && config.getSubGroup().equalsIgnoreCase(Str.STR_CREDIT_CARD_TYPE)) {
			cardConfig.setCardTypeKey(config.getConfigurationId());
		}
		else if (config.getGroup().equalsIgnoreCase(Str.STR_CUSTOMER) && config.getSubGroup().equalsIgnoreCase(Str.STR_CUSTOMER_TYPE)) {
			cardConfig.setCustomerTypeKey(config.getConfigurationId());
		}

		execute(cardConfig, action);
	}

	public List<CardConfig> selectCardConfigList(CardConfig cardConfig, String action) {
		log.info("Fetching card config list...");
		return execute(cardConfig, action);
	}
	
	private CardConfig selectCardPercent(Message<List<CardConfig>> msg, String action) {
		CardConfig cardConfig = msg.getPayload().get(0);
		return execute(cardConfig, action).get(0);
	}

}
