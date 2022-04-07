package com.naztech.nid.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.ParseException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.SerializationUtils;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.Gson;
import com.nazdaqTechnologies.core.message.Message;
import com.nazdaqTechnologies.core.message.MessageContentType;
import com.nazdaqTechnologies.core.message.MessageHeader;
import com.nazdaqTechnologies.core.message.model.Status;
import com.nazdaqTechnologies.core.message.model.StatusType;
import com.nazdaqTechnologies.core.message.processor.json.gson.GsonJsonMessageProcessor;
import com.naztech.nid.model.NationalId;
import com.naztech.nid.model.NidRequest;
import com.naztech.nid.model.ResponseStatus;
import com.naztech.nid.service.NidRequestService;
import com.naztech.nid.service.NidService;
import com.naztech.nid.service.ServiceCoordinator;

import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.JRPdfExporterParameter;

/**
 * @author assaduzzaman.sohan
 * @author fahim.reza
 */
@RestController
public class NidController {

	private static Logger log = LoggerFactory.getLogger(NidController.class);

	static Gson gson;
	static {
		gson = new Gson();
	}

	@Autowired
	private ServiceCoordinator serviceCoordinator;

	@Autowired
	private GsonJsonMessageProcessor messageProcessor;

	@Autowired
	private NidRequestService nidRequestService;

	@Autowired
	private NidService nidService;

	@Value("${valid.nid.len.list}")
	private List<Integer> validNidLenList;

	@Value("${nid.server.url}")
	private String url;

	@Value("${should.nid.file.resp}")
	private boolean shouldFileResponse;

	@Value("${return.msg.of.async.request}")
	private String returnMsgOfAsyncRequest;

	private static final String MSG_MAPPING_NOT_FOUND = "No mapping found in classMap for contentType";
	private static final String CONTENT_TYPE_NATIONAL_ID = "NationalId";
	private static final String ACTION_TYPE_FETCH = "FETCH";
	private static final String ACTION_TYPE_SELECT_HISTORY = "SELECT_HISTORY";
	private static final String REQUEST_TYPE_SYNC = "SYNC";
	private static final String REQUEST_TYPE_ASYNC = "ASYNC";

	private static final String MAP_KEY_REQUEST_TYPE = "requestType";
	private static final String MAP_KEY_CALL_BACK_URL = "callbackUrl";

	private static final String FILE_NAME_TEST = "Test";
	private static final String FILE_EXT_ZIP = "zip";

	private static final String STR_CONTENT_TYPE = "Content-type";

	private static final String APPLICATION_TYPE_ZIP = "application/zip";
	private static final String APPLICATION_TYPE_JSON = "application/json";

	private static final String STR_CONTENT_DISPOSITION = "Content-Disposition";
	private static final String RESPONSE_FILE_NAME = "filename=\"Response.zip\"";

	@PostMapping(value = "/jsonRequest")
	public String handleJsonRequest(@RequestBody String json, HttpServletResponse httpResponse) {

		Message<?> request = null;
		MessageHeader requestHeaders = null;
		String responseString = null;

		Message<?> dataMsg = null;

		String serviceName = null;

		Map<String, Object> statusMsgHeader = new HashMap<String, Object>();

		statusMsgHeader.put(MessageHeader.CONTENT_TYPE, MessageContentType.STATUS);

		NidRequest invalidNidReqObj = new NidRequest();
		invalidNidReqObj.setRequestTime(new Date());
		invalidNidReqObj.setValidReq(0);

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

				serviceName = requestHeaders.getDestination();

				if (serviceName != null) {

					log.debug("Source [{}] Destination [{}]", requestHeaders.getSource(), serviceName);
					// validating request
					if (!validateRequest(requestHeaders, request)) {
						return "Invalid Request";
					}
					// sending message to service coordinator

					if (requestHeaders.get(MAP_KEY_REQUEST_TYPE).toString().equalsIgnoreCase(REQUEST_TYPE_ASYNC)) {

						final Message<?> requestForNewThread = request;

						Runnable task = () -> {
							try {
								serviceCoordinator.service(requestForNewThread);
							}
							catch (Exception e) {
								log.error("Exception Running Thread [{}]", e);
							}
						};

						new Thread(task).start();

						return returnMsgOfAsyncRequest;

					}
					else {
						dataMsg = serviceCoordinator.service(request);
					}

					if (shouldFileResponse) {
						log.info("Sending nid file zip");
						try {

							NationalId nid = (NationalId) dataMsg.getPayload();

							File tempFile = File.createTempFile(FILE_NAME_TEST, FILE_EXT_ZIP);

							OutputStream fileOut = new FileOutputStream(new File(tempFile.getPath()));
							ZipOutputStream zipOS = new ZipOutputStream(fileOut);

							writeToZipFile(nid.getNidImage(), zipOS);
							writeToZipFile(nid.getNidPersonImage(), zipOS);

							httpResponse = setHttpResponseToSendFile(httpResponse, tempFile);
						}
						catch (Exception e) {
							log.error("Exception [{}]", e);
						}
					}
				}
			}
		}
		catch (ParseException e) {
			log.error("ParseException with request {}", e);

			String res = e.getMessage().replaceAll("java.text.ParseException: ", "");

			try {
				invalidNidReqObj.setComments(res);
				nidRequestService.save(invalidNidReqObj);
			}
			catch (Exception ex) {
				log.error("Exception saving invalid NidRequest [{}]", ex);
			}

			return res;
		}
		catch (Exception ex) {
			log.error("error with request {}", ex);

			String res = ex.getMessage();

			try {
				invalidNidReqObj.setComments(res);
				nidRequestService.save(invalidNidReqObj);
			}
			catch (Exception exx) {
				log.error("Exception saving invalid NidRequest [{}]", exx);
			}

			if (res.contains(MSG_MAPPING_NOT_FOUND)) {
				return "You must give " + CONTENT_TYPE_NATIONAL_ID + " as contentType to get information of NID";
			}

			return res;
		}

		responseString = messageProcessor.toJson(dataMsg);

		log.debug("Sending Response {}", responseString);

		return responseString;
	}
	
	@RequestMapping(value = "/jsonNidRequest", method = RequestMethod.POST, produces = "application/json; charset=utf-8")
	@ResponseBody
	public String handleNidJsonRequest(@RequestBody String json) {

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
				validateNidRequest(requestHeaders, request);
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

			List<ResponseStatus> statusList = new ArrayList<ResponseStatus>();
			statusList.add(new ResponseStatus(StatusType.ERROR.toString(), errorString));

			response = messageProcessor.createResponseMessage(request, statusList, statusMsgHeader);
		}

		responseString = messageProcessor.toJson(response);

		log.debug("Sending Response {}", responseString);

		return responseString;
	}

	public static void writeToZipFile(File file, ZipOutputStream zipStream) throws Exception {

		if (file == null) {
			log.info("File not found to write in zip file");
			return;
		}

		try {
			FileInputStream fin = new FileInputStream(file);
			zipStream.putNextEntry(new ZipEntry(file.getName()));

			byte[] fileContent = IOUtils.toByteArray(fin);

			zipStream.write(fileContent, 0, fileContent.length);

			zipStream.closeEntry();
			fin.close();
		}
		catch (Exception e) {
			log.error("Exception converting File to Zip, [{}]", e);
		}
	}

	@PostMapping(value = "/jsonRequest/validate")
	private String validateResponse(@RequestBody String json, HttpServletResponse response) {

		String content = null;

		try {

			HttpResponse httpResponse = handleHttpPostRequest(url, json);

			HttpEntity entity = httpResponse.getEntity();

			content = EntityUtils.toString(entity);

			if (shouldFileResponse) {
				InputStream inS = entity.getContent();

				File tempFile = File.createTempFile(FILE_NAME_TEST, FILE_EXT_ZIP);

				OutputStream fileOut = new FileOutputStream(new File(tempFile.getPath()));

				byte[] fileContent = IOUtils.toByteArray(inS);

				fileOut.write(fileContent, 0, fileContent.length);

				inS.close();
				fileOut.close();

				response = setHttpResponseToSendFile(response, tempFile);
			}
		}
		catch (Exception e) {
			log.error("Exception [{}]", e);
		}

		return content;
	}

	private HttpServletResponse setHttpResponseToSendFile(HttpServletResponse response, File file) {

		try {
			response.setContentType(APPLICATION_TYPE_ZIP);
			response.setHeader(STR_CONTENT_DISPOSITION, RESPONSE_FILE_NAME);

			FileUtils.copyFile(file, response.getOutputStream());
		}
		catch (Exception e) {
			log.error("Exception [{}]", e);
		}

		return response;
	}

	public static HttpResponse handleHttpPostRequest(String url, String requestBody) {

		CloseableHttpClient httpclient = HttpClients.createDefault();

		HttpPost request = new HttpPost(url);
		request.setHeader(STR_CONTENT_TYPE, APPLICATION_TYPE_JSON);

		try {
			request.setEntity(new StringEntity(requestBody));

			HttpResponse httpResponse = httpclient.execute(request);

			int httpStatus = httpResponse.getStatusLine().getStatusCode();

			if (httpStatus >= 200 && httpStatus < 300) {
				return httpResponse;
			}
			else {
				return null;
			}
		}
		catch (Exception e) {
			log.error("Exception Sending HttpGet Request ", e);

			return null;
		}
	}

	/**
	 * change this method
	 * 
	 * @param requestHeadersf
	 * @param msg
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	private boolean validateRequest(MessageHeader header, Message<?> msg) throws Exception {
		log.trace("Checking for Action Type and NID number validation");

		StringBuffer sb = new StringBuffer();

		String actionType = header.getActionType();

		if (actionType == null || actionType.isEmpty()) {
			sb.append("Missing actionType\n");
		}
		else if (!actionType.equalsIgnoreCase(ACTION_TYPE_FETCH) && !actionType.equalsIgnoreCase(ACTION_TYPE_SELECT_HISTORY)) {
			sb.append("Invalid actionType\n");
		}

		if (header.get(MAP_KEY_REQUEST_TYPE) == null || header.get(MAP_KEY_REQUEST_TYPE).toString().isEmpty()) {
			sb.append("Missing requestType\n");
		}
		else {
			String requestType = header.get(MAP_KEY_REQUEST_TYPE).toString();

			if (!requestType.equalsIgnoreCase(REQUEST_TYPE_SYNC) && !requestType.equalsIgnoreCase(REQUEST_TYPE_ASYNC)) {
				sb.append("Invalid requestType\n");
			}
			else if (requestType.equalsIgnoreCase(REQUEST_TYPE_ASYNC)) {
				if (header.get(MAP_KEY_CALL_BACK_URL) == null || header.get(MAP_KEY_CALL_BACK_URL).toString().isEmpty()) {
					sb.append("For this requestType you must provide callbackUrl\n");
				}
			}

		}

		try {

			List<NationalId> objList = (List<NationalId>) msg.getPayload();

			if (objList == null || objList.size() == 0) {
				sb.append("Missing payLoad\n");
			}
			else {
				NationalId nid = objList.get(0);

				if (nid.getNid() == null || nid.getNid().isEmpty()) {
					sb.append("Missing nid number\n");
				}
				/*else if (!nidLenList.contains(nid.getNid().length())) {
					sb.append("Invalid nid number length, Length must be in ["
					        + nidLenList.stream().map(i -> Integer.toString(i)).collect(Collectors.joining(",")) + "]\n");
				}*/

				if (nid.getDateOfBirth() == null) {
					sb.append("Missing Date of Birth\n");
				}
			}
		}
		catch (Exception ex) {
			log.error("Error {}", ex);
		}

		if (sb.length() > 0) {
			throw new Exception(sb.toString());
		}
		return true;
	}

	@RequestMapping(path = "/verify/nid", method = RequestMethod.POST)
	public String verifyNid(@RequestBody String json) throws Exception {
		NationalId nid = gson.fromJson(json, NationalId.class);

		String validationRes = validateRequest(nid);
		if (!validationRes.isEmpty()) {
			return validationRes;
		}
		return nidService.getNidDetails(nid);
	}

	@RequestMapping(path = "/verify/nid/byte-array", method = RequestMethod.POST)
	public byte[] verifyNidByteArray(@RequestBody String json) throws Exception {
		NationalId nid = gson.fromJson(json, NationalId.class);

		String validationRes = validateRequest(nid);
		if (!validationRes.isEmpty()) {
			nid.setComments(validationRes);
		}
		else {
			nid = nidService.getNidInfo(nid);
			try {
				nid.setNidImage(new File(nid.getNidImagePath()));
			}
			catch (Exception e) {
				log.error("Image not found for NID details [{}]", e);
			}

			try {
				nid.setNidPersonImage(new File(nid.getPersonImagePath()));
			}
			catch (Exception e) {
				log.error("Image not found for NID person [{}]", e);
			}

		}
		return SerializationUtils.serialize(nid);
	}

	private String validateRequest(NationalId nid) {
		StringBuilder sb = new StringBuilder();
		if (nid.getNid() == null || nid.getNid().isEmpty()) sb.append("Missing NID\n");
		if (nid.getDateOfBirth() == null) sb.append("Missing Date Of Birth\n");
		if (nid.getDateOfBirth().isAfter(LocalDate.now())) sb.append("Date Of Birth can't greater than today\n");
		if (nid.getNid() != null && !validNidLenList.contains(nid.getNid().length())) {
			sb.append("Invalid no of digit in NID, no of digit must be " + validNidLenList.toString() + "\n");
		}
		return sb == null ? "" : sb.toString();
	}

	@RequestMapping(path = "/test/api", method = RequestMethod.GET)
	public void testApi() throws Exception {
		CloseableHttpClient httpclient = HttpClients.createDefault();
		HttpPost request = new HttpPost("http://localhost:8084/verify/nid2");

		NationalId nid = new NationalId("8701550140", LocalDate.parse("1997-04-01", DateTimeFormatter.ofPattern("yyyy-MM-dd")));
		nid.setForceFatch(true);
		request.setEntity(new StringEntity(messageProcessor.toJson(nid)));

		HttpResponse response = httpclient.execute(request);
		HttpEntity entity = response.getEntity();
		byte[] data = EntityUtils.toByteArray(entity);

		NationalId nid2 = SerializationUtils.deserialize(data);

		File desFile = new File("C:\\TestFile\\" + nid2.getNidImageName());
		FileUtils.copyFile(nid2.getNidImage(), desFile);

		System.out.println(nid2);
	}
	
	@RequestMapping(path = "/nid/report/view", method = RequestMethod.GET)
	public void acquisitionReportGenerate(HttpServletRequest request, HttpServletResponse response) throws Exception {
		JasperPrint jasperPrint = null;
		JRPdfExporter pdfExporter = new JRPdfExporter();	
		
		String reportFormat = request.getParameter("reportformat");
		ServletOutputStream outputStream = response.getOutputStream();

		log.info("Received GUI request for LMS report");
		log.info("format: {}", reportFormat);
		String reportReqTime = request.getParameter("reportReqTime");
		response.setHeader("Content-Disposition", "filename=\"" + "NID.pdf" + "\"");
//	    jasperPrint = acquisitionApplicantDetailsService.getJasperPrintForAcquisitionReport(request);
		pdfExporter.setParameter(JRPdfExporterParameter.OUTPUT_STREAM, outputStream);
    	pdfExporter.setParameter(JRPdfExporterParameter.JASPER_PRINT, jasperPrint);
    				
    	pdfExporter.exportReport();
    				
    	response.getOutputStream().flush();
	}
	
	private void validateNidRequest(MessageHeader requestHeaders, Message<?> msg) throws Exception {
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
	
	boolean isEmptyString(String string) {
		return string == null || string.isEmpty();
	}
	
	
}
