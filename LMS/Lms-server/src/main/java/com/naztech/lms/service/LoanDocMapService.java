package com.naztech.lms.service;

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
import com.naztech.lms.model.LoanConfig;
import com.naztech.lms.model.LoanDocMap;
import com.naztech.lms.model.NConfiguration;

/**
 * @author Imamul Hossain
 * @since Jan 14, 2020
 */
public class LoanDocMapService extends AbstractService<LoanDocMap> {

	private static Logger log = LogManager.getLogger(LoanDocMapService.class);

	public static List<LoanDocMap> allLoanDocMapList = new LinkedList<>();

	@Autowired
	LoanConfigService loanConfigService;

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

	public List<LoanDocMap> getAllDocMap() throws Exception {
		LoanDocMap config = new LoanDocMap();
		config.setUserModKey(100000);
		allLoanDocMapList = action(config, ActionType.SELECT.toString());
		log.info("Total Loan Document Mapping Found [{}]", allLoanDocMapList.size());

		return allLoanDocMapList;
	}

	@Override
	@SuppressWarnings("rawtypes")
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {
			msgHeader = msg.getHeader();
			String action = msgHeader.getActionType();
			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.SELECT.toString())) {
				List<LoanDocMap> list = select(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.NEW.toString())) {
				List<LoanDocMap> list = save(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_DOC_MAP.toString())) {
				List<LoanDocMap> list = selectLoanDocMap(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DELETE.toString())) {
				List<LoanDocMap> list = deleteLoanDocMap(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.UPDATE.toString())) {
				List<LoanDocMap> list = update(msg, action);
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

	private List<LoanDocMap> save(Message<List<LoanDocMap>> msg, String action) throws Exception {
		LoanDocMap loanDocMap = msg.getPayload().get(0);
		return action(loanDocMap, action);
	}

	private List<LoanDocMap> select(Message<List<LoanDocMap>> msg, String action) throws Exception {
		LoanDocMap loanDocMap = msg.getPayload().get(0);
		return action(loanDocMap, action);
	}

	public List<LoanDocMap> action(LoanDocMap loanDocMap, String action) throws Exception {

		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();

		List<LoanDocMap> loanDocMapList = null;

		JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_LOAN_DOC_MAP.toString());

		JdbcResult jdbcResult = new JdbcResult();
		jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());

		try {
			spArgsMap = JdbcUtils.createSqlMap(loanDocMap, LoanDocMap.getSql2BeanMap());

			if (loanDocMap.getUserModKey() == null) {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			jdbcResult = getJdbcService().executeSP(action, null, SPName.ACT_LOAN_DOC_MAP.toString(), spArgsMap, jdbcResult);

			loanDocMapList = JdbcUtils.mapRows(LoanDocMap.class, LoanDocMap.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_DOC_MAP.toString()));

			// Getting response after saving configuration
			JdbcUtils.populateBean(loanDocMap, LoanDocMap.getSql2BeanMap(), jdbcResult.getOutputParamValueMap());

			return loanDocMapList;

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

	public List<LoanDocMap> action(Message<List<LoanDocMap>> msg, String action) throws Exception {
		LoanDocMap loanDocMap = msg.getPayload().get(0);
		return action(loanDocMap, action);
	}

	/*@Author: Imamul Hossain
	*@Desc: Save/update doc mapping with customer and loan type
	*/
	public void saveUpdtLoanDocMap(NConfiguration config, String action) {
		LoanConfig loanConfig = new LoanConfig();
		LoanDocMap loanDocMap = new LoanDocMap();

		try {

			List<LoanConfig> loanConfifList = loanConfigService.selectLoanConfigList(loanConfig, ActionType.SELECT.toString());

			if (config.getGroup().equalsIgnoreCase(Str.STR_DOCUMENT) && config.getSubGroup().equalsIgnoreCase(Str.STR_DOCUMENT_TYPE)) {

				loanDocMap.setDocId(config.getConfigurationId());
				loanDocMap.setIsMandatory(config.getValue3().equals(Str.STR_TRUE) ? 1 : 0);

				for (LoanConfig lc : loanConfifList) {
					loanDocMap.setLoanConfigId(lc.getLoanConfigId());

					if (action.equals(ActionType.UPDATE.toString())) {
						if (!isLoanDocMapExists(loanDocMap)) {
							action = ActionType.NEW.toString();
						}
						else {
							loanDocMap.setLoanConfigId(null);
							return;
						}
					}
					action(loanDocMap, action);
				}
			}
			else if ((config.getGroup().equalsIgnoreCase(Str.STR_LOAN) && config.getSubGroup().equalsIgnoreCase(Str.STR_LOAN_TYPE))
			        || (config.getGroup().equalsIgnoreCase(Str.STR_CUSTOMER) && config.getSubGroup().equalsIgnoreCase(Str.STR_CUSTOMER_TYPE))) {

				config.setGroup(Str.STR_DOCUMENT);
				config.setSubGroup(Str.STR_DOCUMENT_TYPE);

				List<NConfiguration> docList = nConfigurationService.getDocList(config);

				if (docList.size() > 0) {
					for (NConfiguration dl : docList) {
						for (LoanConfig lc : loanConfifList) {

							loanDocMap.setDocId(dl.getConfigurationId());
							loanDocMap.setIsMandatory(dl.getValue3().equals(Str.STR_TRUE) ? 1 : 0);
							loanDocMap.setLoanConfigId(lc.getLoanConfigId());

							//Check this map exists or not
							if (!isLoanDocMapExists(loanDocMap)) {
								action(loanDocMap, ActionType.NEW.toString());
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

	/*@Author: Imamul Hossain
	*@Desc:Check doc and loan mapping exists
	*/
	private boolean isLoanDocMapExists(LoanDocMap loanDocMap) throws Exception {
		log.info("Checking loan document exists or not.");
		List<LoanDocMap> list = action(loanDocMap, ActionType.SELECT.toString());

		return list.size() > 0 ? true : false;

	}

	public List<LoanDocMap> selectLoanConfigMap(Integer loanConfigId) throws Exception {
		LoanDocMap loanDocMap = new LoanDocMap();

		loanDocMap.setLoanConfigId(loanConfigId);

		return action(loanDocMap, ActionType.SELECT_DOC_MAP.toString());
	}

	private List<LoanDocMap> selectLoanDocMap(Message<List<LoanDocMap>> msg, String action) throws Exception {
		LoanDocMap loanDocMap = msg.getPayload().get(0);

		List<LoanDocMap> loanDocMapList = action(loanDocMap, ActionType.SELECT_DOC_MAP.toString());
		List<LoanDocMap> mappedDocMapList = new ArrayList<LoanDocMap>();

		for (int i = 0; i < loanDocMapList.size(); i++) {
			LoanDocMap ldm = loanDocMapList.get(i);

			if (ldm.getActive() == 0) {
				mappedDocMapList.add(ldm);
			}
			else if (ldm.getActive() == 1) {
				if ((ldm.getIsDefault() == 0 && ldm.getIsMandatory() == 0)) {
					mappedDocMapList.add(ldm);
				}
			}
		}

		loanDocMapList = null;
		return mappedDocMapList;

	}

	private List<LoanDocMap> deleteLoanDocMap(Message<List<LoanDocMap>> msg, String action) throws Exception {
		log.info("Deleting loan document mapping....");

		LoanDocMap loanDocMap = msg.getPayload().get(0);

		return action(loanDocMap, action);

	}

	public void update(List<LoanDocMap> loanDocMapList, String action) throws Exception {
		log.info("Updating loan document mapping....");

		for (LoanDocMap loanDocMap : loanDocMapList) {
			action(loanDocMap, action);
		}
	}

	private List<LoanDocMap> update(Message<List<LoanDocMap>> msg, String action) throws Exception {
		log.info("Adding new loan document mapping....");

		LoanDocMap loanDocMap = msg.getPayload().get(0);

		if (loanDocMap.getLoanDocMapList().size() > 0) {
			for (LoanDocMap ldm : loanDocMap.getLoanDocMapList()) {
				action(ldm, action);
			}
		}
		return action(loanDocMap, ActionType.SELECT_DOC_MAP.toString());

	}
}
