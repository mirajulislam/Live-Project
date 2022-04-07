package com.naztech.lms.creditCard.service;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.transaction.TransactionStatus;
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
import com.naztech.lms.creditCard.model.AcquisitionApplicantDetails;
import com.naztech.lms.creditCard.model.AcquisitionDetailsConfig;
import com.naztech.lms.creditCard.model.CreditCard;
import com.naztech.lms.creditCard.model.Document;
import com.naztech.lms.creditCard.model.SupplementAndReferDetails;
import com.naztech.lms.model.Customer;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRResultSetDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;

/**
 * @author Mirajul.islam
 */
@PropertySource("classpath:app.properties")
public class AcquisitionApplicantDetailsService extends AbstractService<AcquisitionApplicantDetails> {
	private static Logger log = LogManager.getLogger(AcquisitionApplicantDetailsService.class);
	DateFormat dateFormatFull = new SimpleDateFormat("yyyy-MM-dd");
	@Autowired
	JdbcService jdbcService;
	@Autowired
	private SupplementAndReferDetailsService supplementAndReferDetailsService;
	@Autowired
	private DocumentService documentService;
	@Autowired
	private AcquisitionDetailsConfigService acquisitionDetailsConfigService;
	@Value("${dynamic.acquisiton.from.insert.mode}")
	private boolean acquisitonMode;

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
				AcquisitionApplicantDetails acquisitionApplicantDetails = handleSaveApplicantDetails(msg, action);
				msgResponse = MessageBuilder.withPayload(acquisitionApplicantDetails).copyHeadersIfAbsent(msgHeader)
						.build();
			} else if (action.equals(ActionType.UPDATE.toString())) {
				AcquisitionApplicantDetails acquisitionApplicantDetails = handleUpdateApplicantDetails(msg, action);
				msgResponse = MessageBuilder.withPayload(acquisitionApplicantDetails).copyHeadersIfAbsent(msgHeader)
						.build();
			} else if (action.equals(ActionType.DELETE.toString())) {
				msgResponse = MessageBuilder.withPayload(handleDeleteApplicantDetails(msg, action))
						.copyHeadersIfAbsent(msgHeader).build();
			} else if (action.equals(ActionType.ACTION_TYPE_SELECT_FULL_APPLICANT_DETAILS.toString())) {
				AcquisitionApplicantDetails acquisitionApplicantDetails = handleSelectFullApplicantDetails(msg, action);
				msgResponse = MessageBuilder.withPayload(acquisitionApplicantDetails).copyHeadersIfAbsent(msgHeader)
						.build();
			} else if (action.equals(ActionType.ACTION_TYPE_SELECT_ACQUISITION_DATA.toString())) {
				List<AcquisitionApplicantDetails> acquisitionList = selectAcquisitionListData(msg, action);
				msgResponse = MessageBuilder.withPayload(acquisitionList).copyHeadersIfAbsent(msgHeader).build();
			} else {
				throw new Exception("Unknown action " + action);
			}
		} catch (Exception ex) {
			log.error("Error {}", ex);
			throw ex;
		}

		return msgResponse;
	}

	private List<AcquisitionApplicantDetails> selectAcquisitionListData(Message<List<AcquisitionApplicantDetails>> msg,
			String action) throws Exception {
		List<AcquisitionApplicantDetails> acquisitionList = msg.getPayload();
		String source = msg.getHeader().getSource();
		log.info("Request Application Source: {}", source);
		if (acquisitionList == null || acquisitionList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doSelectAcquisitionData(acquisitionList.get(0), action);
	}

	private List<AcquisitionApplicantDetails> doSelectAcquisitionData(
			AcquisitionApplicantDetails acquisitionApplicantDetails, String action) throws Exception {

		try {

			JdbcResult jdbcResult = selectSingle(acquisitionApplicantDetails, action,
					SPName.ACT_CREDIT_CARD.toString());
			List<AcquisitionApplicantDetails> aquisitionList = JdbcUtils.mapRows(AcquisitionApplicantDetails.class,
					AcquisitionApplicantDetails.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_ACQUISITION_DATA.toString()));
			return aquisitionList;
		} catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}

	public CreditCard dynamicInsertAcquisitionFormDetails(CreditCard card) throws Exception {
		JdbcResult jdbcResult = selectCreditCardInfo(card, ActionType.SELECT_ACQUISITION_DETAILS.toString(),
				SPName.ACT_acquisition_applicant_details.toString());
		List<AcquisitionApplicantDetails> acquisitionList = JdbcUtils.mapRows(AcquisitionApplicantDetails.class,
				AcquisitionApplicantDetails.getRs2BeanMap(),
				jdbcResult.getRsTypeMap(RSType.RS_TYPE_SELECT_ACQUISITION_DETAILS.toString()));
		if (acquisitonMode && acquisitionList.size() < 1) {
			log.info("Dynamic credit card acquisition form insert data mode: [{}] and credit card id: [{}]",
					acquisitonMode, card.getCreditCardId());
			card = doInsertApplicantDetails(card, ActionType.SELECT_CREDIT_CARD_DETAILS.toString());
		} else {
			log.info("Dynamic credit card acquisition form insert data mode: [{}] and credit card id: [{}]",
					acquisitonMode, card.getCreditCardId());
		}
		return card;
	}

	private CreditCard doInsertApplicantDetails(CreditCard card, String actionType) throws Exception {
		AcquisitionApplicantDetails acquisitionApplicantDetails;

		JdbcResult jdbcResult = selectCreditCardInfo(card, actionType, SPName.ACT_CREDIT_CARD.toString());
		List<CreditCard> cardDetailsList = JdbcUtils.mapRows(CreditCard.class, CreditCard.getRs2BeanMap(),
				jdbcResult.getRsTypeMap(RSType.RS_TYPE_CREDIT_CARD_DETAILS.toString()));
		List<Customer> custDataList = JdbcUtils.mapRows(Customer.class, Customer.getRs2BeanMap(),
				jdbcResult.getRsTypeMap(RSType.RS_TYPE_CUSTOMER.toString()));
		if (cardDetailsList != null && cardDetailsList.size() > 0) {
			log.info("Card details search and retrun details[{}]", cardDetailsList.get(0).toString());
			card = cardDetailsList.get(0);
			if (custDataList.get(0) != null && custDataList.size() > 0) {
				card.setCustomer(custDataList.get(0));
			}
			// set customer and card details in acquisition form
			acquisitionApplicantDetails = setAcquisitonFormData(card);
			// check this card acquisition form create or not... if create then always
			// update...
			doHandleSaveApplicant(acquisitionApplicantDetails, ActionType.NEW.toString());

		} else {
			log.info("Acquisition Form insert time Card details search and retrun empty details");
			log.info("ActionType: [{}]  Credit card ID :[{}]", actionType, card.getCreditCardId());
		}

		return card;
	}

	private AcquisitionApplicantDetails setAcquisitonFormData(CreditCard card) {
		AcquisitionApplicantDetails acquisition = new AcquisitionApplicantDetails();
		SupplementAndReferDetails supplement = new SupplementAndReferDetails();
		acquisition.setUserModKey(card.getUserModKey());
		acquisition.setApplicantAccountNumber(card.getAccountNo());
		acquisition.setApplicantNidNumber(card.getCustomer().getNid());
		acquisition.setApplicantApplyingFor(Str.STR_CREDIT_CARD.toString());
		acquisition.setApplicantTypeOfCard(card.getCreditCardType());
		acquisition.setApplicantName(card.getCustomer().getCustomerName());
		acquisition.setApplicantNameInBangla(card.getCustomer().getBanglaNameOfBorrower());
		acquisition.setApplicantDateOfBirth(card.getCustomer().getDateOfBirth());
		acquisition.setApplicantEtinNumber(card.getCustomer().getTin());
		acquisition.setApplicantBpNumber(card.getCustomer().getBpNo());
		acquisition.setApplicantMobileNumber(card.getCustomer().getMobile());
		acquisition.setApplicantFatherName(card.getCustomer().getFatherName());
		acquisition.setApplicantMotherName(card.getCustomer().getMotherName());
		acquisition.setApplicantSpouseName(card.getCustomer().getSpouse());
		acquisition.setApplicantDesignation(card.getCustomer().getDesignation());
		acquisition.setApplicantMaritalStatus(card.getCustomer().getMaritalStatus());
		acquisition.setCardStateName(card.getStateName());
		acquisition.setCardStateId(card.getStateId());
		acquisition.setCreditCardId(card.getCreditCardId());
		acquisition.setCreatorId(card.getUserModKey());
		acquisition.setApplicantNameOnCard(card.getNameOfCard());
		acquisition.setApplicantMobileNo(card.getCustomer().getMobile());
		acquisition.setApplicantPerAddress(card.getCustomer().getPermanentAddr());

		supplement.setUserModKey(card.getUserModKey());
		supplement.setRefName(card.getReferenceName());
		supplement.setRefRelationWithApplicant(card.getRelationShipWithApplicant());
		supplement.setRefProfession(card.getReferProfesion());
		supplement.setRefOrgName(card.getReferenceNameOfOrganization());
		supplement.setRefDesignation(card.getReferenceDesignation());
		supplement.setRefWorkOrResidenceAddress(card.getReferenceWorkAndResidenceAddress());
		supplement.setRefTelephone(card.getReferenceTelephone());
		supplement.setRefMobile(card.getReferenceMobile());
		supplement.setRefEmail(card.getReferenceEmail());
		acquisition.setSupplementAndReferDetails(supplement);
		return acquisition;
	}

	private JdbcResult selectCreditCardInfo(CreditCard card, String actionType, String sp) throws Exception {
		try {
			JdbcResult jdbcResult = new JdbcResult();
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(card, CreditCard.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(sp);
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);
			return jdbcService.executeSP(actionType, sp, spArgsMap, jdbcResult);
		} catch (Exception e) {
			log.error("Exception getting card [{}]", e);
			throw e;
		}
	}

	private AcquisitionApplicantDetails handleSelectFullApplicantDetails(Message<List<AcquisitionApplicantDetails>> msg,
			String action) throws Exception {
		List<AcquisitionApplicantDetails> applicantList = msg.getPayload();
		if (applicantList == null || applicantList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return dohandleSelectFullApplicantDetails(applicantList.get(0), action);
	}

	private AcquisitionApplicantDetails dohandleSelectFullApplicantDetails(
			AcquisitionApplicantDetails acquisitionApplicantDetails, String action) throws Exception {

		try {

			JdbcResult jdbcResult = selectSingle(acquisitionApplicantDetails, action,
					SPName.ACT_acquisition_applicant_details.toString());
			List<AcquisitionApplicantDetails> applicantDataList = JdbcUtils.mapRows(AcquisitionApplicantDetails.class,
					AcquisitionApplicantDetails.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_APPLICANT_DETAILS.toString()));

			List<SupplementAndReferDetails> applicantSupplReferDataList = JdbcUtils.mapRows(
					SupplementAndReferDetails.class, SupplementAndReferDetails.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_APPLICANT_SUPPLEMENT_REFER_DETAILS.toString()));

			List<AcquisitionDetailsConfig> previousOrganizationgData = JdbcUtils.mapRows(AcquisitionDetailsConfig.class,
					AcquisitionDetailsConfig.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_PREVIOUS_ORGANIZATION_DETAILS.toString()));

			List<AcquisitionDetailsConfig> OtherBankData = JdbcUtils.mapRows(AcquisitionDetailsConfig.class,
					AcquisitionDetailsConfig.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_OTHER_BANK_DETAILS.toString()));

			List<AcquisitionDetailsConfig> bankLiabilityPositionData = JdbcUtils.mapRows(AcquisitionDetailsConfig.class,
					AcquisitionDetailsConfig.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_BANK_LIABILITY_POSTION.toString()));

			List<AcquisitionDetailsConfig> securityData = JdbcUtils.mapRows(AcquisitionDetailsConfig.class,
					AcquisitionDetailsConfig.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_SECURITY_DETAILS.toString()));

			List<AcquisitionDetailsConfig> companyUnderOwnerShipData = JdbcUtils.mapRows(AcquisitionDetailsConfig.class,
					AcquisitionDetailsConfig.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_COMPANIES_UNDER_OWNER_SHIP.toString()));
			List<Document> cardDocList = JdbcUtils.mapRows(Document.class, Document.getRs2BeanMap(),
					jdbcResult.getRsTypeMap(RSType.RS_TYPE_CARD_DOCUMENT.toString()));

			if (applicantDataList != null && applicantDataList.size() > 0) {
				acquisitionApplicantDetails = applicantDataList.get(0);
				if (applicantSupplReferDataList != null && applicantSupplReferDataList.size() > 0) {
					acquisitionApplicantDetails.setSupplementAndReferDetails(applicantSupplReferDataList.get(0));
				}
				acquisitionApplicantDetails.setPriviousOrganizationDetails(previousOrganizationgData);
				acquisitionApplicantDetails.setOthersBankLiabilityPosition(bankLiabilityPositionData);
				acquisitionApplicantDetails.setAboutOtherBankDetails(OtherBankData);
				acquisitionApplicantDetails.setSecurityDetails(securityData);
				acquisitionApplicantDetails.setCompaniesUderOwnership(companyUnderOwnerShipData);
				acquisitionApplicantDetails.setApplicantDocumentList(cardDocList);
			}
		} catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return acquisitionApplicantDetails;
	}

	private JdbcResult selectSingle(AcquisitionApplicantDetails acquisitionApplicantDetails, String action, String sp)
			throws Exception {
		try {
			JdbcResult jdbcResult = new JdbcResult();
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(acquisitionApplicantDetails,
					AcquisitionApplicantDetails.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(sp);
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);
			return jdbcService.executeSP(action, sp, spArgsMap, jdbcResult);
		} catch (Exception e) {
			log.error("Exception getting card [{}]", e);
			throw e;
		}
	}

	private AcquisitionApplicantDetails handleDeleteApplicantDetails(Message<List<AcquisitionApplicantDetails>> msg,
			String action) throws Exception {
		List<AcquisitionApplicantDetails> applicantList = msg.getPayload();
		if (applicantList == null || applicantList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleDeleteApplicant(applicantList.get(0), action);
	}

	private AcquisitionApplicantDetails doHandleDeleteApplicant(AcquisitionApplicantDetails acquisitionApplicantDetails,
			String action) {
		// TODO Auto-generated method stub
		return null;
	}

	private AcquisitionApplicantDetails handleUpdateApplicantDetails(Message<List<AcquisitionApplicantDetails>> msg,
			String action) throws Exception {
		List<AcquisitionApplicantDetails> applicantList = msg.getPayload();
		if (applicantList == null || applicantList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleUpdateApplicant(applicantList.get(0), action);
	}

	private AcquisitionApplicantDetails doHandleUpdateApplicant(AcquisitionApplicantDetails acquisitionApplicant,
			String action) throws Exception {
		log.info("Update Acquisition applicant with action[{}], [{}]", action, acquisitionApplicant.toString());
		TransactionStatus txnStatus = null;
		try {

			SupplementAndReferDetails supplementAndReferDetails = supplementAndReferDetailsService
					.doHandleUpdateSupplement(acquisitionApplicant.getSupplementAndReferDetails(),
							ActionType.UPDATE.toString());
			acquisitionApplicant.setIdSupplementAndReferKey(supplementAndReferDetails.getIdSupplementAndReferKey());
			txnStatus = getJdbcService().beginTran();

			acquisitionApplicant = excuteApplicant(acquisitionApplicant, action);

			List<AcquisitionDetailsConfig> priviousOrganizationDetailsList = acquisitionApplicant
					.getPriviousOrganizationDetails();
			List<AcquisitionDetailsConfig> othersBankLiabilityPositionList = acquisitionApplicant
					.getOthersBankLiabilityPosition();
			List<AcquisitionDetailsConfig> aboutOtherBankDetailsList = acquisitionApplicant.getAboutOtherBankDetails();
			List<AcquisitionDetailsConfig> securityDetailsList = acquisitionApplicant.getSecurityDetails();
			List<AcquisitionDetailsConfig> companiesUderOwnershipList = acquisitionApplicant
					.getCompaniesUderOwnership();

			if (priviousOrganizationDetailsList != null) {
				for (AcquisitionDetailsConfig priviousOrganizationDetails : priviousOrganizationDetailsList) {
					if (priviousOrganizationDetails.getAcquisitionDetailsConfigId() == null) {
						priviousOrganizationDetails
								.setIdAcquisitionApplicantKey(acquisitionApplicant.getIdAcquisitionApplicantKey());
						acquisitionDetailsConfigService.insert(priviousOrganizationDetails);
					} else {
						acquisitionDetailsConfigService.update(priviousOrganizationDetails);
					}
				}
			}

			if (aboutOtherBankDetailsList != null) {
				for (AcquisitionDetailsConfig aboutOtherBankDetails : aboutOtherBankDetailsList) {
					if (aboutOtherBankDetails.getAcquisitionDetailsConfigId() == null) {
						aboutOtherBankDetails
								.setIdAcquisitionApplicantKey(acquisitionApplicant.getIdAcquisitionApplicantKey());
						acquisitionDetailsConfigService.insert(aboutOtherBankDetails);
					} else {
						acquisitionDetailsConfigService.update(aboutOtherBankDetails);
					}
				}
			}

			if (othersBankLiabilityPositionList != null) {
				for (AcquisitionDetailsConfig othersBankLiabilityPosition : othersBankLiabilityPositionList) {
					if (othersBankLiabilityPosition.getAcquisitionDetailsConfigId() == null) {
						othersBankLiabilityPosition
								.setIdAcquisitionApplicantKey(acquisitionApplicant.getIdAcquisitionApplicantKey());
						acquisitionDetailsConfigService.insert(othersBankLiabilityPosition);
					} else {
						acquisitionDetailsConfigService.update(othersBankLiabilityPosition);
					}
				}
			}

			if (securityDetailsList != null) {
				for (AcquisitionDetailsConfig securityDetails : securityDetailsList) {
					if (securityDetails.getAcquisitionDetailsConfigId() == null) {
						securityDetails
								.setIdAcquisitionApplicantKey(acquisitionApplicant.getIdAcquisitionApplicantKey());
						acquisitionDetailsConfigService.insert(securityDetails);
					} else {
						acquisitionDetailsConfigService.update(securityDetails);
					}
				}
			}

			if (companiesUderOwnershipList != null) {
				for (AcquisitionDetailsConfig companiesUderOwnership : companiesUderOwnershipList) {
					if (companiesUderOwnership.getAcquisitionDetailsConfigId() == null) {
						companiesUderOwnership
								.setIdAcquisitionApplicantKey(acquisitionApplicant.getIdAcquisitionApplicantKey());
						acquisitionDetailsConfigService.insert(companiesUderOwnership);
					} else {
						acquisitionDetailsConfigService.update(companiesUderOwnership);
					}
				}
			}
			getJdbcService().commitTran(txnStatus);
			return acquisitionApplicant;

		} catch (Exception e) {
			log.error("Exception: ", e);
			if (txnStatus != null) {
				getJdbcService().rollbackTran(txnStatus);
			}
			throw e;
		}
	}

	public AcquisitionApplicantDetails handleInitiateAcquisitionApplicant(String action,
			AcquisitionApplicantDetails acquisitionApplicantDetails, MultipartFile[] files) {
		log.debug("Handling initial acquisition ApplicantDetails  [{}]", acquisitionApplicantDetails.toString());
		log.debug("Handling initial acquisition ApplicantDetails  [{}]", acquisitionApplicantDetails.toString());
		List<Document> docList = acquisitionApplicantDetails.getApplicantDocumentList();
		acquisitionApplicantDetails.setApplicantDocumentList(null);
		Integer idAcquisitionApplicantKey = null;

		try {
			if (acquisitionApplicantDetails.getIdAcquisitionApplicantKey() == null) {
				log.debug("Saving initial acquisition Applicant");
				log.info("Saving initial Card");
				AcquisitionApplicantDetails acquisitionSave = doHandleSaveApplicant(acquisitionApplicantDetails,
						action);
				idAcquisitionApplicantKey = acquisitionSave.getIdAcquisitionApplicantKey();
				acquisitionApplicantDetails.setIdAcquisitionApplicantKey(idAcquisitionApplicantKey);
			} else {
				log.debug("Updating initial acquisition Applicant");
				log.info("Updating initial acquisition Applicant");
				doHandleUpdateApplicant(acquisitionApplicantDetails, action);
				idAcquisitionApplicantKey = acquisitionApplicantDetails.getIdAcquisitionApplicantKey();
			}
			for (MultipartFile file : files) {
				if (!file.isEmpty()) {
					Document acquisitionDoc = getCardDocormDocName(file.getOriginalFilename(), docList);
					if (acquisitionDoc != null) {
						acquisitionDoc.setRefKey(acquisitionApplicantDetails.getCreditCardId());
						acquisitionDoc.setUserModKey(acquisitionApplicantDetails.getUserModKey());
						documentService.saveCardDocumentFile(file, acquisitionDoc, Str.MOBILE_VIEW);
					}
				}
			}
			for (Document cardDoc : docList) {
				cardDoc.setRefKey(acquisitionApplicantDetails.getCreditCardId());
				cardDoc.setUserModKey(acquisitionApplicantDetails.getUserModKey());
				documentService.doExecute(cardDoc, ActionType.NEW_MOBILE_VIEW.toString());
			}
		} catch (Exception e) {
			log.error("Exception processing card with file request, [{}]", e);
		}
		return acquisitionApplicantDetails;
	}

	private AcquisitionApplicantDetails handleSaveApplicantDetails(Message<List<AcquisitionApplicantDetails>> msg,
			String action) throws Exception {
		List<AcquisitionApplicantDetails> applicantList = msg.getPayload();
		if (applicantList == null || applicantList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleSaveApplicant(applicantList.get(0), action);
	}

	private AcquisitionApplicantDetails doHandleSaveApplicant(AcquisitionApplicantDetails acquisitionApplicant,
			String action) throws Exception {
		log.info("Saving Acquisition applicant Application with action[{}], [{}]", action,
				acquisitionApplicant.toString());
		TransactionStatus txnStatus = null;
		try {
			SupplementAndReferDetails supplementAndReferDetails = supplementAndReferDetailsService
					.insertSupplement(acquisitionApplicant.getSupplementAndReferDetails());
			acquisitionApplicant.setIdSupplementAndReferKey(supplementAndReferDetails.getIdSupplementAndReferKey());
			txnStatus = getJdbcService().beginTran();

			acquisitionApplicant = excuteApplicant(acquisitionApplicant, action);

			List<AcquisitionDetailsConfig> priviousOrganizationDetailsList = acquisitionApplicant
					.getPriviousOrganizationDetails();
			List<AcquisitionDetailsConfig> othersBankLiabilityPositionList = acquisitionApplicant
					.getOthersBankLiabilityPosition();
			List<AcquisitionDetailsConfig> aboutOtherBankDetailsList = acquisitionApplicant.getAboutOtherBankDetails();
			List<AcquisitionDetailsConfig> securityDetailsList = acquisitionApplicant.getSecurityDetails();
			List<AcquisitionDetailsConfig> companiesUderOwnershipList = acquisitionApplicant
					.getCompaniesUderOwnership();

			if (priviousOrganizationDetailsList != null) {
				for (AcquisitionDetailsConfig priviousOrganizationDetails : priviousOrganizationDetailsList) {
					if (priviousOrganizationDetails.getAcquisitionDetailsConfigId() == null) {
						priviousOrganizationDetails
								.setIdAcquisitionApplicantKey(acquisitionApplicant.getIdAcquisitionApplicantKey());
						acquisitionDetailsConfigService.insert(priviousOrganizationDetails);
					} else {
						acquisitionDetailsConfigService.update(priviousOrganizationDetails);
					}
				}
			}

			if (aboutOtherBankDetailsList != null) {
				for (AcquisitionDetailsConfig aboutOtherBankDetails : aboutOtherBankDetailsList) {
					if (aboutOtherBankDetails.getAcquisitionDetailsConfigId() == null) {
						aboutOtherBankDetails
								.setIdAcquisitionApplicantKey(acquisitionApplicant.getIdAcquisitionApplicantKey());
						acquisitionDetailsConfigService.insert(aboutOtherBankDetails);
					} else {
						acquisitionDetailsConfigService.update(aboutOtherBankDetails);
					}
				}
			}

			if (othersBankLiabilityPositionList != null) {
				for (AcquisitionDetailsConfig othersBankLiabilityPosition : othersBankLiabilityPositionList) {
					if (othersBankLiabilityPosition.getAcquisitionDetailsConfigId() == null) {
						othersBankLiabilityPosition
								.setIdAcquisitionApplicantKey(acquisitionApplicant.getIdAcquisitionApplicantKey());
						acquisitionDetailsConfigService.insert(othersBankLiabilityPosition);
					} else {
						acquisitionDetailsConfigService.update(othersBankLiabilityPosition);
					}
				}
			}

			if (securityDetailsList != null) {
				for (AcquisitionDetailsConfig securityDetails : securityDetailsList) {
					if (securityDetails.getAcquisitionDetailsConfigId() == null) {
						securityDetails
								.setIdAcquisitionApplicantKey(acquisitionApplicant.getIdAcquisitionApplicantKey());
						acquisitionDetailsConfigService.insert(securityDetails);
					} else {
						acquisitionDetailsConfigService.update(securityDetails);
					}
				}
			}

			if (companiesUderOwnershipList != null) {
				for (AcquisitionDetailsConfig companiesUderOwnership : companiesUderOwnershipList) {
					if (companiesUderOwnership.getAcquisitionDetailsConfigId() == null) {
						companiesUderOwnership
								.setIdAcquisitionApplicantKey(acquisitionApplicant.getIdAcquisitionApplicantKey());
						acquisitionDetailsConfigService.insert(companiesUderOwnership);
					} else {
						acquisitionDetailsConfigService.update(companiesUderOwnership);
					}
				}
			}
			getJdbcService().commitTran(txnStatus);
			return acquisitionApplicant;
		} catch (Exception e) {
			log.error("Exception: ", e);
			if (txnStatus != null) {
				getJdbcService().rollbackTran(txnStatus);
			}
			throw e;
		}
	}

	private AcquisitionApplicantDetails excuteApplicant(AcquisitionApplicantDetails acquisitionApplicant, String action)
			throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(acquisitionApplicant,
					AcquisitionApplicantDetails.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService
					.getJdbcStoredProcedure(SPName.ACT_acquisition_applicant_details.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_acquisition_applicant_details.toString(), spArgsMap,
					jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			if (outputMap.get("@id_acquisition_applicant_key") != null) {
				acquisitionApplicant.setIdAcquisitionApplicantKey(
						Integer.parseInt(outputMap.get("@id_acquisition_applicant_key").toString()));
			}
		} catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return acquisitionApplicant;
	}

	private Document getCardDocormDocName(String filename, List<Document> cardDocumentList) {
		for (Document cardDoc : cardDocumentList) {
			if (cardDoc.getDocName() != null && cardDoc.getDocName().equals(filename)) {
				Document cardDocument = cardDoc;
				cardDocumentList.remove(cardDoc);
				return cardDocument;
			}
		}
		return null;
	}

	public JasperPrint getJasperPrintForAcquisitionReport(HttpServletRequest request) throws Exception {
		Integer userId = Integer.parseInt(request.getParameter("userId"));
		String userName = request.getParameter("username");
		Date reportGenDate = new Date();
		DateFormat dateFormat = new SimpleDateFormat("dd MMM, yyyy HH:mm:ss a");
		JasperDesign jasperDesign;
		JasperPrint jasperPrint = null;
		JasperReport jasperReport;
		String[] idList = request.getParameterValues("idList");

		InputStream template = null;
		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();
		AcquisitionApplicantDetails acquisitionDetails = new AcquisitionApplicantDetails();
		for (int i = 0; i < idList.length; i++) {
			acquisitionDetails.setCreditCardId(Integer.parseInt(idList[i]));
			acquisitionDetails.setUserModKey(userId);
		}
		spArgsMap = getAcquisitionMap(request, acquisitionDetails);
		spArgsMap.put("tx_user_name", userName);
		spArgsMap.put("@id_user_mod_key", userId);
		spArgsMap.put("genDateTime", dateFormat.format(reportGenDate).toString());
		log.info("Acqusition Report View");
		try {
			template = getClass().getResourceAsStream(Str.ACQUISITION_REPORT_SHEET.toString());
			jasperDesign = JRXmlLoader.load(template);
			jasperReport = JasperCompileManager.compileReport(jasperDesign);
			jasperPrint = JasperFillManager.fillReport(jasperReport, spArgsMap, new JREmptyDataSource());
			log.info("Acqusition details report");
		} catch (Exception ex) {
			log.error("Acqusition Report Error : {}", ex.getLocalizedMessage());

			throw ex;
		}
		return jasperPrint;
	}

	private Map<String, Object> getAcquisitionMap(HttpServletRequest request,
			AcquisitionApplicantDetails acquisitionDetails) throws Exception {
		Integer userId = Integer.parseInt(request.getParameter("userId"));
		String userName = request.getParameter("username");
		Date reportGenDate = new Date();
		DateFormat dateFormat = new SimpleDateFormat("dd MMM, yyyy HH:mm:ss a");
		JdbcResult jdbcResult = new JdbcResult();
		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();
		String actionType = ActionType.ACTION_TYPE_ACQUISITION_REPORT_DETAILS.toString();
		spArgsMap.put("tx_user_name", userName);
		spArgsMap.put("@id_user_mod_key", userId);
		spArgsMap.put("genDateTime", dateFormat.format(reportGenDate).toString());
		log.info("Acqusition Report data Capture");
		try {
			log.info("Acquisition report Id: [{}]", acquisitionDetails.getCreditCardId());
			jdbcResult = selectSingle(acquisitionDetails, actionType,
					SPName.ACT_acquisition_applicant_details.toString());
			log.info("Acquisition Data capture db call ok");
			ResultSet rsCibInquiry = jdbcResult.getRsTypeMap(RSType.RS_TYPE_CIB_INQUIRY.toString());
			ResultSet rs_your_self_applicant_details = jdbcResult
					.getRsTypeMap(RSType.RS_TYPE_YOURSELF_APPLICANT_DETAILS.toString());
			ResultSet rs_about_your_work = jdbcResult.getRsTypeMap(RSType.RS_TYPE_ABOUT_YOUR_WORK.toString());
			ResultSet rs_applicant_residence = jdbcResult.getRsTypeMap(RSType.RS_TYPE_APPLICANT_RESIDENCE.toString());
			ResultSet dsPreviousOrganizationDetails = jdbcResult
					.getRsTypeMap(RSType.RS_TYPE_PREVIOUS_ORGANIZATION_DETAILS.toString());
			ResultSet dsBankLiabilityPosition = jdbcResult
					.getRsTypeMap(RSType.RS_TYPE_BANK_LIABILITY_POSTION.toString());
			ResultSet dsAboutYourOtherBank = jdbcResult.getRsTypeMap(RSType.RS_TYPE_OTHER_BANK_DETAILS.toString());
			ResultSet securityDetails = jdbcResult.getRsTypeMap(RSType.RS_TYPE_SECURITY_DETAILS.toString());
			ResultSet referenceDetails = jdbcResult.getRsTypeMap(RSType.RS_TYPE_REFERENCES_DETAILS.toString());
			ResultSet supplementaryDetails = jdbcResult
					.getRsTypeMap(RSType.RS_TYPE_APPLICANT_SUPPLEMENT_DETAILS.toString());
			ResultSet documentList = jdbcResult.getRsTypeMap(RSType.DOCUMENT_CHECKLIST.toString());
			ResultSet rsUnderOwnership = jdbcResult.getRsTypeMap(RSType.RS_TYPE_COMPANIES_UNDER_OWNER_SHIP.toString());
			ResultSet rsLetterOfUndertaking = jdbcResult.getRsTypeMap(RSType.RS_TYPE_LETTER_OF_UNDERTAKING.toString());
			ResultSet rsKycProfile = jdbcResult.getRsTypeMap(RSType.RS_TYPE_KYC_PROFILE.toString());
			log.info("Acquisition Reported ResultSet Ok");
			spArgsMap = getApplicantData(jdbcResult);
			log.info("Acquisition Reported parameter Ok");
			spArgsMap.put("ds_applicant_details", new JRResultSetDataSource(rs_your_self_applicant_details));
			spArgsMap.put("ds_applicant_residence", new JRResultSetDataSource(rs_applicant_residence));
			spArgsMap.put("ds_about_your_work", new JRResultSetDataSource(rs_about_your_work));
			spArgsMap.put("ds_previous_organizationdetails", new JRResultSetDataSource(dsPreviousOrganizationDetails));
			spArgsMap.put("ds_others_bank_liability_position", new JRResultSetDataSource(dsBankLiabilityPosition));
			spArgsMap.put("ds_about_your_other_bank", new JRResultSetDataSource(dsAboutYourOtherBank));
			spArgsMap.put("ds_security_details", new JRResultSetDataSource(securityDetails));
			spArgsMap.put("ds_reference_details", new JRResultSetDataSource(referenceDetails));
			spArgsMap.put("ds_supplementary_details", new JRResultSetDataSource(supplementaryDetails));
			spArgsMap.put("rs_doc_checklist", new JRResultSetDataSource(documentList));
			spArgsMap.put("rs_under_ownership", new JRResultSetDataSource(rsUnderOwnership));
			spArgsMap.put("rs_letter_of_undertaking", new JRResultSetDataSource(rsLetterOfUndertaking));
			spArgsMap.put("rs_kyc_profile", new JRResultSetDataSource(rsKycProfile));
			spArgsMap.put("rs_cib_inquiry", new JRResultSetDataSource(rsCibInquiry));
		} catch (Exception ex) {
			log.error("Acqusition Report Data Capture : {}", ex.getLocalizedMessage());

			throw ex;
		}
		return spArgsMap;
	}

	private Map<String, Object> getApplicantData(JdbcResult jdbcResult) throws Exception {
		ResultSet rs_applicant_details = jdbcResult.getRsTypeMap(RSType.RS_TYPE_ABOUT_YOUR_APPLICATION.toString());
		List<Document> documentList = JdbcUtils.mapRows(Document.class, Document.getRs2BeanMap(),
				jdbcResult.getRsTypeMap(RSType.RS_TYPE_APPLICANT_DOCUMENTS.toString()));
		String paramAccount = null;
		String paramYouAreCbblHolder = null;
		String paramApplicantName = null;
		String paramAccountUsd = null;
		String paramNid = null;
		String paramBp = null;
		String paramCardType = null;
		String paramTid = null;
		String paramCustTypeNewOrEx = null;
		String paramMailingComAdd = null;
		String paramReceviingWay = null;
		String paramReceviingWayName = null;
		String paramMonthlyStatementSent = null;
		String paramPromActivitId = null;
		String autoPayInstruction = null;
		String autoPayInstructionYes = null;
		String autoPayInstructionNo = null;
		String otherBankLiabilityPosition = null;
		String applicantImage = null;
		String supplImage = null;
		Double sMonthGrossSalary = null;
		Double sMmonthTotalDeduction = null;
		Double sMonthNetIncome = null;
		Double nSmonthGrossSalary = null;
		Double nSmonthTotalExpense = null;
		Double nSmonthNetIncome = null;
		Double applicantSpouseIncome = null;
		Double applicantAdditionalIncome = null;
		String promissoryDateStr = null;
		Double promissoryTaka = null;
		Double promissorySecondTaka = null;
		Double promissoryRate = null;
		String promissoryPlace = null;
		String promissoryMessage = null;
		String bankBranchname = null;
		Double bankSolID = null;
		String bankGeoLocationCheck1 = null;
		String bankGeoLocationText1 = null;
		String bankGeoLocationText2 = null;
		String bankGeoLocationCheck2 = null;
		String sourceComments = null;
		String applicantEmployeeID = null;
		String standingInstruction = null;
		String standingInstruction1 = null;
		String standingInsFullPay = null;
		String standingInsMiniPay = null;
		String standingInsFullPay1 = null;
		String standingInsMiniPay1 = null;
		String paramApplicantCompanyName = null;
		String exceptionDetails = null;
		Double askingLimit = null;
		Double recommendedLimit = null;
		boolean isLocationCheck1;
		boolean isLocationCheck2;
		String applicantApplyingFor = null;
		String creditCard= null;
		String prepaidCard = null;
		String others = null;
		String cardType = null;
		String visaCls = null;
		String visaGold = null;
		String visaPlat = null;
		String visaSigna = null;
		String officeAddress = null;
		String residentalAddress = null;
		String permanentAddress = null;
		String communicationAddress = null;
		String cbblBranch = null;
		String otherBankLiabilityYes = null;
		String otherBankLiabilityNo = null;
		String otherBankAcc = null;
		String otherBankAccYes = null;
		String otherBankAccNo = null;
		String youAreCbblAccountHolder = null;
		String youAreCbblAccountHolderYes = null;
		String youAreCbblAccountHolderNo = null;
		boolean isCustomerTypeNew = false;
		boolean isCustomeTypExisiting = false;

		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();
		if (rs_applicant_details != null) {
			while (rs_applicant_details.next()) {
				paramAccount = rs_applicant_details.getString("tx_applicant_account_number");
				paramNid = rs_applicant_details.getString("tx_applicant_nid_number");
				paramBp = rs_applicant_details.getString("tx_applicant_bp_number");
				paramCardType = rs_applicant_details.getString("tx_applicant_typeof_card");
				paramTid = rs_applicant_details.getString("id_credit_card_key");
				paramCustTypeNewOrEx = rs_applicant_details.getString("tx_applicant_customer_type");
				paramMailingComAdd = rs_applicant_details.getString("tx_applicant_mailing_com_address");
				paramReceviingWay = rs_applicant_details.getString("tx_applicant_card_receiving_way");
				paramReceviingWayName = rs_applicant_details.getString("tx_applicant_card_receiving_way_name");
				paramMonthlyStatementSent = rs_applicant_details.getString("tx_applicant_monthly_statements_sentWay");
				paramPromActivitId = rs_applicant_details.getString("tx_applicant_prom_activit_purpose_id");
				otherBankLiabilityPosition = rs_applicant_details.getString("tx_other_bank_liability_position");
				paramAccountUsd = rs_applicant_details.getString("tx_applicant_usd_account_portion");
				paramYouAreCbblHolder = rs_applicant_details.getString("tx_you_are_cbbl_account_holder");
				paramApplicantName = rs_applicant_details.getString("tx_applicant_name");
				paramApplicantCompanyName = rs_applicant_details.getString("tx_applicant_company_name");
				autoPayInstruction = rs_applicant_details.getString("tx_auto_pay_instruction");
				promissoryPlace = rs_applicant_details.getString("tx_demand_promissory_place");
				promissoryMessage = rs_applicant_details.getString("tx_demand_promissory_message");
				promissoryDateStr = rs_applicant_details.getString("dtt_demand_promissory_date").split(" ")[0];
				sMonthGrossSalary = Double
						.parseDouble(rs_applicant_details.getString("dec_salaried_month_gross_salary"));
				sMmonthTotalDeduction = Double
						.parseDouble(rs_applicant_details.getString("dec_salaried_month_total_deduction"));
				sMonthNetIncome = Double.parseDouble(rs_applicant_details.getString("dec_salaried_month_net_income"));
				nSmonthGrossSalary = Double
						.parseDouble(rs_applicant_details.getString("dec_nonsalaried_month_gross_salary"));
				nSmonthTotalExpense = Double
						.parseDouble(rs_applicant_details.getString("dec_non_salaried_month_total_expense"));
				nSmonthNetIncome = Double
						.parseDouble(rs_applicant_details.getString("dec_non_salaried_month_net_income"));
				applicantSpouseIncome = Double
						.parseDouble(rs_applicant_details.getString("dec_applicant_spouse_income"));
				applicantAdditionalIncome = Double
						.parseDouble(rs_applicant_details.getString("dec_applicant_additional_income"));
				promissoryTaka = Double.parseDouble(rs_applicant_details.getString("dec_demand_promissory_taka"));
				promissorySecondTaka = Double
						.parseDouble(rs_applicant_details.getString("dec_demand_promissory_second_taka"));
				promissoryRate = Double.parseDouble(rs_applicant_details.getString("int_demand_promissory_rate"));
				bankBranchname = rs_applicant_details.getString("tx_bank_branch_name");
				bankSolID = Double.parseDouble(rs_applicant_details.getString("int_bank_solid"));
				bankGeoLocationCheck1 = rs_applicant_details.getString("tx_bank_geo_location_check1");
				bankGeoLocationText1 = rs_applicant_details.getString("tx_bank_geo_location_text1");
				bankGeoLocationText2 = rs_applicant_details.getString("tx_bank_geo_location_text2");
				bankGeoLocationCheck2 = rs_applicant_details.getString("tx_bank_geo_location_check2");
				sourceComments = rs_applicant_details.getString("tx_source_comments");
				applicantEmployeeID = rs_applicant_details.getString("tx_applicant_employee_id");
				standingInstruction = rs_applicant_details.getString("tx_payment_type_of_standing_instruction");
				standingInstruction1 = rs_applicant_details.getString("tx_payment_type_of_standing_instruction1");
				exceptionDetails = rs_applicant_details.getString("tx_exception_details");
				askingLimit = Double.parseDouble(rs_applicant_details.getString("dec_applicant_asking_limit"));
				recommendedLimit = Double
						.parseDouble(rs_applicant_details.getString("dec_applicant_recommended_limit"));
				applicantApplyingFor = rs_applicant_details.getString("tx_applicant_applying_for");
				cardType = rs_applicant_details.getString("tx_applicant_typeof_card");
				otherBankAcc = rs_applicant_details.getString("tx_other_bankacc_details");
				youAreCbblAccountHolder = rs_applicant_details.getString("tx_you_are_cbbl_account_holder");
			}
		}
		if (documentList.size() > 0) {
			for (Document doc : documentList) {
				if (doc.getDocType().equals(Str.DOC_TYPE_SUPPLEMENTARY_APPLICANT_PASSPORT_PHOTO.toString())) {
					String supplImageCut = doc.getDownloadLink().split("\\.")[1];
					supplImageCut = supplImageCut.toLowerCase();
					if (supplImageCut.equals("jpg ") || supplImageCut.equals("jpeg") || supplImageCut.equals("pjp")
							|| supplImageCut.equals("pjpeg ") || supplImageCut.equals("png")) {
						supplImage = doc.getDownloadLink();
					}
				}
				if (doc.getDocType().equals(Str.DOC_TYPE_PASSPORT_SIZE_PHOTO.toString())) {
					String applicantImageCut = doc.getDownloadLink().split("\\.")[1];
					applicantImageCut = applicantImageCut.toLowerCase();
					if (applicantImageCut.equals("jpg ") || applicantImageCut.equals("jpeg")
							|| applicantImageCut.equals("pjp") || applicantImageCut.equals("pjpeg ")
							|| applicantImageCut.equals("png")) {
						applicantImage = doc.getDownloadLink();
					}
				}
			}
		} else {
			supplImage = Str.NO_IMAGE.toString();
			applicantImage = Str.NO_IMAGE.toString();
		}
		if (supplImage == null || supplImage.isEmpty()) {
			supplImage = Str.NO_IMAGE.toString();
		}
		if (applicantImage == null || applicantImage.isEmpty()) {
			applicantImage = Str.NO_IMAGE.toString();
		}
		if (bankGeoLocationCheck1 == "false" || bankGeoLocationCheck1 == "?") {
			isLocationCheck1 = false;
		} else {
			isLocationCheck1 = true;
		}
		if (bankGeoLocationCheck2 == "false" || bankGeoLocationCheck2 == "?") {
			isLocationCheck2 = false;
		} else {
			isLocationCheck2 = true;
		}
		if(applicantApplyingFor.equals(Str.STR_CARD.toString())) {
			creditCard = Str.RADIO_1.toString();
			prepaidCard = Str.RADIO_2.toString();	
			others = Str.RADIO_2.toString();
		}
		if(applicantApplyingFor.equals(Str.STR_PRE.toString())) {
			prepaidCard = Str.RADIO_1.toString();
			creditCard = Str.RADIO_2.toString();
			others = Str.RADIO_2.toString();
		}
		if(!applicantApplyingFor.equals(Str.STR_CARD.toString()) 
			&& !applicantApplyingFor.equals(Str.STR_PRE.toString())) {
			prepaidCard = Str.RADIO_2.toString();
			creditCard = Str.RADIO_2.toString();
			others = Str.RADIO_2.toString();
		}
		if(cardType.equals(Str.VISA_CLASSIC.toString())) {
			visaCls   = Str.RADIO_1.toString();
			visaGold  = Str.RADIO_2.toString();
			visaPlat  = Str.RADIO_2.toString();
			visaSigna = Str.RADIO_2.toString();		
		}
		if(cardType.equals(Str.VISA_GOLD.toString())) {
			visaCls   = Str.RADIO_2.toString();
			visaGold  = Str.RADIO_1.toString();
			visaPlat  = Str.RADIO_2.toString();
			visaSigna = Str.RADIO_2.toString();	
			
		}
		if(cardType.equals(Str.VISA_PLAT.toString())) {
			visaCls   = Str.RADIO_2.toString();
			visaGold  = Str.RADIO_2.toString();
			visaPlat  = Str.RADIO_1.toString();
			visaSigna = Str.RADIO_2.toString();	
			
		}
		if(cardType.equals(Str.VISA_SIGNA.toString())) {
			visaCls   = Str.RADIO_2.toString();
			visaGold  = Str.RADIO_2.toString();
			visaPlat  = Str.RADIO_2.toString();
			visaSigna = Str.RADIO_1.toString();	
			
		}
		
		if(!cardType.equals(Str.VISA_SIGNA.toString()) 
			&& !cardType.equals(Str.VISA_PLAT.toString())
			&& !cardType.equals(Str.VISA_GOLD.toString())
			&& !cardType.equals(Str.VISA_CLASSIC.toString())) {
			visaCls   = Str.RADIO_2.toString();
			visaGold  = Str.RADIO_2.toString();
			visaPlat  = Str.RADIO_2.toString();
			visaSigna = Str.RADIO_2.toString();	
	
		}
		
		if(paramMailingComAdd.equals(Str.OFFICE_ADDRESS.toString())) {
			officeAddress = Str.RADIO_1.toString();
			residentalAddress = Str.RADIO_2.toString();
			permanentAddress = Str.RADIO_2.toString();
			
		}
		if(paramMailingComAdd.equals(Str.RESIDENTAL_ADDRESS.toString())) {
			officeAddress = Str.RADIO_2.toString();
			residentalAddress = Str.RADIO_1.toString();
			permanentAddress = Str.RADIO_2.toString();
		}
		if(paramMailingComAdd.equals(Str.PERMANENT_ADDRESS.toString())) {
			officeAddress = Str.RADIO_2.toString();
			residentalAddress = Str.RADIO_2.toString();
			permanentAddress = Str.RADIO_1.toString();
		}
		if(!paramMailingComAdd.equals(Str.OFFICE_ADDRESS.toString()) 
			&& !paramMailingComAdd.equals(Str.RESIDENTAL_ADDRESS.toString())
			&& !paramMailingComAdd.equals(Str.PERMANENT_ADDRESS.toString())) {
			officeAddress = Str.RADIO_2.toString();
			residentalAddress = Str.RADIO_2.toString();
			permanentAddress = Str.RADIO_2.toString();
		}
		if(paramReceviingWay.equals(Str.COMMUNICATION_ADDRESS.toString())) {			
			communicationAddress = Str.RADIO_1.toString();
			cbblBranch = Str.RADIO_2.toString();
		}
		if(paramReceviingWay.equals(Str.CBBL_BRANCH.toString())) {
			communicationAddress = Str.RADIO_2.toString();
			cbblBranch = Str.RADIO_1.toString();
		}
		if(!paramReceviingWay.equals(Str.CBBL_BRANCH.toString()) 
			&& !paramReceviingWay.equals(Str.COMMUNICATION_ADDRESS.toString())) {
			communicationAddress = Str.RADIO_2.toString();
			cbblBranch = Str.RADIO_2.toString();
		}
		
		if(otherBankLiabilityPosition.equals("YES")) {
			otherBankLiabilityYes = Str.RADIO_1.toString();
			otherBankLiabilityNo = Str.RADIO_2.toString();
		}
		if(otherBankLiabilityPosition.equals("NO")) {
			otherBankLiabilityYes = Str.RADIO_2.toString();
			otherBankLiabilityNo = Str.RADIO_1.toString();			
		}
		if(!otherBankLiabilityPosition.equals("YES")
			&& !otherBankLiabilityPosition.equals("NO")) {
			otherBankLiabilityYes = Str.RADIO_2.toString();
			otherBankLiabilityNo = Str.RADIO_2.toString();
		}
		if(otherBankAcc.equals("YES")) {
			otherBankAccYes = Str.RADIO_1.toString();
			otherBankAccNo = Str.RADIO_2.toString();
		}
		if(otherBankAcc.equals("NO")) {
			otherBankAccYes = Str.RADIO_2.toString();
			otherBankAccNo = Str.RADIO_1.toString();			
		}
		if(!otherBankAcc.equals("YES")
			&& !otherBankAcc.equals("NO")) {
			otherBankAccYes = Str.RADIO_2.toString();
			otherBankAccNo = Str.RADIO_2.toString();
		}	
		
		if(youAreCbblAccountHolder.equals("Yes")) {
			youAreCbblAccountHolderYes = Str.RADIO_1.toString();
			youAreCbblAccountHolderNo = Str.RADIO_2.toString();
		}
		if(youAreCbblAccountHolder.equals("No")) {
			youAreCbblAccountHolderYes = Str.RADIO_2.toString();
			youAreCbblAccountHolderNo = Str.RADIO_1.toString();			
		}
		if(!youAreCbblAccountHolder.equals("Yes")
			&& !youAreCbblAccountHolder.equals("No")) {
			youAreCbblAccountHolderYes = Str.RADIO_2.toString();
			youAreCbblAccountHolderNo = Str.RADIO_2.toString();
		}	
		if(standingInstruction.equals(Str.FULL_PAYMENT.toString())) {
			standingInsFullPay = Str.RADIO_1.toString();
			standingInsMiniPay = Str.RADIO_2.toString();		
		}
		if(standingInstruction.equals(Str.MINIMUM_PAYMENT.toString())) {
			standingInsFullPay = Str.RADIO_2.toString();
			standingInsMiniPay = Str.RADIO_1.toString();
		}
		if(!standingInstruction.equals(Str.MINIMUM_PAYMENT.toString())
			&& !standingInstruction.equals(Str.FULL_PAYMENT.toString())) {
			standingInsFullPay = Str.RADIO_2.toString();
			standingInsMiniPay = Str.RADIO_2.toString();
		}
		
		if(standingInstruction1.equals(Str.FULL_PAYMENT.toString())) {
			standingInsFullPay1 = Str.RADIO_1.toString();
			standingInsMiniPay1 = Str.RADIO_2.toString();		
		}
		if(standingInstruction1.equals(Str.MINIMUM_PAYMENT.toString())) {
			standingInsFullPay1 = Str.RADIO_2.toString();
			standingInsMiniPay1 = Str.RADIO_1.toString();
		}
		if(!standingInstruction1.equals(Str.MINIMUM_PAYMENT.toString())
			&& !standingInstruction1.equals(Str.FULL_PAYMENT.toString())) {
			standingInsFullPay1 = Str.RADIO_2.toString();
			standingInsMiniPay1 = Str.RADIO_2.toString();
		}		
		
		if(autoPayInstruction.equals("Yes")) {
			autoPayInstructionYes = Str.RADIO_1.toString();
			autoPayInstructionNo = Str.RADIO_2.toString();
		}
		if(autoPayInstruction.equals("No")) {
			autoPayInstructionYes = Str.RADIO_2.toString();
			autoPayInstructionNo = Str.RADIO_1.toString();			
		}
		if(!autoPayInstruction.equals("Yes")
			&& !autoPayInstruction.equals("No")) {
			autoPayInstructionYes = Str.RADIO_2.toString();
			autoPayInstructionNo = Str.RADIO_2.toString();
		}
		
		if(paramCustTypeNewOrEx.equals(Str.CUSTOMER_EXISTING.toString())) {
			isCustomerTypeNew = false;
			isCustomeTypExisiting = true;
		}
		if(paramCustTypeNewOrEx.equals(Str.CUSTOMER_NEW.toString())) {
			isCustomerTypeNew = true;
			isCustomeTypExisiting = false;
		}
		if(!paramCustTypeNewOrEx.equals(Str.CUSTOMER_NEW.toString())
			&& paramCustTypeNewOrEx.equals(Str.CUSTOMER_EXISTING.toString())) {
			isCustomerTypeNew = false;
			isCustomeTypExisiting = false;
		}

		spArgsMap.put("p_autoPayInstructionYes", autoPayInstructionYes);
		spArgsMap.put("p_autoPayInstructionNo", autoPayInstructionNo);	
		spArgsMap.put("p_standingInsFullPay", standingInsFullPay);
		spArgsMap.put("p_standingInsMiniPay", standingInsMiniPay);	
		spArgsMap.put("p_standingInsFullPay1", standingInsFullPay1);
		spArgsMap.put("p_standingInsMiniPay1", standingInsMiniPay1);
		spArgsMap.put("tx_applicant_account_number", paramAccount);
		spArgsMap.put("tx_applicant_nid_number", paramNid);
		spArgsMap.put("tx_applicant_bp_number", paramBp);
		spArgsMap.put("tx_applicant_typeof_card", paramCardType);
		spArgsMap.put("tx_applicant_tid", paramTid);
		spArgsMap.put("tx_applicant_customer_type", paramCustTypeNewOrEx);
		spArgsMap.put("tx_applicant_mailing_com_address", paramMailingComAdd);
		spArgsMap.put("tx_applicant_card_receiving_way", paramReceviingWay);
		spArgsMap.put("tx_applicant_card_receiving_way_name", paramReceviingWayName);
		spArgsMap.put("tx_applicant_monthly_statements_sentWay", paramMonthlyStatementSent);
		spArgsMap.put("tx_applicant_prom_activit_purpose_id", paramPromActivitId);
		spArgsMap.put("tx_other_bank_liability_position", otherBankLiabilityPosition);
		spArgsMap.put("dec_salaried_month_gross_salary", sMonthGrossSalary);
		spArgsMap.put("dec_salaried_month_total_deduction", sMmonthTotalDeduction);
		spArgsMap.put("dec_salaried_month_net_income", sMonthNetIncome);
		spArgsMap.put("dec_nonsalaried_month_gross_salary", nSmonthGrossSalary);
		spArgsMap.put("dec_non_salaried_month_total_expense", nSmonthTotalExpense);
		spArgsMap.put("dec_non_salaried_month_net_income", nSmonthNetIncome);
		spArgsMap.put("dec_applicant_spouse_income", applicantSpouseIncome);
		spArgsMap.put("dec_applicant_additional_income", applicantAdditionalIncome);
		spArgsMap.put("tx_applicant_usd_account_portion", paramAccountUsd);
		spArgsMap.put("tx_you_are_cbbl_account_holder", paramYouAreCbblHolder);
		spArgsMap.put("tx_applicant_name", paramApplicantName);
		spArgsMap.put("tx_auto_pay_instruction", autoPayInstruction);
		spArgsMap.put("applicant_image", applicantImage);
		spArgsMap.put("supple_image", supplImage);
		spArgsMap.put("tx_demand_promissory_message", promissoryMessage);
		spArgsMap.put("tx_demand_promissory_place", promissoryPlace);
		spArgsMap.put("dtt_demand_promissory_date", promissoryDateStr);

		spArgsMap.put("dec_demand_promissory_taka", promissoryTaka);
		spArgsMap.put("dec_demand_promissory_second_taka", promissorySecondTaka);
		spArgsMap.put("int_demand_promissory_rate", promissoryRate);
		spArgsMap.put("tx_bank_branch_name", bankBranchname);
		spArgsMap.put("int_bank_solid", bankSolID);
		spArgsMap.put("is_bank_geo_location_check1", isLocationCheck1);
		spArgsMap.put("tx_bank_geo_location_text1", bankGeoLocationText1);
		spArgsMap.put("tx_bank_geo_location_text2", bankGeoLocationText2);
		spArgsMap.put("is_bank_geo_location_check2", isLocationCheck2);
		spArgsMap.put("tx_source_comments", sourceComments);
		spArgsMap.put("tx_applicant_employee_id", applicantEmployeeID);
		spArgsMap.put("tx_applicant_company_name", paramApplicantCompanyName);
		spArgsMap.put("tx_exception_details", exceptionDetails);
		spArgsMap.put("dec_applicant_asking_limit", askingLimit);
		spArgsMap.put("dec_applicant_recommended_limit", recommendedLimit);
		spArgsMap.put("p_prepaidCard", prepaidCard);
		spArgsMap.put("p_creditCard", creditCard);
		spArgsMap.put("p_others", others);		
		spArgsMap.put("p_visaCls", visaCls);
		spArgsMap.put("p_visaGold", visaGold);
		spArgsMap.put("p_visaPlat", visaPlat);
		spArgsMap.put("p_visaSigna", visaSigna);		
		spArgsMap.put("p_officeAddress", officeAddress);
		spArgsMap.put("p_residentalAddress", residentalAddress);
		spArgsMap.put("p_permanentAddress", permanentAddress);
		spArgsMap.put("p_communicationAddress", communicationAddress);
		spArgsMap.put("p_cbblBranch", cbblBranch);
		spArgsMap.put("p_otherBankLiabilityYes", otherBankLiabilityYes);
		spArgsMap.put("p_otherBankLiabilityNo", otherBankLiabilityNo);
		spArgsMap.put("p_otherBankAccYes", otherBankAccYes);
		spArgsMap.put("p_otherBankAccNo", otherBankAccNo);
		spArgsMap.put("p_youAreCbblAccountHolderYes", youAreCbblAccountHolderYes);
		spArgsMap.put("p_youAreCbblAccountHolderNo", youAreCbblAccountHolderNo);
		spArgsMap.put("is_customer_type_new", isCustomerTypeNew);
		spArgsMap.put("is_customer_type_exisiting", isCustomeTypExisiting);

		return spArgsMap;
	}

	public void getBulkForAcquisitionReport(HttpServletRequest request, HttpServletResponse response) throws Exception {

		Map<String, Object> parameters = new HashMap<String, Object>();

		Integer userId = Integer.parseInt(request.getParameter("userId"));
		Date reportGenDate = new Date();
		DateFormat dateFormat = new SimpleDateFormat("dd MMM, yyyy HH:mm:ss a");
		String[] idList = request.getParameterValues("idList");
		AcquisitionApplicantDetails acquisitionDetails = new AcquisitionApplicantDetails();
		for (int i = 0; i < idList.length; i++) {
			acquisitionDetails.setCreditCardId(Integer.parseInt(idList[i]));
			acquisitionDetails.setUserModKey(userId);
			parameters = getAcquisitionMap(request, acquisitionDetails);			
			printBulkReport(response, parameters);
		}
	}

	private void printBulkReport(HttpServletResponse response, Map<String, Object> parameters)
			throws JRException, IOException {
		String reportsPath = null;
		String reportName = "AcquisitionReportSheet";

		Resource resource = new ClassPathResource(Str.ACQUISITION_REPORT_SHEET.toString());
//		InputStream input = resource.getInputStream();
		//we should instead use new ClassPathResource("filename").getInputStream() if run the application from jar.
		File file = resource.getFile();
		String path = file.getAbsolutePath();
		log.info("Path 1 : [{}],  Path2 : [{}]",path,file.getPath());
		reportsPath = path.split("AcquisitionReportSheet")[0];

		JasperDesign mainReportDesign = JRXmlLoader.load(file);

		JasperCompileManager.compileReportToFile(mainReportDesign, reportsPath + reportName + ".jasper");

		// Generate Jasper print
		JasperPrint jasperPrint = JasperFillManager.fillReport(reportsPath + reportName + ".jasper", parameters,
				new JREmptyDataSource());

		response.setContentType("application/x-download");
		response.addHeader("Content-disposition", "attachment; filename=AcquisitionReport.pdf");
		OutputStream out = response.getOutputStream();
		JasperExportManager.exportReportToPdfStream(jasperPrint, out);
	}

}
