package com.naztech.lms.service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageBuilder;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.service.AbstractService;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.model.LegalEntity;

public class LegalEntityService extends AbstractService<LegalEntity> {

	private static Logger log = LoggerFactory.getLogger(LegalEntityService.class);

	private static final String SEL_LEGAL_ENTITY = "SEL_legal_entity";
	private static final String RS_TYPE_LEGAL_ENTITY = "RS_TYPE_LEGAL_ENTITY";
	private static final String RS_TYPE_LEGAL_ENTITY_BIC = "RS_TYPE_LEGAL_ENTITY_BIC";
	private static final String ACT_LEGAL_ENTITY = "ACT_legal_entity";

	private List<LegalEntity> legalEntityList;

	private Object legalEntity;

	@Override
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		LegalEntity legalEntity = null;
		List<LegalEntity> legalEntityList = new ArrayList<LegalEntity>();

		try {
			msgHeader = msg.getHeader();
			legalEntityList = (List<LegalEntity>) msg.getPayload();

			legalEntity = legalEntityList.get(0);

			String actionType = msgHeader.getActionType();

			if (actionType.equals(ActionType.SELECT.toString())) {
				msg = MessageBuilder.withPayload(handleSelect(legalEntity)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (actionType.equals(ActionType.SELECT_ALL.toString())) {
				msg = MessageBuilder.withPayload(handleSelectAll(legalEntity, actionType)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (actionType.equals(ActionType.NEW.toString())) {
				msg = MessageBuilder.withPayload(handleInsert(legalEntity, actionType)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (actionType.equals(ActionType.UPDATE.toString()) || actionType.equals(ActionType.DELETE.toString())) {
				msg = MessageBuilder.withPayload(handleUpdate(legalEntity, actionType)).copyHeadersIfAbsent(msgHeader).build();
			}
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}
		return msg;
	}

	private List<?> handleSelect(LegalEntity legalEntity) throws Exception {

		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>(0);

		JdbcResult jdbcResult = new JdbcResult();
		List<LegalEntity> legalEntityList = null;

		try {
			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SEL_LEGAL_ENTITY);
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(false);

			spArgsMap = JdbcUtils.createSqlMap(legalEntity, LegalEntity.getSp2BeanMap());

			jdbcResult = getJdbcService().executeSP(ActionType.SELECT.toString(), SEL_LEGAL_ENTITY, spArgsMap, jdbcResult);

			legalEntityList = JdbcUtils.mapRows(LegalEntity.class, LegalEntity.getRs2BeanMap(), jdbcResult.getRsTypeMap(RS_TYPE_LEGAL_ENTITY));

		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return legalEntityList;
	}

	private List<?> handleSelectAll(LegalEntity legalEntity, String action) throws Exception {

		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>(0);

		JdbcResult jdbcResult = new JdbcResult();
		List<LegalEntity> legalEntityList = null;

		try {
			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SEL_LEGAL_ENTITY);
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(false);

			spArgsMap = JdbcUtils.createSqlMap(legalEntity, LegalEntity.getSp2BeanMap());

			jdbcResult = getJdbcService().executeSP(action, SEL_LEGAL_ENTITY, spArgsMap, jdbcResult);

			legalEntityList = JdbcUtils.mapRows(LegalEntity.class, LegalEntity.getRs2BeanMap(), jdbcResult.getRsTypeMap(RS_TYPE_LEGAL_ENTITY));

		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return legalEntityList;
	}

	private LegalEntity handleInsert(LegalEntity legalEntity, String action) throws Exception {
		log.debug("executing...{}", action);

		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();

		JdbcResult jdbcResult = new JdbcResult();

		try {
			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(null, ACT_LEGAL_ENTITY);
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(false);
			spArgsMap = JdbcUtils.createSqlMap(legalEntity, legalEntity.getSp2BeanMap());

			spArgsMap.put("@id_user_mod_key", legalEntity.getUserIdModified());

			jdbcResult = getJdbcService().executeSP("NEW", ACT_LEGAL_ENTITY, spArgsMap, jdbcResult);

			legalEntityList = JdbcUtils.mapRows(LegalEntity.class, LegalEntity.getRs2BeanMap(), jdbcResult.getRsTypeMap(RS_TYPE_LEGAL_ENTITY));
			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			legalEntity.setId(Integer.parseInt(outputMap.get("@id_legal_entity_key").toString()));
			legalEntity.setVersion(Integer.parseInt(outputMap.get("@id_legal_entity_ver").toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return legalEntity;
	}

	private LegalEntity handleUpdate(LegalEntity legalEntity, String action) throws Exception {
		log.debug("executing...{}", action);

		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();

		JdbcResult jdbcResult = new JdbcResult();

		try {
			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(null, ACT_LEGAL_ENTITY);
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(false);
			spArgsMap = JdbcUtils.createSqlMap(legalEntity, legalEntity.getSp2BeanMap());

			spArgsMap.put("@id_user_mod_key", legalEntity.getUserIdModified());

			if (action.equals(ActionType.DELETE.toString())) {
				spArgsMap.put("@is_active", 0);
			}

			jdbcResult = getJdbcService().executeSP(ActionType.UPDATE.toString(), ACT_LEGAL_ENTITY, spArgsMap, jdbcResult);

			legalEntityList = JdbcUtils.mapRows(com.naztech.lms.model.LegalEntity.class, LegalEntity.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RS_TYPE_LEGAL_ENTITY));

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			legalEntity.setId(Integer.parseInt(outputMap.get("@id_legal_entity_key").toString()));
			legalEntity.setVersion(Integer.parseInt(outputMap.get("@id_legal_entity_ver").toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return legalEntity;
	}
}
