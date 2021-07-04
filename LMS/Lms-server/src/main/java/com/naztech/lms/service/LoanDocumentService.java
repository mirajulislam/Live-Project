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
import com.nazdaqTechnologies.jdbc.StoredProcedure.JdbcStoredProcedure;
import com.nazdaqTechnologies.jdbc.util.JdbcUtils;
import com.naztech.lms.constants.ActionType;
import com.naztech.lms.constants.RSType;
import com.naztech.lms.constants.SPName;
import com.naztech.lms.constants.Str;
import com.naztech.lms.model.Loan;
import com.naztech.lms.model.LoanDocument;
import com.naztech.lms.model.NConfiguration;
import com.naztech.lms.utils.DbExecutor;
import com.naztech.lms.utils.NConfigUtils;

/**
 * @author assaduzzaman.sohan
 * @since 22-01-2020
 */
public class LoanDocumentService extends AbstractService<LoanDocument> {
	private static Logger log = LogManager.getLogger(LoanDocumentService.class);

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
				LoanDocument loanDoc = insert(msg);
				msgResponse = MessageBuilder.withPayload(loanDoc).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.UPDATE.toString())) {
				LoanDocument loanDoc = update(msg);
				msgResponse = MessageBuilder.withPayload(loanDoc).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DELETE.toString())) {
				LoanDocument loanDoc = delete(msg);
				msgResponse = MessageBuilder.withPayload(loanDoc).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT.toString())) {
				List<LoanDocument> loanDoc = select(msg);
				msgResponse = MessageBuilder.withPayload(loanDoc).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_DOC_FOR_EXISTING_LOAN.toString())) {
				msgResponse = MessageBuilder.withPayload(selectDocForExistingLoan(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_LOAN_ALL_DOCUMENT.toString())) {
				msgResponse = MessageBuilder.withPayload(selectLoanAllDocument(msg, action)).copyHeadersIfAbsent(msgHeader).build();
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

	private List<LoanDocument> selectCibStatusDoc(Message<List<LoanDocument>> msg, String action) throws Exception {
		LoanDocument loanDoc = msg.getPayload().get(0);
		List<LoanDocument> loanDocList = selectLoanDocument(loanDoc, ActionType.SELECT_CIB_STATUS_DOC.toString());
		return loanDocList;
	}

	private List<LoanDocument> selectLoanAllDocument(Message<List<LoanDocument>> msg, String action) throws Exception {
		LoanDocument loanDoc = msg.getPayload().get(0);

		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_LOAN_DOCUMENT.toString(), action,
		        JdbcService.createSqlMap(loanDoc, LoanDocument.getSql2BeanMap()), getJdbcService());

		List<LoanDocument> loanDocList = JdbcUtils.mapRows(LoanDocument.class, LoanDocument.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_DOCUMENT.toString()));

		return loanDocList;
	}

	private List<LoanDocument> selectDocForExistingLoan(Message<List<LoanDocument>> msg, String action) throws Exception {
		LoanDocument loanDoc = msg.getPayload().get(0);

		JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_LOAN_DOCUMENT.toString(), action,
		        JdbcService.createSqlMap(loanDoc, LoanDocument.getSql2BeanMap()), getJdbcService());

		List<LoanDocument> loanDocListExist = JdbcUtils.mapRows(LoanDocument.class, LoanDocument.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_DOCUMENT_EXIST.toString()));

		List<LoanDocument> loanDocListNew = JdbcUtils.mapRows(LoanDocument.class, LoanDocument.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_DOCUMENT_NEW.toString()));

		loanDocListExist.addAll(loanDocListNew);

		return loanDocListExist;
	}

	private List<LoanDocument> select(Message<List<LoanDocument>> msg) throws Exception {
		LoanDocument loanDoc = msg.getPayload().get(0);
		return doSelect(loanDoc);
	}

	private LoanDocument delete(Message<List<LoanDocument>> msg) throws Exception {
		LoanDocument loanDoc = msg.getPayload().get(0);
		return doDelete(loanDoc);
	}

	private LoanDocument update(Message<List<LoanDocument>> msg) throws Exception {
		LoanDocument loanDoc = msg.getPayload().get(0);
		return doUpdate(loanDoc);
	}

	private LoanDocument insert(Message<List<LoanDocument>> msg) throws Exception {
		LoanDocument loanDoc = msg.getPayload().get(0);
		return doInsert(loanDoc);
	}

	public List<LoanDocument> doSelect(LoanDocument loanDoc) throws Exception {
		return selectLoanDocument(loanDoc, ActionType.SELECT.toString());
	}

	public LoanDocument doDelete(LoanDocument loanDoc) throws Exception {
		return execute(loanDoc, ActionType.DELETE.toString());
	}

	public LoanDocument doUpdate(LoanDocument loanDoc) throws Exception {
		return execute(loanDoc, ActionType.UPDATE.toString());
	}

	public LoanDocument doInsert(LoanDocument loanDoc) throws Exception {
		return execute(loanDoc, ActionType.NEW.toString());
	}

	public LoanDocument doExecute(LoanDocument loanDoc, String action) throws Exception {
		return execute(loanDoc, action);
	}

	private LoanDocument execute(LoanDocument loanDoc, String action) throws Exception {

		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_LOAN_DOCUMENT.toString(), action,
			        JdbcService.createSqlMap(loanDoc, LoanDocument.getSql2BeanMap()), getJdbcService());

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_loan_doc_key") != null) {
				loanDoc.setLoanDocId(Integer.parseInt(outputMap.get("@id_loan_doc_key").toString()));
			}
		}
		catch (Exception e) {
			log.error("Error inserting comment, [{}] \n [{}]", loanDoc.toString(), e);
			throw e;
		}

		return loanDoc;

	}

	private List<LoanDocument> selectLoanDocument(LoanDocument loanDoc, String action) throws Exception {
		List<LoanDocument> loanDocList = new ArrayList<>();
		try {
			JdbcResult jdbcResult = DbExecutor.execute(SPName.ACT_LOAN_DOCUMENT.toString(), action,
			        JdbcService.createSqlMap(loanDoc, LoanDocument.getSql2BeanMap()), getJdbcService());
			loanDocList = JdbcUtils.mapRows(LoanDocument.class, LoanDocument.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_DOCUMENT.toString()));

		}
		catch (Exception e) {
			log.error("Exception getting loan document [{}]", e);
			throw e;
		}

		return loanDocList;
	}

	public String saveDocumentFile(MultipartFile file, LoanDocument loanDoc, String docTrack) {
		try {

			String loanId = loanDoc.getLoanId() == null ? null : loanDoc.getLoanId().toString();
			if (loanId == null) return null;

			String fileName = builtFileName(loanDoc.getDocType(), FilenameUtils.getExtension(file.getOriginalFilename()));
			String dest = saveFile(file, fileName, loanId);			
			
			loanDoc.setDocName(fileName);
			loanDoc.setDocPath(dest);
			loanDoc.setDownloadLink(dest + fileName);
			loanDoc.setFilePresent(1);
			loanDoc.setUploadStatus(1);			
		  //  loanExecute(loanDoc, ActionType.CIB_STATUS_UPLAOD_UPDATE.toString());

			if (docTrack.matches(Str.CIB_STATUS)) {
				execute(loanDoc, ActionType.NEW_CIB_STATUS.toString());
			}
			else if (docTrack.matches(Str.MOBILE_VIEW)) {
				execute(loanDoc, ActionType.NEW_MOBILE_VIEW.toString());
			}
			else {
				if (loanDoc.getLoanDocId() == null) {
					doInsert(loanDoc);
				}
				else {
					doUpdate(loanDoc);
				}
			}
		}
		catch (Exception e) {
			log.error("Exception saving loan document file [{}]", e);
		}
		return "success";
	}

	private String saveFile(MultipartFile multipartFile, String fileName, String loanId) throws Exception {
		String destination;
		try {
			NConfiguration config = NConfigUtils.getConfig(Str.STR_LOAN.toString(), Str.STR_DOCUMENT.toString(), Str.STR_BASE_PATH.toString());

			String dest = config.getValue1();
			int len = dest.length();

			StringBuilder sb = new StringBuilder(dest);

			if (dest.substring(len - 2, len).equals(STR_DBL_BACK_SLASH)) {
				sb.append(loanId).append(File.separator);
			}
			else if (dest.substring(len - 1, len).equals(STR_BACK_SLASH)) {
				sb.append(loanId).append(File.separator).append(loanId).append(File.separator);
			}
			else {
				sb.append(File.separator).append(loanId).append(File.separator);
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
			log.error("Exception saving loan document file [{}]", e);
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

	public String getDownloadLinkOfDoc(Integer loanDocId, Integer userModKey) {

		LoanDocument loanDoc = new LoanDocument();
		loanDoc.setLoanDocId(loanDocId);
		loanDoc.setUserModKey(userModKey);

		try {
			List<LoanDocument> loanDocList = doSelect(loanDoc);
			if (loanDocList == null || loanDocList.size() == 0) return null;

			return loanDocList.get(0).getDownloadLink();
		}
		catch (Exception e) {
			log.error("Exception getting data from Loan Document [{}]", e);
			return null;
		}
	}

	public String getLinkOfDoc(Integer loanId, Integer userModKey, String docType) {

		LoanDocument loanDoc = new LoanDocument();
		loanDoc.setLoanId(loanId);
		loanDoc.setUserModKey(userModKey);
		loanDoc.setDocType(docType);

		try {
			List<LoanDocument> loanDocList = selectLoanDocument(loanDoc, ActionType.SELECT_DOC_BY_LOAN_ID_DOC_TYPE.toString());
			if (loanDocList == null || loanDocList.size() == 0) return null;

			return loanDocList.get(0).getDownloadLink();
		}
		catch (Exception e) {
			log.error("Exception getting data from Loan Document [{}]", e);
			return null;
		}
	}
	private void loanExecute(LoanDocument loanDoc, String action) throws Exception {
		Loan loan = new Loan();
		loan.setLoanId(loanDoc.getLoanId());
		loan.setUserModKey(loanDoc.getUserModKey());
		loan.setCibLink(loanDoc.getDownloadLink());
		JdbcResult jdbcResult = new JdbcResult();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);
			
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}
}
