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
import com.naztech.lms.model.Role;
import com.naztech.lms.model.State;
import com.naztech.lms.model.User;

public class UserService extends AbstractService<User> {

	private static Logger log = LogManager.getLogger(UserService.class);
	@Autowired
	JdbcService jdbcService;

	@Override
	@SuppressWarnings("rawtypes")
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();
			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.SELECT_ROLES_USER.toString())) {
				List<User> loan = selectRoleUser(msg);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_LOAN_ROLE.toString())) {
				List<Role> loanList = selectRole(msg);
				msgResponse = MessageBuilder.withPayload(loanList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_ROLE_TYPE.toString())) {
				List<Role> roleTypeList = selectRoleType(msg);
				msgResponse = MessageBuilder.withPayload(roleTypeList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_ASSIGNED_STATE.toString())) {
				List<State> assignedStateList = selectAssignedState(msg);
				msgResponse = MessageBuilder.withPayload(assignedStateList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_AVAILABLE_STATE.toString())) {
				List<State> availableStateList = selectAvailableState(msg);
				msgResponse = MessageBuilder.withPayload(availableStateList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.ADD_AVAILABLE_STATE.toString())) {
				List<State> availableStateList = updateAvailableState(msg);
				msgResponse = MessageBuilder.withPayload(availableStateList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.REMOVE_ASSIGNED_STATE.toString())) {
				msgResponse = MessageBuilder.withPayload(handleDeleteState(msg, action)).copyHeadersIfAbsent(msgHeader).build();
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

	private List<Role> selectRole(Message<List<User>> msg) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<Role> list = new ArrayList<Role>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(msg.getPayload().get(0), User.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP(ActionType.SELECT_LOAN_ROLE.toString(), SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);

			list = JdbcUtils.mapRows(Role.class, Role.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_ROLE.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return list;
	}
	
	private List<Role> selectRoleType(Message<List<User>> msg) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<Role> list = new ArrayList<Role>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(msg.getPayload().get(0), User.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.SEL_ROLE.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP("", SPName.SEL_ROLE.toString(), spArgsMap, jdbcResult);

			list = JdbcUtils.mapRows(Role.class, Role.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_ROLE.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return list;
	}
	
	private List<State> selectAssignedState(Message<List<User>> msg) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<State> list = new ArrayList<State>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(msg.getPayload().get(0), User.getSql2BeanMap());
			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.SEL_FSM_STATE.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP(ActionType.SELECT_ASSIGNED_STATE.toString(), SPName.SEL_FSM_STATE.toString(), spArgsMap, jdbcResult);

			list = JdbcUtils.mapRows(State.class, State.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_ASSIGNED_STATE.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return list;
	}
	
	private List<State> selectAvailableState(Message<List<User>> msg) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<State> list = new ArrayList<State>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(msg.getPayload().get(0), User.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.SEL_FSM_STATE.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP(ActionType.SELECT_AVAILABLE_STATE.toString(), SPName.SEL_FSM_STATE.toString(), spArgsMap, jdbcResult);

			list = JdbcUtils.mapRows(State.class, State.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_AVAILABLE_STATE.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return list;
	}

	private List<State> updateAvailableState(Message<List<User>> msg) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<State> list = new ArrayList<State>();

		try {
			
			User user = msg.getPayload().get(0);
			List<State> stateList = user.getStateList();
			
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(user, User.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.SEL_FSM_STATE.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);
			
			jdbcResult = getJdbcService().executeSP(ActionType.REMOVE_ASSIGNED_STATE.toString(), SPName.SEL_FSM_STATE.toString(), spArgsMap, jdbcResult);
			
			for(State s : stateList) {
				spArgsMap.put("@id_fsm_state_key", s.getStateId());
				jdbcResult = getJdbcService().executeSP(ActionType.ADD_AVAILABLE_STATE.toString(), SPName.SEL_FSM_STATE.toString(), spArgsMap, jdbcResult);
			}
			
			list = JdbcUtils.mapRows(State.class, State.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_ADD_AVAILABLE_STATE.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return list;
	}	
	private List<State> handleDeleteState(Message<List<User>> msg, String action) throws Exception {
		User  user = msg.getPayload().get(0);
	    List<State> deleteassignState = deleteAvailableState(user, action);
		
		return deleteassignState;
	}
	
	private List<State> deleteAvailableState(User user, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<State> list = new ArrayList<State>();
		try {			
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(user, User.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.SEL_FSM_STATE.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.SEL_FSM_STATE.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			
			if (outputMap.get("@id_fsm_state_key") != null) {
				user.setStateId(Integer.parseInt(outputMap.get("@id_fsm_state_key").toString()));
			}	
				}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return list;
	}
	
	private List<User> selectRoleUser(Message<List<User>> msg) throws Exception {
		return selectRoleUser(msg.getPayload().get(0));
	}

	public List<User> selectRoleUser(User user) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<User> list = new ArrayList<User>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(user, User.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_USER.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = getJdbcService().executeSP(ActionType.SELECT_ROLES_USER.toString(), SPName.ACT_USER.toString(), spArgsMap, jdbcResult);

			list = JdbcUtils.mapRows(User.class, User.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_USER.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return list;
	}

}
