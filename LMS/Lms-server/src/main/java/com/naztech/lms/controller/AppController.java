package com.naztech.lms.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageContentType;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.message.model.Status;
import com.nazdaqTechnologies.core.message.model.StatusType;
import com.nazdaqTechnologies.core.message.processor.json.gson.GsonJsonMessageProcessor;
import com.naztech.lms.constants.Constants;
import com.naztech.lms.constants.Str;
import com.naztech.lms.model.ImportData;
import com.naztech.lms.model.LmsSms;
import com.naztech.lms.model.Loan;
import com.naztech.lms.model.LoanDocument;
import com.naztech.lms.model.LoanGridView;
import com.naztech.lms.service.ImportDataService;
import com.naztech.lms.service.LmsSmsService;
import com.naztech.lms.service.LoanDocumentService;
import com.naztech.lms.service.LoanService;
import com.naztech.lms.service.NConfigurationService;
import com.naztech.lms.service.PreferenceService;
import com.naztech.lms.service.ReportService;
import com.naztech.lms.service.ServiceCoordinator;

import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.JRPdfExporterParameter;

@RestController
@CrossOrigin(origins = "*")
public class AppController {
	private static Logger log = LogManager.getLogger(AppController.class);
	public List<String> reportReqTimeList = new ArrayList<String>();

	@Autowired
	private ServiceCoordinator serviceCoordinator;

	@Autowired
	private GsonJsonMessageProcessor messageProcessor;

	@Autowired
	private LoanService loanService;
	
	@Autowired
	private ImportDataService importDataService;

	@Autowired
	private ReportService reportService;

	@Autowired
	private PreferenceService preferenceService;

	@Autowired
	private NConfigurationService nConfigurationService;

	@Value("${eloan.apk.file.path}")
	private String eLoanApkFilepath;
	
	@Value("${is.insert.mode}")
	private boolean insertMode;

	@Autowired
	private LoanDocumentService loanDocumentService;
	
	@Autowired
	private LmsSmsService lmsSmsService;

	static Gson gson;
	static {
		gson = new Gson();
	}

	@RequestMapping(value = "/jsonRequest", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	public String handleJsonRequest(@RequestBody String json) {

		Message<?> request = null;
		MessageHeader requestHeaders = null;
		String responseString = null;

		Message<?> dataMsg = null;
		Message<?> response = null;

		String errorString = null;

		String serviceName = null;

		Map<String, Object> statusMsgHeader = new HashMap<String, Object>();

		statusMsgHeader.put(MessageHeader.CONTENT_TYPE, MessageContentType.STATUS);

		try {
			request = messageProcessor.processMessage(json);

			if (request.getHeader().getActionType().equalsIgnoreCase("LOGIN")) {

				log.debug("Recieved Request [{}]", "Action Login");
			}
			else {
				log.debug("Recieved Request {}", json);
			}

			if (request != null && request.getHeader().getContentType() != MessageContentType.EXCEPTION.toString()) {
				requestHeaders = request.getHeader();

				log.debug("Source [{}] Destination [{}]", requestHeaders.getSource(), serviceName);
				// validating request
				validateRequest(requestHeaders, request);
				// sending message to service coordinator
				dataMsg = serviceCoordinator.service(request);

				if (dataMsg == null) {

					String errorMsg = "No response received from service -> " + serviceName;
					log.error(errorMsg);
					List<Status> statusList = new ArrayList<Status>();
					statusList.add(new Status(StatusType.ERROR, errorMsg));

					response = messageProcessor.createResponseMessage(request, statusMsgHeader, statusMsgHeader);

				}
				else {

					List<Status> statusMsgList = new ArrayList<Status>();
					statusMsgList.add(new Status(StatusType.OK));
					Message<List<Status>> statusMsg = messageProcessor.createResponseMessage(request, statusMsgList, statusMsgHeader);

					List<Message<?>> msgBody = new ArrayList<Message<?>>();
					msgBody.add(statusMsg);
					msgBody.add(dataMsg);

					Map<String, Object> finalMsgHeader = new HashMap<String, Object>();
					finalMsgHeader.put(MessageHeader.CONTENT_TYPE, MessageContentType.MULTI);
					response = messageProcessor.createResponseMessage(request, msgBody, finalMsgHeader);

				}

			}
		}
		catch (Exception ex) {
			log.error("error with request {}", ex);

			if (ex.getLocalizedMessage().contains("Error:")) {
				if (ex.getCause().getLocalizedMessage().contains("[")) errorString = ex.getCause().getLocalizedMessage().replace("[", "");
				if (ex.getCause().getLocalizedMessage().contains("@")) errorString = ex.getCause().getLocalizedMessage().replace("@", "");
				if (ex.getCause().getLocalizedMessage().contains("]")) errorString = ex.getCause().getLocalizedMessage().replace("]", "");
				if (ex.getCause().getLocalizedMessage().contains("Int")) errorString = ex.getCause().getLocalizedMessage().replace("Int", "");
			}
			else if (ex.getLocalizedMessage().contains("Error:") && !ex.getCause().getLocalizedMessage().contains("["))
				errorString = ex.getCause().getLocalizedMessage();
			else {
				errorString = ex.getLocalizedMessage();
			}

			List<com.naztech.lms.model.ResponseStatus> statusList = new ArrayList<com.naztech.lms.model.ResponseStatus>();
			statusList.add(new com.naztech.lms.model.ResponseStatus(StatusType.ERROR.toString(), errorString));

			response = messageProcessor.createResponseMessage(request, statusList, statusMsgHeader);
		}

		responseString = messageProcessor.toJson(response);

		log.debug("Sending Response {}", responseString);

		return responseString;
	}

	@GetMapping(value = "ping")
	public String getMethodName() {
		log.info("Ping");
		log.error("Pong");
		return "Pong";
	}

	@RequestMapping(value = "/refresh/preference", method = RequestMethod.GET)
	public String handleRefreshPreference() {
		boolean success = preferenceService.doRefreshPreference();

		if (success) {
			return "Refreshing Preference is successfull.";
		}
		else {
			return "Refreshing Preference is unsuccessfull.";
		}
	}

	@RequestMapping(value = "/refresh/configuration", method = RequestMethod.GET)
	public String handleRefreshNConfiguration() {
		boolean success = nConfigurationService.doRefreshNConfiguration();

		if (success) {
			return "Refreshing Preference is successfull.";
		}
		else {
			return "Refreshing Preference is unsuccessfull.";
		}
	}

	@RequestMapping(value = "/uploadLoanDocumentFile", method = RequestMethod.POST)
	@ResponseBody
	@CrossOrigin(origins = "*")
	public String uploadLoanDocumentFile(@RequestParam("file") MultipartFile file, HttpServletRequest request, HttpServletResponse response)
	        throws Exception {
		String loanDocStr = request.getParameter("loanDocument");
		String docTrack = request.getParameter("docTrack");

		LoanDocument loanDoc = gson.fromJson(loanDocStr, LoanDocument.class);

		if (loanDoc == null) return "{'success':true, 'message': Failed}";;

		String res = loanDocumentService.saveDocumentFile(file, loanDoc, docTrack);

		String serverResponse = "{'success':true, 'message':" + messageProcessor.toJson(res) + "}";

		response.setContentType("text/htlm");
		response.getOutputStream().write(((serverResponse)).getBytes(Constants.DEFAULT_CHARSET.toString()));
		response.getOutputStream().flush();

		return serverResponse;
	}

	@GetMapping(value = "/download/file")
	public void handleFileRequest(HttpServletRequest request, HttpServletResponse response) {
		try {
			String loanDocId = request.getParameter("loanDocId");
			String userModKey = request.getParameter("userModKey");

			String downloadLink = loanDocumentService.getDownloadLinkOfDoc(Integer.parseInt(loanDocId), Integer.parseInt(userModKey));

			if (downloadLink == null || downloadLink.isEmpty()) return;

			File file = new File(downloadLink);
			InputStream is = new FileInputStream(file);

			response.setContentType("application/octet-stream");
			response.setHeader("Content-Disposition", "attachment;filename=" + file.getName());

			IOUtils.copy(is, response.getOutputStream());
			response.flushBuffer();

		}
		catch (Exception e) {
			log.error("Exception [{}]", e);
		}

	}

	@GetMapping(value = "/view/file")
	public void viewFileRequest(HttpServletRequest request, HttpServletResponse response) {
		try {
			String loanDocId = request.getParameter("loanDocId");
			String docType = request.getParameter("docType");
			String loanId = request.getParameter("loanId");
			String userModKey = request.getParameter("userModKey");

			String downloadLink = null;
			if (loanDocId != null && !loanDocId.isEmpty()) {
				downloadLink = loanDocumentService.getDownloadLinkOfDoc(Integer.parseInt(loanDocId), Integer.parseInt(userModKey));
			}
			else {
				downloadLink = loanDocumentService.getLinkOfDoc(Integer.parseInt(loanId), Integer.parseInt(userModKey), docType);
			}

			if (downloadLink == null || downloadLink.isEmpty()) return;

			File file = new File(downloadLink);
			InputStream is = new FileInputStream(file);

			response.setHeader("Content-Disposition", "filename=" + file.getName());

			IOUtils.copy(is, response.getOutputStream());
			response.flushBuffer();

		}
		catch (Exception e) {
			log.error("Exception [{}]", e);
		}

	}

	private void validateRequest(MessageHeader requestHeaders, Message<?> msg) throws Exception {
		StringBuffer sb = new StringBuffer();

		if (requestHeaders.getContentType() == null) {
			sb.append("Missing ContentType");
		}

		if (requestHeaders.getActionType() == null) {
			sb.append("Missing ActionType");
		}

		if (sb.length() > 0) {
			throw new Exception(sb.toString());
		}

	}

	@RequestMapping(value = "/generateLmsReport")
	@ResponseBody
	public void generateReport(HttpServletRequest request, HttpServletResponse response) throws Exception {

		JasperPrint jasperPrint = null;
		JRPdfExporter pdfExporter = new JRPdfExporter();	

		String reportName = request.getParameter("reportName");
		String reportFormat = request.getParameter("reportformat");
		ServletOutputStream outputStream = response.getOutputStream();

		log.info("Received GUI request for LMS report");
		log.info("format: {}", reportFormat);
		String reportReqTime = request.getParameter("reportReqTime");
		
       if (!reportReqTimeList.contains(reportReqTime)) {			
    	// GENERATE PDF REPORT
    	if ((reportName.equalsIgnoreCase(Str.LMS_BRANCH_OFFICE) || reportName.equalsIgnoreCase(Str.LMS_HEAD_OFFICE)) && reportFormat.equalsIgnoreCase(Str.pdf)) {
    		  response.setHeader("Content-Disposition", "filename=\"" + "LoanDetailsReport.pdf" + "\"");
    		  jasperPrint = loanService.getJasperPrintForLoanReport(request);
    		}
        if (reportName.equalsIgnoreCase("Sanction Letter") && reportFormat.equalsIgnoreCase("pdf")) {
    		  response.setHeader("Content-Disposition", "filename=\"" + "SanctionLetter.pdf" + "\"");
    		  jasperPrint = loanService.getJasperPrintForCadReport(request);;
    		}
    	if(reportName.equalsIgnoreCase(Str.LOAN_GROUPING_MEMO_APPROVAL_REPORT)&& reportFormat.equalsIgnoreCase("pdf")) {
    		  response.setHeader("Content-Disposition", "filename=\"" + "MemoApprovalReport.pdf" + "\"");
    		  jasperPrint = loanService.getMemoBulkReportGenerate(request);
    		}
    	// TODO_H: UPDATE JASPER LIBRARY
    	    pdfExporter.setParameter(JRPdfExporterParameter.OUTPUT_STREAM, outputStream);
    		pdfExporter.setParameter(JRPdfExporterParameter.JASPER_PRINT, jasperPrint);
    				
    		pdfExporter.exportReport();
    				
    		response.getOutputStream().flush();

		}else {
			log.info("Duplicate reportReqTime: {} found. Ignoring request.", reportReqTime);
		}		
	}	

	@RequestMapping(value = "/generateLmsGridExcelReport")
	public void generateLmsGridExcelReport(HttpServletRequest request, HttpServletResponse response) throws Exception {

		log.info("Received GUI request to generate Excel Report");

		String reportName = request.getParameter("reportName");
		File file = reportService.lmsGridExcelReport(request);

		response.setContentType("application/force-download");
		response.setHeader("Content-Disposition", "attachment; filename=" + reportName + ".xlsx");

		Files.copy(file.toPath(), response.getOutputStream());
		response.getOutputStream().flush();
	}

	@RequestMapping(value = "/generateLmsLoanMISGridExcelReport")
	public void generateLoanMISGridExcelReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportName = request.getParameter("reportName");
		File file = reportService.loanGridMISExcelReport(request);
		log.info("Received GUI request for \'LMS Loan MIS Grid Excel Report\'");
		response.setContentType("application/force-download");
		response.setHeader("Content-Disposition", "attachment; filename=" + reportName + ".xlsx");

		Files.copy(file.toPath(), response.getOutputStream());
		response.getOutputStream().flush();
	}

	@RequestMapping(value = "/generateLmsLoan_MIS_PPC_GridExcelReport")
	public void generateLoanPPCGridExcelReport(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String reportName = request.getParameter("reportName");
		File file = reportService.loanGridPPCExcelReportV2(request);
		log.info("Received GUI request for \'LMS Loan MIS Grid Excel Report\'");
		response.setContentType("application/force-download");
		response.setHeader("Content-Disposition", "attachment; filename=" + reportName + ".xlsx");

		Files.copy(file.toPath(), response.getOutputStream());
		response.getOutputStream().flush();
	}

	@RequestMapping(value = "/initiateLoan", method = RequestMethod.POST)
	@ResponseBody
	@CrossOrigin(origins = "*")
	public Loan initiateLoan(@RequestParam("file") MultipartFile[] files, HttpServletRequest req, HttpServletResponse response) throws Exception {

		String loanStr = req.getParameter("loan");
		String action = req.getParameter("actionType");
		log.debug("Received request for loan {}", loanStr);

		Loan loan = gson.fromJson(loanStr, Loan.class);

		return loanService.handleInitiateLoan(action, loan, files);

	}

	@GetMapping("/app/eloan/download")
	@ResponseBody
	public ResponseEntity<Resource> serveFile(HttpServletRequest req) {
		File apk = null;
		Resource resource = null;
		String contentType = null;
		log.info("Download request for eLoan [{}]", req.getRemoteAddr());
		try {
			apk = new File(eLoanApkFilepath);
			resource = new UrlResource(Paths.get(eLoanApkFilepath).toUri());
			if (contentType == null) {
				contentType = "application/octet-stream";
			}
		}
		catch (Exception e) {
			log.error("Error serving apk {}", e);
		}
		return ResponseEntity.ok().contentType(MediaType.parseMediaType(contentType))
		        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + apk.getName() + "\"").body(resource);
	}

	@GetMapping("/ImportData/CBBL")
	public String  getExcelDataAsList() throws Exception{
		
		if(insertMode==true) {
			importDataService.getExcelDataAsList();
			return "Insert Successfully";
		}else {
			return "Allready Insert";
		}
		
	}
	
	@GetMapping("eloan/data/view")
	public String initiateLoanView(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		//String page = request.getParameter("page");		
		String start = request.getParameter("start");
		String limit = request.getParameter("limit");
		String userId = request.getParameter("userId");
		String fromDate = request.getParameter("fromDate");
		String toDate = request.getParameter("toDate");
		String action = request.getParameter("actionType");
		String eLoanSearchState = request.getParameter("eLoanSearchState");
		
		Loan loan = new Loan();
		
		loan.setUserModKey(Integer.parseInt(userId));
		loan.setFromDate4Src(fromDate);
		loan.setToDate4Src(toDate);
		loan.setStartValue(Integer.parseInt(start));
		loan.setLimitValue(Integer.parseInt(limit));
		loan.seteLoanSearchState(eLoanSearchState);
		//loan.setPageSize(Integer.parseInt(page));
		
		return gson.toJson(loanService.handleInitiateLoanView(loan, action));
	}
	
	@GetMapping("eloan/data/detais")
	public String loanDetailsView(HttpServletRequest request, HttpServletResponse response) throws Exception {
		
		String loanId = request.getParameter("loanId");
		String action = request.getParameter("actionType");
		String userId = request.getParameter("userId");
		LoanGridView loan = new LoanGridView();
		
		if(loanId==null || loanId.isEmpty()||action==null || action.isEmpty()||userId==null || userId.isEmpty()){
		return "Please Give Real Data";
	   }else {
			loan.setUserModKey(Integer.parseInt(userId));
			loan.setLoanId(Integer.parseInt(loanId));
			return gson.toJson(loanService.handleLoanDetailsView(loan, action));
	   }					
	}
	
	@GetMapping(value = "/cib/link")
	public void viewCibLinnkRequest(HttpServletRequest request, HttpServletResponse response) throws Exception {
			String loanId = request.getParameter("loanId");
			String userModKey = request.getParameter("userModKey");
			Loan loan = new Loan();
			
			String cibLink = null;
			loan.setUserModKey(Integer.parseInt(userModKey));
			loan.setLoanId(Integer.parseInt(loanId));
			
			loan = loanService.handleCibLinkView(loan);
			cibLink = loan.getCibLink();
			
			if (cibLink == null || cibLink.isEmpty()) return;
			File file = new File(cibLink);
			InputStream is = new FileInputStream(file);
			response.setHeader("Content-Disposition", "filename=" + file.getName());
			IOUtils.copy(is, response.getOutputStream());
			response.flushBuffer();				
	}	
	@RequestMapping(value = "/LOAN/DISBURSED/CBS",method = RequestMethod.GET)
	@ResponseBody
	public String cbsDisbursed(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String loanId = request.getParameter("loanId");
		String userModKey = request.getParameter("userModKey");
		String stateId = request.getParameter("stateId");
		String uiActionName = request.getParameter("uiActionName");
		String stateName = request.getParameter("stateName");
		String msg;
		Loan loan = new Loan();
		
		if(!isEmptyString(loanId) && !isEmptyString(userModKey) &&
		!isEmptyString(stateId) && !isEmptyString(uiActionName) &&
		!isEmptyString(stateName)) {
			loan.setLoanId(Integer.parseInt(loanId));
			loan.setUserModKey(Integer.parseInt(userModKey));
			loan.setStateId(Integer.parseInt(stateId));
			loan.setStateName(stateName);
			loan.setUiActionName(uiActionName);
			loanService.cadDisbursedCbs(loan, uiActionName);
			
			return "Amount Disbursed Successfully";
		}else {
			msg = "Missing Field";
			return msg;
		}
	}
	boolean isEmptyString(String string) {
		return string == null || string.isEmpty();
	}
	
}
