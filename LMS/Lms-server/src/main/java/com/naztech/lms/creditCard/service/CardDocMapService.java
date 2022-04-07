package com.naztech.lms.creditCard.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedList;
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
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.RSType;
import com.naztech.lms.constants.SPName;
import com.naztech.lms.constants.Str;
import com.naztech.lms.creditCard.model.CardConfig;
import com.naztech.lms.creditCard.model.CardDocMap;
import com.naztech.lms.model.NConfiguration;
import com.naztech.lms.service.NConfigurationService;

public class CardDocMapService extends AbstractService<CardDocMap> {

	private static Logger log = LogManager.getLogger(CardDocMapService.class);

	public static List<CardDocMap> allCardDocMapList = new LinkedList<>();

	@Autowired
	CardConfigService cardConfigService;

	@Autowired
	NConfigurationService nConfigurationService;

	public void init() {
		try {
			getAllDocMap();
		}
		catch (Exception e) {
			log.error("Exception initializing nostro config service {}", e);
		}

	}

	public List<CardDocMap> getAllDocMap() throws Exception {
		CardDocMap config = new CardDocMap();
		config.setUserModKey(100000);
		allCardDocMapList = action(config, ActionType.SELECT.toString());
		log.info("Total Card Document Mapping Found [{}]", allCardDocMapList.size());

		return allCardDocMapList;
	}

	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {
			msgHeader = msg.getHeader();
			String action = msgHeader.getActionType();
			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.SELECT.toString())) {
				List<CardDocMap> list = select(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.NEW.toString())) {
				List<CardDocMap> list = save(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_DOC_MAP.toString())) {
				List<CardDocMap> list = selectCardDocMap(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DELETE.toString())) {
				List<CardDocMap> list = deleteCardDocMap(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.UPDATE.toString())) {
				List<CardDocMap> list = update(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
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

	private List<CardDocMap> save(Message<List<CardDocMap>> msg, String action) throws Exception {
		CardDocMap cardDocMap = msg.getPayload().get(0);
		return action(cardDocMap, action);
	}

	private List<CardDocMap> select(Message<List<CardDocMap>> msg, String action) throws Exception {
		CardDocMap cardDocMap = msg.getPayload().get(0);
		return action(cardDocMap, action);
	}

	public List<CardDocMap> action(CardDocMap cardDocMap, String action) throws Exception {

		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();
		if (cardDocMap.getUserModKey() == null) {
			spArgsMap.put("@id_user_mod_key", 100000);
		}
		List<CardDocMap> CardDocMapList = null;

		JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_CARD_DOC_MAP.toString());

		JdbcResult jdbcResult = new JdbcResult();
		jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());

		try {
			spArgsMap = JdbcUtils.createSqlMap(cardDocMap, CardDocMap.getSql2BeanMap());

			if (cardDocMap.getUserModKey() == null) {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			jdbcResult = getJdbcService().executeSP(action, null, SPName.ACT_CARD_DOC_MAP.toString(), spArgsMap, jdbcResult);

			CardDocMapList = JdbcUtils.mapRows(CardDocMap.class, CardDocMap.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.CARD_DOC_MAP.toString()));

			// Getting response after saving configuration
			JdbcUtils.populateBean(cardDocMap, CardDocMap.getSql2BeanMap(), jdbcResult.getOutputParamValueMap());

			return CardDocMapList;

		}
		catch (SQLException sqlEx) {
			log.error("error {}, \nMessage *** : {}", sqlEx, sqlEx.getLocalizedMessage());
			throw sqlEx;

		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}

	public List<CardDocMap> action(Message<List<CardDocMap>> msg, String action) throws Exception {
		CardDocMap cardDocMap = msg.getPayload().get(0);
		return action(cardDocMap, action);
	}

	/**
	 * Save/update doc mapping with customer and Card type
	 * 
	 * @param config
	 * @param action
	 */
	public void saveUpdtCardDocMap(NConfiguration config, String action) {
		CardConfig cardConfig = new CardConfig();
		CardDocMap cardDocMap = new CardDocMap();

		try {

			List<CardConfig> cardConfifList = cardConfigService.selectCardConfigList(cardConfig, ActionType.SELECT.toString());

			if (config.getGroup().equalsIgnoreCase(Str.STR_DOCUMENT) && config.getSubGroup().equalsIgnoreCase(Str.STR_DOCUMENT_TYPE)) {

				cardDocMap.setDocId(config.getConfigurationId());
				cardDocMap.setIsMandatory(config.getValue3().equals(Str.STR_TRUE) ? 1 : 0);

				for (CardConfig lc : cardConfifList) {
					cardDocMap.setCardConfigKey(lc.getCardConfigKey());

					if (action.equals(ActionType.UPDATE.toString())) {
						if (!isCardDocMapExists(cardDocMap)) {
							action = ActionType.NEW.toString();
						}
						else {
							cardDocMap.setCardConfigKey(null);
							return;
						}
					}
					action(cardDocMap, action);
				}
			}
			else if ((config.getGroup().equalsIgnoreCase(Str.STR_CREDIT_CARD) && config.getSubGroup().equalsIgnoreCase(Str.STR_CREDIT_CARD_TYPE))
			        || (config.getGroup().equalsIgnoreCase(Str.STR_CUSTOMER) && config.getSubGroup().equalsIgnoreCase(Str.STR_CUSTOMER_TYPE))) {

				config.setGroup(Str.STR_DOCUMENT);
				config.setSubGroup(Str.STR_DOCUMENT_TYPE);

				List<NConfiguration> docList = nConfigurationService.getDocList(config);

				if (docList.size() > 0) {
					for (NConfiguration dl : docList) {
						for (CardConfig lc : cardConfifList) {

							cardDocMap.setDocId(dl.getConfigurationId());
							cardDocMap.setIsMandatory(dl.getValue3().equals(Str.STR_TRUE) ? 1 : 0);
							cardDocMap.setCardConfigKey(lc.getCardConfigKey());

							//Check this map exists or not
							if (!isCardDocMapExists(cardDocMap)) {
								action(cardDocMap, ActionType.NEW.toString());
							}
						}
					}
				}
			}

		}
		catch (Exception e) {

			log.error("Caught Error {} / {}", e.getMessage(), e);
		}
	}

	private boolean isCardDocMapExists(CardDocMap cardDocMap) throws Exception {
		log.info("Checking Card document exists or not.");
		List<CardDocMap> list = action(cardDocMap, ActionType.SELECT.toString());

		return list.size() > 0 ? true : false;
	}

	public List<CardDocMap> selectCardConfigMap(Integer cardConfigKey) throws Exception {
		CardDocMap cardDocMap = new CardDocMap();

		cardDocMap.setCardConfigKey(cardConfigKey);

		return action(cardDocMap, ActionType.SELECT_DOC_MAP.toString());
	}

	private List<CardDocMap> selectCardDocMap(Message<List<CardDocMap>> msg, String action) throws Exception {
		CardDocMap cardDocMap = msg.getPayload().get(0);

		List<CardDocMap> CardDocMapList = action(cardDocMap, ActionType.SELECT_DOC_MAP.toString());
		List<CardDocMap> mappedDocMapList = new ArrayList<CardDocMap>();

		for (int i = 0; i < CardDocMapList.size(); i++) {
			CardDocMap ldm = CardDocMapList.get(i);

			if (ldm.getActive() == 0) {
				mappedDocMapList.add(ldm);
			}
			else if (ldm.getActive() == 1) {
				if ((ldm.getIsDefault() == 0 && ldm.getIsMandatory() == 0)) {
					mappedDocMapList.add(ldm);
				}
			}
		}

		CardDocMapList = null;
		return mappedDocMapList;

	}

	private List<CardDocMap> deleteCardDocMap(Message<List<CardDocMap>> msg, String action) throws Exception {
		log.info("Deleting Card document mapping....");

		CardDocMap cardDocMap = msg.getPayload().get(0);

		return action(cardDocMap, action);

	}

	public void update(List<CardDocMap> CardDocMapList, String action) throws Exception {
		log.info("Updating Card document mapping....");

		for (CardDocMap cardDocMap : CardDocMapList) {
			action(cardDocMap, action);
		}
	}

	private List<CardDocMap> update(Message<List<CardDocMap>> msg, String action) throws Exception {
		log.info("Adding new Card document mapping....");

		CardDocMap cardDocMap = msg.getPayload().get(0);

		if (cardDocMap.getCardDocMapList().size() > 0) {
			for (CardDocMap ldm : cardDocMap.getCardDocMapList()) {
				action(ldm, action);
			}
		}
		return action(cardDocMap, ActionType.SELECT_DOC_MAP.toString());

	}
}
