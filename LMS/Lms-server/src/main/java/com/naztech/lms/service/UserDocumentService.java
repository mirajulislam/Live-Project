package com.naztech.lms.service;

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
import com.naztech.lms.model.UserDocument;
import com.naztech.lms.model.UserRegistration;
import com.naztech.lms.model.LoanDocument;
import com.naztech.lms.model.NConfiguration;
import com.naztech.lms.utils.DbExecutor;
import com.naztech.lms.utils.NConfigUtils;

public class UserDocumentService extends AbstractService<UserDocument>{
	private static Logger log = LogManager.getLogger(UserDocumentService.class);

	private static final String STR_DBL_BACK_SLASH = "\\\\";
	private static final String STR_BACK_SLASH = "\\";

	private static final int IMAGE_WIDTH = 900;
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

			if (action.equals(ActionType.NEW.toString())) {
				UserDocument userDoc = insert(msg);
				msgResponse = MessageBuilder.withPayload(userDoc).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.UPDATE.toString())) {
				UserDocument userDoc = update(msg);
				msgResponse = MessageBuilder.withPayload(userDoc).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DELETE.toString())) {
				UserDocument userDoc = delete(msg);
				msgResponse = MessageBuilder.withPayload(userDoc).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT.toString())) {
				List<UserDocument> userDoc = select(msg);
				msgResponse = MessageBuilder.withPayload(userDoc).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_DOC_FOR_EXISTING_USER.toString())) {
				msgResponse = MessageBuilder.withPayload(selectDocForExistingUser(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_USER_ALL_DOCUMENT.toString())) {
				msgResponse = MessageBuilder.withPayload(selectUserAllDocument(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_CIB_STATUS_DOC.toString())) {
				msgResponse = MessageBuilder.withPayload(selectCibStatusDoc(msg, action)).copyHeadersIfAbsent(msgHeader).build();
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

	private List<UserDocument> selectCibStatusDoc(Message<List<UserDocument>> msg, String action) throws Exception {
		UserDocument userDoc = msg.getPayload().get(0);
		List<UserDocument> userDocList = selectUserDocument(userDoc, ActionType.SELECT_CIB_STATUS_DOC.toString());
		return userDocList;
	}

	private List<UserDocument> selectUserAllDocument(Message<List<UserDocument>> msg, String action) throws Exception {
		UserDocument userDoc = msg.getPayload().get(0);

		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_USER_DOCUMENT.toString(), action,
		        JdbcService.createSqlMap(userDoc, UserDocument.getSql2BeanMap()), getJdbcService());

		List<UserDocument> userDocList = JdbcUtils.mapRows(UserDocument.class, UserDocument.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_USER_DOCUMENT.toString()));

		return userDocList;
	}

	private List<UserDocument> selectDocForExistingUser(Message<List<UserDocument>> msg, String action) throws Exception {
		UserDocument userDoc = msg.getPayload().get(0);

		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_USER_DOCUMENT.toString(), action,
		        JdbcService.createSqlMap(userDoc, UserDocument.getSql2BeanMap()), getJdbcService());

		List<UserDocument> userDocListExist = JdbcUtils.mapRows(UserDocument.class, UserDocument.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_USER_DOCUMENT_EXIST.toString()));

		List<UserDocument> userDocListNew = JdbcUtils.mapRows(UserDocument.class, UserDocument.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_USER_DOCUMENT_NEW.toString()));

		userDocListExist.addAll(userDocListNew);

		return userDocListExist;
	}

	private List<UserDocument> select(Message<List<UserDocument>> msg) throws Exception {
		UserDocument userDoc = msg.getPayload().get(0);
		return doSelect(userDoc);
	}

	private UserDocument delete(Message<List<UserDocument>> msg) throws Exception {
		UserDocument userDoc = msg.getPayload().get(0);
		return doDelete(userDoc);
	}

	private UserDocument update(Message<List<UserDocument>> msg) throws Exception {
		UserDocument userDoc = msg.getPayload().get(0);
		return doUpdate(userDoc);
	}

	private UserDocument insert(Message<List<UserDocument>> msg) throws Exception {
		UserDocument userDoc = msg.getPayload().get(0);
		return doInsert(userDoc);
	}

	public List<UserDocument> doSelect(UserDocument userDoc) throws Exception {
		return selectUserDocument(userDoc, ActionType.SELECT.toString());
	}

	public UserDocument doDelete(UserDocument userDoc) throws Exception {
		return execute(userDoc, ActionType.DELETE.toString());
	}

	public UserDocument doUpdate(UserDocument userDoc) throws Exception {
		return execute(userDoc, ActionType.UPDATE.toString());
	}

	public UserDocument doInsert(UserDocument userDoc) throws Exception {
		return execute(userDoc, ActionType.NEW.toString());
	}

	public UserDocument doExecute(UserDocument userDoc, String action) throws Exception {
		return execute(userDoc, action);
	}

	private UserDocument execute(UserDocument userDoc, String action) throws Exception {

		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_USER_DOCUMENT.toString(), action,
			        JdbcService.createSqlMap(userDoc, UserDocument.getSql2BeanMap()), getJdbcService());

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_user_doc_key") != null) {
				userDoc.setUserDocId(Integer.parseInt(outputMap.get("@id_user_doc_key").toString()));
			}
		}
		catch (Exception e) {
			log.error("Error inserting comment, [{}] \n [{}]", userDoc.toString(), e);
			throw e;
		}

		return userDoc;

	}

	private List<UserDocument> selectUserDocument(UserDocument userDoc, String action) throws Exception {
		List<UserDocument> userDocList = new ArrayList<>();
		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_USER_DOCUMENT.toString(), action,
			        JdbcService.createSqlMap(userDoc, UserDocument.getSql2BeanMap()), getJdbcService());
			userDocList = JdbcUtils.mapRows(UserDocument.class, UserDocument.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_USER_DOCUMENT.toString()));

		}
		catch (Exception e) {
			log.error("Exception getting user document [{}]", e);
			throw e;
		}

		return userDocList;
	}

	public String saveDocumentFile(MultipartFile file, UserDocument userDoc, String docTrack) {
		try {

			String userId = userDoc.getUserId() == null ? null : userDoc.getUserId().toString();
			if (userId == null) return null;

			String fileName = builtFileName(userDoc.getDocType(), FilenameUtils.getExtension(file.getOriginalFilename()));
			String dest = saveFile(file, fileName, userId);			
			
			userDoc.setDocName(fileName);
			userDoc.setDocPath(dest);
			userDoc.setDownloadLink(dest + fileName);
			userDoc.setFilePresent(1);
			userDoc.setUploadStatus(1);			
		 
			if (docTrack.matches(Str.CIB_STATUS)) {
				execute(userDoc, ActionType.NEW_CIB_STATUS.toString());
			}
			else if (docTrack.matches(Str.MOBILE_VIEW)) {
				execute(userDoc, ActionType.NEW_MOBILE_VIEW.toString());
			}
			else {
				if (userDoc.getUserDocId() == null) {
					doInsert(userDoc);
				}
				else {
					doUpdate(userDoc);
				}
			}
		}
		catch (Exception e) {
			log.error("Exception saving user document file [{}]", e);
		}
		return "success";
	}

	private String saveFile(MultipartFile multipartFile, String fileName, String userId) throws Exception {
		String destination;
		try {
			NConfiguration config = NConfigUtils.getConfig(Str.STR_REGISTRATION_USER.toString(), Str.STR_DOCUMENT.toString(), Str.STR_BASE_PATH.toString());

			String dest = config.getValue1();
			int len = dest.length();

			StringBuilder sb = new StringBuilder(dest);

			if (dest.substring(len - 2, len).equals(STR_DBL_BACK_SLASH)) {
				sb.append(userId).append(File.separator);
			}
			else if (dest.substring(len - 1, len).equals(STR_BACK_SLASH)) {
				sb.append(userId).append(File.separator).append(userId).append(File.separator);
			}
			else {
				sb.append(File.separator).append(userId).append(File.separator);
			}

			destination = sb.toString();

			File dir = new File(destination);
			if (!dir.exists()) dir.mkdirs();

			sb.append(fileName);

			File destFile = new File(sb.toString());

			log.debug("Saving document to [{}]", destFile.getAbsoluteFile());

			// Write bytes from the multipart file to disk.
			FileUtils.writeByteArrayToFile(destFile, multipartFile.getBytes());

			if (doResizeImage(sb.toString(), FilenameUtils.getExtension(multipartFile.getOriginalFilename()))) {
				log.info("Successfully Resized the Image.");
			}
			else {
				log.info("Image Resizing unsuccessfull.");
			}
		}
		catch (Exception e) {
			log.error("Exception saving user document file [{}]", e);
			throw e;
		}

		return destination;
	}

	private boolean doResizeImage(String imagePath, String fileExt) {
		try {
			File inputFile = new File(imagePath);
			BufferedImage inputImage = ImageIO.read(inputFile);
			double percent = (double) IMAGE_WIDTH / (double) inputImage.getWidth();
			int scaledWidth = (int) (inputImage.getWidth() * percent);
			int scaledHeight = (int) (inputImage.getHeight() * percent);

			if (inputImage.getWidth() > IMAGE_WIDTH) {
				BufferedImage resizedImage = resizeImage(inputImage, scaledWidth, scaledHeight);
				if (resizedImage == null) {
					return false;
				}
				ImageIO.write(resizedImage, fileExt, new File(imagePath));
			}
			return true;
		}
		catch (Exception e) {
			log.debug("Error reading image to resize [{}]", e);
			return false;
		}

	}

	BufferedImage resizeImage(BufferedImage originalImage, int targetWidth, int targetHeight) throws Exception {
		try {
			Image resultingImage = originalImage.getScaledInstance(targetWidth, targetHeight, Image.SCALE_DEFAULT);
			BufferedImage outputImage = new BufferedImage(targetWidth, targetHeight, BufferedImage.TYPE_INT_RGB);
			outputImage.getGraphics().drawImage(resultingImage, 0, 0, null);
			return outputImage;
		}
		catch (Exception e) {
			log.error("Error resizing image [{}]", e);
			return null;
		}
	}

	private String builtFileName(String docType, String fileExt) {
		return docType + Str.STR_DOT.toString() + fileExt;
	}

	public String getDownloadLinkOfDoc(Integer userDocId, Integer userModKey) {

		UserDocument userDoc = new UserDocument();
		userDoc.setUserDocId(userDocId);
		userDoc.setUserModKey(userModKey);

		try {
			List<UserDocument> userDocList = doSelect(userDoc);
			if (userDocList == null || userDocList.size() == 0) return null;

			return userDocList.get(0).getDownloadLink();
		}
		catch (Exception e) {
			log.error("Exception getting data from user Document [{}]", e);
			return null;
		}
	}

	public String getLinkOfDoc(Integer userId, Integer userModKey, String docType) {

		UserDocument userDoc = new UserDocument();
		userDoc.setUserId(userId);
		userDoc.setUserModKey(userModKey);
		userDoc.setDocType(docType);

		try {
			List<UserDocument> userDocList = selectUserDocument(userDoc, ActionType.SELECT_DOC_BY_USER_ID_DOC_TYPE.toString());
			if (userDocList == null || userDocList.size() == 0) return null;

			return userDocList.get(0).getDownloadLink();
		}
		catch (Exception e) {
			log.error("Exception getting data from USER Document [{}]", e);
			return null;
		}
	}
}
