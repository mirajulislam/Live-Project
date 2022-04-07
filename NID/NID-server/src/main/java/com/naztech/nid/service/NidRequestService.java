package com.naztech.nid.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageBuilder;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.service.AbstractService;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.nid.constants.ActionType;
import com.naztech.nid.constants.RSType;
import com.naztech.nid.constants.SPName;
import com.naztech.nid.model.NationalId;
import com.naztech.nid.model.NidRequest;

/**
 * @author md.kamruzzaman
 */
public class NidRequestService extends AbstractService<List<NidRequest>> {
	private static Logger log = LoggerFactory.getLogger(NidRequestService.class);

	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;

		NidRequest nid;
		List<NidRequest> objList = new ArrayList<NidRequest>();

		// change action name as needed
		try {
			msgHeader = msg.getHeader();

			objList = (List<NidRequest>) msg.getPayload();

			nid = objList.get(0);

			String actionType = msgHeader.getActionType();

			if (actionType.equals(ActionType.SELECT.toString())) {
				objList = select(nid, actionType);
				msg = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (actionType.equals(ActionType.NEW.toString())) {
				objList = insert(nid, actionType);
				msg = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (actionType.equals(ActionType.UPDATE.toString())) {
				objList = update(nid, actionType);
				msg = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
			}
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}
		return msg;
	}

	private List<NidRequest> select(NidRequest req, String actionType) throws Exception {
		return execute(req, actionType);
	}

	private List<NidRequest> insert(NidRequest req, String actionType) throws Exception {
		return execute(req, actionType);
	}

	private List<NidRequest> update(NidRequest req, String actionType) throws Exception {
		return execute(req, actionType);
	}

	/**
	 * If <b>req.getNidRequestId()</b> present then update the update else insert new
	 * 
	 * @param req
	 * @return
	 * @throws Exception
	 */
	public NidRequest save(NidRequest req) throws Exception {
		return req.getNidRequestId() == null ? save(req, ActionType.NEW.toString()) : save(req, ActionType.UPDATE.toString());
	}

	private NidRequest save(NidRequest obj, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();
		NidRequest nidRequest = new NidRequest();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(obj, NidRequest.getSp2BeanMap());

			if (null != obj.getUserModKey()) {
				spArgsMap.put("@id_user_mod_key", obj.getUserModKey());
			}
			else {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_NID_REQ.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP(action, SPName.ACT_NID_REQ.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_nid_request_key") != null) {
				nidRequest.setNidRequestId(Integer.parseInt(outputMap.get("@id_nid_request_key").toString()));
			}

			return nidRequest;
		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());

			throw ex;
		}
	}

	private List<NidRequest> execute(NidRequest obj, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();
		List<NidRequest> objList = new ArrayList<NidRequest>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(obj, NationalId.getSql2BeanMap());

			if (null != obj.getUserModKey()) {
				spArgsMap.put("@id_user_mod_key", obj.getUserModKey());
			}
			else {
				spArgsMap.put("@id_user_mod_key", 100000);
			}

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_NID_REQ.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP(action, SPName.ACT_NID_REQ.toString(), spArgsMap, jdbcResult);

			objList = JdbcUtils.mapRows(NidRequest.class, NidRequest.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_NID_REQUEST.toString()));

		}
		catch (Exception ex) {

			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());

			throw ex;
		}

		return objList;
	}

}
