package com.naztech.lms.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

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
import com.naztech.lms.constants.Str;
import com.naztech.lms.model.DashboardDetailsView;
import com.naztech.lms.model.DateWiseLoanStatus;
import com.naztech.lms.model.LmsDashboard;
import com.naztech.lms.model.Loan;
import com.naztech.lms.model.LoanGridView;
import com.naztech.lms.model.LoanTrackerDepartmentWise;
import com.naztech.lms.model.StatusWiseLoanCount;

/**
 * @author assaduzzaman.sohan
 */
public class LmsDashboardService extends AbstractService<LmsDashboard> {
	private static Logger log = LogManager.getLogger(LmsDashboardService.class);

	@Autowired
	JdbcService jdbcService;

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@Override
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();

			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.ON_PROCESS_STATUS.toString())) {
				msgResponse = MessageBuilder.withPayload(selectOnProcessStatus(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.FILE_RECEIVED_STATUS.toString())) {
				msgResponse = MessageBuilder.withPayload(selectFileReceivedStatus(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.STATUS_WISE_COUNT.toString())) {
				msgResponse = MessageBuilder.withPayload(selectStatusWiseCount(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DEPARTMENT_WISE_COUNT.toString())) {
				msgResponse = MessageBuilder.withPayload(selectDepartmentWiseCount(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_LOAN_FOR_DEPT_BY_DATE.toString())) {
				msgResponse = MessageBuilder.withPayload(selectLoanForDashboardView(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}			
			else if (action.equals(ActionType.SEARCH_LOAN_FOR_DASHBOARD_VIEW.toString())) {
				msgResponse = MessageBuilder.withPayload(selectLoanForDashboardView(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.DASHBOARD_STATUS.toString())) {
				msgResponse = MessageBuilder.withPayload(handleDashboardStatus(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.LOAN_STATUS_DATE_WISE.toString()) || action.equals(ActionType.LOAN_STATUS_DEPT_WISE.toString())) {
				msgResponse = MessageBuilder.withPayload(handleLoanStatusDateWise(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.STATUS_WISE_COUNT_LATEST.toString())) {
				msgResponse = MessageBuilder.withPayload(handleStatusWiseLoanCount(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.LOAN_TRACKER_DEPT_WISE.toString())||action.equals(ActionType.SEARCH_LOAN_TRACKER_DEPT_WISE.toString())) {
				msgResponse = MessageBuilder.withPayload(handleLoanTrackerDeptWise(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.SELECT_LOAN_TRACKER_DEPT_WISE.toString())) {
				msgResponse = MessageBuilder.withPayload(selectLoanForTrackerDeptWise(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}else if (action.equals(ActionType.SELECT_LOAN_COUNT_DATE_WISE.toString())||
			    action.equals(ActionType.SELECT_LOAN_STATUS_DEPT_WISE.toString())||
			    action.equals(ActionType.CREATION_DATE_WISE_DEPT_LOAN.toString())) {
				msgResponse = MessageBuilder.withPayload(selectLoanDateOrDeptWise(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.SELECT_PPC_STATUS_WISE_DATA.toString())) {
				msgResponse = MessageBuilder.withPayload(selectPpcStatusWiseData(msg, action)).copyHeadersIfAbsent(msgHeader).build();
			}
			else if (action.equals(ActionType.PPC_ON_PROCESS_STATUS.toString())) {
				msgResponse = MessageBuilder.withPayload(pPcOnProcessStatus(msg, action)).copyHeadersIfAbsent(msgHeader).build();				
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

	private List<StatusWiseLoanCount> handleStatusWiseLoanCount(Message<List<LmsDashboard>> msg, String action) throws Exception {
		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleStatusWiseLoanCount(list.get(0), action);
	}

	private List<StatusWiseLoanCount> doHandleStatusWiseLoanCount(LmsDashboard lmsDashboard, String action) throws Exception {
		JdbcResult jdbcResult = exectute(lmsDashboard, action);
		return JdbcUtils.mapRows(StatusWiseLoanCount.class, StatusWiseLoanCount.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_DASHBOARD_DATA.toString()));
	}

	private List<LoanTrackerDepartmentWise> handleLoanTrackerDeptWise(Message<List<LmsDashboard>> msg, String action) throws Exception {
		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleLoanTrackerDeptWise(list.get(0), action);
	}
	
	private List<LoanTrackerDepartmentWise> doHandleLoanTrackerDeptWise(LmsDashboard lmsDash, String action) throws Exception {
		try {

			JdbcResult jdbcResult = exectuteTrackerDept(lmsDash, action);
			return JdbcUtils.mapRows(LoanTrackerDepartmentWise.class, LoanTrackerDepartmentWise.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LOAN_TRACKER_DEPT_DATA.toString()));

		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}
	
	private List<DateWiseLoanStatus> handleLoanStatusDateWise(Message<List<LmsDashboard>> msg, String action) throws Exception {
		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}
		return doHandleLoanStatusDateWise(list.get(0), action);
	}

	private List<DateWiseLoanStatus> doHandleLoanStatusDateWise(LmsDashboard lmsDash, String action) throws Exception {
		try {

			JdbcResult jdbcResult = exectute(lmsDash, action);
			return JdbcUtils.mapRows(DateWiseLoanStatus.class, DateWiseLoanStatus.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_DASHBOARD_DATA.toString()));

		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
	}

	private JdbcResult exectuteTrackerDept(LmsDashboard lmsDash, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(lmsDash, LmsDashboard.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LMS_DASHBOARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			return jdbcService.executeSP(action, SPName.ACT_LMS_DASHBOARD.toString(), spArgsMap, jdbcResult);
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

	}
	
	private JdbcResult exectute(LmsDashboard lmsDash, String action) throws Exception {

		JdbcResult jdbcResult = new JdbcResult();

		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(lmsDash, LmsDashboard.getSql2BeanMap());

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LMS_DASHBOARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			return jdbcService.executeSP(action, SPName.ACT_LMS_DASHBOARD.toString(), spArgsMap, jdbcResult);
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

	}

	private LmsDashboard handleDashboardStatus(Message<List<LmsDashboard>> msg, String action) throws Exception {

		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return doHandleDashboardStatus(list.get(0), action);
	}

	private LmsDashboard doHandleDashboardStatus(LmsDashboard lmsDash, String action) throws Exception {

		List<LmsDashboard> dataList = new ArrayList<>();

		JdbcResult jdbcResult = new JdbcResult();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(lmsDash, LmsDashboard.getSql2BeanMap());
			log.debug("Args [{}]", spArgsMap);

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LMS_DASHBOARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LMS_DASHBOARD.toString(), spArgsMap, jdbcResult);

			dataList = JdbcUtils.mapRows(LmsDashboard.class, LmsDashboard.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_DATA.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		if (dataList == null || dataList.size() == 0) return new LmsDashboard();
		return dataList.get(0);
	}

	private List<DashboardDetailsView> selectLoanForDashboardView(Message<List<LmsDashboard>> msg, String action) throws Exception {

		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return doSelectLoanForDashboardView(list.get(0), action);
	}
	
	private List<DashboardDetailsView> selectLoanDateOrDeptWise(Message<List<LmsDashboard>> msg, String action) throws Exception {

		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return doSelectLoanDateOrDeptWise(list.get(0), action);
	}
	
	private List<DashboardDetailsView> selectPpcStatusWiseData(Message<List<LmsDashboard>> msg, String action) throws Exception {

		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return doSelectPpcStatusWise(list.get(0), action);
	}
	
	private List<DashboardDetailsView> selectLoanForTrackerDeptWise(Message<List<LmsDashboard>> msg, String action) throws Exception {

		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return doSelectLoanForTrackerDeptWise(list.get(0), action);
	}


	private LmsDashboard selectOnProcessStatus(Message<List<LmsDashboard>> msg, String action) throws Exception {

		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return selectData(list.get(0), action);
	}
	
	private LmsDashboard pPcOnProcessStatus(Message<List<LmsDashboard>> msg, String action) throws Exception {

		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return selectData(list.get(0), action);
	}

	private LmsDashboard selectFileReceivedStatus(Message<List<LmsDashboard>> msg, String action) throws Exception {

		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return selectData(list.get(0), action);
	}

	private LmsDashboard selectStatusWiseCount(Message<List<LmsDashboard>> msg, String action) throws Exception {

		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return selectData(list.get(0), action);
	}

	private LmsDashboard selectDepartmentWiseCount(Message<List<LmsDashboard>> msg, String action) throws Exception {

		List<LmsDashboard> list = msg.getPayload();
		if (list == null || list.size() == 0) {
			throw new Exception("Empty Request.");
		}

		return selectData(list.get(0), action);
	}

	private LmsDashboard selectData(LmsDashboard lmsDash, String action) throws Exception {

		LmsDashboard data = new LmsDashboard();

		JdbcResult jdbcResult = new JdbcResult();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(lmsDash, LmsDashboard.getSql2BeanMap());
			log.debug("Args [{}]", spArgsMap);

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LMS_DASHBOARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LMS_DASHBOARD.toString(), spArgsMap, jdbcResult);

			List<LmsDashboard> dataList = JdbcUtils.mapRows(LmsDashboard.class, LmsDashboard.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_DATA.toString()));

			List<LmsDashboard> userList = JdbcUtils.mapRows(LmsDashboard.class, LmsDashboard.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_USER_LIST.toString()));

			List<LmsDashboard> dateList = JdbcUtils.mapRows(LmsDashboard.class, LmsDashboard.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_DATE_LIST.toString()));

			data.setDataList(dataList);
			data.setUserList(userList);
			data.setDateList(dateList);
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return data;
	}

	private List<DashboardDetailsView> doSelectLoanForDashboardView(LmsDashboard lmsDash, String action) throws Exception {

		List<DashboardDetailsView> dataList = new ArrayList<>();

		JdbcResult jdbcResult = new JdbcResult();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(lmsDash, LmsDashboard.getSql2BeanMap());
			log.debug("Args [{}]", spArgsMap);

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LMS_DASHBOARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LMS_DASHBOARD.toString(), spArgsMap, jdbcResult);

			dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_DATA.toString()));
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return dataList;
	}
	
	private List<DashboardDetailsView> doSelectLoanForTrackerDeptWise(LmsDashboard lmsDash, String action) throws Exception {

		List<DashboardDetailsView> dataList = new ArrayList<>();

		JdbcResult jdbcResult = new JdbcResult();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(lmsDash, LmsDashboard.getSql2BeanMap());
			log.debug("Args [{}]", spArgsMap);

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LMS_DASHBOARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LMS_DASHBOARD.toString(), spArgsMap, jdbcResult);
			if(lmsDash.getDeptName().equals(Str.STR_FIELD_OFFICER)) {
				dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
				        jdbcResult.getRsTypeMap(RSType.RS_TYPE_FIELD_OFFICER_COUNT.toString()));
			}else if(lmsDash.getDeptName().equals(Str.STR_PPC)) {
				dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
				        jdbcResult.getRsTypeMap(RSType.RS_TYPE_PPC_COUNT.toString()));
			}else if(lmsDash.getDeptName().equals(Str.STR_CRM)){
				dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
				        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CRM_COUNT.toString()));
			}else if(lmsDash.getDeptName().equals(Str.STR_CAD)) {
				dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
				        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CAD_COUNT.toString()));
			}else if(lmsDash.getDeptName().equals(Str.STR_TOTAL_COUNT)) {
				dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
				        jdbcResult.getRsTypeMap(RSType.RS_TYPE_TOTAL_COUNT.toString()));
			}
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}

		return dataList;
	}
	
	private List<DashboardDetailsView> doSelectLoanDateOrDeptWise(LmsDashboard lmsDash, String action) throws Exception {

		List<DashboardDetailsView> dataList = new ArrayList<>();
		ConcurrentHashMap<String, DashboardDetailsView> dashboardDetailsViewMap = new ConcurrentHashMap<String, DashboardDetailsView>();

		JdbcResult jdbcResult = new JdbcResult();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(lmsDash, LmsDashboard.getSql2BeanMap());			
			log.debug("Args [{}]", spArgsMap);

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LMS_DASHBOARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LMS_DASHBOARD.toString(), spArgsMap, jdbcResult);
			if(action.equals(Str.SELECT_LOAN_COUNT_DATE_WISE)) {
				if(lmsDash.getDeptName().equals(Str.Entry_eLoan)){
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_ELOAN_ENTRY.toString()));
				}else if(lmsDash.getDeptName().equals(Str.Entry_LMS)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LMS_ENTRY.toString()));
				}else if(lmsDash.getDeptName().equals(Str.PPC_Received)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_PPC_RECEIVED.toString()));
				}else if(lmsDash.getDeptName().equals(Str.PPC_Rejcet_Query)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_PPC_REJECT.toString()));
				}else if(lmsDash.getDeptName().equals(Str.PPC_Recommend)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_PPC_RECOMMEND.toString()));
				}else if(lmsDash.getDeptName().equals(Str.CRM_Received)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CRM_RECEIVED.toString()));
				}else if(lmsDash.getDeptName().equals(Str.CRM_Rejcet_Query)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CRM_REJCET.toString()));
				}else if(lmsDash.getDeptName().equals(Str.CRM_Approved)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CRM_APPROVED.toString()));
				}else if(lmsDash.getDeptName().equals(Str.MD_Approved)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_MD_APPROVED.toString()));
				}else {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CAD_SANCTION.toString()));
				}		
			}else {
				if(lmsDash.getDeptName().equals(Str.Entry_eLoan)){
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_ELOAN_ENTRY.toString()));
				}else if(lmsDash.getDeptName().equals(Str.Entry_LMS)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LMS_ENTRY.toString()));
				}else if(lmsDash.getDeptName().equals(Str.PPC_Received)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_PPC_RECEIVED.toString()));
				}else if(lmsDash.getDeptName().equals(Str.PPC_Rejcet_Query)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_PPC_REJECT.toString()));
				}else if(lmsDash.getDeptName().equals(Str.PPC_Recommend)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_PPC_RECOMMEND.toString()));
				}else if(lmsDash.getDeptName().equals(Str.CRM_Received)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CRM_RECEIVED.toString()));
				}else if(lmsDash.getDeptName().equals(Str.CRM_Rejcet_Query)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CRM_REJCET.toString()));
				}else if(lmsDash.getDeptName().equals(Str.CRM_Approved)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CRM_APPROVED.toString()));
				}else if(lmsDash.getDeptName().equals(Str.MD_Approved)) {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_MD_APPROVED.toString()));
				}else {
					dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
					        jdbcResult.getRsTypeMap(RSType.RS_TYPE_CAD_SANCTION.toString()));
				}
			}
			
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
		if(action.equals(Str.SELECT_LOAN_COUNT_DATE_WISE)||action.equals("CREATION_DATE_WISE_DEPT_LOAN")) {
			dataList.parallelStream().forEach(x -> {
				String key = x.getLoanTrackingId() + x.getActionType();
				if (dashboardDetailsViewMap.containsKey(key)) {
					if (x.getDttMod().after(dashboardDetailsViewMap.get(key).getDttMod())) {
						dashboardDetailsViewMap.put(key, x);
					}
				}
				else {
					dashboardDetailsViewMap.put(key, x);
				}
			});
			return new ArrayList<DashboardDetailsView>(dashboardDetailsViewMap.values());
		}else {			
			return dataList;
		}
		
	}
	
	private List<DashboardDetailsView> doSelectPpcStatusWise(LmsDashboard lmsDash, String action) throws Exception {

		List<DashboardDetailsView> dataList = new ArrayList<>();
		ConcurrentHashMap<Integer, DashboardDetailsView> dashboardDetailsViewMap = new ConcurrentHashMap<Integer, DashboardDetailsView>();

		JdbcResult jdbcResult = new JdbcResult();
		try {

			Map<String, Object> spArgsMap = JdbcService.createSqlMap(lmsDash, LmsDashboard.getSql2BeanMap());			
			log.debug("Args [{}]", spArgsMap);

			JdbcStoredProcedure jdbcStoredProcedure = jdbcService.getJdbcStoredProcedure(SPName.ACT_LMS_DASHBOARD.toString());
			jdbcResult.setFilteredOutputParamMap(jdbcStoredProcedure.getSpOutputParamMap());
			jdbcResult.setProcessWarnings(true);

			jdbcResult = jdbcService.executeSP(action, SPName.ACT_LMS_DASHBOARD.toString(), spArgsMap, jdbcResult);
			
			dataList = JdbcUtils.mapRows(DashboardDetailsView.class, DashboardDetailsView.getRs2BeanMap(),
			        jdbcResult.getRsTypeMap(RSType.RS_TYPE_PPC_STATUS_WISE_DATA.toString()));
			
		}
		catch (Exception ex) {
			log.error("error {}, \nMessage *** : {}", ex, ex.getLocalizedMessage());
			throw ex;
		}
       
        return dataList;
	}

}
