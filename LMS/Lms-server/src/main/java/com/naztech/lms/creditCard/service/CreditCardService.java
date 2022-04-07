package com.naztech.lms.creditCard.service;

import java.io.InputStream;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.TransactionStatus;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
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
import com.naztech.lms.creditCard.model.CardGridView;
import com.naztech.lms.creditCard.model.CreditCard;
import com.naztech.lms.creditCard.model.Document;
import com.naztech.lms.model.Comment;
import com.naztech.lms.model.Customer;
import com.naztech.lms.model.DuplicationGridModel;
import com.naztech.lms.model.ExistingLiability;
import com.naztech.lms.model.Loan;
import com.naztech.lms.model.NConfiguration;
import com.naztech.lms.model.Role;
import com.naztech.lms.model.User;
import com.naztech.lms.service.CommentService;
import com.naztech.lms.service.CustomerService;
import com.naztech.lms.service.ExistingLiabilityService;
import com.naztech.lms.service.LmsSmsService;
import com.naztech.lms.service.UserService;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRResultSetDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;

@PropertySource("classpath:app.properties")
public class CreditCardService extends AbstractService<CreditCard> {
	private static Logger log = LogManager.getLogger(CreditCardService.class);
	private static final DateFormat df = new SimpleDateFormat("yyMM");

	@Autowired
	JdbcService jdbcService;
	@Autowired
	private CustomerService customerService;
	@Autowired
	private DocumentService documentService;
	@Autowired
	ExistingLiabilityService existingLiabilityService;
	@Autowired
	CommentService commentService;
	@Value("${manual.sms.api.call.mode}")
	public boolean manualSmsCallMode;
	@Autowired
	LmsSmsService lmsSmsService;

	@Autowired
	UserService userService;
	@Autowired
	private AcquisitionApplicantDetailsService acquisitionApplicant;

	@Value("${base.type.documentTypes}")
	String documentColumnNames;
	@Value("${preApproval.limit.working.mode}")
	boolean preApprovalLimitMode;
	
	static Gson gson;
	static {
		gson = new Gson();
	}

	List<String> documentColumnNamesList = null;

	@Value("${base.documentTypes.column.match}")
	double docColNameMatchPercent;

	public void init() {
		try {
			log.info("Initializing card Service");
			docColNameMatchPercent = docColNameMatchPercent / 100;
			documentColumnNamesList = Arrays.asList(documentColumnNames.split(","));
		}
		catch (Exception e) {
			log.error("Error initializing Card Service {}", e);
		}

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

			if (action.equals(ActionType.SELECT_CREDIT_CARD_FOR_GRID.toString()) || action.equals(ActionType.SEARCH_DATA_FOR_CC_GRID.toString())
			        || action.equals(ActionType.SELECT_ECARD_GRID_DATA.toString())) {
				msgResponse = MessageBuilder.withPayload(selectCardGridData(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.ACTION_STATE_TRANSITION.toString())) {
				CreditCard creditCard = handleStateTransition(msg, action);
				msgResponse = MessageBuilder.withPayload(creditCard).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.NEW.toString())) {
				CreditCard creditCard = handleSaveApplication(msg, action);
				msgResponse = MessageBuilder.withPayload(creditCard).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.UPDATE.toString())) {
				CreditCard creditCard = handleUpdateApplication(msg, action);
				msgResponse = MessageBuilder.withPayload(creditCard).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_FULL_CREDIT_CARD.toString())) {
				CreditCard creditCard = handleSelectFullCard(msg);
				msgResponse = MessageBuilder.withPayload(creditCard).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DELETE_FULL_CARD.toString()) || action.equals(ActionType.DELETE.toString())) {
				msgResponse = MessageBuilder.withPayload(handleDeleteCard(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.RETURN.toString())) {
				msgResponse = MessageBuilder.withPayload(handleReturnCard(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.RECOMMEND.toString()) || action.equals(ActionType.RECOMMEND_TO_UH.toString())
			        || action.equals(ActionType.RECOMMEND_TO_CD.toString()) || action.equals(ActionType.RECOMMEND_TO_HOCRM.toString())) {
				msgResponse = MessageBuilder.withPayload(handleStateTransition(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.QUERY_TO_CA.toString()) || action.equals(ActionType.QUERY_TO_C_OFFICER.toString())) {
				msgResponse = MessageBuilder.withPayload(handleStateTransition(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_CARD_WORK_HISTORY.toString())) {
				msgResponse = MessageBuilder.withPayload(selectWorkHistory(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_RECOMMEND_TO_ROLE_USER.toString())) {
				msgResponse = MessageBuilder.withPayload(selectRecommendToRoleUser(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_RETURN_TO_ROLE_USER.toString())) {
				msgResponse = MessageBuilder.withPayload(selectReturnToRoleUser(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.CREATE_CARD_GROUP.toString()) || action.equals(ActionType.ADD_CARD_TO_CARD_GROUP.toString())
			        || action.equals(ActionType.REMOVE_CARD_FROM_CARD_GROUP.toString())) {
				CreditCard creditCard = createOrAddOrRemoveCardGroup(msg, action);
				msgResponse = MessageBuilder.withPayload(creditCard).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_ALL_CARD_GROUP_DATA.toString()) || action.equals(ActionType.SEARCH_CARD_GROUP_DATA.toString())) {
				List<CardGridView> cardList = selectAllCardGroupData(msg, action);
				msgResponse = MessageBuilder.withPayload(cardList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_FOR_ADD_TO_CARD_GROUP.toString())) {
				List<CardGridView> cardList = selectAllCardGroupData(msg, ActionType.SELECT_FOR_ADD_TO_CARD_GROUP.toString());
				msgResponse = MessageBuilder.withPayload(cardList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.LOAD_DATA_SOURCE.toString())) {
				msgResponse = MessageBuilder.withPayload(selectDataSource(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_CARD_FROM_GROUP.toString())) {
				msgResponse = MessageBuilder.withPayload(selectAllCardGroupData(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.BULK_HOCRM_SEND_TO_MD.toString()) || action.equals(ActionType.UNLOCK_GROUP.toString())
					|| action.equals(ActionType.MD_APPROVED_GROUP.toString())) {
				List<CardGridView> loanList = bulkHocrmSendToMD(msg,action);
				msgResponse = MessageBuilder.withPayload(loanList).copyHeadersIfAbsent(msgHeader).build();
			}else if(action.equals(ActionType.LOAN_GROUP_COMMENTS_VIEW.toString())) {
				List<CreditCard> loan = selectLoanGroupComments(msg,action);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}else if(action.equals(ActionType.ACTION_TYPE_SELECT_CUTOMER_ALL_LOAN.toString())||action.equals(ActionType.SELECT_FOR_DUPLICATE_CHECK.toString())) {
				List<DuplicationGridModel> duplicateDataList= selectDuplicateLoanData(msg, action);
				msgResponse = MessageBuilder.withPayload(duplicateDataList).copyHeadersIfAbsent(msgHeader).build();
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

	private List<DuplicationGridModel> selectDuplicateLoanData(Message <List<CreditCard>> msg, String action) throws Exception {
		List<CreditCard> creditCardList = msg.getPayload();
		if (creditCardList == null || creditCardList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		try {
			return doSelectDuplicateLoanData(creditCardList.get(0),action);
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
	}

	private List<DuplicationGridModel> doSelectDuplicateLoanData(CreditCard creditCard, String action) throws Exception {
		JdbcResult jdbcResult = selectSingle(creditCard, action, SPName.ACT_CREDIT_CARD.toString());
		List<DuplicationGridModel> loanList = JdbcUtils.mapRows(DuplicationGridModel.class, DuplicationGridModel.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_CUSTOMER_LOAN_DUPLICATE_DATA.toString()));
		List<DuplicationGridModel> cardList = JdbcUtils.mapRows(DuplicationGridModel.class, DuplicationGridModel.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_CUSTOMER_CARD_DUPLICATE_DATA.toString()));
		if(cardList.size()>0) {
			loanList.addAll(cardList);
		}	
		return loanList;
	}

	private List<CreditCard> selectLoanGroupComments(Message<List<CreditCard>> msg, String action) throws Exception {
		List<CreditCard> creditCardList = msg.getPayload();
		if (creditCardList == null || creditCardList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		try {
			return doSelectCardGroupComments(creditCardList.get(0),action);
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
	}

	private List<CreditCard> doSelectCardGroupComments(CreditCard creditCard, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<CreditCard> creditCardList = new ArrayList<CreditCard>();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(creditCard, CreditCard.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_CREDIT_CARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_CREDIT_CARD.toString(), spArgsMap, jdbcResult);

			creditCardList = JdbcUtils.mapRows(CreditCard.class, CreditCard.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_GROUP_COMMENT.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return creditCardList;
	}

	private List<CreditCard> bulkHocrmSendToMD(Message<List<CreditCard>> msg, String action) throws Exception {
		String actionType = null;
		List<CreditCard> creditCardList = msg.getPayload();

		if (creditCardList == null || creditCardList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		if(action.equals(Str.BULK_HOCRM_SEND_TO_MD.toString())) {
			actionType = ActionType.SEND_TO_MD.toString();
		}else if(action.equals(Str.MD_APPROVED_GROUP.toString())) {
			actionType = ActionType.MD_APPROVED_GROUP.toString();
		} else {
			actionType = ActionType.REJECT_FROM_GROUP.toString();
		}
		CreditCard creditCard = creditCardList.get(0);
		try {
			creditCard.setCardGroupId(creditCard.getCardGroupId());
			creditCard.setStateName(creditCard.getStateName());
			creditCard.setStateId(creditCard.getStateId());
			if(!creditCard.getCardGroupId().isEmpty()) {
				log.info("Send to MD Group Id : [{}]", creditCard.getCardGroupId());
				stateTransitionGroup(creditCard, actionType);
			}
		}catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
		return creditCardList;
	}
	public boolean stateTransitionGroup(CreditCard creditCard, String uiActionName) throws Exception {

		Map<String, Object> spArgsMap = JdbcService.createSqlMap(creditCard, CreditCard.getSql2BeanMap());
		spArgsMap.put("@tx_ui_action_name", uiActionName);
		executeGroup(spArgsMap, ActionType.STATE_TRANSITION_CARD.toString());
		return true;
	}
	
	private JdbcResult executeGroup(Map<String, Object> spArgsMap, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();

		try {

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN_GROUP.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LOAN_GROUP.toString(), spArgsMap, jdbcResult);

		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return jdbcResult;
	}


	private List<CreditCard> selectDataSource(Message<List<CreditCard>> msg, String actionType) throws Exception {
		CreditCard loan = msg.getPayload().get(0);
		Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());
		JdbcResult jdbcResult = execute(spArgsMap, actionType.toString());

		List<CreditCard> loanList = JdbcUtils.mapRows(CreditCard.class, CreditCard.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_DATA_SOURCE.toString()));

		//		if (loanList == null || loanList.size() == 0) return null;
		return loanList;
	}

	private List<CardGridView> selectAllCardGroupData(Message<List<CreditCard>> msg, String actionType) throws Exception {
		List<CreditCard> cardList = msg.getPayload();
		CreditCard creditCard = cardList.get(0);
		List<CardGridView> viewList = new ArrayList<CardGridView>();
		JdbcResult jdbcResult = new JdbcResult();
		if (cardList == null || cardList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(creditCard, CreditCard.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_CREDIT_CARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(actionType, SPName.ACT_CREDIT_CARD.toString(), spArgsMap, jdbcResult);

			viewList = JdbcUtils.mapRows(CardGridView.class, CardGridView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CARD_GROUP_FOR_GRID.toString()));

			return viewList;
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}

	private CreditCard createOrAddOrRemoveCardGroup(Message<List<CreditCard>> msg, String action) throws Exception {
		List<CreditCard> cardList = msg.getPayload();
		if (cardList == null || cardList.size() == 0) {
			throw new Exception("Empty Request.");
		}

//		JdbcResult jdbcResult = new JdbcResult();
		CreditCard creditCard = cardList.get(0);
		String cardGroupId = null;
		try {
			if (action.equalsIgnoreCase(ActionType.CREATE_CARD_GROUP.toString())) {
				cardGroupId = generateGroupId(creditCard);
				cardGroupId = Str.CARD_GROUP_PREFIX.toString() + cardGroupId;
			}
			else {
				cardGroupId = creditCard.getCardGroupId();
			}
			log.info("CARD GROUP ID {}", cardGroupId);
			creditCard.setCardGroupId(cardGroupId);
			if (action.equals(ActionType.CREATE_CARD_GROUP.toString())) {
				creditCard = executeGroup(creditCard, action);
			}

			if (cardGroupId != null) {
				for (int i = 0; i < creditCard.getCardIdList().size(); i++) {
					creditCard.setCreditCardId(creditCard.getCardIdList().get(i));
					creditCard.setCardGroupId(cardGroupId);
					execute(creditCard, action);
				}
			}
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}

		return creditCard;
	}

	private String generateGroupId(CreditCard creditCard) {
		String cardGroupId = getNextIdFromSystem("id_card_group_key");
		String cardGroupNumber = String.format("%4s", cardGroupId).replace(' ', '0');

		SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd");
		String yymm = sdf.format(new Date());
		StringBuilder sb = new StringBuilder();
		sb.append(yymm).append(cardGroupNumber);
		log.debug("Generated application no [{}]. Will add prefix with it", sb.toString());
		return sb.toString();
	}

	private CreditCard executeGroup(CreditCard card, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(card, CreditCard.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN_GROUP.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LOAN_GROUP.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@cardGroupId") != null) {
				card.setCardGroupId(outputMap.get("@cardGroupId").toString());
			}
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return card;
	}

	private String getNextIdFromSystem(String keyName) {
		Integer requestKey = null;
		try {
			Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>(0);

			JdbcResult jdbcResult = new JdbcResult();
			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.GET_SYSTEM_KEY.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			spArgsMap.put("@id_env_key", 100000);
			spArgsMap.put("@tx_key_name", keyName);
			spArgsMap.put("@num_keys", 1);

			jdbcResult = getJdbcService().executeSP(SPName.GET_SYSTEM_KEY.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			requestKey = Integer.parseInt(outputMap.get("@id_key_value").toString());
		}
		catch (Exception ex) {
			log.info("Error {}, {}", ex, ex);
		}

		return Integer.toString(requestKey);
	}

	private Object selectWorkHistory(Message<List<CreditCard>> msg, String action) throws Exception {
		List<CreditCard> cardList = msg.getPayload();
		if (cardList == null || cardList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doCardSelectWorkHistory(cardList.get(0), action);
	}

	private List<CardGridView> doCardSelectWorkHistory(CreditCard creditCard, String action) throws Exception {
		JdbcResult jdbcResult = executeActCard(creditCard, action);
		List<CardGridView> historyList = JdbcUtils.mapRows(CardGridView.class, CardGridView.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CARD_WORK_HISTORY.toString()));
		ConcurrentHashMap<Integer, CardGridView> historyMap = new ConcurrentHashMap<Integer, CardGridView>();

		for (CardGridView lgv : historyList) {
			historyMap.put(lgv.getCreditCardId(), lgv);
		}
		return new ArrayList<CardGridView>(historyMap.values());
	}

	private JdbcResult executeActCard(CreditCard creditCard, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(creditCard, CreditCard.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_CREDIT_CARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_CREDIT_CARD.toString(), spArgsMap, jdbcResult);
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return jdbcResult;
	}

	private CreditCard handleReturnCard(Message<List<CreditCard>> msg, String action) throws Exception {
		CreditCard creditCard = msg.getPayload().get(0);
		stateTransition(creditCard, creditCard.getUiActionName());
		return creditCard;
	}

	private String handleDeleteCard(Message<List<CreditCard>> msg, String action) throws Exception {
		List<CreditCard> cardList = msg.getPayload();
		if (cardList == null || cardList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleDeleteCard(cardList.get(0), action);
	}

	private String doHandleDeleteCard(CreditCard creditCard, String action) throws Exception {
		log.debug("Deleting Card Application with action[{}], [{}]", action, creditCard.toString());

		TransactionStatus txnStatus = getJdbcService().beginTran();
		try {
			execute(creditCard, action);
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

	private CreditCard handleUpdateApplication(Message<List<CreditCard>> msg, String action) throws Exception {
		List<CreditCard> cardList = msg.getPayload();
		String source = msg.getHeader().getSource();
		log.info("Request Application Source: {}", source);
		if (cardList == null || cardList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		CreditCard creditCard = cardList.get(0);
		doHandleUpdateApplication(creditCard, action);

		List<Document> cardDocList = creditCard.getCardDocumentList();

		//		log.debug("Updating Loan Doc List with action[{}], [{}]", action, cardDocList.toString());

		Document cardDoc = new Document();

		cardDoc.setRefKey(creditCard.getCreditCardId());
		cardDoc.setUserModKey(creditCard.getUserModKey());
		documentService.doExecute(cardDoc, ActionType.DELETE_DOC_FOR_EXISTING_CARD.toString());

		if (cardDocList != null) {
			for (Document it : cardDocList) {
				if (it.getDocumentKey() == null) {
					it.setRefKey(creditCard.getCreditCardId());
					it.setUserModKey(creditCard.getUserModKey());
					documentService.doInsert(it);
				}
				else {
					documentService.doExecute(it, ActionType.MAKE_CARD_DOC_ACTIVE.toString());
				}
			}
		}
		return creditCard;
	}

	private CreditCard handleSaveApplication(Message<List<CreditCard>> msg, String action) throws Exception {
		List<CreditCard> cardList = msg.getPayload();
		if (cardList == null || cardList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleSaveApplication(cardList.get(0), action);
	}

	private CreditCard handleSelectFullCard(Message<List<CreditCard>> msg) throws Exception {
		List<CreditCard> cardList = msg.getPayload();
		String source = msg.getHeader().getSource();
		log.info("Request Application Source: {}", source);
		if (cardList == null || cardList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return doSelectFullCard(cardList.get(0));
	}

	private CreditCard doSelectFullCard(CreditCard creditCard) throws Exception {
		try {

			JdbcResult jdbcResult = selectSingle(creditCard, ActionType.SELECT_FULL_CREDIT_CARD.toString(), SPName.ACT_CREDIT_CARD.toString());			
			List<CreditCard> cardList = JdbcUtils.mapRows(CreditCard.class, CreditCard.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CREDIT_CARD.toString()));
			List<Customer> custList = JdbcUtils.mapRows(Customer.class, Customer.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CUSTOMER.toString()));

			List<ExistingLiability> liabilityList = JdbcUtils.mapRows(ExistingLiability.class, ExistingLiability.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_EXISTING_LIABILITY.toString()));
			List<Comment> cibStatusList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CIB_STATUS.toString()));
			List<Comment> analystsCommentsList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_ANALYSTS_COMMENTS.toString()));
			List<Comment> exceptionDetailsList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_EXCEPTION_DETAILS.toString()));
			List<Comment> instructionToCadList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_INSTRUCTION_TO_CAD.toString()));

			List<Comment> cmntJustificationList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_COMMENTS_JUSTIFICATION.toString()));
			List<Comment> cmntDeivationList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_COMMENTS_DEVIATION.toString()));
			List<Comment> sourceRecmndList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_SO_RECOMMENDATION.toString()));
			List<Comment> branchRecmndList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_BM_RECOMMENDATION.toString()));

			List<Document> cardDocList = JdbcUtils.mapRows(Document.class, Document.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CARD_DOCUMENT.toString()));

			List<Document> cardDocListForCibStatus = JdbcUtils.mapRows(Document.class, Document.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CARD_DOC_CIB_STATUS.toString()));

			if (cardList != null && cardList.size() > 0) {
				creditCard = cardList.get(0);
				if (custList != null && custList.size() > 0) {
					creditCard.setCustomer(custList.get(0));
					if(creditCard.getPreApprovedLimitRange() == null || creditCard.getPreApprovedLimitRange()==-2147483648) {
						log.info("Designation Wise Limit set When Select Card :[{}] , Action:[{}]",creditCard.getCreditCardId(),ActionType.SELECT_FULL_CREDIT_CARD.toString());
						creditCard = selectLimitRange(creditCard);
					}					
				}
				creditCard.setExistingLiabilityList(liabilityList);
				creditCard.setCibStatusList(cibStatusList);
				creditCard.setAnalystsCommentsList(analystsCommentsList);
				creditCard.setExceptionDetailsList(exceptionDetailsList);
				creditCard.setInstructionToCadList(instructionToCadList);
				creditCard.setCmntJustificationList(cmntJustificationList);
				creditCard.setCmntDeivationList(cmntDeivationList);
				creditCard.setSourceRecmndList(sourceRecmndList);
				creditCard.setBranchRecmndList(branchRecmndList);
				creditCard.setCardDocumentList(cardDocList);
				creditCard.setCardDocListForCibStatus(cardDocListForCibStatus);
			}
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return creditCard;
	}
	
	private CreditCard selectLimitRange(CreditCard card) throws Exception {
		NConfiguration config = new NConfiguration();
		config.setValue2(card.getCustomer().getDesignation());
		JdbcResult jdbcResult = selectPreApprovalLimit(config, ActionType.SELECT_PRE_APPROVAL_LIMIT.toString(), SPName.ACT_CREDIT_CARD.toString());

		List<NConfiguration> configList = JdbcUtils.mapRows(NConfiguration.class, NConfiguration.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_APPROVAL_LIMIT.toString()));
		if(configList.size()>0 && configList.get(0).getValue3()!= null) {
			
			card.setPreApprovedLimitRange(Double.parseDouble(configList.get(0).getValue3()));
		}

		return card;
	}

	private JdbcResult selectSingle(CreditCard creditCard, String action, String sp) throws Exception {
		try {
			JdbcResult jdbcResult = new JdbcResult();
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(creditCard, CreditCard.getSql2BeanMap());

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

	private CreditCard handleStateTransition(Message<List<CreditCard>> msg, String action) throws Exception {
		CreditCard creditCard = msg.getPayload().get(0);
		String source = msg.getHeader().getSource();
		log.info("Request Application Source: {}", source);
		if(preApprovalLimitMode&&!isEmptyString( creditCard.getCurrentUserRoleName())&& creditCard.getCurrentUserRoleName().equals(Str.CARD_OFFICER.toString())) {
			log.info("Pre-Approval Limit Mode: [{}]",preApprovalLimitMode);
			log.info("Pre-Approval Limit Configuration");		
			//credit card pre-approval approved 
			doSelectPreApprovalLimit(creditCard);
			// acquisition Applicant form insert data
			acquisitionApplicant.dynamicInsertAcquisitionFormDetails(creditCard);
		}else {
			if (creditCard.getUiActionName().equals(ActionType.RECEIVED.toString()) || creditCard.getUiActionName().equals(ActionType.ACTION_PRE_APPROVE.toString())) {
				log.info("Pre-Approval Limit Mode: [{}]",preApprovalLimitMode);
				creditCard.setApplicationNumber(generateApplicatonNo(creditCard));
				stateTransition(creditCard, creditCard.getUiActionName());
			}
			else {
				log.info("Pre-Approval Limit Mode: [{}]",preApprovalLimitMode);
				stateTransition(creditCard, creditCard.getUiActionName());
				// acquisition Applicant form insert data
				acquisitionApplicant.dynamicInsertAcquisitionFormDetails(creditCard);
			}
		}		
		return creditCard;
	}

	private boolean stateTransition(CreditCard creditCard, String uiActionName) throws Exception {
		Map<String, Object> spArgsMap = JdbcService.createSqlMap(creditCard, CreditCard.getSql2BeanMap());
		execute(spArgsMap, ActionType.ACTION_STATE_TRANSITION.toString());
		List<Comment> cmnt = creditCard.getCommentList();
		// if any comments in state transition than save it 
		if (cmnt != null && cmnt.size() > 0) {
			commentService.insert(cmnt.get(0));
		}
		return true;
	}


	private JdbcResult execute(Map<String, Object> spArgsMap, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		try {

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_CREDIT_CARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);
			jdbcResult = jdbcService.executeSP(action, SPName.ACT_CREDIT_CARD.toString(), spArgsMap, jdbcResult);
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return jdbcResult;
	}

	private List<CardGridView> selectCardGridData(Message<List<CreditCard>> msg, String action) throws Exception {
		List<CreditCard> creCardList = msg.getPayload();
		String source = msg.getHeader().getSource();
		log.info("Request Application Source: {}", source);
		if (creCardList == null || creCardList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doSelectCardForGrid(creCardList.get(0), action);
	}	

	private List<CardGridView> doSelectCardForGrid(CreditCard creditCard, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(creditCard, CreditCard.getSql2BeanMap());
			log.info("SELECT CREDIT CARD INITIAL LOADED OR SEARCH DATA");
			log.info("ACTION TYPE: [{}]", action);
			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_CREDIT_CARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_CREDIT_CARD.toString(), spArgsMap, jdbcResult);
			List<CardGridView> cardGridViewList = JdbcUtils.mapRows(CardGridView.class, CardGridView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CREDIT_CARD_FOR_GRID.toString()));			
			return cardGridViewList;
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}

	boolean isEmptyString(String string) {
		return string == null || string.isEmpty();
	}

	public CreditCard handleInitiateCard(String action, CreditCard card, MultipartFile[] files) {
		log.debug("Handling initial card [{}]", card.toString());

		List<Document> docList = card.getCardDocumentList();
		card.setCardDocumentList(null);
		Integer creditCardId = null;

		try {
			if (card.getCreditCardId() == null) {
				log.debug("Saving initial Card");
				CreditCard cardRtnFromSave = handleSaveApplication(card, action);
				creditCardId = cardRtnFromSave.getCreditCardId();
				card.setCreditCardId(creditCardId);
			}
			else if (action.equals(ActionType.RECOMMEND.toString())) {
				stateTransition(card, card.getUiActionName());
				creditCardId = card.getCreditCardId();
			}
			else {
				log.debug("Updating initial card");
				handleUpdateApplication(card, action);
				creditCardId = card.getCreditCardId();
			}
			for (MultipartFile file : files) {
				if (!file.isEmpty()) {
					Document cardDoc = getCardDocormDocName(file.getOriginalFilename(), docList);
					if (cardDoc != null) {
						cardDoc.setRefKey(creditCardId);
						cardDoc.setUserModKey(card.getUserModKey());
						documentService.saveCardDocumentFile(file, cardDoc, Str.MOBILE_VIEW);
					}
				}
			}
			for (Document cardDoc : docList) {
				cardDoc.setRefKey(creditCardId);
				cardDoc.setUserModKey(card.getUserModKey());
				documentService.doExecute(cardDoc, ActionType.NEW_MOBILE_VIEW.toString());
			}
		}
		catch (Exception e) {
			log.error("Exception processing card with file request, [{}]", e);
		}
		return card;
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

	private CreditCard handleUpdateApplication(CreditCard card, String action) throws Exception {
		return doHandleUpdateApplication(card, action);
	}

	private CreditCard doHandleUpdateApplication(CreditCard card, String action) throws Exception {
		log.debug("Updating Card Application with action[{}], [{}]", action, card.toString());

		TransactionStatus txnStatus = null;
		try {
			txnStatus = getJdbcService().beginTran();

			Customer cust = card.getCustomer();
			if (cust.getIsMatchedNid() == null || cust.getIsMatchedNid().isEmpty()) {
				cust.setIsMatchedNid("false");
			}

			cust = customerService.updateCustomer(cust);

			card.setCustomerIdKey(cust.getCustomerIdKey());
			card.setIdCustomerVer(cust.getIdCustomerVer());			
			card = execute(card, action);
			acquisitionApplicant.dynamicInsertAcquisitionFormDetails(card);

			List<ExistingLiability> existingLiability = card.getExistingLiabilityList();
			List<Comment> cibStatusList = card.getCibStatusList();
			List<Comment> analystsCommentsList = card.getAnalystsCommentsList();
			List<Comment> exceptionDetailsList = card.getExceptionDetailsList();
			List<Comment> instructionToCadList = card.getInstructionToCadList();
			List<Comment> cmntJustificationList = card.getCmntJustificationList();
			List<Comment> cmntDeivationList = card.getCmntDeivationList();

			if (existingLiability != null) {
				for (ExistingLiability it : existingLiability) {
					if (it.getExistingLiabilityId() == null) {
						it.setCreditCardKey(card.getCreditCardId());
						existingLiabilityService.insert(it);
					}
					else {
						existingLiabilityService.update(it);
					}
				}
			}
			if (cibStatusList != null) {
				for (Comment it : cibStatusList) {
					if (it.getCommentId() == null) {
						it.setRefId(card.getCreditCardId());
						commentService.insert(it);
					}
					else {
						commentService.update(it);
					}

				}
			}
			if (analystsCommentsList != null) {
				for (Comment it : analystsCommentsList) {
					if (it.getCommentId() == null) {
						it.setRefId(card.getCreditCardId());
						commentService.insert(it);
					}
					else {
						commentService.update(it);
					}
				}
			}
			if (exceptionDetailsList != null) {
				for (Comment it : exceptionDetailsList) {
					if (it.getCommentId() == null) {
						it.setRefId(card.getCreditCardId());
						commentService.insert(it);
					}
					else {
						commentService.update(it);
					}
				}
			}
			if (instructionToCadList != null) {
				for (Comment it : instructionToCadList) {
					if (it.getCommentId() == null) {
						it.setRefId(card.getCreditCardId());
						commentService.insert(it);
					}
					else {
						commentService.update(it);
					}
				}
			}

			if (cmntJustificationList != null) {
				for (Comment it : cmntJustificationList) {
					if (it.getCommentId() == null) {
						it.setRefId(card.getCreditCardId());
						commentService.insert(it);
					}
					else {
						commentService.update(it);
					}
				}
			}
			if (cmntDeivationList != null) {
				for (Comment it : cmntDeivationList) {
					if (it.getCommentId() == null) {
						it.setRefId(card.getCreditCardId());
						commentService.insert(it);
					}
					else {
						commentService.update(it);
					}
				}
			}

			getJdbcService().commitTran(txnStatus);
			return card;
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			if (txnStatus != null) {
				getJdbcService().rollbackTran(txnStatus);
			}
			throw e;
		}
	}

	private CreditCard handleSaveApplication(CreditCard card, String action) throws Exception {
		return doHandleSaveApplication(card, action);
	}

	private CreditCard doHandleSaveApplication(CreditCard card, String action) throws Exception {
		log.debug("Saving Card Application with action[{}], [{}]", action, card.toString());
		TransactionStatus txnStatus = null;
		try {
			txnStatus = getJdbcService().beginTran();
			// insert/update customer
			Customer cust = customerService.insertCustomer(card.getCustomer());
			card.setCustomerIdKey(cust.getCustomerIdKey());
			card.setIdCustomerVer(cust.getIdCustomerVer());
			card.setCreatorId(card.getUserModKey());
			card = execute(card, action);

			List<ExistingLiability> existingLiability = card.getExistingLiabilityList();
			List<Comment> commentList = card.getCommentList();

			List<Document> cardDocList = card.getCardDocumentList();

			if (existingLiability != null) {
				for (ExistingLiability it : existingLiability) {
					if (it.getExistingLiabilityId() == null) {
						it.setCreditCardKey(card.getCreditCardId());
						existingLiabilityService.insert(it);
					}
					else {
						existingLiabilityService.update(it);
					}
				}
			}
			if (commentList != null) {
				for (Comment it : commentList) {
					it.setRefId(card.getCreditCardId());
					commentService.insert(it);
				}
			}

			if (cardDocList != null) {
				for (Document it : cardDocList) {
					it.setRefKey(card.getCreditCardId());
					documentService.doInsert(it);
				}
			}
			getJdbcService().commitTran(txnStatus);

		}
		catch (Exception e) {
			log.error("Exception: ", e);
			if (txnStatus != null) {
				getJdbcService().rollbackTran(txnStatus);
			}
			throw e;
		}
		return card;
	}

	private CreditCard execute(CreditCard card, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(card, CreditCard.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_CREDIT_CARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_CREDIT_CARD.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			if (outputMap.get("@id_credit_card_key") != null) {
				card.setCreditCardId(Integer.parseInt(outputMap.get("@id_credit_card_key").toString()));
			}
			if (outputMap.get("@id_customer_key") != null) {
				card.setCustomerIdKey(Integer.parseInt(outputMap.get("@id_customer_key").toString()));
			}

			if (outputMap.get("@id_customer_ver") != null) {
				card.setIdCustomerVer(Integer.parseInt(outputMap.get("@id_customer_ver").toString()));
			}

		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return card;
	}

	private String generateApplicatonNo(CreditCard creditCard) throws Exception {
		String applicationId = getNextApplicationNoStr();
		String applicationNumber = String.format("%4s", applicationId).replace(' ', '0');

		String yymm = df.format(new Date());
		StringBuilder sb = new StringBuilder();
		sb.append(yymm).append(applicationNumber);
		log.debug("Generated application no [{}]. Will add prefix with it", sb.toString());
		return sb.toString();
	}

	protected String getNextApplicationNoStr() throws Exception {
		return Integer.toString(getNextApplicationNo());
	}

	protected Integer getNextApplicationNo() throws Exception {
		Integer requestKey = null;
		try {
			Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>(0);

			JdbcResult jdbcResult = new JdbcResult();
			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.GET_SYSTEM_KEY.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			spArgsMap.put("@id_env_key", 100000);
			spArgsMap.put("@tx_key_name", "id_credit_card_application_key");
			spArgsMap.put("@num_keys", 1);

			jdbcResult = getJdbcService().executeSP(SPName.GET_SYSTEM_KEY.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			requestKey = Integer.parseInt(outputMap.get("@id_key_value").toString());
		}
		catch (Exception ex) {
			log.info("Error {}, {}", ex, ex);
		}

		return requestKey;
	}

	public JasperPrint getJasperPrintForCreditReport(HttpServletRequest request) throws Exception {
		String reportName = request.getParameter("reportName");
		Integer userId = Integer.parseInt(request.getParameter("userId"));
		String userName = request.getParameter("username");
		String[] idList = request.getParameterValues("idList");

		String recommendedBy1 = request.getParameter("recommendedBy1");
		String recommendedBy2 = request.getParameter("recommendedBy2");
		String endorsedBy1 = request.getParameter("endorsedBy1");
		String endorsedBy2 = request.getParameter("endorsedBy2");
		String managingDirectorCeoName = request.getParameter("managingDirectorCeoName");

		String nameOfEmployees = request.getParameter("nameOfEmployees");
		String employeeId = request.getParameter("employeeId");
		String headOfCard = request.getParameter("headOfCard");

		String presonalLoanDuplicate = request.getParameter("presonalLoanDuplicate");
		String gpfLoanDuplicate = request.getParameter("gpfLoanDuplicate");
		String cardDuplicate = request.getParameter("cardDuplicate");
		String duplicationStatus = request.getParameter("duplicationStatus");

		Date reportGenDate = new Date();
		DateFormat dateFormat = new SimpleDateFormat("dd MMM, yyyy HH:mm:ss a");
		JasperDesign jasperDesign;
		JasperPrint jasperPrint = null;
		JasperReport jasperReport;
		JdbcResult jdbcResult = new JdbcResult();
		CreditCard creditCard = new CreditCard();
		InputStream template = null;
		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();
		String actionType = ActionType.LMS_BRANCH_CARD_PDF.toString();

		spArgsMap.put("tx_user_name", userName);
		spArgsMap.put("@id_user_mod_key", userId);
		spArgsMap.put("genDateTime", dateFormat.format(reportGenDate).toString());

		log.debug("start LMS Card details report");

		try {

			for (int i = 0; i < idList.length; i++) {
				creditCard.setCreditCardId(Integer.parseInt(idList[i]));
				creditCard.setUserModKey(userId);
			}

			if (reportName.equalsIgnoreCase(Str.LMS_HEAD_OFFICE)) {
				actionType = ActionType.LMS_HEAD_OFFICE_CARD_PDF.toString();
			}

			jdbcResult = selectSingle(creditCard, actionType, SPName.ACT_credit_card_report.toString());

			List<CreditCard> cardList = JdbcUtils.mapRows(CreditCard.class, CreditCard.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.CREDIT_CARD_3.toString()));

			ResultSet rs_card = jdbcResult.getRsTypeMap(RSType.RS_TYPE_CREDIT_CARD.toString());
			ResultSet rs_card2 = jdbcResult.getRsTypeMap(RSType.RS_TYPE_CREDIT_CARD_2.toString());
			ResultSet rs_customer = jdbcResult.getRsTypeMap(RSType.RS_TYPE_CUSTOMER.toString());
			ResultSet rs_reference = jdbcResult.getRsTypeMap(RSType.RS_TYPE_REFERENCE.toString());

			if (reportName.equalsIgnoreCase(Str.LMS_HEAD_OFFICE)) {

				Double pAppliedAmount = null;
				Double pApprovedLimit = null;
				if (cardList != null && cardList.size() > 0) {
					pAppliedAmount = cardList.get(0).getAppliedAmount();
					pApprovedLimit = cardList.get(0).getApprovedLimit();
				}

				spArgsMap.put("ds_card", new JRResultSetDataSource(rs_card));
				spArgsMap.put("ds_card2", new JRResultSetDataSource(rs_card2));
				spArgsMap.put("ds_customer", new JRResultSetDataSource(rs_customer));
				spArgsMap.put("rs_existing_liability_cbbl",
				        new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.EXISTING_LIABILITY_CBBL.toString())));
				spArgsMap.put("rs_existing_liability_cbbl_total",
				        new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.EXISTING_LIABILITY_CBBL_TOTAL.toString())));
				spArgsMap.put("rs_existing_liability_other_bank",
				        new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.EXISTING_LIABILITY_OTHER_BANK.toString())));
				spArgsMap.put("rs_existing_liability_total",
				        new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.EXISTING_LIABILITY_TOTAL.toString())));
				spArgsMap.put("ds_analysts_comments",
				        new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.RS_TYPE_ANALYSTS_COMMENTS.toString())));
				spArgsMap.put("ds_exception_details",
				        new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.RS_TYPE_EXCEPTION_DETAILS.toString())));
				spArgsMap.put("ds_instruction_to_cad",
				        new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.RS_TYPE_INSTRUCTION_TO_CAD.toString())));
				spArgsMap.put("ceo", managingDirectorCeoName);
				spArgsMap.put("p_applied_amount", pAppliedAmount);
				spArgsMap.put("p_approved_limit", pApprovedLimit);
				spArgsMap.put("p_recommended_by_1", recommendedBy1);
				spArgsMap.put("p_recommended_by_2", recommendedBy2);
				spArgsMap.put("p_endorsed_by_1", endorsedBy1);
				spArgsMap.put("p_endorsed_by_2", endorsedBy2);
				template = getClass().getResourceAsStream("/lms_report/CreditCardApprovalTemplate.jrxml");
			}
			else {
				Double pCommentsJustificationAmount = null;
				boolean isRejected = false;
				String loginName = "";
				if (cardList != null && cardList.size() > 0) {
					pCommentsJustificationAmount = cardList.get(0).getCardProposedLimit();

					if (cardList.get(0).getActionType().matches(ActionType.REJECT.toString())) isRejected = true;

					loginName = cardList.get(0).getLoginName();
				}

				spArgsMap.put("ds_reference", new JRResultSetDataSource(rs_reference));
				spArgsMap.put("ds_card", new JRResultSetDataSource(rs_card));
				spArgsMap.put("ds_card2", new JRResultSetDataSource(rs_card2));
				spArgsMap.put("rs_doc_checklist", new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.DOCUMENT_CHECKLIST.toString())));
				spArgsMap.put("ds_customer", new JRResultSetDataSource(rs_customer));
				spArgsMap.put("p_comments_justification_amount", pCommentsJustificationAmount);
				spArgsMap.put("rs_comment_deviation",
				        new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.RS_TYPE_COMMENTS_DEVIATION.toString())));
				spArgsMap.put("ds_branch_stuff", new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.RS_TYPE_BRANCH_NAME_STUFF_ID.toString())));

				spArgsMap.put("p_name_of_employees", nameOfEmployees);
				spArgsMap.put("p_employee_id", employeeId);
				spArgsMap.put("p_head_of_card", headOfCard);

				spArgsMap.put("p_presonal_loan_duplicate", presonalLoanDuplicate);
				spArgsMap.put("p_gfp_loan_duplicate", gpfLoanDuplicate);
				spArgsMap.put("p_card_duplicate", cardDuplicate);
				spArgsMap.put("p_duplication_status", duplicationStatus);

				spArgsMap.put("p_is_rejected", isRejected);
				spArgsMap.put("p_user_name", loginName);

				template = getClass().getResourceAsStream("/lms_report/PreApprovalCreditCardSheet.jrxml");
			}

			jasperDesign = JRXmlLoader.load(template);
			jasperReport = JasperCompileManager.compileReport(jasperDesign);
			jasperPrint = JasperFillManager.fillReport(jasperReport, spArgsMap, new JREmptyDataSource());

			log.debug("Approval Sheet details report");
		}
		catch (Exception ex) {

			log.error("Approval Sheet details report error : {}", ex.getLocalizedMessage());

			throw ex;
		}

		return jasperPrint;
	}

	public String[] findDocTypeMatching(String docName) {

		double matched = 0.00d;
		String[] doctypeName = new String[2];
		String[] words = docName.split("\\s+");

		if (words.length == 2) {
			docName = (words[0] + "_" + words[1]).toUpperCase();
		}

		if (documentColumnNames.contains(docName)) {
			matched = 100d;
			doctypeName[0] = String.valueOf(matched);/*It is added in index 0 of Array*/
			doctypeName[1] = docName;/*It is added in index 1 of Array*/
		}
		else if (documentColumnNames.contains(docName.substring(0, docName.length() - 1))) {
			matched = 100d;
			doctypeName[0] = String.valueOf(matched);
			doctypeName[1] = docName.substring(0, docName.length() - 1);
		}
		else {
			docColNameMatchPercent = docColNameMatchPercent / 100;
			documentColumnNamesList = Arrays.asList(documentColumnNames.split(","));
			for (String s : documentColumnNamesList) {
				matched = stringMatchPercentage(docName, s);
				if (matched >= docColNameMatchPercent) {
					doctypeName[0] = String.valueOf(matched);
					doctypeName[1] = s;
					log.info("From UI/Compare with/matched = {}/{}/{}", docName, s, matched);
					break;
				}
			}
		}

		doctypeName[0] = String.valueOf(matched);
		return doctypeName;

	}

	public static double stringMatchPercentage(final CharSequence first, final CharSequence second) {
		final double DEFAULT_SCALING_FACTOR = 0.1;

		if (first == null || second == null) {
			throw new IllegalArgumentException("Strings must not be null");
		}

		final int[] mtp = matchesTwoChar(first, second);
		final double m = mtp[0];
		if (m == 0) {
			return 0D;
		}
		final double j = ((m / first.length() + m / second.length() + (m - mtp[1]) / m)) / 3;
		final double jw = j < 0.7D ? j : j + Math.min(DEFAULT_SCALING_FACTOR, 1D / mtp[3]) * mtp[2] * (1D - j);
		double result = Math.round(jw * 100.0D) / 100.0D;
		return result;
	}

	private static int[] matchesTwoChar(final CharSequence first, final CharSequence second) {
		CharSequence max, min;
		if (first.length() > second.length()) {
			max = first;
			min = second;
		}
		else {
			max = second;
			min = first;
		}
		final int range = Math.max(max.length() / 2 - 1, 0);
		final int[] matchIndexes = new int[min.length()];
		Arrays.fill(matchIndexes, -1);
		final boolean[] matchFlags = new boolean[max.length()];
		int matches = 0;
		for (int mi = 0; mi < min.length(); mi++) {
			final char c1 = min.charAt(mi);
			for (int xi = Math.max(mi - range, 0), xn = Math.min(mi + range + 1, max.length()); xi < xn; xi++) {
				if (!matchFlags[xi] && c1 == max.charAt(xi)) {
					matchIndexes[mi] = xi;
					matchFlags[xi] = true;
					matches++;
					break;
				}
			}
		}
		final char[] ms1 = new char[matches];
		final char[] ms2 = new char[matches];
		for (int i = 0, si = 0; i < min.length(); i++) {
			if (matchIndexes[i] != -1) {
				ms1[si] = min.charAt(i);
				si++;
			}
		}
		for (int i = 0, si = 0; i < max.length(); i++) {
			if (matchFlags[i]) {
				ms2[si] = max.charAt(i);
				si++;
			}
		}
		int transpositions = 0;
		for (int mi = 0; mi < ms1.length; mi++) {
			if (ms1[mi] != ms2[mi]) {
				transpositions++;
			}
		}
		int prefix = 0;
		for (int mi = 0; mi < min.length(); mi++) {
			if (first.charAt(mi) == second.charAt(mi)) {
				prefix++;
			}
			else {
				break;
			}
		}
		return new int[] { matches, transpositions / 2, prefix, max.length() };
	}

	private List<Role> selectRecommendToRoleUser(Message<List<CreditCard>> msg, String action) throws Exception {
		// select all role that valid for current state for recommend
		// select all user for current role for current state and current user
		CreditCard creditCard = msg.getPayload().get(0);
		List<Role> appliedRoles = selectAppliedRole(creditCard, ActionType.SELECT_RECOMMEND_TO_ROLE.toString());
		log.info("Applied Role found in DB to Recommend [{}], [{}]", appliedRoles != null ? appliedRoles.size() : 0, appliedRoles.toString());
		buildRoleUser(appliedRoles, creditCard.getUserModKey());
		log.info("Builted Applied Role to Recommend [{}], [{}]", appliedRoles != null ? appliedRoles.size() : 0, appliedRoles.toString());
		return appliedRoles;
	}

	private List<Role> selectAppliedRole(CreditCard creditCard, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<Role> list = new ArrayList<Role>();
		Map<String, Object> spArgsMap = JdbcService.createSqlMap(creditCard, CreditCard.getSql2BeanMap());

		JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_CREDIT_CARD.toString());
		jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
		jdbcResult.setProcessWarnings(true);

		jdbcResult = getJdbcService().executeSP(action, SPName.ACT_CREDIT_CARD.toString(), spArgsMap, jdbcResult);

		list = JdbcUtils.mapRows(Role.class, Role.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_ROLE.toString()));

		return list;
	}

	private void buildRoleUser(List<Role> appliedRoles, Integer userId) throws Exception {
		for (Role r : appliedRoles) {
			User user = new User();
			user.setUserModKey(userId);
			if (r.getRoleId() != null) {
				user.setRoleIds(r.getRoleId().toString());
			}
			r.setRoleUserList(userService.selectRoleUser(user));
		}
	}

	private List<Role> selectReturnToRoleUser(Message<List<CreditCard>> msg, String action) throws Exception {
		// select all role that valid for current state for RETURN
		// select all user for current role for current state and current user
		CreditCard creditCard = msg.getPayload().get(0);
		List<Role> appliedRoles = selectAppliedRole(creditCard, ActionType.SELECT_RETURN_TO_ROLE.toString());
		log.info("Applied Role found in DB to Return [{}], [{}]", appliedRoles != null ? appliedRoles.size() : 0, appliedRoles.toString());
		buildRoleUser(appliedRoles, creditCard.getUserModKey());
		log.info("Builted Applied Role to Return [{}], [{}]", appliedRoles != null ? appliedRoles.size() : 0, appliedRoles.toString());
		return appliedRoles;
	}

	public JasperPrint getMemoBulkReportGenerate(HttpServletRequest request) throws Exception {
		String cardGroupId = request.getParameter("cardGroupId");
		String onlyCardPrintValue = request.getParameter("onlyCardPrintValue");
		Integer userId = Integer.parseInt(request.getParameter("userId"));
		Integer stateId = Integer.parseInt(request.getParameter("stateId"));
		String stateName = request.getParameter("stateName");
		log.debug("Generating Memo Bulk Report ", cardGroupId);

		JasperDesign jasperDesign;
		JasperPrint jasperPrint = null;
		JasperReport jasperReport;
		InputStream template = null;
		String actionType = ActionType.LMS_CARD_MEMO_REPORT_PDF.toString();
		CreditCard creditCard = new CreditCard();
		JdbcResult jdbcResult = new JdbcResult();

		String approvedMemoRef = request.getParameter("approvedMemoRef");
		String preparedByName = request.getParameter("preparedByName");
		String preparedByDesignation = request.getParameter("preparedByDesignation");
		String recommended1ByName = request.getParameter("recommended1ByName");
		String recommended2ByName = request.getParameter("recommended2ByName");
		String recommended3ByName = request.getParameter("recommended3ByName");
		String recommended4ByName = request.getParameter("recommended4ByName");
		String recommended5ByName = request.getParameter("recommended5ByName");
		String recommended6ByName = request.getParameter("recommended6ByName");
		String recommended1ByDesignation = request.getParameter("recommended1ByDesignation");
		String recommended2ByDesignation = request.getParameter("recommended2ByDesignation");
		String recommended3ByDesignation = request.getParameter("recommended3ByDesignation");
		String recommended4ByDesignation = request.getParameter("recommended4ByDesignation");
		String recommended5ByDesignation = request.getParameter("recommended5ByDesignation");
		String recommended6ByDesignation = request.getParameter("recommended6ByDesignation");
		String approvedByName = request.getParameter("approvedByName");
		String approvedByDesignation = request.getParameter("approvedByDesignation");
		log.info("Card memo only Print Value: [{}]",onlyCardPrintValue);	

		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();

		try {
			if (cardGroupId != null) {

				creditCard.setCardGroupId(cardGroupId);
				creditCard.setUserModKey(userId);
				creditCard.setUserModKey(userId);
				creditCard.setStateId(stateId);
				creditCard.setStateName(stateName);

				jdbcResult = selectSingle(creditCard, actionType, SPName.ACT_credit_card_report.toString());

				recommended1ByDesignation = recommended1ByDesignation.replaceAll("AND_SYMBOL", "&");
				recommended2ByDesignation = recommended2ByDesignation.replaceAll("AND_SYMBOL", "&");
				recommended3ByDesignation = recommended3ByDesignation.replaceAll("AND_SYMBOL", "&");
				recommended4ByDesignation = recommended4ByDesignation.replaceAll("AND_SYMBOL", "&");
				recommended5ByDesignation = recommended5ByDesignation.replaceAll("AND_SYMBOL", "&");
				recommended6ByDesignation = recommended6ByDesignation.replaceAll("AND_SYMBOL", "&");
				approvedByDesignation = approvedByDesignation.replaceAll("AND_SYMBOL", "&");

				spArgsMap.put("p_card_group_id", cardGroupId);
				spArgsMap.put("p_approved_memo_ref", approvedMemoRef);
				spArgsMap.put("p_prepared_by_name", preparedByName);
				spArgsMap.put("p_prepared_by_designation", preparedByDesignation);
				spArgsMap.put("p_recommended_1_by_name", recommended1ByName);
				spArgsMap.put("p_recommended_1_by_designation", recommended1ByDesignation);
				spArgsMap.put("p_recommended_2_by_name", recommended2ByName);
				spArgsMap.put("p_recommended_2_by_designation", recommended2ByDesignation);
				spArgsMap.put("p_recommended_3_by_name", recommended3ByName);
				spArgsMap.put("p_recommended_3_by_designation", recommended3ByDesignation);
				spArgsMap.put("p_recommended_4_by_name", recommended4ByName);
				spArgsMap.put("p_recommended_4_by_designation", recommended4ByDesignation);
				spArgsMap.put("p_recommended_5_by_name", recommended5ByName);
				spArgsMap.put("p_recommended_5_by_designation", recommended5ByDesignation);
				spArgsMap.put("p_recommended_6_by_name", recommended6ByName);
				spArgsMap.put("p_recommended_6_by_designation", recommended6ByDesignation);
				spArgsMap.put("p_approved_by_name", approvedByName);
				spArgsMap.put("p_approved_by_designation", approvedByDesignation);

				spArgsMap.put("ds_card_view_memo", new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.RS_TYPE_CARD_VIEW_MEMO.toString())));
			}
			template = getClass().getResourceAsStream("/lms_report/cardmemobulkreport.jrxml");
			jasperDesign = JRXmlLoader.load(template);
			jasperReport = JasperCompileManager.compileReport(jasperDesign);
			jasperPrint = JasperFillManager.fillReport(jasperReport, spArgsMap,
			        new JRResultSetDataSource(jdbcResult.getRsTypeMap(RSType.RS_TYPE_TOTAL_AMOUNT_FILE.toString())));
			if(!creditCard.getCardGroupId().isEmpty()&& onlyCardPrintValue.equals(Str.PRINT_WITH_SENT_TO_MD.toString())) {
				log.info("Send to MD Group Id : [{}]", creditCard.getCardGroupId());
				log.info("Print With Sent_To_Md: "+ onlyCardPrintValue);
				stateTransitionGroup(creditCard, ActionType.SEND_TO_MD.toString());
			}else {
				log.info("Print With Sent_To_Md : "+ onlyCardPrintValue);
			}
		}
		catch (Exception ex) {
			log.error("Memo Bulk Report report error : {}", ex.getLocalizedMessage());

			throw ex;
		}
		return jasperPrint;
	}
	
	private CreditCard doSelectPreApprovalLimit(CreditCard creditCard) throws Exception {
		NConfiguration config = new NConfiguration();
		config.setValue2(creditCard.getCustDesignation());
		log.info("Pre-Approval Limit Configuration.. User Role : [{}] And Pre-Approval Limit Action Type: [{}]",creditCard.getCurrentUserRoleName(),ActionType.SELECT_PRE_APPROVAL_LIMIT.toString());
		
		JdbcResult jdbcResult = selectPreApprovalLimit(config, ActionType.SELECT_PRE_APPROVAL_LIMIT.toString(), SPName.ACT_CREDIT_CARD.toString());

		List<NConfiguration> configList = JdbcUtils.mapRows(NConfiguration.class, NConfiguration.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_APPROVAL_LIMIT.toString()));
		if (configList != null && configList.size() > 0) {
			//execute pre-approved
			creditCard = doExecutePreApproved(creditCard,configList.get(0));
		}else {
			log.info("Pre-Approval Limit Configuration Not Found for this Designation");
			stateTransition(creditCard, creditCard.getUiActionName());
		}
		return creditCard;		
	}
	
	private CreditCard doExecutePreApproved(CreditCard creditCard, NConfiguration nConfiguration) throws Exception {
		log.info("Credit Card id : [{}] Customer Designation : [{}] Customer Applicant Asking Limit : [{}]:",creditCard.getCreditCardId(),creditCard.getCustDesignation(),creditCard.getApplicantAskingLimit());		
		log.info("Pre-Approval Configure id : [{}]  Designation : [{}] Pre-Approval Limit : [{}] :",nConfiguration.getConfigurationId(),nConfiguration.getValue2(),nConfiguration.getValue3());	

		if((creditCard.getCustDesignation().trim().toLowerCase().equals(nConfiguration.getValue2().trim().toLowerCase())) && (creditCard.getApplicantAskingLimit()<=Double.parseDouble(nConfiguration.getValue3()))) {
			log.info("Pre-approval limit Condition fully Ok");
			creditCard.setApprovedLimit(creditCard.getApplicantAskingLimit());
			creditCard.setApplicationNumber(generateApplicatonNo(creditCard));
			creditCard.setUserModKey(110302);
			limitStateTransition(creditCard,  ActionType.ACTION_PRE_APPROVE.toString());			
		}else {
			log.info("Pre-approval limit Condition fully Not Ok");
			stateTransition(creditCard, creditCard.getUiActionName());
		}
		return creditCard;		
	}

	private JdbcResult selectPreApprovalLimit(NConfiguration config,String action , String sp) throws Exception {
		try {
			config.setUserModKey(100000);
			JdbcResult jdbcResult = new JdbcResult();
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(config, NConfiguration.getSql2BeanMap());

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
	private boolean limitStateTransition(CreditCard creditCard, String action) throws Exception {
		Map<String, Object> spArgsMap = JdbcService.createSqlMap(creditCard, CreditCard.getSql2BeanMap());
		execute(spArgsMap, action);
		List<Comment> cmnt = creditCard.getCommentList();
		// if any comments in state transition than save it 
		if (cmnt != null && cmnt.size() > 0) {
			commentService.insert(cmnt.get(0));
		}
		return true;
	}

}
