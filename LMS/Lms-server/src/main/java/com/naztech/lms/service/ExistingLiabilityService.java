/**
 * 
 */
package com.naztech.lms.service;

import java.util.List;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageBuilder;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.service.AbstractService;
import com.nazdaqTechnologies.jdbc.JdbcResult;
import com.nazdaqTechnologies.jdbc.JdbcService;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.RSType;
import com.naztech.lms.constants.SPName;
import com.naztech.lms.model.ExistingLiability;
import com.naztech.lms.utils.DbExecutor;

/**
 * @author md.kamruzzaman
 */
public class ExistingLiabilityService extends AbstractService<ExistingLiability> {
	private static Logger log = LogManager.getLogger(ExistingLiabilityService.class);

	@SuppressWarnings("unchecked")
	@Override
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();

			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.SELECT.toString())) {
				List<ExistingLiability> objList = select(msg, action);
				msgResponse = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.NEW.toString())) {
				ExistingLiability objList = insert(msg, action);
				msgResponse = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.UPDATE.toString())) {
				List<ExistingLiability> objList = update(msg, action);
				msgResponse = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DELETE.toString())) {
				List<ExistingLiability> objList = delete(msg, action);
				msgResponse = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.NEW_UPDATE_LIABILITY.toString())) {
				List<ExistingLiability> objList = handleSaveUpdateLiability(msg, action);
				msgResponse = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
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

	/**
	 * @param msg
	 * @param action
	 * @return
	 */
	private List<ExistingLiability> update(Message<List<ExistingLiability>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	/**
	 * @param msg
	 * @param action
	 * @return
	 */
	private ExistingLiability insert(Message<List<ExistingLiability>> msg, String action) throws Exception {
		return execute(msg.getPayload().get(0), ActionType.NEW.toString());
	}

	private List<ExistingLiability> handleSaveUpdateLiability(Message<List<ExistingLiability>> msg, String action) throws Exception {

		List<ExistingLiability> liabilityList = msg.getPayload();
		for (ExistingLiability it : liabilityList) {
			if (it.getExistingLiabilityId() == null) {
				try {
					insert(it);
				}
				catch (Exception e) {
					log.error("Exception Inserting Liabilty -> [{}]", it.toString());
				}
			}
			else {
				try {
					update(it);
				}
				catch (Exception e) {
					log.error("Exception Updating Liabilty -> [{}]", it.toString());
				}
			}
		}

		ExistingLiability obj = msg.getPayload().get(0);
		obj.setExistingLiabilityId(null);

		return select(obj);
	}

	/**
	 * @param msg
	 * @param action
	 * @return
	 */
	private List<ExistingLiability> select(Message<List<ExistingLiability>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	private List<ExistingLiability> delete(Message<List<ExistingLiability>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	private List<ExistingLiability> execute(Message<List<ExistingLiability>> msg, String action) throws Exception {
		ExistingLiability obj = msg.getPayload().get(0);
		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_existing_liability.toString(), action,
		        JdbcService.createSqlMap(obj, ExistingLiability.getSql2BeanMap()), getJdbcService());
		List<ExistingLiability> objList = JdbcUtils.mapRows(ExistingLiability.class, ExistingLiability.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_EXISTING_LIABILITY.toString()));
		return objList;
	}

	public List<ExistingLiability> select(ExistingLiability obj) throws Exception {
		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_existing_liability.toString(), ActionType.SELECT.toString(),
		        JdbcService.createSqlMap(obj, ExistingLiability.getSql2BeanMap()), getJdbcService());
		List<ExistingLiability> objList = JdbcUtils.mapRows(ExistingLiability.class, ExistingLiability.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_EXISTING_LIABILITY.toString()));
		return objList;
	}

	public ExistingLiability insert(ExistingLiability existingLiability) throws Exception {
		return execute(existingLiability, ActionType.NEW.toString());
	}

	public ExistingLiability update(ExistingLiability existingLiability) throws Exception {
		return execute(existingLiability, ActionType.UPDATE.toString());
	}

	private ExistingLiability execute(ExistingLiability existingLiability, String action) {
		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_existing_liability.toString(), action,
			        JdbcService.createSqlMap(existingLiability, ExistingLiability.getSql2BeanMap()), getJdbcService());

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_existing_liability_key") != null) {
				existingLiability.setExistingLiabilityId(Integer.parseInt(outputMap.get("@id_existing_liability_key").toString()));
			}
		}
		catch (Exception e) {
			log.error("Exception inserting ExistingLiability [{}]", e);
		}

		return existingLiability;
	}
}
