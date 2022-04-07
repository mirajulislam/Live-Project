package com.naztech.lms.creditCard.service;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.FilenameUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.multipart.MultipartFile;

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
import com.naztech.lms.constants.Str;
import com.naztech.lms.creditCard.model.Document;
import com.naztech.lms.model.LoanDocument;
import com.naztech.lms.model.NConfiguration;
import com.naztech.lms.service.MultipleFileAttachmentService;
import com.naztech.lms.utils.DbExecutor;
import com.naztech.lms.utils.NConfigUtils;

public class DocumentService extends AbstractService<Document> {
	private static Logger log = LogManager.getLogger(DocumentService.class);

	private static final String STR_DBL_BACK_SLASH = "\\\\";
	private static final String STR_BACK_SLASH = "\\";

	private static final int IMAGE_WIDTH = 900;
	@Autowired
	JdbcService jdbcService;
	@Autowired 
	MultipleFileAttachmentService fileAttachmentService;

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
				@SuppressWarnings("unchecked")
				Document document = insert(msg);
				msgResponse = MessageBuilder.withPayload(document).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.UPDATE.toString())) {
				Document document = update(msg);
				msgResponse = MessageBuilder.withPayload(document).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DELETE.toString())) {
				Document document = delete(msg);
				msgResponse = MessageBuilder.withPayload(document).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT.toString())) {
				List<Document> document = select(msg);
				msgResponse = MessageBuilder.withPayload(document).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_DOC_FOR_EXISTING_CARD.toString())) {
				msgResponse = MessageBuilder.withPayload(selectDocForExistingCard(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_CARD_ALL_DOCUMENT.toString())) {
				msgResponse = MessageBuilder.withPayload(selectCardAllDocument(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_CIB_STATUS_DOC.toString())) {
				msgResponse = MessageBuilder.withPayload(selectCibStatusDoc(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.SELECT_ATTACHMENT_MULTIPLE_FILE.toString())) {
				msgResponse = MessageBuilder.withPayload(selectAttachCardAllDocument(msg, action)).copyHeadersIfAbsent(msgHeader).build();
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
	
	private List<Document> selectAttachCardAllDocument(Message<List<Document>> msg, String action) throws Exception {
		Document cardDoc = msg.getPayload().get(0);

		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_DOCUMENT.toString(), action,
		        JdbcService.createSqlMap(cardDoc, Document.getSql2BeanMap()), getJdbcService());

		List<Document> cardDocList = JdbcUtils.mapRows(Document.class, Document.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_SELECT_ATTACHMENT_MULTIPLE_REPORT.toString()));

		return cardDocList;
	}

	private List<Document> selectCardAllDocument(Message<List<Document>> msg, String action) throws Exception {
		Document cardDoc = msg.getPayload().get(0);
		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_DOCUMENT.toString(), action,
		        JdbcService.createSqlMap(cardDoc, Document.getSql2BeanMap()), getJdbcService());
		List<Document> cardDocList = JdbcUtils.mapRows(Document.class, Document.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_card_DOCUMENT.toString()));
		return cardDocList;
	}

	private List<Document> selectDocForExistingCard(Message<List<Document>> msg, String action) throws Exception{
		Document cardDoc = msg.getPayload().get(0);
		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_DOCUMENT.toString(), action,
		        JdbcService.createSqlMap(cardDoc, Document.getSql2BeanMap()), getJdbcService());

		List<Document> cardDocListExist = JdbcUtils.mapRows(Document.class, Document.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CARD_DOCUMENT_EXIST.toString()));

		List<Document> cardDocListNew = JdbcUtils.mapRows(Document.class, Document.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CARD_DOCUMENT_NEW.toString()));

		cardDocListExist.addAll(cardDocListNew);

		return cardDocListExist;
	}

	private List<Document> selectCibStatusDoc(Message<List<Document>> msg, String action) throws Exception {
		Document document = msg.getPayload().get(0);
		List<Document> documentList = selectDocument(document, ActionType.SELECT_CIB_STATUS_DOC.toString());
		return documentList;
	}

	private List<Document> select(Message<List<Document>> msg) throws Exception {
		Document document = msg.getPayload().get(0);
		return doSelect(document);
	}

	private Document delete(Message<List<Document>> msg) throws Exception {
		Document document = msg.getPayload().get(0);
		return doDelete(document);
	}

	private Document update(Message<List<Document>> msg) throws Exception {
		Document document = msg.getPayload().get(0);
		return doUpdate(document);
	}

	private Document insert(Message<List<Document>> msg) throws Exception {
		Document document = msg.getPayload().get(0);
		return doInsert(document);
	}

	public List<Document> doSelect(Document document) throws Exception {
		return selectDocument(document, ActionType.SELECT.toString());
	}

	public Document doDelete(Document document) throws Exception {
		return execute(document, ActionType.DELETE.toString());
	}

	public Document doUpdate(Document document) throws Exception {
		return execute(document, ActionType.UPDATE.toString());
	}

	public Document doInsert(Document document) throws Exception {
		return execute(document, ActionType.NEW.toString());
	}

	public Document doExecute(Document document, String action) throws Exception {
		return execute(document, action);
	}

	private Document execute(Document document, String action) throws Exception {

		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_DOCUMENT.toString(), action,
			        JdbcService.createSqlMap(document, Document.getSql2BeanMap()), getJdbcService());

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_document_key") != null) {
				document.setDocumentKey(Integer.parseInt(outputMap.get("@id_document_key").toString()));
			}
		}
		catch (Exception e) {
			log.error("Error inserting comment, [{}] \n [{}]", document.toString(), e);
			throw e;
		}

		return document;

	}

	private List<Document> doAttachSelect(Document document, String action) throws Exception {
		List<Document> documentList = new ArrayList<>();
		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_DOCUMENT.toString(), action,
			        JdbcService.createSqlMap(document, Document.getSql2BeanMap()), getJdbcService());
			documentList = JdbcUtils.mapRows(Document.class, Document.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.DOCUMENT.toString()));

		}
		catch (Exception e) {
			log.error("Exception getting card document [{}]", e);
			throw e;
		}

		return documentList;
	}
	private List<Document> selectDocument(Document document, String action) throws Exception {
		List<Document> documentList = new ArrayList<>();
		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_DOCUMENT.toString(), action,
			        JdbcService.createSqlMap(document, Document.getSql2BeanMap()), getJdbcService());
			documentList = JdbcUtils.mapRows(Document.class, Document.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.DOCUMENT.toString()));

		}
		catch (Exception e) {
			log.error("Exception getting card document [{}]", e);
			throw e;
		}

		return documentList;
	}

	public String saveCardDocumentFile(MultipartFile file, Document cardDoc, String docTrack) {
		try {
			Integer creditCardId = cardDoc.getRefKey() == null ? null : cardDoc.getRefKey();
			if(creditCardId == null) return null;
			String fileName = null;
			String cibFileLoaction = null;
			
			if(cardDoc.getDocType().equals(Str.CIB_STATUS.toString())) {
				cibFileLoaction = fileAttachmentService.anyFileLocation(String.valueOf(creditCardId),Str.STR_CREDIT_CARD.toString());
				fileName = fileAttachmentService.checkFileDoc(cibFileLoaction,Str.CIB_STATUS.toString(),file,Str.STR_CREDIT_CARD.toString());				
			}else {
				fileName = buildFileName(cardDoc.getDocType(), FilenameUtils.getExtension(file.getOriginalFilename()));
			}
			
			String destination = fileAttachmentService.saveFile(file, fileName,creditCardId.toString(),Str.STR_CREDIT_CARD.toString());			
			cardDoc.setDocName(fileName);
			cardDoc.setDocPath(destination);
			cardDoc.setDownloadLink(destination + fileName);
			cardDoc.setFilePresent(1);
			cardDoc.setUploadStatus(1);
			
			if (docTrack.matches(Str.CIB_STATUS)) {
				execute(cardDoc, ActionType.NEW.toString());
			}
			else if (docTrack.matches(Str.MOBILE_VIEW)) {
				execute(cardDoc, ActionType.NEW_MOBILE_VIEW.toString());
			}
			else {
				if (cardDoc.getDocumentKey() == null) {
					doInsert(cardDoc);
				}
				else {
					doUpdate(cardDoc);
				}
			}
			
		}catch (Exception e) {
				log.error("Exception saving card document file [{}]", e);
			}
			return "success";	
	}
	
	private String buildFileName(String docType, String fileExt) {
		return docType + Str.STR_DOT.toString() + fileExt;
	}
	
	public String getDownloadLinkOfDoc(Integer cardDocId, Integer userModKey) {

		Document cardDoc = new Document();
		cardDoc.setDocumentKey(cardDocId);
		cardDoc.setUserModKey(userModKey);

		try {
			List<Document> cardDocList = doSelect(cardDoc);
			if (cardDocList == null || cardDocList.size() == 0) return null;

			return cardDocList.get(0).getDownloadLink();
		}
		catch (Exception e) {
			log.error("Exception getting data from card Document [{}]", e);
			return null;
		}
	}
	public String getDownloadLinkOfAttachDoc(Integer cardDocId, Integer userModKey) {

		Document cardDoc = new Document();
		cardDoc.setDocumentKey(cardDocId);
		cardDoc.setUserModKey(userModKey);

		try {
			List<Document> cardDocList = doAttachSelect(cardDoc,ActionType.SELECT_ATTACHMENT_SINGLE_FILE.toString());
			if (cardDocList == null || cardDocList.size() == 0) return null;

			return cardDocList.get(0).getDownloadLink();
		}
		catch (Exception e) {
			log.error("Exception getting data from card Document [{}]", e);
			return null;
		}
	}
	public String getLinkOfDoc(Integer cardId, Integer userModKey, String docType) {

		Document cardDoc = new Document();
		cardDoc.setRefKey(cardId);
		cardDoc.setUserModKey(userModKey);
		cardDoc.setDocType(docType);

		try {
			List<Document> cardDocList = selectCardDocument(cardDoc, ActionType.SELECT_DOC_BY_CARD_ID_DOC_TYPE.toString());
			if (cardDocList == null || cardDocList.size() == 0) return null;

			return cardDocList.get(0).getDownloadLink();
		}
		catch (Exception e) {
			log.error("Exception getting data from card Document [{}]", e);
			return null;
		}
	}

	private List<Document> selectCardDocument(Document cardDoc, String action) throws Exception {
		List<Document> cardDocList = new ArrayList<>();
		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_DOCUMENT.toString(), action,
			        JdbcService.createSqlMap(cardDoc, Document.getSql2BeanMap()), getJdbcService());
			cardDocList = JdbcUtils.mapRows(Document.class, Document.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CARD_DOCUMENT.toString()));

		}
		catch (Exception e) {
			log.error("Exception getting card document [{}]", e);
			throw e;
		}

		return cardDocList;
	}
}