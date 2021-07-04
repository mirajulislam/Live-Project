/**
 * 
 */
package com.naztech.lms.service;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.naztech.lms.model.Comment;
import com.naztech.lms.model.Loan;
import com.naztech.lms.model.Notes;
import com.naztech.lms.utils.DbExecutor;

/**
 * @author mirajul.islam
 *
 */
public class NotesService extends AbstractService<Notes>{
	private static Logger log = LoggerFactory.getLogger(NotesService.class);

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
			if (action.equals(ActionType.NEW.toString())) {
				Notes notes = insert(msg);
				msgResponse = MessageBuilder.withPayload(notes).copyHeadersIfAbsent(msgHeader).build();				
			}else if (action.equals(ActionType.SELECT.toString())) {
				List<Notes> notesList = select(msg, action);
				msgResponse = MessageBuilder.withPayload(notesList).copyHeadersIfAbsent(msgHeader).build();				
			}else {
				throw new Exception("Unknown action " + action);
			}
			log.debug("Processing ACTION [{}]", action);
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}
		return msgResponse;
	}

	private List<Notes> select(Message<List<Notes>> msg, String action) throws Exception {
	  return execute(msg, action);
	}

	private List<Notes> execute(Message<List<Notes>> msg, String action) throws Exception {
		Notes notesData = msg.getPayload().get(0);
		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_notes.toString(), action, JdbcService.createSqlMap(notesData, Notes.getSql2BeanMap()),
		        getJdbcService());
		List<Notes> notesList = JdbcUtils.mapRows(Notes.class, Notes.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_NOTES.toString()));
		return notesList;
	}

	private Notes insert(Message<List<Notes>> msg) {
		return execute(msg.getPayload().get(0), ActionType.NEW.toString());
	}

	private Notes execute(Notes notes, String action) {
		JdbcResult jdbcResult = new JdbcResult();
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(notes, Notes.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_notes.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_notes.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_notes_key") != null) {
				notes.setNotesId(Integer.parseInt(outputMap.get("@id_notes_key").toString()));
			}
	    }
	    catch (Exception e) {
		   log.error("Error inserting notes, [{}] \n [{}]", notes.toString(), e);
	    }
	   return notes;
	 }
}
