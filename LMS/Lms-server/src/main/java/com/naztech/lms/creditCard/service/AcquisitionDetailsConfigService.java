package com.naztech.lms.creditCard.service;

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
import com.naztech.lms.creditCard.model.AcquisitionDetailsConfig;
import com.naztech.lms.utils.DbExecutor;
/**
 * @author Mirajul.islam
 */
public class AcquisitionDetailsConfigService extends AbstractService<AcquisitionDetailsConfig>{
	private static Logger log = LogManager.getLogger(AcquisitionDetailsConfigService.class);
	@Autowired
	JdbcService jdbcService;
	
	@Override
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();
			log.debug("Processing ACTION [{}]", action);
			
			if (action.equals(ActionType.NEW.toString())) {
				List<AcquisitionDetailsConfig> acquisitionDetailsConfig = insert(msg, action);
				msgResponse = MessageBuilder.withPayload(acquisitionDetailsConfig).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.UPDATE.toString())) {
				List<AcquisitionDetailsConfig> acquisitionDetailsConfig = update(msg, action);
				msgResponse = MessageBuilder.withPayload(acquisitionDetailsConfig).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.DELETE.toString())) {
				msgResponse = MessageBuilder.withPayload(delete(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}else {
				throw new Exception("Unknown action " + action);
			}
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}

		return msgResponse;
	}
	
	private List<AcquisitionDetailsConfig> update(Message<List<AcquisitionDetailsConfig>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	private List<AcquisitionDetailsConfig> insert(Message<List<AcquisitionDetailsConfig>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	private List<AcquisitionDetailsConfig> select(Message<List<AcquisitionDetailsConfig>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	private List<AcquisitionDetailsConfig> delete(Message<List<AcquisitionDetailsConfig>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	private List<AcquisitionDetailsConfig> selectAllQuery(Message<List<AcquisitionDetailsConfig>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	private List<AcquisitionDetailsConfig> execute(Message<List<AcquisitionDetailsConfig>> msg, String action) throws Exception {
		AcquisitionDetailsConfig obj = msg.getPayload().get(0);
		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_acquisition_details_config.toString(), action, JdbcService.createSqlMap(obj, AcquisitionDetailsConfig.getSql2BeanMap()),
		        getJdbcService());
		jdbcResult = selectSingle(obj, ActionType.SELECT.toString(), SPName.ACT_acquisition_details_config.toString());
		
		List<AcquisitionDetailsConfig> objList = JdbcUtils.mapRows(AcquisitionDetailsConfig.class, AcquisitionDetailsConfig.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_ACQUISITION_DETAILS_CONFIG.toString()));
		return objList;
	}
	
	private JdbcResult selectSingle(AcquisitionDetailsConfig acquisitionCon, String action, String sp) throws Exception {
		try {
			JdbcResult jdbcResult = new JdbcResult();
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(acquisitionCon, AcquisitionDetailsConfig.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(sp);
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);
			return jdbcService.executeSP(action, sp, spArgsMap, jdbcResult);
		}
		catch (Exception e) {
			log.error("Exception getting card [{}]", e);
			throw e;
		}
	}


	public void insert(AcquisitionDetailsConfig cmnt) {
		execute(cmnt, ActionType.NEW.toString());
	}

	public void update(AcquisitionDetailsConfig cmnt) {
		execute(cmnt, ActionType.UPDATE.toString());
	}

	public AcquisitionDetailsConfig insert(Message<List<AcquisitionDetailsConfig>> msg) {
		return execute(msg.getPayload().get(0), ActionType.NEW.toString());
	}

	private AcquisitionDetailsConfig execute(AcquisitionDetailsConfig cmnt, String action) {

		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_acquisition_details_config.toString(), action,
			        JdbcService.createSqlMap(cmnt, AcquisitionDetailsConfig.getSql2BeanMap()), getJdbcService());

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_acquisition_details_config_id") != null) {
				cmnt.setAcquisitionDetailsConfigId(Integer.parseInt(outputMap.get("@id_acquisition_details_config_id").toString()));
			}
		}
		catch (Exception e) {
			log.error("Error inserting AcquisitionDetailsConfig, [{}] \n [{}]", cmnt.toString(), e);
		}

		return cmnt;
	}
}
