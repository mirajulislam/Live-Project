package com.naztech.lms.service;

import java.io.InputStream;
import java.math.BigDecimal;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.concurrent.ConcurrentHashMap;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.transaction.TransactionStatus;
import org.springframework.web.multipart.MultipartFile;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
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
import com.naztech.lms.model.Comment;
import com.naztech.lms.model.Customer;
import com.naztech.lms.model.EloanView;
import com.naztech.lms.model.ExistingLiability;
import com.naztech.lms.model.Loan;
import com.naztech.lms.model.LoanDocument;
import com.naztech.lms.model.LoanGridView;
import com.naztech.lms.model.NConfiguration;
import com.naztech.lms.model.Role;
import com.naztech.lms.model.User;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRResultSetDataSource;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.xml.JRXmlLoader;

@PropertySource("classpath:app.properties")
public class LoanService extends AbstractService<Loan> {
	private static Logger log = LogManager.getLogger(LoanService.class);

	private static final DateFormat df = new SimpleDateFormat("yyMM");

	@Autowired
	FinacleService finacleService;

	@Autowired
	JdbcService jdbcService;

	@Autowired
	CustomerService customerService;

	@Autowired
	ExistingLiabilityService existingLiabilityService;

	@Autowired
	CommentService commentService;

	@Autowired
	UserService userService;
	@Autowired
	LmsSmsService lmsSmsService;

	@Autowired
	NConfigurationService nConfigurationService;
	
	@Value("${manual.sms.api.call.mode}")	
	public boolean manualSmsCallMode;

	static Gson gson;
	static {
		gson = new Gson();
	}

	@Autowired
	LoanDocumentService loanDocumentService;

	@Value("${base.type.documentTypes}")
	String documentColumnNames;

	List<String> documentColumnNamesList = null;;

	@Value("${base.documentTypes.column.match}")
	double docColNameMatchPercent;

	public void init() {
		try {
			log.info("Initializing loan Service");
			docColNameMatchPercent = docColNameMatchPercent / 100;
			documentColumnNamesList = Arrays.asList(documentColumnNames.split(","));
		}
		catch (Exception e) {
			log.error("Error initializing loan Service {}", e);
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

			if (action.equals(ActionType.SELECT_LOAN.toString())) {
				List<Loan> loan = selectLoan(msg);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_ALL_LOAN.toString())) {
				List<LoanGridView> loanList = selectAllLoan(msg);
				msgResponse = MessageBuilder.withPayload(loanList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_UNIT_HEAD_LOAD_DATA.toString())) {
				List<LoanGridView> loanList = selectUnitHeadOnLoadLoan(msg);
				msgResponse = MessageBuilder.withPayload(loanList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_ALL_LOAN_LAST_ACTION_WISE.toString())) {
				List<LoanGridView> loanList = selectLastActionWiseAllLoan(msg);
				msgResponse = MessageBuilder.withPayload(loanList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SAVE_APPLICATION.toString()) || action.equals(ActionType.SO_CREATE.toString())) {
				Loan loan = handleSaveApplication(msg, action);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.UPDATE_APPLICATION.toString()) || action.equals(ActionType.SO_UPDATE.toString())
			        || action.equals(ActionType.MIS_UPDATE.toString()) || action.equals(ActionType.CA_UPDATE.toString())
			        || action.equals(ActionType.SO_CAD_QUERY_UPDATE.toString()) || action.equals(ActionType.CA_CAD_QUERY_UPDATE.toString())) {
				Loan loan = handleUpdateApplication(msg, action);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}
			// state transition with update data
			else if (action.equals(ActionType.SO_RECOMMEND.toString()) || action.equals(ActionType.SO_RE_RECOMMEND.toString())
			        || action.equals(ActionType.MIS_ALLOCATE.toString()) || action.equals(ActionType.MIS_RE_ALLOCATE.toString())
			        || action.equals(ActionType.CA_RECOMMEND.toString()) || action.equals(ActionType.CA_RE_RECOMMEND.toString())) {
				Loan loan = handleRecommend(msg, action);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}
			//state transition without comments
			else if (action.equals(ActionType.ACTION_STATE_TRANSITION.toString())) {
				Loan loan = handleStateTransition(msg, action);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}
			// state transition with save comment
			else if (action.equals(ActionType.BM_RECOMMEND.toString()) || action.equals(ActionType.CA_SEND_QUERY.toString())
			        || action.equals(ActionType.RM_C_APPROVE.toString()) || action.equals(ActionType.RM_APPROVE.toString())
			        || action.equals(ActionType.RM_RETURN.toString()) || action.equals(ActionType.RM_RECOMMEND.toString())
			        || action.equals(ActionType.UH_RETURN.toString()) || action.equals(ActionType.UH_RECOMMEND.toString())
			        || action.equals(ActionType.HOCRM_RETURN.toString()) || action.equals(ActionType.HOCRM_RECOMMEND.toString())
			        || action.equals(ActionType.BM_RECOMMEND.toString()) || action.equals(ActionType.BM_RETURN.toString())
			        || action.equals(ActionType.BOM_RECOMMEND.toString()) || action.equals(ActionType.BOM_RETURN.toString())
			        || action.equals(ActionType.PPC_RECOMMEND.toString()) || action.equals(ActionType.PPC_RETURN.toString())
			        || action.equals(ActionType.CEO_RETURN.toString()) || action.equals(ActionType.UH_APPROVE.toString())
			        || action.equals(ActionType.UH_C_APPROVE.toString()) || action.equals(ActionType.HOCRM_APPROVE.toString())
			        || action.equals(ActionType.HOCRM_C_APPROVE.toString()) || action.equals(ActionType.CEO_APPROVE.toString())
			        || action.equals(ActionType.CEO_C_APPROVE.toString()) || action.equals(ActionType.MD_APPROVE.toString())
			        || action.equals(ActionType.MD_C_APPROVE.toString()) || action.equals(ActionType.MIS_RETURN.toString())
			        || action.equals(ActionType.CA_RETURN.toString()) || action.equals(ActionType.APPROVED_RETURN.toString())
			        || action.equals(ActionType.CAD_RETURN.toString()) || action.equals(ActionType.CAD_QUERY_TO_SO.toString())
			        || action.equals(ActionType.CAD_QUERY_TO_CA.toString())||action.equals(ActionType.CAD_DISBURSE.toString())) {
				Loan loan = handleStateTransitionV2(msg, action);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.MIS_RECEIVE.toString())) {
				Loan loan = misReceive(msg, action);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.CA_RECEIVE.toString())) {
				Loan loan = caReceive(msg, action);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_FULL_LOAN.toString())) {
				Loan loan = handleSelectFullLoan(msg);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.LAST_CREDIT_ANAYLST_RECOMMAND.toString())) {
				msgResponse = MessageBuilder.withPayload(selectPropertyForLoanPdf(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DEPUTY_HO_CRM.toString())) {
				msgResponse = MessageBuilder.withPayload(selectPropertyForLoanPdf(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DELETE_FULL_LOAN.toString()) || action.equals(ActionType.FO_DELETE.toString())
			        || action.equals(ActionType.SO_DELETE.toString())||action.equals(ActionType.CA_DELETE.toString())) {
				msgResponse = MessageBuilder.withPayload(handleDeleteLoan(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_RECOMMEND_TO_ROLE_USER.toString())) {
				msgResponse = MessageBuilder.withPayload(selectRecommendToRoleUser(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_RETURN_TO_ROLE_USER.toString())) {
				msgResponse = MessageBuilder.withPayload(selectReturnToRoleUser(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.FO_BULK_SUBMIT.toString())) {
				msgResponse = MessageBuilder.withPayload(handleFoBulkSubmit(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_STAFF_ID.toString())) {
				msgResponse = MessageBuilder.withPayload(selectPropertyForLoanPdf(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_LOAN_OF_ONE_USER.toString())) {
				List<LoanGridView> loanList = selectLoanOfOneUser(msg, action);
				msgResponse = MessageBuilder.withPayload(loanList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.LOAD_DATA_SOURCE.toString())) {
				msgResponse = MessageBuilder.withPayload(selectDataSource(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_WORK_HISTORY.toString())) {
				msgResponse = MessageBuilder.withPayload(selectWorkHistory(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.CREATE_LOAN_GROUP.toString()) || action.equals(ActionType.ADD_LOAN_TO_LOAN_GROUP.toString())
			        || action.equals(ActionType.REMOVE_LOAN_FROM_LOAN_GROUP.toString())) {
				Loan loan = createOrAddOrRemoveLoanGroup(msg, action);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_ALL_LOAN_GROUP_DATA.toString()) || action.equals(ActionType.SEARCH_LOAN_GROUP_DATA.toString())) {
				List<LoanGridView> loanList = selectAllLoanGroupData(msg, action);
				msgResponse = MessageBuilder.withPayload(loanList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_FOR_ADD_TO_LOAN_GROUP.toString())) {
				List<LoanGridView> loanList = selectAllLoanGroupData(msg, ActionType.SELECT_FOR_ADD_TO_LOAN_GROUP.toString());
				msgResponse = MessageBuilder.withPayload(loanList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.BULK_HOCRM_SEND_TO_CAD.toString())) {
				List<LoanGridView> loanList = bulkHocrmSendToCad(msg);
				msgResponse = MessageBuilder.withPayload(loanList).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SEARCH_LOAN_FOR_ELOAN.toString())|| action.equals(ActionType.SEARCH_MY_LOAN_FOR_ELOAN.toString())) {
				msgResponse = MessageBuilder.withPayload(searchForELoan(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.DUPLICATE_LOAN_CHECK_SAME_BP.toString())) {
				List<Loan> loan = checkLoan(msg);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.SELECT_LOAN_FOR_MANUAL_SMS_SEND.toString())) {
				Loan loan = null;
				loan = handleManualLoanSms(msg);
				msgResponse = MessageBuilder.withPayload(loan).copyHeadersIfAbsent(msgHeader).build();				
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

	private Object selectWorkHistory(Message<List<Loan>> msg, String action) throws Exception {
		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return doSelectWorkHistory(loanList.get(0), ActionType.SELECT_WORK_HISTORY.toString());
	}
	
	private Loan handleManualLoanSms(Message<List<Loan>>msg) throws Exception {
		List<Loan>loan = msg.getPayload();
		if(loan == null || loan.size() == 0) {
			throw new Exception("Empty Request.");
		}
		try {
			sendSmsSendToCadStateTransition(loan.get(0));
			return loan.get(0);
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
	}

	private List<LoanGridView> doSelectWorkHistory(Loan loan, String action) throws Exception {
		JdbcResult jdbcResult = executeActLoan(loan, action);
		List<LoanGridView> historyList = JdbcUtils.mapRows(LoanGridView.class, LoanGridView.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_WORK_HISTORY.toString()));

		ConcurrentHashMap<Integer, LoanGridView> historyMap = new ConcurrentHashMap<Integer, LoanGridView>();

		for (LoanGridView lgv : historyList) {

			historyMap.put(lgv.getLoanId(), lgv);

		}

		return new ArrayList<LoanGridView>(historyMap.values());
	}

	//	private List<Loan> getPropertyBeforeGeneratingLoanPdf(Message<List<Loan>> msg, String action) throws Exception {
	////		L
	////		List<Loan> loanProperty =selectPropertyForLoanPdf(loan, ActionType.LAST_CREDIT_ANAYLST_RECOMMAND.toString());
	////		return loanProperty;
	//	}

	private List<Loan> selectPropertyForLoanPdf(Message<List<Loan>> msg, String action) throws Exception {
		Loan loan = msg.getPayload().get(0);
		JdbcResult jdbcResult = new JdbcResult();
		List<Loan> list = new ArrayList<Loan>();
		String rsType = null;
		rsType = RSType.RS_LAST_CREDIT_ANAYLST_RECOMMAND.toString();

		if (action.equalsIgnoreCase(ActionType.SELECT_STAFF_ID.toString())) {
			rsType = RSType.RS_TYPE_STAFF_ID.toString();
		}

		if (action.equalsIgnoreCase(ActionType.DEPUTY_HO_CRM.toString())) {
			rsType = RSType.RS_TYPE_DEPUTY_HO_CRM.toString();
		}

		Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

		JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
		jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
		jdbcResult.setProcessWarnings(true);

		jdbcResult = getJdbcService().executeSP(action, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);

		list = JdbcUtils.mapRows(Loan.class, Loan.getRs2BeanMap(), jdbcResult.getRsTypeMap(rsType));

		return list;

	}

	private List<Role> selectReturnToRoleUser(Message<List<Loan>> msg, String action) throws Exception {
		// select all role that valid for current state for RETURN
		// select all user for current role for current state and current user
		Loan loan = msg.getPayload().get(0);
		List<Role> appliedRoles = selectAppliedRole(loan, ActionType.SELECT_RETURN_TO_ROLE.toString());
		log.info("Applied Role found in DB to Return [{}], [{}]", appliedRoles != null ? appliedRoles.size() : 0, appliedRoles.toString());
		buildRoleUser(appliedRoles, loan.getUserModKey());
		log.info("Builted Applied Role to Return [{}], [{}]", appliedRoles != null ? appliedRoles.size() : 0, appliedRoles.toString());
		return appliedRoles;
	}

	private List<Role> selectAppliedRole(Loan loan, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<Role> list = new ArrayList<Role>();
		Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

		JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
		jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
		jdbcResult.setProcessWarnings(true);

		jdbcResult = getJdbcService().executeSP(action, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);

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

	private List<Role> selectRecommendToRoleUser(Message<List<Loan>> msg, String action) throws Exception {
		// select all role that valid for current state for recommend
		// select all user for current role for current state and current user
		Loan loan = msg.getPayload().get(0);
		List<Role> appliedRoles = selectAppliedRole(loan, ActionType.SELECT_RECOMMEND_TO_ROLE.toString());
		log.info("Applied Role found in DB to Recommend [{}], [{}]", appliedRoles != null ? appliedRoles.size() : 0, appliedRoles.toString());
		buildRoleUser(appliedRoles, loan.getUserModKey());
		log.info("Builted Applied Role to Recommend [{}], [{}]", appliedRoles != null ? appliedRoles.size() : 0, appliedRoles.toString());
		return appliedRoles;
	}

	/**
	 * This method only responsible change state.
	 * To do so we need to pass actual action from UI. like : BM_RECOMMEND
	 * 
	 * @param msg
	 * @param action
	 * @return
	 * @throws Exception
	 */
	private Loan onlyStateTransition(Message<List<Loan>> msg, String action) throws Exception {
		Loan loan = msg.getPayload().get(0);
		stateTransition(loan, action);
		return loan;
	}

	private Loan handleStateTransition(Message<List<Loan>> msg, String action) throws Exception {
		Loan loan = msg.getPayload().get(0);
		stateTransition(loan, loan.getUiActionName());
		if(loan.getUiActionName().equals("HOCRM_SEND_TO_CAD") && manualSmsCallMode) {
			 Thread.sleep(5000);
			 log.info("Manual SMS Api Call Mode : [{}]",manualSmsCallMode);
			 sendSmsSendToCadStateTransition(msg.getPayload().get(0));
			}else {
				log.info("Manual SMS Api Call Mode : [{}]",manualSmsCallMode);
			}		
		return loan;
	}
	private void sendSmsSendToCadStateTransition(Loan loan) throws Exception {	
		if(manualSmsCallMode) {
			if(isEmptyString(loan.getLoanIdListStr())) {
				String loanidStr = loan.getLoanId().toString();
				loan.setLoanIdListStr(loanidStr);
			}	
			log.info("Manual SMS Api Call Mode : [{}]",manualSmsCallMode);
			lmsSmsService.handleSelectForSmsSend(loan,ActionType.SELECT_LOAN_FOR_MANUAL_SMS_SEND.toString());							
		}else {
			log.info("Manual SMS Api Call Mode : [{}]",manualSmsCallMode);
		}
	}

	private Loan handleStateTransitionV2(Message<List<Loan>> msg, String action) throws Exception {
		Loan loan = msg.getPayload().get(0);
		loan.setUiActionName(action);
		stateTransition(loan, loan.getUiActionName());
		if(loan.getUiActionName().equals("CAD_DISBURSE") && manualSmsCallMode) {
			 Thread.sleep(5000);
			 log.info("Manual SMS Api Call Mode : [{}]",manualSmsCallMode);
			 sendSmsSendToCadStateTransition(msg.getPayload().get(0));
		}else {
			log.info("Manual SMS Api Call Mode : [{}]",manualSmsCallMode);
		}	
		return loan;
	}
	public Loan cadDisbursedCbs(Loan loan, String action) throws Exception {
		loan.setUiActionName(action);
		stateTransition(loan, loan.getUiActionName());
		if(loan.getUiActionName().equals("CAD_DISBURSE") && manualSmsCallMode) {
			 Thread.sleep(5000);
			 log.info("Manual SMS Api Call Mode : [{}]",manualSmsCallMode);
			 sendSmsSendToCadStateTransition(loan);
		}else {
			log.info("Manual SMS Api Call Mode : [{}]",manualSmsCallMode);
		}
		return loan;
	}

	private Loan misReceive(Message<List<Loan>> msg, String action) throws Exception {
		Loan loan = msg.getPayload().get(0);
		loan.setApplicationNo(generateApplicatonNo(loan));
		stateTransition(loan, action);
		return loan;
	}

	private Loan caReceive(Message<List<Loan>> msg, String action) throws Exception {
		Loan loan = msg.getPayload().get(0);
		loan.setApplicationNo(generateApplicatonNo(loan));
		stateTransition(loan, action);
		return loan;
	}

	private String generateApplicatonNo(Loan loan) throws Exception {
		String applicationId = getNextApplicationNoStr();
		String applicationNumber = String.format("%4s", applicationId).replace(' ', '0');

		String yymm = df.format(new Date());
		StringBuilder sb = new StringBuilder();
		sb.append(yymm).append(applicationNumber);
		log.debug("Generated application no [{}]. Will add prefix with it", sb.toString());
		return sb.toString();
	}

	private Loan handleRecommend(Message<List<Loan>> msg, String action) throws Exception {

		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		Loan loan = loanList.get(0);

		try {
			// insert the reason to recommend
			List<Comment> cmntList = loan.getCommentList();

			if (cmntList != null && cmntList.size() > 0) commentService.insert(cmntList.get(0));

			/* 
			 * insert recommendGroupId, recommendToId
			 * make sure everything is up-to-date
			*/
			loan = handleUpdateApplication(loan, action);

		}
		catch (Exception e) {
			log.error("Error processing [{}] -> [{}]", action, e);
			throw e;
		}
		return loan;
	}

	public boolean stateTransition(Loan loan, String uiActionName) throws Exception {

		Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());
		spArgsMap.put("@tx_ui_action_name", uiActionName);
		execute(spArgsMap, ActionType.ACTION_STATE_TRANSITION.toString());
		List<Comment> cmnt = loan.getCommentList();
		// if any comments in state transition than save it 
		if (cmnt != null && cmnt.size() > 0) {
			commentService.insert(cmnt.get(0));
		}
		return true;
	}

	private Loan handleSelectFullLoan(Message<List<Loan>> msg) throws Exception {
		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return doSelectFullLoan(loanList.get(0));
	}

	private List<LoanGridView> selectAllLoan(Message<List<Loan>> msg) throws Exception {

		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doSelectLoanForGrid(loanList.get(0), ActionType.SELECT_LOAN_FOR_GRID.toString());
	}

	private List<LoanGridView> selectUnitHeadOnLoadLoan(Message<List<Loan>> msg) throws Exception {

		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doSelectLoanForGrid(loanList.get(0), ActionType.SELECT_UNIT_HEAD_LOAD_DATA.toString());
	}

	private List<LoanGridView> selectLastActionWiseAllLoan(Message<List<Loan>> msg) throws Exception {

		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doSelectLoanForGrid(loanList.get(0), ActionType.SELECT_ALL_LOAN_LAST_ACTION_WISE.toString());
	}

	private List<LoanGridView> selectLoanOfOneUser(Message<List<Loan>> msg, String action) throws Exception {

		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return doSelectLoanForGrid(loanList.get(0), action);
	}

	private Loan handleSaveApplication(Message<List<Loan>> msg, String action) throws Exception {
		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleSaveApplication(loanList.get(0), action);
	}

	public Loan handleSaveApplication(Loan loan, String action) throws Exception {
		return doHandleSaveApplication(loan, action);
	}

	private Loan doHandleSaveApplication(Loan loan, String action) throws Exception {

		log.debug("Saving Loan Application with action[{}], [{}]", action, loan.toString());

		TransactionStatus txnStatus = null;
		try {
			String err = isMandetoryField(loan);
			if (err.equals("OK")) {

				txnStatus = getJdbcService().beginTran();
				// insert/update customer
				Customer cust = customerService.insertCustomer(loan.getCustomer());

				loan.setCustomerIdKey(cust.getCustomerIdKey());
				loan.setIdCustomerVer(cust.getIdCustomerVer());
				// set loan tracking id at save time
				loan.setLoanTrackingId(getLoanTrackingId());

				loan.setCreatorId(loan.getUserModKey());
				loan = execute(loan, action);

				List<ExistingLiability> existingLiability = loan.getExistingLiabilityList();
				List<Comment> cibStatusList = loan.getCibStatusList();
				List<Comment> analystsCommentsList = loan.getAnalystsCommentsList();
				List<Comment> exceptionDetailsList = loan.getExceptionDetailsList();
				List<Comment> instructionToCadList = loan.getInstructionToCadList();

				List<Comment> cmntJustificationList = loan.getCmntJustificationList();
				List<Comment> cmntWaiverSoughtList = loan.getCmntWaiverSoughtList();
				List<Comment> sourceRecmndList = loan.getSourceRecmndList();
				List<Comment> branchRecmndList = loan.getBranchRecmndList();
				List<LoanDocument> loanDocList = loan.getLoanDocumentList();

				if (existingLiability != null) {
					for (ExistingLiability it : existingLiability) {
						it.setLoanId(loan.getLoanId());
						existingLiabilityService.insert(it);
					}
				}
				if (cibStatusList != null) {
					for (Comment it : cibStatusList) {
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
				}
				if (analystsCommentsList != null) {
					for (Comment it : analystsCommentsList) {
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
				}
				if (exceptionDetailsList != null) {
					for (Comment it : exceptionDetailsList) {
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
				}
				if (instructionToCadList != null) {
					for (Comment it : instructionToCadList) {
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
				}

				if (cmntJustificationList != null) {
					for (Comment it : cmntJustificationList) {
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
				}

				if (cmntWaiverSoughtList != null) {
					for (Comment it : cmntWaiverSoughtList) {
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
				}

				if (sourceRecmndList != null) {
					for (Comment it : sourceRecmndList) {
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
				}

				if (branchRecmndList != null) {
					for (Comment it : branchRecmndList) {
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
				}

				if (loanDocList != null) {
					for (LoanDocument it : loanDocList) {
						it.setLoanId(loan.getLoanId());
						loanDocumentService.doInsert(it);
					}
				}

				getJdbcService().commitTran(txnStatus);
			}
			else {
				log.warn("Warning: ", err);
				throw new Exception(err);
			}
			return loan;
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			if (txnStatus != null) {
				getJdbcService().rollbackTran(txnStatus);
			}
			throw e;
		}
	}

	/**
	 * @param loan
	 * @return
	 * @throws Exception
	 */
	private String isMandetoryField(Loan loan) throws Exception {
		String errMsg = null;
		String dataSource = loan.getDataSource();
		if (dataSource ==Str.dataSource && isEmptyString(loan.getVerificationEmail())) {
			errMsg = "Email should not be empty.";
		}else {
			errMsg = "OK";
		}
		return errMsg;
	}

	private String handleDeleteLoan(Message<List<Loan>> msg, String action) throws Exception {
		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleDeleteLoan(loanList.get(0), action);
	}

	public String handleDeleteLoan(Loan loan, String action) throws Exception {
		return doHandleDeleteLoan(loan, action);
	}

	private String doHandleDeleteLoan(Loan loan, String action) throws Exception {

		log.debug("Deleting Loan Application with action[{}], [{}]", action, loan.toString());

		TransactionStatus txnStatus = getJdbcService().beginTran();
		try {
			execute(loan, action);
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

	private Loan handleUpdateApplication(Message<List<Loan>> msg, String action) throws Exception {
		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		Loan loan = loanList.get(0);

		doHandleUpdateApplication(loan, action);

		List<LoanDocument> loanDocList = loan.getLoanDocumentList();

		log.debug("Updating Loan Doc List with action[{}], [{}]", action, loanDocList.toString());

		LoanDocument loanDoc = new LoanDocument();
		loanDoc.setLoanId(loan.getLoanId());
		loanDoc.setUserModKey(loan.getUserModKey());

		loanDocumentService.doExecute(loanDoc, ActionType.DELETE_DOC_FOR_EXISTING_LOAN.toString());

		if (loanDocList != null) {
			for (LoanDocument it : loanDocList) {
				if (it.getLoanDocId() == null) {
					it.setLoanId(loan.getLoanId());
					it.setUserModKey(loan.getUserModKey());
					loanDocumentService.doInsert(it);
				}
				else {
					loanDocumentService.doExecute(it, ActionType.MAKE_LOAN_DOC_ACTIVE.toString());
				}
			}
		}
		return loan;
	}

	public Loan handleUpdateApplication(Loan loan, String action) throws Exception {
		return doHandleUpdateApplication(loan, action);
	}

	private Loan doHandleUpdateApplication(Loan loan, String action) throws Exception {
		log.debug("Updating Loan Application with action[{}], [{}]", action, loan.toString());

		TransactionStatus txnStatus = null;
		try {
			txnStatus = getJdbcService().beginTran();

			Customer cust = loan.getCustomer();

			if (cust.getIsMatchedNid() == null || cust.getIsMatchedNid().isEmpty()) {
				cust.setIsMatchedNid("false");
			}

			cust = customerService.updateCustomer(cust);

			loan.setCustomerIdKey(cust.getCustomerIdKey());
			loan.setIdCustomerVer(cust.getIdCustomerVer());
			loan = execute(loan, action);

			List<ExistingLiability> existingLiability = loan.getExistingLiabilityList();
			List<Comment> cibStatusList = loan.getCibStatusList();
			List<Comment> analystsCommentsList = loan.getAnalystsCommentsList();
			List<Comment> exceptionDetailsList = loan.getExceptionDetailsList();
			List<Comment> instructionToCadList = loan.getInstructionToCadList();

			List<Comment> cmntJustificationList = loan.getCmntJustificationList();
			List<Comment> cmntWaiverSoughtList = loan.getCmntWaiverSoughtList();
			List<Comment> sourceRecmndList = loan.getSourceRecmndList();
			List<Comment> branchRecmndList = loan.getBranchRecmndList();

			if (existingLiability != null) {
				for (ExistingLiability it : existingLiability) {
					if (it.getExistingLiabilityId() == null) {
						it.setLoanId(loan.getLoanId());
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
						it.setRefId(loan.getLoanId());
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
						it.setRefId(loan.getLoanId());
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
						it.setRefId(loan.getLoanId());
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
						it.setRefId(loan.getLoanId());
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
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
					else {
						commentService.update(it);
					}
				}
			}

			if (cmntWaiverSoughtList != null) {
				for (Comment it : cmntWaiverSoughtList) {
					if (it.getCommentId() == null) {
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
					else {
						commentService.update(it);
					}
				}
			}

			if (sourceRecmndList != null) {
				for (Comment it : sourceRecmndList) {
					if (it.getCommentId() == null) {
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
					else {
						commentService.update(it);
					}
				}
			}

			if (branchRecmndList != null) {
				for (Comment it : branchRecmndList) {
					if (it.getCommentId() == null) {
						it.setRefId(loan.getLoanId());
						commentService.insert(it);
					}
					else {
						commentService.update(it);
					}
				}
			}

			getJdbcService().commitTran(txnStatus);
			return loan;
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			if (txnStatus != null) {
				getJdbcService().rollbackTran(txnStatus);
			}
			throw e;
		}
	}

	private List<Loan> selectLoan(Message<List<Loan>> msg) throws Exception {
		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		try {
			return doSelectLoan(loanList.get(0));
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
	}
	
	private List<Loan> checkLoan(Message<List<Loan>> msg) throws Exception {
		String actionType = ActionType.DUPLICATE_LOAN_CHECK_SAME_BP.toString();
		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		try {
			return doCheckLoan(loanList.get(0),actionType);
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}
	}

	/**
	 * @param loan
	 * @param actionType
	 * @return
	 * @throws Exception 
	 */
	private List<Loan> doCheckLoan(Loan loan, String actionType) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<Loan> loanList = new ArrayList<Loan>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(actionType, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);

			loanList = JdbcUtils.mapRows(Loan.class, Loan.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_CHECK_SAME_BP.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return loanList;
	}

	Loan insertLoan(Loan loan) throws Exception {
		return execute(loan, ActionType.NEW.toString());
	}

	Loan updateLoan(Loan loan) throws Exception {
		return execute(loan, ActionType.UPDATE.toString());
	}

	private List<Loan> doSelectLoan(Loan loan) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();
		List<Loan> loanList = new ArrayList<Loan>();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.SEL_lOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(ActionType.SELECT.toString(), SPName.SEL_lOAN.toString(), spArgsMap, jdbcResult);

			loanList = JdbcUtils.mapRows(Loan.class, Loan.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return loanList;
	}

	private List<LoanGridView> doSelectLoanForGrid(Loan loan, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);

			List<LoanGridView> loanGridViewList = JdbcUtils.mapRows(LoanGridView.class, LoanGridView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_FOR_GRID.toString()));

			return loanGridViewList;

		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}

	private Loan doSelectFullLoan(Loan loan) throws Exception {

		try {

			JdbcResult jdbcResult = selectSingle(loan, ActionType.SELECT_FULL_LOAN.toString(), SPName.ACT_LOAN.toString());

			List<Loan> loanList = JdbcUtils.mapRows(Loan.class, Loan.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN.toString()));
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
			List<Comment> cmntWaiverSoughtList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_COMMENTS_WAIVER_SOUGHT.toString()));
			List<Comment> sourceRecmndList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_SO_RECOMMENDATION.toString()));
			List<Comment> branchRecmndList = JdbcUtils.mapRows(Comment.class, Comment.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_BM_RECOMMENDATION.toString()));

			List<LoanDocument> loanDocList = JdbcUtils.mapRows(LoanDocument.class, LoanDocument.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_DOCUMENT.toString()));

			List<LoanDocument> loanDocListForCibStatus = JdbcUtils.mapRows(LoanDocument.class, LoanDocument.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_DOC_CIB_STATUS.toString()));

			List<Loan> rmOrUhManagerList = JdbcUtils.mapRows(Loan.class, Loan.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_MANAGER.toString()));

			if (loanList != null && loanList.size() > 0) {
				loan = loanList.get(0);
				if (custList != null && custList.size() > 0) {
					loan.setCustomer(custList.get(0));
				}
				loan.setExistingLiabilityList(liabilityList);
				loan.setCibStatusList(cibStatusList);
				loan.setAnalystsCommentsList(analystsCommentsList);
				loan.setExceptionDetailsList(exceptionDetailsList);
				loan.setInstructionToCadList(instructionToCadList);
				loan.setCmntJustificationList(cmntJustificationList);
				loan.setCmntWaiverSoughtList(cmntWaiverSoughtList);
				loan.setSourceRecmndList(sourceRecmndList);
				loan.setBranchRecmndList(branchRecmndList);
				loan.setLoanDocumentList(loanDocList);
				loan.setLoanDocListForCibStatus(loanDocListForCibStatus);
				loan.setRmOrUhManagerList(rmOrUhManagerList);
			}
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return loan;
	}

	public JdbcResult selectSingle(Loan loan, String action, String sp) throws Exception {
		try {
			JdbcResult jdbcResult = new JdbcResult();
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(sp);
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);
			return jdbcService.executeSP(action, sp, spArgsMap, jdbcResult);
		}
		catch (Exception e) {
			log.error("Exception getting loan [{}]", e);
			throw e;
		}
	}

	private JdbcResult execute(Map<String, Object> spArgsMap, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();

		try {

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);

		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return jdbcResult;
	}

	private Loan execute(Loan loan, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();

			if (outputMap.get("@id_loan_key") != null) {
				loan.setLoanId(Integer.parseInt(outputMap.get("@id_loan_key").toString()));
			}
			if (outputMap.get("@id_customer_key") != null) {
				loan.setCustomerIdKey(Integer.parseInt(outputMap.get("@id_customer_key").toString()));
			}

			if (outputMap.get("@id_customer_ver") != null) {
				loan.setIdCustomerVer(Integer.parseInt(outputMap.get("@id_customer_ver").toString()));
			}
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return loan;
	}

	private JdbcResult executeActLoan(Loan loan, String action) throws Exception {

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

		return jdbcResult;
	}

	public JasperPrint getJasperPrintForLoanReport(HttpServletRequest request) throws Exception {

		String reportName = request.getParameter("reportName");
		Integer userId = Integer.parseInt(request.getParameter("userId"));
		String userName = request.getParameter("username");
		String[] idList = request.getParameterValues("idList");

		String creditSupportOfficerName = request.getParameter("creditSupportOfficerName");
		String rmOrUhName = request.getParameter("rmOrUhName");
		String rmOrUhDesignation = request.getParameter("rmOrUhDesignation");
		String hocrmName = request.getParameter("hocrmName");
		String managingDirectorCeoName = request.getParameter("managingDirectorCeoName");
		String staffId = request.getParameter("staffId");
		String deputyHoCRM = request.getParameter("deputyHoCRM");

		Date reportGenDate = new Date();
		DateFormat dateFormat = new SimpleDateFormat("dd MMM, yyyy HH:mm:ss a");
		JasperDesign jasperDesign;
		JasperPrint jasperPrint = null;
		JasperReport jasperReport;
		JRResultSetDataSource resultSetDataSource = null;
		JdbcResult jdbcResult = new JdbcResult();
		Loan loan = new Loan();
		InputStream template = null;
		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();
		String actionType = ActionType.LMS_BRANCH_LOAN_PDF.toString();
		String pdfTitle = Str.PDF_TITLE_PERSONAL_LOAN;
		String loanType = null;
		String priceQuotationAmount = Str.PRICE_QUATATION_AMOUNT;
		String bankParticipation = Str.BANK_PARTICIPATION;

		spArgsMap.put("tx_user_name", userName);
		spArgsMap.put("@id_user_mod_key", userId);
		spArgsMap.put("genDateTime", dateFormat.format(reportGenDate).toString());

		log.debug("start LMS Loan details report");

		try {

			for (int i = 0; i < idList.length; i++) {
				loan.setLoanId(Integer.parseInt(idList[i]));
				loan.setUserModKey(userId);
				loan.setStaffId(staffId);
			}

			if (reportName.equalsIgnoreCase(Str.LMS_HEAD_OFFICE)) {
				actionType = ActionType.LMS_HEAD_OFFICE_LOAN_PDF.toString();
			}

			jdbcResult = selectSingle(loan, actionType, SPName.ACT_REPORT.toString());

			Map<String, Object> outputMap = jdbcResult.getOutputParamValueMap();
			String condition = "";

			//			if (outputMap.get("@tx_condition") != null) {
			//				condition = outputMap.get("@tx_condition").toString();
			//			}

			ResultSet rs_loan = jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN.toString());
			ResultSet rs_customer = jdbcResult.getRsTypeMap(RSType.RS_TYPE_CUSTOMER.toString());
			ResultSet rs_cxisting_liability = jdbcResult.getRsTypeMap(RSType.RS_TYPE_EXISTING_LIABILITY.toString());
			ResultSet rs_tracking_id = jdbcResult.getRsTypeMap(RSType.RS_TYPE_TRACKING_ID.toString());
			ResultSet rs_condition = jdbcResult.getRsTypeMap(RSType.RS_TYPE_CONDITION.toString());
			ResultSet rs_loan_type = jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_TYPE.toString());

			spArgsMap.put("ds_loan", new JRResultSetDataSource(rs_loan));
			spArgsMap.put("ds_customer", new JRResultSetDataSource(rs_customer));
			spArgsMap.put("ds_cxisting_liability", new JRResultSetDataSource(rs_cxisting_liability));
			spArgsMap.put("ds_loan_tracking_id", new JRResultSetDataSource(rs_tracking_id));
			spArgsMap.put("staffId", staffId);

			if (rs_condition != null) {
				while (rs_condition.next()) {
					condition = rs_condition.getString("tx_condition");
				}
			}

			if (rs_loan_type != null) {
				while (rs_loan_type.next()) {
					loanType = rs_loan_type.getString("tx_loan_type");
				}
			}

			if (reportName.equalsIgnoreCase(Str.LMS_HEAD_OFFICE)) {
				ResultSet rs_loan_2 = jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_2.toString());
				ResultSet rs_cib_stasus = jdbcResult.getRsTypeMap(RSType.RS_TYPE_CIB_STATUS.toString());
				ResultSet rs_analysts_comments = jdbcResult.getRsTypeMap(RSType.RS_TYPE_ANALYSTS_COMMENTS.toString());
				ResultSet rs_exception_details = jdbcResult.getRsTypeMap(RSType.RS_TYPE_EXCEPTION_DETAILS.toString());
				ResultSet rs_instruction_to_cad = jdbcResult.getRsTypeMap(RSType.RS_TYPE_INSTRUCTION_TO_CAD.toString());
				ResultSet rs_manager = jdbcResult.getRsTypeMap(RSType.RS_TYPE_MANAGER.toString());

				spArgsMap.put("ds_loan_2", new JRResultSetDataSource(rs_loan_2));
				spArgsMap.put("ds_cib_stasus", new JRResultSetDataSource(rs_cib_stasus));
				spArgsMap.put("ds_analysts_comments", new JRResultSetDataSource(rs_analysts_comments));
				spArgsMap.put("ds_exception_details", new JRResultSetDataSource(rs_exception_details));
				spArgsMap.put("ds_instruction_to_cad", new JRResultSetDataSource(rs_instruction_to_cad));
				spArgsMap.put("creditSupportOfficer", creditSupportOfficerName);
				spArgsMap.put("hocrm", hocrmName);
				spArgsMap.put("ceo", managingDirectorCeoName);
				spArgsMap.put("condition", condition);
				spArgsMap.put("p_deputyHoCRM", deputyHoCRM);

				// TODO: COMPARE WITH LOAN PREFIX
				if (loanType.equalsIgnoreCase(Str.GPF_LOAN_PREFIX)) {

					pdfTitle = Str.PDF_TITLE_GPG_BACKED_LOAN;
					priceQuotationAmount = Str.GPF_AMOUNT;
					bankParticipation = Str.LTV;
				}

				log.debug("RM|UH name:designation=>[{}]:[{}]", rmOrUhName, rmOrUhDesignation);
				if (StringUtils.isEmpty(rmOrUhName) || StringUtils.isEmpty(rmOrUhDesignation)) {
					// if name or designation is empty then take it from db
					log.info("Getting RM|UH name and designation from db");
					if (rs_manager != null) {
						while (rs_manager.next()) {
							rmOrUhName = rs_manager.getString("tx_user_name");
							rmOrUhDesignation = rs_manager.getString("tx_designation");
						}
					}
				}

				spArgsMap.put("priceQuotationAmount", priceQuotationAmount);
				spArgsMap.put("bankParticipation", bankParticipation);
				spArgsMap.put("pdfTitle", pdfTitle);
				spArgsMap.put("rmOrUhName", rmOrUhName);
				spArgsMap.put("rmOrUhDesignation", rmOrUhDesignation);

				template = getClass().getResourceAsStream("/lms_report/headOfficePersonalLoanApprovalSheetReport.jrxml");
			}
			else {
				ResultSet rs_loan_document = jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_DOCUMENT.toString());
				ResultSet rs_comments_justification = jdbcResult.getRsTypeMap(RSType.RS_TYPE_COMMENTS_JUSTIFICATION.toString());
				ResultSet rs_comments_waiver_sought = jdbcResult.getRsTypeMap(RSType.RS_TYPE_COMMENTS_WAIVER_SOUGHT.toString());
				ResultSet rs_so_recomendation = jdbcResult.getRsTypeMap(RSType.RS_TYPE_SO_RECOMMENDATION.toString());
				ResultSet rs_bm_recomendation = jdbcResult.getRsTypeMap(RSType.RS_TYPE_BM_RECOMMENDATION.toString());
				ResultSet rs_branch_stuff = jdbcResult.getRsTypeMap(RSType.RS_TYPE_BRANCH_NAME_STUFF_ID.toString());
				ResultSet rs_waiver_sought = jdbcResult.getRsTypeMap(RSType.RS_TYPE_WAIVER_SOUGHT.toString());

				if (rs_loan_document != null) {
					log.info("Require Documents Name Match Percent = {}", docColNameMatchPercent);
					while (rs_loan_document.next()) {
						String docType = rs_loan_document.getString("tx_doc_type");
						int upldsts = rs_loan_document.getInt("int_upload_status");
						if (docType != null) {
							String[] matchData = findDocTypeMatching(docType);
							double match = Double.parseDouble(matchData[0]);
							log.info("Status/Match/DocName => [{}]/[{}]/[{}]", upldsts, match, docType);
							if (match >= docColNameMatchPercent) {
								spArgsMap.put(matchData[1].toLowerCase(), upldsts);
							}
						}

					}
				}

				spArgsMap.put("ds_waiver_sought", new JRResultSetDataSource(rs_waiver_sought));
				spArgsMap.put("ds_comments_justification", new JRResultSetDataSource(rs_comments_justification));
				spArgsMap.put("ds_comments_waiver_sought", new JRResultSetDataSource(rs_comments_waiver_sought));
				spArgsMap.put("ds_so_recomendation", new JRResultSetDataSource(rs_so_recomendation));
				spArgsMap.put("ds_bm_recomendation", new JRResultSetDataSource(rs_bm_recomendation));
				spArgsMap.put("ds_branch_stuff", new JRResultSetDataSource(rs_branch_stuff));

				if (loanType.equalsIgnoreCase(Str.GPF_LOAN_PREFIX)) {
					template = getClass().getResourceAsStream("/lms_report/gpfBranchReport.jrxml");
				}
				else {
					template = getClass().getResourceAsStream("/lms_report/branchPersonalLoanApprovalSheetReport.jrxml");
				}

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

	public JasperPrint getMemoBulkReportGenerate(HttpServletRequest request) throws Exception {

		String loanGroupId = request.getParameter("loanGroupId");
		Integer userId = Integer.parseInt(request.getParameter("userId"));
		log.debug("Generating Memo Bulk Report ", loanGroupId);

		Date reportGenDate = new Date();
		DateFormat dateFormatFull = new SimpleDateFormat("dd MMM, yyyy HH:mm:ss a");
		JasperDesign jasperDesign;
		JasperPrint jasperPrint = null;
		JasperReport jasperReport;
		InputStream template = null;
		String actionType = ActionType.LMS_MEMO_REPORT_PDF.toString();
		Loan loan = new Loan();
		JdbcResult jdbcResult = new JdbcResult();

		String unitHeadReailCredit = request.getParameter("unitHeadReailCredit");
		String hocrm = request.getParameter("hocrm");
		String managingDirectorCeo = request.getParameter("managingDirectorCeo");
		String deputyHoCRM = request.getParameter("deputyHoCRM");
		BigDecimal totalAmount = null;
		String totalfile = null;
		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();

		try {
			spArgsMap.put("memofullDate", dateFormatFull.format(reportGenDate).toString());
			spArgsMap.put("unitHeadReailCredit", unitHeadReailCredit);
			spArgsMap.put("managingDirectorCeo", managingDirectorCeo);
			spArgsMap.put("p_deputyHoCRM", deputyHoCRM);
			spArgsMap.put("hocrm", hocrm);
			if (loanGroupId != null) {
				loan.setLoanGroupId(loanGroupId);
				loan.setUserModKey(userId);

				jdbcResult = selectSingle(loan, actionType, SPName.ACT_REPORT.toString());

				ResultSet rs_loan_view_memo = jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_VIEW_MEMO.toString());
				ResultSet rs_loan_TotAmt_File = jdbcResult.getRsTypeMap(RSType.RS_TYPE_TOTAL_AMOUNT_FILE.toString());
				if (rs_loan_TotAmt_File != null) {
					while (rs_loan_TotAmt_File.next()) {
						totalAmount = rs_loan_TotAmt_File.getBigDecimal("TotalAmount");
						totalfile = rs_loan_TotAmt_File.getString("TotalFile");
					}
				}

				spArgsMap.put("loanGroupId", loanGroupId);
				spArgsMap.put("ds_loan_view_memo", new JRResultSetDataSource(rs_loan_view_memo));
				spArgsMap.put("totalAmount", totalAmount);
				spArgsMap.put("totalfile", totalfile);

			}
			template = getClass().getResourceAsStream("/lms_report/memobulkreport.jrxml");
			jasperDesign = JRXmlLoader.load(template);
			jasperReport = JasperCompileManager.compileReport(jasperDesign);
			jasperPrint = JasperFillManager.fillReport(jasperReport, spArgsMap, new JREmptyDataSource());
		}
		catch (Exception ex) {
			log.error("Memo Bulk Report report error : {}", ex.getLocalizedMessage());

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

	protected String getNextApplicationNoStr() throws Exception {
		return Integer.toString(getNextApplicationNo());
	}

	protected String getLoanTrackingId() throws Exception {
		Integer loanTrackingIdKey = getSystemId("id_loan_tracking_id_key");
		log.info("Loan Tracking Id Key to save this loan [{}]", loanTrackingIdKey);
		return Integer.toString(loanTrackingIdKey);
	}

	protected Integer getNextApplicationNo() throws Exception {
		Integer requestKey = null;
		try {
			Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>(0);

			JdbcResult jdbcResult = new JdbcResult();
			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.GET_SYSTEM_KEY.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			spArgsMap.put("@id_env_key", 100000);
			spArgsMap.put("@tx_key_name", "id_loan_application_id_key");
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

	protected Integer getSystemId(String name) throws Exception {
		Integer requestKey = null;
		try {
			Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>(0);

			JdbcResult jdbcResult = new JdbcResult();
			JdbcStoredProcedure jdbcStoredProcedure = getJdbcService().getJdbcStoredProcedure(SPName.GET_SYSTEM_KEY.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			spArgsMap.put("@id_env_key", 100000);
			spArgsMap.put("@tx_key_name", name);
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

	public Loan handleInitiateLoan(String action, Loan loan, MultipartFile[] files) {

		log.debug("Handling initial loan [{}]", loan.toString());

		List<LoanDocument> loanDocList = loan.getLoanDocumentList();
		loan.setLoanDocumentList(null);

		Integer loanId = null;

		try {
			if (loan.getLoanId() == null) {
				log.debug("Saving initial loan");
				Loan loanRtnFromSave = handleSaveApplication(loan, action);
				loanId = loanRtnFromSave.getLoanId();
				loan.setLoanId(loanId);
			}
			else {
				log.debug("Updating initial loan");
				handleUpdateApplication(loan, action);
				loanId = loan.getLoanId();
			}

			for (MultipartFile file : files) {

				if (!file.isEmpty()) {
					LoanDocument loanDoc = getDocFromDocName(file.getOriginalFilename(), loanDocList);

					if (loanDoc != null) {
						loanDoc.setLoanId(loanId);
						loanDoc.setUserModKey(loan.getUserModKey());

						loanDocumentService.saveDocumentFile(file, loanDoc, Str.MOBILE_VIEW);

					}
				}
			}
			for (LoanDocument loanDoc : loanDocList) {
				loanDoc.setLoanId(loanId);
				loanDoc.setUserModKey(loan.getUserModKey());
				loanDocumentService.doExecute(loanDoc, ActionType.NEW_MOBILE_VIEW.toString());
			}
		}
		catch (Exception e) {
			log.error("Exception processing loan with file request, [{}]", e);
		}

		// handle initiate as per business logic

		return loan;
	}

	private LoanDocument getDocFromDocName(String filename, List<LoanDocument> loanDocumentList) {
		for (LoanDocument loanDoc : loanDocumentList) {
			if (loanDoc.getDocName() != null && loanDoc.getDocName().equals(filename)) {
				LoanDocument loanDocument = loanDoc;
				loanDocumentList.remove(loanDoc);
				return loanDocument;
			}
		}
		return null;
	}

	public JasperPrint getJasperPrintForCadReport(HttpServletRequest request) throws Exception {

		Integer loanId = Integer.parseInt(request.getParameter("loanId"));
		Integer userModKey = Integer.parseInt(request.getParameter("userModKey"));
		log.debug("Generating Sanction Letter report with loan ID [{}]", loanId);

		String oneNosChequesAmnt = request.getParameter("zeroOneNosChequesAmount");
		String threeNosChequesAmnt = request.getParameter("zeroThreeNosChequesAmount");

		String reportRef = request.getParameter("reportRef");
		String mdApprovalDate = request.getParameter("mdApprovalDate");
		String careOf = request.getParameter("careOf");
		String letterReqDate = request.getParameter("letterReqDate");
		String loanLimit = request.getParameter("loanLimit");
		String rateOfInterest = request.getParameter("rateOfInterest");

		DateFormat dateFormat = new SimpleDateFormat("dd MMM, yyyy HH:mm:ss a");
		JasperDesign jasperDesign;
		JasperPrint jasperPrint = null;
		JasperReport jasperReport;
		InputStream template = null;
		Map<String, Object> spArgsMap = new LinkedHashMap<String, Object>();

		Loan loan = new Loan();
		loan.setLoanId(loanId);
		loan.setUserModKey(userModKey);

		List<Loan> loanList = doSelectLoan(loan);
		loan = loanList.get(0);
		loan.setUserModKey(userModKey);

		Customer customer = new Customer();
		customer.setCustomerIdKey(loan.getCustomerIdKey());
		customer.setUserModKey(userModKey);

		List<Customer> custList = customerService.selectCustomer(customer);
		customer = custList.get(0);

		NConfiguration nConfig = new NConfiguration();
		nConfig.setConfigurationId(loan.getIdLoanTypeKey());
		nConfig.setUserModKey(userModKey);

		List<NConfiguration> nConfigList = nConfigurationService.select(nConfig);
		nConfig = nConfigList.get(0);

		try {

			oneNosChequesAmnt = StringUtils.isBlank(oneNosChequesAmnt) || oneNosChequesAmnt.equalsIgnoreCase("null") ? "(Not Given)"
			        : oneNosChequesAmnt;

			threeNosChequesAmnt = StringUtils.isBlank(threeNosChequesAmnt) || threeNosChequesAmnt.equalsIgnoreCase("null") ? "(Not Given)"
			        : threeNosChequesAmnt;

			spArgsMap.put("P_zero_one_nos_cheques_amount", oneNosChequesAmnt);
			spArgsMap.put("P_zero_three_nos_cheques_amount", threeNosChequesAmnt);

			List<Loan> conditionList = getConditionList(request);
			JRBeanCollectionDataSource conditionListJRBean = new JRBeanCollectionDataSource(conditionList);

			spArgsMap.put("P_special_terms_header", conditionList.isEmpty() ? "" : Str.SPECIAL_TEARM_CONDITION);
			spArgsMap.put("P_special_terms_header_seq", conditionList.isEmpty() ? "" : Str.SPECIAL_TEARM_NUMBER);
			spArgsMap.put("P_special_terms_conditions", conditionListJRBean);

			if (StringUtils.isBlank(mdApprovalDate) || mdApprovalDate.equalsIgnoreCase("null")) {
				Loan loanOfApprovedState = selectLoanLikeSpecifiqState(loan);
				spArgsMap.put("P_date", loanOfApprovedState == null ? "" : dateFormat.format(loanOfApprovedState.getDttMod()));
			}
			else {
				spArgsMap.put("P_date", mdApprovalDate);
			}
			spArgsMap.put("P_name", customer.getCustomerName());
			spArgsMap.put("P_capital_name", customer.getCustomerName().toUpperCase());
			spArgsMap.put("P_bp_id", customer.getBpNo());
			spArgsMap.put("P_department_address", StringUtils.isBlank(customer.getOfficeAddr()) ? "" : customer.getOfficeAddr());
			spArgsMap.put("P_emi", new DecimalFormat("##").format((loan.getTenorYear() * 12)));

			Double amount = loan.getRecommendedForApproval();
			Double checker = -2147483648.00;
			spArgsMap.put("P_amount", amount.compareTo(checker) == 0 ? "(Not Given)" : amount.toString());
			spArgsMap.put("P_so", careOf);
			spArgsMap.put("P_ref", reportRef);
			spArgsMap.put("P_original_duplicate", loan.getStateName().matches(Str.SL_GENERATED) ? Str.DUPLICATE : Str.ORIGINAL);
			spArgsMap.put("P_req_letter_date",
			        StringUtils.isBlank(letterReqDate) || letterReqDate.equalsIgnoreCase("null") ? "(Not Definened)" : letterReqDate);
			spArgsMap.put("P_tenor_year", loan.getTenorYear().toString());

			spArgsMap.put("P_permanent_address", customer.getPermanentAddr());
			spArgsMap.put("P_limits", loanLimit);
			spArgsMap.put("P_rate_interest", rateOfInterest);

			if (nConfig.getValue3().equals(Str.prefixGpfLoan)) {
				template = getClass().getResourceAsStream("/lms_report/Gpf_Loan_BP_SL_Template.jrxml");
			}
			else {
				template = getClass().getResourceAsStream("/lms_report/Personal_Loan_BP_SL_Template.jrxml");
			}
			jasperDesign = JRXmlLoader.load(template);
			jasperReport = JasperCompileManager.compileReport(jasperDesign);
			jasperPrint = JasperFillManager.fillReport(jasperReport, spArgsMap, new JREmptyDataSource());

		}
		catch (Exception ex) {

			log.error("CAD report error : {}", ex.getLocalizedMessage());

			throw ex;
		}

		if (!loan.getStateName().matches(Str.SL_GENERATED)) {
			stateTransition(loan, ActionType.GENERATE_SL.toString());
		}

		execute(loan, ActionType.UPDATE_SL_GENERATE_COUNT.toString());

		return jasperPrint;
	}

	private List<Loan> getConditionList(HttpServletRequest request) {

		String specialTermsAndConditionsOne = request.getParameter("specialTermsAndConditionsOne");
		String specialTermsAndConditionsTwo = request.getParameter("specialTermsAndConditionsTwo");
		String specialTermsAndConditionsThree = request.getParameter("specialTermsAndConditionsThree");
		String specialTermsAndConditionsFour = request.getParameter("specialTermsAndConditionsFour");
		List<Loan> conditionList = new ArrayList<>();

		Loan conditionOne = new Loan();
		Loan conditionTwo = new Loan();
		Loan conditionThree = new Loan();
		Loan conditionFour = new Loan();
		if (!StringUtils.isBlank(specialTermsAndConditionsOne)) {
			conditionOne.setApplicationNo("7.1");
			conditionOne.setCondition(specialTermsAndConditionsOne);
		}
		if (!StringUtils.isBlank(specialTermsAndConditionsTwo)) {
			conditionTwo.setApplicationNo("7.2");
			conditionTwo.setCondition(specialTermsAndConditionsTwo);
		}
		if (!StringUtils.isBlank(specialTermsAndConditionsThree)) {
			conditionThree.setApplicationNo("7.3");
			conditionThree.setCondition(specialTermsAndConditionsThree);
		}
		if (!StringUtils.isBlank(specialTermsAndConditionsFour)) {
			conditionFour.setApplicationNo("7.4");
			conditionFour.setCondition(specialTermsAndConditionsFour);
		}
		if (conditionOne.getApplicationNo() != null) {
			conditionList.add(conditionOne);
		}
		if (conditionTwo.getApplicationNo() != null) {
			conditionList.add(conditionTwo);
		}
		if (conditionThree.getApplicationNo() != null) {
			conditionList.add(conditionThree);
		}
		if (conditionFour.getApplicationNo() != null) {
			conditionList.add(conditionFour);
		}
		return conditionList;
	}

	public Loan selectLoanLikeSpecifiqState(Loan loan) throws Exception {

		Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());
		spArgsMap.put("@tx_state_name", Str.APPROVE);

		JdbcResult jdbcResult = execute(spArgsMap, ActionType.SELECT_LOAN_LIKE_SPECIFIC_STATE.toString());

		List<Loan> loanList = JdbcUtils.mapRows(Loan.class, Loan.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN.toString()));

		if (loanList == null || loanList.size() == 0) return null;
		return loanList.get(0);
	}

	private Loan handleFoBulkSubmit(Message<List<Loan>> msg, String action) throws Exception {
		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return doHandleFoBulkSubmit(loanList.get(0), action);
	}

	private Loan doHandleFoBulkSubmit(Loan loan, String action) throws Exception {
		execute(loan, action);
		return loan;
	}

	private void insertOrUpdateStaffId(Loan loan, String staffid) throws Exception {

		String dbStaffId = null;
		List<Loan> lon = doSelectLoan(loan);

		if (lon.size() > 0) {
			dbStaffId = lon.get(0).getStaffId();
		}

		if (staffid != null && !staffid.equalsIgnoreCase(Str.STR_EMPTY) && !staffid.equalsIgnoreCase(Str.STR_QUESTION)
		        && !staffid.equalsIgnoreCase(dbStaffId)) {
			loan.setStaffId(staffid);
			execute(loan, ActionType.UPDATE_STAFF_ID.toString());
		}

	}

	public List<Loan> selectDataSource(Message<List<Loan>> msg, String action) throws Exception {
		Loan loan = msg.getPayload().get(0);
		Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());
		JdbcResult jdbcResult = execute(spArgsMap, action.toString());

		List<Loan> loanList = JdbcUtils.mapRows(Loan.class, Loan.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_DATA_SOURCE.toString()));

		if (loanList == null || loanList.size() == 0) return null;
		return loanList;
	}

	public Loan createOrAddOrRemoveLoanGroup(Message<List<Loan>> msg, String action) throws Exception {

		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSSSSS");
		String GroupeDate = dateFormat.format(new Date());

		JdbcResult jdbcResult = new JdbcResult();
		Loan loan = loanList.get(0);
		String loanGroupId = null;

		try {
			if (action.equalsIgnoreCase(ActionType.CREATE_LOAN_GROUP.toString())) {
				loanGroupId = generateGroupId(loan);
			}
			else {
				loanGroupId = loan.getLoanGroupId();
			}
			log.info("LOAN GROUP ID {}, {}", loanGroupId, loanGroupId);

			if (loanGroupId != null) {
				for (int i = 0; i < loan.getLoanIdList().size(); i++) {
					loan.setLoanId(loan.getLoanIdList().get(i));
					loan.setLoanGroupId(loanGroupId);
					loan.setDobOfGroupCreate(GroupeDate);
					execute(loan, action);
				}
			}
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}

		return loan;

	}

	private String generateGroupId(Loan loan) throws Exception {
		String loanGroupId = getNextIdFromSystem("id_loan_group_key");
		String loanGroupNumber = String.format("%4s", loanGroupId).replace(' ', '0');

		SimpleDateFormat sdf = new SimpleDateFormat("yyMMdd");
		String yymm = sdf.format(new Date());
		StringBuilder sb = new StringBuilder();
		sb.append(yymm).append(loanGroupNumber);
		log.debug("Generated application no [{}]. Will add prefix with it", sb.toString());
		return sb.toString();
	}

	protected String getNextIdFromSystem(String keyName) throws Exception {
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

	private List<LoanGridView> selectAllLoanGroupData(Message<List<Loan>> msg, String actionType) throws Exception {

		List<Loan> loanList = msg.getPayload();
		Loan loan = loanList.get(0);
		List<LoanGridView> LoanGroupList = new ArrayList<LoanGridView>();

		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		JdbcResult jdbcResult = new JdbcResult();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(actionType, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);

			LoanGroupList = JdbcUtils.mapRows(LoanGridView.class, LoanGridView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_GROUP_FOR_GRID.toString()));

			return LoanGroupList;
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}

	private List<Loan> bulkHocrmSendToCad(Message<List<Loan>> msg) throws Exception {
		String action = ActionType.SEND_TO_CAD.toString();
		List<Loan> loanList = msg.getPayload();

		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		Loan loan = loanList.get(0);

		try {
			for (int i = 0; i < loan.getLoanList().size(); i++) {

				loan.setLoanId(loan.getLoanList().get(i).getLoanId());
				loan.setStateId(loan.getLoanList().get(i).getStateId());
				loan.setStateName(loan.getLoanList().get(i).getStateName());

				if (!loan.getLoanList().get(i).getStateName().equalsIgnoreCase(Str.SENT_TO_CAD.toString())) {
					stateTransition(loan, action);
				}

			}
		}
		catch (Exception e) {
			log.error("Exception: ", e);
			throw e;
		}

		return loanList;
	}

	private List<LoanGridView> searchForELoan(Message<List<Loan>> msg, String action) throws Exception {
		List<Loan> loanList = msg.getPayload();
		if (loanList == null || loanList.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return doSearchForELoan(loanList.get(0), action);
	}

	public List<LoanGridView> doSearchForELoan(Loan loan, String actionType) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());
			log.debug("Args [{}]", spArgsMap);

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(actionType, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);
			return JdbcUtils.mapRows(LoanGridView.class, LoanGridView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_SEARCH_LOAN_FOR_ELOAN.toString()));

		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}

	public EloanView handleInitiateLoanView(Loan loan, String actionType) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		EloanView eloanView = new EloanView();
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(actionType, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);

			List<LoanGridView> loanGridViewList = JdbcUtils.mapRows(LoanGridView.class, LoanGridView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_ELOAN_FOR_GRID.toString()));

			List<LoanGridView> countList = JdbcUtils.mapRows(LoanGridView.class, LoanGridView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_COUNT.toString()));

			eloanView.setTotalCount(countList.get(0).getTotalCount());
			eloanView.setLoandList(loanGridViewList);
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return eloanView;
	}
	
	public Loan handleCibLinkView(Loan loan) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		try {
			jdbcResult = selectSingle(loan, ActionType.CIB_LINK_URL.toString(), SPName.ACT_LOAN.toString());

			List<Loan> loanList = JdbcUtils.mapRows(Loan.class, Loan.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_CIB_LINK_URL.toString()));
			if (loanList != null && loanList.size() > 0) {
				loan = loanList.get(0);				
			}
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return loan;
	}

	public EloanView handleLoanDetailsView(LoanGridView loan, String action) throws Exception {
		JdbcResult jdbcResult = new JdbcResult();
		List<LoanGridView> loanGridViewList;
		List<LoanGridView> loanGridViewListFinal;
		EloanView eloanView = new EloanView();
		try {
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(loan, Loan.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LOAN.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LOAN.toString(), spArgsMap, jdbcResult);
            loanGridViewList = JdbcUtils.mapRows(LoanGridView.class, LoanGridView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_ELOAN_DETAILS_VIEW.toString()));
            HashMap<String, HashMap<String, Date>> loanMap = checkDuplicate(loanGridViewList);
            loanGridViewListFinal = new ArrayList<LoanGridView>();
            
            for (String trackingId : loanMap.keySet()) {
    			HashMap<String, Date> stateNameMap = loanMap.get(trackingId);
    			
    			for (String stateName : stateNameMap.keySet()) {
//    				 System.out.println("TrackingId : " + trackingId + ", State Name : " + stateName + ", dttMod : " +
//    				    		stateNameMap.get(stateName));
    				
    				for(LoanGridView l : loanGridViewList) {
    					Date dttMod = stateNameMap.get(stateName);
    					
    					if(l.getLoanTrackingId().equalsIgnoreCase(trackingId) 
    					   && l.getStateName().equalsIgnoreCase(stateName)
    					   && l.getDttMod().equals(dttMod)) {
    						LoanGridView loanGridViewTemp = new LoanGridView();
    						loanGridViewTemp.setLoanTrackingId(trackingId);
    						loanGridViewTemp.setStateName(stateName);
    						loanGridViewTemp.setDttMod(dttMod);
    						loanGridViewTemp.setCreateDate(l.getCreateDate());
    						loanGridViewTemp.setUserName(l.getUserName());
    						loanGridViewListFinal.add(loanGridViewTemp);
    					}
    				}
    			}
    		}
            
            List<LoanGridView> stateList = JdbcUtils.mapRows(LoanGridView.class, LoanGridView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_STATE_LIST.toString()));           
            eloanView = setStateInList(stateList);
            eloanView.setLoandList(loanGridViewListFinal);
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		return eloanView;
	}

	private EloanView setStateInList(List<LoanGridView> stateList) {
		EloanView eLoan = new EloanView();
		ArrayList<String> aryLst = new ArrayList<String>();
	    for (int i = 0; i < stateList.size(); i++) {
	        aryLst.add(stateList.get(i).getStateList());
	        eLoan.setStateList(aryLst);
		    }
		return eLoan;
	}

	private HashMap checkDuplicate(List<LoanGridView> loanList){
		HashMap<String, HashMap<String, Date>> loanTrackingIdMap = new HashMap<>();
		
		for(LoanGridView loan : loanList) {
			String loanTrackingid = loan.getLoanTrackingId();
			String stateName = loan.getStateName();
			
			// If loanTrackingId is found in (loanTrackingIdMap) main map
			if(loanTrackingIdMap.containsKey(loanTrackingid)) {
				//get value for this tracking and store in stateNameTempMap
				HashMap<String, Date> stateNameTempMap = loanTrackingIdMap.get(loanTrackingid);
				
				// If stateName is found in stateNameTempMap
				if(stateNameTempMap.containsKey(stateName)) {
					//find date stateName
					Date oldDttMod = stateNameTempMap.get(stateName);
					//old date and new compare 
					Date largerDttMod = getLargerDate(oldDttMod, loan.getDttMod());
					//store stateNameTempMap 
					stateNameTempMap.put(stateName, largerDttMod);
				}
				else {
					stateNameTempMap.put(stateName, loan.getDttMod());
				}
			}
			else {
				//initial create space for state and date 
				HashMap<String, Date> stateNameMap = new HashMap<>();
				//insert second map state & date ex: FO_CREATED , 2020-09-09
				stateNameMap.put(stateName, loan.getDttMod());
				//insert main map Ex: 145270 {FO_CREATED , 2020-09-09}
				loanTrackingIdMap.put(loanTrackingid, stateNameMap);
				
			}
			
		}
		
//		for (String trackingId : loanTrackingIdMap.keySet()) {
//			HashMap<String, Date> stateNameMap = loanTrackingIdMap.get(trackingId);
//			for (String stateName : stateNameMap.keySet()) {
//			    System.out.println("TrackingId : " + trackingId + ", State Name : " + stateName + ", dttMod : " +
//			    		stateNameMap.get(stateName));
//			}
//		}
		return loanTrackingIdMap;
	}
	
	private static Date getLargerDate(Date oldDate, Date newDate) {
		int result = newDate.compareTo(oldDate);

		if (result > 0) {
			return newDate;
		}
		return oldDate;
	}
	
	boolean isEmptyString(String string) {
		return string == null || string.isEmpty();
	}
}
