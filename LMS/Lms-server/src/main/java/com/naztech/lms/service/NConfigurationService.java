package com.naztech.lms.service;

import java.sql.SQLException;
import java.text.SimpleDateFormat;
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
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.RSType;
import com.naztech.lms.constants.SPName;
import com.naztech.lms.model.NConfiguration;

/**
 * @author Md. Kamruzzaman
 * @since 2019-12-29
 */
public class NConfigurationService extends AbstractService<NConfiguration> {

	private static Logger log = LogManager.getLogger(NConfigurationService.class);

	@Autowired
	LoanConfigService loanConfigService;

	@Autowired
	LoanDocMapService loanDocMapService;

	private static final SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
	private static final String falseValue = "0";

	public static List<NConfiguration> configListOnInit = new LinkedList<>();;

	public static Map<String, String> textValueMap = new LinkedHashMap<>();

	public void init() {
		try {
			configServiceOnInit();
			initializeTextValueMap();
		}
		catch (Exception e) {
			log.error("Exception initializing nostro config service {}", e);
		}

	}

	public void configServiceOnInit() throws Exception {
		NConfiguration config = new NConfiguration();
		config.setUserModKey(100000);
		configListOnInit = action(config, ActionType.SELECT.toString());
		log.info("Total NConfig Found [{}]", configListOnInit.size());
	}

	public void initializeTextValueMap() {
		textValueMap.put("MARID", "MARRIED");
		textValueMap.put("MARRIED", "MARRIED");
		textValueMap.put("UNMARID", "UNMARRIED");
		textValueMap.put("UNMARRIED", "UNMARRIED");
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
				List<NConfiguration> preference = select(msg, action);
				msgResponse = MessageBuilder.withPayload(preference).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SAVE.toString()) || action.equals(ActionType.UPDATE.toString())) {
				List<NConfiguration> preference = save(msg, action);
				msgResponse = MessageBuilder.withPayload(preference).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DELETE.toString())) {
				List<NConfiguration> preference = delete(msg, action);
				msgResponse = MessageBuilder.withPayload(preference).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.REFETCH_N_CONFIGURATION.toString())) {
				msgResponse = MessageBuilder.withPayload(doRefreshNConfiguration()).copyHeadersIfAbsent(msgHeader).build();
			}
			else {
				throw new Exception("Unknow action " + action);
			}
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}

		return msgResponse;
	}

	/**
	 * @param msg
	 * @param action
	 * @return
	 */
	private List<NConfiguration> delete(Message<List<NConfiguration>> msg, String action) throws Exception {
		NConfiguration config = msg.getPayload().get(0);

		//Delete mapping
		loanConfigService.delete(config, action);

		return action(config, action);
	}

	/**
	 * @param msg
	 * @param action
	 * @return
	 */
	private List<NConfiguration> save(Message<List<NConfiguration>> msg, String action) throws Exception {
		NConfiguration config = msg.getPayload().get(0);

		if (action.equals(ActionType.SAVE.toString())) {
			action = ActionType.NEW.toString();
		}

		Integer tmpConfigId = config.getConfigurationId();

		action(config, action);

		if (action.equalsIgnoreCase(ActionType.NEW.toString())) {
			tmpConfigId = config.getConfigurationId();
		}

		config.setConfigurationId(tmpConfigId);

		//Save loan config after getting immediate inserted configuration id from T_CONFIGURATION
		if (config.getConfigList() != null) {
			loanConfigService.saveLoanConfig(config, action);
		}

		//Save doc mapping with customer and loan type
		loanDocMapService.saveUpdtLoanDocMap(config, action);

		//configServiceOnInit();
		//return configListOnInit;
		config.setConfigurationId(null);
		config.setConfigurationVer(null);
		return select(config, ActionType.SELECT.toString());
	}

	/**
	 * @return
	 */
	private List<NConfiguration> select(NConfiguration config, String action) throws Exception {

		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();

		List<NConfiguration> nostroConfigList = null;

		JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_configuration.toString());

		JdbcResult jdbcResult = new JdbcResult();
		jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());

		try {
			spArgsMap = JdbcUtils.createSqlMap(config, NConfiguration.getSql2BeanMap());

			jdbcResult = getJdbcService().executeSP(action, null, SPName.ACT_configuration.toString(), spArgsMap, jdbcResult);

			nostroConfigList = JdbcUtils.mapRows(NConfiguration.class, NConfiguration.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CONFIGURATION.toString()));

			return nostroConfigList;

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

	private List<NConfiguration> select(Message<List<NConfiguration>> msg, String action) throws Exception {
		NConfiguration config = msg.getPayload().get(0);
		return select(config, action);
	}

	public List<NConfiguration> action(NConfiguration nostroConfig, String action) throws Exception {

		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();

		List<NConfiguration> nostroConfigList = null;

		JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_configuration.toString());

		JdbcResult jdbcResult = new JdbcResult();
		jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());

		try {
			spArgsMap = JdbcUtils.createSqlMap(nostroConfig, NConfiguration.getSql2BeanMap());

			jdbcResult = getJdbcService().executeSP(action, null, SPName.ACT_configuration.toString(), spArgsMap, jdbcResult);

			nostroConfigList = JdbcUtils.mapRows(NConfiguration.class, NConfiguration.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CONFIGURATION.toString()));

			// Getting response after saving configuration
			JdbcUtils.populateBean(nostroConfig, NConfiguration.getSql2BeanMap(), jdbcResult.getOutputParamValueMap());

			return nostroConfigList;

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

	public List<NConfiguration> action(Message<List<NConfiguration>> msg, String action) throws Exception {
		NConfiguration config = msg.getPayload().get(0);
		return action(config, action);
	}

	public List<NConfiguration> select(NConfiguration nConfig) throws Exception {
		return select(nConfig, ActionType.SELECT.toString());
	}

	public NConfiguration insert(NConfiguration nConfig) throws Exception {
		return doInsert(nConfig);
	}

	private NConfiguration doInsert(NConfiguration nConfig) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(nConfig, NConfiguration.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_configuration.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP(ActionType.NEW.toString(), SPName.ACT_configuration.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_configuration_key") != null) {
				nConfig.setConfigurationId(Integer.parseInt(outputMap.get("@id_configuration_key").toString()));
			}
			if (outputMap.get("@id_configuration_ver") != null) {
				nConfig.setConfigurationVer(Integer.parseInt(outputMap.get("@id_configuration_ver").toString()));
			}
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return nConfig;
	}

	public boolean doRefreshNConfiguration() {
		try {
			init();
			return true;
		}
		catch (Exception e) {
			log.error("Exception Refreshing Preference [{}]", e);
			return false;
		}
	}

	public List<NConfiguration> getDocList(NConfiguration config) throws Exception {
		log.info("Fetching the document list....");

		config.setConfigurationVer(null);
		config.setConfigurationId(null);
		config.setDttMod(null);
		config.setValue1(null);
		config.setValue2(null);

		return action(config, ActionType.SELECT.toString());
	}
}
