package com.naztech.lms.creditCard.service;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.TransactionStatus;

import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageBuilder;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.service.AbstractService;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.SPName;
import com.naztech.lms.creditCard.model.SupplementAndReferDetails;
/**
 * @author Mirajul.islam
 */
public class SupplementAndReferDetailsService extends AbstractService<SupplementAndReferDetails>{
	
	private static Logger log = LogManager.getLogger(SupplementAndReferDetailsService.class);
	
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
				SupplementAndReferDetails supplementAndReferDetails = handleSaveSupplement(msg, action);
				msgResponse = MessageBuilder.withPayload(supplementAndReferDetails).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.UPDATE.toString())) {
				SupplementAndReferDetails supplementAndReferDetails = handleUpdateSupplement(msg, action);
				msgResponse = MessageBuilder.withPayload(supplementAndReferDetails).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.DELETE.toString())) {
				msgResponse = MessageBuilder.withPayload(handleDeleteSupplement(msg, action)).copyHeadersIfAbsent(msgHeader).build();
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

	private SupplementAndReferDetails handleDeleteSupplement(Message<List<SupplementAndReferDetails>>msg, String action) throws Exception {
		List<SupplementAndReferDetails> suppleList = msg.getPayload();
		if(suppleList == null || suppleList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleDeleteSupplement(suppleList.get(0),action);
	}
	
	 SupplementAndReferDetails insertSupplement(SupplementAndReferDetails supplementAndReferDetails) throws Exception {
		return doHandleSaveSupplement(supplementAndReferDetails, ActionType.NEW.toString());
	}

	private SupplementAndReferDetails doHandleDeleteSupplement(SupplementAndReferDetails supplementAndReferDetails, String action) {
		// TODO Auto-generated method stub
		return null;
	}

	private SupplementAndReferDetails handleUpdateSupplement(Message<List<SupplementAndReferDetails>>msg, String action) throws Exception {
		List<SupplementAndReferDetails> suppleList = msg.getPayload();
		if(suppleList == null || suppleList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleUpdateSupplement(suppleList.get(0),action);
	}

	 SupplementAndReferDetails doHandleUpdateSupplement(SupplementAndReferDetails supplementAndReferDetails,
			String action) throws Exception{
		log.info("Update Acquisition Supplement with action[{}], [{}]", action, supplementAndReferDetails.toString());
		TransactionStatus txnStatus = null;
		try {
			txnStatus = getJdbcService().beginTran();
			supplementAndReferDetails = excuteSupplement(supplementAndReferDetails,action);
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			if (txnStatus != null) {
				getJdbcService().rollbackTran(txnStatus);
			}
			throw e;
		}
		return supplementAndReferDetails;
	}	

	private SupplementAndReferDetails handleSaveSupplement(Message<List<SupplementAndReferDetails>>msg, String action) throws Exception {
		List<SupplementAndReferDetails> suppleList = msg.getPayload();
		if(suppleList == null || suppleList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleSaveSupplement(suppleList.get(0),action);
	}

	private SupplementAndReferDetails doHandleSaveSupplement(SupplementAndReferDetails supplementAndReferDetails,
			String action) throws Exception{
		log.info("Saving Acquisition Supplement with action[{}], [{}]", action, supplementAndReferDetails.toString());
		TransactionStatus txnStatus = null;
		try {
			txnStatus = getJdbcService().beginTran();
			supplementAndReferDetails = excuteSupplement(supplementAndReferDetails,action);
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			if (txnStatus != null) {
				getJdbcService().rollbackTran(txnStatus);
			}
			throw e;
		}
		return supplementAndReferDetails;
	}
	
	private SupplementAndReferDetails excuteSupplement(SupplementAndReferDetails supplementAndReferDetails,
			String action) throws Exception{
		JdbcResult jdbcResult = new JdbcResult();
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(supplementAndReferDetails, SupplementAndReferDetails.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_supplement_and_refer_details.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_supplement_and_refer_details.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			if (outputMap.get("@id_supplement_and_refer_key") != null) {
				supplementAndReferDetails.setIdSupplementAndReferKey(Integer.parseInt(outputMap.get("@id_supplement_and_refer_key").toString()));
			}
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return supplementAndReferDetails;
	}

}
