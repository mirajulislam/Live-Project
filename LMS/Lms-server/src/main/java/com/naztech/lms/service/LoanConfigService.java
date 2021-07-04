package com.naztech.lms.service;

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
import com.naztech.lms.model.LoanConfig;
import com.naztech.lms.model.LoanDocMap;
import com.naztech.lms.model.NConfiguration;

/**
 * @author Imamul Hossain
 * @date Dec 31, 2019
 */
public class LoanConfigService extends AbstractService<LoanConfig> {
	private static Logger log = LogManager.getLogger(LoanConfigService.class);

	@Autowired
	LoanDocMapService loanDocMapService;

	public void init() {
		try {
			log.info("Initializing loan config service");
		}
		catch (Exception e) {
			log.error("Error initializing loan config service {}", e);
		}

	}

	@Override
	@SuppressWarnings("rawtypes")
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		List<LoanConfig> list = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();

			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.SELECT_LOAN_CONFIG.toString())) {
				list = selectLoanConfig(msg, action);
				msgResponse = MessageBuilder.withPayload(list).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_LOAN_PERCENT.toString())) {
				LoanConfig loanConfig = selectLoanPercent(msg, action);
				msgResponse = MessageBuilder.withPayload(loanConfig).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.UPDATE.toString())) {
				list = updateLoanConfig(msg, action);
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

	private List<LoanConfig> updateLoanConfig(Message<List<LoanConfig>> msg, String action) throws Exception {
		LoanConfig loanConfig = msg.getPayload().get(0);

		//Update loan doc map
		if (loanConfig.getLoanDocMapList().size() > 0) {
			loanDocMapService.update(loanConfig.getLoanDocMapList(), action);
		}

		return execute(loanConfig, action);
	}

	private LoanConfig selectLoanPercent(Message<List<LoanConfig>> msg, String action) {
		LoanConfig loanConfig = msg.getPayload().get(0);
		return execute(loanConfig, action).get(0);
	}

	/**
	 * @param actionType
	 * @param msg
	 * @return
	 */
	private List<LoanConfig> selectLoanConfig(Message<List<LoanConfig>> msg, String action) throws Exception {
		LoanConfig loanConfig = msg.getPayload().get(0);
		return execute(loanConfig, action);
	}

	private List<LoanConfig> insert(Message<List<LoanConfig>> msg, String action) throws Exception {
		LoanConfig loanConfig = msg.getPayload().get(0);
		return execute(loanConfig, action);
	}

	private List<LoanConfig> update(Message<List<LoanConfig>> msg, String action) throws Exception {
		LoanConfig loanConfig = msg.getPayload().get(0);
		return execute(loanConfig, action);
	}

	private List<LoanConfig> delete(Message<List<LoanConfig>> msg, String action) throws Exception {
		LoanConfig loanConfig = msg.getPayload().get(0);
		return execute(loanConfig, action);
	}

	private List<LoanConfig> execute(LoanConfig loanConfig, String action) {

		JdbcResult jdbcResult = new JdbcResult();
		List<LoanConfig> loanConfigList = null;

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loanConfig, LoanConfig.getSql2BeanMap());

			if (loanConfig.getUserModKey() == null) {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_LOAN_CONFIG.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP(action, SPName.ACT_LOAN_CONFIG.toString(), spArgsMap, jdbcResult);

			/*
			 * Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			 * 
			 * if (outputMap.get("@id_loan_config_key") != null) {
			 * loanConfig.setLoanConfigId(Integer.parseInt(outputMap.get("@id_loan_config_key").toString()));
			 * }
			 */

			loanConfigList = JdbcUtils.mapRows(LoanConfig.class, LoanConfig.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_CONFIG.toString()));

			if (action.equals(ActionType.SELECT_LOAN_CONFIG.toString()) && loanConfigList.size() > 0) {
				for (LoanConfig lc : loanConfigList) {

					List<LoanDocMap> loanDocMapList = loanDocMapService.selectLoanConfigMap(lc.getLoanConfigId());

					List<LoanDocMap> tmpDocMapList = new ArrayList<LoanDocMap>();

					for (int i = 0; i < loanDocMapList.size(); i++) {
						LoanDocMap ldm = loanDocMapList.get(i);

						if (ldm.getActive() == 1) {
							if ((ldm.getIsDefault() == 0 && ldm.getIsMandatory() == 1) || (ldm.getIsDefault() == 1 && ldm.getIsMandatory() == 0)
							        || (ldm.getIsDefault() == 1 && ldm.getIsMandatory() == 1)) {
								tmpDocMapList.add(ldm);
							}
						}
					}

					lc.setLoanDocMapList(tmpDocMapList);
					loanDocMapList = null;
				}
			}
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
		}

		return loanConfigList;
	}

	/*@Author: Imamul Hossain
	*@Desc: Save loan and customer type mapping 
	*/
	public void saveLoanConfig(NConfiguration config, String action) {
		log.info("Executing action [{}] for loan config [{}]", action, config.getGroup());

		LoanConfig loanConfig = new LoanConfig();

		for (Integer configId : config.getConfigList()) {
			if (config.getGroup().equalsIgnoreCase(Str.STR_LOAN) && config.getSubGroup().equalsIgnoreCase(Str.STR_LOAN_TYPE)) {
				loanConfig.setCustomerTypeId(configId);
				loanConfig.setLoanTypeId(config.getConfigurationId());
				loanConfig.setInterestRate(Double.parseDouble(config.getValue2()));
			}
			else if (config.getGroup().equalsIgnoreCase(Str.STR_CUSTOMER) && config.getSubGroup().equalsIgnoreCase(Str.STR_CUSTOMER_TYPE)) {
				loanConfig.setLoanTypeId(configId);
				loanConfig.setCustomerTypeId(config.getConfigurationId());
				loanConfig.setInterestRate(null);
			}

			//check this config exits
			if (!isLoanConfigExists(loanConfig)) {
				execute(loanConfig, ActionType.NEW.toString());
			}

		}
	}

	private boolean isLoanConfigExists(LoanConfig loanConfig) {
		log.info("Checking config exists or not. CustomerTypeId =>{}/ LoanTypeId =>{}", loanConfig.getCustomerType(), loanConfig.getLoanTypeId());

		loanConfig.setInterestRate(null);

		List<LoanConfig> loanConfigList = execute(loanConfig, ActionType.SELECT_LOAN_CONFIG.toString());

		return loanConfigList.size() > 0 ? true : false;
	}

	/*@Author: Imamul Hossain
	*@Desc: delete loan and customer type mapping 
	*/
	public void delete(NConfiguration config, String action) {

		log.info("Executing action [{}]", action);

		LoanConfig loanConfig = new LoanConfig();

		if (config.getGroup().equalsIgnoreCase(Str.STR_LOAN) && config.getSubGroup().equalsIgnoreCase(Str.STR_LOAN_TYPE)) {
			loanConfig.setLoanTypeId(config.getConfigurationId());
		}
		else if (config.getGroup().equalsIgnoreCase(Str.STR_CUSTOMER) && config.getSubGroup().equalsIgnoreCase(Str.STR_CUSTOMER_TYPE)) {
			loanConfig.setCustomerTypeId(config.getConfigurationId());
		}

		execute(loanConfig, action);
	}

	public List<LoanConfig> selectLoanConfigList(LoanConfig loanConfig, String action) {
		log.info("Fetching loan config list...");
		return execute(loanConfig, action);
	}

}
