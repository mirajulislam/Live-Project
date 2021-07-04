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
import com.naztech.lms.model.Comment;
import com.naztech.lms.utils.DbExecutor;

/**
 * @author md.kamruzzaman
 */
public class CommentService extends AbstractService<Comment> {
	private static Logger log = LogManager.getLogger(CommentService.class);

	@Override
	@SuppressWarnings("rawtypes")
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();

			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.NEW.toString())) {
				Comment cmnt = insert(msg);
				msgResponse = MessageBuilder.withPayload(cmnt).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.UPDATE.toString())) {
				List<Comment> objList = update(msg, action);
				msgResponse = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DELETE.toString())) {
				List<Comment> objList = delete(msg, action);
				msgResponse = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT.toString())) {
				List<Comment> objList = select(msg, action);
				msgResponse = MessageBuilder.withPayload(objList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_ALL_QUERY.toString())) {
				List<Comment> objList = selectAllQuery(msg, action);
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
	private List<Comment> update(Message<List<Comment>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	/**
	 * @param msg
	 * @param action
	 * @return
	 */
	private List<Comment> insert(Message<List<Comment>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	/**
	 * @param msg
	 * @param action
	 * @return
	 */
	private List<Comment> select(Message<List<Comment>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	/**
	 * @param msg
	 * @param action
	 * @return
	 */
	private List<Comment> delete(Message<List<Comment>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	private List<Comment> selectAllQuery(Message<List<Comment>> msg, String action) throws Exception {
		return execute(msg, action);
	}

	private List<Comment> execute(Message<List<Comment>> msg, String action) throws Exception {
		Comment obj = msg.getPayload().get(0);
		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_comment.toString(), action, JdbcService.createSqlMap(obj, Comment.getSql2BeanMap()),
		        getJdbcService());
		List<Comment> objList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_COMMENT.toString()));
		return objList;
	}

	public void insert(Comment cmnt) {
		execute(cmnt, ActionType.NEW.toString());
	}

	public void update(Comment cmnt) {
		execute(cmnt, ActionType.UPDATE.toString());
	}

	public Comment insert(Message<List<Comment>> msg) {
		return execute(msg.getPayload().get(0), ActionType.NEW.toString());
	}

	private Comment execute(Comment cmnt, String action) {

		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_comment.toString(), action,
			        JdbcService.createSqlMap(cmnt, Comment.getSql2BeanMap()), getJdbcService());

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_comment_key") != null) {
				cmnt.setCommentId(Integer.parseInt(outputMap.get("@id_comment_key").toString()));
			}
		}
		catch (Exception e) {
			log.error("Error inserting comment, [{}] \n [{}]", cmnt.toString(), e);
		}

		return cmnt;
	}

}
