package com.naztech.lms.atmDispute.service;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.TransactionStatus;

import com.google.gson.Gson;
import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageBuilder;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.service.AbstractService;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.lms.atmDispute.model.Complaint;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.RSType;
import com.naztech.lms.constants.SPName;
import com.naztech.lms.model.Comment;
import com.naztech.lms.service.CommentService;

public class ComplaintService extends AbstractService<Complaint>{
	private static Logger log = LogManager.getLogger(ComplaintService.class);
	
	@Autowired
	JdbcService jdbcService;
	@Autowired
	CommentService commentService;
	
	static Gson gson;
	static {
		gson = new Gson();
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
			log.info("Processing ACTION [{}], ServiceClass: [{}]", action, "ComplaintService.class");
			
			if (action.equals(ActionType.USER_REQUESTED.toString())|| action.equals(ActionType.NEW_DISPUTE.toString())) {
				Complaint complaint = handleSaveApplication(msg, action);
				msgResponse = MessageBuilder.withPayload(complaint).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.UPDATE.toString())) {
				Complaint complaint = handleUpdateApplication(msg, action);
				msgResponse = MessageBuilder.withPayload(complaint).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.ACTION_STATE_TRANSITION.toString())) {
				Complaint complaint = handleStateTransition(msg, action);
				msgResponse = MessageBuilder.withPayload(complaint).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.SELECT_FULL_ATM_DISPUTE.toString())) {
				Complaint complaint = handleSelectFullDispute(msg, action);
				msgResponse = MessageBuilder.withPayload(complaint).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.ACTION_SELECT_ATM_DISPUTE_FOR_GRID.toString())) {
				msgResponse = MessageBuilder.withPayload(selectAtmDisputeGridData(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.DELETE_FULL_ATM_DISPUTE.toString()) || action.equals(ActionType.DELETE.toString())) {
				msgResponse = MessageBuilder.withPayload(handleDeleteDispute(msg, action)).copyHeadersIfAbsent(msgHeader).build();
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

	private String handleDeleteDispute(Message<List<Complaint>> msg, String action) throws Exception {
		List<Complaint> complaintList = msg.getPayload();
		if (complaintList == null || complaintList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleDeleteDispute(complaintList.get(0), action);
	}
	
	private String doHandleDeleteDispute(Complaint complaint, String action) throws Exception {
		log.debug("Deleting Atm Dispute Application with action[{}], [{}]", action, complaint.toString());

		TransactionStatus txnStatus = getJdbcService().beginTran();
		try {
			execute(complaint, action);
			getJdbcService().commitTran(txnStatus);

			return "Delete Successfull";
		}
		catch (Exception e) {
			if (txnStatus != null) {
				getJdbcService().rollbackTran(txnStatus);
			}
			throw e;
		}
	}

	private List<Complaint> selectAtmDisputeGridData(Message<List<Complaint>> msg, String action) throws Exception {
		List<Complaint> complaintList = msg.getPayload();
		if (complaintList == null || complaintList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doSelectAtmDisputeGridData(complaintList.get(0), action);
	}

	private List<Complaint> doSelectAtmDisputeGridData(Complaint complaint, String action) throws Exception {
		List<Complaint> complaintList;
		try {
			JdbcResult jdbcResult = selectSingle(complaint, action, SPName.ACT_complaint.toString());
			complaintList = JdbcUtils.mapRows(Complaint.class, Complaint.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_SELECT_ATM_DISPUTE_FOR_GRID.toString()));
		}catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return complaintList;
	}

	private Complaint handleSelectFullDispute(Message<List<Complaint>> msg, String action) throws Exception {
		List<Complaint> complaintList = msg.getPayload();
		if (complaintList == null || complaintList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleSelectFullDispute(complaintList.get(0),action);
	}


	private Complaint doHandleSelectFullDispute(Complaint complaint, String action) throws Exception {
		try {
		JdbcResult jdbcResult = selectSingle(complaint, action, SPName.ACT_complaint.toString());
		List<Complaint> complaintList = JdbcUtils.mapRows(Complaint.class, Complaint.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_SELECT_FULL_ATM_DISPUTE.toString()));
		if (complaintList != null && complaintList.size() > 0) {
				complaint = complaintList.get(0);
		 	}
		}catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return complaint;
	}
	private JdbcResult selectSingle(Complaint complaint, String action, String sp) throws Exception {
		try {
			JdbcResult jdbcResult = new JdbcResult();
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(complaint, Complaint.getSp2BeanMap());

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

	private Complaint handleUpdateApplication(Message<List<Complaint>> msg, String action) throws Exception {
		List<Complaint> complaintList = msg.getPayload();
		if (complaintList == null || complaintList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleUpdateApplication(complaintList.get(0), action);
	}


	private Complaint handleSaveApplication(Message<List<Complaint>> msg, String action) throws Exception {
		List<Complaint> complaintList = msg.getPayload();
		if (complaintList == null || complaintList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleSaveApplication(complaintList.get(0), action);
	}

	private Complaint doHandleSaveApplication(Complaint complaint, String action) throws Exception {
		log.debug("Save ATM Dispute with action[{}], [{}]", action, complaint.toString());
		log.info(" Save ATM Dispute with action[{}], [{}]", action, complaint.toString());
		TransactionStatus txnStatus = null;
		try {
			txnStatus = getJdbcService().beginTran();
			complaint = execute(complaint,action);
			getJdbcService().commitTran(txnStatus);
			return complaint;
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			if (txnStatus != null) {
				getJdbcService().rollbackTran(txnStatus);
			}
			throw e;
		}	
	}
	private Complaint doHandleUpdateApplication(Complaint complaint, String action) throws Exception {
		log.debug("Update ATM Dispute with action[{}], [{}]", action, complaint.toString());
		log.info(" Update ATM Dispute with action[{}], [{}]", action, complaint.toString());
		TransactionStatus txnStatus = null;
		try {
			txnStatus = getJdbcService().beginTran();
			complaint = execute(complaint,action);
			getJdbcService().commitTran(txnStatus);
			return complaint;
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			if (txnStatus != null) {
				getJdbcService().rollbackTran(txnStatus);
			}
			throw e;
		}
	}

	private Complaint execute(Complaint complaint, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(complaint, Complaint.getSp2BeanMap());
			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_complaint.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_complaint.toString(), spArgsMap, jdbcResult);
			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			if (outputMap.get("@id_customer_complaint_key") != null) {
				complaint.setCustomerComplaintKey(Integer.parseInt(outputMap.get("@id_customer_complaint_key").toString()));
			}
			if (outputMap.get("@id_customer_complaint_ver") != null) {
				complaint.setCustomerComplaintVer(Integer.parseInt(outputMap.get("@id_customer_complaint_ver").toString()));
			}
		}
		catch (Exception ex) {
		log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
		throw ex;
		}
		return complaint;
	}
	
	private Complaint handleStateTransition(Message<List<Complaint>> msg, String action) throws Exception {
		Complaint complain = msg.getPayload().get(0);
		stateTransition(complain, complain.getUiActionName());
		return complain;
	}

	private boolean stateTransition(Complaint complain, String uiActionName) throws Exception {
		Map<String, Object> spArgsMap = JdbcService.createSqlMap(complain, Complaint.getSp2BeanMap());
		execute(spArgsMap, ActionType.ACTION_STATE_TRANSITION.toString());
		List<Comment> cmnt = complain.getCommentList();
		if (cmnt != null && cmnt.size() > 0) {
			commentService.insert(cmnt.get(0));
		}
		return true;	
	}
	
	private JdbcResult execute(Map<String, Object> spArgsMap, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		try {

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_complaint.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);
			jdbcResult = jdbcService.executeSP(action, SPName.ACT_complaint.toString(), spArgsMap, jdbcResult);
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return jdbcResult;
	}

}
