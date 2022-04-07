/**
 * 
 */
package com.naztech.lms.creditCard.service;

import java.io.File;
import java.io.FileOutputStream;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletRequest;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.CellStyle;
import org.apache.poi.ss.usermodel.CreationHelper;
import org.apache.poi.ss.usermodel.Font;
import org.apache.poi.ss.usermodel.IndexedColors;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;

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
import com.naztech.lms.creditCard.model.CardReport;
import com.naztech.lms.model.Report;

@PropertySource("classpath:app.properties")
public class CardReportService extends AbstractService<CardReportService>{
	private static Logger log = LoggerFactory.getLogger(CardReportService.class);
	
	@Autowired
	JdbcService jdbcService;
	@Autowired
	CreditCardService creditCardService;
	
	@Value("${card.crm.excel.report}")
	String cardCrmExcelReportColumns;

	@Value("${card.hoc.excel.report}")
	String cardHocExcelReportColumns;

	@Value("${loan.column.organization}")
	String organization;
	
	private static final DateFormat df = new SimpleDateFormat("yyMM");
	private final static SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	
	static Gson gson;
	static {
		gson = new Gson();
	}
	
	@Override
	@SuppressWarnings("rawtypes")
	public Message<?> serviceSingle(Message msg) throws Exception {

		MessageHeader msgHeader = null;
		Message<?> msgResponse = null;

		try {

			msgHeader = msg.getHeader();

			String action = msgHeader.getActionType();
			log.debug("Processing ACTION [{}]", action);

			if (action.equals(ActionType.PPC_EXCEL_REPORT.toString())) {
				//boolean ppcReport = loanGridPPCExcelReport(msg);
				//msgResponse = MessageBuilder.withPayload(ppcReport).copyHeadersIfAbsent(msgHeader).build();
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
	
	public File cardGridPPCExcelReportV2(HttpServletRequest request) throws Exception {

		Integer userId = Integer.parseInt(request.getParameter("userId"));
		String creditCardId = request.getParameter("creditCardId");

		if (creditCardId == null || creditCardId.length() == 0) {
			throw new Exception("Empty Request.");
		}
		JdbcResult jdbcResult = new JdbcResult();
		CardReport cardReport = new CardReport();
		List<CardReport> cardList = new ArrayList<CardReport>();
		String actionType = ActionType.HOC_EXCEL_REPORT.toString();

		cardReport.setCardIdListStr(creditCardId);
		cardReport.setUserModKey(userId);
		long start = System.currentTimeMillis();
		jdbcResult = selectSingleCardForReport(cardReport, actionType, SPName.ACT_credit_card_report.toString());
		cardList = JdbcUtils.mapRows(CardReport.class, CardReport.getRs2BeanMap(),
		        jdbcResult.getRsTypeMap(RSType.RS_TYPE_LMS_MIS_PPC_EXCEL_REPORT.toString()));
		long end = System.currentTimeMillis();
		long execution = end - start;
		log.info("execution time: {}", execution);
		log.info("Total Card loan: {}", cardList.size());
//		cardList = setReportListData(cardList);

		// Create a Workbook
		Workbook workbook = new XSSFWorkbook(); // new HSSFWorkbook() for generating `.xls` file

		CreationHelper createHelper = workbook.getCreationHelper();

		// Create a Sheet
		Sheet sheet = workbook.createSheet("Loan");

		// Create a Font for styling header cells
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerFont.setFontHeightInPoints((short) 14);
		headerFont.setColor(IndexedColors.BLUE.getIndex());

		// Create a CellStyle with the font
		CellStyle headerCellStyle = workbook.createCellStyle();
		headerCellStyle.setFont(headerFont);

		// Create a Row
		Row headerRow = sheet.createRow(0);

		String[] loanColumn = cardHocExcelReportColumns.split(",");

		boolean isGpfLoanIncluded = false;
		
		for (int i = 0; i < loanColumn.length; i++) {
			Cell cell = headerRow.createCell(i);
			cell.setCellValue(loanColumn[i]);
			cell.setCellStyle(headerCellStyle);
		}

		Map<String, Object[]> data = new HashMap<String, Object[]>();
		for (int count = 0; count < cardList.size(); count++) {
			CardReport reportCls = cardList.get(count);

			String numberColumn = null;
			boolean b = false;
			if (reportCls.getBpNo() != null && !reportCls.getBpNo().isEmpty()) {
				for (char c : reportCls.getBpNo().toCharArray()) {
					if (b == Character.isDigit(c)) {
						for (char cc : reportCls.getBpNo().substring(2).toCharArray()) {
							if (b == Character.isDigit(cc)) {
								break;
							}
							numberColumn = reportCls.getBpNo().substring(2);
						}
						break;
					}
					else {
						numberColumn = reportCls.getBpNo();
					}
				}
			}
			String currentStatus = reportCls.getStatus();
			if (currentStatus == "Declined") {
				currentStatus = "Cancel";
			}

			String processStatus = reportCls.getStatus();
			if (reportCls.getStatus() == "Approved") {
				processStatus = "Done";
			}
			else if (reportCls.getStatus() == "Deferred") {
				processStatus = "Pending";
			}
			String submitUnit = reportCls.getSubmitUnit();
			if (reportCls.getSubmitUnit() == null) {
				submitUnit = "";
			}
			
			Double proposedDBR = reportCls.getProposedDbr();
			if (proposedDBR != null && proposedDBR == -2147483648) {
				proposedDBR = null;
			}
			Double appliedLoanAmount = reportCls.getAppliedAmount();
			if (appliedLoanAmount != null && appliedLoanAmount == -2147483648) {
				appliedLoanAmount = null;
			}

			Double ApprovedAmount = reportCls.getApprovedLimit();
			if (ApprovedAmount != null && ApprovedAmount == -2147483648) {
				ApprovedAmount = null;
			}
//			String actionWiseComment = reportCls.getActionWiseComment();
//			String queryComments = reportCls.getQueryComments();
			String startDate;
			String endDate;			

			data.put(String.valueOf(count), new Object[] { (count + 1), reportCls.getCcTrackingNumber(),reportCls.getApplicationNumber(),
					reportCls.getCardType(),appliedLoanAmount,ApprovedAmount,reportCls.getInterestRate(),
					proposedDBR,reportCls.getAccountNo(),reportCls.getAdditionalIncomeSource(),
					reportCls.getKycLevel(),reportCls.getProposedBillingDate(),reportCls.getCardSecurityType(),
					reportCls.getCibStatus(),reportCls.getStatus(),reportCls.getSubmitUnit(),reportCls.getBpNo(),reportCls.getCustomerName(),
					reportCls.getDesignation(),reportCls.getCurrentPlaceofPosting(),reportCls.getDateOfBirth(),reportCls.getNid(),
					reportCls.getTin(),reportCls.getMobile(),reportCls.getLastDateOfPosting(),
					reportCls.getDistrictOfPosting(),reportCls.getNameAsPerNid(),reportCls.getCustomerPostingDistrict(),
					reportCls.getCustomerPostingDivision(),reportCls.getPassportNo(),reportCls.getHighestLevelOfEducation(),reportCls.getPasspordExpiryDate(),
					reportCls.getEmail(),reportCls.getCardMonthlyBillDebited()});
		}

		// Create Cell Style for formatting Date
		CellStyle dateCellStyle = workbook.createCellStyle();
		dateCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd-MM-yyyy"));

		// Create Other rows and cells with employees data

		int rownum = 1;
		for (int key = 0; key < cardList.size(); key++) {

			headerRow = sheet.createRow(rownum++);

			Object[] objArr = data.get(String.valueOf(key));
			int cellnum = 0;
			for (Object obj : objArr) {
				Cell cell = headerRow.createCell(cellnum++);
				if (obj instanceof Date) {
					cell.setCellValue(sdf.format((Date) obj));
					cell.setCellStyle(dateCellStyle);
				}
				else if (obj instanceof Boolean)
					cell.setCellValue((Boolean) obj);
				else if (obj instanceof String)
					cell.setCellValue((String) obj);
				else if (obj instanceof Double)
					cell.setCellValue((Double) obj);
				else if (obj instanceof Number)
					cell.setCellValue(((Number) obj).doubleValue());
				else if (obj == null)
					cell.setCellValue("");
				else if (obj instanceof Integer) cell.setCellValue((Integer) obj);

			}
		}
		//        // Resize all columns to fit the content size
		for (int j = 0; j < loanColumn.length; j++) {
			sheet.autoSizeColumn(j);
		}

		File tempFile = File.createTempFile("MIS-PPC-EXCEL", ".xlsx");
		FileOutputStream fileOut = new FileOutputStream(tempFile);
		workbook.write(fileOut);
		fileOut.close();

		workbook.close();
		return tempFile;
	}
	
	public File cardGridMISExcelReport(HttpServletRequest request) throws Exception {

		Integer userId = Integer.parseInt(request.getParameter("userId"));
		String creditCardId = request.getParameter("creditCardId");
		JdbcResult jdbcResult = new JdbcResult();
		CardReport report = new CardReport();
		List<CardReport> loanList = new ArrayList<CardReport>();
		String actionType = ActionType.LMS_CARD_EXCEL_REPORT.toString();
		//List<Customer> customerList = new ArrayList<Customer>();

		report.setCardIdListStr(creditCardId);
		report.setUserModKey(userId);
		long start = System.currentTimeMillis();
		jdbcResult = selectSingleCardForReport(report, actionType, SPName.ACT_credit_card_report.toString());
		loanList = JdbcUtils.mapRows(CardReport.class, CardReport.getRs2BeanMap(), jdbcResult.getRsTypeMap(RSType.RS_TYPE_LMS_CARD_EXCEL_REPORT.toString()));
	
		long end = System.currentTimeMillis();
		long execution = end - start;
		log.info("execution time: {}", execution);
		log.info("Total Card loan: {}", loanList.size());
		// Create a Workbook
		Workbook workbook = new XSSFWorkbook(); // new HSSFWorkbook() for generating `.xls` file

		// CreationHelper helps us create instances of various things like DataFormat,
		// Hyperlink, RichTextString etc, in a format (HSSF, XSSF) independent way
		CreationHelper createHelper = workbook.getCreationHelper();

		// Create a Sheet
		Sheet sheet = workbook.createSheet("Loan");

		// Create a Font for styling header cells
		Font headerFont = workbook.createFont();
		headerFont.setBold(true);
		headerFont.setFontHeightInPoints((short) 14);
		headerFont.setColor(IndexedColors.BLUE.getIndex());

		// Create a CellStyle with the font
		CellStyle headerCellStyle = workbook.createCellStyle();
		headerCellStyle.setFont(headerFont);

		// Create a Row
		Row headerRow = sheet.createRow(0);

		String[] loanColumn = cardCrmExcelReportColumns.split(",");

		for (int count = 0; count < loanList.size(); count++) {
			CardReport loanClass = loanList.get(count);
			// Create cells
			for (int i = 0; i < loanColumn.length; i++) {
				Cell cell = headerRow.createCell(i);
				cell.setCellValue(loanColumn[i]);
				cell.setCellStyle(headerCellStyle);
			}
		}

		Map<String, Object[]> data = new HashMap<String, Object[]>();
		for (int count = 0; count < loanList.size(); count++) {
			CardReport reportCls = loanList.get(count);

			String organizationName = null;
			if (reportCls.getBpNo() != null) {
				organizationName = organization;
			}
			String currentStatus = reportCls.getStatus();
			if (currentStatus == "Declined") {
				currentStatus = "Cancel";
			}

			String processStatus = reportCls.getStatus();
			if (reportCls.getStatus() == "Approved") {
				processStatus = "Done";
			}
			else if (reportCls.getStatus() == "Deferred") {
				processStatus = "Pending";
			}
			String submitUnit = reportCls.getSubmitUnit();
			if (reportCls.getSubmitUnit() == null) {
				submitUnit = "";
			}
			
			Double proposedDBR = reportCls.getProposedDbr();
			if (proposedDBR != null && proposedDBR == -2147483648) {
				proposedDBR = null;
			}
			Double appliedLoanAmount = reportCls.getAppliedAmount();
			if (appliedLoanAmount != null && appliedLoanAmount == -2147483648) {
				appliedLoanAmount = null;
			}

			Double ApprovedAmount = reportCls.getRecommendedForApproval();
			if (ApprovedAmount != null && ApprovedAmount == -2147483648) {
				ApprovedAmount = null;
			}	
			Double emi = reportCls.getTotalEMI();
			if (emi != null && emi == -2147483648) {
				emi = null;
			}

			data.put(String.valueOf(count), new Object[] { (count + 1), reportCls.getCcTrackingNumber(),reportCls.getApplicationNumber(),
					reportCls.getCardType(),appliedLoanAmount,ApprovedAmount,reportCls.getInterestRate(),
					proposedDBR,reportCls.getAccountNo(),reportCls.getAdditionalIncomeSource(),
					reportCls.getKycLevel(),reportCls.getProposedBillingDate(),reportCls.getCardSecurityType(),
					reportCls.getCibStatus(),reportCls.getStatus(),reportCls.getSubmitUnit(),reportCls.getBpNo(),reportCls.getCustomerName(),
					reportCls.getDesignation(),reportCls.getCurrentPlaceofPosting(),reportCls.getDateOfBirth(),reportCls.getNid(),
					reportCls.getTin(),reportCls.getMobile(),reportCls.getLastDateOfPosting(),
					reportCls.getDistrictOfPosting(),reportCls.getNameAsPerNid(),reportCls.getCustomerPostingDistrict(),
					reportCls.getCustomerPostingDivision(),reportCls.getPassportNo(),reportCls.getHighestLevelOfEducation(),reportCls.getPasspordExpiryDate(),
					reportCls.getEmail(),reportCls.getCardMonthlyBillDebited(),reportCls.getDateOfQuery(),reportCls.getInputBy(),reportCls.getCustomerType(),
					reportCls.getCbsUserId(),reportCls.getReSubmitDate(),reportCls.getApprovedDate(),reportCls.getAnalyst(),reportCls.getReturnToSourceDate(),
					reportCls.getAnalystComments(),emi,reportCls.getNameOfGuarantor(),ApprovedAmount});		
		}

		// Create Cell Style for formatting Date
		CellStyle dateCellStyle = workbook.createCellStyle();
		dateCellStyle.setDataFormat(createHelper.createDataFormat().getFormat("dd-MM-yyyy"));

		// Create Other rows and cells with employees data

		int rownum = 1;
		for (int key = 0; key < loanList.size(); key++) {

			headerRow = sheet.createRow(rownum++);

			Object[] objArr = data.get(String.valueOf(key));
			int cellnum = 0;
			for (Object obj : objArr) {
				Cell cell = headerRow.createCell(cellnum++);
				if (obj instanceof Date) {
					cell.setCellValue(sdf.format((Date) obj));
					cell.setCellStyle(dateCellStyle);
				}
				else if (obj instanceof Boolean)
					cell.setCellValue((Boolean) obj);
				else if (obj instanceof String)
					cell.setCellValue((String) obj);
				else if (obj instanceof Double)
					cell.setCellValue((Double) obj);
				else if (obj instanceof Number)
					cell.setCellValue(((Number) obj).doubleValue());
				else if (obj == null)
					cell.setCellValue("");
				else if (obj instanceof Integer) cell.setCellValue((Integer) obj);

			}
		}
		// Resize all columns to fit the content size
		for (int j = 0; j < loanColumn.length; j++) {
			sheet.autoSizeColumn(j);
		}

		File tempFile = File.createTempFile("MIS-CRM-excel", ".xlsx");
		FileOutputStream fileOut = new FileOutputStream(tempFile);
		workbook.write(fileOut);
		fileOut.close();

		workbook.close();
		return tempFile;
	}

	
	
	public JdbcResult selectSingleCardForReport(CardReport report, String action, String sp) throws Exception {
		try {
			JdbcResult jdbcResult = new JdbcResult();
			Map<String, Object> spArgsMap = JdbcService.createSqlMap(report, CardReport.getSql2BeanMap());

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
	private List<CardReport> setReportListData(List<CardReport> loanList) throws ParseException {
		//Map<String, Date> map1 = new HashMap<String, Date>();

		String[] tempStrOfArr = new String[3];
		String key1 = "";
		Date curDate = null;
		for (CardReport r : loanList) {
		 if(!isEmptyString(r.getStateMap())) {
			String[] arrOfStr = r.getStateMap().split("@", 100);
			Map<String, Date> map = new HashMap<String, Date>();
			for (String a : arrOfStr) {

				tempStrOfArr = a.split(",");
				// tempStrOfArr = tempStrOfArr[0].split(",");

				key1 = tempStrOfArr[0].trim();

				curDate = convertStringToDate(tempStrOfArr[1].trim());

				if (map.containsKey(tempStrOfArr[0].trim())) {
					map.put(key1, getLargerDate(map.get(key1), curDate));
					for (String s : map.keySet()) {
						
					}
				}
				else {
					map.put(key1, curDate);
					for (String s : map.keySet()) {
						
					}
				}
			}
			Map<String, Date> mapFoSoNotIncluded = map.entrySet().parallelStream().filter(x -> !x.toString().startsWith("FO"))
			        .filter(x -> !x.toString().startsWith("SO")).collect(Collectors.toMap(x -> x.getKey(), x -> x.getValue()));

//			// TODO: find max time in mapFoSoNotIncluded state = tx_crm_status
//
			mapFoSoNotIncluded.remove("SENT_TO_CAD");
			mapFoSoNotIncluded.remove("SL_GENERATED");

			//TODO:  PEND_RECEIVED time, max time all... diff in minute tx_crm_tat

		}
	}
		return loanList;
	}
	
	public static Date convertStringToDate(String dateStr) throws ParseException {
		String pattern = "yyyy-MM-dd HH:mm:ss";
		DateFormat formatter = new SimpleDateFormat(pattern);

		if (dateStr == null) {
			return null;
		}
		else {
			Date ret = formatter.parse(dateStr);
			return ret;
		}
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
